export function showBar(name: string, level: number, experience: number, target: number, health: number) {
    // Do data sanity check
    if (level < 1) {
        console.log("Illegal level value.");
    } else if (experience > target || experience < 0) {
        console.log("Illegal experience value.");
    } else if (health > 100 || health < 0) {
        console.log("Illegal health value.");
    }
    const sc = document.getElementById("status-container");
    const nameText = document.getElementById("name");
    const levelText = document.getElementById("level");
    const healthText = document.getElementById("health-value");
    const experienceText = document.getElementById("experience-value");
    if (sc === null || nameText === null || levelText === null || healthText === null || experienceText === null) {
        console.log("Incorrect HTML structure.");
    } else {
        nameText.innerHTML = name;
        levelText.innerHTML = "Level " + level;
        healthText.innerHTML = health + "/100";
        experienceText.innerHTML = experience + "/" + target;
        adjustExperienceBar(experience, target);
        adjustHealthBar(health);
        sc.style.display = "block";
    }
}

export function hideBar() {
    const sc = document.getElementById("status-container");
    if (sc === null) {
        console.log("No status container found");
    } else {
        sc.style.display = "none";
    }
}

export function updateBar(name: string, level: number, experience: number, target: number, health: number) {
    const match = checkVisiblityAndName(name);
    if (match !== 1) {
        return;
    }
    const sc = document.getElementById("status-container");
    const nameText = document.getElementById("name");
    const levelText = document.getElementById("level");
    const healthText = document.getElementById("health-value");
    const experienceText = document.getElementById("experience-value");
    if (sc === null || nameText === null || levelText === null || healthText === null || experienceText === null) {
        console.log("Incorrect HTML structure.");
    } else {
        nameText.innerHTML = name;
        levelText.innerHTML = "Level " + level;
        healthText.innerHTML = health + "/100";
        experienceText.innerHTML = experience + "/" + target;
        adjustExperienceBar(experience, target);
        adjustHealthBar(health);
    }
}

export function checkVisiblityAndName(name: string) {
    const sc = document.getElementById("status-container");
    const nameText = document.getElementById("name");
    if (nameText === null) {
        return -1;
    } else if (sc === null) {
        return -1;
    } else if (sc.style.display === "none") {
        return 0;
    } else if (nameText.innerHTML !== name) {
        return 0;
    } else {
        return 1;
    }
}


function adjustHealthBar(value: number) {
    const bar = document.getElementById("health-bar");
    if (bar === null) {
        console.log("Incorrect HTML structure");
    } else {
        const barWidth = value;
        bar.style.width = barWidth + "%";
    }
}

function adjustExperienceBar(value: number, target: number) {
    const bar = document.getElementById("experience-bar");
    if (bar === null) {
        console.log("Incorrect HTML structure");
    } else {
        const barWidth = value / target * 100;
        bar.style.width = barWidth + "%";
    }
}