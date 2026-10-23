
"use strict";

// ========================================
// 1. CONFIGURAÇÕES E ARMAZENAMENTO
// ========================================

const CHAVE_STORAGE = "taskflow_tarefas";
const PRIORIDADES = {
  1: "Alta",
  2: "Média",
  3: "Baixa"
};

let tarefas = [];
let proximoCodigo = 1;

const formTarefa = document.querySelector("#form-tarefa");
const campoTitulo = document.querySelector("#titulo");
const campoPrioridade = document.querySelector("#prioridade");
const filtro = document.querySelector("#filtro");
const pesquisa = document.querySelector("#pesquisa");
const listaTarefas = document.querySelector("#listaTarefas");
const vazio = document.querySelector("#vazio");
const totalTarefas = document.querySelector("#totalTarefas");
const totalPendentes = document.querySelector("#totalPendentes");
const totalConcluidas = document.querySelector("#totalConcluidas");
const mensagem = document.querySelector("#mensagem");

// ========================================
// 2. FUNÇÕES AUXILIARES
// ========================================

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("error", erro);
}

function salvarTarefas() {
  try {
    localStorage.setItem(
      CHAVE_STORAGE,
      JSON.stringify({ tarefas, proximoCodigo })
    );
  } catch {
    mostrarMensagem(
      "Não foi possível salvar os dados no navegador.",
      true
    );
  }
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);

  if (classe) {
    elemento.className = classe;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

// ========================================
// 3. VALIDAR DADOS
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 10) {
    throw new Error(
      "O título deve ter pelo menos 10 caracteres."
    );
  }

  if (titulo.trim().length > 120) {
    throw new Error(
      "O título deve ter no máximo 120 caracteres."
    );
  }

  const numeroPrioridade = Number(prioridade);

  if (
    !Number.isInteger(numeroPrioridade) ||
    numeroPrioridade < 1 ||
    numeroPrioridade > 3
  ) {
    throw new Error(
      "A prioridade deve ser 1, 2 ou 3."
    );
  }
}

// ========================================
// 4. CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const tarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true,
    criadaEm: new Date().toISOString()
  };

  tarefas.push(tarefa);
  salvarTarefas();

  return tarefa;
}

// ========================================
// 5. LISTAR E BUSCAR TAREFAS
// ========================================

function listarTarefas() {
  return [...tarefas];
}

function buscarTarefa(codigo) {
  const numeroCodigo = Number(codigo);

  const tarefa = tarefas.find(
    (item) => item.codigo === numeroCodigo
  );

  if (!tarefa) {
    throw new Error(
      `Nenhuma tarefa encontrada com o código ${codigo}.`
    );
  }

  return tarefa;
}

// ========================================
// 6. CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Essa tarefa já foi concluída.");
  }

  tarefa.status = false;
  tarefa.concluidaEm = new Date().toISOString();

  salvarTarefas();

  return tarefa;
}

// ========================================
// 7. ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
  );

  tarefa.prioridade = Number(novaPrioridade);

  salvarTarefas();

  return tarefa;
}

// ========================================
// 8. EXCLUIR TAREFA
// ========================================

function excluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  tarefas = tarefas.filter(
    (item) => item.codigo !== tarefa.codigo
  );

  salvarTarefas();

  return tarefa;
}

// ========================================
// 9. FILTRAR E PESQUISAR
// ========================================

function obterTarefasVisiveis() {
  const termo = pesquisa.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  return listarTarefas()
    .filter((tarefa) => {
      if (filtro.value === "pendentes") {
        return tarefa.status;
      }

      if (filtro.value === "concluidas") {
        return !tarefa.status;
      }

      return true;
    })
    .filter((tarefa) =>
      tarefa.titulo
        .toLocaleLowerCase("pt-BR")
        .includes(termo)
    )
    .sort((a, b) =>
      a.prioridade - b.prioridade ||
      a.codigo - b.codigo
    );
}

// ========================================
// 10. ATUALIZAR ESTATÍSTICAS
// ========================================

function atualizarEstatisticas() {
  const pendentes = tarefas.filter(
    (tarefa) => tarefa.status
  ).length;

  const concluidas = tarefas.length - pendentes;

  totalTarefas.textContent = tarefas.length;
  totalPendentes.textContent = pendentes;
  totalConcluidas.textContent = concluidas;
}

// ========================================
// 11. CRIAR BOTÕES DE AÇÃO
// ========================================

function criarBotao(texto, classe, acao) {
  const botao = criarElemento(
    "button",
    `btn ${classe}`,
    texto
  );

  botao.type = "button";
  botao.addEventListener("click", acao);

  return botao;
}

function executarAcao(acao) {
  try {
    acao();
    renderizarTarefas();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

// ========================================
// 12. CRIAR CARTÃO DA TAREFA
// ========================================

function criarCartaoTarefa(tarefa) {
  const item = criarElemento(
    "article",
    `task${tarefa.status ? "" : " done"}`
  );

  const principal = criarElemento("div", "task-main");

  principal.append(
    criarElemento("p", "task-title", tarefa.titulo)
  );

  const meta = criarElemento("div", "task-meta");

  meta.append(
    criarElemento("span", "", `Código: ${tarefa.codigo}`),
    criarElemento(
      "span",
      `priority priority-${tarefa.prioridade}`,
      `Prioridade ${PRIORIDADES[tarefa.prioridade]}`
    ),
    criarElemento(
      "span",
      `status ${tarefa.status ? "status-pending" : "status-done"}`,
      tarefa.status ? "Pendente" : "Concluída"
    )
  );

  principal.append(meta);

  const acoes = criarElemento("div", "task-actions");

  // Concluir tarefa
  if (tarefa.status) {
    acoes.append(
      criarBotao("Concluir", "btn-success", () => {
        executarAcao(() => {
          concluirTarefa(tarefa.codigo);
          mostrarMensagem(
            `Tarefa ${tarefa.codigo} concluída com sucesso.`
          );
        });
      })
    );
  }

  // Alterar prioridade
  acoes.append(
    criarBotao("Prioridade", "btn-secondary", () => {
      const resposta = window.prompt(
        "Nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        String(tarefa.prioridade)
      );

      if (resposta === null) return;

      executarAcao(() => {
        alterarPrioridade(tarefa.codigo, resposta.trim());

        mostrarMensagem(
          "Prioridade atualizada com sucesso."
        );
      });
    })
  );

  // Excluir tarefa
  acoes.append(
    criarBotao("Excluir", "btn-danger", () => {
      const confirmar = window.confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
      );

      if (!confirmar) return;

      executarAcao(() => {
        excluirTarefa(tarefa.codigo);
        mostrarMensagem("Tarefa excluída com sucesso.");
      });
    })
  );

  item.append(principal, acoes);

  return item;
}

// ========================================
// 13. RENDERIZAR TAREFAS
// ========================================

function renderizarTarefas() {
  const visiveis = obterTarefasVisiveis();
  const fragmento = document.createDocumentFragment();

  visiveis.forEach((tarefa) => {
    fragmento.append(criarCartaoTarefa(tarefa));
  });

  listaTarefas.replaceChildren(fragmento);

  atualizarEstatisticas();

  vazio.hidden = visiveis.length > 0;

  const temTarefas = tarefas.length > 0;

  vazio.querySelector("h3").textContent = temTarefas
    ? "Nenhuma tarefa encontrada"
    : "Sua lista está vazia";

  vazio.querySelector("p").textContent = temTarefas
    ? "Experimente mudar a pesquisa ou o filtro."
    : "Adicione sua primeira tarefa para começar.";
}

// ========================================
// 14. CARREGAR DADOS SALVOS
// ========================================

function carregarTarefas() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);

    if (!dados) return false;

    const armazenamento = JSON.parse(dados);

    if (
      !armazenamento ||
      !Array.isArray(armazenamento.tarefas) ||
      !armazenamento.tarefas.every((tarefa) =>
        tarefa &&
        Number.isSafeInteger(tarefa.codigo) &&
        tarefa.codigo > 0 &&
        typeof tarefa.titulo === "string" &&
        tarefa.titulo.trim().length >= 10 &&
        tarefa.titulo.trim().length <= 120 &&
        [1, 2, 3].includes(tarefa.prioridade) &&
        typeof tarefa.status === "boolean"
      )
    ) {
      throw new Error("Dados salvos inválidos.");
    }

    tarefas = armazenamento.tarefas;

    const maiorCodigo = tarefas.reduce(
      (maior, tarefa) => Math.max(maior, tarefa.codigo),
      0
    );

    const codigoSalvo = armazenamento.proximoCodigo;

    proximoCodigo =
      Number.isSafeInteger(codigoSalvo) && codigoSalvo > maiorCodigo
        ? codigoSalvo
        : maiorCodigo + 1;

    return true;
  } catch {
    tarefas = [];
    proximoCodigo = 1;

    mostrarMensagem(
      "Não foi possível carregar os dados salvos.",
      true
    );

    return false;
  }
}

// ========================================
// 15. EVENTOS DO FORMULÁRIO
// ========================================

formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();

  try {
    const tarefa = cadastrarTarefa(
      campoTitulo.value,
      campoPrioridade.value
    );

    formTarefa.reset();
    campoPrioridade.value = "2";

    mostrarMensagem(
      `Tarefa "${tarefa.titulo}" cadastrada com o código ${tarefa.codigo}.`
    );

    renderizarTarefas();
    campoTitulo.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

// ========================================
// 16. EVENTOS DE PESQUISA E FILTRO
// ========================================

filtro.addEventListener("change", renderizarTarefas);
pesquisa.addEventListener("input", renderizarTarefas);

// ========================================
// 17. INICIALIZAR A APLICAÇÃO
// ========================================

const dadosCarregados = carregarTarefas();

if (!dadosCarregados && tarefas.length === 0) {
  // Exemplos iniciais somente na primeira utilização.
  // Os exemplos não são recriados após excluir todas as tarefas.
  if (localStorage.getItem(CHAVE_STORAGE) === null) {
    cadastrarTarefa("Estudar JavaScript", 1);
    cadastrarTarefa("Fazer atividade da escola", 2);
    cadastrarTarefa("Organizar o quarto", 3);
  }
}

renderizarTarefas();
