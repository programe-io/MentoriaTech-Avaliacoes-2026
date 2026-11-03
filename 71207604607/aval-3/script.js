// ================= DADOS =================
const CHAVE = "tarefas-dia";
const PRIORIDADES = { 1: ["Alta", "red"], 2: ["Média", "amber"], 3: ["Baixa", "green"] };

let tarefas = [];       // coleção central
let ultimoId = 0;       // gerador de código independente do tamanho do array
let filtro = "todas";   // todas | pendentes | concluidas
let confirmandoLimpeza = false;

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify({ tarefas, ultimoId })); } catch (e) {}
}
function carregar() {
  try {
    const d = JSON.parse(localStorage.getItem(CHAVE));
    if (d && Array.isArray(d.tarefas)) { tarefas = d.tarefas; ultimoId = d.ultimoId || 0; }
  } catch (e) {}
}

// ================= FUNÇÕES DO SISTEMA =================
function validarTarefa(titulo, prioridade) {
  if (titulo.trim().length < 3) throw new Error("A tarefa deve ter no mínimo 3 caracteres.");
  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser 1 (alta), 2 (média) ou 3 (baixa).");
  }
}

function buscarTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) throw new Error("Tarefa não encontrada.");
  return tarefa;
}

function adicionarTarefa(titulo, prioridade, horario) {
  validarTarefa(titulo, prioridade);
  ultimoId++;
  const tarefa = { id: ultimoId, titulo: titulo.trim(), prioridade, horario: horario || "", feita: false };
  tarefas.push(tarefa);
  return tarefa;
}

function alternarConclusao(id) {
  const tarefa = buscarTarefa(id);
  tarefa.feita = !tarefa.feita;
  return tarefa;
}

function removerTarefa(id) {
  const tarefa = buscarTarefa(id);
  tarefas = tarefas.filter((t) => t.id !== id);
  return tarefa;
}

function limparConcluidas() {
  const qtd = tarefas.filter((t) => t.feita).length;
  tarefas = tarefas.filter((t) => !t.feita);
  return qtd;
}

// Pendentes primeiro; depois por prioridade; depois por horário
function listarTarefas(busca = "", status = "todas") {
  const termo = busca.trim().toLowerCase();
  return tarefas
    .filter((t) => termo === "" || t.titulo.toLowerCase().includes(termo))
    .filter((t) => status === "todas" || (status === "pendentes" ? !t.feita : t.feita))
    .sort((a, b) =>
      Number(a.feita) - Number(b.feita) ||
      a.prioridade - b.prioridade ||
      (a.horario || "99:99").localeCompare(b.horario || "99:99") ||
      a.id - b.id);
}

function calcularResumo() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.feita).length;
  return { total, concluidas, pendentes: total - concluidas,
           pct: total === 0 ? 0 : Math.round((concluidas / total) * 100) };
}

// ================= INTERFACE =================
const $ = (id) => document.getElementById(id);

function criar(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function toast(texto, tipo) {
  const t = criar("div", "toast " + (tipo || ""), texto);
  $("toasts").appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function desenharResumo() {
  const r = calcularResumo();
  $("statTotal").textContent = r.total;
  $("statPendentes").textContent = r.pendentes;
  $("statConcluidas").textContent = r.concluidas;
  $("statPct").textContent = r.pct + "% concluído";
  $("barra").style.width = r.pct + "%";
}

function criarItem(t) {
  const li = criar("li", "item p" + t.prioridade + (t.feita ? " feita" : ""));

  const check = criar("button", "check", t.feita ? "✓" : "");
  check.type = "button";
  check.setAttribute("aria-label", t.feita ? "Reabrir tarefa" : "Concluir tarefa");
  check.addEventListener("click", () => executar(() => alternarConclusao(t.id)));

  const remover = criar("button", "btn btn-ghost btn-sm", "🗑");
  remover.type = "button";
  remover.title = "Remover";
  remover.addEventListener("click", () => executar(() => removerTarefa(t.id), "Tarefa removida"));

  li.appendChild(check);
  li.appendChild(criar("span", "texto", t.titulo));
  if (t.horario) li.appendChild(criar("span", "tag", "🕒 " + t.horario));
  li.appendChild(criar("span", "tag " + PRIORIDADES[t.prioridade][1], PRIORIDADES[t.prioridade][0]));
  li.appendChild(remover);
  return li;
}

function desenharLista() {
  const ul = $("lista");
  ul.innerHTML = "";
  const lista = listarTarefas($("busca").value, filtro);

  if (lista.length === 0) {
    const li = criar("li", "vazio");
    li.appendChild(criar("span", "emoji", tarefas.length ? "🔎" : "🗒️"));
    li.appendChild(document.createTextNode(tarefas.length ? "Nenhuma tarefa encontrada." : "Nenhuma tarefa por enquanto. Adicione a primeira!"));
    ul.appendChild(li);
  }
  for (const t of lista) ul.appendChild(criarItem(t));

  $("contador").textContent = lista.length + " tarefa(s) exibida(s)";
  $("btnLimpar").textContent = confirmandoLimpeza ? "Confirmar?" : "Limpar concluídas";
  $("btnLimpar").className = "btn btn-sm " + (confirmandoLimpeza ? "btn-danger" : "btn-ghost");
}

function desenhar() { desenharResumo(); desenharLista(); }

// Executa uma ação; trata erros; salva e redesenha
function executar(acao, mensagem) {
  try {
    acao();
    salvar();
    if (mensagem) toast(mensagem, "success");
  } catch (erro) {
    toast(erro.message, "warn");
  }
  desenhar();
}

function adicionar() {
  executar(() => {
    adicionarTarefa($("titulo").value, Number($("prioridade").value), $("horario").value);
    $("titulo").value = "";
    $("horario").value = "";
    $("titulo").focus();
  }, "Tarefa adicionada!");
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  $("btnTema").textContent = tema === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem(CHAVE + "-tema", tema); } catch (e) {}
}

function iniciar() {
  $("dataHoje").textContent = new Date().toLocaleDateString("pt-BR",
    { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  $("btnAdicionar").addEventListener("click", adicionar);
  $("titulo").addEventListener("keydown", (e) => { if (e.key === "Enter") adicionar(); });
  $("busca").addEventListener("input", desenharLista);

  $("filtros").addEventListener("click", (e) => {
    const botao = e.target.closest("[data-filtro]");
    if (!botao) return;
    filtro = botao.dataset.filtro;
    document.querySelectorAll("#filtros button").forEach((b) => b.classList.toggle("ativo", b === botao));
    desenharLista();
  });

  // Limpar concluídas em dois cliques (sem confirm(), que pode ser bloqueado)
  $("btnLimpar").addEventListener("click", () => {
    if (!tarefas.some((t) => t.feita)) { toast("Não há tarefas concluídas.", "warn"); return; }
    if (!confirmandoLimpeza) {
      confirmandoLimpeza = true;
      desenharLista();
      setTimeout(() => { confirmandoLimpeza = false; desenharLista(); }, 3000);
      return;
    }
    confirmandoLimpeza = false;
    executar(() => limparConcluidas(), "Tarefas concluídas removidas");
  });

  $("btnTema").addEventListener("click", () => {
    aplicarTema(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  let tema = "light";
  try { tema = localStorage.getItem(CHAVE + "-tema") || "light"; } catch (e) {}
  aplicarTema(tema);

  carregar();
  desenhar();
}

// Só inicia depois que o HTML estiver carregado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}
