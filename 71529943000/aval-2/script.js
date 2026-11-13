
let tarefas = [];

const formulario = document.getElementById("formTarefa");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    const mensagem = document.getElementById("mensagem");

    if (!Number.isInteger(codigo) || codigo <= 0) {
        mensagem.textContent = "Digite um código válido!";
        mensagem.className = "erro";
        return;
    }

    if (titulo.length < 5) {
        mensagem.textContent = "O título precisa ter pelo menos 5 caracteres!";
        mensagem.className = "erro";
        return;
    }

    if (!["1", "2", "3"].includes(prioridade)) {
        mensagem.textContent = "Selecione uma prioridade válida!";
        mensagem.className = "erro";
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        mensagem.textContent = "Código já cadastrado!";
        mensagem.className = "erro";
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    });

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.className = "sucesso";

    formulario.reset();

    listarTarefas();

});

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");
        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");

        const nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade +
            " - " + nomes[tarefa.prioridade];

        prioridade.className = {
            1: "alta",
            2: "media",
            3: "baixa"
        }[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const concluir = document.createElement("button");

        concluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Marcar como concluída";

        concluir.disabled = tarefa.concluida;

        concluir.onclick = function() {
            marcarConcluida(tarefa.codigo);
        };

        const alterar = document.createElement("button");

        alterar.textContent = "Alterar prioridade";

        alterar.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        div.append(
            titulo,
            codigo,
            prioridade,
            status,
            concluir,
            alterar
        );

        lista.appendChild(div);

    });

    atualizarResumo();

}

function marcarConcluida(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }

}

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    const nova = prompt(
        "Digite:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (nova === null) return;

    if (!["1", "2", "3"].includes(nova)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = Number(nova);

    listarTarefas();

}

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent =
        total - concluidas;

    document.getElementById("concluidas").textContent =
        concluidas;

}
