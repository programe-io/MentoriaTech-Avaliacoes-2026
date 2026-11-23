// ---------- Configuração ----------
const MIN = 10;   // início da escala do medidor
const MAX = 45;   // fim da escala do medidor
const CX = 150, CY = 150, R = 120;

const FAIXAS = [
  { de: 10,   ate: 18.5, nome: "Abaixo do peso",  cor: "#4cc9f0", missao: "Reabastecer: mais energia e nutrientes." },
  { de: 18.5, ate: 25,   nome: "Peso normal",     cor: "#38f2c4", missao: "Órbita estável. Mantenha o rumo!" },
  { de: 25,   ate: 30,   nome: "Sobrepeso",       cor: "#ffd166", missao: "Ajuste de rota: mais movimento e atenção ao prato." },
  { de: 30,   ate: 35,   nome: "Obesidade I",     cor: "#ff9f1c", missao: "Hora de traçar um plano com apoio profissional." },
  { de: 35,   ate: 40,   nome: "Obesidade II",    cor: "#ff5d5d", missao: "Procure acompanhamento médico e nutricional." },
  { de: 40,   ate: 45,   nome: "Obesidade III",   cor: "#c9184a", missao: "Prioridade: busque avaliação médica em breve." },
];

// ---------- Elementos ----------
const $ = (id) => document.getElementById(id);
const peso = $("peso"), altura = $("altura");
const pesoOut = $("pesoOut"), alturaOut = $("alturaOut");
const numero = $("numero"), categoria = $("categoria");
const ideal = $("ideal"), missao = $("missao");
const ponteiro = $("ponteiro");

// ---------- Geometria do medidor ----------
function ponto(valor, raio = R) {
  const t = (Math.min(Math.max(valor, MIN), MAX) - MIN) / (MAX - MIN);
  const a = Math.PI * (1 - t);
  return [CX + raio * Math.cos(a), CY - raio * Math.sin(a)];
}

function desenharMedidor() {
  const arcos = $("arcos");
  const marcas = $("marcas");

  FAIXAS.forEach((f) => {
    const [x1, y1] = ponto(f.de);
    const [x2, y2] = ponto(f.ate);
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`);
    p.setAttribute("stroke", f.cor);
    arcos.appendChild(p);
  });

  [18.5, 25, 30, 35, 40].forEach((v) => {
    const [x, y] = ponto(v, R + 18);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y + 3);
    t.textContent = v;
    marcas.appendChild(t);
  });
}

// ---------- Lógica ----------
function calcularIMC(kg, cm) {
  const m = cm / 100;
  return kg / (m * m);
}

function faixaDe(imc) {
  return FAIXAS.find((f) => imc < f.ate) || FAIXAS[FAIXAS.length - 1];
}

let valorExibido = 0;
function animarNumero(destino) {
  const inicio = valorExibido;
  const duracao = 700;
  const t0 = performance.now();

  function passo(agora) {
    const p = Math.min((agora - t0) / duracao, 1);
    const suave = 1 - Math.pow(1 - p, 3);
    valorExibido = inicio + (destino - inicio) * suave;
    numero.textContent = valorExibido.toFixed(1);
    if (p < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

function atualizar() {
  const kg = parseFloat(peso.value);
  const cm = parseFloat(altura.value);

  pesoOut.textContent = `${kg.toFixed(1).replace(".0", "")} kg`;
  alturaOut.textContent = `${cm} cm`;

  const imc = calcularIMC(kg, cm);
  const faixa = faixaDe(imc);

  // cor do tema inteiro muda conforme a faixa
  document.documentElement.style.setProperty("--cor", faixa.cor);

  // ponteiro: -90° (esquerda) até +90° (direita)
  const t = (Math.min(Math.max(imc, MIN), MAX) - MIN) / (MAX - MIN);
  ponteiro.style.transform = `rotate(${t * 180 - 90}deg)`;

  animarNumero(imc);
  categoria.textContent = faixa.nome;
  missao.textContent = faixa.missao;

  // faixa de peso ideal (IMC 18,5 a 24,9)
  const m = cm / 100;
  const min = 18.5 * m * m;
  const max = 24.9 * m * m;
  ideal.textContent = `${min.toFixed(1)} – ${max.toFixed(1)} kg`;
}

// ---------- Início ----------
desenharMedidor();
peso.addEventListener("input", atualizar);
altura.addEventListener("input", atualizar);
atualizar();