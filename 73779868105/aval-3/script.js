
let tarefas = [];

function cadastrarTarefa() {
    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (codigo === "" || titulo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();
}

function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach((tarefa, indice) => {
        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
                <p><strong>Código:</strong> ${tarefa.codigo}</p>
                <p><strong>Título:</strong> ${tarefa.titulo}</p>
                <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
                <p><strong>Status:</strong>
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </p>

                <button onclick="concluirTarefa(${indice})">
                    Marcar como concluída
                </button>

                <button onclick="alterarPrioridade(${indice})">
                    Alterar prioridade
                </button>
            </div>
        `;
    });
}

function concluirTarefa(indice) {
    tarefas[indice].concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}

function alterarPrioridade(indice) {
    let novaPrioridade = Number(
        prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[indice].prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}

listarTarefas();
