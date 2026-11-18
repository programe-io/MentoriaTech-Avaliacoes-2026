// ============================================================================
// SISTEMA PROFISSIONAL DE GERENCIAMENTO DE TAREFAS
// Instituição: CETI Paulo Freire | Estudante: Lara Pereira Maia
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "ceti_paulo_freire_lara_sistema_real";
  const THEME_KEY = "ceti_paulo_freire_tema";

  // Estado real da aplicação (inicia vazio e persiste no banco local do navegador)
  let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  let filtroAtual = "todas";
  let termoBusca = "";
  let ordenacaoAsc = true;

  // Referências do DOM
  const formTarefa = document.getElementById("form-tarefa");
  const inputTitulo = document.getElementById("titulo");
  const selectPrioridade = document.getElementById("prioridade");
  const contadorCaracteres = document.getElementById("contador-caracteres");
  const tabelaCorpo = document.getElementById("tabela-corpo");
  const buscaInput = document.getElementById("busca-input");
  const btnOrdenar = document.getElementById("btn-ordenar");
  const menuFiltros = document.getElementById("menu-filtros");
  const btnTema = document.getElementById("btn-tema");
  const btnLimparConcluidas = document.getElementById("btn-limpar-concluidas");
  const btnExportar = document.getElementById("btn-exportar");
  const toastContainer = document.getElementById("toast-container");

  // Exibe data atual formatada no topo
  const opcoesData = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const dataFormatada = new Date().toLocaleDateString("pt-BR", opcoesData);
  document.getElementById("data-atual").textContent =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  // Sistema de Notificações Toast
  function notificar(mensagem, tipo = "sucesso") {
    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.textContent = mensagem;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Persistência em LocalStorage
  function salvarEstado() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }

  // Gera próximo código sequencial
  function gerarProximoCodigo() {
    if (tarefas.length === 0) return 1;
    return Math.max(...tarefas.map((t) => t.codigo)) + 1;
  }

  // 1. CADASTRAR NOVA TAREFA
  function cadastrarTarefa(titulo, prioridade) {
    const tituloLimpo = titulo.trim();
    const prioridadeNum = Number(prioridade);

    // Regra de validação 1: Mínimo 5 caracteres
    if (tituloLimpo.length < 5) {
      notificar("O título deve conter no mínimo 5 caracteres.", "erro");
      inputTitulo.focus();
      return false;
    }

    // Regra de validação 2: Prioridade entre 1 e 3
    if (![1, 2, 3].includes(prioridadeNum)) {
      notificar("A prioridade deve ser um valor entre 1 (Alta) e 3 (Baixa).", "erro");
      return false;
    }

    const novaTarefa = {
      codigo: gerarProximoCodigo(),
      titulo: tituloLimpo,
      prioridade: prioridadeNum,
      concluida: false,
    };

    tarefas.push(novaTarefa);
    salvarEstado();
    renderizarTabela();
    notificar(`Tarefa #${novaTarefa.codigo} cadastrada com sucesso!`, "sucesso");
    return true;
  }

  // 2. LISTAR TAREFAS CADASTRADAS
  function renderizarTabela() {
    tabelaCorpo.innerHTML = "";

    const listaFiltrada = tarefas.filter((tarefa) => {
      const correspondeBusca = tarefa.titulo
        .toLowerCase()
        .includes(termoBusca.toLowerCase());

      if (!correspondeBusca) return false;
      if (filtroAtual === "pendentes") return !tarefa.concluida;
      if (filtroAtual === "concluidas") return tarefa.concluida;
      if (filtroAtual === "alta") return tarefa.prioridade === 1 && !tarefa.concluida;
      return true;
    });

    if (listaFiltrada.length === 0) {
      tabelaCorpo.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="estado-vazio">
              <strong>Nenhuma tarefa encontrada</strong>
              <span>Cadastre uma nova atividade acima ou altere os filtros selecionados.</span>
            </div>
          </td>
        </tr>
      `;
      atualizarMetricas();
      return;
    }

    listaFiltrada.forEach((tarefa) => {
      const tr = document.createElement("tr");
      if (tarefa.concluida) tr.classList.add("concluida");

      tr.innerHTML = `
        <td><strong>#${String(tarefa.codigo).padStart(3, "0")}</strong></td>
        <td class="col-titulo">${tarefa.titulo}</td>
        <td>
          <select 
            class="select-prioridade" 
            data-codigo="${tarefa.codigo}"
            ${tarefa.concluida ? "disabled" : ""}
          >
            <option value="1" ${tarefa.prioridade === 1 ? "selected" : ""}>🔴 1 - Alta</option>
            <option value="2" ${tarefa.prioridade === 2 ? "selected" : ""}>🟡 2 - Média</option>
            <option value="3" ${tarefa.prioridade === 3 ? "selected" : ""}>🟢 3 - Baixa</option>
          </select>
        </td>
        <td>
          <span class="status-pill ${tarefa.concluida ? "status-concluida" : "status-pendente"}">
            ${tarefa.concluida ? "✔️ Concluída" : "⏳ Pendente"}
          </span>
        </td>
        <td class="texto-direita">
          <div class="acoes-grupo">
            <button 
              type="button"
              class="btn-acao btn-concluir" 
              data-acao="concluir" 
              data-codigo="${tarefa.codigo}"
              ${tarefa.concluida ? "disabled" : ""}
            >
              ${tarefa.concluida ? "Concluída" : "Concluir"}
            </button>
            <button 
              type="button"
              class="btn-acao btn-excluir" 
              data-acao="excluir" 
              data-codigo="${tarefa.codigo}"
              title="Excluir tarefa"
            >
              Excluir
            </button>
          </div>
        </td>
      `;

      tabelaCorpo.appendChild(tr);
    });

    atualizarMetricas();
  }

  // 3. MARCAR TAREFA COMO CONCLUÍDA
  function concluirTarefa(codigo) {
    const tarefa = tarefas.find((t) => t.codigo === codigo);
    if (tarefa && !tarefa.concluida) {
      tarefa.concluida = true;
      salvarEstado();
      renderizarTabela();
      notificar(`Tarefa "${tarefa.titulo}" marcada como concluída!`, "sucesso");
    }
  }

  // 4. ALTERAR PRIORIDADE DA TAREFA
  function alterarPrioridade(codigo, novaPrioridade) {
    const prioridadeNum = Number(novaPrioridade);
    const tarefa = tarefas.find((t) => t.codigo === codigo);

    if (![1, 2, 3].includes(prioridadeNum)) {
      notificar("Prioridade inválida. Escolha entre 1 e 3.", "erro");
      renderizarTabela();
      return;
    }

    if (tarefa) {
      tarefa.prioridade = prioridadeNum;
      salvarEstado();
      renderizarTabela();
      notificar(`Prioridade da tarefa #${String(codigo).padStart(3, "0")} atualizada.`, "sucesso");
    }
  }

  // Excluir tarefa individual
  function excluirTarefa(codigo) {
    tarefas = tarefas.filter((t) => t.codigo !== codigo);
    salvarEstado();
    renderizarTabela();
    notificar("Tarefa removida do sistema.", "sucesso");
  }

  // Atualiza KPIs, contadores laterais e barra de progresso
  function atualizarMetricas() {
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const pendentes = total - concluidas;
    const alta = tarefas.filter((t) => t.prioridade === 1 && !t.concluida).length;
    const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    document.getElementById("kpi-total").textContent = total;
    document.getElementById("kpi-alta").textContent = alta;
    document.getElementById("kpi-pendentes").textContent = pendentes;
    document.getElementById("kpi-concluidas").textContent = concluidas;

    document.getElementById("nav-todas").textContent = total;
    document.getElementById("nav-pendentes").textContent = pendentes;
    document.getElementById("nav-alta").textContent = alta;
    document.getElementById("nav-concluidas").textContent = concluidas;

    document.getElementById("porcentagem-texto").textContent = `${percentual}%`;
    document.getElementById("texto-progresso").textContent = `${concluidas} de ${total} tarefas finalizadas`;
    document.getElementById("barra-preenchimento").style.width = `${percentual}%`;
  }

  // --- EVENTOS ---

  // Validação visual de caracteres em tempo real
  inputTitulo.addEventListener("input", () => {
    const qtd = inputTitulo.value.trim().length;
    contadorCaracteres.textContent = `${qtd} / 5 caracteres`;
    contadorCaracteres.classList.toggle("ok", qtd >= 5);
  });

  // Envio do formulário
  formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    if (ok) {
      inputTitulo.value = "";
      contadorCaracteres.textContent = "0 / 5 caracteres";
      contadorCaracteres.classList.remove("ok");
      selectPrioridade.value = "2";
      inputTitulo.focus();
    }
  });

  // Ações na tabela (Concluir / Excluir)
  tabelaCorpo.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const codigo = Number(btn.dataset.codigo);
    if (btn.dataset.acao === "concluir") concluirTarefa(codigo);
    if (btn.dataset.acao === "excluir") excluirTarefa(codigo);
  });

  // Alterar prioridade na tabela
  tabelaCorpo.addEventListener("change", (e) => {
    if (e.target.classList.contains("select-prioridade")) {
      const codigo = Number(e.target.dataset.codigo);
      alterarPrioridade(codigo, e.target.value);
    }
  });

  // Filtros do menu lateral
  menuFiltros.addEventListener("click", (e) => {
    const item = e.target.closest(".nav-item");
    if (!item) return;

    document.querySelectorAll(".nav-item").forEach((el) => el.classList.remove("ativo"));
    item.classList.add("ativo");
    filtroAtual = item.dataset.filtro;
    renderizarTabela();
  });

  // Busca em tempo real
  buscaInput.addEventListener("input", (e) => {
    termoBusca = e.target.value;
    renderizarTabela();
  });

  // Ordenar por prioridade
  btnOrdenar.addEventListener("click", () => {
    tarefas.sort((a, b) =>
      ordenacaoAsc ? a.prioridade - b.prioridade : b.prioridade - a.prioridade
    );
    ordenacaoAsc = !ordenacaoAsc;
    salvarEstado();
    renderizarTabela();
    notificar("Lista ordenada por nível de prioridade.", "sucesso");
  });

  // Limpar tarefas concluídas
  btnLimparConcluidas.addEventListener("click", () => {
    const tinhaConcluidas = tarefas.some((t) => t.concluida);
    if (!tinhaConcluidas) {
      notificar("Não há tarefas concluídas para limpar.", "erro");
      return;
    }
    tarefas = tarefas.filter((t) => !t.concluida);
    salvarEstado();
    renderizarTabela();
    notificar("Tarefas concluídas removidas.", "sucesso");
  });

  // Exportar relatório real em arquivo .txt
  btnExportar.addEventListener("click", () => {
    if (tarefas.length === 0) {
      notificar("Cadastre ao menos uma tarefa antes de exportar.", "erro");
      return;
    }

    const nomesPrioridade = { 1: "Alta (1)", 2: "Média (2)", 3: "Baixa (3)" };
    let conteudo = `RELATÓRIO DE ATIVIDADES ESCOLARES - CETI PAULO FREIRE\n`;
    conteudo += `Estudante: Lara Pereira Maia\n`;
    conteudo += `Data de Emissão: ${new Date().toLocaleString("pt-BR")}\n`;
    conteudo += `====================================================================\n\n`;

    tarefas.forEach((t) => {
      conteudo += `[#${String(t.codigo).padStart(3, "0")}] ${t.titulo}\n`;
      conteudo += `   Prioridade: ${nomesPrioridade[t.prioridade]} | Status: ${t.concluida ? "CONCLUÍDA" : "PENDENTE"}\n\n`;
    });

    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio-tarefas-lara-paulo-freire.txt";
    link.click();
    notificar("Relatório exportado com sucesso!", "sucesso");
  });

  // Alternar tema claro/escuro
  if (localStorage.getItem(THEME_KEY) === "dark") {
    document.body.classList.add("dark");
    btnTema.textContent = "☀️ Tema Claro";
  }

  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    btnTema.textContent = isDark ? "☀️ Tema Claro" : "🌙 Tema Escuro";
  });

  // Renderização inicial
  renderizarTabela();
});