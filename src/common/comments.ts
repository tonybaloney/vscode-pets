export function getRandomCommentWhenLevelUp(level: number) {
    const levelUpMessages = [
        `I did it! I'm level ${level} now! 🎉`,
        `Look at me! I've leveled up! 🌟`,
        `I'm getting stronger! Level ${level}, here I am! 💪`,
        `Woohoo! Level up achieved! 🚀`,
        `I'm on fire! Just reached level ${level}! 🔥`,
        `Check it out! I'm now a level higher! 👀`,
        `Yes! I just leveled up to level ${level}! 🙌`,
        `I'm growing! Leveled up to ${level}! 🌱`,
        `Feeling powerful at level ${level}! ⚡`,
        `Level up! I'm now level ${level}! 🎯`
    ];
    const randomMessage = levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)];
    return randomMessage;
}

export function getRandomCommentWhenLowHealth() {
    const lowHealthMessages = [
        `Oh no! My health is too low to level up. 😢`,
        `I need to recover first. My health is too low. 🛌`,
        `I can't level up right now. My health needs attention. 🚑`,
        `Help! My health is too low to advance. 💔`,
        `I need to rest. My health is too low for a level up. 😴`,
        `I’m feeling weak. Can’t level up with low health. 😞`,
        `My health is too low to level up. I need some care. ❤️‍🩹`,
        `I can't go any further with my health this low. 🚫`,
        `My health is not enough to level up. Need a boost! 💊`,
        `Too weak to level up. Need to regain health. 💉`
    ];
    const randomMessage = lowHealthMessages[Math.floor(Math.random() * lowHealthMessages.length)];
    return randomMessage;
}

export function getRandomCommentWhenCompilationError() {
    const encouragementMessages = [
        `Don't worry, we can fix this! 🛠️`,
        `Errors are steps to success! 🚀`,
        `You’ve got this! 💪`,
        `Stay positive! 😊`,
        `Every error is a lesson! 🌟`,
        `Keep calm and debug on! 🐞`,
        `Mistakes mean you’re trying! 💻`,
        `You can do this! 🙌`,
        `Every fix is a victory! ⚡`,
        `You’re doing great! 🌱`,
    ];
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    return randomMessage;
}

export function getRandomCommentWhenCompilationSuccess() {
    const encouragementMessages = [
        `Great job! 🎉`,
        `You did it! 🚀`,
        `Success! 🌟`,
        `Well done! 💪`,
        `Awesome work! 😊`,
        `Compilation complete! 🛠️`,
        `Fantastic! 🙌`,
        `You nailed it! ⚡`,
        `Excellent job! 🌱`,
        `Way to go! 🎯`
    ];
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    return randomMessage;
}