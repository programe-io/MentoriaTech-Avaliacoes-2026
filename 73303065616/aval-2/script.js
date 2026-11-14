let tarefas = [];

const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

function atualizarResumo() {
    let total = tarefas.length;
    let concluidas = 0;

    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].concluida) {
            concluidas++;
        }
    }

    document.getElementById("total").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        let tarefa = tarefas[i];

        let item = document.createElement("li");

        item.innerHTML = `
            <span class="${tarefa.concluida ? 'concluida' : ''}">
                ${tarefa.nome}
            </span>

            <div class="acoes">
                <button data-id="${tarefa.id}" data-acao="concluir">
                    Concluir
                </button>

                <button class="excluir" data-id="${tarefa.id}" data-acao="excluir">
                    Excluir
                </button>
            </div>
        `;

        listaTarefas.appendChild(item);
    }

    atualizarResumo();
}

function adicionarTarefa() {
    let nome = tarefaInput.value.trim();

    if (nome === "") {
        mensagem.textContent = "Digite uma tarefa primeiro!";
        return;
    }

    let novaTarefa = {
        id: Date.now(),
        nome: nome,
        concluida: false
    };

    tarefas.push(novaTarefa);

    tarefaInput.value = "";
    mensagem.textContent = "Tarefa adicionada com sucesso!";

    renderizarTarefas();

    setTimeout(function() {
        mensagem.textContent = "";
    }, 2000);
}

function concluirTarefa(id) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === id) {
            tarefas[i].concluida = !tarefas[i].concluida;
            break;
        }
    }

    renderizarTarefas();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(function(tarefa) {
        return tarefa.id !== id;
    });

    renderizarTarefas();
}

adicionarBtn.addEventListener("click", adicionarTarefa);

tarefaInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

listaTarefas.addEventListener("click", function(event) {
    let botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    let id = Number(botao.dataset.id);
    let acao = botao.dataset.acao;

    if (acao === "concluir") {
        concluirTarefa(id);
    } else if (acao === "excluir") {
        excluirTarefa(id);
    }
});

renderizarTarefas();