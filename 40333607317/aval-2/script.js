// Gerenciador de Tarefas - Projeto de revisão de JavaScript

// Array central que armazena os objetos de tarefa.
const tarefas = [];
let proximoCodigo = 1;

const formTarefa = document.querySelector("#formTarefa");
const campoTitulo = document.querySelector("#titulo");
const campoPrioridade = document.querySelector("#prioridade");
const listaTarefas = document.querySelector("#listaTarefas");
const totalTarefas = document.querySelector("#totalTarefas");
const mensagem = document.querySelector("#mensagem");
const filtro = document.querySelector("#filtro");

// Valida o título e a prioridade. Erros interrompem o fluxo inválido.
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve possuir no mínimo 5 caracteres.");
  }

  const prioridadeNumerica = Number(prioridade);
  if (!Number.isInteger(prioridadeNumerica) ||
      prioridadeNumerica < 1 || prioridadeNumerica > 3) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }

  return prioridadeNumerica;
}

// Cadastra uma tarefa com código automático e status inicial verdadeiro.
function cadastrarTarefa(titulo, prioridade) {
  const prioridadeValidada = validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: prioridadeValidada,
    status: true // true = em andamento; false = concluída
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

// Retorna todas as tarefas cadastradas.
function listarTarefas() {
  return tarefas;
}

// Localiza uma tarefa pelo código usando find.
function buscarTarefa(codigo) {
  const codigoNumerico = Number(codigo);
  const tarefaEncontrada = tarefas.find(
    tarefa => tarefa.codigo === codigoNumerico
  );

  if (!tarefaEncontrada) {
    throw new Error("Não foi encontrada uma tarefa com esse código.");
  }

  return tarefaEncontrada;
}

// Altera o status de uma tarefa para concluída.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Essa tarefa já está concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

// Altera a prioridade reutilizando a função de validação.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  const prioridadeValidada = validarDadosDaTarefa(
    tarefa.titulo, novaPrioridade
  );

  tarefa.prioridade = prioridadeValidada;
  return tarefa;
}

// Exibe mensagens de sucesso ou erro para o usuário.
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

// Monta a interface a partir dos dados do array.
function renderizarTarefas() {
  const termoFiltro = filtro.value;
  let tarefasExibidas = listarTarefas();

  if (termoFiltro === "andamento") {
    tarefasExibidas = tarefasExibidas.filter(tarefa => tarefa.status);
  } else if (termoFiltro === "concluidas") {
    tarefasExibidas = tarefasExibidas.filter(tarefa => !tarefa.status);
  }

  // Em andamento primeiro; dentro de cada grupo, prioridade mais alta primeiro.
  tarefasExibidas = [...tarefasExibidas].sort((a, b) => {
    if (a.status !== b.status) return Number(b.status) - Number(a.status);
    return a.prioridade - b.prioridade;
  });

  totalTarefas.textContent = tarefas.length;

  if (tarefasExibidas.length === 0) {
    const texto = tarefas.length === 0
      ? "Adicione sua primeira tarefa usando o formulário acima."
      : "Não existem tarefas nesta categoria.";
    listaTarefas.innerHTML = `
      <div class="estado-vazio">
        <span class="icone-vazio">✓</span>
        <strong>Nenhuma tarefa por aqui</strong>
        <p>${texto}</p>
      </div>`;
    return;
  }

  listaTarefas.innerHTML = tarefasExibidas.map(tarefa => `
    <article class="tarefa ${tarefa.status ? "" : "concluida"}">
      <div class="tarefa-conteudo">
        <div class="tarefa-topo">
          <span class="codigo">#${tarefa.codigo}</span>
          <h3>${escaparHTML(tarefa.titulo)}</h3>
        </div>
        <div class="meta">
          <span class="etiqueta prioridade-${tarefa.prioridade}">
            Prioridade ${tarefa.prioridade} · ${nomePrioridade(tarefa.prioridade)}
          </span>
          <span class="etiqueta status ${tarefa.status ? "" : "finalizada"}">
            ${tarefa.status ? "Em andamento" : "Concluída"}
          </span>
        </div>
      </div>
      <div class="acoes">
        <button class="botao-acao" data-acao="concluir" data-codigo="${tarefa.codigo}"
          ${tarefa.status ? "" : "disabled"}>
          ${tarefa.status ? "Concluir" : "Concluída"}
        </button>
        <button class="botao-acao" data-acao="prioridade" data-codigo="${tarefa.codigo}">
          Alterar prioridade
        </button>
      </div>
    </article>
  `).join("");
}

function nomePrioridade(prioridade) {
  return ({ 1: "Alta", 2: "Média", 3: "Baixa" })[prioridade];
}

// Evita que um título digitado seja interpretado como HTML.
function escaparHTML(texto) {
  return texto.replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[caractere]);
}

// Evento de cadastro.
formTarefa.addEventListener("submit", evento => {
  evento.preventDefault();

  try {
    const tarefa = cadastrarTarefa(campoTitulo.value, campoPrioridade.value);
    formTarefa.reset();
    campoPrioridade.value = "2";
    renderizarTarefas();
    mostrarMensagem(`Tarefa #${tarefa.codigo} cadastrada com sucesso!`, "sucesso");
    campoTitulo.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

// Eventos dos botões da lista (delegação de eventos).
listaTarefas.addEventListener("click", evento => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const codigo = botao.dataset.codigo;

  try {
    if (botao.dataset.acao === "concluir") {
      concluirTarefa(codigo);
      mostrarMensagem(`Tarefa #${codigo} concluída com sucesso.`, "sucesso");
    } else if (botao.dataset.acao === "prioridade") {
      const novaPrioridade = prompt(
        "Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa)."
      );
      if (novaPrioridade === null) return;
      alterarPrioridade(codigo, novaPrioridade);
      mostrarMensagem(`Prioridade da tarefa #${codigo} atualizada.`, "sucesso");
    }
    renderizarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

filtro.addEventListener("change", renderizarTarefas);

// Primeira renderização.
renderizarTarefas();
