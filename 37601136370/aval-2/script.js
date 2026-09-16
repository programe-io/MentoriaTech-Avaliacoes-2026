let tarefas = [];

const form = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres.", "red");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mostrarMensagem("A prioridade deve estar entre 1 e 3.", "red");
        return;
    }

    const novaTarefa = {
        codigo: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    form.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

    listarTarefas();
});

function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function (tarefa) {
        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <div class="info">
                <div class="titulo">${tarefa.titulo}</div>

                <div>
                    Prioridade: ${tarefa.prioridade}
                </div>

                <div class="status">
                    Status: ${tarefa.concluida ? "Concluída" : "Pendente"}
                </div>
            </div>

            <div class="acoes">
                <button 
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                >
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button 
                    class="btn-editar"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Prioridade
                </button>

                <button 
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.codigo})"
                >
                    Excluir
                </button>
            </div>
        `;

        listaTarefas.appendChild(div);
    });
}

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
            tarefa.prioridade
        )
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

function excluirTarefa(codigo) {
    tarefas = tarefas.filter(tarefa => tarefa.codigo !== codigo);

    listarTarefas();
}

function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}

listarTarefas();
