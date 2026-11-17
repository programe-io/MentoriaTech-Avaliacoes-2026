// Carregar tarefas salvas no navegador ou iniciar array vazio
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Definir gerador de código com base no maior código existente para evitar duplicatas
let geradorDeCodigo = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.codigo)) : 0;

let filtroAtual = "todas"; // 'todas', 'pendentes', 'concluidas'

// Salvar no LocalStorage e atualizar a tela
function salvarNoStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    atualizarInterface();
}

// Validação dos dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        alert("Erro: O título da tarefa deve ter no mínimo 5 caracteres.");
        return false;
    }
    
    let p = Number(prioridade);
    if (p < 1 || p > 3) {
        alert("Erro: A prioridade deve ser entre 1 e 3.");
        return false;
    }
    
    return true;
}

// Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    let novaTarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: false // false = pendente, true = concluída
    };

    tarefas.push(novaTarefa);
    salvarNoStorage();
}

// Buscar tarefa por código
function buscarTarefa(codigo) {
    return tarefas.find(t => t.codigo === codigo);
}

// Concluir ou Reabrir tarefa
function alternarStatus(codigo) {
    let tarefa = buscarTarefa(codigo);
    if (tarefa) {
        tarefa.status = !tarefa.status;
        salvarNoStorage();
    }
}

// Remover tarefa
function removerTarefa(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    salvarNoStorage();
}

// Ação disparada pelo botão do formulário HTML
function salvarTarefa() {
    let inputTitulo = document.getElementById("inputTitulo");
    let selectPrioridade = document.getElementById("selectPrioridade");

    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);

    // Limpar campos
    inputTitulo.value = "";
    selectPrioridade.value = "1";
    inputTitulo.focus();
}

// Mudar filtro de exibição
function mudarFiltro(filtro) {
    filtroAtual = filtro;
    
    // Atualizar classes visuais dos botões de filtro
    document.querySelectorAll(".btn-filtro").forEach(btn => btn.classList.remove("ativo"));
    event.target.classList.add("ativo");

    atualizarInterface();
}

// Renderizar interface atualizada
function atualizarInterface() {
    let listaHTML = document.getElementById("listaTarefas");
    listaHTML.innerHTML = "";

    // Filtrar tarefas com base no filtro selecionado
    let tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === "pendentes") return !tarefa.status;
        if (filtroAtual === "concluidas") return tarefa.status;
        return true; // 'todas'
    });

    if (tarefasFiltradas.length === 0) {
        listaHTML.innerHTML = `<li style="justify-content: center; color: #888;">Nenhuma tarefa encontrada.</li>`;
        return;
    }

    tarefasFiltradas.forEach(tarefa => {
        let item = document.createElement("li");
        if (tarefa.status) {
            item.classList.add("concluida");
        }

        let textoPrioridade = tarefa.prioridade === 3 ? "Alta" : tarefa.prioridade === 2 ? "Média" : "Baixa";

        item.innerHTML = `
            <div class="info-tarefa">
                <span class="tarefa-texto"><strong>#${tarefa.codigo}</strong> - ${tarefa.titulo}</span>
                <span class="badge prioridade-${tarefa.prioridade}">Prioridade: ${textoPrioridade}</span>
            </div>
            <div class="acoes">
                <button class="btn-acao" onclick="alternarStatus(${tarefa.codigo})">
                    ${tarefa.status ? "Reabrir" : "Concluir"}
                </button>
                <button class="btn-acao btn-remover" onclick="removerTarefa(${tarefa.codigo})">
                    Excluir
                </button>
            </div>
        `;

        listaHTML.appendChild(item);
    });
}

// Executar atualização inicial ao carregar a página
atualizarInterface();