
// Array para armazenar as tarefas
let tarefas = [];

let contador = 1;

// Elementos do HTML
const formulario = document.querySelector("#form-tarefa");

const lista = document.querySelector("#lista-tarefas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.querySelector("#titulo").value.trim();

    const prioridade = Number(
        document.querySelector("#prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    // Criar tarefa
    const tarefa = {
        codigo: contador++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();

    renderizarTarefas();

});

// Listar tarefas
function renderizarTarefas() {

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const nomePrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p>Prioridade: ${nomePrioridade[tarefa.prioridade]}</p>

            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    ${tarefa.concluida ? "Retomar tarefa" : "Concluir tarefa"}
                </button>

                <button
                    class="btn-alterar"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);

    });

}

// Marcar ou retomar tarefa
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    renderizarTarefas();

}

// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const prioridade = Number(prompt(
        "Escolha a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    ));

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = prioridade;

    renderizarTarefas();

}
