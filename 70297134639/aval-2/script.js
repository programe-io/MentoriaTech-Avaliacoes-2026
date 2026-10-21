
let tarefas = [];

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar uma nova tarefa
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar o código
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("O código deve ser um número inteiro positivo!");
        return;
    }

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar a prioridade
    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar se o código já existe
    const existe = tarefas.some(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (existe) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formTarefa.reset();
    document.getElementById("prioridade").value = "2";

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
});

// Listar as tarefas cadastradas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML =
            '<tr><td colspan="5">Nenhuma tarefa cadastrada.</td></tr>';
        return;
    }

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const celCodigo = document.createElement("td");
        celCodigo.textContent = tarefa.codigo;

        const celTitulo = document.createElement("td");
        celTitulo.textContent = tarefa.titulo;

        const celPrioridade = document.createElement("td");

        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        celPrioridade.textContent =
            tarefa.prioridade + " - " + nomesPrioridade[tarefa.prioridade];

        if (tarefa.prioridade === 1) {
            celPrioridade.className = "prioridade-alta";
        } else if (tarefa.prioridade === 2) {
            celPrioridade.className = "prioridade-media";
        } else {
            celPrioridade.className = "prioridade-baixa";
        }

        const celStatus = document.createElement("td");

        if (tarefa.concluida) {
            celStatus.textContent = "Concluída";
            celStatus.className = "concluida";
        } else {
            celStatus.textContent = "Pendente";
            celStatus.className = "pendente";
        }

        const celAcoes = document.createElement("td");

        // Botão para concluir a tarefa
        const btnConcluir = document.createElement("button");

        if (tarefa.concluida) {
            btnConcluir.textContent = "Concluída";
            btnConcluir.disabled = true;
        } else {
            btnConcluir.textContent = "Concluir";
            btnConcluir.className = "btn-concluir";

            btnConcluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });
        }

        // Botão para alterar a prioridade
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar prioridade";
        btnAlterar.className = "btn-alterar";

        btnAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        celAcoes.append(btnConcluir, btnAlterar);

        linha.append(
            celCodigo,
            celTitulo,
            celPrioridade,
            celStatus,
            celAcoes
        );

        listaTarefas.appendChild(linha);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Essa tarefa já foi concluída!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(t) {
        return t.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (
        novaPrioridade === null ||
        novaPrioridade.trim() === ""
    ) {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
