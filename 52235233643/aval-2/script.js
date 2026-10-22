
let tarefas = [];
let proximoCodigo = 1;

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar a prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    formulario.reset();
    campoPrioridade.value = "2";

    listarTarefas();
});

// Retornar o nome da prioridade
function nomePrioridade(prioridade) {
    if (prioridade === 1) {
        return "Alta";
    } else if (prioridade === 2) {
        return "Média";
    } else {
        return "Baixa";
    }
}

// Listar todas as tarefas
function listarTarefas() {
    listaTarefas.replaceChildren();

    contador.textContent =
        "Total de tarefas: " + tarefas.length;

    if (tarefas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(mensagem);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            "Tarefa #" + tarefa.codigo + " - " + tarefa.titulo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Já concluída"
            : "Marcar como concluída";

        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        const botaoAlterar = document.createElement("button");
        botaoAlterar.className = "btn-alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoAlterar);
        cartao.append(titulo, prioridade, status, acoes);
        listaTarefas.appendChild(cartao);
    });
}

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    // Cancelar não altera a tarefa
    if (novaPrioridade === null) {
        return;
    }

    const valor = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(valor)) {
        alert("Valor inválido! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(valor);

    listarTarefas();
}

// Exibir a lista inicial
listarTarefas();
