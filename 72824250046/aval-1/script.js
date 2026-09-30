"use strict";

/* ---------- Dados iniciais ---------- */
// Em produção, troque a simulação por fetch('/api/dispositivos').
const dispositivos = [
  { nome: "Servidor de arquivos", tipo: "Servidor", ip: "192.168.0.10" },
  { nome: "Servidor web", tipo: "Servidor", ip: "192.168.0.11" },
  { nome: "Notebook Ana", tipo: "Computador", ip: "192.168.0.21" },
  { nome: "Desktop financeiro", tipo: "Computador", ip: "192.168.0.22" },
  { nome: "Impressora térrea", tipo: "Impressora", ip: "192.168.0.31" },
  { nome: "Câmera entrada", tipo: "Câmera", ip: "192.168.0.41" },
  { nome: "Ponto de acesso 1", tipo: "Ponto de acesso", ip: "192.168.0.51" },
].map(criarDispositivo);

const historicoMedio = [];
const LIMITE_HISTORICO = 30;
const LIMITE_LATENCIA = 100;
let pausado = false;
let temporizador = null;

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);
const NS = "http://www.w3.org/2000/svg";

function criarDispositivo({ nome, tipo, ip }) {
  return { nome, tipo, ip, latencia: 10 + Math.random() * 40, perda: 0, estado: "online" };
}

function el(tag, attrs = {}, texto) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function ipValido(ip) {
  const partes = ip.split(".");
  return partes.length === 4 && partes.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}

const rotuloEstado = { online: "Online", instavel: "Instável", offline: "Offline" };

/* ---------- Simulação de leitura ---------- */
function ler() {
  for (const d of dispositivos) {
    if (d.estado === "offline") {
      if (Math.random() < 0.25) d.estado = "online"; // volta sozinho
      d.latencia = 0; d.perda = 100;
      continue;
    }
    if (Math.random() < 0.03) { d.estado = "offline"; continue; }
    d.latencia = Math.max(2, d.latencia + (Math.random() - 0.5) * 30);
    if (Math.random() < 0.05) d.latencia += 90; // pico ocasional
    d.perda = Math.random() < 0.1 ? Math.round(Math.random() * 12) : 0;
    d.estado = d.latencia > LIMITE_LATENCIA || d.perda > 5 ? "instavel" : "online";
  }
  const ativos = dispositivos.filter((d) => d.estado !== "offline");
  const media = ativos.length ? ativos.reduce((s, d) => s + d.latencia, 0) / ativos.length : 0;
  historicoMedio.push(media);
  if (historicoMedio.length > LIMITE_HISTORICO) historicoMedio.shift();
  $("atualizado").textContent = "Última leitura às " + new Date().toLocaleTimeString("pt-BR");
  desenhar();
}

/* ---------- Renderização ---------- */
function desenhar() {
  resumo();
  topologia();
  grafico();
  tabela();
}

function resumo() {
  const cont = (e) => dispositivos.filter((d) => d.estado === e).length;
  const ativos = dispositivos.filter((d) => d.estado !== "offline");
  const media = ativos.length ? ativos.reduce((s, d) => s + d.latencia, 0) / ativos.length : 0;
  $("r-online").textContent = cont("online");
  $("r-instavel").textContent = cont("instavel");
  $("r-offline").textContent = cont("offline");
  $("r-latencia").textContent = Math.round(media) + " ms";
}

function topologia() {
  const svg = $("topologia");
  svg.replaceChildren();
  const cx = 300, cy = 210, raio = 155;
  const n = dispositivos.length;

  dispositivos.forEach((d, i) => {
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(ang) * raio * 1.5 * 0.9;
    const y = cy + Math.sin(ang) * raio;
    svg.append(el("line", { x1: cx, y1: cy, x2: x, y2: y, class: "link" }));
    d._pos = { x, y };
  });

  svg.append(el("rect", { x: cx - 28, y: cy - 18, width: 56, height: 36, rx: 6, class: "roteador" }));
  svg.append(el("text", { x: cx, y: cy + 4, class: "no-rotulo", style: "fill:#fff" }, "Roteador"));

  for (const d of dispositivos) {
    const { x, y } = d._pos;
    // Formas diferentes por estado: círculo, quadrado, triângulo (não depende só de cor)
    let forma;
    if (d.estado === "online") forma = el("circle", { cx: x, cy: y, r: 9 });
    else if (d.estado === "instavel") forma = el("rect", { x: x - 9, y: y - 9, width: 18, height: 18, rx: 2 });
    else forma = el("polygon", { points: `${x},${y - 11} ${x + 11},${y + 9} ${x - 11},${y + 9}` });
    forma.setAttribute("class", "no-forma " + d.estado);
    svg.append(forma);
    svg.append(el("text", { x, y: y + 26, class: "no-rotulo" }, d.nome));
    svg.append(el("text", { x, y: y + 39, class: "no-ip" }, d.ip));
  }
}

function grafico() {
  const svg = $("grafico");
  svg.replaceChildren();
  const L = 36, T = 10, W = 350, H = 160;
  const max = Math.max(150, ...historicoMedio);
  const yDe = (v) => T + H - (v / max) * H;

  svg.append(el("line", { x1: L, y1: T, x2: L, y2: T + H, class: "eixo" }));
  svg.append(el("line", { x1: L, y1: T + H, x2: L + W, y2: T + H, class: "eixo" }));
  svg.append(el("line", { x1: L, y1: yDe(LIMITE_LATENCIA), x2: L + W, y2: yDe(LIMITE_LATENCIA), class: "limite" }));
  svg.append(el("text", { x: 2, y: yDe(LIMITE_LATENCIA) + 3, class: "rotulo-eixo" }, "100"));
  svg.append(el("text", { x: 2, y: T + H + 3, class: "rotulo-eixo" }, "0"));

  if (historicoMedio.length < 2) return;
  const passo = W / (LIMITE_HISTORICO - 1);
  const pontos = historicoMedio.map((v, i) => `${L + i * passo},${yDe(v)}`).join(" ");
  svg.append(el("polyline", { points: pontos, class: "curva" }));
}

function tabela() {
  const termo = $("busca").value.trim().toLowerCase();
  const filtro = $("filtro").value;
  const corpo = $("tabela");
  corpo.replaceChildren();

  const lista = dispositivos.filter((d) =>
    (filtro === "todos" || d.estado === filtro) &&
    (d.nome.toLowerCase().includes(termo) || d.ip.includes(termo))
  );
  $("vazio").hidden = lista.length > 0;

  for (const d of lista) {
    const tr = document.createElement("tr");
    const celulas = [
      `<span class="estado"><span class="ponto ${d.estado}"></span>${rotuloEstado[d.estado]}</span>`,
      null, d.tipo, d.ip,
      d.estado === "offline" ? "—" : Math.round(d.latencia) + " ms",
      d.perda + "%",
    ];
    celulas.forEach((c, i) => {
      const td = document.createElement("td");
      if (i === 1) td.textContent = d.nome; // textContent evita injeção de HTML
      else td.innerHTML = c;
      if (i >= 3) td.className = "mono";
      tr.append(td);
    });
    const tdAcao = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sec";
    btn.textContent = "Remover";
    btn.setAttribute("aria-label", "Remover " + d.nome);
    btn.addEventListener("click", () => {
      dispositivos.splice(dispositivos.indexOf(d), 1);
      desenhar();
    });
    tdAcao.append(btn);
    tr.append(tdAcao);
    corpo.append(tr);
  }
}

/* ---------- Eventos ---------- */
$("busca").addEventListener("input", tabela);
$("filtro").addEventListener("change", tabela);

$("btn-pausar").addEventListener("click", (e) => {
  pausado = !pausado;
  e.target.textContent = pausado ? "Retomar leitura" : "Pausar leitura";
  if (pausado) clearInterval(temporizador);
  else temporizador = setInterval(ler, 2000);
});

$("form-novo").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const nome = f.nome.value.trim();
  const ip = f.ip.value.trim();
  if (!nome) return ($("erro").textContent = "Informe o nome do dispositivo.");
  if (!ipValido(ip)) return ($("erro").textContent = "Informe um IP válido, como 192.168.0.50.");
  if (dispositivos.some((d) => d.ip === ip)) return ($("erro").textContent = "Já existe um dispositivo com esse IP.");
  if (dispositivos.length >= 12) return ($("erro").textContent = "O mapa comporta até 12 dispositivos. Remova um antes.");
  $("erro").textContent = "";
  dispositivos.push(criarDispositivo({ nome, tipo: f.tipo.value, ip }));
  f.reset();
  desenhar();
});

/* ---------- Início ---------- */
ler();
temporizador = setInterval(ler, 2000);