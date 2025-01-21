import * as vscode from 'vscode';
import { PetSpecification, say } from './extension';

interface PetSelection {
    petName: string;
    petType: string;
    petColor: string;
}

export function registerChatHandler(extensionContext: vscode.ExtensionContext) {
    const petsChat = vscode.chat.createChatParticipant('vscode-pets.pets', async (
        request: vscode.ChatRequest,
        context: vscode.ChatContext,
        stream: vscode.ChatResponseStream,
        token: vscode.CancellationToken
      ): Promise<vscode.ChatResult | void> => {
        // Test for the `teach` command
        // Shrug.
        try {
            var petList = PetSpecification.collectionFromMemento(extensionContext).map(pet => `- Name: "${pet.name}", Animal: ${pet.type}, Color: ${pet.color}`).join('\n ');
    
            const prompt = `
                    Your job is to help users with their code. You will pretend to be one of the following pets:
                    ${petList}
    
                    When responding, use the emoji of the corresponding animal and the name of the pet then a colon and your answer.
                    If the user does not specify the name of the pet, you can choose any pet to respond.
                    If the user asks a question that is about that pet, you should respond as that pet.
                    If the user asks a question multiple pets, give a general answer.
                    If the user asks a question that is about the pet and not about coding, you can create a fun response.
                    When answering, you should use language that is appropriate for the pet you are pretending to be.
                    Always start your response with the name, animal and color like this <name | animal | color> for example "<Fluffy | cat | white>"
                    `;
            const messages = [
                vscode.LanguageModelChatMessage.User(prompt),
                vscode.LanguageModelChatMessage.User(request.prompt)
            ];

            // TODO : Add code references
    
            var tools: vscode.LanguageModelChatTool[] = [
                {
                    name: 'selected-pet',
                    description: 'The name of the pet that was selected to answer the question',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            petName: {
                                type: 'string',
                                enum: PetSpecification.collectionFromMemento(extensionContext).map(pet => pet.name)
                            },
                            petType: {
                                type: 'string',
                                enum: PetSpecification.collectionFromMemento(extensionContext).map(pet => pet.type)
                            },
                            petColor: {
                                type: 'string',
                                enum: PetSpecification.collectionFromMemento(extensionContext).map(pet => pet.color)
                            }
                        },
                        required: ['petName', 'petType', 'petColor']
                    }
                }
            ];
            const chatOpts = {
            };
            const chatResponse = await request.model.sendRequest(messages, chatOpts, token);
            var firstToken = true;
            var writingMeta = false;
            var petDetails = '';
            var petSelection: PetSelection | null = null;
            for await (const fragment of chatResponse.stream) {
                // Process the output from the language model
                // TODO: 
                if (fragment instanceof vscode.LanguageModelTextPart) {
                    console.log("text fragment: ", fragment);
                    if (firstToken && fragment.value.startsWith('<')) {
                        petDetails += fragment.value.substring(1);
                        firstToken = false;
                        writingMeta = true;
                    } else if (!firstToken && writingMeta) {

                        if (fragment.value.includes('>')) {
                            writingMeta = false;
                            petDetails += fragment.value.substring(0, fragment.value.indexOf('>') - 1);
                            const petDetailsArray = petDetails.split('|').map(part => part.trim());
                            petSelection = {
                                petName: petDetailsArray[0].trim(),
                                petType: petDetailsArray[1].toLowerCase().trim(),
                                petColor: petDetailsArray[2].toLowerCase().trim()
                            };
                            // Send anything after the > to the stream
                            stream.markdown(fragment.value.substring(fragment.value.indexOf('>') + 1));
                        } else {
                            petDetails += fragment.value;
                        }
                    } else {
                        stream.markdown(fragment.value);
                    }
                } else {
                    console.log("unknown fragment type: ", fragment);
                }
            }

            if (petSelection) {
                stream.button({
                    command: 'vscode-pets.pet',
                    title: vscode.l10n.t(`Thank ${petSelection.petName} the ${petSelection.petType} for their help!`),
                    arguments: [
                        petSelection.petName,
                        petSelection.petType,
                        petSelection.petColor
                    ]
                });
            }
        } catch (err) {
            console.log(err);
        }
      }
    );
    petsChat.iconPath = vscode.Uri.joinPath(extensionContext.extensionUri, 'media', 'icon.png');
}
