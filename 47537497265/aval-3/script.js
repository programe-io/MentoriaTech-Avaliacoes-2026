const MatchCenter = {
    // ESTADO INTERNO DA APLICAÇÃO
    state: {
        clockInterval: null,
        clockRunning: false,
        currentSeconds: 0,
        score: { home: 0, away: 0 },
        events: []
    },
    
    config: {
        teams: {
            home: { name: 'Flamengo', color: '#ff4a4a' },
            away: { name: 'Palmeiras', color: '#00ff88' }
        }
    },

    // INICIALIZADOR
    init() {
        this.cacheDOM();
        this.render();
    },

    // GUARDA OS ELEMENTOS DO HTML EM MEMÓRIA
    cacheDOM() {
        this.dom = {
            timerDisplay: document.getElementById("timerDisplay"),
            headerTimer: document.getElementById("headerTimer"),
            btnPlayPause: document.getElementById("btnPlayPause"),
            scoreHome: document.getElementById("scoreHome"),
            scoreAway: document.getElementById("scoreAway"),
            headerScoreHome: document.getElementById("headerScoreHome"),
            headerScoreAway: document.getElementById("headerScoreAway"),
            timelineEvents: document.getElementById("timelineEvents")
        };
    },

    // SISTEMA DO CRONÔMETRO
    toggleClock() {
        if (!this.state.clockRunning) {
            this.state.clockRunning = true;
            this.dom.timerDisplay.classList.add("running");
            if (this.state.currentSeconds === 0) {
                this.logMatchEvent('system', null, '🏆 Bola rolando! Começa a grande final da Libertadores!');
            }
            
            this.state.clockInterval = setInterval(() => {
                this.state.currentSeconds++;
                this.renderTimer();
            }, 1000);
        } else {
            this.state.clockRunning = false;
            this.dom.timerDisplay.classList.remove("running");
            clearInterval(this.state.clockInterval);
        }
        this.renderControls();
    },

    resetClock() {
        this.state.clockRunning = false;
        clearInterval(this.state.clockInterval);
        this.state.currentSeconds = 0;
        this.state.score = { home: 0, away: 0 };
        this.state.events = [];
        this.render();
        this.dom.timelineEvents.innerHTML = '<div class="event-log" style="color: #888; text-align: center;">Nenhum lance importante registrado ainda.</div>';
    },

    // CONTROLE DE GOLS
    modifyScore(side, delta) {
        const prev = this.state.score[side];
        this.state.score[side] += delta;
        if (this.state.score[side] < 0) this.state.score[side] = 0;

        if (this.state.score[side] > prev) {
            this.logMatchEvent('goal', side);
        }
        this.renderScores();
    },

    // EVENTOS DA TIMELINE
    logMatchEvent(type, side, custom = '') {
        const min = Math.floor(this.state.currentSeconds / 60) + "'";
        let msg = custom;
        if (!custom) {
            const team = this.config.teams[side];
            if (type === 'goal') msg = `⚽ <strong style="color: ${team.color}">${team.name}</strong> balança as redes!`;
        }
        this.state.events.unshift({ time: min, text: msg });
        this.renderTimeline();
    },

    // FUNÇÕES DE ATUALIZAÇÃO DA TELA (RENDER)
    render() { 
        this.renderTimer(); 
        this.renderScores(); 
        this.renderControls(); 
    },

    renderTimer() {
        let m = Math.floor(this.state.currentSeconds / 60);
        let s = this.state.currentSeconds % 60;
        let mm = m < 10 ? '0' + m : m;
        let ss = s < 10 ? '0' + s : s;
        this.dom.timerDisplay.innerHTML = `${mm}<span class="dots">:</span>${ss}`;
        this.dom.headerTimer.innerText = `${mm}:${ss}`;
    },

    renderScores() {
        this.dom.scoreHome.innerText = this.state.score.home;
        this.dom.scoreAway.innerText = this.state.score.away;
        this.dom.headerScoreHome.innerText = this.state.score.home;
        this.dom.headerScoreAway.innerText = this.state.score.away;
    },

    renderControls() {
        this.dom.btnPlayPause.innerText = this.state.clockRunning ? "Pausar" : "Iniciar";
        this.dom.btnPlayPause.style.background = this.state.clockRunning ? "#ff4a4a" : "#00ffcc";
    },

    renderTimeline() {
        if (this.state.events.length === 0) return;
        this.dom.timelineEvents.innerHTML = this.state.events.map(ev => `
            <div class="event-log">[${ev.time}] ${ev.text}</div>
        `).join('');
    }
};

// MAPEAMENTO GLOBAL DOS CLIQUES DO HTML
function toggleClock() { MatchCenter.toggleClock(); }
function resetClock() { MatchCenter.resetClock(); }
function modifyScore(side, delta) { MatchCenter.modifyScore(side, delta); }

// INICIALIZA QUANDO A TELA ESTIVER PRONTA
window.addEventListener('DOMContentLoaded', () => {
    MatchCenter.init();
});