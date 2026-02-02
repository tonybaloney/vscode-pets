/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// https://github.com/microsoft/vscode/issues/XXXXX - Proposed API for chat sessions provider
// This is a proposed API and may change in future versions of VS Code.

declare module 'vscode' {

    /**
     * The status of a chat session.
     */
    export enum ChatSessionStatus {
        /**
         * The session has failed.
         */
        Failed = 0,
        /**
         * The session has completed successfully.
         */
        Completed = 1,
        /**
         * The session is currently in progress.
         */
        InProgress = 2
    }

    /**
     * Represents a chat session item.
     */
    export interface ChatSessionItem {
        /**
         * The URI of the session.
         */
        resource: Uri;

        /**
         * A human-readable label for the session.
         */
        label: string;

        /**
         * The current status of the session.
         */
        status?: ChatSessionStatus;

        /**
         * Timing information for the session.
         */
        timing?: {
            /**
             * When the session was created.
             */
            created: number;
            /**
             * When the last request started.
             */
            lastRequestStarted?: number;
            /**
             * When the last request ended.
             */
            lastRequestEnded?: number;
        };
    }

    /**
     * Event fired when chat session items change.
     */
    export interface ChatSessionItemChangeEvent {
        /**
         * The session items that were added.
         */
        added?: readonly ChatSessionItem[];

        /**
         * The session items that were removed.
         */
        removed?: readonly ChatSessionItem[];

        /**
         * The session items that were changed.
         */
        changed?: readonly ChatSessionItem[];
    }

    /**
     * Provider for chat session items.
     */
    export interface ChatSessionsProvider {
        /**
         * Event fired when chat session items change.
         */
        onDidChangeChatSessionItems: Event<ChatSessionItemChangeEvent>;

        /**
         * Event fired when a chat session item's state changes.
         */
        onDidChangeChatSessionItemState?: Event<ChatSessionItem>;

        /**
         * Provide chat session items.
         * @param token A cancellation token.
         */
        provideChatSessionItems(token: CancellationToken): ProviderResult<ChatSessionItem[]>;
    }

    export namespace chat {
        /**
         * Register a chat sessions provider.
         * @param id The unique identifier for the provider.
         * @param provider The provider to register.
         */
        export function registerChatSessionsProvider(id: string, provider: ChatSessionsProvider): Disposable;

        /**
         * Event fired when chat session items change.
         */
        export const onDidChangeChatSessionItems: Event<ChatSessionItemChangeEvent> | undefined;

        /**
         * Event fired when a chat session item's state changes.
         */
        export const onDidChangeChatSessionItemState: Event<ChatSessionItem> | undefined;

        /**
         * Get all chat session items.
         */
        export function getChatSessionItems(): Thenable<ChatSessionItem[]> | undefined;
    }
}
