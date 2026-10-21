
const form = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

let tarefas = JSON.parse(
    localStorage.getItem("minhasTarefas") || "[]"
);

function salvarTarefas() {
    localStorage.setItem(
        "minhasTarefas",
        JSON.stringify(tarefas)
    );
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function nomePrioridade(prioridade) {
    if (prioridade === 1) return "1 - Alta";
    if (prioridade === 2) return "2 - Média";
    return "3 - Baixa";
}

function listarTarefas() {
    listaTarefas.replaceChildren();

    tarefas.forEach(tarefa => {
        const linha = document.createElement("tr");

        const dados = [
            tarefa.codigo,
            tarefa.titulo,
            nomePrioridade(tarefa.prioridade)
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        celulaStatus.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        celulaStatus.className = tarefa.concluida
            ? "concluida"
            : "pendente";

        linha.appendChild(celulaStatus);

        const celulaAcoes = document.createElement("td");

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = tarefa.concluida;

        btnConcluir.addEventListener("click", () => {
            concluirTarefa(tarefa.codigo);
        });

        const btnPrioridade = document.createElement("button");
        btnPrioridade.textContent = "Alterar prioridade";
        btnPrioridade.className = "btn-alterar";

        btnPrioridade.addEventListener("click", () => {
            alterarPrioridade(tarefa.codigo);
        });

        celulaAcoes.append(btnConcluir, btnPrioridade);
        linha.appendChild(celulaAcoes);

        listaTarefas.appendChild(linha);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(
        document.getElementById("codigo").value
    );

    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (!Number.isSafeInteger(codigo) || codigo <= 0) {
        mostrarMensagem("O código deve ser um número inteiro positivo.");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        mostrarMensagem("Esse código já está cadastrado!");
        return;
    }

    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres!"
        );
        return;
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        mostrarMensagem(
            "A prioridade deve ser de 1 a 3!"
        );
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    salvarTarefas();
    listarTarefas();
    form.reset();

    document.getElementById("prioridade").value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!");
});

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    salvarTarefas();
    listarTarefas();

    mostrarMensagem("Tarefa marcada como concluída!");
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada!");
        return;
    }

    const entrada = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa",
        tarefa.prioridade
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novaPrioridade = Number(entrada);

    if (
        !Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3."
        );
        return;
    }

    tarefa.prioridade = novaPrioridade;

    salvarTarefas();
    listarTarefas();

    mostrarMensagem("Prioridade alterada com sucesso!");
}

listarTarefas();
