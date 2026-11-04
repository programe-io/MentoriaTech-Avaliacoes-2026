/* ================================================================= */
/* SLENDRINA: THE CELLAR — MOTOR DO FEED EM PORTUGUÊS                */
/* ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 01. SIMULAÇÃO DA SEQUÊNCIA DE BOOT
    const bootLog = document.getElementById('bootLog');
    const bootActions = document.getElementById('bootActions');
    const bootSequence = document.getElementById('bootSequence');
    const mainContainer = document.getElementById('mainContainer');
    const enterCellarBtn = document.getElementById('enterCellarBtn');
    const skipBootBtn = document.getElementById('skipBootBtn');

    const bootMessages = [
        "[CONECTANDO AO STREAM DO FEED DE DADOS...]",
        "[SINCRONIZANDO RELAYS DO SETOR 04 SUBTERRÂNEO...]",
        "[DECRIPTografando LOGS DE VIGILÂNCIA EM TEMPO REAL...]",
        "[AVISO: ANOMALIA ESPACIAL DETECTADA NA BIBLIOTECA]",
        "[SISTEMA ONLINE // FEED PRONTO]"
    ];

    let msgIndex = 0;
    function runBoot() {
        if (msgIndex < bootMessages.length) {
            const p = document.createElement('p');
            p.textContent = bootMessages[msgIndex];
            bootLog.appendChild(p);
            msgIndex++;
            setTimeout(runBoot, 320);
        } else {
            bootActions.style.display = 'flex';
        }
    }
    runBoot();

    function dismissBoot() {
        bootSequence.style.opacity = '0';
        bootSequence.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            bootSequence.remove();
            document.body.classList.remove('loading-state');
            mainContainer.classList.remove('hidden');
        }, 600);
    }

    enterCellarBtn.addEventListener('click', dismissBoot);
    skipBootBtn.addEventListener('click', dismissBoot);

    // 02. BASE DE DADOS DO FEED COM ABAS EXPANSÍVEIS DETALHADAS
    const feedPostsData = [
        {
            id: "LOG_001",
            category: "alert",
            tag: "ALERTA CRÍTICO // SETOR 04",
            time: "HÁ 12 SEGUNDOS",
            title: "Sensor de Proximidade Acionado na Ala Leste",
            text: "Picos de áudio de alta frequência e queda abrupta de temperatura registrados no corredor principal. O índice de anomalia espacial saltou 42%. Evite contato visual direto caso ocorram distorções.",
            expandedInfo: "[RELATÓRIO TÉCNICO DE ANOMALIA]: A entidade Slendrina manifesta-se instantaneamente quando pertences críticos são coletados. A visibilidade da lanterna reduz drasticamente neste quadrante.",
            likes: 24,
            flagged: false
        },
        {
            id: "LOG_002",
            category: "lore",
            tag: "LORE DO JOGO // OS 8 LIVROS",
            time: "HÁ 4 MINUTOS",
            title: "O Significado Oculto dos Tomos Antigos",
            text: "Os registros históricos indicam que os pertences espalhados pelo porão mantêm o espírito preso. Encontrar todos os 8 livros antigos é o único método para destravar a pesada porta de ferro.",
            expandedInfo: "[ANÁLISE DE HISTÓRICO]: Cada livro recuperado aumenta a agressividade da IA da entidade. O porão é um labirinto fechado sem saídas convencionais de ventilação.",
            likes: 67,
            flagged: false
        },
        {
            id: "LOG_003",
            category: "mechanics",
            tag: "MECÂNICAS DE SOBREVIVÊNCIA",
            time: "HÁ 15 MINUTOS",
            title: "Gestão de Tensão Sonora e Visual",
            text: "O terror psicológico de Slendrina: The Cellar baseia-se na privação sensorial. O feixe estreito da lanterna cria pontos cegos onde ameaças silenciosas se acumulam rapidamente.",
            expandedInfo: "[DIRETRIZ DE SOBREVIVÊNCIA]: Nunca corra em linha reta em corredores escuros sem memorizar o mapa. Ouça atentamente os passos e choros abafados pelas paredes de pedra.",
            likes: 51,
            flagged: false
        },
        {
            id: "LOG_004",
            category: "dev",
            tag: "ARQUITETURA FRONT-END",
            time: "HÁ 32 MINUTOS",
            title: "Implementação de Scanlines CRT em CSS Puro",
            text: "Para manter a taxa de 60 quadros por segundo sem sobrecarga gráfica, as linhas de varredura do monitor antigo utilizam gradientes lineares repetidos em conjunto com animações de opacidade.",
            expandedInfo: "[TRECHO DE CÓDIGO DA ENGINE]:\nbackground: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.3) 50%);\nbackground-size: 100% 4px;",
            likes: 42,
            flagged: false
        }
    ];

    const feedPostsContainer = document.getElementById('feedPostsContainer');

    function renderFeed(filter = 'all') {
        feedPostsContainer.innerHTML = '';
        const filtered = filter === 'all' 
            ? feedPostsData 
            : feedPostsData.filter(p => p.category === filter);

        filtered.forEach(post => {
            const card = document.createElement('div');
            card.className = 'feed-post-card';
            card.innerHTML = `
                <div class="post-header">
                    <span class="post-tag">[${post.tag}]</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <div class="post-body">
                    <h3>${post.title}</h3>
                    <p>${post.text}</p>
                    <div class="post-expanded-content" id="exp-${post.id}">
                        ${post.expandedInfo}
                    </div>
                </div>
                <div class="post-footer">
                    <div class="post-actions">
                        <button class="action-btn toggle-detail-btn" data-id="${post.id}">
                            📂 <span class="toggle-text">EXPANDIR REGISTRO</span>
                        </button>
                        <button class="action-btn like-btn" data-id="${post.id}">
                            ❤️ <span class="like-count">${post.likes}</span>
                        </button>
                        <button class="action-btn flag-btn" data-id="${post.id}">
                            🚩 ${post.flagged ? 'SINALIZADO' : 'MARCAR ANOMALIA'}
                        </button>
                    </div>
                    <span class="post-id-stamp">${post.id}</span>
                </div>
            `;
            feedPostsContainer.appendChild(card);
        });

        attachPostListeners();
    }

    renderFeed('all');

    // Botões de Filtro do Feed
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFeed(btn.getAttribute('data-filter'));
        });
    });

    // Ouvintes de eventos para interações nos cartões do feed
    function attachPostListeners() {
        // Expandir/recolher abas de detalhes
        document.querySelectorAll('.toggle-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const expBox = document.getElementById(`exp-${id}`);
                const toggleSpan = btn.querySelector('.toggle-text');
                
                expBox.classList.toggle('open');
                if (expBox.classList.contains('open')) {
                    toggleSpan.textContent = "RECOLHER REGISTRO";
                } else {
                    toggleSpan.textContent = "EXPANDIR REGISTRO";
                }
            });
        });

        // Curtidas
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const post = feedPostsData.find(p => p.id === id);
                if (post) {
                    post.likes++;
                    btn.querySelector('.like-count').textContent = post.likes;
                    btn.style.color = 'var(--blood-red)';
                }
            });
        });

        // Sinalizar Anomalia
        document.querySelectorAll('.flag-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const post = feedPostsData.find(p => p.id === id);
                if (post) {
                    post.flagged = !post.flagged;
                    btn.textContent = `🚩 ${post.flagged ? 'SINALIZADO' : 'MARCAR ANOMALIA'}`;
                    btn.style.color = post.flagged ? 'var(--blood-red)' : 'var(--cold-gray)';
                }
            });
        });
    }

    // Carregar mais blocos de arquivos simulados
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.textContent = "BUSCANDO BLOCO CRIPTOGRAFADO...";
        setTimeout(() => {
            const newId = `LOG_00${feedPostsData.length + 1}`;
            feedPostsData.push({
                id: newId,
                category: "alert",
                tag: "TRANSMISSÃO CAPTURADA",
                time: "AGORA MESMO",
                title: "Silhueta Desconhecida no Monitor Secundário",
                text: "Uma distorção visual temporária passou pelas câmeras térmicas subterrâneas. A instabilidade do sinal está afetando os nós de proxy ativos.",
                expandedInfo: "[DIAGNÓSTICO DO SISTEMA]: O motor JavaScript detectou oscilações no DOM. A taxa de quadros e o buffer de áudio continuam operando em modo de segurança.",
                likes: 8,
                flagged: false
            });
            renderFeed(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
            loadMoreBtn.textContent = "[BUSCAR MAIS BLOCOS DE ARQUIVO]";
        }, 700);
    });

    // 03. SISTEMA DE ÁUDIO WEB API (ZUMBIDO ATMOSFÉRICO DE 55Hz)
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    let audioCtx = null;
    let oscillator = null;
    let gainNode = null;
    let isAudioActive = false;

    audioToggleBtn.addEventListener('click', () => {
        if (!isAudioActive) {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            oscillator = audioCtx.createOscillator();
            gainNode = audioCtx.createGain();
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(55, audioCtx.currentTime); // 55Hz (Nota A1 grave)
            gainNode.gain.setValueAtTime(volumeSlider.value * 0.15, audioCtx.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            isAudioActive = true;
            audioToggleBtn.textContent = "ÁUDIO: [LIG]";
        } else {
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect();
                oscillator = null;
            }
            isAudioActive = false;
            audioToggleBtn.textContent = "ÁUDIO: [DESL]";
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        if (gainNode && audioCtx) {
            gainNode.gain.setValueAtTime(e.target.value * 0.15, audioCtx.currentTime);
        }
    });

    // 04. MINI TERMINAL INTERATIVO NA SIDEBAR
    const miniTerminalInput = document.getElementById('miniTerminalInput');
    const miniTerminalOutput = document.getElementById('miniTerminalOutput');

    miniTerminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = miniTerminalInput.value.trim().toLowerCase();
            const p = document.createElement('p');
            p.innerHTML = `<span style="color:var(--blood-red);">></span> ${miniTerminalInput.value}`;
            miniTerminalOutput.appendChild(p);

            if (cmd === 'ajuda' || cmd === 'help') {
                const res = document.createElement('p');
                res.textContent = "COMANDOS: status, limpar, entidade, ping";
                miniTerminalOutput.appendChild(res);
            } else if (cmd === 'status') {
                const res = document.createElement('p');
                res.textContent = "FEED ESTÁVEL. AMEAÇA DA ENTIDADE: EXTREMA.";
                miniTerminalOutput.appendChild(res);
            } else if (cmd === 'limpar' || cmd === 'clear') {
                miniTerminalOutput.innerHTML = '';
            } else if (cmd === 'entidade') {
                const res = document.createElement('p');
                res.textContent = "ALERTA: Slendrina está ativa no quadrante de escuta.";
                miniTerminalOutput.appendChild(res);
            } else if (cmd === 'ping') {
                const res = document.createElement('p');
                res.textContent = "PONG! Latência do sinal: 42ms";
                miniTerminalOutput.appendChild(res);
            } else if (cmd !== '') {
                const err = document.createElement('p');
                err.style.color = 'var(--blood-red)';
                err.textContent = `COMANDO NÃO RECONHECIDO: ${cmd}`;
                miniTerminalOutput.appendChild(err);
            }

            miniTerminalInput.value = '';
            miniTerminalOutput.scrollTop = miniTerminalOutput.scrollHeight;
        }
    });

    // 05. COPIAR CÓDIGO DO WIDGET
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.previousElementSibling.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = 'COPIADO!';
                setTimeout(() => btn.textContent = 'COPIAR', 1500);
            });
        });
    });

    // 06. INTERFERÊNCIAS E GLITCHES ALEATÓRIOS
    const glitchOverlay = document.getElementById('glitchOverlay');
    const redFlash = document.getElementById('redFlash');

    setInterval(() => {
        if (Math.random() > 0.5) {
            glitchOverlay.style.opacity = '1';
            setTimeout(() => glitchOverlay.style.opacity = '0', Math.random() * 250 + 50);
        } else {
            redFlash.style.opacity = '0.3';
            setTimeout(() => redFlash.style.opacity = '0', 120);
        }
    }, 14000);

    // 07. REINICIAR SESSÃO
    document.getElementById('restartBtn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => location.reload(), 600);
    });

});