let tarefas = [];


// CADASTRAR TAREFA
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    listarTarefas();
}


// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `
            <p class="mensagem">
                Nenhuma tarefa cadastrada.
            </p>
        `;
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <div class="informacoes">
                <span class="titulo">
                    ${tarefa.titulo}
                </span>

                <span class="prioridade">
                    Prioridade: ${mostrarPrioridade(tarefa.prioridade)}
                </span>

                <span>
                    Status:
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </span>
            </div>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.id})"
                    ${tarefa.concluida ? "disabled" : ""}
                >
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.id})"
                >
                    Alterar Prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// MOSTRAR NOME DA PRIORIDADE
function mostrarPrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}


// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    // Validação da prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3 || isNaN(novaPrioridade)) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// INICIA A LISTA
listarTarefas();
