import * as vscode from 'vscode';
import { PetColor, PetType, PetSize, ALL_PETS } from '../common/types';
import { randomName } from '../common/names';
import { availableColors } from '../panel/pets';
import { PetSpecification } from './extension';

/**
 * Represents an agent pet that is tied to a chat session lifecycle.
 * These pets are ephemeral and not persisted to memento storage.
 */
interface AgentPet {
    sessionId: string;
    spec: PetSpecification;
}

/**
 * Manages the spawning and lifecycle of pets for VS Code chat agent sessions.
 *
 * This feature requires VS Code Insiders with the chatSessionsProvider proposed API.
 * On stable VS Code, the feature will silently disable itself.
 *
 * Pet lifecycle:
 * - A pet is spawned when a new chat session is created
 * - The pet runs when the session is in progress (busy state)
 * - The pet idles when the session completes or fails
 * - The pet is removed when the session is destroyed
 */
export class AgentPetManager implements vscode.Disposable {
    private readonly _disposables: vscode.Disposable[] = [];
    private readonly _agentPets: Map<string, AgentPet> = new Map();
    private _petPanel: IPetPanelForAgents | undefined;
    private _enabled: boolean = false;

    constructor() {
        // Listen for configuration changes
        this._disposables.push(
            vscode.workspace.onDidChangeConfiguration((e) => {
                if (e.affectsConfiguration('vscode-pets.agentPets.enabled')) {
                    this._updateEnabledState();
                }
            }),
        );
    }

    /**
     * Interface for the pet panel that the agent manager interacts with.
     */
    private get petPanel(): IPetPanelForAgents | undefined {
        return this._petPanel;
    }

    /**
     * Sets the pet panel reference for spawning/removing pets.
     */
    public setPetPanel(panel: IPetPanelForAgents | undefined): void {
        this._petPanel = panel;
    }

    /**
     * Initializes the agent pet manager.
     * This method should be called during extension activation.
     *
     * @returns true if the feature was successfully initialized, false otherwise
     */
    public async initialize(): Promise<boolean> {
        this._enabled = this._isFeatureEnabled();

        if (!this._enabled) {
            console.log('Agent pets feature is disabled by configuration.');
            return false;
        }

        try {
            // Try to access the proposed API - this will throw on stable VS Code
            await this._registerChatSessionListeners();
            console.log('Agent pets feature initialized successfully.');
            return true;
        } catch (error) {
            // Proposed API not available (stable VS Code or API not enabled)
            console.log(
                'Agent pets feature not available: Chat sessions API is not accessible. ' +
                    'This feature requires VS Code Insiders with proposed APIs enabled.',
                error,
            );
            this._enabled = false;
            return false;
        }
    }

    /**
     * Checks if the agent pets feature is enabled in settings.
     */
    private _isFeatureEnabled(): boolean {
        return vscode.workspace
            .getConfiguration('vscode-pets')
            .get<boolean>('agentPets.enabled', false);
    }

    /**
     * Updates the enabled state based on configuration.
     */
    private _updateEnabledState(): void {
        const newEnabled = this._isFeatureEnabled();

        if (newEnabled && !this._enabled) {
            // Feature was just enabled - try to initialize
            this.initialize().catch((e) => {
                console.error('Failed to initialize agent pets:', e);
            });
        } else if (!newEnabled && this._enabled) {
            // Feature was just disabled - remove all agent pets
            this._removeAllAgentPets();
            this._enabled = false;
        }
    }

    /**
     * Registers listeners for chat session events.
     * This uses the proposed chatSessionsProvider API.
     */
    private async _registerChatSessionListeners(): Promise<void> {
        // Access the proposed API - will throw if not available
        const chatApi = vscode.chat;

        if (!chatApi) {
            throw new Error('Chat API not available');
        }

        // Check for the proposed events
        // Note: The actual API shape may vary - this is based on research
        if (
            'onDidChangeChatSessionItems' in chatApi &&
            chatApi.onDidChangeChatSessionItems
        ) {
            this._disposables.push(
                chatApi.onDidChangeChatSessionItems(
                    (event: vscode.ChatSessionItemChangeEvent) => {
                        this._handleSessionItemsChange(event);
                    },
                ),
            );
        }

        if (
            'onDidChangeChatSessionItemState' in chatApi &&
            chatApi.onDidChangeChatSessionItemState
        ) {
            this._disposables.push(
                chatApi.onDidChangeChatSessionItemState(
                    (session: vscode.ChatSessionItem) => {
                        this._handleSessionStateChange(session);
                    },
                ),
            );
        }

        // Get initial sessions if available
        if ('getChatSessionItems' in chatApi && chatApi.getChatSessionItems) {
            const sessions = await chatApi.getChatSessionItems();
            if (sessions) {
                for (const session of sessions) {
                    this._spawnPetForSession(session);
                }
            }
        }
    }

    /**
     * Handles changes to chat session items (added, removed, changed).
     *
     * TODO: Add sub-agent support here by checking for subAgentInvocationId
     * in the session item properties. Each sub-agent could spawn its own pet
     * with a distinct visual indicator.
     */
    private _handleSessionItemsChange(
        event: vscode.ChatSessionItemChangeEvent,
    ): void {
        // Handle added sessions - spawn new pets
        if (event.added) {
            for (const session of event.added) {
                this._spawnPetForSession(session);
            }
        }

        // Handle removed sessions - remove associated pets
        if (event.removed) {
            for (const session of event.removed) {
                this._removePetForSession(session);
            }
        }

        // Handle changed sessions - update pet states
        if (event.changed) {
            for (const session of event.changed) {
                this._updatePetStateForSession(session);
            }
        }
    }

    /**
     * Handles state changes for a specific chat session.
     */
    private _handleSessionStateChange(session: vscode.ChatSessionItem): void {
        this._updatePetStateForSession(session);
    }

    /**
     * Gets the session ID from a chat session item.
     */
    private _getSessionId(session: vscode.ChatSessionItem): string {
        return session.resource.toString();
    }

    /**
     * Spawns a pet for a new chat session.
     */
    private _spawnPetForSession(session: vscode.ChatSessionItem): void {
        const sessionId = this._getSessionId(session);

        // Don't spawn if already exists
        if (this._agentPets.has(sessionId)) {
            return;
        }

        // Don't spawn if panel is not available
        if (!this.petPanel) {
            console.log('Cannot spawn agent pet: no pet panel available');
            return;
        }

        // Get configured pet type
        const petType = this._getConfiguredPetType();

        // Get random color from available colors for this pet type
        const petColor = this._getRandomColor(petType);

        // Generate random name
        const petName = randomName(petType);

        // Get configured size
        const petSize = this._getConfiguredSize();

        // Create pet specification
        const spec = new PetSpecification(petColor, petType, petSize, petName);

        // Store the agent pet
        const agentPet: AgentPet = {
            sessionId,
            spec,
        };
        this._agentPets.set(sessionId, agentPet);

        // Spawn the pet in the panel
        this.petPanel.spawnPet(spec);
        console.log(
            `Spawned agent pet "${petName}" for session ${session.label}`,
        );

        // Set initial state based on session status
        this._updatePetStateForSession(session);
    }

    /**
     * Removes the pet associated with a chat session.
     */
    private _removePetForSession(session: vscode.ChatSessionItem): void {
        const sessionId = this._getSessionId(session);
        const agentPet = this._agentPets.get(sessionId);

        if (!agentPet) {
            return;
        }

        // Remove from panel
        if (this.petPanel) {
            this.petPanel.deletePet(
                agentPet.spec.name,
                agentPet.spec.type,
                agentPet.spec.color,
            );
            console.log(
                `Removed agent pet "${agentPet.spec.name}" for ended session`,
            );
        }

        // Remove from tracking
        this._agentPets.delete(sessionId);
    }

    /**
     * Updates the pet state based on the session status.
     * - InProgress: Pet runs around (busy)
     * - Completed/Failed: Pet sits idle
     */
    private _updatePetStateForSession(session: vscode.ChatSessionItem): void {
        const sessionId = this._getSessionId(session);
        const agentPet = this._agentPets.get(sessionId);

        if (!agentPet || !this.petPanel) {
            return;
        }

        const isBusy = session.status === vscode.ChatSessionStatus.InProgress;

        this.petPanel.setAgentPetState(
            agentPet.spec.name,
            agentPet.spec.type,
            agentPet.spec.color,
            isBusy ? 'busy' : 'idle',
        );
    }

    /**
     * Gets the configured pet type for agent pets.
     */
    private _getConfiguredPetType(): PetType {
        const configured = vscode.workspace
            .getConfiguration('vscode-pets')
            .get<PetType>('agentPets.petType', PetType.zappy);

        // Validate the configured type using ALL_PETS array
        // (can't use Object.values on const enums)
        if (ALL_PETS.includes(configured)) {
            return configured;
        }

        return PetType.zappy;
    }

    /**
     * Gets the configured pet size.
     */
    private _getConfiguredSize(): PetSize {
        return vscode.workspace
            .getConfiguration('vscode-pets')
            .get<PetSize>('petSize', PetSize.nano);
    }

    /**
     * Gets a random color from the available colors for a pet type.
     */
    private _getRandomColor(petType: PetType): PetColor {
        const colors = availableColors(petType);
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    /**
     * Removes all agent pets. Called when the feature is disabled.
     */
    private _removeAllAgentPets(): void {
        if (!this.petPanel) {
            this._agentPets.clear();
            return;
        }

        for (const [, agentPet] of this._agentPets) {
            this.petPanel.deletePet(
                agentPet.spec.name,
                agentPet.spec.type,
                agentPet.spec.color,
            );
        }

        this._agentPets.clear();
        console.log('Removed all agent pets');
    }

    /**
     * Disposes the agent pet manager and cleans up resources.
     */
    public dispose(): void {
        this._removeAllAgentPets();

        for (const disposable of this._disposables) {
            disposable.dispose();
        }
        this._disposables.length = 0;
    }
}

/**
 * Interface for the pet panel methods needed by the agent manager.
 * This is a subset of IPetPanel to avoid circular dependencies.
 */
export interface IPetPanelForAgents {
    spawnPet(spec: PetSpecification): void;
    deletePet(petName: string, petType: string, petColor: string): void;
    setAgentPetState(
        petName: string,
        petType: string,
        petColor: string,
        state: 'busy' | 'idle',
    ): void;
}
