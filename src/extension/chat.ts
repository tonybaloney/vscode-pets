import * as vscode from 'vscode';
import { PetSpecification } from './extension';



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
                    `;
            const messages = [
                vscode.LanguageModelChatMessage.User(prompt),
                vscode.LanguageModelChatMessage.User(request.prompt)
            ];
    
            const chatResponse = await request.model.sendRequest(messages, {}, token);
            for await (const fragment of chatResponse.text) {
                // Process the output from the language model
                // TODO: 
                stream.markdown(fragment);
            }
        } catch (err) {
            console.log(err);
        }
      }
    );
    petsChat.iconPath = vscode.Uri.joinPath(extensionContext.extensionUri, 'media', 'icon.png');
}
