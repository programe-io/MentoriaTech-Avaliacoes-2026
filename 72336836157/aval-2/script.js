// Lista onde as tarefas serão armazenadas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// CADASTRAR NOVA TAREFA
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
        alert("A prioridade deve ser entre 1 e 3.");
        return;
    }

    // Criação da tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    // Limpar campo
    document.getElementById("titulo").value = "";

    listarTarefas();
}


// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `
            <p class="vazia">
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

        let nomePrioridade;

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <h3>${tarefa.codigo} - ${tarefa.titulo}</h3>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})">
                            Concluir
                        </button>
                    `
                    : ""
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
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
    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibir lista inicialmente
listarTarefas();