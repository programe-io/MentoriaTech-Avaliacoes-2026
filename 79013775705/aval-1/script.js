const canvas = document.getElementById('campo');
const ctx = canvas.getContext('2d');

let estadoPartida = 'MENU'; 
let jogoPausado = false;
let modoSoPenaltis = false; // Controle novo para saber se o jogo foi direto pros pênaltis

let minutoAtual = 0; 
let framesPorMinuto = 60; 
let tickCounter = 0;
let faseJogo = '1T'; 
let framesGlobais = 0;

let configPartida = { poderesAtivos: true, t1Mode: 'solo', t2Mode: 'solo' };
const gameConfig = { volume: 50, graficos: '3d' };

const timesBD = [
    { liga: 'Brasileirão', sigla: 'FLA', nome: 'Flamengo', corBase: '#c8102e', corBorda: '#000000', escudo: 'https://a.espncdn.com/i/teamlogos/soccer/500/819.png' },
    { liga: 'Brasileirão', sigla: 'PAL', nome: 'Palmeiras', corBase: '#006437', corBorda: '#ffffff', escudo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2029.png' },
    { liga: 'Europa', sigla: 'RMA', nome: 'Real Madrid', corBase: '#ffffff', corBorda: '#fdb813', escudo: 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png' },
    { liga: 'Europa', sigla: 'BAR', nome: 'Barcelona', corBase: '#004d98', corBorda: '#a50044', escudo: 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png' },
    { liga: 'Seleções', sigla: 'BRA', nome: 'Brasil', corBase: '#fec900', corBorda: '#009b3a', escudo: 'https://flagcdn.com/w160/br.png' },
    { liga: 'Seleções', sigla: 'ARG', nome: 'Argentina', corBase: '#74acdf', corBorda: '#ffffff', escudo: 'https://flagcdn.com/w160/ar.png' }
];
const ligasDisponiveis = ['Brasileirão', 'Europa', 'Seleções'];

timesBD.forEach(t => { 
    if (t.escudo) { t.img = new Image(); t.img.crossOrigin = "Anonymous"; t.img.src = t.escudo; t.img.onerror = () => { t.img = null; }; }
});

let uiState = { j1: { ligaIndex: 0, timeIndex: 0, timesNaLiga: [] }, j2: { ligaIndex: 1, timeIndex: 0, timesNaLiga: [] } };
let timeSelecionado1 = null; let timeSelecionado2 = null; 

// --- FUNÇÕES DE MENU ---
function atualizarMenuUI(playerID) {
    let pState = uiState[`j${playerID}`]; let ligaAtual = ligasDisponiveis[pState.ligaIndex];
    pState.timesNaLiga = timesBD.filter(t => t.liga === ligaAtual);
    if(pState.timeIndex >= pState.timesNaLiga.length) pState.timeIndex = 0;
    if(pState.timeIndex < 0) pState.timeIndex = pState.timesNaLiga.length - 1;
    let timeAtual = pState.timesNaLiga[pState.timeIndex];
    
    document.getElementById(`j${playerID}-liga`).innerText = ligaAtual;
    document.getElementById(`j${playerID}-nome`).innerText = timeAtual.nome;
    if (timeAtual.escudo) { document.getElementById(`j${playerID}-escudo`).src = timeAtual.escudo; document.getElementById(`j${playerID}-escudo`).style.display = 'block';
    } else { document.getElementById(`j${playerID}-escudo`).style.display = 'none'; }
    if (playerID === 1) timeSelecionado1 = timeAtual; else timeSelecionado2 = timeAtual;
}
function mudarLiga(playerID, direcao) {
    let pState = uiState[`j${playerID}`]; pState.ligaIndex += direcao;
    if(pState.ligaIndex >= ligasDisponiveis.length) pState.ligaIndex = 0;
    if(pState.ligaIndex < 0) pState.ligaIndex = ligasDisponiveis.length - 1;
    pState.timeIndex = 0; atualizarMenuUI(playerID);
}
function mudarTime(playerID, direcao) { uiState[`j${playerID}`].timeIndex += direcao; atualizarMenuUI(playerID); }

// --- ESTRUTURAS DO JOGO ---
let ultimoToque = 0; const poderCaixa = { ativo: false, x: 0, y: 0, raio: 15, tipo: 1, cor: '#ffea00' };
const listaEmojisPoderes = { 1: "⚡", 2: "💪", 3: "🛡️", 4: "🎯", 5: "❄️", 6: "🔋" };
const bola = { x: 500, y: 300, raio: 10, velocidadeX: 6, velocidadeY: 5, velMaxima: 12, cor: '#ffffff' };
const rastroBola = []; let shakeEsq = 0; let shakeDir = 0;

const time1 = { 
    colorID: 1, pontos: 0, raioJogador: 22, inventorio: [], timerVel: 0, timerTamanho: 0, timerGolEncolhido: 0, timerGolExpandido: 0, timerCongelado: 0, timerStaminaInf: 0, dados: null,
    jogadores: [
        { id: 0, x: 55, y: 300, type: 'human1', energia: 100, rastro: [], toquesConsecutivos: 0, ultimoToqueFrame: 0, timerAtravessavel: 0 },
        { id: 1, x: 350, y: 300, type: 'bot', energia: 100, rastro: [], toquesConsecutivos: 0, ultimoToqueFrame: 0, timerAtravessavel: 0 }
    ]
};
const time2 = { 
    colorID: 2, pontos: 0, raioJogador: 22, inventorio: [], timerVel: 0, timerTamanho: 0, timerGolEncolhido: 0, timerGolExpandido: 0, timerCongelado: 0, timerStaminaInf: 0, dados: null,
    jogadores: [
        { id: 0, x: 650, y: 300, type: 'bot', energia: 100, rastro: [], toquesConsecutivos: 0, ultimoToqueFrame: 0, timerAtravessavel: 0 },
        { id: 1, x: 945, y: 300, type: 'human2', energia: 100, rastro: [], toquesConsecutivos: 0, ultimoToqueFrame: 0, timerAtravessavel: 0 }
    ]
};

// --- SISTEMA DE PÊNALTIS ---
let penalti = {
    rodada: 1, timeChutando: 1, fase: 'INICIO', scoreT1: 0, scoreT2: 0, chutesT1: 0, chutesT2: 0,
    forcaOscilando: 0, forcaDir: 2.5, forcaTravada: 0, tempoDir: 0, escolhaChute: null, escolhaDefesa: null,
    animTick: 0, bolaVisualX: 500, bolaVisualY: 450, bolaEscala: 1, goleiroVisualX: 500, goleiroVisualY: 150
};

const teclas = {};
window.addEventListener('keydown', (e) => { 
    let k = e.key.toLowerCase(); teclas[k] = true;
    
    if (estadoPartida === 'MENU') return;
    if (k === 'p') alternarPausa();
    if (jogoPausado) return;

    if (estadoPartida === 'PENALTIS') {
        if (k === ' ' && penalti.fase === 'FORCA') travarForcaPenalti();
        return; 
    }

    if (estadoPartida === 'JOGANDO') {
        if (k === 'q') acaoTrocaDeJogador(time1);
        if (k === 'l') acaoTrocaDeJogador(time2);
        if (configPartida.poderesAtivos) {
            if (k === 'e') usarPoderDoSlot(time1, 0); if (k === 'r') usarPoderDoSlot(time1, 1);
            if (k === 'u') usarPoderDoSlot(time2, 0); if (k === 'o') usarPoderDoSlot(time2, 1);
        }
    }
});
window.addEventListener('keyup', (e) => { teclas[e.key.toLowerCase()] = false; });

// --- LÓGICA DE TEMPO E FASES ---
function carregarModosEquipes() {
    let m1 = document.getElementById('t1-mode').value;
    if(m1 === 'solo') { time1.jogadores[0].type = 'human1'; time1.jogadores[1].type = 'bot'; }
    if(m1 === 'duo') { time1.jogadores[0].type = 'human1'; time1.jogadores[1].type = 'human1_p2'; }
    if(m1 === 'cpu') { time1.jogadores[0].type = 'bot'; time1.jogadores[1].type = 'bot'; }
    let m2 = document.getElementById('t2-mode').value;
    if(m2 === 'solo') { time2.jogadores[0].type = 'bot'; time2.jogadores[1].type = 'human2'; }
    if(m2 === 'duo') { time2.jogadores[0].type = 'human2'; time2.jogadores[1].type = 'human2_p2'; }
    if(m2 === 'cpu') { time2.jogadores[0].type = 'bot'; time2.jogadores[1].type = 'bot'; }
}

function iniciarPartida() {
    time1.pontos = 0; time2.pontos = 0; document.getElementById('placar').innerText = "0 - 0";
    minutoAtual = 0; faseJogo = '1T'; framesPorMinuto = 60; tickCounter = 0; framesGlobais = 0;
    resetarPosicoesEEstamina(); resetarBola(1); 
    estadoPartida = 'JOGANDO'; jogoPausado = false;
    document.getElementById('indicador-fase').innerText = "1º TEMPO";
    document.getElementById('menu-pausa').classList.add('escondido');
    document.getElementById('ui-penaltis').classList.add('escondido');
}

function iniciarPartidaPenaltis() {
    time1.pontos = 0; time2.pontos = 0; document.getElementById('placar').innerText = "0 - 0";
    estadoPartida = 'PENALTIS'; jogoPausado = false;
    document.getElementById('indicador-fase').innerText = "DISPUTA DE PÊNALTIS";
    document.getElementById('menu-pausa').classList.add('escondido');
    iniciarSessaoPenaltis();
}

function resetarPosicoesEEstamina() {
    time1.jogadores.forEach(j => { j.x = j.id === 0 ? 55 : 350; j.y = 300; j.energia = 100; j.rastro = []; j.timerAtravessavel = 0; j.toquesConsecutivos = 0; }); 
    time2.jogadores.forEach(j => { j.x = j.id === 0 ? 650 : 945; j.y = 300; j.energia = 100; j.rastro = []; j.timerAtravessavel = 0; j.toquesConsecutivos = 0; });
    rastroBola.length = 0; shakeEsq = 0; shakeDir = 0;
}

function mostrarModal(titulo, mensagem, botoesAtivos) {
    jogoPausado = true;
    document.getElementById('titulo-menu').innerText = titulo;
    document.getElementById('mensagem-modal').innerText = mensagem;
    
    ['btn-continuar', 'btn-iniciar-2t', 'btn-iniciar-prorrog', 'btn-aumentar-tempo', 'btn-iniciar-penaltis'].forEach(id => {
        document.getElementById(id).classList.add('escondido');
    });
    botoesAtivos.forEach(id => document.getElementById(id).classList.remove('escondido'));
    document.getElementById('menu-pausa').classList.remove('escondido');
}

function gerenciarTempo() {
    tickCounter++;
    if (tickCounter >= framesPorMinuto) {
        minutoAtual++; tickCounter = 0;
        document.getElementById('cronometro').innerText = `${minutoAtual}'`;

        if (minutoAtual === 45 && faseJogo === '1T') {
            estadoPartida = 'INTERVALO';
            mostrarModal("FIM DO 1º TEMPO", "A estamina dos jogadores foi recuperada!", ['btn-iniciar-2t']);
        } 
        else if (minutoAtual === 90 && faseJogo === '2T') {
            if (time1.pontos === time2.pontos) {
                estadoPartida = 'ESPERA_PRORROGACAO';
                mostrarModal("FIM DE JOGO - EMPATE!", "O jogo não pode terminar empatado. Vamos para a Prorrogação!", ['btn-iniciar-prorrog']);
            } else { encerrarPartidaGeral(); }
        }
        else if (minutoAtual === 120 && faseJogo === 'PRORROGACAO_1') {
            if (time1.pontos === time2.pontos) {
                estadoPartida = 'ESPERA_PENALTIS';
                mostrarModal("FIM DA PRORROGAÇÃO!", "Ainda empatado! Escolha seu destino:", ['btn-aumentar-tempo', 'btn-iniciar-penaltis']);
            } else { encerrarPartidaGeral(); }
        }
        else if (minutoAtual === 150 && faseJogo === 'PRORROGACAO_2') {
            if (time1.pontos === time2.pontos) {
                estadoPartida = 'ESPERA_PENALTIS';
                mostrarModal("TEMPO ESGOTADO!", "Aumentar o tempo não resolveu. PÊNALTIS OBRIGATÓRIOS!", ['btn-iniciar-penaltis']);
            } else { encerrarPartidaGeral(); }
        }
    }
}

// BOTOES DO MODAL E MENUS
document.addEventListener('click', (e) => {
    let t = e.target.id;
    if (t === 'btn-ir-selecao') {
        document.getElementById('tela-start').style.display = 'none'; 
        document.getElementById('tela-selecao').classList.remove('escondido');
        atualizarMenuUI(1); atualizarMenuUI(2); 
    } else if (t === 'btn-voltar-inicio') {
        document.getElementById('tela-selecao').classList.add('escondido');
        document.getElementById('tela-start').style.display = 'flex';
    } else if (t === 'start-game') {
        modoSoPenaltis = false; // Modo de jogo Normal
        configPartida.poderesAtivos = document.getElementById('check-poderes').checked;
        document.getElementById('slots-t1').style.display = configPartida.poderesAtivos ? 'flex' : 'none';
        document.getElementById('slots-t2').style.display = configPartida.poderesAtivos ? 'flex' : 'none';
        carregarModosEquipes(); time1.dados = timeSelecionado1; time2.dados = timeSelecionado2;
        document.getElementById('nome-t1').innerText = timeSelecionado1.sigla; document.getElementById('nome-t2').innerText = timeSelecionado2.sigla;
        document.getElementById('tela-selecao').classList.add('escondido'); 
        iniciarPartida();
    } else if (t === 'start-penaltis') {
        modoSoPenaltis = true; // Inicia o modo só pênaltis
        configPartida.poderesAtivos = false; // Pênaltis não usam poderes do campo
        document.getElementById('slots-t1').style.display = 'none';
        document.getElementById('slots-t2').style.display = 'none';
        carregarModosEquipes(); time1.dados = timeSelecionado1; time2.dados = timeSelecionado2;
        document.getElementById('nome-t1').innerText = timeSelecionado1.sigla; document.getElementById('nome-t2').innerText = timeSelecionado2.sigla;
        document.getElementById('tela-selecao').classList.add('escondido'); 
        iniciarPartidaPenaltis();
    } else if (t === 'open-config') { document.getElementById('menu-config').classList.remove('escondido');
    } else if (t === 'btn-config-voltar') { document.getElementById('menu-config').classList.add('escondido');
    } else if (t === 'open-ajuda' || t === 'btn-ajuda-pausa') { document.getElementById('menu-ajuda').classList.remove('escondido');
    } else if (t === 'btn-ajuda-fechar') { document.getElementById('menu-ajuda').classList.add('escondido');
    } else if (t === 'btn-continuar') { alternarPausa();
    } else if (t === 'btn-reiniciar-jogo') { 
        if (modoSoPenaltis) iniciarPartidaPenaltis(); else iniciarPartida(); 
    } else if (t === 'btn-resetar') { location.reload(); 
    } else if (t === 'btn-iniciar-2t') {
        faseJogo = '2T'; estadoPartida = 'JOGANDO'; jogoPausado = false;
        document.getElementById('indicador-fase').innerText = "2º TEMPO";
        resetarPosicoesEEstamina(); resetarBola(-1);
        document.getElementById('menu-pausa').classList.add('escondido');
    } else if (t === 'btn-iniciar-prorrog') {
        faseJogo = 'PRORROGACAO_1'; estadoPartida = 'JOGANDO'; jogoPausado = false; framesPorMinuto = 180; 
        document.getElementById('indicador-fase').innerText = "PRORROGAÇÃO";
        resetarPosicoesEEstamina(); resetarBola(1);
        document.getElementById('menu-pausa').classList.add('escondido');
    } else if (t === 'btn-aumentar-tempo') {
        faseJogo = 'PRORROGACAO_2'; estadoPartida = 'JOGANDO'; jogoPausado = false; framesPorMinuto = 120; 
        document.getElementById('indicador-fase').innerText = "PRORROGAÇÃO +";
        resetarPosicoesEEstamina(); resetarBola(-1);
        document.getElementById('menu-pausa').classList.add('escondido');
    } else if (t === 'btn-iniciar-penaltis') {
        estadoPartida = 'PENALTIS'; jogoPausado = false;
        document.getElementById('menu-pausa').classList.add('escondido');
        iniciarSessaoPenaltis();
    }
});

function alternarPausa() {
    if (estadoPartida !== 'JOGANDO' && estadoPartida !== 'PENALTIS') return; 
    jogoPausado = !jogoPausado;
    if (jogoPausado) mostrarModal("JOGO PAUSADO", "", ['btn-continuar']);
    else document.getElementById('menu-pausa').classList.add('escondido');
}

function encerrarPartidaGeral() {
    estadoPartida = 'FIM';
    let msg = "";
    if (time1.pontos > time2.pontos) msg = `VITÓRIA DO ${timeSelecionado1.nome}!`;
    else if (time2.pontos > time1.pontos) msg = `VITÓRIA DO ${timeSelecionado2.nome}!`;
    mostrarModal("FIM DE JOGO!", msg, []);
}

// --- FÍSICA DO JOGO NORMAL ---
function resetarBola(direcao) { bola.x = 500; bola.y = 300; bola.velocidadeX = 6 * direcao; bola.velocidadeY = 5 * (Math.random() > 0.5 ? 1 : -1); ultimoToque = 0; poderCaixa.ativo = false; shakeEsq = 0; shakeDir = 0; }

function moverJogador(j, time) {
    if (time.timerCongelado > 0) return false;
    let velBase = time.timerVel > 0 ? 13 : 6; let vel = (j.energia < 25) ? velBase * 0.45 : velBase; let moveu = false;

    if (j.type === 'human1') {
        if (teclas['w']) { j.y -= vel; moveu = true; } if (teclas['s']) { j.y += vel; moveu = true; }
        if (teclas['a']) { j.x -= vel; moveu = true; } if (teclas['d']) { j.x += vel; moveu = true; }
    } else if (j.type === 'human1_p2') {
        if (teclas['t']) { j.y -= vel; moveu = true; } if (teclas['g']) { j.y += vel; moveu = true; }
        if (teclas['f']) { j.x -= vel; moveu = true; } if (teclas['h']) { j.x += vel; moveu = true; }
    } else if (j.type === 'human2') {
        if (teclas['i']) { j.y -= vel; moveu = true; } if (teclas['k']) { j.y += vel; moveu = true; }
        if (teclas['j']) { j.x -= vel; moveu = true; } if (teclas['l']) { j.x += vel; moveu = true; }
    } else if (j.type === 'human2_p2') {
        if (teclas['arrowup']) { j.y -= vel; moveu = true; } if (teclas['arrowdown']) { j.y += vel; moveu = true; }
        if (teclas['arrowleft']) { j.x -= vel; moveu = true; } if (teclas['arrowright']) { j.x += vel; moveu = true; }
    } else if (j.type === 'bot') {
        let distX = Math.abs(bola.x - j.x);
        let moveuBot = false;
        if (distX < 550) {
            let distY = bola.y - j.y; let velBot = vel * 0.70; 
            if (Math.abs(distY) > 8) { if (distY > 0) j.y += velBot; else j.y -= velBot; moveuBot = true; }
            if (bola.x > j.x + 10) { j.x += velBot; moveuBot = true; } else if (bola.x < j.x - 10) { j.x -= velBot; moveuBot = true; }
        } else {
            let baseX = (time.colorID === 1) ? (j.id === 0 ? 55 : 350) : (j.id === 0 ? 650 : 945);
            let distCentroY = 300 - j.y; let distCentroX = baseX - j.x;
            if (Math.abs(distCentroY) > 10 || Math.abs(distCentroX) > 10) {
                let velBot = vel * 0.35; 
                if (distCentroY > 0) j.y += velBot; else j.y -= velBot;
                if (distCentroX > 0) j.x += velBot; else j.x -= velBot;
                moveuBot = true;
            }
        }
        moveu = moveuBot;
    }

    if (j.y < time.raioJogador) j.y = time.raioJogador; if (j.y > canvas.height - time.raioJogador) j.y = canvas.height - time.raioJogador;
    if (j.x < time.raioJogador + 30) j.x = time.raioJogador + 30; if (j.x > canvas.width - time.raioJogador - 30) j.x = canvas.width - time.raioJogador - 30;
    
    if (moveu && gameConfig.graficos === '3d') j.rastro.push({ x: j.x, y: j.y, life: 1.0 });
    return moveu;
}

function atualizarFisicaNormal() {
    gerenciarTempo();
    const timers = ['timerVel', 'timerTamanho', 'timerGolEncolhido', 'timerGolExpandido', 'timerCongelado', 'timerStaminaInf'];
    timers.forEach(t => { if (time1[t] > 0) time1[t]--; if (time2[t] > 0) time2[t]--; });
    time1.raioJogador = (time1.timerTamanho > 0) ? 40 : 22; time2.raioJogador = (time2.timerTamanho > 0) ? 40 : 22;

    [time1, time2].forEach((time, indexTeam) => {
        time.jogadores.forEach(j => {
            if (j.timerAtravessavel > 0) j.timerAtravessavel--;
            let moveu = moverJogador(j, time);
            
            if (time.timerStaminaInf > 0) { j.energia = 100; } 
            else {
                if (moveu && j.energia > 0) j.energia -= 0.10; 
                else if (!moveu && j.energia < 100) j.energia += 0.40; 
            }
            
            let barra = document.getElementById(`energia-t${indexTeam + 1}-p${j.id}`);
            if (barra) { barra.style.width = j.energia + '%'; barra.style.backgroundColor = (j.energia < 25) ? '#ff4d4d' : '#39ff14'; }
        });
    });

    let todosJogadores = [];
    time1.jogadores.forEach(j => todosJogadores.push({ j: j, raio: time1.raioJogador }));
    time2.jogadores.forEach(j => todosJogadores.push({ j: j, raio: time2.raioJogador }));

    for (let i = 0; i < todosJogadores.length; i++) {
        for (let k = i + 1; k < todosJogadores.length; k++) {
            let p1 = todosJogadores[i].j; let r1 = todosJogadores[i].raio;
            let p2 = todosJogadores[k].j; let r2 = todosJogadores[k].raio;

            if (p1.timerAtravessavel > 0 || p2.timerAtravessavel > 0) continue;

            let dx = p2.x - p1.x; let dy = p2.y - p1.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            let distMin = r1 + r2;

            if (dist < distMin && dist > 0) {
                let overlap = distMin - dist;
                let dirX = dx / dist; let dirY = dy / dist;

                p1.x -= dirX * (overlap / 2); p1.y -= dirY * (overlap / 2);
                p2.x += dirX * (overlap / 2); p2.y += dirY * (overlap / 2);

                if (p1.x < r1 + 30) p1.x = r1 + 30; if (p1.x > canvas.width - r1 - 30) p1.x = canvas.width - r1 - 30;
                if (p1.y < r1) p1.y = r1; if (p1.y > canvas.height - r1) p1.y = canvas.height - r1;
                
                if (p2.x < r2 + 30) p2.x = r2 + 30; if (p2.x > canvas.width - r2 - 30) p2.x = canvas.width - r2 - 30;
                if (p2.y < r2) p2.y = r2; if (p2.y > canvas.height - r2) p2.y = canvas.height - r2;
            }
        }
    }

    bola.x += bola.velocidadeX; bola.y += bola.velocidadeY;

    if (gameConfig.graficos === '3d') {
        if (Math.abs(bola.velocidadeX) > 1 || Math.abs(bola.velocidadeY) > 1) rastroBola.push({ x: bola.x, y: bola.y, life: 1.0 });
        for (let i = rastroBola.length - 1; i >= 0; i--) { rastroBola[i].life -= 0.05; if (rastroBola[i].life <= 0) rastroBola.splice(i, 1); }
        [time1, time2].forEach(time => { time.jogadores.forEach(j => { for (let i = j.rastro.length - 1; i >= 0; i--) { j.rastro[i].life -= 0.03; if (j.rastro[i].life <= 0) j.rastro.splice(i, 1); } }); });
        if (shakeEsq > 0) shakeEsq--; if (shakeDir > 0) shakeDir--;
    }

    [time1, time2].forEach(time => {
        for (let j of time.jogadores) {
            if (j.timerAtravessavel > 0) continue; 
            let dx = bola.x - j.x; let dy = bola.y - j.y; let dist = time.raioJogador + bola.raio;
            if (Math.sqrt(dx*dx + dy*dy) < dist) {
                if (framesGlobais - j.ultimoToqueFrame < 15) j.toquesConsecutivos++; else j.toquesConsecutivos = 1;
                j.ultimoToqueFrame = framesGlobais;
                if (j.toquesConsecutivos >= 6) { j.timerAtravessavel = 90; j.toquesConsecutivos = 0; continue; }
                if (Math.abs(dx) < 3) dx = (bola.x > canvas.width / 2) ? -6 : 6; 
                ultimoToque = time.colorID; 
                let angulo = Math.atan2(dy, dx);
                bola.x = j.x + dist * Math.cos(angulo); bola.y = j.y + dist * Math.sin(angulo);
                let vel = Math.sqrt(bola.velocidadeX**2 + bola.velocidadeY**2) * 1.05; if (vel > bola.velMaxima) vel = bola.velMaxima;
                bola.velocidadeX = Math.cos(angulo) * vel; bola.velocidadeY = Math.sin(angulo) * vel;
            }
        }
    });

    if (bola.y - bola.raio <= 0) { bola.y = bola.raio; bola.velocidadeY = Math.abs(bola.velocidadeY); }
    if (bola.y + bola.raio >= canvas.height) { bola.y = canvas.height - bola.raio; bola.velocidadeY = -Math.abs(bola.velocidadeY); }

    let topoEsq = 200, fundoEsq = 400; if (time1.timerGolEncolhido > 0) { topoEsq += 35; fundoEsq -= 35; } if (time2.timerGolExpandido > 0) { topoEsq -= 35; fundoEsq += 35; }
    let topoDir = 200, fundoDir = 400; if (time2.timerGolEncolhido > 0) { topoDir += 35; fundoDir -= 35; } if (time1.timerGolExpandido > 0) { topoDir -= 35; fundoDir += 35; }

    if (bola.x - bola.raio <= 0) {
        if (bola.y > topoEsq && bola.y < fundoEsq) { time2.pontos++; shakeEsq = 20; document.getElementById('placar').innerText = `${time1.pontos} - ${time2.pontos}`; resetarBola(1);
        } else { bola.x = bola.raio; bola.velocidadeX = Math.abs(bola.velocidadeX); if (bola.y > topoEsq - 30 && bola.y < fundoEsq + 30) shakeEsq = 12; }
    }
    if (bola.x + bola.raio >= canvas.width) {
        if (bola.y > topoDir && bola.y < fundoDir) { time1.pontos++; shakeDir = 20; document.getElementById('placar').innerText = `${time1.pontos} - ${time2.pontos}`; resetarBola(-1);
        } else { bola.x = canvas.width - bola.raio; bola.velocidadeX = -Math.abs(bola.velocidadeX); if (bola.y > topoDir - 30 && bola.y < fundoDir + 30) shakeDir = 12; }
    }
}

// --- LÓGICA DE PÊNALTIS ---
function iniciarSessaoPenaltis() {
    document.getElementById('ui-penaltis').classList.remove('escondido');
    document.getElementById('pt1-nome').innerText = timeSelecionado1.sigla;
    document.getElementById('pt2-nome').innerText = timeSelecionado2.sigla;
    penalti.scoreT1 = 0; penalti.scoreT2 = 0; penalti.chutesT1 = 0; penalti.chutesT2 = 0;
    penalti.rodada = 1; penalti.timeChutando = 1;
    prepararChute();
}

function prepararChute() {
    penalti.fase = 'INICIO'; penalti.bolaVisualX = 500; penalti.bolaVisualY = 450; penalti.bolaEscala = 1; penalti.goleiroVisualX = 500; penalti.goleiroVisualY = 150;
    penalti.escolhaChute = null; penalti.escolhaDefesa = null;
    let nomeTime = penalti.timeChutando === 1 ? timeSelecionado1.nome : timeSelecionado2.nome;
    let cor = penalti.timeChutando === 1 ? '#ff4d4d' : '#00bcd4';
    let statusEl = document.getElementById('p-status'); statusEl.innerText = `${nomeTime} VAI BATER!`; statusEl.style.color = cor;
    
    setTimeout(() => { 
        penalti.fase = 'FORCA'; penalti.forcaOscilando = 0; penalti.forcaDir = 3; 
        statusEl.innerText = "ESPAÇO = FORÇA"; statusEl.style.color = "#fff";
        document.getElementById('barra-forca-fill').style.width = '100%';
        
        let isT1Bot = !time1.jogadores.some(j => j.type.startsWith('human'));
        let isT2Bot = !time2.jogadores.some(j => j.type.startsWith('human'));
        let chuteBot = (penalti.timeChutando === 1 && isT1Bot) || (penalti.timeChutando === 2 && isT2Bot);
        if (chuteBot) setTimeout(() => travarForcaPenalti(), 500 + Math.random() * 1000);
    }, 2000);
}

function travarForcaPenalti() {
    penalti.forcaTravada = penalti.forcaOscilando;
    document.getElementById('p-status').innerText = "SEGURE A DIREÇÃO!";
    penalti.fase = 'DIRECAO'; penalti.tempoDir = 120; 
}

function avaliarDirecoes() {
    let dirP1 = 'C'; let dirP2 = 'C';
    let w = teclas['w']; let a = teclas['a']; let s = teclas['s']; let d = teclas['d'];
    if (w && a) dirP1 = 'TL'; else if (w && d) dirP1 = 'TR'; else if (s && a) dirP1 = 'BL'; else if (s && d) dirP1 = 'BR';
    else if (w) dirP1 = 'TM'; else if (s) dirP1 = 'BM'; else if (a) dirP1 = 'ML'; else if (d) dirP1 = 'MR';

    let i = teclas['i']; let j = teclas['j']; let k = teclas['k']; let l = teclas['l'];
    if (i && j) dirP2 = 'TL'; else if (i && l) dirP2 = 'TR'; else if (k && j) dirP2 = 'BL'; else if (k && l) dirP2 = 'BR';
    else if (i) dirP2 = 'TM'; else if (k) dirP2 = 'BM'; else if (j) dirP2 = 'ML'; else if (l) dirP2 = 'MR';

    let isT1Bot = !time1.jogadores.some(j => j.type.startsWith('human'));
    let isT2Bot = !time2.jogadores.some(j => j.type.startsWith('human'));
    const zonas = ['TL','TM','TR','ML','C','MR','BL','BM','BR'];

    if (penalti.timeChutando === 1) {
        penalti.escolhaChute = isT1Bot ? zonas[Math.floor(Math.random()*zonas.length)] : dirP1;
        penalti.escolhaDefesa = isT2Bot ? zonas[Math.floor(Math.random()*zonas.length)] : dirP2;
    } else {
        penalti.escolhaChute = isT2Bot ? zonas[Math.floor(Math.random()*zonas.length)] : dirP2;
        penalti.escolhaDefesa = isT1Bot ? zonas[Math.floor(Math.random()*zonas.length)] : dirP1;
    }

    let chutePerfeito = (penalti.forcaTravada > 85 && penalti.forcaTravada < 95);
    let chuteIsolado = (penalti.forcaTravada > 98 || penalti.forcaTravada < 10);
    
    let foiGol = false;
    if (chuteIsolado) { foiGol = false; document.getElementById('p-status').innerText = "ISOLOU!!"; document.getElementById('p-status').style.color = "#ff4d4d"; }
    else if (penalti.escolhaChute === penalti.escolhaDefesa) {
        if (chutePerfeito && Math.random() > 0.8) { foiGol = true; document.getElementById('p-status').innerText = "GOLAÇO INDEFENSÁVEL!"; }
        else { foiGol = false; document.getElementById('p-status').innerText = "DEFENDEEEU!!"; document.getElementById('p-status').style.color = "#ff4d4d"; }
    } else {
        foiGol = true; document.getElementById('p-status').innerText = "GOOOOOOL!!"; document.getElementById('p-status').style.color = "#39ff14";
    }

    if (foiGol) { if (penalti.timeChutando === 1) penalti.scoreT1++; else penalti.scoreT2++; }
    if (penalti.timeChutando === 1) penalti.chutesT1++; else penalti.chutesT2++;

    document.getElementById('pt1-score').innerText = penalti.scoreT1;
    document.getElementById('pt2-score').innerText = penalti.scoreT2;

    penalti.fase = 'ANIMACAO'; penalti.animTick = 60;
}

function finalizarRodadaPenalti() {
    let t1Score = penalti.scoreT1; let t2Score = penalti.scoreT2;
    let t1Restantes = 5 - penalti.chutesT1; let t2Restantes = 5 - penalti.chutesT2;
    
    let fimDePenaltis = false;
    if (penalti.rodada <= 5) {
        if (t1Score > t2Score + t2Restantes) fimDePenaltis = true;
        if (t2Score > t1Score + t1Restantes) fimDePenaltis = true;
        if (penalti.chutesT1 === 5 && penalti.chutesT2 === 5 && t1Score !== t2Score) fimDePenaltis = true;
    } else {
        if (penalti.chutesT1 === penalti.chutesT2 && t1Score !== t2Score) fimDePenaltis = true;
    }

    if (fimDePenaltis) {
        time1.pontos = t1Score; time2.pontos = t2Score;
        encerrarPartidaGeral();
    } else {
        if (penalti.timeChutando === 1) { penalti.timeChutando = 2; }
        else { penalti.timeChutando = 1; penalti.rodada++; document.getElementById('p-round').innerText = penalti.rodada; }
        prepararChute();
    }
}

function atualizarPenalti() {
    if (penalti.fase === 'FORCA') {
        penalti.forcaOscilando += penalti.forcaDir;
        if (penalti.forcaOscilando >= 100 || penalti.forcaOscilando <= 0) penalti.forcaDir *= -1;
        document.getElementById('barra-forca-fill').style.width = (100 - penalti.forcaOscilando) + '%';
    } 
    else if (penalti.fase === 'DIRECAO') {
        penalti.tempoDir--;
        if (penalti.tempoDir <= 0) avaliarDirecoes();
    }
    else if (penalti.fase === 'ANIMACAO') {
        let alvoGoleiroX = 500; let alvoGoleiroY = 150;
        if (penalti.escolhaDefesa) {
            if (penalti.escolhaDefesa.includes('L')) alvoGoleiroX = 300; if (penalti.escolhaDefesa.includes('R')) alvoGoleiroX = 700;
            if (penalti.escolhaDefesa.includes('T')) alvoGoleiroY = 100; if (penalti.escolhaDefesa.includes('B')) alvoGoleiroY = 220;
        }
        penalti.goleiroVisualX += (alvoGoleiroX - penalti.goleiroVisualX) * 0.1;
        penalti.goleiroVisualY += (alvoGoleiroY - penalti.goleiroVisualY) * 0.1;

        let alvoBolaX = 500; let alvoBolaY = 150;
        if (penalti.escolhaChute) {
            if (penalti.escolhaChute.includes('L')) alvoBolaX = 300; if (penalti.escolhaChute.includes('R')) alvoBolaX = 700;
            if (penalti.escolhaChute.includes('T')) alvoBolaY = 80; if (penalti.escolhaChute.includes('B')) alvoBolaY = 230;
        }
        if (penalti.forcaTravada > 98 || penalti.forcaTravada < 10) alvoBolaY = -50;

        penalti.bolaVisualX += (alvoBolaX - penalti.bolaVisualX) * 0.15;
        penalti.bolaVisualY += (alvoBolaY - penalti.bolaVisualY) * 0.15;
        if (penalti.bolaEscala > 0.4) penalti.bolaEscala -= 0.05;

        penalti.animTick--;
        if (penalti.animTick <= 0) finalizarRodadaPenalti();
    }
}

function desenharPenaltis() {
    for (let i = 0; i < 10; i++) { ctx.fillStyle = (i % 2 === 0) ? '#388e3c' : '#43a047'; ctx.fillRect(i * 100, 0, 100, canvas.height); }
    
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 15;
    ctx.beginPath(); ctx.moveTo(200, 250); ctx.lineTo(200, 50); ctx.lineTo(800, 50); ctx.lineTo(800, 250); ctx.stroke();
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    for(let i=220; i<800; i+=20) { ctx.beginPath(); ctx.moveTo(i, 50); ctx.lineTo(i, 250); ctx.stroke(); }
    for(let j=70; j<250; j+=20) { ctx.beginPath(); ctx.moveTo(200, j); ctx.lineTo(800, j); ctx.stroke(); }

    let dadosGoleiro = penalti.timeChutando === 1 ? timeSelecionado2 : timeSelecionado1;
    ctx.fillStyle = dadosGoleiro.corBase; ctx.strokeStyle = dadosGoleiro.corBorda; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(penalti.goleiroVisualX, penalti.goleiroVisualY, 35, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = (dadosGoleiro.corBase === '#ffffff') ? '#000' : '#fff'; ctx.font = 'bold 16px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(dadosGoleiro.sigla, penalti.goleiroVisualX, penalti.goleiroVisualY);

    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(penalti.bolaVisualX, penalti.bolaVisualY, 15 * penalti.bolaEscala, 0, Math.PI*2); ctx.fill(); ctx.stroke();

    if (penalti.fase !== 'ANIMACAO') {
        let dadosBatedor = penalti.timeChutando === 1 ? timeSelecionado1 : timeSelecionado2;
        ctx.fillStyle = dadosBatedor.corBase; ctx.strokeStyle = dadosBatedor.corBorda; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(500, 520, 50, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    }
}

// --- DESENHO DO JOGO NORMAL ---
function desenharTime(time, dados) {
    if (!dados) return;
    if (gameConfig.graficos !== 'baixo') {
        if (time.timerCongelado > 0) { ctx.shadowBlur = 25; ctx.shadowColor = '#63b3ed'; }
        else if (time.timerVel > 0) { ctx.shadowBlur = 20; ctx.shadowColor = '#ffea00'; }
        else if (time.timerTamanho > 0) { ctx.shadowBlur = 20; ctx.shadowColor = '#b000ff'; }
        else if (time.timerStaminaInf > 0) { ctx.shadowBlur = 20; ctx.shadowColor = '#39ff14'; }
        else {
            if (gameConfig.graficos === '3d') { ctx.shadowBlur = 12; ctx.shadowOffsetX = 6; ctx.shadowOffsetY = 6; ctx.shadowColor = 'rgba(0,0,0,0.6)'; } 
            else if (gameConfig.graficos === 'alto') { ctx.shadowBlur = 10; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; ctx.shadowColor = 'rgba(0,0,0,0.5)'; }
        }
    } else { ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; }
    
    for (let j of time.jogadores) {
        if (j.timerAtravessavel > 0) ctx.globalAlpha = 0.35; 
        ctx.fillStyle = dados.corBase; ctx.beginPath(); ctx.arc(j.x, j.y, time.raioJogador, 0, Math.PI * 2); ctx.fill(); 

        if (gameConfig.graficos === '3d') {
            ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
            let grad = ctx.createLinearGradient(j.x - time.raioJogador, j.y - time.raioJogador, j.x + time.raioJogador, j.y + time.raioJogador);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)'); grad.addColorStop(0.4, 'rgba(255, 255, 255, 0)'); grad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
            ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(j.x, j.y, time.raioJogador, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(j.x, j.y, time.raioJogador - 5, 0, Math.PI * 2); ctx.stroke();
        }

        ctx.strokeStyle = dados.corBorda; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(j.x, j.y, time.raioJogador, 0, Math.PI * 2); ctx.stroke(); ctx.shadowBlur = 0; 
        if (dados.img && dados.img.complete && dados.img.naturalWidth !== 0) { let tamanhoLogo = time.raioJogador * 1.1; ctx.drawImage(dados.img, j.x - tamanhoLogo/2, j.y - tamanhoLogo/2, tamanhoLogo, tamanhoLogo);
        } else { ctx.fillStyle = (dados.corBase === '#ffffff') ? '#000000' : '#ffffff'; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(dados.sigla, j.x, j.y); }
        if (time.timerCongelado > 0) { ctx.fillStyle = 'rgba(99, 179, 237, 0.4)'; ctx.strokeStyle = '#63b3ed'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(j.x, j.y, time.raioJogador + 2, 0, Math.PI*2); ctx.fill(); ctx.stroke(); }
        if (j.type.startsWith('human')) { ctx.fillStyle = '#ecc94b'; ctx.beginPath(); ctx.moveTo(j.x - 6, j.y - time.raioJogador - 12); ctx.lineTo(j.x + 6, j.y - time.raioJogador - 12); ctx.lineTo(j.x, j.y - time.raioJogador - 4); ctx.fill(); }
        ctx.globalAlpha = 1.0; 
    }
}

function desenharJogoNormal() {
    for (let i = 0; i < 10; i++) { ctx.fillStyle = (i % 2 === 0) ? '#388e3c' : '#43a047'; ctx.fillRect(i * 100, 0, 100, canvas.height); }
    if (gameConfig.graficos === '3d') {
        rastroBola.forEach(p => { ctx.fillStyle = `rgba(30, 95, 30, ${p.life * 0.4})`; ctx.beginPath(); ctx.arc(p.x, p.y, bola.raio * 1.2, 0, Math.PI * 2); ctx.fill(); });
        [time1, time2].forEach(time => { time.jogadores.forEach(j => { j.rastro.forEach(p => { ctx.fillStyle = `rgba(20, 50, 20, ${p.life * 0.25})`; ctx.beginPath(); ctx.arc(p.x, p.y, time.raioJogador * 0.8, 0, Math.PI * 2); ctx.fill(); }); }); });
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(500, 0); ctx.lineTo(500, canvas.height); ctx.stroke(); ctx.beginPath(); ctx.arc(500, 300, 80, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; ctx.beginPath(); ctx.arc(500, 300, 6, 0, Math.PI * 2); ctx.fill(); ctx.strokeRect(0, 120, 150, 360); ctx.strokeRect(850, 120, 150, 360);

    let topoEsq = 200, fundoEsq = 400; if (time1.timerGolEncolhido > 0) { topoEsq += 35; fundoEsq -= 35; } if (time2.timerGolExpandido > 0) { topoEsq -= 35; fundoEsq += 35; }
    let topoDir = 200, fundoDir = 400; if (time2.timerGolEncolhido > 0) { topoDir += 35; fundoDir -= 35; } if (time1.timerGolExpandido > 0) { topoDir -= 35; fundoDir += 35; }

    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    for(let y = topoEsq; y <= fundoEsq; y += 10) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(-15, y); ctx.stroke(); }
    for(let y = topoDir; y <= fundoDir; y += 10) { ctx.beginPath(); ctx.moveTo(1000, y); ctx.lineTo(1015, y); ctx.stroke(); }

    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
    ctx.save(); if (shakeEsq > 0) ctx.translate((Math.random() - 0.5) * shakeEsq, (Math.random() - 0.5) * shakeEsq); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, topoEsq); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, fundoEsq); ctx.lineTo(0, canvas.height); ctx.stroke(); ctx.restore();
    ctx.save(); if (shakeDir > 0) ctx.translate((Math.random() - 0.5) * shakeDir, (Math.random() - 0.5) * shakeDir); ctx.beginPath(); ctx.moveTo(1000, 0); ctx.lineTo(1000, topoDir); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1000, fundoDir); ctx.lineTo(1000, canvas.height); ctx.stroke(); ctx.restore();

    if (configPartida.poderesAtivos && poderCaixa.ativo) {
        if (gameConfig.graficos !== 'baixo') { ctx.shadowBlur = 15; ctx.shadowColor = poderCaixa.cor; } ctx.fillStyle = poderCaixa.cor; ctx.beginPath(); ctx.arc(poderCaixa.x, poderCaixa.y, poderCaixa.raio, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; ctx.fillStyle = "#111"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(listaEmojisPoderes[poderCaixa.tipo], poderCaixa.x, poderCaixa.y + 2);
    }
    desenharTime(time1, timeSelecionado1); desenharTime(time2, timeSelecionado2);

    if (gameConfig.graficos === '3d') { ctx.shadowBlur = 8; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4; ctx.shadowColor = 'rgba(0,0,0,0.5)'; let ballGrad = ctx.createRadialGradient(bola.x - 3, bola.y - 3, 2, bola.x, bola.y, bola.raio); ballGrad.addColorStop(0, '#ffffff'); ballGrad.addColorStop(0.7, '#dddddd'); ballGrad.addColorStop(1, '#888888'); ctx.fillStyle = ballGrad;
    } else if (gameConfig.graficos === 'alto') { ctx.shadowBlur = 8; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.fillStyle = bola.cor; } else { ctx.fillStyle = bola.cor; }
    ctx.beginPath(); ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; 
    if (gameConfig.graficos === '3d') { ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(bola.x - 5, bola.y, bola.raio - 1, -Math.PI/3, Math.PI/3); ctx.stroke(); ctx.beginPath(); ctx.arc(bola.x + 5, bola.y, bola.raio - 1, Math.PI - Math.PI/3, Math.PI + Math.PI/3); ctx.stroke();
    } else { ctx.strokeStyle = '#cccccc'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(bola.x, bola.y, bola.raio, 0, Math.PI * 2); ctx.stroke(); }
}

// --- LOOP PRINCIPAL ---
function atualizar() {
    if (estadoPartida === 'JOGANDO' && !jogoPausado) {
        framesGlobais++; atualizarFisicaNormal();
    } else if (estadoPartida === 'PENALTIS' && !jogoPausado) {
        atualizarPenalti();
    }
}

function desenhar() {
    if (!ctx || estadoPartida === 'MENU') return;
    if (estadoPartida === 'PENALTIS') desenharPenaltis();
    else desenharJogoNormal(); 
}

function loop() { atualizar(); desenhar(); requestAnimationFrame(loop); }
loop();