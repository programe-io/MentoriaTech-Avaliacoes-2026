"use strict";

/* ---------- Estado ---------- */
const CHAVE = "quadro-tarefas-v1";
const COLUNAS = ["fazer", "andamento", "feito"];
const NOMES = { fazer: "A fazer", andamento: "Em andamento", feito: "Concluído" };
const ROTULO_PRIORIDADE = { alta: "Alta", media: "Média", baixa: "Baixa" };

let tarefas = carregar();
let arrastandoId = null;

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (Array.isArray(salvo)) return salvo;
  } catch (e) { /* sem armazenamento: usa exemplos */ }
  return [
    { id: 1, titulo: "Revisar proposta do cliente", prioridade: "alta", prazo: "", coluna: "andamento" },
    { id: 2, titulo: "Agendar reunião de equipe", prioridade: "media", prazo: "", coluna: "fazer" },
    { id: 3, titulo: "Organizar arquivos do mês", prioridade: "baixa", prazo: "", coluna: "fazer" },
  ];
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(tarefas)); } catch (e) { /* ignora */ }
}

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);

function criar(tag, props = {}, texto) {
  const e = document.createElement(tag);
  Object.assign(e, props);
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function hojeISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatarData(iso) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/* ---------- Renderização ---------- */
function desenhar() {
  const filtro = $("filtro").value;

  for (const col of COLUNAS) {
    const lista = $("l-" + col);
    lista.replaceChildren();
    const doGrupo = tarefas.filter((t) => t.coluna === col);
    const visiveis = doGrupo.filter((t) => filtro === "todas" || t.prioridade === filtro);
    $("c-" + col).textContent = doGrupo.length;

    if (!visiveis.length) {
      lista.append(criar("li", { className: "vazio" },
        doGrupo.length ? "Nenhuma tarefa com esse filtro." : "Nada aqui. Arraste uma tarefa ou adicione uma nova."));
    }
    visiveis.forEach((t) => lista.append(cartao(t)));
  }

  const total = tarefas.length;
  const feitas = tarefas.filter((t) => t.coluna === "feito").length;
  const pct = total ? Math.round((feitas / total) * 100) : 0;
  $("barra").style.width = pct + "%";
  $("pct").textContent = `${pct}% concluído`;
  $("resumo").textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"}, ${feitas} ${feitas === 1 ? "concluída" : "concluídas"}`;
}

function cartao(t) {
  const li = criar("li", { className: `tarefa ${t.prioridade}${t.coluna === "feito" ? " feita" : ""}`, draggable: true });
  li.append(criar("h3", {}, t.titulo));

  const meta = criar("div", { className: "meta" });
  meta.append(criar("span", {}, "Prioridade " + ROTULO_PRIORIDADE[t.prioridade].toLowerCase()));
  if (t.prazo) {
    const atrasada = t.coluna !== "feito" && t.prazo < hojeISO();
    meta.append(criar("span", { className: atrasada ? "atrasada" : "" },
      (atrasada ? "Atrasada: " : "Prazo: ") + formatarData(t.prazo)));
  }
  li.append(meta);

  const acoes = criar("div", { className: "acoes" });
  const i = COLUNAS.indexOf(t.coluna);
  if (i > 0) acoes.append(botaoMover(t, COLUNAS[i - 1], "←", `Mover "${t.titulo}" para ${NOMES[COLUNAS[i - 1]]}`));
  if (i < COLUNAS.length - 1) acoes.append(botaoMover(t, COLUNAS[i + 1], "→", `Mover "${t.titulo}" para ${NOMES[COLUNAS[i + 1]]}`));
  const del = criar("button", { type: "button", className: "excluir fantasma" }, "Excluir");
  del.setAttribute("aria-label", `Excluir "${t.titulo}"`);
  del.addEventListener("click", () => { tarefas = tarefas.filter((x) => x.id !== t.id); atualizar(); });
  acoes.append(del);
  li.append(acoes);

  li.addEventListener("dragstart", (e) => {
    arrastandoId = t.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(t.id));
    li.classList.add("arrastando");
  });
  li.addEventListener("dragend", () => {
    arrastandoId = null;
    li.classList.remove("arrastando");
    document.querySelectorAll(".coluna").forEach((c) => c.classList.remove("alvo"));
  });
  return li;
}

function botaoMover(t, destino, simbolo, rotulo) {
  const b = criar("button", { type: "button", className: "fantasma" }, simbolo);
  b.setAttribute("aria-label", rotulo);
  b.addEventListener("click", () => { t.coluna = destino; atualizar(); });
  return b;
}

function atualizar() {
  salvar();
  desenhar();
}

/* ---------- Eventos ---------- */
document.querySelectorAll(".coluna").forEach((col) => {
  col.addEventListener("dragover", (e) => { e.preventDefault(); col.classList.add("alvo"); });
  col.addEventListener("dragleave", (e) => { if (!col.contains(e.relatedTarget)) col.classList.remove("alvo"); });
  col.addEventListener("drop", (e) => {
    e.preventDefault();
    col.classList.remove("alvo");
    const t = tarefas.find((x) => x.id === arrastandoId);
    if (t) { t.coluna = col.dataset.coluna; atualizar(); }
  });
});

$("form-tarefa").addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = $("titulo").value.trim();
  if (!titulo) {
    $("erro").textContent = "Escreva um título para a tarefa.";
    return $("titulo").focus();
  }
  $("erro").textContent = "";
  tarefas.push({ id: Date.now(), titulo, prioridade: $("prioridade").value, prazo: $("prazo").value, coluna: "fazer" });
  e.target.reset();
  $("prioridade").value = "media";
  atualizar();
});

$("filtro").addEventListener("change", desenhar);

$("limpar").addEventListener("click", () => {
  const n = tarefas.filter((t) => t.coluna === "feito").length;
  if (!n) return;
  if (confirm(`Remover ${n} ${n === 1 ? "tarefa concluída" : "tarefas concluídas"}?`)) {
    tarefas = tarefas.filter((t) => t.coluna !== "feito");
    atualizar();
  }
});

desenhar();