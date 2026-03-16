/**
 * Selection change handlers for Clippy Code Messages
 */

import * as vscode from 'vscode';
import { SemanticDetectionConfig, SymbolContext } from '../types';
import { isLanguageEnabled } from '../config';
import { sendAndRecord, SendMessageFn } from '../rateLimit';
import { shouldProcessEvent } from './document';
import {
    findTriggerAtPosition,
    getLanguage,
    getMessageForTrigger,
} from '../languages/index';
import { extractFileContext } from '../messages';
import { detectSemantic, DEFAULT_SEMANTIC_CONFIG } from '../semanticDetector';

/**
 * Try regex-based detection (fast path)
 *
 * @returns Trigger name if matched, null otherwise
 */
export function tryRegexDetection(
    document: vscode.TextDocument,
    position: vscode.Position | null,
): string | null {
    if (!position) {
        return null;
    }

    const languageId = document.languageId;
    const { line, character } = position;

    const lineText = document.lineAt(line).text;
    const match = findTriggerAtPosition(lineText, character, languageId);
    return match?.name ?? null;
}

/**
 * Handle cursor/selection changes with async semantic detection
 */
export async function handleSelectionChangeAsync(
    event: vscode.TextEditorSelectionChangeEvent,
    sendMessage: SendMessageFn,
    semanticConfig: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<void> {
    const config = shouldProcessEvent();
    if (!config) {
        return;
    }

    const { document } = event.textEditor;
    const languageId = document.languageId;

    if (!isLanguageEnabled(languageId, config) || !getLanguage(languageId)) {
        return;
    }

    const position = event.selections[0]?.active;
    if (!position) {
        return;
    }

    // Get file context
    const file = extractFileContext(document.uri, languageId);

    // Get the symbol context and trigger name
    let triggerName = tryRegexDetection(document, position);
    const semantic = await detectSemantic(document, position, semanticConfig);
    const symbol: SymbolContext | undefined = semantic?.context;
    triggerName ??= semantic?.triggerName ?? null;

    const { personality } = config;
    const context = { symbol, file: file ?? undefined };

    const message = getMessageForTrigger(
        triggerName,
        personality,
        languageId,
        context,
    );
    sendAndRecord(message, triggerName, sendMessage);
}
