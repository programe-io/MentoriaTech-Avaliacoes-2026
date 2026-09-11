// ================================================
// ESTADO GLOBAL E GERADOR DE CÓDIGO (Itens 3 e 7)
// ================================================
const tarefas = [];
let proximoCodigo = 1; // Gerador de código independente iniciado em zero (+1 na primeira criação)

// ================================================
// FUNÇÃO AUXILIAR DE INTERFACE
// ================================================
function exibirMensagem(texto, tipo = "sucesso") {
    const msgElemento = document.getElementById("mensagem");
    msgElemento.textContent = texto;
    msgElemento.className = `mensagem ${tipo}`;
    
    setTimeout(() => {
        msgElemento.className = "mensagem hidden";
    }, 4000);
}

// ================================================
// REGRAS DE NEGÓCIO E FUNÇÕES CORE (Itens 4 a 12)
// ================================================

// 1. Validar Dados da Tarefa (Item 5)
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
    
    const prioNum = Number(prioridade);
    if (prioNum < 1 || prioNum > 3 || isNaN(prioNum)) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// 2. Buscar Tarefa por Código usando find (Item 9)
function buscarTarefa(codigo) {
    const tarefaEncontrada = tarefas.find((t) => t.codigo === Number(codigo));
    
    if (!tarefaEncontrada) {
        throw new Error(`Tarefa com o código #${codigo} não foi encontrada.`);
    }
    
    return tarefaEncontrada;
}

// 3. Cadastrar Tarefa (Item 6)
function cadastrarTarefa(titulo, prioridade) {
    // Validação
    validarDadosDaTarefa(titulo, prioridade);

    // Modelagem da tarefa
    const novaTarefa = {
        codigo: proximoCodigo++, // Usa o gerador independente e incrementa
        titulo: titulo,
        prioridade: Number(prioridade),
        status: true // true = Em execução, false = Concluída
    };

    tarefas.push(novaTarefa);
    renderizarTabela();
}

// 4. Listar Tarefas (Item 8 e 13)
function listarTarefas() {
    return tarefas;
}

// Renderiza os dados retornados de listarTarefas na interface HTML
function renderizarTabela() {
    const corpoTabela = document.getElementById("lista-tarefas");
    corpoTabela.innerHTML = "";

    const lista = listarTarefas();

    lista.forEach((tarefa) => {
        const linha = document.createElement("tr");

        // Formatação legível da prioridade
        const textoPrioridade = { 1: "1 - Alta", 2: "2 - Média", 3: "3 - Baixa" };

        linha.innerHTML = `
            <td><strong>#${tarefa.codigo}</strong></td>
            <td>${tarefa.titulo}</td>
            <td class="prio-${tarefa.prioridade}">${textoPrioridade[tarefa.prioridade]}</td>
            <td>
                <span class="status-badge ${tarefa.status ? 'status-em-execucao' : 'status-concluida'}">
                    ${tarefa.status ? 'Em Execução' : 'Concluída'}
                </span>
            </td>
        `;

        corpoTabela.appendChild(linha);
    });
}

// 5. Concluir Tarefa (Item 10)
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(`A tarefa #${codigo} já estava concluída.`);
    }

    tarefa.status = false; // Altera status para concluída
    renderizarTabela();
}

// 6. Alterar Prioridade (Item 11)
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    // Reutiliza a validação passando o título atual já cadastrado
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = Number(novaPrioridade);
    renderizarTabela();
}

// ================================================
// EVENTOS DOM / CONEXÃO COM A INTERFACE
// ================================================

// Form de Cadastro
document.getElementById("form-cadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const titulo = document.getElementById("titulo").value.trim();
        const prioridade = document.getElementById("prioridade").value;

        cadastrarTarefa(titulo, prioridade);
        exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
        e.target.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Form de Conclusão
document.getElementById("form-concluir").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const codigo = document.getElementById("codigo-concluir").value;
        concluirTarefa(codigo);
        exibirMensagem(`Tarefa #${codigo} marcada como concluída!`, "sucesso");
        e.target.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Form de Prioridade
document.getElementById("form-prioridade").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const codigo = document.getElementById("codigo-prioridade").value;
        const novaPrioridade = document.getElementById("nova-prioridade").value;

        alterarPrioridade(codigo, novaPrioridade);
        exibirMensagem(`Prioridade da tarefa #${codigo} atualizada!`, "sucesso");
        e.target.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});