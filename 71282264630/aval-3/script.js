// 8. Geração automática de identificador sequencial[cite: 25]
let contadorCodigo = 0;[cite: 25]

function gerarCodigo() {
    return ++contadorCodigo;[cite: 25]
}

// 7. Array central para armazenamento dos objetos de tarefa[cite: 19, 24, 25]
let tarefas = [];

// Estado da aplicação (filtros ativos)
let filtroStatus = "todas";
let termoBusca = "";

// 9. Mapeamento dos elementos do DOM[cite: 25]
const formTarefa = document.getElementById("form-tarefa");[cite: 25]
const inputTitulo = document.getElementById("input-titulo");[cite: 25]
const inputPrioridade = document.getElementById("input-prioridade");
const inputCategoria = document.getElementById("input-categoria");
const listaTarefas = document.getElementById("lista-tarefas");[cite: 25]
const inputBusca = document.getElementById("input-busca");
const divMensagem = document.getElementById("mensagem");

// Elementos de estatísticas
const statTotal = document.getElementById("stat-total");
const statPendentes = document.getElementById("stat-pendentes");
const statConcluidas = document.getElementById("stat-concluidas");

// Persistência em LocalStorage
function salvarLocalStorage() {
    localStorage.setItem("tarefas_pro", JSON.stringify(tarefas));
    localStorage.setItem("contador_pro", contadorCodigo.toString());
}

function carregarLocalStorage() {
    const tarefasSalvas = localStorage.getItem("tarefas_pro");
    const contadorSalvo = localStorage.getItem("contador_pro");

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    } else {
        // Dados iniciais padrão se o storage estiver vazio[cite: 24, 25]
        tarefas = [
            { id: gerarCodigo(), titulo: "Estudar renderização em JavaScript", prioridade: 1, categoria: "Estudo", concluida: false },[cite: 24, 25]
            { id: gerarCodigo(), titulo: "Montar a estrutura modular do projeto", prioridade: 2, categoria: "Trabalho", concluida: true }[cite: 24, 25]
        ];
    }

    if (contadorSalvo) {
        contadorCodigo = parseInt(contadorSalvo, 10);
    }
}

// Exibição de alertas temporários
function exibirMensagem(texto, tipo = "erro") {
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
    setTimeout(() => {
        divMensagem.className = "mensagem hidden";
    }, 3500);
}

// 5. Função de Validação dos dados informados[cite: 19, 20, 26]
function validarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título da tarefa deve conter no mínimo 5 caracteres.");[cite: 19, 20]
    }
    const prio = Number(prioridade);
    if (prio < 1 || prio > 3) {
        throw new Error("A prioridade deve estar entre 1 (Alta) e 3 (Baixa).");[cite: 19, 20]
    }
}

// 9. Função auxiliar para buscar uma tarefa pelo código (método find)[cite: 21]
function buscarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);[cite: 21]
    if (!tarefa) {
        throw new Error(`Tarefa com o código #${id} não foi encontrada.`);[cite: 21]
    }
    return tarefa;[cite: 21]
}

// Operações de alteração de dados
function cadastrarTarefa(titulo, prioridade, categoria) {
    validarTarefa(titulo, prioridade);[cite: 20]

    const novaTarefa = {
        id: gerarCodigo(),[cite: 25, 26]
        titulo: titulo,[cite: 25, 26]
        prioridade: Number(prioridade),[cite: 20]
        categoria: categoria || "Geral",
        concluida: false[cite: 25, 26]
    };

    tarefas.push(novaTarefa);[cite: 20, 26]
    salvarLocalStorage();
}

function alternarStatusTarefa(id) {
    const tarefa = buscarTarefa(id);[cite: 21]
    tarefa.concluida = !tarefa.concluida;[cite: 21]
    salvarLocalStorage();
    render();[cite: 24, 26]
}

function alterarPrioridadeTarefa(id, novaPrioridade) {
    const tarefa = buscarTarefa(id);[cite: 21]
    validarTarefa(tarefa.titulo, novaPrioridade);[cite: 21]
    tarefa.prioridade = Number(novaPrioridade);[cite: 22]
    salvarLocalStorage();
    render();[cite: 24, 26]
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarLocalStorage();
    render();[cite: 24, 26]
}

function limparConcluidas() {
    tarefas = tarefas.filter(t => !t.concluida);
    salvarLocalStorage();
    render();[cite: 24, 26]
}

// Atualização das métricas da barra superior
function atualizarEstatisticas() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    statTotal.textContent = total;
    statPendentes.textContent = pendentes;
    statConcluidas.textContent = concluidas;
}

// 3 e 10. Construção da função render (Padrão de renderização dinâmica)[cite: 23, 24, 25]
function render() {
    // 1. Limpa o container da lista visual[cite: 24, 25]
    listaTarefas.innerHTML = "";[cite: 24, 25]

    // 2. Filtra os dados com base nos filtros ativos
    const tarefasFiltradas = tarefas.filter(t => {
        const atendeStatus = 
            filtroStatus === "todas" ? true :
            filtroStatus === "concluidas" ? t.concluida : !t.concluida;

        const atendeBusca = t.titulo.toLowerCase().includes(termoBusca.toLowerCase());

        return atendeStatus && atendeBusca;
    });

    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = `<li class="tarefa-item" style="justify-content:center; color:#94a3b8;">Nenhuma tarefa encontrada.</li>`;
        atualizarEstatisticas();
        return;
    }

    // 3. Percorre a lista filtrada e constrói o DOM[cite: 24, 25]
    tarefasFiltradas.forEach(tarefa => {[cite: 25]
        const li = document.createElement("li");[cite: 25]
        li.className = `tarefa-item prio-${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;

        // Estrutura interna do li
        li.innerHTML = `
            <div class="tarefa-content">
                <input type="checkbox" class="checkbox-custom" ${tarefa.concluida ? 'checked' : ''} onchange="alternarStatusTarefa(${tarefa.id})">
                <div class="tarefa-detalhes">
                    <span class="tarefa-titulo-texto" id="titulo-${tarefa.id}">#${tarefa.id} - ${tarefa.titulo}</span>
                    <div class="tarefa-meta">
                        <span class="badge">${tarefa.categoria}</span>
                        <span>Prioridade: ${tarefa.prioridade}</span>
                    </div>
                </div>
            </div>
            <div class="tarefa-acoes">
                <select class="select-prio-inline" onchange="alterarPrioridadeTarefa(${tarefa.id}, this.value)">
                    <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>Prio 1</option>
                    <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>Prio 2</option>
                    <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>Prio 3</option>
                </select>
                <button class="btn-icon" onclick="excluirTarefa(${tarefa.id})" title="Excluir">🗑️</button>
            </div>
        `;

        // 10. Estilização condicional de texto riscado se concluída[cite: 25]
        const spanTitulo = li.querySelector(`#titulo-${tarefa.id}`);
        if (tarefa.concluida) {
            spanTitulo.style.textDecoration = "line-through";[cite: 25]
            spanTitulo.style.color = "#94a3b8";
        }

        // Inserção do item criado no container da lista[cite: 24, 25]
        listaTarefas.appendChild(li);[cite: 25]
    });

    // Atualiza contadores
    atualizarEstatisticas();
}

// 12. Evento de submissão do formulário[cite: 26]
formTarefa.addEventListener("submit", function (event) {
    event.preventDefault();[cite: 26]

    const titulo = inputTitulo.value.trim();[cite: 26]
    const prioridade = inputPrioridade.value;
    const categoria = inputCategoria.value;

    try {
        cadastrarTarefa(titulo, prioridade, categoria);[cite: 20, 26]
        inputTitulo.value = "";[cite: 26]
        exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");
        render();[cite: 24, 26]
    } catch (erro) {
        exibirMensagem(erro.message, "erro");[cite: 20]
    }
});

// Eventos de pesquisa e filtros
inputBusca.addEventListener("input", function (e) {
    termoBusca = e.target.value;
    render();[cite: 24, 26]
});

document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        filtroStatus = this.getAttribute("data-filter");
        render();[cite: 24, 26]
    });
});

document.getElementById("btn-limpar-concluidas").addEventListener("click", limparConcluidas);

// 11. Inicialização da aplicação e primeira renderização[cite: 25, 26]
carregarLocalStorage();
render();[cite: 25, 26]