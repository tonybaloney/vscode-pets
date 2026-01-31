/**
 * Clippy Code Tips Provider
 *
 * Shows Clippy-style tips via pet speech bubbles when the user
 * interacts with code patterns in the editor.
 */

import * as vscode from 'vscode';
import {
    ClippyConfig,
    Frequency,
    Personality,
    RATE_LIMIT_CONFIGS,
} from './types';
import {
    findMatchAtPosition,
    getLanguage,
    getTipForPattern,
} from './languages/index';
import { getGeneralTip } from './tips';

/**
 * Track last tip time for rate limiting
 */
let lastTipTime = 0;

/**
 * Load configuration from VS Code settings
 */
function loadConfig(): ClippyConfig {
    const config = vscode.workspace.getConfiguration('vscode-pets');
    return {
        enabled: config.get<boolean>('clippyHover.enabled', false),
        personality: config.get<Personality>(
            'clippyHover.personality',
            'helpful',
        ),
        frequency: config.get<Frequency>('clippyHover.frequency', 'sometimes'),
        enabledLanguages: config.get<string[]>('clippyHover.enabledLanguages', [
            '*',
        ]),
    };
}

/**
 * Check if the current language is enabled
 */
function isLanguageEnabled(languageId: string, config: ClippyConfig): boolean {
    if (config.enabledLanguages.includes('*')) {
        return true;
    }
    return config.enabledLanguages.includes(languageId);
}

/**
 * Check if we should show a tip based on rate limiting
 */
function shouldShowTip(frequency: Frequency): boolean {
    const rateLimit = RATE_LIMIT_CONFIGS[frequency];

    if (rateLimit.cooldownMs === 0) {
        return true;
    }

    const timeSinceLastTip = Date.now() - lastTipTime;

    if (timeSinceLastTip >= rateLimit.cooldownMs) {
        return true;
    }

    return Math.random() < rateLimit.randomChance;
}

/**
 * Record that a tip was shown
 */
function recordTipShown(): void {
    lastTipTime = Date.now();
}

type SendTipFn = (tip: string) => void;

/**
 * Handle cursor/selection changes
 */
function handleSelectionChange(
    event: vscode.TextEditorSelectionChangeEvent,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    const editor = event.textEditor;
    const languageId = editor.document.languageId;

    if (!isLanguageEnabled(languageId, config)) {
        return;
    }

    // Check if we support this language
    if (!getLanguage(languageId)) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    const position = event.selections[0]?.active;
    if (!position) {
        return;
    }

    const lineText = editor.document.lineAt(position.line).text;
    const match = findMatchAtPosition(lineText, position.character, languageId);

    if (!match) {
        return;
    }

    const tip = getTipForPattern(match.name, config.personality, languageId);
    if (tip) {
        recordTipShown();
        sendTip(tip);
    }
}

/**
 * Handle document open
 */
function handleDocumentOpen(
    document: vscode.TextDocument,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    const languageId = document.languageId;

    if (!isLanguageEnabled(languageId, config)) {
        return;
    }

    if (!getLanguage(languageId)) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    // Scan first 50 lines for patterns
    const linesToScan = Math.min(document.lineCount, 50);

    for (let i = 0; i < linesToScan; i++) {
        const lineText = document.lineAt(i).text;
        const match = findMatchAtPosition(lineText, 0, languageId);

        if (match) {
            const tip = getTipForPattern(
                match.name,
                config.personality,
                languageId,
            );
            if (tip) {
                recordTipShown();
                sendTip(tip);
                return; // Only show one tip per file open
            }
        }
    }
}

/**
 * Handle document save
 */
function handleDocumentSave(
    document: vscode.TextDocument,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    // Skip non-file schemes (e.g., output, git, untitled)
    if (document.uri.scheme !== 'file') {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    const tip = getGeneralTip('documentSave', config.personality);
    if (tip) {
        recordTipShown();
        sendTip(tip);
    }
}

/**
 * Handle document close
 */
function handleDocumentClose(
    document: vscode.TextDocument,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    // Skip non-file schemes (e.g., output, git, untitled)
    if (document.uri.scheme !== 'file') {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    const tip = getGeneralTip('documentClose', config.personality);
    if (tip) {
        recordTipShown();
        sendTip(tip);
    }
}

/**
 * Handle file creation
 */
function handleFileCreate(
    event: vscode.FileCreateEvent,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    // Only trigger for actual files (not internal URIs)
    const hasRealFiles = event.files.some((uri) => uri.scheme === 'file');
    if (!hasRealFiles) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    const tip = getGeneralTip('fileCreate', config.personality);
    if (tip) {
        recordTipShown();
        sendTip(tip);
    }
}

/**
 * Handle file deletion
 */
function handleFileDelete(
    event: vscode.FileDeleteEvent,
    sendTip: SendTipFn,
): void {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    // Only trigger for actual files (not internal URIs)
    const hasRealFiles = event.files.some((uri) => uri.scheme === 'file');
    if (!hasRealFiles) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    const tip = getGeneralTip('fileDelete', config.personality);
    if (tip) {
        recordTipShown();
        sendTip(tip);
    }
}

/**
 * Register the Clippy tips provider
 */
export function registerClippyTipsProvider(
    context: vscode.ExtensionContext,
    sendTip: SendTipFn,
): void {
    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection((event) => {
            handleSelectionChange(event, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument((document) => {
            handleDocumentOpen(document, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument((document) => {
            handleDocumentSave(document, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidCloseTextDocument((document) => {
            handleDocumentClose(document, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidCreateFiles((event) => {
            handleFileCreate(event, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidDeleteFiles((event) => {
            handleFileDelete(event, sendTip);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('vscode-pets.clippyHover')) {
                lastTipTime = 0;
            }
        }),
    );
}
