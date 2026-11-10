// Array central de tarefas[cite: 19]
let tarefas = [];

// Gerador de códigos independente (iniciado em 1)[cite: 20]
let proximoCodigo = 1;

// 1. Validação dos dados da tarefa[cite: 19, 20]
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título da tarefa deve ter no mínimo 5 carateres.");[cite: 19, 20]
    }
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");[cite: 19, 20]
    }
}

// 2. Buscar tarefa pelo código com método find[cite: 21]
function buscarTarefa(codigo) {
    const tarefa = tarefas.find((t) => t.codigo === codigo);[cite: 21]
    if (!tarefa) {
        throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);[cite: 21]
    }
    return tarefa;[cite: 21]
}

// 3. Cadastrar tarefa[cite: 20]
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);[cite: 20]

    const novaTarefa = {
        codigo: proximoCodigo++,[cite: 20]
        titulo: titulo,[cite: 20]
        prioridade: Number(prioridade),[cite: 20]
        status: true // true = "em execução / não concluída"[cite: 19, 20]
    };

    tarefas.push(novaTarefa);[cite: 20]
    return novaTarefa;
}

// 4. Listar tarefas[cite: 20]
function listarTarefas() {
    return tarefas;[cite: 20]
}

// 5. Concluir tarefa[cite: 21]
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);[cite: 21]

    if (tarefa.status === false) {
        throw new Error("A tarefa já estava concluída.");[cite: 21]
    }

    tarefa.status = false;[cite: 21]
}

// 6. Alterar prioridade[cite: 21]
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);[cite: 21]
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);[cite: 21]
    tarefa.prioridade = Number(novaPrioridade);[cite: 22]
}

// --- Interface do Utilizador (Renderização dos Cartões da Tarefa) ---

function exibirMensagem(texto, tipo) {
    const div = document.getElementById("mensagem");
    div.textContent = texto;
    div.className = `mensagem ${tipo}`;
    setTimeout(() => div.className = "mensagem hidden", 3500);
}

// Cria o elemento visual HTML para uma única tarefa
function criarElementoTarefa(t) {
    const card = document.createElement("div");
    card.className = `tarefa-card ${!t.status ? 'concluida' : ''}`;

    const statusTexto = t.status ? "Em execução" : "Concluída";[cite: 20, 21]
    const statusClasse = t.status ? "status-execucao" : "status-concluida";

    card.innerHTML = `
        <div>
            <div class="tarefa-header">
                <span class="tarefa-codigo">Código: #${t.codigo}</span>
                <span class="badge-status ${statusClasse}">${statusTexto}</span>
            </div>
            <div class="tarefa-titulo">${t.titulo}</div>
            <div class="tarefa-info">
                Prioridade: <strong>${t.prioridade}</strong> (1=Alta, 2=Média, 3=Baixa)
            </div>
        </div>
        <div class="tarefa-acoes">
            ${t.status ? `<button onclick="executarConclusao(${t.codigo})" class="btn-concluir">Marcar como Concluída</button>` : ''}
            <div class="acao-prioridade">
                <input type="number" id="prio-input-${t.codigo}" min="1" max="3" placeholder="1-3">
                <button onclick="executarAlterarPrioridade(${t.codigo})" class="btn-prioridade">Alterar Prioridade</button>
            </div>
        </div>
    `;

    return card;
}

// Renderiza todas as tarefas no ecrã
function renderizarTarefas(lista = listarTarefas()) {[cite: 20]
    const container = document.getElementById("lista-tarefas");
    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    lista.forEach(t => {
        container.appendChild(criarElementoTarefa(t));
    });
}

// Evento: Submeter Cadastro
document.getElementById("form-cadastrar").addEventListener("submit", function(e) {
    e.preventDefault();
    try {
        const titulo = document.getElementById("titulo").value;
        const prioridade = document.getElementById("prioridade").value;
        cadastrarTarefa(titulo, prioridade);[cite: 20]
        renderizarTarefas();
        exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
        this.reset();
    } catch (err) {
        exibirMensagem(err.message, "erro");[cite: 20]
    }
});

// Ações executadas diretamente no cartão da tarefa
function executarConclusao(codigo) {
    try {
        concluirTarefa(codigo);[cite: 21]
        renderizarTarefas();
        exibirMensagem("Tarefa concluída com sucesso!", "sucesso");
    } catch (err) {
        exibirMensagem(err.message, "erro");[cite: 21]
    }
}

function executarAlterarPrioridade(codigo) {
    try {
        const novaPrioridade = document.getElementById(`prio-input-${codigo}`).value;
        alterarPrioridade(codigo, novaPrioridade);[cite: 21, 22]
        renderizarTarefas();
        exibirMensagem("Prioridade alterada!", "sucesso");
    } catch (err) {
        exibirMensagem(err.message, "erro");[cite: 22]
    }
}

// Busca e exibição individual de uma tarefa
function executarBusca() {
    try {
        const codigo = Number(document.getElementById("input-busca").value);
        const tarefa = buscarTarefa(codigo);[cite: 21]
        
        const divResultado = document.getElementById("resultado-busca");
        divResultado.innerHTML = "<h3>Resultado da Busca:</h3>";
        divResultado.appendChild(criarElementoTarefa(tarefa));
        divResultado.classList.remove("hidden");
    } catch (err) {
        exibirMensagem(err.message, "erro");[cite: 21]
    }
}

function limparBusca() {
    document.getElementById("input-busca").value = "";
    document.getElementById("resultado-busca").classList.add("hidden");
    renderizarTarefas();
}