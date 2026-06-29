// Dados do jogo
let money = 0;
let incomePerSecond = 0;

const upgrades = {
    grillAuto: {
        count: 0,
        cost: 15,
        multiplier: 1.2,
        incomeValue: 1
    },
    chef: {
        count: 0,
        cost: 100,
        multiplier: 1.25,
        incomeValue: 8
    }
};

// Seleção de elementos do DOM
const moneyDisplay = document.getElementById('money');
const incomeDisplay = document.getElementById('income');
const grill = document.getElementById('grill');

const btnGrillAuto = document.getElementById('buy-grill-auto');
const costGrillAutoDisplay = document.getElementById('cost-grill-auto');
const countGrillAutoDisplay = document.getElementById('count-grill-auto');

const btnChef = document.getElementById('buy-chef');
const costChefDisplay = document.getElementById('cost-chef');
const countChefDisplay = document.getElementById('count-chef');

// Atualiza a interface gráfica
function updateUI() {
    moneyDisplay.textContent = `R$ ${Math.floor(money)}`;
    incomeDisplay.textContent = `R$ ${incomePerSecond}/s`;

    // Botão Chapa Automática
    costGrillAutoDisplay.textContent = `R$ ${Math.ceil(upgrades.grillAuto.cost)}`;
    countGrillAutoDisplay.textContent = upgrades.grillAuto.count;
    btnGrillAuto.disabled = money < upgrades.grillAuto.cost;

    // Botão Chapeiro
    costChefDisplay.textContent = `R$ ${Math.ceil(upgrades.chef.cost)}`;
    countChefDisplay.textContent = upgrades.chef.count;
    btnChef.disabled = money < upgrades.chef.cost;
}

// Evento de clique na Chapa (Ganha R$ 1 manualmente)
grill.addEventListener('click', () => {
    money += 1;
    updateUI();
});

// Comprar Upgrade 1
btnGrillAuto.addEventListener('click', () => {
    if (money >= upgrades.grillAuto.cost) {
        money -= upgrades.grillAuto.cost;
        upgrades.grillAuto.count++;
        incomePerSecond += upgrades.grillAuto.incomeValue;
        upgrades.grillAuto.cost *= upgrades.grillAuto.multiplier;
        updateUI();
    }
});

// Comprar Upgrade 2
btnChef.addEventListener('click', () => {
    if (money >= upgrades.chef.cost) {
        money -= upgrades.chef.cost;
        upgrades.chef.count++;
        incomePerSecond += upgrades.chef.incomeValue;
        upgrades.chef.cost *= upgrades.chef.multiplier;
        updateUI();
    }
});

// Loop principal (Garante o ganho passivo por segundo)
setInterval(() => {
    if (incomePerSecond > 0) {
        money += incomePerSecond;
        updateUI();
    }
}, 1000);

// Inicializa a interface
updateUI();