
"use strict";

// Coleção central de tarefas
let tarefas = [];
let proximoCodigo = 1;
let filtroAtual = "todas";
let codigoEmEdicao = null;

// Elementos da página
const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const campoPesquisa = document.getElementById("pesquisa");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");
const mensagem = document.getElementById("mensagem");
const btnLimparConcluidas =
  document.getElementById("btnLimparConcluidas");

// Exibe mensagens de sucesso ou erro
let temporizadorMensagem;

function mostrarMensagem(texto, erro = false) {
  clearTimeout(temporizadorMensagem);

  mensagem.textContent = texto;
  mensagem.className = erro
    ? "mensagem visivel erro"
    : "mensagem visivel";

  temporizadorMensagem = setTimeout(() => {
    mensagem.className = "mensagem";
  }, 3000);
}

// Valida os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error(
      "O título deve possuir pelo menos cinco caracteres."
    );
  }

  if (titulo.trim().length > 120) {
    throw new Error("O título deve ter no máximo 120 caracteres.");
  }

  if (
    prioridade !== 1 &&
    prioridade !== 2 &&
    prioridade !== 3
  ) {
    throw new Error("A prioridade deve ser 1, 2 ou 3.");
  }
}

// Busca uma tarefa pelo código usando find
function buscarTarefa(codigo) {
  const tarefa = tarefas.find(
    (item) => item.codigo === Number(codigo)
  );

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

// Salva os dados no navegador
function salvarDados() {
  try {
    localStorage.setItem("taskflow_tarefas", JSON.stringify(tarefas));
    localStorage.setItem(
      "taskflow_proximo_codigo",
      String(proximoCodigo)
    );
  } catch (erro) {
    console.error("Não foi possível salvar os dados:", erro);
    mostrarMensagem(
      "Não foi possível salvar no navegador. Verifique o armazenamento.",
      true
    );
  }
}

// Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  const tituloLimpo = titulo.trim();
  const prioridadeNumero = Number(prioridade);

  validarDadosDaTarefa(tituloLimpo, prioridadeNumero);

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: tituloLimpo,
    prioridade: prioridadeNumero,
    status: true
  };

  tarefas.push(novaTarefa);
  salvarDados();

  return novaTarefa;
}

// Retorna as tarefas cadastradas
function listarTarefas() {
  return tarefas;
}

// Conclui uma tarefa
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Esta tarefa já foi concluída.");
  }

  tarefa.status = false;
  salvarDados();

  return tarefa;
}

// Reabre uma tarefa, caso seja necessário
function reabrirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status) {
    throw new Error("Esta tarefa já está pendente.");
  }

  tarefa.status = true;
  salvarDados();

  return tarefa;
}

// Altera a prioridade de uma tarefa existente
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  const prioridadeNumero = Number(novaPrioridade);

  // Reaproveita a validação do projeto
  validarDadosDaTarefa(tarefa.titulo, prioridadeNumero);

  tarefa.prioridade = prioridadeNumero;
  salvarDados();

  return tarefa;
}

// Exclui uma tarefa pelo código
function excluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  tarefas = tarefas.filter(
    (item) => item.codigo !== tarefa.codigo
  );

  salvarDados();
}

// Cria elementos de texto com segurança
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  elemento.textContent = texto;

  return elemento;
}

// Monta o cartão de cada tarefa
function criarCartaoTarefa(tarefa) {
  const cartao = document.createElement("article");
  cartao.className = tarefa.status
    ? "tarefa"
    : "tarefa concluida";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "check-tarefa";
  checkbox.checked = !tarefa.status;
  checkbox.setAttribute(
    "aria-label",
    `Concluir tarefa ${tarefa.titulo}`
  );

  checkbox.addEventListener("change", () => {
    try {
      if (checkbox.checked) {
        concluirTarefa(tarefa.codigo);
        mostrarMensagem("Tarefa concluída!");
      } else {
        reabrirTarefa(tarefa.codigo);
        mostrarMensagem("Tarefa reaberta.");
      }

      renderizarTarefas();
    } catch (erro) {
      mostrarMensagem(erro.message, true);
      renderizarTarefas();
    }
  });

  const conteudo = document.createElement("div");
  conteudo.className = "conteudo-tarefa";

  const titulo = criarElemento(
    "h3",
    "titulo-tarefa",
    tarefa.titulo
  );

  const meta = document.createElement("div");
  meta.className = "meta-tarefa";

  meta.appendChild(
    criarElemento("span", "", `Código #${tarefa.codigo}`)
  );

  const nomesPrioridade = {
    1: "Alta",
    2: "Média",
    3: "Baixa"
  };

  const prioridade = criarElemento(
    "span",
    `prioridade prioridade-${tarefa.prioridade}`,
    `Prioridade ${nomesPrioridade[tarefa.prioridade]}`
  );

  // Permite alterar a prioridade diretamente na lista
  prioridade.title = "Clique para alterar a prioridade";
  prioridade.tabIndex = 0;
  prioridade.setAttribute("role", "button");
  prioridade.setAttribute(
    "aria-label",
    `Alterar prioridade da tarefa ${tarefa.titulo}`
  );

  function pedirPrioridade() {
    const resposta = prompt(
      "Informe a nova prioridade:\n1 = Alta\n2 = Média\n3 = Baixa",
      String(tarefa.prioridade)
    );

    if (resposta === null) return;

    try {
      alterarPrioridade(tarefa.codigo, Number(resposta));
      mostrarMensagem("Prioridade atualizada!");
      renderizarTarefas();
    } catch (erro) {
      mostrarMensagem(erro.message, true);
    }
  }

  prioridade.addEventListener("click", pedirPrioridade);
  prioridade.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      pedirPrioridade();
    }
  });

  meta.appendChild(prioridade);

  meta.appendChild(
    criarElemento(
      "span",
      "status-tarefa",
      tarefa.status ? "Em andamento" : "Concluída"
    )
  );

  conteudo.append(titulo, meta);

  const acoes = document.createElement("div");
  acoes.className = "acoes-tarefa";

  const btnEditar = criarElemento(
    "button",
    "btn-editar",
    "Editar"
  );
  btnEditar.type = "button";
  btnEditar.addEventListener("click", () => {
    iniciarEdicao(tarefa);
  });

  const btnExcluir = criarElemento(
    "button",
    "btn-excluir",
    "Excluir"
  );
  btnExcluir.type = "button";
  btnExcluir.addEventListener("click", () => {
    const confirmou = confirm(
      `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmou) return;

    try {
      excluirTarefa(tarefa.codigo);

      if (codigoEmEdicao === tarefa.codigo) {
        cancelarEdicao();
      }

      renderizarTarefas();
      mostrarMensagem("Tarefa excluída.");
    } catch (erro) {
      mostrarMensagem(erro.message, true);
    }
  });

  acoes.append(btnEditar, btnExcluir);
  cartao.append(checkbox, conteudo, acoes);

  return cartao;
}

// Filtra, pesquisa e apresenta as tarefas
function renderizarTarefas() {
  const termo = campoPesquisa.value.trim().toLocaleLowerCase("pt-BR");

  const tarefasFiltradas = listarTarefas().filter((tarefa) => {
    const correspondePesquisa =
      tarefa.titulo.toLocaleLowerCase("pt-BR").includes(termo) ||
      String(tarefa.codigo).includes(termo);

    const correspondeFiltro =
      filtroAtual === "todas" ||
      (filtroAtual === "pendentes" && tarefa.status) ||
      (filtroAtual === "concluidas" && !tarefa.status);

    return correspondePesquisa && correspondeFiltro;
  });

  listaTarefas.replaceChildren();

  if (tarefasFiltradas.length === 0) {
    const vazio = document.createElement("div");
    vazio.className = "mensagem-vazia";

    vazio.appendChild(
      criarElemento("span", "icone-vazio", "✓")
    );

    vazio.appendChild(
      criarElemento("h3", "", "Nenhuma tarefa encontrada")
    );

    vazio.appendChild(
      criarElemento(
        "p",
        "",
        termo
          ? "Tente pesquisar por outro termo."
          : "Adicione uma nova tarefa para começar."
      )
    );

    listaTarefas.appendChild(vazio);
  } else {
    tarefasFiltradas.forEach((tarefa) => {
      listaTarefas.appendChild(criarCartaoTarefa(tarefa));
    });
  }

  atualizarResumo();

  document.getElementById("contadorVisivel").textContent =
    `${tarefasFiltradas.length} ${
      tarefasFiltradas.length === 1 ? "tarefa exibida" : "tarefas exibidas"
    }`;

  btnLimparConcluidas.disabled =
    !tarefas.some((tarefa) => !tarefa.status);
}

// Atualiza os cartões de resumo
function atualizarResumo() {
  document.getElementById("totalTarefas").textContent =
    tarefas.length;

  document.getElementById("totalPendentes").textContent =
    tarefas.filter((tarefa) => tarefa.status).length;

  document.getElementById("totalConcluidas").textContent =
    tarefas.filter((tarefa) => !tarefa.status).length;

  document.getElementById("totalAlta").textContent =
    tarefas.filter(
      (tarefa) => tarefa.status && tarefa.prioridade === 1
    ).length;
}

// Prepara o formulário para edição
function iniciarEdicao(tarefa) {
  codigoEmEdicao = tarefa.codigo;

  campoTitulo.value = tarefa.titulo;
  campoPrioridade.value = String(tarefa.prioridade);

  tituloFormulario.textContent = `Editar tarefa #${tarefa.codigo}`;
  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.hidden = false;

  document.querySelector(".painel").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  campoTitulo.focus();
}

// Retorna o formulário ao modo de cadastro
function cancelarEdicao() {
  codigoEmEdicao = null;
  form.reset();

  campoPrioridade.value = "2";
  tituloFormulario.textContent = "Nova tarefa";
  btnSalvar.textContent = "+ Adicionar";
  btnCancelar.hidden = true;
}

// Cadastra ou salva as alterações
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  try {
    const titulo = campoTitulo.value;
    const prioridade = Number(campoPrioridade.value);

    validarDadosDaTarefa(titulo.trim(), prioridade);

    if (codigoEmEdicao !== null) {
      const tarefa = buscarTarefa(codigoEmEdicao);

      tarefa.titulo = titulo.trim();

      // Reutiliza a função de atualização e validação
      alterarPrioridade(codigoEmEdicao, prioridade);

      salvarDados();
      cancelarEdicao();
      mostrarMensagem("Tarefa atualizada com sucesso!");
    } else {
      cadastrarTarefa(titulo, prioridade);
      cancelarEdicao();
      mostrarMensagem("Tarefa cadastrada com sucesso!");
    }

    renderizarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

btnCancelar.addEventListener("click", cancelarEdicao);

campoPesquisa.addEventListener("input", renderizarTarefas);

// Alterna os filtros da listagem
document.querySelectorAll(".filtro").forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;

    document.querySelectorAll(".filtro").forEach((item) => {
      item.classList.toggle("ativo", item === botao);
    });

    renderizarTarefas();
  });
});

// Remove todas as tarefas já concluídas
btnLimparConcluidas.addEventListener("click", () => {
  const quantidade = tarefas.filter(
    (tarefa) => !tarefa.status
  ).length;

  if (quantidade === 0) {
    mostrarMensagem("Não há tarefas concluídas para remover.", true);
    return;
  }

  if (!confirm(`Deseja remover ${quantidade} tarefa(s) concluída(s)?`)) {
    return;
  }

  tarefas = tarefas.filter((tarefa) => tarefa.status);

  if (
    codigoEmEdicao !== null &&
    !tarefas.some((tarefa) => tarefa.codigo === codigoEmEdicao)
  ) {
    cancelarEdicao();
  }

  salvarDados();
  renderizarTarefas();
  mostrarMensagem("Tarefas concluídas removidas.");
});

// Carrega os dados previamente salvos
function carregarDados() {
  try {
    const dados = localStorage.getItem("taskflow_tarefas");
    const codigoSalvo = localStorage.getItem(
      "taskflow_proximo_codigo"
    );

    if (dados !== null) {
      const tarefasSalvas = JSON.parse(dados);

      if (Array.isArray(tarefasSalvas)) {
        const codigos = new Set();

        tarefas = tarefasSalvas.filter((tarefa) => {
          const valida =
            tarefa &&
            Number.isSafeInteger(tarefa.codigo) &&
            tarefa.codigo > 0 &&
            !codigos.has(tarefa.codigo) &&
            typeof tarefa.titulo === "string" &&
            tarefa.titulo.trim().length >= 5 &&
            [1, 2, 3].includes(tarefa.prioridade) &&
            typeof tarefa.status === "boolean";

          if (valida) {
            codigos.add(tarefa.codigo);
          }

          return valida;
        });
      }
    }

    const maiorCodigo = tarefas.reduce(
      (maior, tarefa) => Math.max(maior, tarefa.codigo),
      0
    );

    const codigoNumerico = Number(codigoSalvo);

    proximoCodigo = Number.isSafeInteger(codigoNumerico) &&
      codigoNumerico > maiorCodigo
      ? codigoNumerico
      : maiorCodigo + 1;
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
    tarefas = [];
    proximoCodigo = 1;
  }
}

// Inicializa a aplicação
function iniciarAplicacao() {
  const agora = new Date();

  document.getElementById("dataHoje").textContent =
    agora.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  carregarDados();
  renderizarTarefas();
}

iniciarAplicacao();