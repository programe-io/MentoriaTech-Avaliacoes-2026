// ===== MÓDULO DE DADOS =====

const tarefas = [];
let geradorDeCodigo = 0; // Código único incremental

/**
 * Valida os dados de entrada para a criação ou edição de tarefas.
 */
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }
  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }
}

/**
 * Procura uma tarefa pelo seu código.
 */
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error(`Código ${codigo} não encontrado.`);
  }
  return tarefa;
}

/**
 * Regista uma nova tarefa no array.
 */
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;
  const tarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true, // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
  return tarefa;
}

/**
 * Retorna a lista de tarefas atual.
 */
function listarTarefas() {
  return tarefas;
}

/**
 * Marca uma tarefa como concluída.
 */
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error(`A tarefa ${codigo} já estava concluída.`);
  }
  tarefa.status = false;
}

/**
 * Altera a prioridade de uma tarefa existente.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

// ===== MÓDULO DE INTERFACE (DOM) =====

const form = document.getElementById("form-cadastro");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaEl = document.getElementById("lista");
const vazioEl = document.getElementById("vazio");
const mensagemEl = document.getElementById("mensagem");

const NOMES_PRIORIDADE = { 
  1: "1 – Alta", 
  2: "2 – Média", 
  3: "3 – Baixa" 
};

/**
 * Exibe uma mensagem de feedback para o utilizador.
 */
function mostrarMensagem(texto, sucesso = false) {
  mensagemEl.textContent = texto;
  mensagemEl.classList.toggle("sucesso", Boolean(sucesso));
  mensagemEl.hidden = false;
}

/**
 * Oculta a mensagem de feedback.
 */
function limparMensagem() {
  mensagemEl.hidden = true;
  mensagemEl.textContent = "";
}

/**
 * Wrapper para executar ações capturando exceções e atualizando a interface.
 */
function executar(acao, mensagemOk) {
  try {
    acao();
    if (mensagemOk) {
      mostrarMensagem(mensagemOk, true);
    } else {
      limparMensagem();
    }
    return true;
  } catch (erro) {
    mostrarMensagem(erro.message, false);
    return false;
  } finally {
    renderizar();
  }
}

/**
 * Auxiliar para a criação de elementos DOM.
 */
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

/**
 * Renderiza a lista de tarefas no DOM.
 */
function renderizar() {
  const dados = listarTarefas();
  listaEl.replaceChildren();
  vazioEl.hidden = dados.length > 0;

  dados.forEach((tarefa) => {
    const item = criarElemento("li", `tarefa ${tarefa.status ? "" : "concluida"}`);

    // Informações da tarefa
    item.append(
      criarElemento("span", "tarefa-codigo", `#${tarefa.codigo}`),
      criarElemento("span", "tarefa-titulo", tarefa.titulo)
    );

    const acoes = criarElemento("div", "tarefa-acoes");

    // Seleção de Prioridade
    const seletor = criarElemento("select");
    seletor.setAttribute("aria-label", `Prioridade da tarefa ${tarefa.codigo}`);
    
    [1, 2, 3].forEach((p) => {
      const op = criarElemento("option", "", NOMES_PRIORIDADE[p]);
      op.value = String(p);
      op.selected = p === tarefa.prioridade;
      seletor.append(op);
    });

    seletor.addEventListener("change", () => {
      executar(
        () => alterarPrioridade(tarefa.codigo, Number(seletor.value)),
        `Prioridade da tarefa ${tarefa.codigo} alterada.`
      );
    });

    // Botão Concluir
    const botao = criarElemento("button", "botao", tarefa.status ? "Concluir" : "Concluída");
    botao.type = "button";
    botao.disabled = !tarefa.status;
    botao.addEventListener("click", () => {
      executar(
        () => concluirTarefa(tarefa.codigo),
        `Tarefa ${tarefa.codigo} concluída.`
      );
    });

    // Indicador de Status
    const status = criarElemento("span", "status", tarefa.status ? "Em execução" : "Concluída");

    acoes.append(seletor, botao, status);
    item.append(acoes);
    listaEl.append(item);
  });
}

// ===== EVENTOS =====

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = campoTitulo.value.trim();
  const prioridade = Number(campoPrioridade.value);

  const cadastrou = executar(
    () => cadastrarTarefa(titulo, prioridade),
    "Tarefa cadastrada com sucesso!"
  );

  if (cadastrou) {
    campoTitulo.value = "";
    campoTitulo.focus();
  }
});

// Inicialização
renderizar();