// ---------- Dados ----------
const NUMEROS = [
  { n: 1,  palavra: 'um',     emoji: '🍎', cor: '#FF8A80' },
  { n: 2,  palavra: 'dois',   emoji: '🐶', cor: '#FFB86B' },
  { n: 3,  palavra: 'três',   emoji: '⭐', cor: '#FFD45E' },
  { n: 4,  palavra: 'quatro', emoji: '🐟', cor: '#7ADBA0' },
  { n: 5,  palavra: 'cinco',  emoji: '🎈', cor: '#6CC6F0' },
  { n: 6,  palavra: 'seis',   emoji: '🐞', cor: '#A5B0F5' },
  { n: 7,  palavra: 'sete',   emoji: '🍓', cor: '#C7A2F5' },
  { n: 8,  palavra: 'oito',   emoji: '🦋', cor: '#F5A3D3' },
  { n: 9,  palavra: 'nove',   emoji: '🐥', cor: '#FFA98A' },
  { n: 10, palavra: 'dez',    emoji: '🍭', cor: '#6FD6C6' }
];

const ACERTOS = ['Muito bem! 🎉', 'Isso mesmo! 🌟', 'Parabéns! 👏', 'Você acertou! 🥳'];
const ERROS   = ['Quase! Tente de novo 💪', 'Ops! Olhe com calma 🔍', 'Não foi dessa vez, tente outra! 😊'];

// ---------- Estado ----------
let indice = 0;        // número exibido no modo Aprender
let pontos = 0;
let perguntaAtual = null;
let errouNestaPergunta = false;

// ---------- Atalhos ----------
const $ = (id) => document.getElementById(id);
const sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];

function pintar(cor) {
  document.documentElement.style.setProperty('--accent', cor);
}

function emojisDe(item) {
  return Array.from({ length: item.n }, (_, i) =>
    `<span style="animation-delay:${i * 0.05}s">${item.emoji}</span>`).join('');
}

// ---------- Modo Aprender ----------
function mostraNumero() {
  const item = NUMEROS[indice];
  pintar(item.cor);
  $('number').textContent = item.n;
  $('word').textContent = item.palavra;
  $('emojis').innerHTML = emojisDe(item);
  $('counter').textContent = `${item.n} de ${NUMEROS.length}`;
  $('prev').disabled = indice === 0;
  $('next').disabled = indice === NUMEROS.length - 1;
}

$('next').addEventListener('click', () => {
  if (indice < NUMEROS.length - 1) { indice++; mostraNumero(); }
});
$('prev').addEventListener('click', () => {
  if (indice > 0) { indice--; mostraNumero(); }
});

$('speak').addEventListener('click', () => {
  if (!('speechSynthesis' in window)) return;
  const fala = new SpeechSynthesisUtterance(NUMEROS[indice].palavra);
  fala.lang = 'pt-BR';
  fala.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(fala);
});

// ---------- Abas ----------
function mostraAba(aba) {
  const aprender = aba === 'learn';
  $('learn').hidden = !aprender;
  $('play').hidden = aprender;
  $('tab-learn').classList.toggle('active', aprender);
  $('tab-play').classList.toggle('active', !aprender);
  if (aprender) mostraNumero(); else novaPergunta();
}
$('tab-learn').addEventListener('click', () => mostraAba('learn'));
$('tab-play').addEventListener('click', () => mostraAba('play'));

// ---------- Modo Brincar ----------
// Três tipos de pergunta: contar figuras, ler a palavra, ler o algarismo
function novaPergunta() {
  const item = sorteia(NUMEROS);
  const tipo = sorteia(['contar', 'palavra', 'algarismo']);
  errouNestaPergunta = false;
  pintar(item.cor);

  let texto, visual, correta, opcoes;
  const outros = NUMEROS.filter((x) => x !== item).sort(() => Math.random() - 0.5).slice(0, 2);
  const grupo = [item, ...outros].sort(() => Math.random() - 0.5);

  if (tipo === 'contar') {
    texto = 'Quantos você vê?';
    visual = `<div class="emojis">${emojisDe(item)}</div>`;
    correta = item.n;
    opcoes = grupo.map((x) => ({ rotulo: x.n, valor: x.n }));
  } else if (tipo === 'palavra') {
    texto = 'Qual número é este?';
    visual = `<div class="big">${item.palavra}</div>`;
    correta = item.n;
    opcoes = grupo.map((x) => ({ rotulo: x.n, valor: x.n }));
  } else {
    texto = 'Como se escreve este número?';
    visual = `<div class="big">${item.n}</div>`;
    correta = item.palavra;
    opcoes = grupo.map((x) => ({ rotulo: x.palavra, valor: x.palavra }));
  }

  perguntaAtual = { correta };
  $('question').textContent = texto;
  $('q-visual').innerHTML = visual;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('next-question').hidden = true;

  const caixa = $('options');
  caixa.innerHTML = '';
  opcoes.forEach((op) => {
    const b = document.createElement('button');
    b.className = 'option';
    b.textContent = op.rotulo;
    b.addEventListener('click', () => responde(b, op.valor));
    caixa.appendChild(b);
  });
}

function responde(botao, valor) {
  const fb = $('feedback');
  if (valor === perguntaAtual.correta) {
    const ganho = errouNestaPergunta ? 5 : 10;
    pontos += ganho;
    $('score').textContent = pontos;
    botao.classList.add('certa');
    fb.textContent = `${sorteia(ACERTOS)} +${ganho}`;
    fb.className = 'feedback ok';
    document.querySelectorAll('.option').forEach((b) => (b.disabled = true));
    $('next-question').hidden = false;
  } else {
    errouNestaPergunta = true;
    botao.classList.add('errada');
    botao.disabled = true;
    fb.textContent = sorteia(ERROS);
    fb.className = 'feedback erro';
  }
}

$('next-question').addEventListener('click', novaPergunta);

// ---------- Início ----------
mostraNumero();