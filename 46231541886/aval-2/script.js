
// Array para armazenar as tarefas
let tarefas = [];

// Elementos HTML
const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Função para cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Capturando os dados
    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Regra de validação do título
    if (titulo.length < 5) {
        alert("O título deve possuir no mínimo 5 caracteres!");
        return;
    }

    // Regra de validação da prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Criando o objeto tarefa
    const tarefa = {

        codigo: tarefas.length > 0
            ? Math.max(...tarefas.map(t => t.codigo)) + 1
            : 1,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };

    // Adicionando tarefa ao array
    tarefas.push(tarefa);

    // Limpando formulário
    formulario.reset();

    // Atualizando a lista
    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");

});


// Função para listar as tarefas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const linha = document.createElement("tr");

        // Identificando a prioridade
        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "alta";

        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "media";

        } else {
            nomePrioridade = "Baixa";
            classePrioridade = "baixa";
        }

        // Identificando o status
        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classeStatus = tarefa.concluida
            ? "concluida"
            : "pendente";

        // Criando as colunas
        const colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = tarefa.codigo;

        const colunaTitulo = document.createElement("td");
        colunaTitulo.textContent = tarefa.titulo;

        const colunaPrioridade = document.createElement("td");
        colunaPrioridade.textContent = nomePrioridade;
        colunaPrioridade.className = classePrioridade;

        const colunaStatus = document.createElement("td");
        colunaStatus.textContent = status;
        colunaStatus.className = classeStatus;

        const colunaAcoes = document.createElement("td");

        // Botão para concluir tarefa
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        botaoConcluir.className = "btn-concluir";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        // Botão para alterar prioridade
        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.className = "btn-prioridade";

        botaoPrioridade.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        // Adicionando botões à coluna
        colunaAcoes.appendChild(botaoConcluir);
        colunaAcoes.appendChild(botaoPrioridade);

        // Adicionando colunas à linha
        linha.appendChild(colunaCodigo);
        linha.appendChild(colunaTitulo);
        linha.appendChild(colunaPrioridade);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);

        // Adicionando linha à tabela
        listaTarefas.appendChild(linha);

    });

}


// Função para marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");

}


// Função para alterar a prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    // Validando prioridade
    if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(novaPrioridade);

    listarTarefas();

    alert("Prioridade alterada com sucesso!");

}
