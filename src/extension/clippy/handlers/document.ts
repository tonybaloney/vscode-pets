/**
 * Document event handlers for Clippy Code Messages
 */

import * as vscode from 'vscode';
import { ClippyConfig } from '../types';
import { loadConfig, isLanguageEnabled } from '../config';
import { shouldShowMessage, sendAndRecord, SendMessageFn } from '../rateLimit';
import {
    findTriggerAtPosition,
    getLanguage,
    getMessageForTrigger,
} from '../languages/index';
import { extractFileContext, getGeneralMessage } from '../messages';

/**
 * Centralized validation for all event handlers
 * Returns null if should not process, otherwise returns config
 */
export function shouldProcessEvent(options?: {
    requireFileScheme?: boolean;
    document?: vscode.TextDocument;
}): ClippyConfig | null {
    const config = loadConfig();

    if (!config.enabled) {
        return null;
    }

    if (options?.requireFileScheme && options.document?.uri.scheme !== 'file') {
        return null;
    }

    if (!shouldShowMessage(config.frequency)) {
        return null;
    }

    return config;
}

/**
 * Handle document open
 */
export function handleDocumentOpen(
    document: vscode.TextDocument,
    sendMessage: SendMessageFn,
): void {
    const config = shouldProcessEvent();
    if (!config) {
        return;
    }

    const languageId = document.languageId;
    if (!isLanguageEnabled(languageId, config) || !getLanguage(languageId)) {
        return;
    }

    const fileContext = extractFileContext(document.uri, languageId);
    const linesToScan = Math.min(document.lineCount, 50);

    for (let i = 0; i < linesToScan; i++) {
        const match = findTriggerAtPosition(
            document.lineAt(i).text,
            0,
            languageId,
        );
        
        if (!match) {
            continue;
        }

        const message = getMessageForTrigger(
            match.name,
            config.personality,
            languageId,
            { file: fileContext ?? undefined },
        );
        sendAndRecord(message, match.name, sendMessage);
    }
}

/**
 * Handle document save
 */
export function handleDocumentSave(
    document: vscode.TextDocument,
    sendMessage: SendMessageFn,
): void {
    const config = shouldProcessEvent({ requireFileScheme: true, document });
    const personality = config?.personality;
 
    const { fileName } = extractFileContext(document.uri, document.languageId);
    const message = getGeneralMessage('documentSave', personality, [fileName]);
    sendAndRecord(message, 'documentSave', sendMessage);
}

/**
 * Handle document close
 */
export function handleDocumentClose(
    document: vscode.TextDocument,
    sendMessage: SendMessageFn,
): void {
    const config = shouldProcessEvent({ requireFileScheme: true, document });
    const personality = config?.personality;

    const { fileName } = extractFileContext(document.uri, document.languageId);
    const message = getGeneralMessage('documentClose', personality, [fileName]);
    sendAndRecord(message, 'documentClose', sendMessage);
}
