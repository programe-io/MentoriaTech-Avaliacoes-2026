const $ = (id) => document.getElementById(id);

// ---------- Menu no celular ----------
const menuBtn = document.querySelector('.menu-btn');
const nav = $('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Treino de alvos ----------
const arena = $('arena');
const hint = $('hint');
const startBtn = $('start');
const timeEl = $('time');
const hitsEl = $('hits');
const accEl = $('acc');
const bestEl = $('best');
const resultEl = $('result');

const GAME_SECONDS = 30;
const TARGET_SIZE = 56;
const TARGET_LIFETIME = 1100; // ms

let hits = 0;
let misses = 0;
let timeLeft = GAME_SECONDS;
let running = false;
let clock = null;
let expire = null;
let target = null;
let best = 0;

try { best = Number(localStorage.getItem('mc-best')) || 0; } catch (e) { /* sem armazenamento */ }
bestEl.textContent = best;

function updateStats() {
  const total = hits + misses;
  hitsEl.textContent = hits;
  timeEl.textContent = timeLeft;
  accEl.textContent = total ? `${Math.round((hits / total) * 100)}%` : '0%';
}

function removeTarget() {
  clearTimeout(expire);
  if (target) { target.remove(); target = null; }
}

function spawn() {
  removeTarget();
  const t = document.createElement('button');
  t.type = 'button';
  t.className = 'target';
  t.setAttribute('aria-label', 'Alvo');
  t.style.left = `${Math.random() * (arena.clientWidth - TARGET_SIZE)}px`;
  t.style.top = `${Math.random() * (arena.clientHeight - TARGET_SIZE)}px`;
  t.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!running) return;
    hits += 1;
    updateStats();
    spawn();
  });
  arena.append(t);
  target = t;
  expire = setTimeout(() => { if (running && target === t) spawn(); }, TARGET_LIFETIME);
}

arena.addEventListener('click', (e) => {
  if (running && e.target === arena) {
    misses += 1;
    updateStats();
  }
});

function endGame() {
  running = false;
  clearInterval(clock);
  removeTarget();
  hint.hidden = false;
  hint.textContent = 'Fim do treino!';
  startBtn.disabled = false;
  startBtn.textContent = 'Jogar de novo';

  const total = hits + misses;
  const acc = total ? Math.round((hits / total) * 100) : 0;
  let msg = `Você acertou ${hits} alvos com ${acc}% de precisão.`;
  if (hits > best) {
    best = hits;
    bestEl.textContent = best;
    msg += ' Novo recorde!';
    try { localStorage.setItem('mc-best', String(best)); } catch (e) { /* sem armazenamento */ }
  }
  resultEl.textContent = msg;
}

startBtn.addEventListener('click', () => {
  hits = 0;
  misses = 0;
  timeLeft = GAME_SECONDS;
  running = true;
  resultEl.textContent = '';
  hint.hidden = true;
  startBtn.disabled = true;
  updateStats();
  spawn();
  clock = setInterval(() => {
    timeLeft -= 1;
    updateStats();
    if (timeLeft <= 0) endGame();
  }, 1000);
});

// ---------- Rotina de 12 minutos ----------
const ROUTINE = [
  { name: 'Aquecimento', seconds: 120, text: 'Mova o mouse em círculos e em linhas, alternando cliques, sem pressa.' },
  { name: 'Mira em pontos fixos', seconds: 180, text: 'Mire e clique em pontos diferentes de uma parede, virando rápido de um ao outro.' },
  { name: 'Seguir o alvo', seconds: 240, text: 'Fique andando de lado em volta de um mob e mantenha a mira sobre ele.' },
  { name: 'Ritmo de cliques', seconds: 180, text: 'Bata em um mob parado mantendo um ritmo constante e a mira centralizada.' }
];

const stepsEl = $('steps');
const timerEl = $('timer');
const timerLabel = $('timer-label');
const routineStart = $('routine-start');
const routineSkip = $('routine-skip');

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

ROUTINE.forEach((step) => {
  const li = document.createElement('li');
  const h = document.createElement('h3');
  const name = document.createElement('span');
  name.style.color = 'inherit';
  name.textContent = step.name;
  const dur = document.createElement('span');
  dur.textContent = `${step.seconds / 60} min`;
  h.append(name, dur);
  const p = document.createElement('p');
  p.textContent = step.text;
  li.append(h, p);
  stepsEl.append(li);
});

let stepIndex = -1;
let stepLeft = 0;
let routineClock = null;

function markSteps() {
  [...stepsEl.children].forEach((li, i) => {
    li.classList.toggle('active', i === stepIndex);
    li.classList.toggle('done', i < stepIndex);
  });
}

function goToStep(i) {
  if (i >= ROUTINE.length) return finishRoutine();
  stepIndex = i;
  stepLeft = ROUTINE[i].seconds;
  timerLabel.textContent = `Etapa ${i + 1} de ${ROUTINE.length}: ${ROUTINE[i].name}`;
  timerEl.textContent = fmt(stepLeft);
  markSteps();
}

function finishRoutine() {
  clearInterval(routineClock);
  routineClock = null;
  stepIndex = ROUTINE.length;
  markSteps();
  timerLabel.textContent = 'Rotina concluída. Bom trabalho!';
  timerEl.textContent = '00:00';
  routineStart.textContent = 'Fazer de novo';
  routineStart.disabled = false;
  routineSkip.disabled = true;
}

routineStart.addEventListener('click', () => {
  routineStart.disabled = true;
  routineSkip.disabled = false;
  goToStep(0);
  routineClock = setInterval(() => {
    stepLeft -= 1;
    timerEl.textContent = fmt(Math.max(stepLeft, 0));
    if (stepLeft <= 0) goToStep(stepIndex + 1);
  }, 1000);
});

routineSkip.addEventListener('click', () => goToStep(stepIndex + 1));

// ---------- Teste de cliques (5 s) ----------
const cpsBtn = $('cps-btn');
const cpsResult = $('cps-result');
const CPS_SECONDS = 5;

let cpsClicks = 0;
let cpsActive = false;
let cpsEnd = null;

cpsBtn.addEventListener('click', () => {
  if (!cpsActive) {
    cpsActive = true;
    cpsClicks = 0;
    cpsResult.textContent = '';
    cpsEnd = setTimeout(() => {
      cpsActive = false;
      cpsBtn.textContent = 'Clique para tentar de novo';
      cpsResult.textContent = `${(cpsClicks / CPS_SECONDS).toFixed(1)} cliques por segundo (${cpsClicks} cliques).`;
    }, CPS_SECONDS * 1000);
  }
  cpsClicks += 1;
  cpsBtn.textContent = `${cpsClicks} cliques`;
});