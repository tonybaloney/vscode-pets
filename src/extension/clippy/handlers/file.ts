/**
 * File event handlers for Clippy Code Messages
 */

import * as vscode from 'vscode';
import { sendAndRecord, SendMessageFn } from '../rateLimit';
import { shouldProcessEvent } from './document';
import { extractFileContext, getGeneralMessage } from '../messages';

/**
 * Handle file creation
 */
export function handleFileCreate(
    event: vscode.FileCreateEvent,
    sendMessage: SendMessageFn,
): void {
    const config = shouldProcessEvent();
    const realFile = event.files.find((uri) => uri.scheme === 'file');
    if (!realFile) {
        return;
    }

    const { fileName } = extractFileContext(realFile);
    const personality = config?.personality;
    const message = getGeneralMessage('fileCreate', personality, [fileName]);
    sendAndRecord(message, 'fileCreate', sendMessage);
}

/**
 * Handle file deletion
 */
export function handleFileDelete(
    event: vscode.FileDeleteEvent,
    sendMessage: SendMessageFn,
): void {
    const config = shouldProcessEvent();
    const realFile = event.files.find((uri) => uri.scheme === 'file');
    if (!realFile) {
        return;
    }

    const { fileName } = extractFileContext(realFile);
    const personality = config?.personality;
    const message = getGeneralMessage('fileDelete', personality, [fileName]);
    sendAndRecord(message, 'fileDelete', sendMessage);
}
