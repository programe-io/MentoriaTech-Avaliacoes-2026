
// Recupera as tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salva as tarefas no LocalStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastra uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (!titulo.trim()) {
        alert("Digite o título da tarefa!");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    salvarTarefas();
    listarTarefas();
}

// Exclui uma tarefa
function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefas();
    listarTarefas();
}

// Altera o status da tarefa
function concluirTarefa(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.status =
                tarefa.status === "Concluída"
                ? "Pendente"
                : "Concluída";
        }

        return tarefa;
    });

    salvarTarefas();
    listarTarefas();
}

// Filtra tarefas
function filtrarTarefas(status, prioridade) {
    let resultado = tarefas;

    if (status !== "Todas") {
        resultado = resultado.filter(
            tarefa => tarefa.status === status
        );
    }

    if (prioridade !== "Todas") {
        resultado = resultado.filter(
            tarefa => tarefa.prioridade === prioridade
        );
    }

    return resultado;
}

// Pesquisa tarefas pelo título
function pesquisarTarefas(texto) {
    return tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(
            texto.toLowerCase()
        )
    );
}

// Lista as tarefas na tela
function listarTarefas(lista = tarefas) {
    const elemento = document.getElementById("listaTarefas");

    elemento.innerHTML = "";

    lista.forEach(tarefa => {
        const item = document.createElement("li");

        item.innerHTML = `
            <strong>${tarefa.titulo}</strong>
            <span>Prioridade: ${tarefa.prioridade}</span>
            <span>Status: ${tarefa.status}</span>

            <button onclick="concluirTarefa(${tarefa.id})">
                Alterar status
            </button>

            <button onclick="excluirTarefa(${tarefa.id})">
                Excluir
            </button>
        `;

        elemento.appendChild(item);
    });

    atualizarContadores();
}

// Atualiza os contadores
function atualizarContadores() {
    const pendentes = tarefas.filter(
        tarefa => tarefa.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === "Concluída"
    ).length;

    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

// Carrega as tarefas ao abrir a página
listarTarefas();
