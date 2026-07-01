const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const logBox = document.getElementById('combat-log');

const TILE_SIZE = 48;

// 1. CONFIGURAÇÕES DO JOGADOR
const player = {
    gridX: 10,
    gridY: 10,
    targetX: 10,
    targetY: 10,
    animProgress: 0,
    facing: 'down',
    hp: 100,
    maxHp: 100,
    gold: 150,
    weapon: { name: "Arco Inicial", dmg: 15, range: 4 },
    armor: { name: "Túnica Velha", def: 2 }
};

// 2. ITENS DA LOJA DO MERCADOR
const SHOP_ITEMS = [
    { name: "Ultimate Health Potion", cost: 40, type: "potion", value: 50 },
    { name: "Arco Real de Brília", cost: 100, type: "weapon", dmg: 35, range: 5 },
    { name: "Besta de Macrubira", cost: 180, type: "weapon", dmg: 55, range: 4 },
    { name: "Armadura de Placas", cost: 120, type: "armor", def: 12 },
    { name: "Manto Sagrado", cost: 250, type: "armor", def: 22 }
];

let entities = [];

/* ==========================================================================
   GERAÇÃO DO MAPA (0 = Grama, 1 = Parede, 2 = Estrada, 3 = Loja, 4 = Porta, 5 = Floresta)
   ========================================================================== */
function getTileAt(x, y) {
    if (Math.abs(x) > 500 || Math.abs(y) > 500) return 1; // Limite do mundo

    // BIOMA 1: Vila Segura (Coordenadas próximas ao centro)
    if (x >= -50 && x <= 50 && y >= -50 && y <= 50) {
        let localX = ((x % 20) + 20) % 20;
        let localY = ((y % 20) + 20) % 20;

        // Geração matemática de casas de 6x6 blocos
        if (localX >= 4 && localX <= 10 && localY >= 4 && localY <= 10) {
            if (localX === 7 && localY === 10) return 4; // Porta de entrada
            if (localX === 4 || localX === 10 || localY === 4 || localY === 10) return 1; // Paredes
            return 3; // Chão interno
        }
        if (x === 0 || y === 0) return 2; // Estradas principais
        return 0; // Gramado da vila
    } 
    
    // BIOMA 2: Floresta Escura
    else {
        let noise = Math.sin(x * 0.4) * Math.cos(y * 0.4);
        if (noise > 0.4) return 1; // Árvores intransitáveis
        return 5; // Solo escuro da floresta
    }
}

// 3. POPULAR O MUNDO COM MONSTROS, MERCADORES E CIVIS
function populateRegion() {
    entities = [];
    let startX = player.gridX - 12;
    let endX = player.gridX + 12;
    let startY = player.gridY - 10;
    let endY = player.gridY + 10;

    for (let y = startY; y < endY;