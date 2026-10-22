// --- ESTADO DA APLICAÇÃO ---
const tarefas = []; // Array central que armazena as tarefas
let geradorCodigo = 0; // Gerador sequencial de códigos

// --- FUNÇÕES DE REGRA DE NEGÓCIO E VALIDAÇÕES ---

/**
 * Valida os dados de entrada.
 * Regras: Título mínimo 5 caracteres; Prioridade entre 1 e 3.
 */
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 (Alta) e 3 (Baixa).");
    }
}

/**
 * Procura uma tarefa pelo código no array.
 */
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    
    if (!tarefa) {
        throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
    }
    
    return tarefa;
}

/**
 * Cadastra uma nova tarefa no array.
 */
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    geradorCodigo++; // Incrementa código sequencial
    
    const novaTarefa = {
        codigo: geradorCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true // true = Em Execução / Não Concluída
    };

    tarefas.push(novaTarefa);
    return novaTarefa;
}

/**
 * Retorna a lista completa de tarefas.
 */
function listarTarefas() {
    return tarefas;
}

/**
 * Altera o status da tarefa para concluída (status = false).
 */
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;
}

/**
 * Altera a prioridade de uma tarefa existente.
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    
    // Reutiliza a função de validação
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
    
    tarefa.prioridade = Number(novaPrioridade);
}

// --- INTEGRAÇÃO COM A INTERFACE (DOM) ---

const form = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const inputPrioridade = document.getElementById("prioridade");
const containerMensagem = document.getElementById("mensagem");
const listaElement = document.getElementById("lista-tarefas");

function exibirMensagem(texto, tipo) {
    containerMensagem.textContent = texto;
    containerMensagem.className = `mensagem ${tipo}`;
}

function limparMensagem() {
    containerMensagem.textContent = "";
    containerMensagem.className = "mensagem";
}

function renderizarLista() {
    listaElement.innerHTML = "";
    const listaAtual = listarTarefas();

    if (listaAtual.length === 0) {
        listaElement.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>";
        return;
    }

    listaAtual.forEach(tarefa => {
        const li = document.createElement("li");
        li.className = `p-${tarefa.prioridade} ${!tarefa.status ? 'concluida' : ''}`;

        const statusTexto = tarefa.status ? "Em Execução" : "Concluída";

        li.innerHTML = `
            <div class="info-tarefa">
                <strong>[#${tarefa.codigo}] ${tarefa.titulo}</strong>
                <small>Prioridade: ${tarefa.prioridade} | Status: ${statusTexto}</small>
            </div>
            <div class="acoes">
                ${tarefa.status ? `<button class="btn-concluir" onclick="executarConclusao(${tarefa.codigo})">Concluir</button>` : ''}
                <button class="btn-prioridade" onclick="executarAlteracaoPrioridade(${tarefa.codigo})">Mudar Prioridade</button>
            </div>
        `;

        listaElement.appendChild(li);
    });
}

// Evento de Envio do Formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    limparMensagem();

    try {
        const titulo = inputTitulo.value;
        const prioridade = Number(inputPrioridade.value);

        cadastrarTarefa(titulo, prioridade);
        exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");

        inputTitulo.value = "";
        inputPrioridade.value = "";
        renderizarLista();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Ações disparadas pelos botões da lista
window.executarConclusao = function(codigo) {
    limparMensagem();
    try {
        concluirTarefa(codigo);
        exibirMensagem(`Tarefa #${codigo} concluída com sucesso!`, "sucesso");
        renderizarLista();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
};

window.executarAlteracaoPrioridade = function(codigo) {
    limparMensagem();
    const novaP = prompt("Digite a nova prioridade (1-Alta, 2-Média, 3-Baixa):");
    
    if (novaP !== null) {
        try {
            alterarPrioridade(codigo, Number(novaP));
            exibirMensagem(`Prioridade da tarefa #${codigo} alterada!`, "sucesso");
            renderizarLista();
        } catch (erro) {
            exibirMensagem(erro.message, "erro");
        }
    }
};

// Renderiza a lista ao carregar a página
renderizarLista();