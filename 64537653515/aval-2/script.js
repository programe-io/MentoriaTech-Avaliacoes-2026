// --- ESTADO DA APLICAÇÃO ---
// Array central para armazenar os objetos de tarefa[cite: 2]
const tarefas = [];

// Gerador automático de códigos sequenciais[cite: 3]
let proximoCodigo = 1;

// --- FUNÇÕES DE REGRA DE NEGÓCIO (baseadas na aula) ---

/**
 * Validar os dados da tarefa[cite: 2]
 * Exige título com no mínimo 5 caracteres e prioridade entre 1 e 3[cite: 2].
 */
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("O título da tarefa deve possuir no mínimo 5 caracteres.");[cite: 2]
    }
    
    const prioNum = Number(prioridade);
    if (isNaN(prioNum) || prioNum < 1 || prioNum > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");[cite: 2, 3]
    }
}

/**
 * Cadastrar uma nova tarefa[cite: 2, 3]
 * Cria objeto com código, título, prioridade e status[cite: 3].
 */
function cadastrarTarefa(titulo, prioridade) {
    // Validação previa dos dados[cite: 3]
    validarDadosDaTarefa(titulo, prioridade);

    // Estruturação da tarefa[cite: 3]
    const novaTarefa = {
        codigo: proximoCodigo++, // Gera e incrementa o código automático[cite: 3]
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true // true = Em execução / Não concluída, false = Concluída[cite: 2, 3]
    };

    // Inserção no array[cite: 3]
    tarefas.push(novaTarefa);
    return novaTarefa;
}

/**
 * Listar tarefas cadastradas[cite: 3]
 * Retorna o array contendo todas as tarefas[cite: 3].
 */
function listarTarefas() {
    return tarefas;[cite: 3]
}

/**
 * Buscar tarefa pelo código[cite: 4]
 * Utiliza o método find do Array[cite: 4].
 */
function buscarTarefa(codigo) {
    const codNum = Number(codigo);
    const tarefaEncontrada = tarefas.find(t => t.codigo === codNum);[cite: 4]

    if (!tarefaEncontrada) {
        throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);[cite: 4]
    }

    return tarefaEncontrada;[cite: 4]
}

/**
 * Concluir uma tarefa[cite: 4]
 * Altera a propriedade status para false[cite: 4].
 */
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);[cite: 4]

    if (!tarefa.status) {
        throw new Error("Esta tarefa já está concluída.");[cite: 4]
    }

    tarefa.status = false; // Altera para concluído[cite: 3, 4]
    return tarefa;
}

/**
 * Alterar a prioridade de uma tarefa existente[cite: 2, 4]
 * Reaproveita a busca e a validação existente[cite: 4].
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);[cite: 4]
    
    // Valida reaproveitando a função, passando o título original[cite: 4]
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = Number(novaPrioridade);[cite: 5]
    return tarefa;
}


// --- INTEGRAÇÃO COM A INTERFACE (DOM) ---

const formTarefa = document.getElementById("form-tarefa");
const formAlterarPrioridade = document.getElementById("form-alterar-prioridade");
const listaTarefasContainer = document.getElementById("lista-tarefas");
const divMensagem = document.getElementById("mensagem");

// Exibir mensagens de erro ou sucesso
function exibirMensagem(texto, tipo) {
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
    setTimeout(() => {
        divMensagem.className = "mensagem oculto";
    }, 4000);
}

// Renderizar a lista de tarefas na tela[cite: 5]
function renderizarTarefas() {
    const lista = listarTarefas();
    listaTarefasContainer.innerHTML = "";

    if (lista.length === 0) {
        listaTarefasContainer.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    lista.forEach(tarefa => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `tarefa-item ${!tarefa.status ? "concluida" : ""}`;

        const textoStatus = tarefa.status ? "Em Execução" : "Concluída";[cite: 3, 4]
        
        itemDiv.innerHTML = `
            <div class="tarefa-info">
                <p><strong>[#${tarefa.codigo}]</strong> ${tarefa.titulo}</p>
                <p><small>Prioridade: ${tarefa.prioridade} | Status: ${textoStatus}</small></p>
            </div>
            <div>
                ${tarefa.status ? `<button class="btn-concluir" onclick="handleConcluir(\${tarefa.codigo})">Concluir</button>` : ''}
            </div>
        `;

        listaTarefasContainer.appendChild(itemDiv);
    });
}

// Evento: Cadastrar Tarefa
formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;

    try {
        cadastrarTarefa(titulo, prioridade);
        exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
        formTarefa.reset();
        renderizarTarefas();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Evento: Alterar Prioridade
formAlterarPrioridade.addEventListener("submit", (e) => {
    e.preventDefault();
    const codigo = document.getElementById("codigo-prioridade").value;
    const novaPrioridade = document.getElementById("nova-prioridade").value;

    try {
        alterarPrioridade(codigo, novaPrioridade);
        exibirMensagem("Prioridade alterada com sucesso!", "sucesso");
        formAlterarPrioridade.reset();
        renderizarTarefas();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Ação de Concluir Tarefa
function handleConcluir(codigo) {
    try {
        concluirTarefa(codigo);
        exibirMensagem("Tarefa marcada como concluída!", "sucesso");
        renderizarTarefas();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}