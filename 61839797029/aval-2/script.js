
let tarefas = [];

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (!Number.isSafeInteger(codigo) || codigo <= 0) {
        mostrarMensagem("O código deve ser um número inteiro positivo.");
        return;
    }

    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        mostrarMensagem("Já existe uma tarefa com esse código.");
        return;
    }

    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();
    document.getElementById("prioridade").value = "2";

    listarTarefas();
    mostrarMensagem("Tarefa cadastrada com sucesso!");
});

// Listar as tarefas cadastradas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhuma tarefa cadastrada.";
        linha.appendChild(celula);
        listaTarefas.appendChild(linha);

        return;
    }

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const valores = [
            tarefa.codigo,
            tarefa.titulo,
            obterPrioridade(tarefa.prioridade)
        ];

        valores.forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const status = document.createElement("td");
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        status.className = tarefa.concluida
            ? "finalizada"
            : "pendente";

        linha.appendChild(status);

        const acoes = document.createElement("td");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        botaoConcluir.className = "concluir";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            marcarConcluida(tarefa.codigo);
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.className = "alterar";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(botaoConcluir, botaoPrioridade);
        linha.appendChild(acoes);

        listaTarefas.appendChild(linha);
    });
}

// Converter o número em uma descrição
function obterPrioridade(prioridade) {
    if (prioridade === 1) {
        return "1 - Alta";
    } else if (prioridade === 2) {
        return "2 - Média";
    } else {
        return "3 - Baixa";
    }
}

// Marcar uma tarefa como concluída
function marcarConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
    mostrarMensagem("Tarefa marcada como concluída!");
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        tarefa.prioridade
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();
    mostrarMensagem("Prioridade alterada com sucesso!");
}

// Exibir mensagens ao usuário
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}
