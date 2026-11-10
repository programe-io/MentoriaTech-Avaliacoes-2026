
let tarefas = [];
let proximoCodigo = 1;

// CADASTRAR NOVA TAREFA
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve possuir no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    document.getElementById("titulo").value = "";

    listarTarefas();
}

// LISTAR TAREFAS CADASTRADAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <div>
                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${nomePrioridade}</p>

                <p class="status">
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </p>
            </div>

            <div class="acoes">
                <button class="concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button class="alterar"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });

    document.getElementById("contador").textContent =
        `${tarefas.length} tarefa(s)`;
}

// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

// ALTERAR PRIORIDADE DA TAREFA
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
