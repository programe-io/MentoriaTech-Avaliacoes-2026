
let tarefas = [];
let proximoCodigo = 0;
let filtroAtual = "todas";

const formCadastro = document.getElementById("formCadastro");
const formPrioridade = document.getElementById("formPrioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const busca = document.getElementById("busca");
const vazio = document.getElementById("vazio");

// Valida o título e a prioridade.
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.trim().length < 5) {
    throw new Error(
      "O título deve ter no mínimo cinco caracteres."
    );
  }

  if (
    !Number.isInteger(prioridade) ||
    prioridade < 1 ||
    prioridade > 3
  ) {
    throw new Error("A prioridade deve ser 1, 2 ou 3.");
  }
}

// Cadastra uma tarefa.
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  proximoCodigo++;

  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true
  };

  tarefas.push(novaTarefa);

  return novaTarefa;
}

// Retorna as tarefas cadastradas.
function listarTarefas() {
  return tarefas;
}

// Busca uma tarefa pelo código.
function buscarTarefa(codigo) {
  const tarefa = tarefas.find(
    (item) => item.codigo === codigo
  );

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

// Conclui uma tarefa.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já foi concluída.");
  }

  tarefa.status = false;
}

// Altera a prioridade.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
  );

  tarefa.prioridade = novaPrioridade;
}

function nomePrioridade(prioridade) {
  const nomes = {
    1: "Alta",
    2: "Média",
    3: "Baixa"
  };

  return nomes[prioridade];
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function executarComTratamento(acao) {
  try {
    acao();
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

// Atualiza a lista e os contadores da tela.
function renderizarTarefas() {
  const termo = busca.value.trim().toLowerCase();

  const filtradas = listarTarefas().filter((tarefa) => {
    const correspondeBusca =
      tarefa.titulo.toLowerCase().includes(termo) ||
      String(tarefa.codigo).includes(termo);

    const correspondeFiltro =
      filtroAtual === "todas" ||
      (filtroAtual === "pendentes" && tarefa.status) ||
      (filtroAtual === "concluidas" && !tarefa.status);

    return correspondeBusca && correspondeFiltro;
  });

  listaTarefas.innerHTML = "";

  filtradas.forEach((tarefa) => {
    const cartao = document.createElement("article");
    cartao.className =
      `tarefa ${tarefa.status ? "" : "concluida"}`;

    const conteudo = document.createElement("div");
    const topo = document.createElement("div");
    topo.className = "topo-tarefa";

    const codigo = document.createElement("span");
    codigo.className = "codigo";
    codigo.textContent = `TAREFA #${tarefa.codigo}`;

    const prioridade = document.createElement("span");
    prioridade.className =
      `etiqueta prioridade-${tarefa.prioridade}`;
    prioridade.textContent =
      `Prioridade ${tarefa.prioridade} — ${nomePrioridade(tarefa.prioridade)}`;

    topo.append(codigo, prioridade);

    const titulo = document.createElement("p");
    titulo.className = "titulo-tarefa";
    titulo.textContent = tarefa.titulo;

    const status = document.createElement("p");
    status.className = "status-tarefa";
    status.textContent = tarefa.status
      ? "Em andamento"
      : "Concluída";

    conteudo.append(topo, titulo, status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoConcluir = document.createElement("button");
    botaoConcluir.type = "button";
    botaoConcluir.className = "acao";
    botaoConcluir.textContent = tarefa.status
      ? "✓ Concluir"
      : "Concluída";
    botaoConcluir.disabled = !tarefa.status;

    botaoConcluir.addEventListener("click", () => {
      executarComTratamento(() => {
        concluirTarefa(tarefa.codigo);
        renderizarTarefas();
        mostrarMensagem(
          "Tarefa concluída com sucesso!",
          "sucesso"
        );
      });
    });

    const botaoPrioridade = document.createElement("button");
    botaoPrioridade.type = "button";
    botaoPrioridade.className = "acao";
    botaoPrioridade.textContent = "Alterar prioridade";

    botaoPrioridade.addEventListener("click", () => {
      document.getElementById("codigoPrioridade").value =
        tarefa.codigo;

      document.getElementById("novaPrioridade").value =
        String(tarefa.prioridade);

      document.getElementById("novaPrioridade").focus();
    });

    acoes.append(botaoConcluir, botaoPrioridade);
    cartao.append(conteudo, acoes);
    listaTarefas.appendChild(cartao);
  });

  vazio.style.display =
    filtradas.length === 0 ? "block" : "none";

  document.getElementById("totalTarefas").textContent =
    tarefas.length;

  document.getElementById("tarefasConcluidas").textContent =
    tarefas.filter((tarefa) => !tarefa.status).length;

  document.getElementById("tarefasPendentes").textContent =
    tarefas.filter((tarefa) => tarefa.status).length;
}

// Cadastro.
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  executarComTratamento(() => {
    const titulo =
      document.getElementById("titulo").value;

    const prioridade =
      Number(document.getElementById("prioridade").value);

    const tarefa = cadastrarTarefa(titulo, prioridade);

    formCadastro.reset();
    document.getElementById("prioridade").value = "2";

    renderizarTarefas();

    mostrarMensagem(
      `Tarefa cadastrada! Código: ${tarefa.codigo}.`,
      "sucesso"
    );
  });
});

// Alteração de prioridade.
formPrioridade.addEventListener("submit", (evento) => {
  evento.preventDefault();

  executarComTratamento(() => {
    const codigo =
      Number(document.getElementById("codigoPrioridade").value);

    const prioridade =
      Number(document.getElementById("novaPrioridade").value);

    alterarPrioridade(codigo, prioridade);

    formPrioridade.reset();
    renderizarTarefas();

    mostrarMensagem(
      "Prioridade alterada com sucesso!",
      "sucesso"
    );
  });
});

// Pesquisa por título ou código.
busca.addEventListener("input", renderizarTarefas);

// Filtros de tarefas.
document.querySelectorAll("[data-filtro]").forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;

    document.querySelectorAll("[data-filtro]").forEach((item) => {
      item.classList.toggle("ativo", item === botao);
    });

    renderizarTarefas();
  });
});

renderizarTarefas();
