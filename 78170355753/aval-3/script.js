/* =========================================================
   NEON DRONE: Flappy Bird em Night City
   Código original, inspirado apenas na estética cyberpunk.
   ========================================================= */

// ---------- CONSTANTES AJUSTÁVEIS ----------
const CONFIG = {
  LARGURA: 400,              // resolução lógica do jogo (proporção 4:7)
  ALTURA: 700,
  GRAVIDADE: 1500,           // px/s²: quanto maior, mais rápido o drone cai
  IMPULSO: -460,             // px/s a cada toque (negativo = sobe)
  VELOCIDADE_INICIAL: 150,   // px/s com que os prédios vêm até o drone
  AUMENTO_VELOCIDADE: 14,    // px/s a mais por nível
  VELOCIDADE_MAXIMA: 300,
  VAO_INICIAL: 190,          // altura do vão entre os prédios (px)
  VAO_MINIMO: 130,           // limite que mantém o jogo possível
  REDUCAO_VAO: 6,            // px a menos de vão por nível
  INTERVALO_PREDIOS: 230,    // distância horizontal entre pares de prédios
  LARGURA_PREDIO: 64,
  ALTURA_RUA: 50,            // faixa inferior (a rua)
  DRONE_X: 110,              // posição horizontal fixa do drone
  DRONE_RAIO: 14,            // tamanho visual do drone
  MARGEM_COLISAO: 5,         // caixa de colisão menor que o desenho
  PONTOS_POR_NIVEL: 10,
  NIVEL_OSCILACAO: 3,        // a partir deste nível alguns pares oscilam
  AMPLITUDE_OSCILACAO: 55,
  FREQUENCIA_OSCILACAO: 1.6,
  ATRASO_REINICIO: 1,        // segundos antes de aceitar reinício
  DELTA_MAXIMO: 1 / 30,      // evita saltos ao voltar para a aba
  VOLUME: 0.3,
  CORES: {
    amarelo: '#FCEE0A',
    ciano: '#00F0FF',
    magenta: '#FF2A6D',
    fundo: '#0A0A14',
    predio: '#11111F',
    janela: ['#FCEE0A', '#00F0FF', '#FF2A6D'],
    chuva: 'rgba(150, 200, 255, 0.3)'
  }
};

// ---------- UTILITÁRIOS ----------
const aleatorio = (min, max) => min + Math.random() * (max - min);
const limitar = (v, min, max) => Math.max(min, Math.min(max, v));

// Canvas auxiliar em resolução 2x (nítido), desenhado em coordenadas lógicas
const criarCanvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w * 2;
  c.height = h * 2;
  c.getContext('2d').setTransform(2, 0, 0, 2, 0, 0);
  return c;
};

// Recorde salvo no localStorage, com try/catch para navegadores que bloqueiam o storage
const Armazenamento = {
  chave: 'neonDrone.recorde',
  ler() {
    try { return parseInt(localStorage.getItem(this.chave), 10) || 0; }
    catch (e) { return 0; }
  },
  gravar(valor) {
    try { localStorage.setItem(this.chave, String(valor)); }
    catch (e) { /* storage indisponível: o recorde vale só nesta sessão */ }
  }
};

// ---------- ÁUDIO (Web Audio API, sem arquivos) ----------
class Áudio {
  constructor() {
    this.ctx = null;
    this.ativo = true;
  }

  // Chamado no primeiro gesto do usuário (exigência dos navegadores)
  iniciar() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.ctx.resume();

    this.mestre = this.ctx.createGain();
    this.mestre.gain.value = this.ativo ? CONFIG.VOLUME : 0;
    this.mestre.connect(this.ctx.destination);

    // Filtro que suaviza a música
    this.filtroMusica = this.ctx.createBiquadFilter();
    this.filtroMusica.type = 'lowpass';
    this.filtroMusica.frequency.value = 1400;
    this.filtroMusica.connect(this.mestre);

    // Ruído branco reutilizado na colisão
    const n = Math.floor(this.ctx.sampleRate * 0.6);
    this.ruido = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const dados = this.ruido.getChannelData(0);
    for (let i = 0; i < n; i++) dados[i] = Math.random() * 2 - 1;

    this.iniciarMusica();
  }

  alternar() {
    this.ativo = !this.ativo;
    if (this.mestre) this.mestre.gain.value = this.ativo ? CONFIG.VOLUME : 0;
    return this.ativo;
  }

  // Bipe curto a cada impulso
  bipe() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator(), g = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.08);
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(g).connect(this.mestre);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Ruído que desce de tom na colisão
  colisao() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const fonte = this.ctx.createBufferSource();
    fonte.buffer = this.ruido;
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.setValueAtTime(2400, t);
    filtro.frequency.exponentialRampToValueAtTime(120, t + 0.5);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    fonte.connect(filtro).connect(g).connect(this.mestre);
    fonte.start(t);
    fonte.stop(t + 0.55);
  }

  nota(freq, t, dur, tipo, vol, destino) {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = tipo;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(destino);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  // Loop simples de synthwave (baixo + arpejo), agendado com antecedência
  iniciarMusica() {
    const passo = 60 / 110 / 2; // colcheia a 110 BPM
    const baixo = [55, 55, 65.41, 65.41, 73.42, 73.42, 65.41, 55];
    const arpejo = [220, 261.63, 329.63, 261.63, 196, 246.94, 293.66, 246.94];
    let proximo = this.ctx.currentTime + 0.05;
    let i = 0;
    setInterval(() => {
      while (proximo < this.ctx.currentTime + 0.2) {
        const k = i % 8;
        if (i % 2 === 0) this.nota(baixo[k], proximo, passo * 1.8, 'sawtooth', 0.09, this.filtroMusica);
        this.nota(arpejo[k], proximo, passo * 0.8, 'triangle', 0.05, this.filtroMusica);
        proximo += passo;
        i++;
      }
    }, 90);
  }
}

// ---------- DRONE ----------
class Drone {
  constructor() { this.reiniciar(); }

  reiniciar() {
    this.y = CONFIG.ALTURA * 0.42;
    this.v = 0;
    this.helice = 0;
    this.rastro = [];
  }

  impulsionar() { this.v = CONFIG.IMPULSO; }

  // Animação de espera no menu: o drone flutua
  flutuar(dt, tempo) {
    this.y = CONFIG.ALTURA * 0.42 + Math.sin(tempo * 2) * 14;
    this.helice += dt * 40;
  }

  atualizar(dt, velocidadeMundo) {
    this.v += CONFIG.GRAVIDADE * dt;
    this.y += this.v * dt;
    this.helice += dt * 40;
    // Rastro neon: nasce no drone e é arrastado para trás com o mundo
    this.rastro.push({ x: CONFIG.DRONE_X, y: this.y, vida: 0.35 });
    for (const p of this.rastro) {
      p.x -= velocidadeMundo * dt;
      p.vida -= dt;
    }
    this.rastro = this.rastro.filter(p => p.vida > 0);
  }

  // Caixa de colisão menor que o desenho, para a colisão parecer justa
  caixa() {
    const m = CONFIG.DRONE_RAIO - CONFIG.MARGEM_COLISAO;
    return { x: CONFIG.DRONE_X - m, y: this.y - m, w: m * 2, h: m * 2 };
  }

  desenharRastro(ctx) {
    if (this.rastro.length < 2) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = CONFIG.CORES.ciano;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.shadowColor = CONFIG.CORES.ciano;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(this.rastro[0].x, this.rastro[0].y);
    for (const p of this.rastro) ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();
  }

  // Desenhado com código: corpo, hélices girando e lente neon
  desenhar(ctx) {
    const r = CONFIG.DRONE_RAIO, C = CONFIG.CORES;
    ctx.save();
    ctx.translate(CONFIG.DRONE_X, this.y);
    ctx.rotate(limitar(this.v / 1200, -0.45, 0.35)); // inclina conforme a velocidade

    ctx.strokeStyle = C.ciano;
    ctx.lineWidth = 2;
    ctx.shadowColor = C.ciano;
    ctx.shadowBlur = 8;

    // Hélices: a largura varia com o cosseno, simulando a rotação
    for (const s of [-1, 1]) {
      ctx.save();
      ctx.translate(s * r * 0.9, -r * 0.6);
      ctx.scale(Math.max(0.15, Math.abs(Math.cos(this.helice + s))), 1);
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Corpo
    ctx.fillStyle = '#0D0D1A';
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 1.2, r * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Lente magenta
    ctx.shadowBlur = 0;
    const lente = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 0.55);
    lente.addColorStop(0, C.magenta);
    lente.addColorStop(1, 'rgba(255,42,109,0)');
    ctx.fillStyle = lente;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Luz de status amarela
    ctx.fillStyle = C.amarelo;
    ctx.shadowColor = C.amarelo;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(r * 0.75, r * 0.3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ---------- PRÉDIOS (pares com vão e letreiros) ----------
class Prédios {
  constructor() { this.reiniciar(); }

  reiniciar() {
    this.lista = [];
    this.tempo = 0;
  }

  vaoAtual(nivel) {
    return Math.max(CONFIG.VAO_MINIMO, CONFIG.VAO_INICIAL - (nivel - 1) * CONFIG.REDUCAO_VAO);
  }

  atualizar(dt, velocidade, nivel) {
    this.tempo += dt;
    for (const p of this.lista) p.x -= velocidade * dt;
    this.lista = this.lista.filter(p => p.x + CONFIG.LARGURA_PREDIO > -10);
    const ultimo = this.lista[this.lista.length - 1];
    if (!ultimo || ultimo.x < CONFIG.LARGURA + 20 - CONFIG.INTERVALO_PREDIOS) {
      this.lista.push(this.criarPar(nivel));
    }
  }

  criarPar(nivel) {
    const C = CONFIG.CORES, chao = CONFIG.ALTURA - CONFIG.ALTURA_RUA;
    const vao = this.vaoAtual(nivel);
    const oscila = nivel >= CONFIG.NIVEL_OSCILACAO && Math.random() < 0.5;
    const amp = oscila ? CONFIG.AMPLITUDE_OSCILACAO : 0;
    // O centro do vão fica sempre dentro da tela, mesmo oscilando
    const minC = 60 + vao / 2 + amp, maxC = chao - 60 - vao / 2 - amp;
    const textos = ['BAR', 'HOTEL', '24H', 'ÓPTICA', 'NEON', 'SAKÊ', 'DRONE', 'CAFÉ', 'LOJA'];
    return {
      x: CONFIG.LARGURA + 20,
      vao,
      oscila,
      amp,
      base: aleatorio(minC, maxC),
      fase: Math.random() * Math.PI * 2,
      borda: Math.random() < 0.5 ? C.ciano : C.magenta,
      passou: false,
      janelas: this.gerarJanelas(),
      placas: ['cima', 'baixo'].map(lado => ({
        lado,
        frac: Math.random(),
        texto: textos[(Math.random() * textos.length) | 0],
        cor: C.janela[(Math.random() * C.janela.length) | 0]
      }))
    };
  }

  // Janelas acesas, em grade fixa, para que cada peça mostre o trecho certo
  gerarJanelas() {
    const lista = [], C = CONFIG.CORES.janela;
    for (let y = 10; y < CONFIG.ALTURA - CONFIG.ALTURA_RUA - 10; y += 16) {
      for (let dx = 8; dx < CONFIG.LARGURA_PREDIO - 12; dx += 13) {
        if (Math.random() < 0.3) lista.push({ dx, y, cor: C[(Math.random() * C.length) | 0] });
      }
    }
    return lista;
  }

  // Duas peças por par: uma em cima e outra embaixo, separadas pelo vão
  blocosDe(p) {
    const chao = CONFIG.ALTURA - CONFIG.ALTURA_RUA;
    const c = p.oscila ? p.base + Math.sin(this.tempo * CONFIG.FREQUENCIA_OSCILACAO + p.fase) * p.amp : p.base;
    const topo = c - p.vao / 2, fundo = c + p.vao / 2;
    return [
      { lado: 'cima', x: p.x, y: 0, w: CONFIG.LARGURA_PREDIO, h: topo },
      { lado: 'baixo', x: p.x, y: fundo, w: CONFIG.LARGURA_PREDIO, h: chao - fundo }
    ];
  }

  colide(c) {
    for (const p of this.lista) {
      if (c.x + c.w < p.x || c.x > p.x + CONFIG.LARGURA_PREDIO) continue;
      for (const b of this.blocosDe(p)) {
        if (c.x < b.x + b.w && c.x + c.w > b.x && c.y < b.y + b.h && c.y + c.h > b.y) return true;
      }
    }
    return false;
  }

  desenhar(ctx) {
    for (const p of this.lista) {
      for (const b of this.blocosDe(p)) {
        if (b.h > 0) this.desenharBloco(ctx, p, b);
      }
    }
  }

  desenharBloco(ctx, p, b) {
    ctx.fillStyle = CONFIG.CORES.predio;
    ctx.fillRect(b.x, b.y, b.w, b.h);

    // Janelas acesas que cabem nesta peça
    for (const j of p.janelas) {
      if (j.y < b.y || j.y + 5 > b.y + b.h) continue;
      ctx.fillStyle = j.cor;
      ctx.fillRect(b.x + j.dx, j.y, 4, 5);
    }

    // Borda neon no lado voltado para o vão
    ctx.save();
    ctx.shadowColor = p.borda;
    ctx.shadowBlur = 10;
    ctx.fillStyle = p.borda;
    ctx.fillRect(b.x, b.lado === 'cima' ? b.y + b.h - 2 : b.y, b.w, 2);
    ctx.restore();

    // Letreiro de neon (só aparece se a peça tiver espaço)
    for (const s of p.placas) {
      if (s.lado !== b.lado || b.h < 90) continue;
      const sx = b.x + 6, sy = b.y + 14 + s.frac * (b.h - 60), sw = b.w - 12, sh = 22;
      ctx.save();
      ctx.shadowColor = s.cor;
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(10,10,20,0.92)';
      ctx.fillRect(sx, sy, sw, sh);
      ctx.strokeStyle = s.cor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(sx, sy, sw, sh);
      ctx.fillStyle = s.cor;
      ctx.font = "11px 'Share Tech Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.texto, sx + sw / 2, sy + sh / 2 + 1);
      ctx.restore();
    }
  }
}

// ---------- PARTÍCULAS ----------
class Partículas {
  constructor() { this.lista = []; }

  emitir(x, y, qtd, cores, vel) {
    for (let i = 0; i < qtd; i++) {
      const a = Math.random() * Math.PI * 2, v = aleatorio(vel * 0.3, vel);
      this.lista.push({
        x, y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        vida: 0,
        max: aleatorio(0.4, 1),
        tam: aleatorio(1.5, 3.5),
        cor: cores[i % cores.length]
      });
    }
  }

  atualizar(dt) {
    const atrito = Math.pow(0.98, dt * 60);
    for (const p of this.lista) {
      p.vida += dt;
      p.vx *= atrito;
      p.vy = p.vy * atrito + 300 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    this.lista = this.lista.filter(p => p.vida < p.max);
  }

  desenhar(ctx) {
    for (const p of this.lista) {
      ctx.globalAlpha = 1 - p.vida / p.max;
      ctx.fillStyle = p.cor;
      ctx.fillRect(p.x, p.y, p.tam, p.tam);
    }
    ctx.globalAlpha = 1;
  }
}

// ---------- FUNDO (paralaxe pré-renderizada + chuva) ----------
class Fundo {
  constructor() {
    const W = CONFIG.LARGURA, H = CONFIG.ALTURA, C = CONFIG.CORES;
    this.estatico = criarCanvas(W, H);
    this.distante = criarCanvas(W, H);
    this.medio = criarCanvas(W, H);
    this.rua = criarCanvas(W, CONFIG.ALTURA_RUA);
    this.offDistante = 0;
    this.offMedio = 0;

    // Céu com gradiente, brilho magenta no horizonte e estrelas
    const g = this.estatico.getContext('2d');
    const grad = g.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#05050C');
    grad.addColorStop(0.6, C.fundo);
    grad.addColorStop(1, '#2A0A1F');
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 60; i++) {
      g.fillStyle = `rgba(200,220,255,${aleatorio(0.2, 0.7)})`;
      g.fillRect(Math.random() * W, Math.random() * H * 0.55, 1, 1);
    }

    // Skylines em duas camadas de paralaxe
    this.gerarCamada(this.distante, { cor: '#15152B', largMin: 28, largMax: 60, altMin: 140, altMax: 330, gap: 12, janela: 0.12, neon: 0.2, alfa: 0.7 });
    this.gerarCamada(this.medio, { cor: '#1C1C38', largMin: 50, largMax: 90, altMin: 200, altMax: 420, gap: 14, janela: 0.3, neon: 0.6, alfa: 1 });

    // Rua: faixa escura com linha neon e reflexos
    const r = this.rua.getContext('2d');
    r.fillStyle = '#07070D';
    r.fillRect(0, 0, W, CONFIG.ALTURA_RUA);
    r.save();
    r.fillStyle = C.ciano;
    r.shadowColor = C.ciano;
    r.shadowBlur = 10;
    r.fillRect(0, 0, W, 2);
    r.restore();
    r.fillStyle = 'rgba(255,42,109,0.15)';
    r.fillRect(0, 8, W, 3);
    r.fillRect(0, 22, W, 2);

    // Gotas de chuva
    this.chuva = Array.from({ length: 90 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      v: aleatorio(500, 800),
      c: aleatorio(10, 18)
    }));
  }

  // Desenha uma camada de prédios. Cada prédio também é copiado em -W e +W,
  // assim a rolagem em loop não tem emenda visível.
  gerarCamada(canvas, o) {
    const g = canvas.getContext('2d'), W = CONFIG.LARGURA, C = CONFIG.CORES;
    const base = CONFIG.ALTURA - CONFIG.ALTURA_RUA;
    g.globalAlpha = o.alfa;
    let x = -20;
    while (x < W + 20) {
      const w = aleatorio(o.largMin, o.largMax), h = aleatorio(o.altMin, o.altMax);
      const janelas = [];
      for (let y = base - h + 10; y < base - 8; y += 12) {
        for (let jx = 6; jx < w - 10; jx += 9) {
          if (Math.random() < o.janela) janelas.push([jx, y, C.janela[(Math.random() * 3) | 0]]);
        }
      }
      const borda = Math.random() < o.neon ? C.janela[(Math.random() * 3) | 0] : null;
      for (const off of [-W, 0, W]) {
        const bx = x + off;
        g.fillStyle = o.cor;
        g.fillRect(bx, base - h, w, h);
        for (const [jx, y, cor] of janelas) {
          g.fillStyle = cor;
          g.fillRect(bx + jx, y, 4, 5);
        }
        if (borda) {
          g.fillStyle = borda;
          g.fillRect(bx + w - 1, base - h, 1, h);
        }
      }
      x += w + aleatorio(0, o.gap);
    }
    g.globalAlpha = 1;
  }

  atualizar(dt, velocidade) {
    this.offDistante = (this.offDistante + velocidade * 0.15 * dt) % CONFIG.LARGURA;
    this.offMedio = (this.offMedio + velocidade * 0.4 * dt) % CONFIG.LARGURA;
    for (const d of this.chuva) {
      d.y += d.v * dt;
      d.x -= 60 * dt;
      if (d.y > CONFIG.ALTURA) { d.y = -20; d.x = Math.random() * CONFIG.LARGURA; }
      if (d.x < -5) d.x += CONFIG.LARGURA + 10;
    }
  }

  desenharFundo(ctx) {
    const W = CONFIG.LARGURA, H = CONFIG.ALTURA;
    ctx.drawImage(this.estatico, 0, 0, W, H);
    this.camada(ctx, this.distante, this.offDistante);
    this.camada(ctx, this.medio, this.offMedio);
    ctx.drawImage(this.rua, 0, H - CONFIG.ALTURA_RUA, W, CONFIG.ALTURA_RUA);
  }

  camada(ctx, img, off) {
    const W = CONFIG.LARGURA, H = CONFIG.ALTURA;
    ctx.drawImage(img, -off, 0, W, H);
    ctx.drawImage(img, W - off, 0, W, H);
  }

  // Chuva fica na frente de tudo
  desenharChuva(ctx) {
    ctx.strokeStyle = CONFIG.CORES.chuva;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const d of this.chuva) {
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 2, d.y + d.c);
    }
    ctx.stroke();
  }
}

// ---------- ENTRADA (mouse, toque e teclado) ----------
class Entrada {
  constructor(jogo) {
    this.jogo = jogo;

    // Clique ou toque em qualquer lugar (os botões têm ação própria)
    window.addEventListener('pointerdown', e => {
      if (e.target.closest && e.target.closest('.botao')) return;
      e.preventDefault();
      jogo.acao();
    }, { passive: false });

    window.addEventListener('keydown', e => this.tecla(e));

    // Impede rolagem, arrastar e zoom por gesto
    window.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    document.addEventListener('gesturestart', e => e.preventDefault());

    // Pausa automática ao trocar de aba
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && jogo.estado === 'jogando') jogo.alternarPausa();
    });
  }

  tecla(e) {
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'arrowup') {
      e.preventDefault();
      if (!e.repeat) this.jogo.acao();
    } else if ((k === 'p' || k === 'escape') && !e.repeat) {
      this.jogo.alternarPausa();
    } else if (k === 'm' && !e.repeat) {
      this.jogo.alternarSom();
    }
  }
}

// ---------- JOGO (estados, pontuação, colisões e loop) ----------
class Jogo {
  constructor() {
    this.canvas = document.getElementById('tela');
    this.canvas.width = CONFIG.LARGURA * 2;
    this.canvas.height = CONFIG.ALTURA * 2;
    this.ctx = this.canvas.getContext('2d');
    this.snap = criarCanvas(CONFIG.LARGURA, CONFIG.ALTURA); // foto do último frame, usada no glitch

    this.fundo = new Fundo();
    this.drone = new Drone();
    this.predios = new Predios();
    this.particulas = new Partículas();
    this.audio = new Áudio();
    this.recorde = Armazenamento.ler();
    this.tremorAtivo = true;
    this.glitchAtivo = true;

    this.estado = 'menu'; // 'menu' | 'jogando' | 'pausado' | 'fim'
    this.pontos = 0;
    this.nivel = 1;
    this.tempo = 0;
    this.tempoFim = 0;
    this.tremor = 0;
    this.glitch = 0;

    this.el = {
      menu: document.getElementById('menu'),
      pausa: document.getElementById('pausa'),
      fim: document.getElementById('fim'),
      hud: document.getElementById('hud'),
      pontos: document.getElementById('pontos'),
      hudRecorde: document.getElementById('hud-recorde'),
      hudNivel: document.getElementById('hud-nivel'),
      recordeMenu: document.getElementById('recorde-menu'),
      fimPontos: document.getElementById('fim-pontos'),
      fimRecorde: document.getElementById('fim-recorde'),
      fimNovo: document.getElementById('fim-novo'),
      fimDica: document.getElementById('fim-dica'),
      aviso: document.getElementById('aviso'),
      btnTremor: document.getElementById('btn-tremor'),
      btnGlitch: document.getElementById('btn-glitch'),
      btnSom: document.getElementById('btn-som')
    };
    this.el.btnTremor.onclick = () => {
      this.tremorAtivo = !this.tremorAtivo;
      this.tremor = 0;
      this.atualizarBotoes();
    };
    this.el.btnGlitch.onclick = () => {
      this.glitchAtivo = !this.glitchAtivo;
      this.glitch = 0;
      this.atualizarBotoes();
    };
    this.el.btnSom.onclick = () => this.alternarSom();

    this.entrada = new Entrada(this);
    this.atualizarBotoes();
    this.atualizarHUD();
    this.mostrarPainel('menu');

    this.ultimo = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }

  // ----- Interface -----
  mostrarPainel(nome) {
    this.el.menu.classList.toggle('oculto', nome !== 'menu');
    this.el.pausa.classList.toggle('oculto', nome !== 'pausa');
    this.el.fim.classList.toggle('oculto', nome !== 'fim');
    const jogando = nome === 'jogo' || nome === 'pausa';
    this.el.hud.classList.toggle('oculto', !jogando);
    this.el.pontos.classList.toggle('oculto', !jogando);
  }

  atualizarHUD() {
    this.el.pontos.textContent = this.pontos;
    this.el.hudRecorde.textContent = this.recorde;
    this.el.hudNivel.textContent = this.nivel;
    this.el.recordeMenu.textContent = this.recorde;
  }

  atualizarBotoes() {
    this.el.btnTremor.textContent = `Tremor: ${this.tremorAtivo ? 'ON' : 'OFF'}`;
    this.el.btnGlitch.textContent = `Glitch: ${this.glitchAtivo ? 'ON' : 'OFF'}`;
    this.el.btnSom.textContent = `Som: ${this.audio.ativo ? 'ON' : 'OFF'}`;
  }

  mostrarAviso(texto) {
    const a = this.el.aviso;
    a.textContent = texto;
    a.classList.remove('ativo');
    void a.offsetWidth; // reinicia a animação
    a.classList.add('ativo');
  }

  // ----- Ações do jogador -----
  // Clique, toque ou espaço: começa, voa ou reinicia, conforme o estado
  acao() {
    this.audio.iniciar();
    if (this.estado === 'menu') {
      this.iniciarPartida();
      this.voar();
    } else if (this.estado === 'jogando') {
      this.voar();
    } else if (this.estado === 'fim' && this.tempoFim >= CONFIG.ATRASO_REINICIO) {
      this.iniciarPartida();
      this.voar();
    }
  }

  voar() {
    this.drone.impulsionar();
    this.audio.bipe();
    this.particulas.emitir(CONFIG.DRONE_X - 10, this.drone.y + 6, 3, [CONFIG.CORES.ciano], 90);
  }

  alternarPausa() {
    if (this.estado === 'jogando') {
      this.estado = 'pausado';
      this.mostrarPainel('pausa');
    } else if (this.estado === 'pausado') {
      this.estado = 'jogando';
      this.mostrarPainel('jogo');
    }
  }

  alternarSom() {
    this.audio.alternar();
    this.atualizarBotoes();
  }

  // ----- Ciclo da partida -----
  iniciarPartida() {
    this.drone.reiniciar();
    this.predios.reiniciar();
    this.particulas.lista = [];
    this.pontos = 0;
    this.nivel = 1;
    this.tempo = 0;
    this.tempoFim = 0;
    this.tremor = 0;
    this.glitch = 0;
    this.estado = 'jogando';
    this.mostrarPainel('jogo');
    this.atualizarHUD();
  }

  somarPonto() {
    this.pontos++;
    const novo = Math.floor(this.pontos / CONFIG.PONTOS_POR_NIVEL) + 1;
    if (novo !== this.nivel) {
      this.nivel = novo;
      this.mostrarAviso(`NÍVEL ${novo}`);
    }
    this.atualizarHUD();
  }

  velocidadeAtual() {
    return Math.min(
      CONFIG.VELOCIDADE_INICIAL + (this.nivel - 1) * CONFIG.AUMENTO_VELOCIDADE,
      CONFIG.VELOCIDADE_MAXIMA
    );
  }

  morrer() {
    this.estado = 'fim';
    this.tempoFim = 0;
    this.audio.colisao();
    this.particulas.emitir(CONFIG.DRONE_X, this.drone.y, 45,
      [CONFIG.CORES.ciano, CONFIG.CORES.magenta, CONFIG.CORES.amarelo], 280);

    if (this.tremorAtivo) this.tremor = 1;
    if (this.glitchAtivo) {
      this.glitch = 0.45;
      this.snap.getContext('2d').drawImage(this.canvas, 0, 0, CONFIG.LARGURA, CONFIG.ALTURA);
    }

    const novoRecorde = this.pontos > this.recorde;
    if (novoRecorde) {
      this.recorde = this.pontos;
      Armazenamento.gravar(this.recorde);
    }
    this.el.fimPontos.textContent = this.pontos;
    this.el.fimRecorde.textContent = this.recorde;
    this.el.fimNovo.classList.toggle('oculto', !novoRecorde);
    this.el.fimDica.classList.add('oculto');
    this.atualizarHUD();
    this.mostrarPainel('fim');
  }

  // Colisões: teto, rua ou prédios
  atualizar(dt) {
    if (this.estado === 'pausado') return;

    this.particulas.atualizar(dt);
    if (this.tremor > 0) this.tremor = Math.max(0, this.tremor - dt * 2.5);
    if (this.glitch > 0) this.glitch = Math.max(0, this.glitch - dt);

    if (this.estado === 'menu') {
      this.tempo += dt;
      this.drone.flutuar(dt, this.tempo);
      this.fundo.atualizar(dt, 60);
      return;
    }

    if (this.estado === 'fim') {
      this.tempoFim += dt;
      this.fundo.atualizar(dt, 0);
      if (this.tempoFim >= CONFIG.ATRASO_REINICIO) this.el.fimDica.classList.remove('oculto');
      return;
    }

    // Estado "jogando"
    const velocidade = this.velocidadeAtual();
    this.drone.atualizar(dt, velocidade);
    this.predios.atualizar(dt, velocidade, this.nivel);
    this.fundo.atualizar(dt, velocidade);

    // Um par vale 1 ponto quando é totalmente ultrapassado
    for (const p of this.predios.lista) {
      if (!p.passou && p.x + CONFIG.LARGURA_PREDIO < CONFIG.DRONE_X) {
        p.passou = true;
        this.somarPonto();
      }
    }

    const c = this.drone.caixa();
    const chao = CONFIG.ALTURA - CONFIG.ALTURA_RUA;
    if (c.y < 0 || c.y + c.h > chao || this.predios.colide(c)) this.morrer();
  }

  // ----- Desenho -----
  desenhar() {
    const ctx = this.ctx;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.save();
    if (this.tremorAtivo && this.tremor > 0) {
      const f = this.tremor * 7;
      ctx.translate(aleatorio(-f, f), aleatorio(-f, f));
    }
    this.fundo.desenharFundo(ctx);
    this.predios.desenhar(ctx);
    this.drone.desenharRastro(ctx);
    this.drone.desenhar(ctx);
    this.particulas.desenhar(ctx);
    this.fundo.desenharChuva(ctx);
    ctx.restore();

    if (this.glitchAtivo && this.glitch > 0) this.desenharGlitch(ctx);
  }

  // Aberração cromática, cópia deslocada e fatias tremidas no momento da derrota
  desenharGlitch(ctx) {
    const W = CONFIG.LARGURA, H = CONFIG.ALTURA, k = this.glitch / 0.45;
    ctx.save();
    ctx.globalAlpha = 0.5 * k;
    ctx.drawImage(this.snap, -4 * k, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `rgba(255,42,109,${0.12 * k})`;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `rgba(0,240,255,${0.08 * k})`;
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    for (let i = 0; i < 6; i++) {
      const h = aleatorio(3, 22);
      const y = Math.random() * (H - h);
      const dx = aleatorio(-22, 22) * k;
      ctx.drawImage(this.snap, 0, y * 2, W * 2, h * 2, dx, y, W, h);
    }
    ctx.restore();
  }

  loop(t) {
    const dt = Math.min((t - this.ultimo) / 1000, CONFIG.DELTA_MAXIMO);
    this.ultimo = t;
    this.atualizar(dt);
    this.desenhar();
    requestAnimationFrame(t2 => this.loop(t2));
  }
}

// Inicia o jogo
new Jogo();