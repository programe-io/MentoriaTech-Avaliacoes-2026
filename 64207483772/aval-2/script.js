// --- ESTADO DA APLICAÇÃO ---
const tarefas = []; // Array central de tarefas[cite: 2]
let geradorCodigo = 0; // Gerador sequencial de códigos únicos[cite: 3]

// --- FUNÇÕES REUTILIZÁVEIS E DE REGRA DE NEGÓCIO ---

/**
 * Valida o título e a prioridade da tarefa.
 * Regras: Título >= 5 chars; Prioridade entre 1 e 3.
 */
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");[cite: 2]
    }
    
    // Operador || para verificar o intervalo de prioridades[cite: 2]
    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 (Alta) e 3 (Baixa).");[cite: 2, 3]
    }
}

/**
 * Busca uma tarefa específica no array pelo seu código.
 */
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);[cite: 4]
    
    // Tratamento com erro para código inexistente[cite: 4]
    if (!tarefa) {
        throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);[cite: 4]
    }
    
    return tarefa;[cite: 4]
}

/**
 * Cadastra uma nova tarefa.
 * Status inicial: em execução (true). Código: gerado automaticamente.
 */
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);[cite: 3]

    geradorCodigo++; // Incremento do gerador independente[cite: 3]
    
    const novaTarefa = {
        codigo: geradorCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true // true = Em Execução / Não Concluída[cite: 3]
    };

    tarefas.push(novaTarefa); // Adiciona ao array central[cite: 3]
    return novaTarefa;
}

/**
 * Retorna o conjunto de tarefas atual.
 */
function listarTarefas() {
    return tarefas;[cite: 3]
}

/**
 * Marca uma tarefa como concluída (status = false).
 */
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);[cite: 4]

    if (!tarefa.status) {
        throw new Error("Esta tarefa já estava concluída.");[cite: 4]
    }

    tarefa.status = false; // Define status como concluído[cite: 3, 4]
}

/**
 * Altera a prioridade de uma tarefa existente reutilizando a validação.
 */
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);[cite: 4]
    
    // Reutiliza a função de validação[cite: 4]
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);[cite: 4]
    
    tarefa.prioridade = Number(novaPrioridade);[cite: 5]
}

// --- INTERAÇÃO COM O DOM (INTERACTION & RENDERIZADOR) ---

const form = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const inputPrioridade = document.getElementById("prioridade");
const containerMensagem = document.getElementById("mensagem");
const listaElement = document.getElementById("lista-tarefas");

// Exibe mensagens na tela
function exibirMensagem(texto, tipo) {
    containerMensagem.textContent = texto;
    containerMensagem.className = `mensagem ${tipo}`;
}

function limparMensagem() {
    containerMensagem.textContent = "";
    containerMensagem.className = "mensagem";
}

// Renderiza a lista de tarefas atualizada na tela[cite: 5]
function renderizarLista() {
    listaElement.innerHTML = "";
    const listaAtual = listarTarefas();[cite: 3]

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

// Listener do Formulário de Cadastro
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
        exibirMensagem(erro.message, "erro");[cite: 3]
    }
});

// Ações Globais chamadas pelos botões dinamicos
window.executarConclusao = function(codigo) {
    limparMensagem();
    try {
        concluirTarefa(codigo);
        exibirMensagem(`Tarefa #${codigo} concluída!`, "sucesso");
        renderizarLista();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
};

window.executarAlteracaoPrioridade = function(codigo) {
    limparMensagem();
    const novaP = prompt("Informe a nova prioridade (1-Alta, 2-Média, 3-Baixa):");
    
    if (novaP !== null) {
        try {
            alterarPrioridade(codigo, Number(novaP));
            exibirMensagem(`Prioridade da tarefa #${codigo} alterada com sucesso!`, "sucesso");
            renderizarLista();
        } catch (erro) {
            exibirMensagem(erro.message, "erro");
        }
    }
};

// Renderização inicial
renderizarLista();