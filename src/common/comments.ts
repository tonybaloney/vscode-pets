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