const player = document.getElementById('player');
const trail = document.getElementById('trail');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const coinsDisplay = document.getElementById('coins');
const multiplierDisplay = document.getElementById('multiplier');
const hudBoards = document.getElementById('hud-boards');
const gameOverScreen = document.getElementById('game-over-screen');

const lanes = [45, 192, 340]; 
let currentLane = 1;

let score = 0; let totalCoins = 0; let currentRunCoins = 0; let boards = 0; let multiplier = 1;
let gameActive = true; let elements = []; let gameSpeed = 9;
let spawnInterval; let gameLoopId;

let isJumping = false; let isDucking = false;
let magnetActive = false; let magnetTimer;
let boardActive = false;
let frenzyActive = false; let frenzyTimer;

// Carregamento Seguro do LocalStorage
let unlockedSkins = JSON.parse(localStorage.getItem('cs_unlockedSkins')) || ['neon'];
let activeSkin = localStorage.getItem('cs_activeSkin') || 'neon';
totalCoins = parseInt(localStorage.getItem('cs_totalCoins')) || 0;

// Motor de Som Procedural (Web Audio API)
let audioCtx = null;
function playSound(type) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'coin') {
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
        } else if (type === 'jump') {
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now); osc.stop(now + 0.15);
        } else if (type === 'hit') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(60, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
        } else if (type === 'powerup') {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.linearRampToValueAtTime(880, now + 0.1);
            osc.frequency.linearRampToValueAtTime(1760, now + 0.2);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
        }
    } catch(e) { console.log("Audio not supported yet."); }
}

function updatePlayerPosition() {
    player.style.left = lanes[currentLane] + 'px';
    setTimeout(() => { trail.style.left = lanes[currentLane] + 'px'; }, 40);
}

function createParticles(x, y, color) {
    for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.classList.add('particle'); p.style.backgroundColor = color;
        p.style.left = x + 'px'; p.style.top = y + 'px';
        gameContainer.appendChild(p);
        const angle = Math.random() * Math.PI * 2; const speed = Math.random() * 3 + 2;
        let pTop = y; let pLeft = x;
        let pInt = setInterval(() => { pTop += Math.sin(angle) * speed; pLeft += Math.cos(angle) * speed; p.style.top = pTop+'px'; p.style.left = pLeft+'px'; }, 16);
        setTimeout(() => { clearInterval(pInt); p.remove(); }, 350);
    }
}

function handleInput(action) {
    if (!gameActive) return;
    if (action === 'ArrowLeft' && currentLane > 0) { currentLane--; updatePlayerPosition(); }
    else if (action === 'ArrowRight' && currentLane < 2) { currentLane++; updatePlayerPosition(); }
    else if (action === 'ArrowUp' && !isJumping && !isDucking && !frenzyActive) {
        isJumping = true; player.classList.add('jumping'); trail.classList.add('jumping');
        playSound('jump');
        setTimeout(() => { player.classList.remove('jumping'); trail.classList.remove('jumping'); isJumping = false; }, 360);
    } else if (action === 'ArrowDown' && !isJumping && !isDucking && !frenzyActive) {
        isDucking = true; player.classList.add('ducking'); trail.classList.add('ducking');
        setTimeout(() => { player.classList.remove('ducking'); trail.classList.remove('ducking'); isDucking = false; }, 380);
    }
}

// Mecânica Avançada de Gestos (Swipe) para Mouse e Telas Touch
let touchStartX = 0; let touchStartY = 0;
gameContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY;
}, {passive: true});

gameContainer.addEventListener('touchend', e => {
    let diffX = e.changedTouches[0].clientX - touchStartX;
    let diffY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 35) handleInput(diffX > 0 ? 'ArrowRight' : 'ArrowLeft');
    } else {
        if (Math.abs(diffY) > 35) handleInput(diffY > 0 ? 'ArrowDown' : 'ArrowUp');
    }
}, {passive: true});

// Adaptador de Swipe para Computador (Arrastar o Mouse)
gameContainer.addEventListener('mousedown', e => { touchStartX = e.clientX; touchStartY = e.clientY; });
gameContainer.addEventListener('mouseup', e => {
    let diffX = e.clientX - touchStartX; let diffY = e.clientY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 35) handleInput(diffX > 0 ? 'ArrowRight' : 'ArrowLeft');
    } else {
        if (Math.abs(diffY) > 35) handleInput(diffY > 0 ? 'ArrowDown' : 'ArrowUp');
    }
});

document.addEventListener('keydown', (e) => handleInput(e.key));

function spawnEntity() {
    if (!gameActive) return;
    const randomLane = Math.floor(Math.random() * 3);
    const roll = Math.random();
    let entity = document.createElement('div');
    entity.classList.add('entity');
    let type = ''; let height = 0; let topOffset = -160;

    if (frenzyActive) {
        type = 'coin'; height = 24; topOffset = -24; entity.classList.add('coin');
        entity.style.left = (lanes[randomLane] + 12) + 'px';
    } else {
        if (roll < 0.48) { 
            const typeRoll = Math.random();
            if (typeRoll < 0.45) { type = 'train'; height = 160; entity.classList.add('train'); }
            else if (typeRoll < 0.75) { type = 'low-barrier'; height = 35; topOffset = -35; entity.classList.add('low-barrier'); }
            else { type = 'high-barrier'; height = 40; topOffset = -100; entity.classList.add('high-barrier'); }
            entity.style.left = (lanes[randomLane] - 12) + 'px';
        } else if (roll < 0.86) { 
            type = 'coin'; height = 24; topOffset = -24; entity.classList.add('coin');
            entity.style.left = (lanes[randomLane] + 12) + 'px';
        } else if (roll < 0.92) { 
            type = 'magnet'; height = 26; topOffset = -26; entity.classList.add('magnet-power');
            entity.style.left = (lanes[randomLane] + 11) + 'px';
        } else if (roll < 0.97) { 
            type = 'board'; height = 16; topOffset = -16; entity.classList.add('board-power');
            entity.style.left = (lanes[randomLane] + 8) + 'px';
        } else {
            type = 'frenzy'; height = 26; topOffset = -26; entity.classList.add('frenzy-power');
            entity.style.left = (lanes[randomLane] + 11) + 'px';
        }
    }

    entity.style.top = topOffset + 'px';
    gameContainer.appendChild(entity);
    elements.push({ element: entity, top: topOffset, lane: randomLane, type: type, height: height });
}

function updateGame() {
    if (!gameActive) return;

    gameSpeed = (frenzyActive ? 16 : 9) + (score / 300);
    multiplier = 1 + Math.floor(currentRunCoins / 12);
    if (activeSkin === 'gold') multiplier += 1;
    
    multiplierDisplay.innerText = `X${multiplier}`;
    score += 1 * multiplier;
    scoreDisplay.innerText = Math.floor(score / 6);

    const playerTop = frenzyActive ? 200 : (isJumping ? 370 : (isDucking ? 540 : 504));
    const playerBottom = frenzyActive ? 360 : 560;

    for (let i = elements.length - 1; i >= 0; i--) {
        let ent = elements[i];
        ent.top += gameSpeed;
        ent.element.style.top = ent.top + 'px';

        if ((magnetActive || frenzyActive) && ent.type === 'coin' && ent.top > 100 && ent.top < 540) {
            let targetX = lanes[currentLane] + 12;
            let currentX = parseFloat(ent.element.style.left);
            ent.element.style.left = currentX + (targetX - currentX) * 0.35 + 'px';
            if (Math.abs(currentX - targetX) < 40) ent.lane = currentLane;
        }

        if (ent.lane === currentLane && ent.top + ent.height > playerTop && ent.top < playerBottom) {
            if (ent.type === 'coin') {
                createParticles(lanes[currentLane] + 20, ent.top + 10, '#ffd700');
                playSound('coin');
                ent.element.remove(); elements.splice(i, 1);
                currentRunCoins++; totalCoins++;
                coinsDisplay.innerText = totalCoins;
                continue;
            }
            if (ent.type === 'magnet') { ent.element.remove(); elements.splice(i, 1); playSound('powerup'); activateMagnet(); continue; }
            if (ent.type === 'board') { ent.element.remove(); elements.splice(i, 1); playSound('powerup'); boards++; hudBoards.innerText = boards; activateBoard(); continue; }
            if (ent.type === 'frenzy') { ent.element.remove(); elements.splice(i, 1); playSound('powerup'); activateFrenzy(); continue; }

            if (frenzyActive) continue; 
            if (ent.type === 'low-barrier' && isJumping) continue;
            if (ent.type === 'high-barrier' && isDucking) continue;

            if (boardActive) {
                playSound('hit');
                gameContainer.classList.add('shake'); setTimeout(() => gameContainer.classList.remove('shake'), 200);
                createParticles(lanes[currentLane]+20, ent.top+20, '#ff007f');
                ent.element.remove(); elements.splice(i, 1); deactivateBoard(); continue;
            }

            gameOver(); return;
        }
        if (ent.top > 690) { ent.element.remove(); elements.splice(i, 1); }
    }
    gameLoopId = requestAnimationFrame(updateGame);
}

function activateMagnet() {
    magnetActive = true; document.getElementById('tag-magnet').style.display = 'block';
    clearTimeout(magnetTimer); magnetTimer = setTimeout(() => { magnetActive = false; document.getElementById('tag-magnet').style.display = 'none'; }, 8000);
}

function activateBoard() { boardActive = true; document.getElementById('tag-board').style.display = 'block'; player.classList.add('has-board'); }
function deactivateBoard() { boardActive = false; document.getElementById('tag-board').style.display = 'none'; player.classList.remove('has-board'); if (boards > 0) boards--; hudBoards.innerText = boards; }

function activateFrenzy() {
    frenzyActive = true; document.getElementById('tag-frenzy').style.display = 'block';
    player.classList.add('frenzy-mode'); trail.classList.add('frenzy-mode');
    clearTimeout(frenzyTimer);
    frenzyTimer = setTimeout(() => {
        frenzyActive = false; document.getElementById('tag-frenzy').style.display = 'none';
        player.classList.remove('frenzy-mode'); trail.classList.remove('frenzy-mode');
    }, 5000); 
}

function gameOver() {
    gameActive = false; playSound('hit'); gameContainer.classList.add('shake');
    clearInterval(spawnInterval); cancelAnimationFrame(gameLoopId);
    
    // Grava dados finais com segurança no LocalStorage
    localStorage.setItem('cs_totalCoins', totalCoins);
    
    document.getElementById('final-score').innerText = Math.floor(score / 6);
    document.getElementById('shop-coins').innerText = totalCoins;
    updateShopUI();
    gameOverScreen.style.display = 'flex';
}

function updateShopUI() {
    unlockedSkins.forEach(skin => {
        const priceTag = document.getElementById(`cost-${skin}`);
        if(priceTag) priceTag.innerText = (skin === activeSkin) ? "Equipado" : "Adquirido";
    });
}

function buySkin(skinName, cost) {
    if (unlockedSkins.includes(skinName)) {
        equipSkin(skinName);
    } else if (totalCoins >= cost) {
        totalCoins -= cost;
        unlockedSkins.push(skinName);
        
        localStorage.setItem('cs_totalCoins', totalCoins);
        localStorage.setItem('cs_unlockedSkins', JSON.stringify(unlockedSkins));
        
        document.getElementById('shop-coins').innerText = totalCoins;
        coinsDisplay.innerText = totalCoins;
        updateShopUI();
        equipSkin(skinName);
    } else {
        alert("Moedas insuficientes!");
    }
}

function equipSkin(skinName) {
    activeSkin = skinName;
    localStorage.setItem('cs_activeSkin', activeSkin);
    
    document.querySelectorAll('.skin-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`btn-skin-${skinName}`).classList.add('active');
    
    player.className = ''; trail.className = 'shadow-trail';
    player.classList.add(`skin-${skinName}`);
    if (boardActive) player.classList.add('has-board');
    updateShopUI();
}

function resetGame() {
    elements.forEach(ent => ent.element.remove()); elements = [];
    score = 0; currentRunCoins = 0; boards = 0; gameSpeed = 9; currentLane = 1;
    gameActive = true; isJumping = false; isDucking = false; magnetActive = false; boardActive = false; frenzyActive = false;
    clearTimeout(magnetTimer); clearTimeout(frenzyTimer);
    
    document.getElementById('tag-magnet').style.display = 'none';
    document.getElementById('tag-board').style.display = 'none';
    document.getElementById('tag-frenzy').style.display = 'none';
    
    coinsDisplay.innerText = totalCoins;
    equipSkin(activeSkin);
    scoreDisplay.innerText = "0"; multiplierDisplay.innerText = "X1"; hudBoards.innerText = "0";
    gameOverScreen.style.display = 'none'; updatePlayerPosition();
    
    clearInterval(spawnInterval); spawnInterval = setInterval(spawnEntity, 500);
    updateGame();
}

// Inicialização Inicial carregando os dados do navegador
coinsDisplay.innerText = totalCoins;
equipSkin(activeSkin);
updatePlayerPosition();
spawnInterval = setInterval(spawnEntity, 500);
updateGame();