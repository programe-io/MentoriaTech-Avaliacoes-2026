// --- 1. ESTADO DO JOGO ---
let game = {
    money: 1,
    income: 0,
    prestigeCount: 0,      // Quantas vezes reiniciou
    prestigeMultiplier: 1, // Multiplicador de bônus global (1 = 100%)
    currentBurger: 'cheese',
    unlockedBurgers: ['cheese'],
    upgrades: {
        grillAuto: { count: 0, cost: 15, incomePerSec: 1 },
        chef: { count: 0, cost: 100, incomePerSec: 8 }
    }
};

// Dados estáticos dos Hambúrgueres do Menu
const burgerMenu = {
    cheese: { name: "Cheeseburger", emoji: "🍔", value: 1, unlockCost: 0 },
    bacon: { name: "Bacon Burger", emoji: "🥓", value: 5, unlockCost: 500 },
    monster: { name: "Monster Burger", emoji: "👑", value: 25, unlockCost: 5000 }
};

// --- 2. ELEMENTOS DO DOM ---
const elMoney = document.getElementById('money');
const elIncome = document.getElementById('income');
const elGrill = document.getElementById('grill');
const elBurgerEmoji = document.getElementById('current-burger-emoji');
const elBurgerName = document.getElementById('current-burger-name');
const elClickValue = document.getElementById('click-value');

// Prestígio
const elPrestigeInfo = document.getElementById('prestige-info');
const elPrestigeCount = document.getElementById('prestige-count');
const elPrestigeBonus = document.getElementById('prestige-bonus');
const btnPrestige = document.getElementById('btn-prestige');

// Botões do Menu
const btnMenuCheese = document.getElementById('btn-menu-cheese');
const btnMenuBacon = document.getElementById('btn-menu-bacon');
const btnMenuMonster = document.getElementById('btn-menu-monster');

// Upgrades
const btnGrillAuto = document.getElementById('buy-grill-auto');
const elCostGrillAuto = document.getElementById('cost-grill-auto');
const elCountGrillAuto = document.getElementById('count-grill-auto');
const cardGrillAuto = document.getElementById('card-grill-auto');

const btnChef = document.getElementById('buy-chef');
const elCostChef = document.getElementById('cost-chef');
const elCountChef = document.getElementById('count-chef');
const cardChef = document.getElementById('card-chef');


// --- 3. ATUALIZAÇÃO DA INTERFACE (UI) ---
function updateUI() {
    // Exibe dinheiro e o lucro passivo com o multiplicador aplicado
    elMoney.innerText = `R$ ${game.money}`;
    elIncome.innerText = `R$ ${Math.floor(game.income * game.prestigeMultiplier)}/s`;
    
    // Atualiza dados do clique baseado no hambúrguer selecionado
    let currentData = burgerMenu[game.currentBurger];
    elBurgerEmoji.innerText = currentData.emoji;
    elBurgerName.innerText = currentData.name;
    elClickValue.innerText = Math.floor(currentData.value * game.prestigeMultiplier);

    // Gerir o estado e texto dos botões do menu
    checkMenuUnlock('bacon', btnMenuBacon, "🥓 Bacon Burger (Disponível!)");
    checkMenuUnlock('monster', btnMenuMonster, "👑 Monster Burger (Disponível!)");

    // Lógica visual da Chapa Automática
    let upGrill = game.upgrades.grillAuto;
    elCostGrillAuto.innerText = `R$ ${upGrill.cost}`;
    elCountGrillAuto.innerText = upGrill.count;
    toggleCardState(cardGrillAuto, btnGrillAuto, game.money >= upGrill.cost);
    
    // Lógica visual do Chapeiro
    let upChef = game.upgrades.chef;
    elCostChef.innerText = `R$ ${upChef.cost}`;
    elCountChef.innerText = upChef.count;
    toggleCardState(cardChef, btnChef, game.money >= upChef.cost);

    // Painel e Botão de Prestígio (Libera a partir de R$ 10.000)
    if (game.prestigeCount > 0) {
        elPrestigeInfo.classList.remove('d-none');
        elPrestigeCount.innerText = game.prestigeCount;
        elPrestigeBonus.innerText = `+${(game.prestigeCount * 10)}%`;
    } else {
        elPrestigeInfo.classList.add('d-none');
    }

    if (game.money >= 10000) {
        btnPrestige.classList.remove('d-none');
    } else {
        btnPrestige.classList.add('d-none');
    }
}

// Auxiliar para ativar/desativar o estilo visual dos cards
function toggleCardState(card, button, isAvailable) {
    if (isAvailable) {
        button.disabled = false;
        card.classList.remove('disabled-card');
        card.classList.add('available-card');
    } else {
        button.disabled = true;
        card.classList.remove('available-card');
        card.classList.add('disabled-card');
    }
}

// Auxiliar para gerir o estado de bloqueio e textos corretos do menu (BUG FIX APLICADO)
function checkMenuUnlock(key, button, openText) {
    if (game.unlockedBurgers.includes(key)) {
        button.disabled = false;
        button.classList.remove('locked');
        if (game.currentBurger !== key) button.innerText = openText;
    } else {
        if (game.money >= burgerMenu[key].unlockCost) {
            button.disabled = false;
            button.classList.remove('locked');
            button.innerText = `🔓 Desbloquear ${burgerMenu[key].name} (R$ ${burgerMenu[key].unlockCost})`;
        } else {
            button.disabled = true;
            button.classList.add('locked');
            // Correção do Bug: Garante que o texto volta ao padrão inicial bloqueado
            button.innerText = `🔒 ${burgerMenu[key].name} (Custo: R$ ${burgerMenu[key].unlockCost})`;
        }
    }
}


// --- 4. EVENTOS DE CLIQUE E MECÂNICAS ---

// Clique manual na chapa
elGrill.addEventListener('click', () => {
    let baseValue = burgerMenu[game.currentBurger].value;
    game.money += Math.floor(baseValue * game.prestigeMultiplier);
    updateUI();
});

// Seleção de Hambúrgueres no Cardápio
function selectBurger(key, buttonElement) {
    if (!game.unlockedBurgers.includes(key)) {
        let cost = burgerMenu[key].unlockCost;
        if (game.money >= cost) {
            game.money -= cost;
            game.unlockedBurgers.push(key);
        } else { return; }
    }
    game.currentBurger = key;
    document.querySelectorAll('.btn-menu').forEach(b => b.classList.remove('active-menu'));
    buttonElement.classList.add('active-menu');
    updateUI();
    saveGame();
}

btnMenuCheese.addEventListener('click', () => selectBurger('cheese', btnMenuCheese));
btnMenuBacon.addEventListener('click', () => selectBurger('bacon', btnMenuBacon));
btnMenuMonster.addEventListener('click', () => selectBurger('monster', btnMenuMonster));


// Compra de Melhorias Passivas
btnGrillAuto.addEventListener('click', () => {
    let up = game.upgrades.grillAuto;
    if (game.money >= up.cost) {
        game.money -= up.cost;
        up.count++;
        game.income += up.incomePerSec;
        up.cost = Math.floor(up.cost * 1.5);
        updateUI();
        saveGame();
    }
});

btnChef.addEventListener('click', () => {
    let up = game.upgrades.chef;
    if (game.money >= up.cost) {
        game.money -= up.cost;
        up.count++;
        game.income += up.incomePerSec;
        up.cost = Math.floor(up.cost * 1.5);
        updateUI();
        saveGame();
    }
});


// MECÂNICA DE PRESTÍGIO: Reseta o restaurante em troca de bónus permanente
btnPrestige.addEventListener('click', () => {
    if (confirm("Deseja vender sua franquia atual? Você perderá seu dinheiro e melhorias atuais, mas ganhará +10% de lucro permanente para sempre!")) {
        game.prestigeCount += 1;
        game.prestigeMultiplier = 1 + (game.prestigeCount * 0.1);
        
        // Reset de fábrica para a nova rodada
        game.money = 1;
        game.income = 0;
        game.currentBurger = 'cheese';
        game.unlockedBurgers = ['cheese'];
        game.upgrades.grillAuto = { count: 0, cost: 15, incomePerSec: 1 };
        game.upgrades.chef = { count: 0, cost: 100, incomePerSec: 8 };

        // Reinicia os botões visuais do menu
        document.querySelectorAll('.btn-menu').forEach(b => b.classList.remove('active-menu'));
        btnMenuCheese.classList.add('active-menu');

        updateUI();
        saveGame();
    }
});


// --- 5. LOOP DE TEMPO (Renda Passiva por segundo) ---
setInterval(() => {
    if (game.income > 0) {
        game.money += Math.floor(game.income * game.prestigeMultiplier);
        updateUI();
    }
}, 1000);


// --- 6. SISTEMA DE SALVAMENTO AUTOMÁTICO (LOCALSTORAGE) ---
function saveGame() {
    localStorage.setItem('burgerTycoon_save', JSON.stringify(game));
}

function loadGame() {
    const savedData = localStorage.getItem('burgerTycoon_save');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Faz o merge com o estado base para evitar problemas caso adiciones novos campos no futuro
        game = { ...game, ...parsed };
        
        // Sincroniza a classe visual ativa do menu com o hambúrguer salvo
        document.querySelectorAll('.btn-menu').forEach(b => b.classList.remove('active-menu'));
        if (game.currentBurger === 'cheese') btnMenuCheese.classList.add('active-menu');
        if (game.currentBurger === 'bacon') btnMenuBacon.classList.add('active-menu');
        if (game.currentBurger === 'monster') btnMenuMonster.classList.add('active-menu');
    }
    updateUI();
}

// Inicia o carregamento e define salvamento automático a cada 5 segundos
loadGame();
setInterval(saveGame, 5000);