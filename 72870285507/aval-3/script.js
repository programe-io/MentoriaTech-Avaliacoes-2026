// ==========================================================================
// 1. ESTADO GLOBAL DO CASSINO
// ==========================================================================
const state = {
  balance: 1000.00,
  activeGame: 'slot', // 'slot', 'roulette', 'dice'
  isPlaying: false,
  history: []
};

// ==========================================================================
// 2. REFERÊNCIAS DO DOM
// ==========================================================================
const userBalanceEl = document.getElementById('user-balance');
const btnRecharge = document.getElementById('btn-recharge');
const navTabs = document.querySelectorAll('.nav-tab');
const gameViews = document.querySelectorAll('.game-view');

// Apostas
const betAmountInput = document.getElementById('bet-amount');
const chipButtons = document.querySelectorAll('.btn-chip');
const btnMaxBet = document.getElementById('btn-max-bet');
const btnPlay = document.getElementById('btn-play');
const resultMessage = document.getElementById('result-message');
const historyList = document.getElementById('history-list');

// Slot
const reel1 = document.getElementById('reel-1');
const reel2 = document.getElementById('reel-2');
const reel3 = document.getElementById('reel-3');
const slotSymbols = ['🧱', '🔨', '👷', '🚚', '🌀'];

// Roleta
const rouletteWheel = document.getElementById('roulette-wheel');
const rouletteSectors = [
  { label: '10x', mult: 10 },
  { label: '0x', mult: 0 },
  { label: '2x', mult: 2 },
  { label: '1.5x', mult: 1.5 },
  { label: '0.5x', mult: 0.5 },
  { label: '5x', mult: 5 },
  { label: '0x', mult: 0 },
  { label: '3x', mult: 3 }
];

// Dado
const diceDisplay = document.getElementById('dice-display');

// ==========================================================================
// 3. INICIALIZAÇÃO E CARTEIRA
// ==========================================================================

function updateBalanceDisplay() {
  userBalanceEl.textContent = `R$ ${state.balance.toFixed(2)}`;
}

function addHistoryRecord(gameName, amount, isWin) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  state.history.unshift({ gameName, amount, isWin, time });
  
  if (state.history.length > 10) state.history.pop();
  
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    historyList.innerHTML = `<li class="empty-history">Nenhuma aposta realizada ainda.</li>`;
    return;
  }

  historyList.innerHTML = state.history.map(item => `
    <li>
      <span>[${item.time}] ${item.gameName}</span>
      <strong class="${item.isWin ? 'history-win' : 'history-loss'}">
        ${item.isWin ? '+' : '-'}R$ ${Math.abs(item.amount).toFixed(2)}
      </strong>
    </li>
  `).join('');
}

// Recarga de Saldo Fictício
btnRecharge.addEventListener('click', () => {
  state.balance += 500;
  updateBalanceDisplay();
  resultMessage.className = "result-display win";
  resultMessage.textContent = "👷 Mão de Obra Recarregada! +R$ 500,00 Fictícios adicionados.";
});

// Preset Chips
chipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-val');
    if (val) betAmountInput.value = val;
  });
});

btnMaxBet.addEventListener('click', () => {
  betAmountInput.value = Math.floor(state.balance);
});

// Navegação por Abas
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (state.isPlaying) return;

    navTabs.forEach(t => t.classList.remove('active'));
    gameViews.forEach(v => v.classList.remove('active'));

    tab.classList.add('active');
    const game = tab.getAttribute('data-game');
    state.activeGame = game;
    document.getElementById(`game-${game}`).classList.add('active');

    resultMessage.className = "result-display";
    resultMessage.textContent = "Aposta pronta! Clique em MISTURAR & APOSTAR.";
  });
});

// ==========================================================================
// 4. LÓGICA PRINCIPAL DE JOGO (DISPATCHER)
// ==========================================================================

btnPlay.addEventListener('click', () => {
  if (state.isPlaying) return;

  const betValue = parseFloat(betAmountInput.value);

  if (isNaN(betValue) || betValue <= 0) {
    alert("Insira um valor de aposta válido!");
    return;
  }

  if (betValue > state.balance) {
    alert("Saldo insuficiente! Recarregue mais Beton-Coins.");
    return;
  }

  // Deduz Saldo
  state.balance -= betValue;
  updateBalanceDisplay();
  state.isPlaying = true;
  btnPlay.disabled = true;

  resultMessage.className = "result-display";
  resultMessage.textContent = "Betoneira girando... Torça pela mistura certa!";

  if (state.activeGame === 'slot') {
    playSlot(betValue);
  } else if (state.activeGame === 'roulette') {
    playRoulette(betValue);
  } else if (state.activeGame === 'dice') {
    playDice(betValue);
  }
});

// ==========================================================================
// 5. JOGO 1: CAÇA-NÍQUEIS
// ==========================================================================

function playSlot(bet) {
  reel1.classList.add('spinning');
  reel2.classList.add('spinning');
  reel3.classList.add('spinning');

  setTimeout(() => {
    const s1 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
    const s2 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
    const s3 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

    reel1.classList.remove('spinning');
    reel1.textContent = s1;

    setTimeout(() => {
      reel2.classList.remove('spinning');
      reel2.textContent = s2;

      setTimeout(() => {
        reel3.classList.remove('spinning');
        reel3.textContent = s3;

        // Avaliar Resultado
        let winMultiplier = 0;

        if (s1 === s2 && s2 === s3) {
          if (s1 === '🌀') winMultiplier = 50; // JACKPOT
          else if (s1 === '🚚') winMultiplier = 10;
          else if (s1 === '👷') winMultiplier = 5;
          else if (s1 === '🔨') winMultiplier = 3;
          else if (s1 === '🧱') winMultiplier = 2;
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
          winMultiplier = 1.2; // Parcial
        }

        finishGameRound('Slot Betonista', bet, winMultiplier);
      }, 300);
    }, 300);
  }, 1000);
}

// ==========================================================================
// 6. JOGO 2: ROLETA DO CIMENTO
// ==========================================================================

let rouletteRotation = 0;

function playRoulette(bet) {
  const sectorCount = rouletteSectors.length;
  const degreesPerSector = 360 / sectorCount;

  const targetIndex = Math.floor(Math.random() * sectorCount);
  const extraSpins = 5 * 360; // 5 voltas completas
  
  // Ajuste do ângulo para centralizar a ponteira
  const targetDegree = extraSpins + (targetIndex * degreesPerSector) + (degreesPerSector / 2);
  rouletteRotation += targetDegree;

  rouletteWheel.style.transform = `rotate(-${rouletteRotation}deg)`;

  setTimeout(() => {
    const winningSector = rouletteSectors[targetIndex];
    finishGameRound('Roleta Cimento', bet, winningSector.mult);
  }, 4000);
}

// ==========================================================================
// 7. JOGO 3: DADO DE OBRA
// ==========================================================================

function playDice(bet) {
  diceDisplay.classList.add('rolling');

  const selectedPrediction = document.querySelector('input[name="dice-prediction"]:checked').value;

  setTimeout(() => {
    diceDisplay.classList.remove('rolling');
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = diceValue;

    let isWin = false;

    if (selectedPrediction === 'even' && diceValue % 2 === 0) isWin = true;
    if (selectedPrediction === 'odd' && diceValue % 2 !== 0) isWin = true;
    if (selectedPrediction === 'high' && diceValue >= 4) isWin = true;
    if (selectedPrediction === 'low' && diceValue <= 3) isWin = true;

    const mult = isWin ? 2 : 0;
    finishGameRound('Dado de Obra', bet, mult);
  }, 1200);
}

// ==========================================================================
// 8. FINALIZAÇÃO DA RODADA E RECOMPENSA
// ==========================================================================

function finishGameRound(gameName, bet, multiplier) {
  const winAmount = bet * multiplier;
  const isWin = multiplier > 0;

  if (isWin) {
    state.balance += winAmount;
    resultMessage.className = "result-display win";
    resultMessage.textContent = `🎉 CONCRETO DE OURO! Você ganhou R$ ${winAmount.toFixed(2)} (${multiplier}x)!`;
  } else {
    resultMessage.className = "result-display loss";
    resultMessage.textContent = `💥 A mistura desandou! Você perdeu R$ ${bet.toFixed(2)}. Tente de novo!`;
  }

  updateBalanceDisplay();
  addHistoryRecord(gameName, isWin ? winAmount - bet : -bet, isWin);

  state.isPlaying = false;
  btnPlay.disabled = false;
}

// Inicialização
updateBalanceDisplay();