document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // HUD Elements
    const scoreEl = document.getElementById('score');
    const comboEl = document.getElementById('combo');
    const healthEl = document.getElementById('health');
    const overlay = document.getElementById('screen-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMsg = document.getElementById('overlay-msg');
    const btnAcao = document.getElementById('btn-acao');

    // Estado do Jogo
    let jogoAtivo = false;
    let pontuacao = 0;
    let combo = 1;
    let vida = 100;
    let frameId = null;
    let spawnTimer = 0;

    // Posição do jogador
    const jogador = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        raio: 15,
        cor: '#00f3ff'
    };

    // Coleções de Entidades
    let ameacas = [];
    let dados = [];
    let particulas = [];

    // Rastreia o movimento do mouse na área do Canvas
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        jogador.x = (e.clientX - rect.left) * scaleX;
        jogador.y = (e.clientY - rect.top) * scaleY;
    });

    // Classe de Partículas (Explosões e rastros)
    class Particula {
        constructor(x, y, cor) {
            this.x = x;
            this.y = y;
            this.raio = Math.random() * 3 + 1;
            this.cor = cor;
            this.vx = (Math.random() - 0.5) * 6;
            this.vy = (Math.random() - 0.5) * 6;
            this.vida = 1.0; // Opacidade
        }

        atualizar() {
            this.x += this.vx;
            this.y += this.vy;
            this.vida -= 0.03;
        }

        desenhar() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.vida);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
            ctx.fillStyle = this.cor;
            ctx.fill();
            ctx.restore();
        }
    }

    // Criar explosão de partículas
    function criarExplosao(x, y, cor, quantidade = 12) {
        for (let i = 0; i < quantidade; i++) {
            particulas.push(new Particula(x, y, cor));
        }
    }

    // Início / Reinício do Jogo
    function iniciarJogo() {
        pontuacao = 0;
        combo = 1;
        vida = 100;
        ameacas = [];
        dados = [];
        particulas = [];
        jogoAtivo = true;

        scoreEl.textContent = '0';
        comboEl.textContent = 'x1';
        healthEl.textContent = '100%';
        overlay.classList.add('hidden');

        if (frameId) cancelAnimationFrame(frameId);
        loopJogo();
    }

    // Gerador de Inimigos (Vermelhos) e Coletáveis (Azuis/Dourados)
    function gerarEntidades() {
        spawnTimer++;
        if (spawnTimer % 25 === 0) {
            // Gerar Ameaça Virus
            const lado = Math.floor(Math.random() * 4);
            let x, y;
            if (lado === 0) { x = Math.random() * canvas.width; y = -10; }
            else if (lado === 1) { x = canvas.width + 10; y = Math.random() * canvas.height; }
            else if (lado === 2) { x = Math.random() * canvas.width; y = canvas.height + 10; }
            else { x = -10; y = Math.random() * canvas.height; }

            const angulo = Math.atan2(jogador.y - y, jogador.x - x);
            const velocidade = Math.random() * 2 + 2;

            ameacas.push({
                x, y,
                vx: Math.cos(angulo) * velocidade,
                vy: Math.sin(angulo) * velocidade,
                raio: 10,
                cor: '#ff0055'
            });
        }

        if (spawnTimer % 60 === 0) {
            // Gerar Coletável de Dados
            dados.push({
                x: Math.random() * (canvas.width - 40) + 20,
                y: Math.random() * (canvas.height - 40) + 20,
                raio: 8,
                cor: Math.random() > 0.8 ? '#ffcc00' : '#00ff88',
                valor: Math.random() > 0.8 ? 50 : 10
            });
        }
    }

    // Loop Principal de Renderização e Física (60 FPS)
    function loopJogo() {
        if (!jogoAtivo) return;

        // Limpar tela com rastro (fade)
        ctx.fillStyle = 'rgba(10, 10, 20, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 1. Desenhar Jogador
        ctx.save();
        ctx.beginPath();
        ctx.arc(jogador.x, jogador.y, jogador.raio, 0, Math.PI * 2);
        ctx.fillStyle = jogador.cor;
        ctx.shadowColor = jogador.cor;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();

        // 2. Processar Coletáveis
        for (let i = dados.length - 1; i >= 0; i--) {
            const d = dados[i];
            ctx.save();
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.raio, 0, Math.PI * 2);
            ctx.fillStyle = d.cor;
            ctx.shadowColor = d.cor;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();

            // Colisão com Jogador
            const dist = Math.hypot(jogador.x - d.x, jogador.y - d.y);
            if (dist < jogador.raio + d.raio) {
                pontuacao += d.valor * combo;
                combo++;
                scoreEl.textContent = pontuacao;
                comboEl.textContent = `x${combo}`;
                criarExplosao(d.x, d.y, d.cor, 10);
                dados.splice(i, 1);
            }
        }

        // 3. Processar Ameaças
        for (let i = ameacas.length - 1; i >= 0; i--) {
            const a = ameacas[i];
            a.x += a.vx;
            a.y += a.vy;

            ctx.save();
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.raio, 0, Math.PI * 2);
            ctx.fillStyle = a.cor;
            ctx.shadowColor = a.cor;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();

            // Colisão com Jogador
            const dist = Math.hypot(jogador.x - a.x, jogador.y - a.y);
            if (dist < jogador.raio + a.raio) {
                vida -= 20;
                combo = 1;
                comboEl.textContent = 'x1';
                healthEl.textContent = `${Math.max(0, vida)}%`;
                criarExplosao(a.x, a.y, '#ff0055', 20);
                ameacas.splice(i, 1);

                if (vida <= 0) {
                    finalizarJogo();
                }
            } else if (a.x < -20 || a.x > canvas.width + 20 || a.y < -20 || a.y > canvas.height + 20) {
                ameacas.splice(i, 1);
            }
        }

        // 4. Processar Partículas
        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.atualizar();
            p.desenhar();
            if (p.vida <= 0) particulas.splice(i, 1);
        }

        gerarEntidades();
        frameId = requestAnimationFrame(loopJogo);
    }

    // Fim de Jogo
    function finalizarJogo() {
        jogoAtivo = false;
        overlayTitle.textContent = "SISTEMA CORROMPIDO";
        overlayMsg.innerHTML = `Pontuação Final: <strong>${pontuacao}</strong> | Maior Combo: <strong>x${combo}</strong>`;
        btnAcao.textContent = "REINICIAR SISTEMA";
        overlay.classList.remove('hidden');
    }

    // Eventos
    btnAcao.addEventListener('click', iniciarJogo);
});