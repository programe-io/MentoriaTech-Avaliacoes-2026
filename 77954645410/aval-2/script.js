/**
 * HEXA PUZZLE MASTERS - ENGINE EVOLUTION
 */

// Layout espacial indexado do tabuleiro (Mapeamento em Favo de Mel)
const BOARD_LAYOUT = [
    { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 },
    { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
    { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 },
    { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }
];

const PIECE_TYPES = [
    { color: 'p-red', shape: [{dr:0, dc:0}, {dr:0, dc:1}, {dr:1, dc:0}] },
    { color: 'p-purple', shape: [{dr:0, dc:0}, {dr:1, dc:0}, {dr:2, dc:0}] },
    { color: 'p-cyan', shape: [{dr:0, dc:0}, {dr:0, dc:1}, {dr:0, dc:2}] },
    { color: 'p-amber', shape: [{dr:0, dc:0}, {dr:1, dc:0}, {dr:1, dc:1}] },
    { color: 'p-green', shape: [{dr:0, dc:0}, {dr:1, dc:0}, {dr:1, dc:-1}] }
];

// Vetores direcionais estruturados para varredura e detecção de linhas completas (Tetris-Style)
const LINE_AXES = {
    horizontal: [0, 1, 2, 3, 4], // Agrupado por Linha (r)
};

const H_SPACING = 48;
const V_SPACING = 39;

// Gerenciador de Áudio Interno Sintetizado Dinamicamente
const AudioManager = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
    play(effect) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);

        if (effect === 'pickup') {
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
            osc.start(); osc.stop(this.ctx.currentTime + 0.06);
        } else if (effect === 'drop_ok') {
            osc.frequency.setValueAtTime(260, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
            osc.start(); osc.stop(this.ctx.currentTime + 0.12);
        } else if (effect === 'clear_line') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, this.ctx.currentTime);
            osc.frequency.setValueAtTime(660, this.ctx.currentTime + 0.08);
            osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.16);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            osc.start(); osc.stop(this.ctx.currentTime + 0.3);
        } else if (effect === 'error') {
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
            osc.start(); osc.stop(this.ctx.currentTime + 0.2);
        }
    }
};

class GameEngine {
    constructor() {
        this.score = 0;
        this.highScore = localStorage.getItem('hex_evo_high') || 0;
        this.activePiece = null;
        this.dragOffset = { x: 0, y: 0 };
        
        this.boardEl = document.getElementById('board');
        this.dockEl = document.getElementById('pieces-container');
        
        this.init();
    }

    init() {
        this.boardEl.innerHTML = '';
        this.dockEl.innerHTML = '';
        this.score = 0;
        this.updateUI();
        document.getElementById('game-overlay').classList.add('hidden');

        BOARD_LAYOUT.forEach(cell => {
            const div = document.createElement('div');
            div.classList.add('hexa-cell');
            const left = cell.c * H_SPACING + (cell.r % 2 === 1 ? H_SPACING / 2 : 0);
            const top = cell.r * V_SPACING;
            
            div.style.left = `${left}px`;
            div.style.top = `${top}px`;
            div.dataset.r = cell.r;
            div.dataset.c = cell.c;
            div.dataset.occupied = "false";
            this.boardEl.appendChild(div);
        });

        this.spawnDockPieces();
        this.setupGlobalEvents();
    }

    spawnDockPieces() {
        this.dockEl.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
            const pDiv = document.createElement('div');
            pDiv.classList.add('piece');
            pDiv.dataset.color = type.color;
            pDiv.dataset.shape = JSON.stringify(type.shape);

            type.shape.forEach(b => {
                const bDiv = document.createElement('div');
                bDiv.classList.add('hexa-cell', type.color);
                const left = b.dc * H_SPACING + (b.dr % 2 === 1 ? H_SPACING / 2 : 0);
                const top = b.dr * V_SPACING;
                bDiv.style.left = `${left}px`;
                bDiv.style.top = `${top}px`;
                pDiv.appendChild(bDiv);
            });

            pDiv.addEventListener('pointerdown', (e) => this.onDragStart(e));
            this.dockEl.appendChild(pDiv);
        }
        this.checkGameOverCondition();
    }

    setupGlobalEvents() {
        document.getElementById('reset-btn').onclick = () => this.init();
        document.getElementById('overlay-btn').onclick = () => this.init();
    }

    onDragStart(e) {
        if (this.activePiece) return;
        
        this.activePiece = e.currentTarget;
        this.activePiece.classList.remove('returning-home');
        this.activePiece.classList.add('dragging');

        const rect = this.activePiece.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;

        if (!this.activePiece.dataset.homeX) {
            this.activePiece.dataset.homeX = this.activePiece.offsetLeft;
            this.activePiece.dataset.homeY = this.activePiece.offsetTop;
        }

        this.activePiece.style.position = 'fixed';
        this.handleDragMove(e.clientX, e.clientY);

        this._moveRef = (evt) => this.onDragMove(evt);
        this._upRef = (evt) => this.onDragEnd(evt);

        document.addEventListener('pointermove', this._moveRef);
        document.addEventListener('pointerup', this._upRef);
        AudioManager.play('pickup');
    }

    onDragMove(e) {
        if (!this.activePiece) return;
        this.handleDragMove(e.clientX, e.clientY);
        
        // Renderizar a sombra (Ghost Projection) em tempo de execução
        document.querySelectorAll('#board .hexa-cell').forEach(c => c.classList.remove('preview-ghost'));
        const collision = this.getBoardCollision();
        if (collision && collision.canPlace) {
            collision.cells.forEach(c => c.classList.add('preview-ghost'));
        }
    }

    handleDragMove(x, y) {
        this.activePiece.style.left = `${x - this.dragOffset.x}px`;
        this.activePiece.style.top = `${y - this.dragOffset.y}px`;
    }

    onDragEnd(e) {
        document.removeEventListener('pointermove', this._moveRef);
        document.removeEventListener('pointerup', this._upRef);

        if (!this.activePiece) return;
        document.querySelectorAll('#board .hexa-cell').forEach(c => c.classList.remove('preview-ghost'));

        const collision = this.getBoardCollision();

        if (collision && collision.canPlace) {
            const color = this.activePiece.dataset.color;
            collision.cells.forEach(cell => {
                cell.classList.add(color);
                cell.dataset.occupied = "true";
            });

            this.score += collision.cells.length * 10;
            this.activePiece.remove();
            this.activePiece = null;

            AudioManager.play('drop_ok');
            this.clearFullLines();

            if (this.dockEl.childElementCount === 0) {
                this.spawnDockPieces();
            } else {
                this.checkGameOverCondition();
            }
        } else {
            // Retorno elástico e suave em caso de drop inválido
            AudioManager.play('error');
            this.activePiece.classList.remove('dragging');
            this.activePiece.classList.add('returning-home');
            this.activePiece.style.position = 'absolute';
            this.activePiece.style.left = `${this.activePiece.dataset.homeX}px`;
            this.activePiece.style.top = `${this.activePiece.dataset.homeY}px`;
            this.activePiece = null;
        }
    }

    getBoardCollision() {
        if (!this.activePiece) return null;
        const leadBlock = this.activePiece.children[0];
        const rect = leadBlock.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;

        this.activePiece.style.pointerEvents = 'none';
        const targetCell = document.elementFromPoint(midX, midY);
        this.activePiece.style.pointerEvents = 'auto';

        if (targetCell && targetCell.classList.contains('hexa-cell') && targetCell.parentElement.id === 'board') {
            const baseR = parseInt(targetCell.dataset.r);
            const baseC = parseInt(targetCell.dataset.c);
            const shape = JSON.parse(this.activePiece.dataset.shape);

            let canPlace = true;
            let cellsToOccupy = [];

            for (let b of shape) {
                const targetR = baseR + b.dr;
                let targetC = baseC + b.dc;
                if (baseR % 2 === 1 && b.dr % 2 === 1) targetC += 1;

                const found = document.querySelector(`#board .hexa-cell[data-r='${targetR}'][data-c='${targetC}']`);
                if (!found || found.dataset.occupied === "true") {
                    canPlace = false; break;
                }
                cellsToOccupy.push(found);
            }
            return { canPlace, cells: cellsToOccupy };
        }
        return null;
    }

    // MECÂNICA TETRIS: Varre e elimina linhas completas na horizontal
    clearFullLines() {
        let linesCleared = 0;

        LINE_AXES.horizontal.forEach(r => {
            const rowCells = document.querySelectorAll(`#board .hexa-cell[data-r='${r}']`);
            const isFull = Array.from(rowCells).every(c => c.dataset.occupied === "true");

            if (isFull) {
                linesCleared++;
                rowCells.forEach(cell => {
                    cell.classList.add('clearing-animation');
                    setTimeout(() => {
                        cell.className = 'hexa-cell'; // Remove cores e classes
                        cell.dataset.occupied = "false";
                    }, 400);
                });
            }
        });

        if (linesCleared > 0) {
            setTimeout(() => AudioManager.play('clear_line'), 100);
            this.score += linesCleared * 150; // Bônus massivo por linha limpa
            this.updateUI();
        }
    }

    checkGameOverCondition() {
        const remainingPieces = document.querySelectorAll('#pieces-container .piece');
        const boardCells = document.querySelectorAll('#board .hexa-cell');
        if (remainingPieces.length === 0) return;

        let moveFound = false;

        for (let p of remainingPieces) {
            const shape = JSON.parse(p.dataset.shape);
            for (let c of boardCells) {
                if (c.dataset.occupied === "true") continue;
                const baseR = parseInt(c.dataset.r);
                const baseC = parseInt(c.dataset.c);
                let fits = true;

                for (let b of shape) {
                    const targetR = baseR + b.dr;
                    let targetC = baseC + b.dc;
                    if (baseR % 2 === 1 && b.dr % 2 === 1) targetC += 1;

                    const match = document.querySelector(`#board .hexa-cell[data-r='${targetR}'][data-c='${targetC}']`);
                    if (!match || match.dataset.occupied === "true") {
                        fits = false; break;
                    }
                }
                if (fits) { moveFound = true; break; }
            }
            if (moveFound) break;
        }

        if (!moveFound) {
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('hex_evo_high', this.highScore);
            }
            document.getElementById('overlay-title').innerText = "Fim de Jogo!";
            document.getElementById('final-score').innerText = this.score;
            document.getElementById('game-overlay').classList.remove('hidden');
        }
    }

    updateUI() {
        document.getElementById('score').innerText = this.score;
        document.getElementById('high-score').innerText = this.highScore;
    }
}

// Inicializa a aplicação ao carregar a árvore DOM
window.onload = () => new GameEngine();