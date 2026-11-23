
let tarefas = [];

// CADASTRAR NOVA TAREFA

document.getElementById("tarefaForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // VALIDAR TÍTULO

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // VALIDAR PRIORIDADE

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // VALIDAR CÓDIGO DUPLICADO

    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    // CRIAR NOVA TAREFA

    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    this.reset();

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");

});


// LISTAR TAREFAS

function listarTarefas() {

    const tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    if (tarefas.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

    }

    tarefas.forEach((tarefa, index) => {

        let prioridadeTexto = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
            classePrioridade = "prioridade-alta";
        }
        else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
            classePrioridade = "prioridade-media";
        }
        else {
            prioridadeTexto = "Baixa";
            classePrioridade = "prioridade-baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classeStatus = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td>
                    <span class="${classePrioridade}">
                        ${prioridadeTexto}
                    </span>
                </td>

                <td>
                    <span class="${classeStatus}">
                        ${status}
                    </span>
                </td>

                <td>

                    ${!tarefa.concluida ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${index})">
                            Concluir
                        </button>
                    ` : ""}

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${index})">
                        Prioridade
                    </button>

                </td>
            </tr>
        `;

    });

    atualizarDashboard();

}


// MARCAR TAREFA COMO CONCLUÍDA

function concluirTarefa(index) {

    tarefas[index].concluida = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");

}


// ALTERAR PRIORIDADE

function alterarPrioridade(index) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = prioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");

}


// ATUALIZAR DASHBOARD

function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

    document.getElementById("tarefasPendentes").textContent = pendentes;

}


// INICIALIZAR SISTEMA

listarTarefas();
