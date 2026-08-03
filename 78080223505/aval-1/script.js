// ==================== ESTADO DO JOGO ====================
let gameState = {
  mode: null,
  score: 0,
  lives: 3,
  level: 1,
  correctAnswers: 0,
  totalAnswers: 0,
  maxLevel: 5,
  selectedItem: null
};

// ==================== DADOS DOS JOGOS ====================
const TRASH_DATA = {
  paper: [
    {icon: '📰', name: 'Jornal'}, {icon: '📄', name: 'Papel'}, {icon: '📦', name: 'Caixa'},
    {icon: '📋', name: 'Papelão'}, {icon: '🧾', name: 'Recibo'}, {icon: '📝', name: 'Folha'}
  ],
  plastic: [
    {icon: '🧴', name: 'Garrafa PET'}, {icon: '🥤', name: 'Copo'}, {icon: '🛍️', name: 'Sacola'},
    {icon: '🧃', name: 'Embalagem'}, {icon: '🥡', name: 'Pote'}, {icon: '🧼', name: 'Frasco'}
  ],
  organic: [
    {icon: '🍌', name: 'Banana'}, {icon: '🍎', name: 'Maçã'}, {icon: '🥬', name: 'Folha'},
    {icon: '🥚', name: 'Ovo'}, {icon: '☕', name: 'Café'}, {icon: '🍞', name: 'Pão'}
  ],
  glass: [
    {icon: '🍾', name: 'Garrafa'}, {icon: '🫙', name: 'Pote Vidro'}, {icon: '🥃', name: 'Copo Vidro'},
    {icon: '🪞', name: 'Espelho'}, {icon: '🏺', name: 'Vaso'}, {icon: '🍷', name: 'Taça'}
  ],
  metal: [
    {icon: '🥫', name: 'Lata'}, {icon: '🔩', name: 'Parafuso'}, {icon: '🔑', name: 'Chave'},
    {icon: '🪙', name: 'Moeda'}, {icon: '🍴', name: 'Talher'}, {icon: '🔧', name: 'Chave Inglesa'}
  ]
};

const BINS_CONFIG = [
  {type: 'paper', icon: '📄', label: 'Papel', class: 'bin-paper'},
  {type: 'plastic', icon: '🥤', label: 'Plástico', class: 'bin-plastic'},
  {type: 'organic', icon: '🍎', label: 'Orgânico', class: 'bin-organic'},
  {type: 'glass', icon: '🍾', label: 'Vidro', class: 'bin-glass'},
  {type: 'metal', icon: '🥫', label: 'Metal', class: 'bin-metal'}
];

const BODY_SYSTEMS = [
  { id: 'digestive', name: 'Sistema Digestório', icon: '🍽️', desc: 'Digestão de alimentos', organs: ['Esôfago', 'Estômago', 'Intestino', 'Fígado'] },
  { id: 'respiratory', name: 'Sistema Respiratório', icon: '💨', desc: 'Troca de gases', organs: ['Pulmão', 'Traqueia', 'Laringe'] },
  { id: 'circulatory', name: 'Sistema Circulatório', icon: '❤️', desc: 'Transporte de sangue', organs: ['Coração', 'Veias', 'Artérias'] },
  { id: 'nervous', name: 'Sistema Nervoso', icon: '🧠', desc: 'Controle do corpo', organs: ['Cérebro', 'Nervos', 'Medula'] },
  { id: 'skeletal', name: 'Sistema Esquelético', icon: '🦴', desc: 'Sustentação e proteção', organs: ['Crânio', 'Fêmur', 'Costelas'] }
];

const ORGANS_DATA = [
  { icon: '🫁', name: 'Pulmão', system: 'respiratory' },
  { icon: '🟤', name: 'Estômago', system: 'digestive' },
  { icon: '❤️', name: 'Coração', system: 'circulatory' },
  { icon: '🧠', name: 'Cérebro', system: 'nervous' },
  { icon: '💀', name: 'Crânio', system: 'skeletal' },
  { icon: '🌀', name: 'Intestino', system: 'digestive' },
  { icon: '🌬️', name: 'Traqueia', system: 'respiratory' },
  { icon: '🩸', name: 'Veias', system: 'circulatory' },
  { icon: '🦵', name: 'Fêmur', system: 'skeletal' },
  { icon: '⚡', name: 'Nervos', system: 'nervous' }
];

const BIOMES = [
  {
    name: 'Savana Africana', desc: 'Planície tropical com grandes herbívoros e predadores',
    chain: [
      { role: 'Produtor', hint: 'Planta', icon: '🌱', name: 'Capim' },
      { role: 'Consumidor 1º', hint: 'Herbívoro', icon: '🦓', name: 'Zebra' },
      { role: 'Consumidor 2º', hint: 'Carnívoro', icon: '🦁', name: 'Leão' },
      { role: 'Decompositor', hint: 'Reciclador', icon: '🪱', name: 'Minhoca' }
    ]
  },
  {
    name: 'Floresta Amazônica', desc: 'Ecossistema rico e diversificado',
    chain: [
      { role: 'Produtor', hint: 'Árvore', icon: '🌳', name: 'Castanheira' },
      { role: 'Consumidor 1º', hint: 'Herbívoro/Frugívoro', icon: '🐒', name: 'Macaco' },
      { role: 'Consumidor 2º', hint: 'Predador', icon: '🐆', name: 'Onça-Pintada' },
      { role: 'Decompositor', hint: 'Fungo', icon: '🍄', name: 'Cogumelo' }
    ]
  },
  {
    name: 'Oceano', desc: 'Vida marinha aquática',
    chain: [
      { role: 'Produtor', hint: 'Microalga', icon: '🦠', name: 'Fitoplâncton' },
      { role: 'Consumidor 1º', hint: 'Pequeno crustáceo', icon: '🦐', name: 'Kril' },
      { role: 'Consumidor 2º', hint: 'Peixe carnívoro', icon: '🐟', name: 'Atum' },
      { role: 'Decompositor', hint: 'Bactéria marinha', icon: '🧫', name: 'Bactéria' }
    ]
  }
];

// ==================== INICIALIZAÇÃO E TELAS ====================
document.addEventListener('DOMContentLoaded', () => {
  createLeaves();
});

function createLeaves() {
  const bg = document.getElementById('bgAnimation');
  const leaves = ['🍃', '🌿', '🍀', '🌱', '🌾'];
  for (let i = 0; i < 15; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = (Math.random() * 8 + 8) + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    bg.appendChild(leaf);
  }
}

function startGame(mode) {
  gameState.mode = mode;
  gameState.score = 0;
  gameState.lives = 3;
  gameState.level = 1;
  gameState.correctAnswers = 0;
  gameState.totalAnswers = 0;
  gameState.selectedItem = null;
  
  document.getElementById('menuScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('hud').style.display = 'flex';
  document.getElementById('gameArea').style.display = 'block';
  
  updateHUD();
  loadLevel();
}

function restartGame() {
  startGame(gameState.mode);
}

function backToMenu() {
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('hud').style.display = 'none';
  document.getElementById('gameArea').style.display = 'none';
  document.getElementById('gameArea').innerHTML = '';
  document.getElementById('menuScreen').classList.remove('hidden');
}

function updateHUD() {
  document.getElementById('scoreValue').textContent = gameState.score;
  document.getElementById('levelValue').textContent = 'Nível ' + gameState.level;
  
  const heartsContainer = document.getElementById('heartsContainer');
  heartsContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart' + (i >= gameState.lives ? ' lost' : '');
    heart.textContent = '❤️';
    heartsContainer.appendChild(heart);
  }
}

function showFeedback(text, success) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = text;
  feedback.className = 'feedback ' + (success ? 'feedback-success' : 'feedback-fail');
  feedback.classList.remove('show');
  void feedback.offsetWidth;
  feedback.classList.add('show');
}

function createConfetti() {
  const colors = ['#10b981', '#fbbf24', '#3b82f6', '#ec4899', '#f97316'];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.3 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function handleCorrect() {
  gameState.score += 100 + (gameState.level * 20);
  gameState.correctAnswers++;
  gameState.totalAnswers++;
  updateHUD();
  showFeedback('✨ Excelente!', true);
  createConfetti();
  
  if (gameState.correctAnswers % 3 === 0) {
    if (gameState.level < gameState.maxLevel) {
      gameState.level++;
      setTimeout(() => {
        showFeedback('🚀 Nível ' + gameState.level + '!', true);
        loadLevel();
      }, 1000);
    } else {
      setTimeout(endGame, 1000);
    }
  } else {
    setTimeout(loadLevel, 800);
  }
}

function handleWrong() {
  gameState.lives--;
  gameState.totalAnswers++;
  updateHUD();
  showFeedback('❌ Ops! Tente de novo', false);
  
  if (gameState.lives <= 0) {
    setTimeout(endGame, 1000);
  }
}

function loadLevel() {
  gameState.selectedItem = null;
  if (gameState.mode === 'recycle') initRecycleGame();
  else if (gameState.mode === 'body') initBodyGame();
  else if (gameState.mode === 'food') initFoodGame();
}

// ==================== MODO 1: COLETA SELETIVA ====================
function initRecycleGame() {
  const gameArea = document.getElementById('gameArea');
  const types = Object.keys(TRASH_DATA);
  const currentType = types[Math.floor(Math.random() * types.length)];
  const items = TRASH_DATA[currentType];
  const item = items[Math.floor(Math.random() * items.length)];

  gameArea.innerHTML = `
    <div class="recycle-game">
      <div class="trash-zone">
        <div class="trash-item selected" id="activeTrash" data-type="${currentType}">
          <span>${item.icon}</span>
          <span style="font-size: 1rem; color: #a7f3d0;">${item.name}</span>
        </div>
      </div>
      <div class="bins-row">
        ${BINS_CONFIG.map(b => `
          <div class="bin ${b.class}" onclick="checkRecycle('${b.type}')">
            <span class="bin-icon">${b.icon}</span>
            <span class="bin-label">${b.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Posiciona o lixo no centro da zona
  const trashEl = document.getElementById('activeTrash');
  trashEl.style.top = '30%';
  trashEl.style.left = '40%';
}

function checkRecycle(binType) {
  const trash = document.getElementById('activeTrash');
  if (!trash) return;
  
  const correctType = trash.dataset.type;
  if (binType === correctType) {
    handleCorrect();
  } else {
    handleWrong();
  }
}

// ==================== MODO 2: CORPO HUMANO ====================
function initBodyGame() {
  const gameArea = document.getElementById('gameArea');
  const organ = ORGANS_DATA[Math.floor(Math.random() * ORGANS_DATA.length)];

  gameArea.innerHTML = `
    <div class="body-game">
      <div class="organs-panel">
        <h3>Órgão Selecionado</h3>
        <div class="organ-item selected" id="activeOrgan" data-system="${organ.system}">
          <span class="organ-icon">${organ.icon}</span>
          <span class="organ-name">${organ.name}</span>
        </div>
        <p style="font-size:0.8rem; color:#a7f3d0; margin-top:1rem; text-align:center;">
          Clique no sistema correto ao lado para encaixar este órgão!
        </p>
      </div>
      <div class="body-display">
        ${BODY_SYSTEMS.map(sys => `
          <div class="system-card" onclick="checkBodySystem('${sys.id}')">
            <div class="system-header">
              <span class="system-icon">${sys.icon}</span>
              <span class="system-name">${sys.name}</span>
            </div>
            <div class="system-desc">${sys.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function checkBodySystem(systemId) {
  const organ = document.getElementById('activeOrgan');
  if (!organ) return;
  
  if (organ.dataset.system === systemId) {
    handleCorrect();
  } else {
    handleWrong();
  }
}

// ==================== MODO 3: CADEIA ALIMENTAR ====================
function initFoodGame() {
  const gameArea = document.getElementById('gameArea');
  const biome = BIOMES[(gameState.level - 1) % BIOMES.length];
  
  // Embaralha as opções
  const shuffledChain = [...biome.chain].sort(() => Math.random() - 0.5);
  
  gameArea.innerHTML = `
    <div class="food-game">
      <div class="challenge-info">
        <div class="biome-name">${biome.name}</div>
        <div class="biome-desc">${biome.desc} - Selecione um elemento e clique na posição correta da cadeia!</div>
      </div>
      <div class="chain-slots">
        ${biome.chain.map((slot, index) => `
          <div class="chain-slot" id="slot-${index}" onclick="placeAnimalInSlot(${index}, '${slot.name}')">
            <div class="slot-label">${slot.role}</div>
            <div class="slot-hint">(${slot.hint})</div>
            <div class="slot-icon" id="slot-icon-${index}">❓</div>
          </div>
        `).join('')}
      </div>
      <div class="animals-pool">
        ${shuffledChain.map((item, idx) => `
          <div class="animal-card" id="animal-${idx}" onclick="selectAnimal('${item.name}', ${idx})">
            <span style="font-size: 1.5rem;">${item.icon}</span>
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectAnimal(name, idx) {
  document.querySelectorAll('.animal-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`animal-${idx}`);
  if (card) card.classList.add('selected');
  gameState.selectedItem = name;
}

function placeAnimalInSlot(slotIdx, correctName) {
  if (!gameState.selectedItem) {
    showFeedback('👉 Selecione um animal primeiro!', false);
    return;
  }
  
  if (gameState.selectedItem === correctName) {
    const slotIcon = document.getElementById(`slot-icon-${slotIdx}`);
    const activeCard = document.querySelector('.animal-card.selected');
    if (activeCard && slotIcon) {
      slotIcon.textContent = activeCard.querySelector('span').textContent;
      document.getElementById(`slot-${slotIdx}`).classList.add('filled');
    }
    handleCorrect();
  } else {
    handleWrong();
  }
}

// ==================== TELA FINAL ====================
function endGame() {
  document.getElementById('hud').style.display = 'none';
  document.getElementById('gameArea').style.display = 'none';
  
  const endScreen = document.getElementById('endScreen');
  endScreen.classList.remove('hidden');
  
  const accuracy = gameState.totalAnswers > 0 
    ? Math.round((gameState.correctAnswers / gameState.totalAnswers) * 100) 
    : 0;
    
  document.getElementById('finalScore').textContent = gameState.score;
  document.getElementById('finalAccuracy').textContent = accuracy + '%';
  document.getElementById('finalLevel').textContent = gameState.level;
  document.getElementById('finalCorrect').textContent = gameState.correctAnswers;
  
  const endTitle = document.getElementById('endTitle');
  const endMessage = document.getElementById('endMessage');
  const endIcon = document.getElementById('endIcon');
  
  if (gameState.lives > 0) {
    endTitle.textContent = 'Parabéns!';
    endMessage.textContent = 'Você se tornou um verdadeiro Cientista da Natureza!';
    endIcon.textContent = '🏆';
    createConfetti();
  } else {
    endTitle.textContent = 'Fim de Jogo!';
    endMessage.textContent = 'Não desista! Tente novamente para melhorar seus conhecimentos.';
    endIcon.textContent = '🌱';
  }
}