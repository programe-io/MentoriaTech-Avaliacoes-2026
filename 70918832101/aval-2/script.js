
const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

let tarefas = [];

// Cadastrar tarefa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = titulo.value.trim();
    const nivel = Number(prioridade.value);

    // Validar título
    if (nome.length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validar prioridade
    if (
        !Number.isInteger(nivel) ||
        nivel < 1 ||
        nivel > 3
    ) {
        mensagem.textContent =
            "A prioridade deve ser um número inteiro entre 1 e 3.";
        mensagem.style.color = "red";
        return;
    }

    const tarefa = {
        id: Date.now() + Math.random(),
        titulo: nome,
        prioridade: nivel,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    form.reset();

    listarTarefas();
});

// Listar tarefas
function listarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");

        const nome = document.createElement("span");

        nome.textContent =
            tarefa.titulo +
            " | Prioridade: " +
            tarefa.prioridade;

        if (tarefa.concluida) {
            nome.classList.add("concluida");
        }

        // Botão concluir
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = tarefa.concluida
            ? "Desfazer conclusão"
            : "Concluir";

        botaoConcluir.className = "concluir";

        botaoConcluir.addEventListener("click", function() {
            marcarConcluida(tarefa.id);
        });

        // Botão alterar prioridade
        const botaoAlterar = document.createElement("button");

        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "alterar";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.id);
        });

        item.appendChild(nome);
        item.appendChild(document.createElement("br"));
        item.appendChild(botaoConcluir);
        item.appendChild(botaoAlterar);

        lista.appendChild(item);
    });
}

// Marcar tarefa como concluída
function marcarConcluida(id) {
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(id) {
    const tarefa = tarefas.find(function(item) {
        return item.id === id;
    });

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) return;

    const nivel = Number(novaPrioridade.trim());

    if (
        !Number.isInteger(nivel) ||
        nivel < 1 ||
        nivel > 3
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = nivel;

    listarTarefas();
}
