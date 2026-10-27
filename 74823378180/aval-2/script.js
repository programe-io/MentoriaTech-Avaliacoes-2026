
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.className = erro ? "erro" : "";
}

function cadastrarTarefa(evento) {
    evento.preventDefault();

    const nome = titulo.value.trim();
    const nivel = Number(prioridade.value);

    if (nome.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            true
        );
        return;
    }

    if (![1, 2, 3].includes(nivel)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            true
        );
        return;
    }

    tarefas.push({
        id: Date.now() + Math.random(),
        titulo: nome,
        prioridade: nivel,
        concluida: false
    });

    salvarTarefas();
    listarTarefas();
    form.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!");
}

function listarTarefas() {
    lista.replaceChildren();

    if (tarefas.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(item);
        return;
    }

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        const info = document.createElement("div");
        info.className = "info";

        const nome = document.createElement("strong");
        nome.textContent = tarefa.titulo;

        if (tarefa.concluida) {
            nome.classList.add("concluida");
        }

        const detalhe = document.createElement("p");
        detalhe.textContent =
            "Prioridade: " + tarefa.prioridade +
            " (" + nomePrioridade(tarefa.prioridade) + ")" +
            " | Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        info.append(nome, detalhe);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        botaoConcluir.onclick = () => {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas();
            listarTarefas();
        };

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.onclick = () => alterarPrioridade(tarefa.id);

        acoes.append(botaoConcluir, botaoPrioridade);
        item.append(info, acoes);
        lista.appendChild(item);
    });
}

function nomePrioridade(nivel) {
    if (nivel === 1) return "Alta";
    if (nivel === 2) return "Média";
    return "Baixa";
}

function alterarPrioridade(id) {
    const tarefa = tarefas.find(item => item.id === id);

    const resposta = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        tarefa.prioridade
    );

    if (resposta === null) return;

    const nivel = Number(resposta);

    if (!["1", "2", "3"].includes(resposta.trim())) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3.",
            true
        );
        return;
    }

    tarefa.prioridade = nivel;

    salvarTarefas();
    listarTarefas();

    mostrarMensagem("Prioridade alterada com sucesso!");
}

form.addEventListener("submit", cadastrarTarefa);

listarTarefas();
