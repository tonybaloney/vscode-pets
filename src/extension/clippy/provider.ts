/**
 * Clippy Code Messages Provider
 *
 * Shows Clippy-style messages via pet speech bubbles when the user
 * interacts with code triggers in the editor.
 */

import * as vscode from 'vscode';
import { debounce, DebouncedFunction } from './debounce';
import { getSymbolCache, DEFAULT_SEMANTIC_CONFIG } from './semanticDetector';
import { resetRateLimit, SendMessageFn } from './rateLimit';
import { handleSelectionChangeAsync } from './handlers/selection';
import {
    handleDocumentOpen,
    handleDocumentSave,
    handleDocumentClose,
} from './handlers/document';
import { handleFileCreate, handleFileDelete } from './handlers/file';

/**
 * Debounced selection change handler (set during registration)
 */
let debouncedSelectionHandler: DebouncedFunction<
    (
        event: vscode.TextEditorSelectionChangeEvent,
        sendMessage: SendMessageFn,
    ) => Promise<void>
> | null = null;

/**
 * Register the Clippy messages provider
 */
export function registerClippyMessagesProvider(
    context: vscode.ExtensionContext,
    sendMessage: SendMessageFn,
): void {
    // Create debounced selection handler
    debouncedSelectionHandler = debounce(
        (
            event: vscode.TextEditorSelectionChangeEvent,
            msgFn: SendMessageFn,
        ) => {
            void handleSelectionChangeAsync(event, msgFn);
        },
        DEFAULT_SEMANTIC_CONFIG.debounceMs,
    );

    context.subscriptions.push(
        vscode.window.onDidChangeTextEditorSelection((event) => {
            debouncedSelectionHandler?.(event, sendMessage);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument((document) => {
            handleDocumentOpen(document, sendMessage);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument((document) => {
            handleDocumentSave(document, sendMessage);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidCloseTextDocument((document) => {
            handleDocumentClose(document, sendMessage);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidCreateFiles((event) => {
            handleFileCreate(event, sendMessage);
        }),
    );

    context.subscriptions.push(
        vscode.workspace.onDidDeleteFiles((event) => {
            handleFileDelete(event, sendMessage);
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
                resetRateLimit();
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
