
const tarefas = [];
let proximoCodigo = 0;
let filtroAtual = "all";
let toastTimer;

const elementos = {
  modal: document.getElementById("taskModal"),
  form: document.getElementById("taskForm"),
  title: document.getElementById("taskTitle"),
  priority: document.getElementById("taskPriority"),
  error: document.getElementById("formError"),
  tbody: document.getElementById("taskTableBody"),
  empty: document.getElementById("emptyState"),
  search: document.getElementById("searchInput"),
  priorityFilter: document.getElementById("priorityFilter"),
  toast: document.getElementById("toast")
};

// Valida o título e a prioridade.
function validarDadosDaTarefa(titulo, prioridade) {
  const tituloNormalizado = String(titulo ?? "").trim();
  const prioridadeNumerica = Number(prioridade);

  if (tituloNormalizado.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (
    !Number.isInteger(prioridadeNumerica) ||
    prioridadeNumerica < 1 ||
    prioridadeNumerica > 3
  ) {
    throw new Error("A prioridade deve ser 1, 2 ou 3.");
  }

  return {
    titulo: tituloNormalizado,
    prioridade: prioridadeNumerica
  };
}

// Cadastra uma nova tarefa e gera seu código automaticamente.
function cadastrarTarefa(titulo, prioridade) {
  const dados = validarDadosDaTarefa(titulo, prioridade);
  proximoCodigo += 1;

  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: dados.titulo,
    prioridade: dados.prioridade,
    status: true
  };

  tarefas.push(novaTarefa);
  salvarTarefas();

  return novaTarefa;
}

// Retorna o array completo de tarefas.
function listarTarefas() {
  return tarefas;
}

// Busca uma tarefa pelo código usando find().
function buscarTarefa(codigo) {
  const codigoNumerico = Number(codigo);

  const tarefa = tarefas.find(
    item => item.codigo === codigoNumerico
  );

  if (!tarefa) {
    throw new Error(
      `Nenhuma tarefa foi encontrada com o código ${codigo}.`
    );
  }

  return tarefa;
}

// Marca uma tarefa como concluída.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já foi concluída.");
  }

  tarefa.status = false;
  salvarTarefas();

  return tarefa;
}

// Permite reabrir uma tarefa já concluída.
function reabrirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (tarefa.status === true) {
    throw new Error("Esta tarefa já está em andamento.");
  }

  tarefa.status = true;
  salvarTarefas();

  return tarefa;
}

// Altera a prioridade reutilizando a validação.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  const dados = validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
  );

  tarefa.prioridade = dados.prioridade;
  salvarTarefas();

  return tarefa;
}

// Salva as tarefas no navegador.
function salvarTarefas() {
  try {
    localStorage.setItem(
      "taskflow_tarefas",
      JSON.stringify({
        tarefas,
        proximoCodigo
      })
    );
  } catch (erro) {
    console.warn(
      "Não foi possível salvar as tarefas neste navegador.",
      erro
    );
  }
}

// Recupera as tarefas salvas anteriormente.
function carregarTarefas() {
  try {
    const dados = JSON.parse(
      localStorage.getItem("taskflow_tarefas")
    );

    if (dados && Array.isArray(dados.tarefas)) {
      dados.tarefas.forEach(item => {
        if (
          Number.isInteger(item.codigo) &&
          typeof item.titulo === "string" &&
          Number.isInteger(item.prioridade) &&
          item.prioridade >= 1 &&
          item.prioridade <= 3 &&
          typeof item.status === "boolean"
        ) {
          tarefas.push({
            codigo: item.codigo,
            titulo: item.titulo,
            prioridade: item.prioridade,
            status: item.status
          });
        }
      });

      proximoCodigo = Math.max(
        Number(dados.proximoCodigo) || 0,
        ...tarefas.map(t => t.codigo),
        0
      );

      return;
    }
  } catch (erro) {
    console.warn(
      "Os dados salvos não puderam ser carregados.",
      erro
    );
  }

  // Exemplos iniciais na primeira visita.
  cadastrarTarefa("Revisar conteúdo de JavaScript", 1);
  cadastrarTarefa("Organizar material de estudo", 2);
  cadastrarTarefa("Planejar atividade da semana", 3);
}

function prioridadeTexto(prioridade) {
  return {
    1: "Alta",
    2: "Média",
    3: "Baixa"
  }[prioridade];
}

function criarCelula(conteudo, classe = "") {
  const td = document.createElement("td");

  if (classe) {
    td.className = classe;
  }

  if (conteudo instanceof Node) {
    td.appendChild(conteudo);
  } else {
    td.textContent = conteudo;
  }

  return td;
}

// Cria visualmente uma linha da tabela para cada tarefa.
function montarLinha(tarefa) {
  const linha = document.createElement("tr");

  const tituloBox = document.createElement("div");
  tituloBox.className = "task-title-cell";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-check";
  checkbox.checked = !tarefa.status;

  checkbox.setAttribute(
    "aria-label",
    tarefa.status
      ? `Concluir ${tarefa.titulo}`
      : `Reabrir ${tarefa.titulo}`
  );

  checkbox.addEventListener("change", () => {
    try {
      if (checkbox.checked) {
        concluirTarefa(tarefa.codigo);
      } else {
        reabrirTarefa(tarefa.codigo);
      }

      renderizar();
      mostrarToast(
        checkbox.checked
          ? "Tarefa concluída!"
          : "Tarefa reaberta."
      );
    } catch (erro) {
      mostrarToast(erro.message, true);
      renderizar();
    }
  });

  const texto = document.createElement("div");

  const nome = document.createElement("div");
  nome.className = `task-name${tarefa.status ? "" : " is-complete"}`;
  nome.textContent = tarefa.titulo;

  const subtitulo = document.createElement("div");
  subtitulo.className = "task-subtitle";
  subtitulo.textContent = tarefa.status
    ? "Pronta para entrar em ação"
    : "Bom trabalho, tarefa finalizada";

  texto.append(nome, subtitulo);
  tituloBox.append(checkbox, texto);
  linha.appendChild(criarCelula(tituloBox));

  const codigo = document.createElement("span");
  codigo.className = "code-chip";
  codigo.textContent =
    `TF-${String(tarefa.codigo).padStart(3, "0")}`;

  linha.appendChild(criarCelula(codigo));

  // O select permite alterar a prioridade diretamente na tabela.
  const prioridadeSelect = document.createElement("select");
  prioridadeSelect.className =
    `priority-badge priority-${tarefa.prioridade}`;

  prioridadeSelect.setAttribute(
    "aria-label",
    `Alterar prioridade de ${tarefa.titulo}`
  );

  [1, 2, 3].forEach(valor => {
    const option = document.createElement("option");
    option.value = String(valor);
    option.textContent = `${valor} · ${prioridadeTexto(valor)}`;
    option.selected = valor === tarefa.prioridade;
    prioridadeSelect.appendChild(option);
  });

  prioridadeSelect.addEventListener("change", () => {
    try {
      alterarPrioridade(tarefa.codigo, prioridadeSelect.value);
      renderizar();
      mostrarToast("Prioridade atualizada.");
    } catch (erro) {
      mostrarToast(erro.message, true);
      renderizar();
    }
  });

  linha.appendChild(criarCelula(prioridadeSelect));

  const status = document.createElement("span");
  status.className =
    `status-badge ${
      tarefa.status ? "status-active" : "status-completed"
    }`;

  status.textContent = tarefa.status
    ? "Em andamento"
    : "Concluída";

  linha.appendChild(criarCelula(status));

  const acoes = document.createElement("div");
  acoes.className = "action-cell";

  const alterar = document.createElement("button");
  alterar.type = "button";
  alterar.className = "action-button";
  alterar.title = "Alterar prioridade";
  alterar.setAttribute(
    "aria-label",
    `Alterar prioridade de ${tarefa.titulo}`
  );
  alterar.textContent = "↕";

  alterar.addEventListener("click", () => {
    const proxima =
      tarefa.prioridade === 1
        ? 2
        : tarefa.prioridade === 2
          ? 3
          : 1;

    try {
      alterarPrioridade(tarefa.codigo, proxima);
      renderizar();
      mostrarToast(
        `Prioridade alterada para ${prioridadeTexto(proxima).toLowerCase()}.`
      );
    } catch (erro) {
      mostrarToast(erro.message, true);
    }
  });

  const alternar = document.createElement("button");
  alternar.type = "button";
  alternar.className = "action-button";
  alternar.title = tarefa.status
    ? "Concluir tarefa"
    : "Reabrir tarefa";
  alternar.setAttribute("aria-label", alternar.title);
  alternar.textContent = tarefa.status ? "✓" : "↶";

  alternar.addEventListener("click", () => {
    try {
      if (tarefa.status) {
        concluirTarefa(tarefa.codigo);
      } else {
        reabrirTarefa(tarefa.codigo);
      }

      renderizar();
      mostrarToast(
        tarefa.status
          ? "Tarefa concluída!"
          : "Tarefa reaberta."
      );
    } catch (erro) {
      mostrarToast(erro.message, true);
    }
  });

  acoes.append(alterar, alternar);
  linha.appendChild(criarCelula(acoes));

  return linha;
}

// Atualiza estatísticas, filtros e tabela.
function renderizar() {
  const todas = listarTarefas();

  const concluidas = todas.filter(t => !t.status).length;
  const emAndamento = todas.length - concluidas;

  const progresso = todas.length
    ? Math.round((concluidas / todas.length) * 100)
    : 0;

  document.getElementById("totalStat").textContent = todas.length;
  document.getElementById("activeStat").textContent = emAndamento;
  document.getElementById("completedStat").textContent = concluidas;
  document.getElementById("progressStat").textContent = progresso;
  document.getElementById("progressBar").style.width =
    `${progresso}%`;

  document.getElementById("allCount").textContent = todas.length;
  document.getElementById("activeCount").textContent = emAndamento;
  document.getElementById("completedCount").textContent = concluidas;

  const termo = elementos.search.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const prioridadeFiltro = elementos.priorityFilter.value;

  const visiveis = todas
    .filter(tarefa => {
      const titulo = tarefa.titulo.toLocaleLowerCase("pt-BR");
      const codigo = String(tarefa.codigo);
      const codigoFormatado =
        `tf-${String(tarefa.codigo).padStart(3, "0")}`;

      const combinaBusca =
        titulo.includes(termo) ||
        codigo.includes(termo) ||
        codigoFormatado.includes(termo);

      const combinaStatus =
        filtroAtual === "all" ||
        (filtroAtual === "active" && tarefa.status) ||
        (filtroAtual === "completed" && !tarefa.status);

      const combinaPrioridade =
        prioridadeFiltro === "all" ||
        tarefa.prioridade === Number(prioridadeFiltro);

      return combinaBusca && combinaStatus && combinaPrioridade;
    })
    .sort((a, b) => {
      if (a.status !== b.status) {
        return a.status ? -1 : 1;
      }

      return a.prioridade - b.prioridade || b.codigo - a.codigo;
    });

  elementos.tbody.replaceChildren(...visiveis.map(montarLinha));
  elementos.empty.style.display = visiveis.length ? "none" : "block";

  document.getElementById("showingCount").textContent =
    `Mostrando ${visiveis.length} de ${todas.length} ${
      todas.length === 1 ? "tarefa" : "tarefas"
    }`;

  document.getElementById("listSubtitle").textContent =
    filtroAtual === "active"
      ? "Tarefas que ainda estão em andamento."
      : filtroAtual === "completed"
        ? "Confira o que você já finalizou."
        : "Acompanhe tudo o que você precisa fazer.";

  document.querySelectorAll(".nav-item").forEach(botao => {
    botao.classList.toggle(
      "active",
      botao.dataset.filter === filtroAtual
    );
  });
}

function abrirModal() {
  elementos.form.reset();
  elementos.priority.value = "2";
  elementos.error.hidden = true;
  elementos.error.textContent = "";
  elementos.modal.hidden = false;
  document.body.style.overflow = "hidden";

  setTimeout(() => elementos.title.focus(), 30);
}

function fecharModal() {
  elementos.modal.hidden = true;
  document.body.style.overflow = "";
  elementos.error.hidden = true;
}

function mostrarErro(mensagem) {
  elementos.error.textContent = mensagem;
  elementos.error.hidden = false;
}

function mostrarToast(mensagem, erro = false) {
  clearTimeout(toastTimer);

  elementos.toast.textContent = mensagem;
  elementos.toast.style.background =
    erro ? "#9f3737" : "#1e2a40";

  elementos.toast.classList.add("show");

  toastTimer = setTimeout(() => {
    elementos.toast.classList.remove("show");
  }, 2800);
}

// Eventos dos botões e dos filtros.
document.getElementById("newTaskBtn")
  .addEventListener("click", abrirModal);

document.getElementById("emptyNewBtn")
  .addEventListener("click", abrirModal);

document.getElementById("closeModalBtn")
  .addEventListener("click", fecharModal);

document.getElementById("cancelBtn")
  .addEventListener("click", fecharModal);

elementos.modal.addEventListener("click", event => {
  if (event.target === elementos.modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !elementos.modal.hidden) {
    fecharModal();
  }
});

elementos.form.addEventListener("submit", event => {
  event.preventDefault();

  try {
    cadastrarTarefa(
      elementos.title.value,
      elementos.priority.value
    );

    fecharModal();
    renderizar();
    mostrarToast("Nova tarefa cadastrada com sucesso!");
  } catch (erro) {
    mostrarErro(erro.message);
  }
});

elementos.search.addEventListener("input", renderizar);
elementos.priorityFilter.addEventListener("change", renderizar);

document.querySelectorAll(".nav-item").forEach(botao => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filter;
    renderizar();
  });
});

// Inicializa o projeto.
carregarTarefas();
renderizar();

// Permite estudar e testar as funções pelo console do navegador.
window.gerenciadorTarefas = {
  validarDadosDaTarefa,
  cadastrarTarefa,
  listarTarefas,
  buscarTarefa,
  concluirTarefa,
  alterarPrioridade
};
