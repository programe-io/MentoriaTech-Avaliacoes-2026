
const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");

const total = document.getElementById("total");
const pendentes = document.getElementById("pendentes");
const concluidas = document.getElementById("concluidas");

let tarefas = [];
let proximoId = 1;

// Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (!titulo.trim()) {
        alert("Digite o título da tarefa!");
        return;
    }

    const tarefa = {
        codigo: proximoId++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    listarTarefas();
}

// Lista todas as tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
    }

    tarefas.forEach(function(tarefa) {
        const elemento = document.createElement("article");

        elemento.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const conteudo = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        prioridade.className =
            "prioridade-" + tarefa.prioridade
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        conteudo.append(titulo, prioridade, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoStatus = document.createElement("button");
        botaoStatus.className = "btn-concluir";
        botaoStatus.textContent = tarefa.status
            ? "Concluir"
            : "Reabrir";

        botaoStatus.addEventListener("click", function() {
            alterarStatus(tarefa.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.codigo);
        });

        acoes.append(botaoStatus, botaoExcluir);
        elemento.append(conteudo, acoes);
        listaTarefas.appendChild(elemento);
    });

    atualizarResumo();
}

// Altera o status da tarefa
function alterarStatus(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.status = !tarefa.status;
        listarTarefas();
    }
}

// Exclui uma tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.codigo !== codigo;
    });

    listarTarefas();
}

// Atualiza os contadores
function atualizarResumo() {
    total.textContent = tarefas.length;

    pendentes.textContent = tarefas.filter(function(tarefa) {
        return tarefa.status;
    }).length;

    concluidas.textContent = tarefas.filter(function(tarefa) {
        return !tarefa.status;
    }).length;
}

// Recebe os dados do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();

    cadastrarTarefa(
        campoTitulo.value,
        campoPrioridade.value
    );

    form.reset();
    campoPrioridade.value = "Média";
    campoTitulo.focus();
});

// Inicializa a lista
listarTarefas();