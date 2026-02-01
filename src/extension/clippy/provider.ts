/**
 * Clippy Code Tips Provider
 *
 * Shows Clippy-style tips via pet speech bubbles when the user
 * interacts with code patterns in the editor.
 */

import * as vscode from 'vscode';
import {
    ClippyConfig,
    FileContext,
    Frequency,
    Personality,
    RATE_LIMIT_CONFIGS,
    SemanticDetectionConfig,
    SymbolContext,
    TemplateContext,
} from './types';
import {
    findMatchAtPosition,
    getLanguage,
    getTipForPattern,
} from './languages/index';
import { extractFileContext, getGeneralTip } from './tips';
import { debounce, DebouncedFunction } from './debounce';
import {
    detectSemantic,
    getSymbolCache,
    DEFAULT_SEMANTIC_CONFIG,
} from './semanticDetector';

/**
 * Track last tip time for rate limiting
 */
let lastTipTime = 0;

/**
 * Type for send tip function
 */
type SendTipFn = (tip: string, patternName: string) => void;

/**
 * Debounced selection change handler (set during registration)
 */
let debouncedSelectionHandler: DebouncedFunction<
    (
        event: vscode.TextEditorSelectionChangeEvent,
        sendTip: SendTipFn,
    ) => Promise<void>
> | null = null;

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
 *
 * Rate limiting works in two stages:
 * 1. Cooldown: Must wait cooldownMs since last tip before any tip can show
 * 2. Random chance: After cooldown, randomChance determines probability
 */
function shouldShowTip(frequency: Frequency): boolean {
    const rateLimit = RATE_LIMIT_CONFIGS[frequency];
    const timeSinceLastTip = Date.now() - lastTipTime;

    // Must wait for cooldown period to pass
    if (timeSinceLastTip < rateLimit.cooldownMs) {
        return false;
    }

    // After cooldown, apply random chance
    return Math.random() < rateLimit.randomChance;
}

/**
 * Record that a tip was shown
 */
function recordTipShown(): void {
    lastTipTime = Date.now();
}

/**
 * Try regex-based detection (fast path)
 *
 * @returns Pattern name if matched, null otherwise
 */
function tryRegexDetection(
    document: vscode.TextDocument,
    position: vscode.Position,
): string | null {
    const lineText = document.lineAt(position.line).text;
    const match = findMatchAtPosition(
        lineText,
        position.character,
        document.languageId,
    );
    return match?.name ?? null;
}

/**
 * Handle cursor/selection changes with async semantic detection
 */
async function handleSelectionChangeAsync(
    event: vscode.TextEditorSelectionChangeEvent,
    sendTip: SendTipFn,
    semanticConfig: SemanticDetectionConfig = DEFAULT_SEMANTIC_CONFIG,
): Promise<void> {
    const config = loadConfig();

    if (!config.enabled) {
        return;
    }

    const editor = event.textEditor;
    const document = editor.document;
    const languageId = document.languageId;

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

    // Extract file context for template replacement
    const fileContext: FileContext = extractFileContext(
        document.uri,
        languageId,
    );

    // Fast path: try regex first (synchronous)
    let patternName = tryRegexDetection(document, position);
    let symbolContext: SymbolContext | undefined;

    if (patternName) {
        // Regex matched - still run semantic detection to get symbol context for templates
        const semanticResult = await detectSemantic(
            document,
            position,
            semanticConfig,
        );
        symbolContext = semanticResult?.context;
    } else {
        // Slow path: try semantic detection if regex didn't match
        const semanticResult = await detectSemantic(
            document,
            position,
            semanticConfig,
        );
        patternName = semanticResult?.patternName ?? null;
        symbolContext = semanticResult?.context;
    }

    if (!patternName) {
        return;
    }

    // Combine contexts for template replacement
    const templateContext: TemplateContext = {
        symbol: symbolContext,
        file: fileContext,
    };

    const tip = getTipForPattern(
        patternName,
        config.personality,
        languageId,
        templateContext,
    );
    if (tip) {
        recordTipShown();
        sendTip(tip, patternName);
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

    // Extract file context for template replacement
    const fileContext: FileContext = extractFileContext(
        document.uri,
        languageId,
    );

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
                {
                    file: fileContext,
                },
            );
            if (tip) {
                recordTipShown();
                sendTip(tip, match.name);
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

    // Extract file context for template replacement
    const fileContext: FileContext = extractFileContext(
        document.uri,
        document.languageId,
    );

    const tip = getGeneralTip('documentSave', config.personality, [
        fileContext.fileName,
    ]);
    if (tip) {
        recordTipShown();
        sendTip(tip, 'documentSave');
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

    // Extract file context for template replacement
    const fileContext: FileContext = extractFileContext(
        document.uri,
        document.languageId,
    );

    const tip = getGeneralTip('documentClose', config.personality, [
        fileContext.fileName,
    ]);
    if (tip) {
        recordTipShown();
        sendTip(tip, 'documentClose');
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
    const realFile = event.files.find((uri) => uri.scheme === 'file');
    if (!realFile) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    // Extract file context from the first created file
    const fileContext: FileContext = extractFileContext(realFile);

    const tip = getGeneralTip('fileCreate', config.personality, [
        fileContext.fileName,
    ]);
    if (tip) {
        recordTipShown();
        sendTip(tip, 'fileCreate');
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
    const realFile = event.files.find((uri) => uri.scheme === 'file');
    if (!realFile) {
        return;
    }

    if (!shouldShowTip(config.frequency)) {
        return;
    }

    // Extract file context from the first deleted file
    const fileContext: FileContext = extractFileContext(realFile);

    const tip = getGeneralTip('fileDelete', config.personality, [
        fileContext.fileName,
    ]);
    if (tip) {
        recordTipShown();
        sendTip(tip, 'fileDelete');
    }
}

/**
 * Register the Clippy tips provider
 */
export function registerClippyTipsProvider(
    context: vscode.ExtensionContext,
    sendTip: SendTipFn,
): void {
    // Create debounced selection handler
    debouncedSelectionHandler = debounce(
        (event: vscode.TextEditorSelectionChangeEvent, tipFn: SendTipFn) => {
            void handleSelectionChangeAsync(event, tipFn);
        },
        DEFAULT_SEMANTIC_CONFIG.debounceMs,
    );

    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection((event) => {
            debouncedSelectionHandler?.(event, sendTip);
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

    // Invalidate symbol cache on document changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((event) => {
            getSymbolCache().invalidate(event.document.uri);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('vscode-pets.clippyHover')) {
                lastTipTime = 0;
            }
        }),
    );

    // Cleanup on dispose
    context.subscriptions.push({
        dispose: () => {
            debouncedSelectionHandler?.cancel();
            debouncedSelectionHandler = null;
            getSymbolCache().clear();
        },
    });
}
