// Espera o HTML carregar antes de rodar (evita erro em playgrounds)
document.addEventListener("DOMContentLoaded", function () {

// ---------- Dados ----------
const tarefas = [];
let proximoCodigo = 1;
let filtro = "todas";
const NOMES = { 1: "Alta", 2: "Média", 3: "Baixa" };

// ---------- Validações ----------
function validarTitulo(titulo) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
}

function validarPrioridade(prioridade) {
  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) throw new Error("Tarefa " + codigo + " não encontrada.");
  return tarefa;
}

// ---------- Funcionalidades ----------
function cadastrarTarefa(titulo, prioridade) {
  validarTitulo(titulo);
  validarPrioridade(prioridade);
  const tarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false,
  };
  tarefas.push(tarefa);
  return tarefa;
}

function concluirTarefa(codigo) {
  buscarTarefa(codigo).concluida = true;
}

function alterarPrioridade(codigo, novaPrioridade) {
  validarPrioridade(novaPrioridade);
  buscarTarefa(codigo).prioridade = novaPrioridade;
}

// ---------- Interface ----------
const botaoCadastrar = document.getElementById("cadastrar");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const caixaErro = document.getElementById("erro");
const lista = document.getElementById("lista");

function mostrarErro(msg) {
  caixaErro.textContent = msg;
  caixaErro.classList.toggle("ativo", Boolean(msg));
}

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

// Pendentes primeiro, ordenadas por prioridade
function tarefasVisiveis() {
  return tarefas
    .filter((t) =>
      filtro === "todas" ? true : filtro === "concluidas" ? t.concluida : !t.concluida
    )
    .sort((a, b) => a.concluida - b.concluida || a.prioridade - b.prioridade || a.codigo - b.codigo);
}

function renderizar() {
  lista.replaceChildren();
  const visiveis = tarefasVisiveis();

  if (visiveis.length === 0) {
    const li = el("li");
    li.appendChild(el("p", "vazio", "Nenhuma tarefa para mostrar."));
    lista.appendChild(li);
  }

  visiveis.forEach((t) => {
    const li = el("li", "tarefa" + (t.concluida ? " concluida" : ""));
    li.appendChild(el("span", "codigo", "#" + t.codigo));

    const info = el("div", "info");
    info.appendChild(el("div", "titulo", t.titulo));
    const meta = el("div", "meta");
    meta.appendChild(el("span", "badge p" + t.prioridade, NOMES[t.prioridade]));
    meta.append(" · " + (t.concluida ? "Concluída" : "Pendente"));
    info.appendChild(meta);
    li.appendChild(info);

    const acoes = el("div", "acoes");
    const sel = el("select");
    sel.setAttribute("aria-label", "Alterar prioridade da tarefa " + t.codigo);
    [1, 2, 3].forEach((p) => {
      const o = el("option", "", p + " – " + NOMES[p]);
      o.value = String(p);
      o.selected = p === t.prioridade;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () => executar(() => alterarPrioridade(t.codigo, Number(sel.value))));

    const btn = el("button", "concluir", "Concluir");
    btn.disabled = t.concluida;
    btn.addEventListener("click", () => executar(() => concluirTarefa(t.codigo)));

    acoes.append(sel, btn);
    li.appendChild(acoes);
    lista.appendChild(li);
  });

  document.querySelectorAll("[data-filtro]").forEach((b) => {
    b.classList.toggle("ativo", b.dataset.filtro === filtro);
  });
}

// Executa uma ação, trata erros de validação e redesenha a lista
function executar(acao) {
  try {
    acao();
    mostrarErro("");
  } catch (erro) {
    mostrarErro(erro.message);
  }
  renderizar();
}

function cadastrar() {
  try {
    cadastrarTarefa(inputTitulo.value, Number(selectPrioridade.value));
    inputTitulo.value = "";
    mostrarErro("");
    inputTitulo.focus();
  } catch (erro) {
    mostrarErro(erro.message);
  }
  renderizar();
}

// Sem <form>: o playground bloqueia o envio de formulários
botaoCadastrar.addEventListener("click", cadastrar);
inputTitulo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") cadastrar();
});

document.querySelectorAll("[data-filtro]").forEach((b) => {
  b.addEventListener("click", () => {
    filtro = b.dataset.filtro;
    renderizar();
  });
});

renderizar();

});