/**
 * Game Configuration and State
 */
const GAME_CONFIG = {
    rows: 3,
    cols: 3,
    symbolSize: 80, // Matches CSS --symbol-size
    spinTimeMs: 2000, // Total spin time
    spinDelayMs: 200, // Delay between each reel stopping
    poolSize: 30, // How many symbols to generate for the spinning effect
};

// Symbol Definitions (Emoji, ID, Multiplier/Payout, Rarity weight)
// Tiger is Wild and highest paying
const SYMBOLS = [
    { id: 0, char: '🐯', name: 'Wild Tiger', multiplier: 50, weight: 5 },  // Wild
    { id: 1, char: '🧧', name: 'Red Envelope', multiplier: 25, weight: 15 },
    { id: 2, char: '💰', name: 'Money Bag', multiplier: 15, weight: 20 },
    { id: 3, char: '🍊', name: 'Orange', multiplier: 10, weight: 25 },
    { id: 4, char: '🏮', name: 'Lantern', multiplier: 5, weight: 30 },
    { id: 5, char: '🪙', name: 'Coin', multiplier: 2, weight: 40 },
];

// Paylines (Format: [Row for Reel0, Row for Reel1, Row for Reel2])
// 0 = top, 1 = middle, 2 = bottom
const PAYLINES = [
    [1, 1, 1], // Middle Horizontal
    [0, 0, 0], // Top Horizontal
    [2, 2, 2], // Bottom Horizontal
    [0, 1, 2], // Diagonal Top-Left to Bottom-Right
    [2, 1, 0]  // Diagonal Bottom-Left to Top-Right
];

let state = {
    balance: 1000.00,
    betAmount: 2.00,
    betLevels: [0.40, 1.20, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00],
    currentBetIndex: 2,
    isSpinning: false,
    grid: [[], [], []] // The final result grid [col][row]
};

// DOM Elements
const DOM = {
    reels: [
        document.getElementById('reel0'),
        document.getElementById('reel1'),
        document.getElementById('reel2')
    ],
    btnSpin: document.getElementById('btnSpin'),
    btnBetMinus: document.getElementById('btnBetMinus'),
    btnBetPlus: document.getElementById('btnBetPlus'),
    balanceDisplay: document.getElementById('balanceDisplay'),
    betDisplay: document.getElementById('betDisplay'),
    winDisplay: document.getElementById('winDisplay'),
    winMessage: document.getElementById('winMessage'),
    winType: document.getElementById('winType'),
    winAmount: document.getElementById('winAmount'),
    winCanvas: document.getElementById('winCanvas')
};

const ctx = DOM.winCanvas.getContext('2d');


function initGame() {
    updateUI();
    setupReels();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Event Listeners
    DOM.btnSpin.addEventListener('click', spin);
    DOM.btnBetMinus.addEventListener('click', () => adjustBet(-1));
    DOM.btnBetPlus.addEventListener('click', () => adjustBet(1));
}

function resizeCanvas() {
    const container = document.getElementById('reelsContainer');
    DOM.winCanvas.width = container.offsetWidth;
    DOM.winCanvas.height = container.offsetHeight;
}

function updateUI() {
    DOM.balanceDisplay.textContent = state.balance.toFixed(2);
    DOM.betDisplay.textContent = state.betLevels[state.currentBetIndex].toFixed(2);
    
    // Disable buttons if spinning or insufficient balance
    const canBetMore = state.currentBetIndex < state.betLevels.length - 1;
    const canBetLess = state.currentBetIndex > 0;
    
    DOM.btnBetPlus.disabled = state.isSpinning || !canBetMore;
    DOM.btnBetMinus.disabled = state.isSpinning || !canBetLess;
    DOM.btnSpin.disabled = state.isSpinning || state.balance < state.betLevels[state.currentBetIndex];
    
    if(state.isSpinning) {
        DOM.btnSpin.classList.add('spinning');
    } else {
        DOM.btnSpin.classList.remove('spinning');
    }
}

function adjustBet(direction) {
    if (state.isSpinning) return;
    
    let newIndex = state.currentBetIndex + direction;
    if (newIndex >= 0 && newIndex < state.betLevels.length) {
        state.currentBetIndex = newIndex;
        state.betAmount = state.betLevels[state.currentBetIndex];
        updateUI();
    }
}


// Weighted random selection based on symbol weights
function getRandomSymbol() {
    const totalWeight = SYMBOLS.reduce((sum, sym) => sum + sym.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < SYMBOLS.length; i++) {
        if (random < SYMBOLS[i].weight) {
            return SYMBOLS[i];
        }
        random -= SYMBOLS[i].weight;
    }
    return SYMBOLS[0]; // Fallback
}

function createSymbolElement(symbolObj) {
    const el = document.createElement('div');
    el.className = 'symbol';
    el.textContent = symbolObj.char;
    el.dataset.id = symbolObj.id;
    return el;
}

// Initialize reels with random static symbols
function setupReels() {
    DOM.reels.forEach((reel, colIndex) => {
        reel.innerHTML = '';
        state.grid[colIndex] = [];
        for (let row = 0; row < GAME_CONFIG.rows; row++) {
            const sym = getRandomSymbol();
            state.grid[colIndex][row] = sym;
            reel.appendChild(createSymbolElement(sym));
        }
        reel.style.transform = `translateY(0px)`;
    });
}


async function spin() {
    // Pre-spin checks
    if (state.isSpinning || state.balance < state.betAmount) return;

    state.isSpinning = true;
    state.balance -= state.betAmount;
    DOM.winDisplay.textContent = '0.00';
    clearCanvas();
    hideMessage();
    removeWinAnimations();
    updateUI();

    const spinPromises = [];

    // For each reel, setup the spin strip and animate
    DOM.reels.forEach((reel, i) => {
        spinPromises.push(spinReel(reel, i));
    });

    // Wait for all reels to finish
    await Promise.all(spinPromises);

    // Post-spin logic
    evaluateWin();
    state.isSpinning = false;
    updateUI();
}

async function spinReel(reel, colIndex) {
    return new Promise(resolve => {
        // 1. Build the spin pool
        // The pool consists of: new result (top 3) + random symbols + old result (bottom 3)
        const pool = [];
        const newResult = [];
        
        // Determine final 3 symbols for this column
        for (let row = 0; row < GAME_CONFIG.rows; row++) {
            const sym = getRandomSymbol();
            newResult.push(sym);
            state.grid[colIndex][row] = sym; // Store in state
        }

        // Add old symbols to bottom so it transitions smoothly
        const oldSymbols = Array.from(reel.children);
        
        reel.innerHTML = ''; // Clear current
        
        // Add new result at the top (rendered first in flex col)
        for (let i = 0; i < GAME_CONFIG.rows; i++) {
            reel.appendChild(createSymbolElement(newResult[i]));
        }

        // Add random blur symbols in the middle
        for (let i = 0; i < GAME_CONFIG.poolSize; i++) {
            const el = createSymbolElement(getRandomSymbol());
            el.classList.add('blur');
            reel.appendChild(el);
        }

        // Add old symbols at the bottom
        oldSymbols.forEach(el => reel.appendChild(el));

        // 2. Set initial position (at the bottom, showing old symbols)
        const totalItems = reel.children.length;
        const itemHeight = GAME_CONFIG.symbolSize;
        const startingOffset = -((totalItems - GAME_CONFIG.rows) * itemHeight);
        
        // Reset transition and move to start position
        reel.style.transition = 'none';
        reel.style.transform = `translateY(${startingOffset}px)`;

        // 3. Force reflow to apply the non-transition transform
        reel.offsetHeight;

        // 4. Animate to final position (0 offset, showing top 3 symbols)
        const delay = colIndex * GAME_CONFIG.spinDelayMs;
        const duration = GAME_CONFIG.spinTimeMs + delay;

        setTimeout(() => {
            reel.style.transition = `transform ${duration}ms cubic-bezier(0.1, 0.7, 0.1, 1.1)`;
            reel.style.transform = `translateY(0px)`;
            
            // 5. Cleanup after animation ends
            setTimeout(() => {
                const children = Array.from(reel.children);
                for (let i = 3; i < children.length; i++) {
                    children[i].remove();
                }
                children.slice(0, 3).forEach(c => c.classList.remove('blur'));
                
                resolve();
            }, duration);

        }, 50);
    });
}


function evaluateWin() {
    let totalWinAmount = 0;
    const winningLines = [];
    const WILD_ID = 0;

    // Check each payline
    PAYLINES.forEach((line, lineIndex) => {
        const sym0 = state.grid[0][line[0]];
        const sym1 = state.grid[1][line[1]];
        const sym2 = state.grid[2][line[2]];

        let matchSymbol = null;
        const symbolsInLine = [sym0, sym1, sym2];
        
        for(let s of symbolsInLine) {
            if (s.id !== WILD_ID) {
                matchSymbol = s;
                break;
            }
        }
        if (!matchSymbol) matchSymbol = SYMBOLS[0]; // All wilds

        // Check for match
        const isWin = symbolsInLine.every(s => s.id === matchSymbol.id || s.id === WILD_ID);

        if (isWin) {
            const multiplier = matchSymbol.multiplier;
            const lineWin = state.betAmount * multiplier;
            totalWinAmount += lineWin;
            
            winningLines.push({
                line: line,
                amount: lineWin,
                symbol: matchSymbol
            });
        }
    });

    // Special Feature Check: Full Screen
    let isFullScreen = true;
    let screenSymbol = null;
    
    for(let c=0; c<GAME_CONFIG.cols; c++) {
        for(let r=0; r<GAME_CONFIG.rows; r++) {
            const s = state.grid[c][r];
            if (s.id !== WILD_ID) {
                if (screenSymbol === null) {
                    screenSymbol = s;
                } else if (screenSymbol.id !== s.id) {
                    isFullScreen = false;
                }
            }
        }
    }
    
    if (isFullScreen && winningLines.length > 0) {
        totalWinAmount *= 10;
    }

    if (totalWinAmount > 0) {
        handleWin(totalWinAmount, winningLines, isFullScreen);
    }
}


function handleWin(amount, lines, isFullScreen) {
    state.balance += amount;
    
    // Animate win amount counter
    animateValue(DOM.winDisplay, 0, amount, 1000);
    
    // Highlight winning symbols and draw lines
    lines.forEach(winObj => {
        drawLine(winObj.line);
        winObj.line.forEach((row, col) => {
            const symbolEl = DOM.reels[col].children[row];
            symbolEl.classList.add('win');
        });
    });

    // Show Message based on multiplier
    const winMultiplier = amount / state.betAmount;
    setTimeout(() => {
        if (isFullScreen) {
            showMessage("MEGA WIN x10!", amount, "#fbbf24");
        } else if (winMultiplier >= 20) {
            showMessage("BIG WIN!", amount, "#4ade80");
        } else {
            showMessage("WIN", amount, "#fff");
        }
    }, 500);
}

function drawLine(lineCoords) {
    const cWidth = DOM.winCanvas.width;
    const cHeight = DOM.winCanvas.height;
    const colWidth = cWidth / 3;
    const rowHeight = cHeight / 3;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(255, 69, 0, 0.8)';
    ctx.shadowBlur = 10;

    lineCoords.forEach((row, col) => {
        const x = (col * colWidth) + (colWidth / 2);
        const y = (row * rowHeight) + (rowHeight / 2);

        if (col === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, DOM.winCanvas.width, DOM.winCanvas.height);
}

function removeWinAnimations() {
    DOM.reels.forEach(reel => {
        Array.from(reel.children).forEach(child => {
            child.classList.remove('win');
        });
    });
}

function showMessage(title, amount, color) {
    DOM.winType.textContent = title;
    DOM.winType.style.color = color;
    DOM.winAmount.textContent = `R$ ${amount.toFixed(2)}`;
    DOM.winMessage.classList.add('show');
    
    setTimeout(hideMessage, 2500);
}

function hideMessage() {
    DOM.winMessage.classList.remove('show');
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = (progress * (end - start) + start).toFixed(2);
        obj.innerHTML = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', initGame);