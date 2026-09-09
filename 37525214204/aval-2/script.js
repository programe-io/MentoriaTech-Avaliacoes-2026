let tarefas = [];

const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const cadastrar = document.getElementById("cadastrar");
const listaTarefas = document.getElementById("listaTarefas");

cadastrar.addEventListener("click", function () {

    const nome = titulo.value.trim();
    const nivel = Number(prioridade.value);

    // Validação do título
    if (nome.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (nivel < 1 || nivel > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: nome,
        prioridade: nivel,
        concluida: false
    };

    tarefas.push(tarefa);

    titulo.value = "";
    prioridade.value = "1";

    mostrarTarefas();
});

function mostrarTarefas() {

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
                <h3>${tarefa.titulo}</h3>
                <p>Prioridade: ${textoPrioridade(tarefa.prioridade)}</p>
                <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>
            </div>

            <div class="acoes">
                <button class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.id})">
                    ${tarefa.concluida ? "Desmarcar" : "Concluir"}
                </button>

                <button class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.id})">
                    Alterar prioridade
                </button>
            </div>
        `;

        listaTarefas.appendChild(div);
    });
}

function textoPrioridade(valor) {

    if (valor === 1) {
        return "1 - Alta";
    }

    if (valor === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}

function marcarConcluida(id) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        mostrarTarefas();
    }
}

function alterarPrioridade(id) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {

        if (tarefa.prioridade === 1) {
            tarefa.prioridade = 2;
        } 
        else if (tarefa.prioridade === 2) {
            tarefa.prioridade = 3;
        } 
        else {
            tarefa.prioridade = 1;
        }

        mostrarTarefas();
    }
}

mostrarTarefas();
