
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar a prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    document.getElementById("titulo").value = "";

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}

// Listar as tarefas cadastradas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "concluida"
            : "";

        lista.innerHTML += `
            <div class="tarefa">
                <h3 class="${classe}">
                    ${tarefa.titulo}
                </h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${prioridadeTexto}</p>

                <p>Status: ${status}</p>

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>
            </div>
        `;
    });
}

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;

        listarTarefas();

        alert("Tarefa concluída com sucesso!");
    } else {
        alert("Tarefa não encontrada!");
    }
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
