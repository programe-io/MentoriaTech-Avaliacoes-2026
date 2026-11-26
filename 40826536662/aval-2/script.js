(() => {
  const STORAGE_KEY = "avaliacao_gerenciador_tarefas_v1";

  const TAREFAS_INICIAIS = [
    {
      id: 1,
      titulo: "Praticar delegação de eventos com closest e dataset",
      prioridade: "Alta",
      categoria: "Estudos",
      concluida: true
    },
    {
      id: 2,
      titulo: "Testar filtros e busca com toLowerCase e includes",
      prioridade: "Normal",
      categoria: "Estudos",
      concluida: false
    },
    {
      id: 3,
      titulo: "Publicar projeto final no GitHub Pages",
      prioridade: "Alta",
      categoria: "Trabalho",
      concluida: false
    }
  ];

  const formTarefa = document.querySelector("#form-tarefa");
  const inputTitulo = document.querySelector("#input-titulo");
  const selectPrioridade = document.querySelector("#select-prioridade");
  const selectCategoria = document.querySelector("#select-categoria");
  const erroTarefa = document.querySelector("#erro-tarefa");

  const inputBusca = document.querySelector("#input-busca-tarefa");
  const containerFiltros = document.querySelector("#filtros-tarefas");
  const listaTarefas = document.querySelector("#lista-tarefas");
  const btnLimparConcluidas = document.querySelector("#btn-limpar-concluidas");

  const contadorTotal = document.querySelector("#contador-total");
  const contadorPendentes = document.querySelector("#contador-pendentes");
  const contadorConcluidas = document.querySelector("#contador-concluidas");
  const percentualProgresso = document.querySelector("#percentual-progresso");
  const barraPreenchida = document.querySelector("#barra-preenchida");

  let tarefas = carregarTarefas();
  let filtroAtual = "todas";
  let termoBusca = "";

  function carregarTarefas() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) {
      return TAREFAS_INICIAIS.map((item) => ({ ...item }));
    }
    try {
      const dados = JSON.parse(salvo);
      return Array.isArray(dados) ? dados : [];
    } catch {
      return [];
    }
  }

  function salvarTarefas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }

  function proximoId() {
    if (tarefas.length === 0) return 1;
    const maiorId = tarefas.reduce((maior, item) => (item.id > maior ? item.id : maior), 0);
    return maiorId + 1;
  }

  function mostrarErro(mensagem) {
    erroTarefa.textContent = mensagem;
    erroTarefa.hidden = false;
  }

  function limparErro() {
    erroTarefa.textContent = "";
    erroTarefa.hidden = true;
  }

  function classePrioridade(prioridade) {
    if (prioridade === "Alta") return "prioridade-alta";
    if (prioridade === "Baixa") return "prioridade-baixa";
    return "prioridade-normal";
  }

  function atualizarResumo() {
    const total = tarefas.length;
    const concluidas = tarefas.filter((item) => item.concluida).length;
    const pendentes = total - concluidas;
    const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    contadorTotal.textContent = String(total);
    contadorPendentes.textContent = String(pendentes);
    contadorConcluidas.textContent = String(concluidas);
    percentualProgresso.textContent = `${porcentagem}%`;
    barraPreenchida.style.width = `${porcentagem}%`;
  }

  function obterTarefasFiltradas() {
    const busca = termoBusca.trim().toLowerCase();

    return tarefas.filter((item) => {
      const passaStatus =
        filtroAtual === "todas" ||
        (filtroAtual === "pendentes" && !item.concluida) ||
        (filtroAtual === "concluidas" && item.concluida);

      const passaBusca =
        !busca ||
        item.titulo.toLowerCase().includes(busca) ||
        item.categoria.toLowerCase().includes(busca) ||
        item.prioridade.toLowerCase().includes(busca);

      return passaStatus && passaBusca;
    });
  }

  function render() {
    atualizarResumo();
    const visiveis = obterTarefasFiltradas();
    listaTarefas.innerHTML = "";

    if (visiveis.length === 0) {
      const vazio = document.createElement("li");
      vazio.className = "estado-vazio";
      vazio.textContent = "Nenhuma tarefa encontrada para o filtro atual.";
      listaTarefas.appendChild(vazio);
      return;
    }

    visiveis.forEach((tarefa) => {
      const li = document.createElement("li");
      li.className = tarefa.concluida ? "item-tarefa concluida" : "item-tarefa";
      li.dataset.id = String(tarefa.id);

      const divConteudo = document.createElement("div");
      divConteudo.className = "conteudo-tarefa";

      const spanTitulo = document.createElement("span");
      spanTitulo.className = "titulo-tarefa";
      spanTitulo.textContent = tarefa.titulo;

      const divMeta = document.createElement("div");
      divMeta.className = "metadados-tarefa";

      const spanCategoria = document.createElement("span");
      spanCategoria.className = "tag tag-categoria";
      spanCategoria.textContent = tarefa.categoria;

      const spanPrioridade = document.createElement("span");
      spanPrioridade.className = `tag ${classePrioridade(tarefa.prioridade)}`;
      spanPrioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

      divMeta.append(spanCategoria, spanPrioridade);
      divConteudo.append(spanTitulo, divMeta);

      const divAcoes = document.createElement("div");
      divAcoes.className = "acoes-tarefa";

      const btnAlternar = document.createElement("button");
      btnAlternar.type = "button";
      btnAlternar.className = "btn-acao-tarefa";
      btnAlternar.dataset.acao = "alternar";
      btnAlternar.textContent = tarefa.concluida ? "Retomar" : "Concluir";

      const btnEditar = document.createElement("button");
      btnEditar.type = "button";
      btnEditar.className = "btn-acao-tarefa";
      btnEditar.dataset.acao = "editar";
      btnEditar.textContent = "Editar";

      const btnExcluir = document.createElement("button");
      btnExcluir.type = "button";
      btnExcluir.className = "btn-acao-tarefa excluir";
      btnExcluir.dataset.acao = "excluir";
      btnExcluir.textContent = "Excluir";

      divAcoes.append(btnAlternar, btnEditar, btnExcluir);
      li.append(divConteudo, divAcoes);
      listaTarefas.appendChild(li);
    });
  }

  formTarefa.addEventListener("submit", (event) => {
    event.preventDefault();
    limparErro();

    const titulo = inputTitulo.value.trim();
    const prioridade = selectPrioridade.value;
    const categoria = selectCategoria.value;

    if (!titulo) {
      mostrarErro("Digite uma descrição para a tarefa antes de adicionar.");
      inputTitulo.focus();
      return;
    }

    tarefas.push({
      id: proximoId(),
      titulo,
      prioridade,
      categoria,
      concluida: false
    });

    salvarTarefas();
    render();

    formTarefa.reset();
    inputTitulo.focus();
  });

  inputBusca.addEventListener("input", (event) => {
    termoBusca = event.target.value;
    render();
  });

  containerFiltros.addEventListener("click", (event) => {
    const botao = event.target.closest(".btn-filtro");
    if (!botao) return;

    filtroAtual = botao.dataset.filtro;

    containerFiltros.querySelectorAll(".btn-filtro").forEach((btn) => {
      btn.classList.toggle("ativo", btn === botao);
    });

    render();
  });

  listaTarefas.addEventListener("click", (event) => {
    const botao = event.target.closest("button[data-acao]");
    if (!botao) return;

    const itemElemento = botao.closest("li");
    if (!itemElemento) return;

    const id = Number(itemElemento.dataset.id);
    const tarefa = tarefas.find((item) => item.id === id);
    if (!tarefa) return;

    const acao = botao.dataset.acao;

    if (acao === "alternar") {
      tarefa.concluida = !tarefa.concluida;
    } else if (acao === "editar") {
      const novoTitulo = prompt("Editar descrição da tarefa:", tarefa.titulo);
      if (novoTitulo === null) return;
      const tratado = novoTitulo.trim();
      if (!tratado) {
        mostrarErro("A descrição editada não pode ficar vazia.");
        return;
      }
      limparErro();
      tarefa.titulo = tratado;
    } else if (acao === "excluir") {
      tarefas = tarefas.filter((item) => item.id !== id);
    }

    salvarTarefas();
    render();
  });

  btnLimparConcluidas.addEventListener("click", () => {
    tarefas = tarefas.filter((item) => !item.concluida);
    salvarTarefas();
    render();
  });

  render();
})();