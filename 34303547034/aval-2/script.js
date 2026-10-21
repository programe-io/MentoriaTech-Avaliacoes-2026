
const tarefas = [];
let contadorCodigo = 0;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        alert("O título deve ter pelo menos 5 caracteres.");
        return false;
    }

    if (![1, 2, 3].includes(Number(prioridade))) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return false;
    }

    return true;
}

function buscarTarefa(codigo) {
    return tarefas.find(tarefa => tarefa.codigo === codigo);
}

function cadastrarTarefa(titulo, prioridade) {
    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    contadorCodigo++;

    const tarefa = {
        codigo: contadorCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(tarefa);
    listarTarefas();
    formulario.reset();
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    if (tarefa.status === false) {
        alert("Essa tarefa já foi concluída.");
        return;
    }

    tarefa.status = false;
    listarTarefas();
}

function alterarPrioridade(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa)"
    );

    if (novaPrioridade === null) {
        return;
    }

    if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
        alert("Prioridade inválida. Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(novaPrioridade);
    listarTarefas();
}

function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {
        const elemento = document.createElement("div");
        elemento.className = "tarefa";

        if (tarefa.status === false) {
            elemento.classList.add("concluida");
        }

        const status = tarefa.status
            ? "Em andamento"
            : "Concluída";

        const prioridades = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        elemento.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>
            <p><strong>Título:</strong> ${tarefa.titulo}</p>
            <p><strong>Prioridade:</strong> ${prioridades[tarefa.prioridade]}</p>
            <p class="status"><strong>Status:</strong> ${status}</p>
            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>
            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        listaTarefas.appendChild(elemento);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    cadastrarTarefa(
        campoTitulo.value,
        campoPrioridade.value
    );
});

listarTarefas();
