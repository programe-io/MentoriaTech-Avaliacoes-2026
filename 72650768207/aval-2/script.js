// ============================================================
// Gerenciador de Tarefas
// Cada tarefa: { codigo, titulo, prioridade, status }
// status = true  -> tarefa em execução (não concluída)
// status = false -> tarefa concluída
// ============================================================

// Array que armazena todas as tarefas cadastradas
const tarefas = [];

// Gerador de código independente do tamanho do array
// (evita códigos duplicados caso uma tarefa seja removida no futuro)
let geradorDeCodigo = 0;

// ---------- Funções do sistema ----------

// Valida título (mínimo 5 caracteres) e prioridade (entre 1 e 3)
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3 || isNaN(prioridade)) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }
}

// Busca uma tarefa pelo código usando find
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código " + codigo + " não encontrado.");
  }
  return tarefa;
}

// Cadastra uma nova tarefa (código e status são definidos pelo algoritmo)
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;
  const novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true, // true = em execução
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

// Retorna as tarefas cadastradas (retornar não é o mesmo que exibir)
function listarTarefas() {
  return tarefas;
}

// Marca uma tarefa como concluída
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false; // false = concluída
  return tarefa;
}

// Altera a prioridade reaproveitando a validação existente
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// ---------- Interface (DOM) ----------

const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");
const resumo = document.getElementById("resumo");

const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

// Executa uma ação e mostra o erro (se houver) na tela
function executar(acao, textoSucesso) {
  try {
    acao();
    mostrarMensagem(textoSucesso, "sucesso");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
  renderizar();
}

function renderizar() {
  const todas = listarTarefas();
  lista.innerHTML = "";

  const emAndamento = todas.filter((t) => t.status).length;
  resumo.textContent = todas.length === 0
    ? "Nenhuma tarefa cadastrada"
    : todas.length + " tarefa(s): " + emAndamento + " em andamento, " +
      (todas.length - emAndamento) + " concluída(s)";

  if (todas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Cadastre a primeira tarefa no formulário acima.";
    lista.appendChild(vazio);
    return;
  }

  todas.forEach((t) => {
    const li = document.createElement("li");
    li.className = "tarefa p" + t.prioridade + (t.status ? "" : " feita");

    const cod = document.createElement("span");
    cod.className = "codigo";
    cod.textContent = "#" + t.codigo;

    const info = document.createElement("div");
    info.className = "info";
    const h3 = document.createElement("h3");
    h3.textContent = t.titulo;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.append("Prioridade " + t.prioridade + " (" + NOMES_PRIORIDADE[t.prioridade] + ") ");
    const selo = document.createElement("span");
    selo.className = "selo " + (t.status ? "andamento" : "concluida");
    selo.textContent = t.status ? "Em andamento" : "Concluída";
    meta.appendChild(selo);
    info.append(h3, meta);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const sel = document.createElement("select");
    sel.setAttribute("aria-label", "Prioridade da tarefa " + t.codigo);
    [1, 2, 3].forEach((p) => {
      const op = document.createElement("option");
      op.value = p;
      op.textContent = p + " – " + NOMES_PRIORIDADE[p];
      if (p === t.prioridade) op.selected = true;
      sel.appendChild(op);
    });
    sel.addEventListener("change", () =>
      executar(
        () => alterarPrioridade(t.codigo, Number(sel.value)),
        "Prioridade da tarefa " + t.codigo + " alterada."
      )
    );

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Concluir";
    btn.disabled = !t.status;
    btn.addEventListener("click", () =>
      executar(() => concluirTarefa(t.codigo), "Tarefa " + t.codigo + " concluída.")
    );

    acoes.append(sel, btn);
    li.append(cod, info, acoes);
    lista.appendChild(li);
  });
}

function aoCadastrar() {
  executar(() => {
    cadastrarTarefa(inputTitulo.value, Number(selectPrioridade.value));
    inputTitulo.value = "";
    inputTitulo.focus();
  }, "Tarefa cadastrada com sucesso.");
}

btnCadastrar.addEventListener("click", aoCadastrar);
inputTitulo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") aoCadastrar();
});

renderizar();