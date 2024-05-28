// import * as dotenv from '../node_modules/dotenv/lib/main';

// dotenv.config();

// Handle the UI
let currentName: string;
let chatHistory: Array<string> = [];

export function showChatbox(name: string) {
    currentName = name;
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
    const context = `You are a virtual pet named ${currentName} for students to learn programming. You should talk in a cute way and give the student emotional support and encouragement. You have been talking about these: ${memory}`;
    displayMessage('You', inputValue);
    storeMessage('You', inputValue);
    const inputField = document.getElementById('message-input') as HTMLInputElement;
    inputField.value = '';
     const data = {
        model: "gpt-3.5-turbo", 
        messages: [{
            role: "system",
            content: context
        }, {
            role: "user",
            content: inputValue
        }],
        temperature: 0.7,
        max_tokens: 50
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 123`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch AI response');
        }
        const responseData = await response.json();
        const aiText = responseData.choices[0].message.content;
        displayMessage(currentName, aiText);
        storeMessage(currentName, aiText);
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        const errText = 'Sorry, there was an error processing your request.'
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
    return chatHistory.join('\n');
}