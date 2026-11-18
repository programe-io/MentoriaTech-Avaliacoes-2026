"use strict";

/* ---------- Constantes ---------- */
const NOMES_DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const LETRAS_DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];
const CATEGORIAS = { saude: "Saúde", estudo: "Estudo", trabalho: "Trabalho", casa: "Casa", lazer: "Lazer" };
const CHAVE_ARMAZENAMENTO = "ritmo-dados-v1";
const CIRCUNFERENCIA = 2 * Math.PI * 50;

/* ---------- Estado ----------
   rotinas: [{ id, nome, hora, dias: [0..6], categoria }]
   feitos:  { "2026-11-18": [idRotina, ...] } */
let rotinas = [];
let feitos = {};
let diaSelecionado = hoje();
let deslocamentoSemana = 0;
let editandoId = null;

/* ---------- Utilitários de data ---------- */
function hoje() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
const chave = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const somarDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const mesmoDia = (a, b) => chave(a) === chave(b);
const $ = (id) => document.getElementById(id);

function inicioDaSemana(d) {            // semana começando na segunda
  const deslocamento = (d.getDay() + 6) % 7;
  return somarDias(d, -deslocamento);
}

/* ---------- Armazenamento ---------- */
function salvar() {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify({ rotinas, feitos }));
  } catch (e) { /* armazenamento indisponível: segue só em memória */ }
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO));
    if (dados) { rotinas = dados.rotinas || []; feitos = dados.feitos || {}; return; }
  } catch (e) { /* dados inválidos: começa do zero */ }

  rotinas = [
    { id: 1, nome: "Beber um copo de água", hora: "07:00", dias: [0,1,2,3,4,5,6], categoria: "saude" },
    { id: 2, nome: "Estudar 1 hora", hora: "19:00", dias: [1,2,3,4,5], categoria: "estudo" },
    { id: 3, nome: "Caminhada leve", hora: "17:30", dias: [1,3,5], categoria: "saude" }
  ];
}

/* ---------- Regras ---------- */
const agendadaNoDia = (r, d) => r.dias.includes(d.getDay());
const estaFeita = (id, d) => (feitos[chave(d)] || []).includes(id);

function alternarFeita(id) {
  const k = chave(diaSelecionado);
  const lista = feitos[k] || [];
  feitos[k] = lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];
  salvar();
  renderizar();
}

/* Sequência: dias agendados seguidos concluídos, contando de hoje para trás.
   Se hoje ainda não foi feita, a sequência não é quebrada. */
function calcularSequencia(r) {
  let seq = 0;
  const h = hoje();
  for (let i = 0; i < 365; i++) {
    const d = somarDias(h, -i);
    if (!agendadaNoDia(r, d)) continue;
    if (estaFeita(r.id, d)) seq++;
    else if (i === 0) continue;
    else break;
  }
  return seq;
}

/* ---------- Renderização ---------- */
function renderizarSemana() {
  const inicio = somarDias(inicioDaSemana(hoje()), deslocamentoSemana * 7);
  $("dias").innerHTML = Array.from({ length: 7 }, (_, i) => {
    const d = somarDias(inicio, i);
    const classes = ["dia"];
    if (mesmoDia(d, hoje())) classes.push("hoje");
    if (mesmoDia(d, diaSelecionado)) classes.push("ativo");
    const tem = rotinas.some((r) => agendadaNoDia(r, d));
    return `<button class="${classes.join(" ")}" data-data="${chave(d)}" aria-pressed="${mesmoDia(d, diaSelecionado)}">
              ${NOMES_DIAS[d.getDay()]}<b>${d.getDate()}</b><span class="ponto ${tem ? "tem" : ""}"></span>
            </button>`;
  }).join("");
}

function renderizarCabecalho(doDia, concluidas) {
  const ehHoje = mesmoDia(diaSelecionado, hoje());
  const ontem = mesmoDia(diaSelecionado, somarDias(hoje(), -1));
  const amanha = mesmoDia(diaSelecionado, somarDias(hoje(), 1));
  $("titulo-dia").textContent = ehHoje ? "Hoje" : ontem ? "Ontem" : amanha ? "Amanhã"
    : ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"][diaSelecionado.getDay()];
  $("data-extenso").textContent = diaSelecionado.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

  const total = doDia.length;
  const pct = total === 0 ? 0 : Math.round((concluidas / total) * 100);
  $("anel-percentual").textContent = pct + "%";
  $("anel-detalhe").textContent = `${concluidas} de ${total}`;
  const anel = $("anel-valor");
  anel.style.strokeDashoffset = CIRCUNFERENCIA * (1 - pct / 100);
  anel.classList.toggle("completo", total > 0 && pct === 100);
}

function renderizarLista() {
  const doDia = rotinas.filter((r) => agendadaNoDia(r, diaSelecionado)).sort((a, b) => a.hora.localeCompare(b.hora));
  const futuro = diaSelecionado > hoje();
  const concluidas = doDia.filter((r) => estaFeita(r.id, diaSelecionado)).length;

  renderizarCabecalho(doDia, concluidas);

  if (doDia.length === 0) {
    $("lista").innerHTML = `<li class="vazio">Nenhuma rotina para este dia. Use o formulário para criar uma.</li>`;
    return;
  }

  $("lista").innerHTML = doDia.map((r) => {
    const feita = estaFeita(r.id, diaSelecionado);
    const seq = calcularSequencia(r);
    return `
      <li class="rotina ${feita ? "feita" : ""}" data-id="${r.id}" style="--cor: var(--c-${r.categoria})">
        <button class="marcar" data-acao="marcar" ${futuro ? "disabled" : ""}
          aria-label="${feita ? "Desmarcar" : "Concluir"} ${r.nome}" aria-pressed="${feita}">${feita ? "&check;" : ""}</button>
        <div>
          <div class="nome">${escapar(r.nome)}</div>
          <div class="meta">
            <span>${r.hora}</span>
            <span>${CATEGORIAS[r.categoria]}</span>
            ${seq > 0 ? `<span class="sequencia">${seq} ${seq === 1 ? "dia" : "dias"} seguidos</span>` : ""}
          </div>
        </div>
        <div class="acoes">
          <button data-acao="editar">Editar</button>
          <button class="apagar" data-acao="apagar">Excluir</button>
        </div>
      </li>`;
  }).join("");
}

function renderizarResumo() {
  $("total-rotinas").textContent = rotinas.length;
  const maior = rotinas.reduce((m, r) => Math.max(m, calcularSequencia(r)), 0);
  $("maior-sequencia").textContent = `${maior} ${maior === 1 ? "dia" : "dias"}`;
}

function renderizar() {
  renderizarSemana();
  renderizarLista();
  renderizarResumo();
}

function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Formulário ---------- */
function montarDiasDoFormulario() {
  const ordem = [1, 2, 3, 4, 5, 6, 0];  // segunda a domingo
  $("dias-form").innerHTML = ordem.map((n) => `
    <label><input type="checkbox" value="${n}" ${n >= 1 && n <= 5 ? "checked" : ""}>
    <span title="${NOMES_DIAS[n]}">${LETRAS_DIAS[n]}</span></label>`).join("");
}

function diasMarcados() {
  return [...document.querySelectorAll("#dias-form input:checked")].map((i) => Number(i.value));
}

function limparFormulario() {
  editandoId = null;
  $("form").reset();
  $("hora").value = "08:00";
  montarDiasDoFormulario();
  $("form-titulo").textContent = "Nova rotina";
  $("salvar").textContent = "Adicionar rotina";
  $("cancelar").hidden = true;
  $("erro").textContent = "";
}

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = $("nome").value.trim();
  const dias = diasMarcados();

  if (!nome) { $("erro").textContent = "Digite um nome para a rotina."; return; }
  if (dias.length === 0) { $("erro").textContent = "Escolha pelo menos um dia da semana."; return; }

  const dados = { nome, hora: $("hora").value, dias, categoria: $("categoria").value };

  if (editandoId !== null) {
    rotinas = rotinas.map((r) => (r.id === editandoId ? { ...r, ...dados } : r));
  } else {
    const id = rotinas.reduce((m, r) => Math.max(m, r.id), 0) + 1;
    rotinas.push({ id, ...dados });
  }

  salvar();
  limparFormulario();
  renderizar();
});

$("cancelar").addEventListener("click", limparFormulario);

function iniciarEdicao(id) {
  const r = rotinas.find((x) => x.id === id);
  if (!r) return;
  editandoId = id;
  $("nome").value = r.nome;
  $("hora").value = r.hora;
  $("categoria").value = r.categoria;
  document.querySelectorAll("#dias-form input").forEach((i) => { i.checked = r.dias.includes(Number(i.value)); });
  $("form-titulo").textContent = "Editar rotina";
  $("salvar").textContent = "Salvar alterações";
  $("cancelar").hidden = false;
  $("nome").focus();
}

function apagarRotina(id) {
  const r = rotinas.find((x) => x.id === id);
  if (!r || !confirm(`Excluir a rotina "${r.nome}"?`)) return;
  rotinas = rotinas.filter((x) => x.id !== id);
  for (const k in feitos) feitos[k] = feitos[k].filter((x) => x !== id);
  if (editandoId === id) limparFormulario();
  salvar();
  renderizar();
}

/* ---------- Eventos ---------- */
$("lista").addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-acao]");
  if (!botao) return;
  const id = Number(botao.closest("[data-id]").dataset.id);
  if (botao.dataset.acao === "marcar") alternarFeita(id);
  if (botao.dataset.acao === "editar") iniciarEdicao(id);
  if (botao.dataset.acao === "apagar") apagarRotina(id);
});

$("dias").addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-data]");
  if (!botao) return;
  const [a, m, d] = botao.dataset.data.split("-").map(Number);
  diaSelecionado = new Date(a, m - 1, d);
  renderizar();
});

$("semana-anterior").addEventListener("click", () => { deslocamentoSemana--; renderizarSemana(); });
$("semana-proxima").addEventListener("click", () => { deslocamentoSemana++; renderizarSemana(); });

/* ---------- Início ---------- */
carregar();
montarDiasDoFormulario();
renderizar();