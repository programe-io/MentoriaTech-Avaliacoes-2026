
// ARRAY PARA ARMAZENAR AS TAREFAS
let tarefas = [];

// ELEMENTOS DO HTML
const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

// CADASTRAR NOVA TAREFA
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // VALIDAÇÃO DO TÍTULO
    if (titulo.length < 5) {
        alert("O título deve possuir no mínimo 5 caracteres!");
        return;
    }

    // VALIDAÇÃO DA PRIORIDADE
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // VERIFICAR CÓDIGO DUPLICADO
    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    // CRIAR OBJETO DA TAREFA
    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // ADICIONAR AO ARRAY
    tarefas.push(novaTarefa);

    alert("Tarefa cadastrada com sucesso!");

    form.reset();

    listarTarefas();

});


// LISTAR TAREFAS
function listarTarefas() {

    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

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

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classeStatus = tarefa.concluida
            ? "concluida"
            : "pendente";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td>
                <span class="prioridade ${classePrioridade}">
                    ${nomePrioridade}
                </span>
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-concluir"
                        onclick="concluirTarefa(${index})"
                        ${tarefa.concluida ? "disabled" : ""}>
                        Concluir
                    </button>

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${index})">
                        Prioridade
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirTarefa(${index})">
                        Excluir
                    </button>

                </div>
            </td>
        `;

        lista.appendChild(linha);

    });

    atualizarDashboard();

}


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(index) {

    tarefas[index].concluida = true;

    alert("Tarefa concluída com sucesso!");

    listarTarefas();

}


// ALTERAR PRIORIDADE
function alterarPrioridade(index) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    // VALIDAR PRIORIDADE
    if (![1, 2, 3].includes(prioridade)) {

        alert("Prioridade inválida! Digite 1, 2 ou 3.");

        return;
    }

    tarefas[index].prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();

}


// EXCLUIR TAREFA
function excluirTarefa(index) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (confirmar) {

        tarefas.splice(index, 1);

        listarTarefas();

    }

}


// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("contador").textContent =
        total + (total === 1 ? " tarefa" : " tarefas");

}
