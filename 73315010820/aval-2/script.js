
let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagemVazia = document.getElementById("mensagemVazia");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validar a prioridade
    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();
    campoPrioridade.value = "2";

    listarTarefas();
});

// Listar as tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    mensagemVazia.style.display =
        tarefas.length === 0 ? "block" : "none";

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");
        prioridade.textContent =
            tarefa.prioridade + " - " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        prioridade.className =
            "prioridade-" + tarefa.prioridade;

        const status = document.createElement("td");
        status.textContent =
            tarefa.concluida ? "Concluída" : "Pendente";

        status.className = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        const acoes = document.createElement("td");

        // Botão para concluir
        if (!tarefa.concluida) {
            const btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Concluir";
            btnConcluir.className = "btn-concluir";

            btnConcluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });

            acoes.appendChild(btnConcluir);
        }

        // Botão para alterar a prioridade
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.className = "btn-alterar";

        btnAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(btnAlterar);

        // Botão para excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.codigo);
        });

        acoes.appendChild(btnExcluir);

        linha.append(codigo, titulo, prioridade, status, acoes);
        listaTarefas.appendChild(linha);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar a prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const resposta = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novaPrioridade = Number(resposta);

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// Excluir tarefa
function excluirTarefa(codigo) {
    const confirmar = confirm("Deseja excluir esta tarefa?");

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(function(item) {
        return item.codigo !== codigo;
    });

    listarTarefas();
}