
const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const resumo = document.getElementById("resumo");

// Lista inicial de tarefas
let tarefas = [
    {
        codigo: 1,
        titulo: "Estudar JavaScript",
        prioridade: 1,
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Fazer atividade de HTML",
        prioridade: 2,
        concluida: false
    },
    {
        codigo: 3,
        titulo: "Organizar os arquivos do projeto",
        prioridade: 3,
        concluida: true
    },
    {
        codigo: 4,
        titulo: "Praticar CSS",
        prioridade: 2,
        concluida: false
    }
];

// Gera o próximo código automaticamente
let proximoCodigo = Math.max(
    0,
    ...tarefas.map(tarefa => tarefa.codigo)
) + 1;

// Retorna o nome da prioridade
function nomePrioridade(prioridade) {
    switch (prioridade) {
        case 1:
            return "Alta";
        case 2:
            return "Média";
        case 3:
            return "Baixa";
        default:
            return "Inválida";
    }
}

// Cadastra uma nova tarefa
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        campoTitulo.focus();
        return;
    }

    // Validação da prioridade
    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    formTarefa.reset();
    campoPrioridade.value = "2";

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
});

// Lista todas as tarefas cadastradas
function listarTarefas() {
    listaTarefas.replaceChildren();

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    resumo.textContent =
        `Total: ${tarefas.length} | ` +
        `Concluídas: ${concluidas} | ` +
        `Pendentes: ${tarefas.length - concluidas}`;

    if (tarefas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "vazia";
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(mensagem);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const card = document.createElement("article");
        card.className = "tarefa prioridade-" + tarefa.prioridade;

        if (tarefa.concluida) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            `Código ${tarefa.codigo} - ${tarefa.titulo}`;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            `Prioridade: ${tarefa.prioridade} - ` +
            nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para concluir a tarefa
        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Marcar como concluída";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            marcarConcluida(tarefa.codigo);
        });

        // Botão para alterar a prioridade
        const botaoAlterar = document.createElement("button");
        botaoAlterar.className = "btn-alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoAlterar);
        card.append(titulo, prioridade, status, acoes);
        listaTarefas.appendChild(card);
    });
}

// Marca uma tarefa como concluída
function marcarConcluida(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}

// Altera a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

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

    // Se o usuário cancelar, não altera nada
    if (novaPrioridade === null) {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (
        !["1", "2", "3"].includes(novaPrioridade.trim()) ||
        !Number.isInteger(prioridade)
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Exibe as tarefas iniciais ao abrir a página
listarTarefas();
