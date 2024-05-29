// import * as dotenv from '../node_modules/dotenv/lib/main';

// dotenv.config();

// Handle the UI
let currentName: string;
let currentPetType: string;
let chatHistory: Array<string> = [];

export function showChatbox(name: string, petType: string) {
    currentName = name;
    currentPetType = petType;
    chatHistory = [];
    const chatbox = document.getElementById("chatbox");
    if (chatbox) {
        chatbox.style.display = "block";
        const chatboxTitle = document.getElementById("chatbox-title");
        if (chatboxTitle) {
            chatboxTitle.innerHTML = "Chat with " + name + "!";
        }
        const chatboxMessages = document.getElementById("chatbox-messages");
        if (chatboxMessages) {
            while (chatboxMessages.firstChild) {
                chatboxMessages.removeChild(chatboxMessages.firstChild);
            }
        }
    }

}

export function hideChatbox() {
    chatHistory = [];
    const chatbox = document.getElementById("chatbox");
    if (chatbox) {
        chatbox.style.display = "none";
    }
}


export function checkChatboxVisiblityAndName(name: string) {
    const chatbox = document.getElementById("chatbox");
    if (chatbox === null) {
        return -1;
    } else if (chatbox.style.display === "none") {
        return 0;
    } else if (currentName !== name) {
        return 0;
    } else {
        return 1;
    }
}


// Send the chat msg

document.getElementById('send-button')?.addEventListener('click', async () => {
    const userInput = document.getElementById('message-input') as HTMLInputElement;
    const inputValue = userInput.value;
    if (inputValue.trim() === '') {
        return;
    }
    const memory = getMemory();
    // console.log(memory);
    let context = `You are a virtual pet ${currentPetType} named ${currentName} for students to learn programming. You should talk in a cute way and give the student emotional support and encouragement. Please keep your response short. `;
    if (memory.length !== 0) {
        context +=  `You have been talking about these: ${memory}`;
    }
    displayMessage('You', inputValue);
    storeMessage('You', inputValue);
    const inputField = document.getElementById('message-input') as HTMLInputElement;
    inputField.value = '';
    context += "Now please reply to this message: " + inputValue;
    const data = {
        contents: [{
                role: "user",
                parts: [
                    {
                        text: context
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150
        }


    };
    console.log("Prompt: " + context);


    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=123', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        const resText = JSON.stringify(responseData);
        if (!response.ok) {
            throw new Error('Failed to fetch AI response' + resText);
        }
        const aiText = responseData.candidates[0].content.parts[0].text;
        displayMessage(currentName, aiText);
        storeMessage(currentName, aiText);
    } catch (error) {
        console.error('Error fetching response from Gemini: ', error);
        const errText = 'Sorry, there was an error processing your request.';
        displayMessage(currentName, errText);
        storeMessage(currentName, errText);
    }

    
});


function displayMessage(sender: string, message: string) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    const messageSender = document.createElement('div');
    messageSender.classList.add('message-sender');
    messageSender.textContent = sender;
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    
    messageContainer.appendChild(messageSender);
    messageContainer.appendChild(messageContent);
    
    document.getElementById('chatbox-messages')?.appendChild(messageContainer);
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}

function storeMessage(sender: string, message: string) {
    if (sender === "You") {
        chatHistory.push("Student: " + message);
    } else {
        chatHistory.push("You: " + message);
    }
}

function getMemory() {
    return chatHistory.join('  ');
}