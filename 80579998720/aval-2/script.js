
/* =====================================
   MUNDO DOS ANIMAIS - WILD WORLD
===================================== */

// JOGADOR

let player = {
    xp: 0,
    coins: 100,
    energy: 100,
    discoveries: [],
    selectedAnimal: null,
    exploredBiomes: [],
    babies: 0
};

// ANIMAIS

const animals = {
    Leão: {
        emoji: "🦁",
        food: "Carne",
        habitat: "Savana",
        description: "O rei da savana!"
    },

    Elefante: {
        emoji: "🐘",
        food: "Plantas",
        habitat: "Savana",
        description: "Um gigante gentil!"
    },

    Lobo: {
        emoji: "🐺",
        food: "Carne",
        habitat: "Montanhas",
        description: "Um excelente explorador!"
    },

    Raposa: {
        emoji: "🦊",
        food: "Frutas",
        habitat: "Floresta",
        description: "Um animal rápido e inteligente!"
    },

    Golfinho: {
        emoji: "🐬",
        food: "Peixes",
        habitat: "Oceano",
        description: "Um grande nadador!"
    },

    Tigre: {
        emoji: "🐅",
        food: "Carne",
        habitat: "Floresta",
        description: "Um poderoso felino!"
    }
};

// BIOMAS

const biomes = {
    Savana: {
        emoji: "🦁",
        animals: ["Leão", "Elefante"],
        reward: 50
    },

    Floresta: {
        emoji: "🌴",
        animals: ["Raposa", "Tigre"],
        reward: 60
    },

    Ártico: {
        emoji: "❄️",
        animals: ["Lobo"],
        reward: 70
    },

    Oceano: {
        emoji: "🌊",
        animals: ["Golfinho"],
        reward: 80
    }
};

// ELEMENTOS HTML

const xpDisplay = document.getElementById("xp");
const coinsDisplay = document.getElementById("coins");
const countDisplay = document.getElementById("count");

const panelTitle = document.getElementById("panelTitle");
const panelText = document.getElementById("panelText");

// ATUALIZAR TELA

function updateStats() {

    xpDisplay.textContent = player.xp;
    coinsDisplay.textContent = player.coins;
    countDisplay.textContent = player.discoveries.length;

}

// INICIAR JOGO

function startGame() {

    panelTitle.textContent = "🐾 A aventura começou!";

    panelText.textContent =
        "Escolha seu animal favorito e explore a natureza!";

    player.energy = Math.min(100, player.energy + 10);

    updateStats();
}

// ESCOLHER ANIMAL

function chooseAnimal(name) {

    const animal = animals[name];

    if (!animal) return;

    player.selectedAnimal = name;

    if (!player.discoveries.includes(name)) {

        player.discoveries.push(name);

        player.xp += 100;
        player.coins += 30;

    } else {

        player.xp += 10;

    }

    panelTitle.textContent =
        animal.emoji + " " + name + " escolhido!";

    panelText.textContent =
        animal.description +
        " Habitat: " + animal.habitat +
        ". Alimentação: " + animal.food + ".";

    updateStats();
    saveGame();

}

// EXPLORAR BIOMA

function explore(biomeName) {

    const biome = biomes[biomeName];

    if (!biome) return;

    if (player.energy < 10) {

        panelTitle.textContent = "😴 Você está cansado!";

        panelText.textContent =
            "Descanse para recuperar sua energia.";

        return;
    }

    player.energy -= 10;

    if (!player.exploredBiomes.includes(biomeName)) {

        player.exploredBiomes.push(biomeName);

        player.xp += biome.reward;
        player.coins += 20;

    } else {

        player.xp += 10;
        player.coins += 5;

    }

    panelTitle.textContent =
        biome.emoji + " Explorando " + biomeName;

    panelText.textContent =
        "Você está explorando " + biomeName +
        "! Animais encontrados: " +
        biome.animals.join(", ") +
        ". Energia restante: " + player.energy + "%.";

    updateStats();
    saveGame();

}

// ALIMENTAR ANIMAL

function feedAnimal() {

    if (!player.selectedAnimal) {

        panelTitle.textContent = "🐾 Escolha um animal!";

        panelText.textContent =
            "Você precisa escolher um animal antes de alimentá-lo.";

        return;
    }

    if (player.coins < 10) {

        panelTitle.textContent = "🪙 Moedas insuficientes!";

        panelText.textContent =
            "Você precisa de 10 moedas para comprar alimento.";

        return;
    }

    player.coins -= 10;
    player.energy = Math.min(100, player.energy + 20);
    player.xp += 15;

    panelTitle.textContent = "🍎 Hora de comer!";

    panelText.textContent =
        player.selectedAnimal +
        " recebeu alimento e recuperou energia!";

    updateStats();
    saveGame();

}

// DESCANSAR

function restAnimal() {

    player.energy = 100;

    panelTitle.textContent = "😴 Hora de descansar!";

    panelText.textContent =
        "Seu animal recuperou toda a energia.";

    updateStats();
    saveGame();

}

// TER FILHOTE

function haveBaby() {

    if (!player.selectedAnimal) {

        panelTitle.textContent = "🐾 Escolha um animal!";

        panelText.textContent =
            "Escolha um animal antes de criar uma família.";

        return;
    }

    if (player.coins < 50) {

        panelTitle.textContent = "🪙 Faltam moedas!";

        panelText.textContent =
            "Você precisa de 50 moedas para cuidar de um filhote.";

        return;
    }

    player.coins -= 50;
    player.babies++;
    player.xp += 100;

    panelTitle.textContent = "🐣 Novo filhote!";

    panelText.textContent =
        "Você agora tem " + player.babies +
        " filhote(s) de " + player.selectedAnimal + "!";

    updateStats();
    saveGame();

}

// CONQUISTAS

function achievements() {

    let message = "🏆 SUAS CONQUISTAS\n\n";

    if (player.discoveries.length >= 3) {
        message += "🥉 Explorador iniciante\n";
    }

    if (player.discoveries.length >= 5) {
        message += "🥈 Mestre dos animais\n";
    }

    if (player.exploredBiomes.length >= 4) {
        message += "🥇 Explorador da natureza\n";
    }

    if (player.babies >= 1) {
        message += "🐣 Primeira família\n";
    }

    panelTitle.textContent = "🏆 Conquistas";

    panelText.textContent =
        message.replaceAll("\n", " | ");

}

// SALVAR JOGO

function saveGame() {

    localStorage.setItem(
        "wildWorldSave",
        JSON.stringify(player)
    );

}

// CARREGAR JOGO

function loadGame() {

    const saved = localStorage.getItem("wildWorldSave");

    if (saved) {

        try {

            const data = JSON.parse(saved);

            if (
                typeof data.xp === "number" &&
                typeof data.coins === "number" &&
                typeof data.energy === "number" &&
                Array.isArray(data.discoveries) &&
                Array.isArray(data.exploredBiomes) &&
                typeof data.babies === "number" &&
                (
                    data.selectedAnimal === null ||
                    animals[data.selectedAnimal]
                )
            ) {

                player = data;

            }

        } catch (error) {

            console.log("Erro ao carregar o jogo.");

        }

    }

    updateStats();

}

// INICIAR

loadGame();

console.log("🐾 WILD WORLD INICIADO!");
console.log("🌳 Bem-vindo ao mundo dos animais!");
