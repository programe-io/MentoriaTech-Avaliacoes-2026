<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>♞ Xadrez — vs IA ou Amigo</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    font-family:'Segoe UI', system-ui, sans-serif;
    background: linear-gradient(135deg,#141e30,#243b55);
    color:#eee; min-height:100vh;
    display:flex; flex-direction:column; align-items:center; padding:20px;
  }
  h1 { margin-bottom:4px; font-size:1.6rem; letter-spacing:2px; }
  .sub { color:#9fb3c8; margin-bottom:18px; font-size:.9rem; }
  .controls { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:16px; }
  button, select {
    background:#1f4068; color:#fff; border:1px solid #3a6ea5; border-radius:8px;
    padding:9px 16px; font-size:.95rem; cursor:pointer; transition:.2s;
  }
  button:hover { background:#2a5a8f; transform:translateY(-1px); }
  select { background:#0f2a44; }
  .captured { display:flex; justify-content:space-between; width:min(92vw,560px); font-size:1.4rem; padding:4px 6px; min-height:30px; }
  .captured svg { width:22px; height:22px; vertical-align:middle; }

  /* ===== TABULEIRO (tudo embutido) ===== */
  #board {
    width:min(92vw,560px); aspect-ratio:1;
    display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(8,1fr);
    border-radius:8px; overflow:hidden;
    box-shadow:0 15px 45px rgba(0,0,0,.55);
    user-select:none; touch-action:none;
  }
  .sq { position:relative; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  .sq.light { background:#f0d9b5; }
  .sq.dark  { background:#b58863; }
  .sq.last  { background:#cdd26a !important; }
  .sq.sel   { background:#f6f669 !important; }
  .sq.check { background:#e04a4a !important; }
  .sq .dot { position:absolute; width:28%; height:28%; border-radius:50%; background:rgba(20,40,20,.35); pointer-events:none; }
  .sq .ring { position:absolute; inset:4%; border:4px solid rgba(20,40,20,.35); border-radius:50%; pointer-events:none; }
  .sq svg { width:88%; height:88%; pointer-events:none; filter:drop-shadow(0 2px 2px rgba(0,0,0,.3)); }
  .coord { position:absolute; font-size:.6rem; font-weight:700; pointer-events:none; }
  .coord.rank { top:2px; left:3px; }
  .coord.file { bottom:2px; right:3px; }
  .sq.light .coord { color:#b58863; }
  .sq.dark  .coord { color:#f0d9b5; }

  .status-bar {
    margin-top:14px; padding:12px 20px; border-radius:10px;
    background:rgba(0,0,0,.35); font-size:1.05rem; text-align:center; min-height:44px;
    border:1px solid rgba(255,255,255,.08); width:min(92vw,560px);
  }
  .thinking { color:#f0c674; animation:pulse 1s infinite alternate; }
  @keyframes pulse { from{opacity:.5} to{opacity:1} }
  #promo-modal {
    display:none; position:fixed; inset:0; background:rgba(0,0,0,.7);
    align-items:center; justify-content:center; z-index:100;
  }
  #promo-box { background:#1f4068; padding:20px 30px; border-radius:12px; text-align:center; }
  #promo-box p { margin-bottom:12px; }
  #promo-box button { font-size:0; margin:0 6px; padding:8px 14px; }
  #promo-box button svg { width:44px; height:44px; }
  #drag-piece { position:fixed; z-index:200; pointer-events:none; width:70px; height:70px; display:none; }
  #drag-piece svg { width:100%; height:100%; filter:drop-shadow(0 6px 8px rgba(0,0,0,.5)); }
</style>
<base target="_blank">
</head>
<body>
  <h1>♞ XADREZ</h1>
  <div class="sub">Jogue contra a IA ou contra um amigo aqui do lado</div>

  <div class="controls">
    <select id="mode">
      <option value="ai">🤖 vs IA</option>
      <option value="2p">👥 2 Jogadores (mesmo aparelho)</option>
    </select>
    <select id="level" title="Nível da IA">
      <option value="1">Fácil</option>
      <option value="6" selected>Médio</option>
      <option value="12">Difícil</option>
      <option value="18">Mestre</option>
    </select>
    <button id="newgame">🔄 Novo Jogo</button>
    <button id="flip">🔃 Virar Tabuleiro</button>
    <button id="undo">↩️ Desfazer</button>
  </div>

  <div class="captured"><span id="cap-white"></span><span id="cap-black"></span></div>
  <div id="board"></div>
  <div class="status-bar" id="status">Brancas começam.</div>

  <div id="promo-modal">
    <div id="promo-box">
      <p>Promover peão para:</p>
      <div id="promo-btns"></div>
    </div>
  </div>
  <div id="drag-piece"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
<script>
/* ======== PEÇAS EMBUTIDAS (SVG inline) ======== */
const PIECES = {"wP": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z\"/></g></svg>", "bP": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z\"/></g></svg>", "wN": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18\"/><path d=\"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10\"/><path d=\"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z\" fill=\"#333\"/></g></svg>", "bN": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18\"/><path d=\"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10\"/><path d=\"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z\" fill=\"#eee\"/></g></svg>", "wB": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z\"/><path d=\"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z\"/><path d=\"M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z\"/><path d=\"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18\" stroke=\"#333\" fill=\"none\"/></g></svg>", "bB": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z\"/><path d=\"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z\"/><path d=\"M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z\"/><path d=\"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18\" stroke=\"#eee\" fill=\"none\"/></g></svg>", "wR": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z\"/><path d=\"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z\"/><path d=\"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14\"/><path d=\"M 34,14 L 31,17 L 14,17 L 11,14\"/><path d=\"M 31,17 L 31,29.5 L 14,29.5 L 14,17\"/><path d=\"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5\"/><path d=\"M 11,14 L 34,14\" stroke=\"#333\" fill=\"none\"/></g></svg>", "bR": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z\"/><path d=\"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z\"/><path d=\"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14\"/><path d=\"M 34,14 L 31,17 L 14,17 L 11,14\"/><path d=\"M 31,17 L 31,29.5 L 14,29.5 L 14,17\"/><path d=\"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5\"/></g></svg>", "wQ": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z\"/><path d=\"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z\"/><circle cx=\"6\" cy=\"12\" r=\"2\" fill=\"#333\"/><circle cx=\"14\" cy=\"9\" r=\"2\" fill=\"#333\"/><circle cx=\"22.5\" cy=\"8\" r=\"2\" fill=\"#333\"/><circle cx=\"31\" cy=\"9\" r=\"2\" fill=\"#333\"/><circle cx=\"39\" cy=\"12\" r=\"2\" fill=\"#333\"/></g></svg>", "bQ": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z\"/><path d=\"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z\"/><circle cx=\"6\" cy=\"12\" r=\"2\" fill=\"#eee\"/><circle cx=\"14\" cy=\"9\" r=\"2\" fill=\"#eee\"/><circle cx=\"22.5\" cy=\"8\" r=\"2\" fill=\"#eee\"/><circle cx=\"31\" cy=\"9\" r=\"2\" fill=\"#eee\"/><circle cx=\"39\" cy=\"12\" r=\"2\" fill=\"#eee\"/></g></svg>", "wK": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#ffffff\" stroke=\"#333333\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 22.5,11.63 L 22.5,6\"/><path d=\"M 20,8 L 25,8\"/><path d=\"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25\"/><path d=\"M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,29.5 12.5,29.5 L 12.5,37 z\"/><path d=\"M 22.5,11.63 L 22.5,6 M 20,8 L 25,8\" stroke=\"#333\" fill=\"none\"/></g></svg>", "bK": "<svg viewBox=\"0 0 45 45\" xmlns=\"http://www.w3.org/2000/svg\">\n<g fill=\"#2b2b2b\" stroke=\"#111111\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M 22.5,11.63 L 22.5,6\"/><path d=\"M 20,8 L 25,8\"/><path d=\"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25\"/><path d=\"M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,29.5 12.5,29.5 L 12.5,37 z\"/><path d=\"M 22.5,11.63 L 22.5,6 M 20,8 L 25,8\" stroke=\"#eee\" fill=\"none\"/></g></svg>"};

const game = new Chess();
let selected = null, legalCache = [], flipped = false, aiThinking = false;
let dragFrom = null;

const FILES = 'abcdefgh';
const boardEl = document.getElementById('board');
const dragEl = document.getElementById('drag-piece');

function sqToRC(sq){ // converte 'e4' -> [row,col] na tela (respeitando flip)
  const f = FILES.indexOf(sq[0]), r = 8 - parseInt(sq[1]);
  return flipped ? [7-r, 7-f] : [r, f];
}
function rcToSq(row,col){
  if (flipped){ row = 7-row; col = 7-col; }
  return FILES[col] + (8 - row);
}

function render(){
  boardEl.innerHTML = '';
  const checkSq = game.in_check() ? game.kings(game.turn()) : null;
  for (let r=0;r<8;r++) for (let c=0;c<8;c++){
    const sq = rcToSq(r,c);
    const div = document.createElement('div');
    div.className = 'sq ' + (((r+c)%2===0) ? 'light' : 'dark');
    div.dataset.sq = sq;
    if (game.history({verbose:true}).length){
      const last = game.history({verbose:true}).slice(-1)[0];
      if (sq===last.from || sq===last.to) div.classList.add('last');
    }
    if (selected === sq) div.classList.add('sel');
    if (checkSq === sq) div.classList.add('check');
    // coordenadas
    if (c === (flipped?7:0)) { const s=document.createElement('span'); s.className='coord rank'; s.textContent=8-r; div.appendChild(s); }
    if (r === (flipped?0:7)) { const s=document.createElement('span'); s.className='coord file'; s.textContent=FILES[flipped?7-c:c]; div.appendChild(s); }
    // indicadores de lance legal
    if (selected && legalCache.some(m => m.to === sq)){
      const ind = document.createElement('div');
      if (game.get(sq)) ind.className='ring'; else ind.className='dot';
      div.appendChild(ind);
    }
    const p = game.get(sq);
    if (p && dragFrom !== sq) div.innerHTML += PIECES[p.color.toUpperCase()+p.type.toUpperCase()];
    boardEl.appendChild(div);
  }
}

function clearSelection(){ selected=null; legalCache=[]; }

function clickSquare(sq){
  if (game.game_over() || aiThinking) return;
  if (document.getElementById('mode').value==='ai' && game.turn()!==playerColor()) return;
  if (selected && legalCache.some(m => m.to === sq)){
    const isPromo = legalCache.find(m => m.to===sq).promotion !== undefined;
    if (isPromo){ askPromotion().then(p => { makeMove(selected, sq, p); }); }
    else makeMove(selected, sq, 'q');
    clearSelection(); render(); return;
  }
  const p = game.get(sq);
  if (p && p.color === game.turn()){
    selected = sq;
    legalCache = game.moves({square:sq, verbose:true});
  } else clearSelection();
  render();
}

function playerColor(){ return flipped ? 'b' : 'w'; }

async function makeMove(from, to, promotion){
  const mv = game.move({from, to, promotion});
  if (!mv) return null;
  render(); updateCaptured();
  if (!game.game_over() && document.getElementById('mode').value==='ai' && game.turn()!==playerColor()){
    aiThinking = true; updateStatus();
    setTimeout(() => { aiMove(); aiThinking=false; updateStatus(); }, 60);
  }
  updateStatus();
  return mv;
}

/* ======== ARRASTAR (mouse e toque) ======== */
boardEl.addEventListener('pointerdown', e => {
  const sq = e.target.closest('.sq');
  if (!sq) return;
  const p = game.get(sq.dataset.sq);
  if (!selected && p && p.color===game.turn() && !aiThinking &&
      !(document.getElementById('mode').value==='ai' && game.turn()!==playerColor())){
    dragFrom = sq.dataset.sq;
    selected = dragFrom;
    legalCache = game.moves({square:dragFrom, verbose:true});
    dragEl.innerHTML = PIECES[p.color.toUpperCase()+p.type.toUpperCase()];
    dragEl.style.display='block';
    moveDrag(e);
    render();
  } else { clickSquare(sq.dataset.sq); }
});
function moveDrag(e){ dragEl.style.left=(e.clientX-35)+'px'; dragEl.style.top=(e.clientY-35)+'px'; }
window.addEventListener('pointermove', e => { if (dragFrom) moveDrag(e); });
window.addEventListener('pointerup', e => {
  if (!dragFrom) return;
  dragEl.style.display='none';
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const sq = el && el.closest ? el.closest('.sq') : null;
  const from = dragFrom; dragFrom = null;
  if (sq && sq.dataset.sq !== from && legalCache.some(m => m.to===sq.dataset.sq)){
    const to = sq.dataset.sq;
    const isPromo = legalCache.find(m => m.to===to).promotion !== undefined;
    clearSelection();
    if (isPromo){ askPromotion().then(p => { makeMove(from,to,p); render(); }); render(); return; }
    makeMove(from, to, 'q');
  }
  clearSelection(); render();
});
// clique simples também funciona
boardEl.addEventListener('click', e => {
  if (dragFrom) return;
  const sq = e.target.closest('.sq');
  if (sq) clickSquare(sq.dataset.sq);
});

/* ======== promoção ======== */
function askPromotion(){
  return new Promise(res => {
    const box = document.getElementById('promo-btns');
    box.innerHTML='';
    const color = game.turn();
    ['q','r','b','n'].forEach(t => {
      const b = document.createElement('button');
      b.innerHTML = PIECES[color.toUpperCase()+t.toUpperCase()];
      b.onclick = () => { document.getElementById('promo-modal').style.display='none'; res(t); };
      box.appendChild(b);
    });
    document.getElementById('promo-modal').style.display='flex';
  });
}

/* ======== IA (minimax + poda alfa-beta) ======== */
const PIECE_VAL = {p:100,n:320,b:330,r:500,q:900,k:0};
const PST = {
  p:[[0,0,0,0,0,0,0,0],[50,50,50,50,50,50,50,50],[10,10,20,30,30,20,10,10],[5,5,10,25,25,10,5,5],[0,0,0,20,20,0,0,0],[5,-5,-10,0,0,-10,-5,5],[5,10,10,-20,-20,10,10,5],[0,0,0,0,0,0,0,0]],
  n:[[-50,-40,-30,-30,-30,-30,-40,-50],[-40,-20,0,0,0,0,-20,-40],[-30,0,10,15,15,10,0,-30],[-30,5,15,20,20,15,5,-30],[-30,0,15,20,20,15,0,-30],[-30,5,10,15,15,10,5,-30],[-40,-20,0,5,5,0,-20,-40],[-50,-40,-30,-30,-30,-30,-40,-50]],
  b:[[-20,-10,-10,-10,-10,-10,-10,-20],[-10,0,0,0,0,0,0,-10],[-10,0,5,10,10,5,0,-10],[-10,5,5,10,10,5,5,-10],[-10,0,10,10,10,10,0,-10],[-10,10,10,10,10,10,10,-10],[-10,5,0,0,0,0,5,-10],[-20,-10,-10,-10,-10,-10,-10,-20]],
  r:[[0,0,0,0,0,0,0,0],[5,10,10,10,10,10,10,5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[-5,0,0,0,0,0,0,-5],[0,0,0,5,5,0,0,0]],
  q:[[-20,-10,-10,-5,-5,-10,-10,-20],[-10,0,0,0,0,0,0,-10],[-10,0,5,5,5,5,0,-10],[-5,0,5,5,5,5,0,-5],[0,0,5,5,5,5,0,-5],[-10,5,5,5,5,5,0,-10],[-10,0,5,0,0,0,0,-10],[-20,-10,-10,-5,-5,-10,-10,-20]],
  k:[[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-30,-40,-40,-50,-50,-40,-40,-30],[-20,-30,-30,-40,-40,-30,-30,-20],[-10,-20,-20,-20,-20,-20,-20,-10],[20,20,0,0,0,0,20,20],[20,30,10,0,0,10,30,20]]
};
function evaluate(){
  let s = 0;
  const b = game.board();
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const p=b[r][c]; if(!p) continue;
    const v = PIECE_VAL[p.type] + PST[p.type][p.color==='w'?r:7-r][c];
    s += p.color==='w' ? v : -v;
  }
  return game.turn()==='w' ? s : -s;
}
function minimax(depth, alpha, beta){
  if (depth===0) return evaluate();
  const moves = game.moves();
  if (!moves.length) return game.in_check() ? -100000-depth : 0;
  let best=-Infinity;
  for(const m of moves){
    game.move(m);
    const s=-minimax(depth-1,-beta,-alpha);
    game.undo();
    if(s>best)best=s;
    if(s>alpha)alpha=s;
    if(alpha>=beta)break;
  }
  return best;
}
function aiMove(){
  const depth = parseInt(document.getElementById('level').value);
  let bestMove=null, bestScore=-Infinity;
  for(const m of game.moves()){
    game.move(m);
    const s=-minimax(depth-1,-Infinity,Infinity);
    game.undo();
    if(s>bestScore){bestScore=s;bestMove=m;}
  }
  if(bestMove) game.move(bestMove);
  render(); updateCaptured();
}

/* ======== UI ======== */
function updateCaptured(){
  const counts={w:{},b:{}};
  game.history({verbose:true}).forEach(m=>{ if(m.captured) counts[m.color][m.captured]=(counts[m.color][m.captured]||0)+1; });
  const sym={p:'p',n:'n',b:'b',r:'r',q:'q'};
  let w='',b='';
  for(const t in counts.b) for(let i=0;i<counts.b[t];i++) w+=PIECES['B'+sym[t].toUpperCase()];
  for(const t in counts.w) for(let i=0;i<counts.w[t];i++) b+=PIECES['W'+sym[t].toUpperCase()];
  document.getElementById('cap-white').innerHTML=w;
  document.getElementById('cap-black').innerHTML=b;
}
function updateStatus(){
  const st=document.getElementById('status');
  if(aiThinking){ st.innerHTML='<span class="thinking">🤖 IA pensando...</span>'; return; }
  const tn=game.turn()==='w'?'Brancas':'Pretas';
  let s;
  if(game.in_checkmate()) s=`🏆 Xeque-mate! ${game.turn()==='w'?'Pretas':'Brancas'} venceram!`;
  else if(game.in_stalemate()) s='🤝 Empate por afogamento.';
  else if(game.insufficient_material()) s='🤝 Empate por material insuficiente.';
  else if(game.in_threefold_repetition()) s='🤝 Empate por repetição tripla.';
  else if(game.in_draw()) s='🤝 Empate.';
  else s=`${tn} jogam`+(game.in_check()?' — XEQUE! ⚠️':'.');
  st.textContent=s;
}
function newGame(){
  game.reset(); clearSelection(); flipped=false;
  updateCaptured();
  document.getElementById('status').textContent='Brancas começam.';
  render();
}
document.getElementById('newgame').addEventListener('click', newGame);
document.getElementById('flip').addEventListener('click', ()=>{ flipped=!flipped; clearSelection(); render(); });
document.getElementById('undo').addEventListener('click', ()=>{
  if(aiThinking) return;
  game.undo();
  if(document.getElementById('mode').value==='ai' && game.turn()!==playerColor()) game.undo();
  clearSelection(); render(); updateCaptured(); updateStatus();
});
render();
</script>
</body>
</html>