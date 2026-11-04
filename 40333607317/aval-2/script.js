
// Coleção central de tarefas e gerador independente de códigos.
const tarefas = [];
let proximoCodigo = 0;

const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const totalTarefas = document.getElementById("totalTarefas");
const buscaCodigo = document.getElementById("buscaCodigo");
const resultadoBusca = document.getElementById("resultadoBusca");

const nomesPrioridade = {
  1: { texto: "Alta", classe: "alta" },
  2: { texto: "Média", classe: "media" },
  3: { texto: "Baixa", classe: "baixa" }
};

// Valida os dados antes do cadastro ou da alteração da prioridade.
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve possuir no mínimo 5 caracteres.");
  }

  const numeroPrioridade = Number(prioridade);

  if (
    !Number.isInteger(numeroPrioridade) ||
    numeroPrioridade < 1 ||
    numeroPrioridade > 3
  ) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }

  return true;
}

// Cadastra uma tarefa com código automático e status inicial em execução.
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  proximoCodigo += 1;

  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

// Retorna a coleção de tarefas cadastradas.
function listarTarefas() {
  return tarefas;
}

// Localiza uma tarefa pelo código informado.
function buscarTarefa(codigo) {
  const tarefa = tarefas.find(
    item => item.codigo === Number(codigo)
  );

  if (!tarefa) {
    throw new Error("Nenhuma tarefa foi encontrada com esse código.");
  }

  return tarefa;
}

// Marca uma tarefa como concluída, sem permitir conclusão duplicada.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Essa tarefa já está concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

// Altera a prioridade reutilizando a validação já existente.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = Number(novaPrioridade);
  return tarefa;
}

// Exibe mensagens de sucesso ou erro para o usuário.
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

// Cria os elementos da lista sem inserir texto do usuário como HTML.
function criarElementoTarefa(tarefa) {
  const item = document.createElement("article");
  item.className = `tarefa ${tarefa.status ? "" : "tarefa-concluida"}`;

  const codigo = document.createElement("div");
  codigo.className = "codigo";
  codigo.textContent = `#${tarefa.codigo}`;

  const informacoes = document.createElement("div");
  informacoes.className = "tarefa-info";

  const titulo = document.createElement("strong");
  titulo.className = "tarefa-titulo";
  titulo.textContent = tarefa.titulo;

  const meta = document.createElement("div");
  meta.className = "meta-tarefa";

  const prioridade = document.createElement("span");
  prioridade.className =
    `prioridade ${nomesPrioridade[tarefa.prioridade].classe}`;

  prioridade.textContent =
    `Prioridade ${tarefa.prioridade} · ${nomesPrioridade[tarefa.prioridade].texto}`;

  const status = document.createElement("span");
  status.textContent = tarefa.status
    ? "Em andamento"
    : "Concluída";

  meta.append(prioridade, status);
  informacoes.append(titulo, meta);

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  const botaoPrioridade = document.createElement("button");
  botaoPrioridade.type = "button";
  botaoPrioridade.className = "acao";
  botaoPrioridade.textContent = "Alterar prioridade";

  botaoPrioridade.addEventListener("click", () => {
    const novaPrioridade = window.prompt(
      "Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa).",
      String(tarefa.prioridade)
    );

    if (novaPrioridade === null) return;

    try {
      alterarPrioridade(
        tarefa.codigo,
        novaPrioridade.trim()
      );

      mostrarMensagem(
        `Prioridade da tarefa #${tarefa.codigo} atualizada.`,
        "sucesso"
      );

      renderizarTarefas();
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
    }
  });

  const botaoConcluir = document.createElement("button");
  botaoConcluir.type = "button";
  botaoConcluir.className = "acao";
  botaoConcluir.textContent = tarefa.status
    ? "Concluir"
    : "Concluída";

  botaoConcluir.disabled = !tarefa.status;

  botaoConcluir.addEventListener("click", () => {
    try {
      concluirTarefa(tarefa.codigo);

      mostrarMensagem(
        `Tarefa #${tarefa.codigo} concluída com sucesso.`,
        "sucesso"
      );

      renderizarTarefas();
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
    }
  });

  acoes.append(botaoPrioridade, botaoConcluir);
  item.append(codigo, informacoes, acoes);

  return item;
}

// Atualiza a apresentação da lista e o contador.
function renderizarTarefas(colecao = listarTarefas()) {
  listaTarefas.replaceChildren();
  totalTarefas.textContent = tarefas.length;

  if (colecao.length === 0) {
    const vazio = document.createElement("div");
    vazio.className = "estado-vazio";

    const icone = document.createElement("span");
    icone.className = "icone-vazio";
    icone.textContent = "✓";

    const titulo = document.createElement("strong");
    titulo.textContent = tarefas.length === 0
      ? "Nenhuma tarefa cadastrada"
      : "Nenhuma tarefa encontrada";

    const descricao = document.createElement("p");
    descricao.textContent = tarefas.length === 0
      ? "Adicione sua primeira tarefa para começar."
      : "Confira o código informado e tente novamente.";

    vazio.append(icone, titulo, descricao);
    listaTarefas.append(vazio);

    return;
  }

  // Exibe primeiro as tarefas em andamento e depois as concluídas.
  [...colecao]
    .sort(
      (a, b) =>
        Number(b.status) - Number(a.status) ||
        a.codigo - b.codigo
    )
    .forEach(tarefa => {
      listaTarefas.append(criarElementoTarefa(tarefa));
    });
}

// Evento de cadastro.
formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();

  try {
    const tarefa = cadastrarTarefa(
      campoTitulo.value,
      campoPrioridade.value
    );

    mostrarMensagem(
      `Tarefa #${tarefa.codigo} cadastrada com sucesso!`,
      "sucesso"
    );

    formTarefa.reset();
    campoPrioridade.value = "2";

    renderizarTarefas();
    campoTitulo.focus();

  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
});

// Busca usando a função buscarTarefa, que utiliza Array.find().
document.getElementById("btnBuscar").addEventListener("click", () => {
  const codigo = buscaCodigo.value.trim();

  if (!codigo) {
    mostrarMensagem(
      "Informe um código para realizar a busca.",
      "erro"
    );
    return;
  }

  try {
    const tarefa = buscarTarefa(codigo);

    renderizarTarefas([tarefa]);

    resultadoBusca.textContent =
      `Exibindo a tarefa de código #${tarefa.codigo}.`;

    mostrarMensagem("", "");

  } catch (erro) {
    renderizarTarefas([]);
    resultadoBusca.textContent = "";
    mostrarMensagem(erro.message, "erro");
  }
});

// Limpa a busca e volta a exibir todas as tarefas.
document.getElementById("btnLimparBusca").addEventListener("click", () => {
  buscaCodigo.value = "";
  resultadoBusca.textContent = "";
  mostrarMensagem("", "");
  renderizarTarefas();
});

// Permite realizar a busca pressionando Enter.
buscaCodigo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    document.getElementById("btnBuscar").click();
  }
});

// Estado inicial da aplicação.
renderizarTarefas();
