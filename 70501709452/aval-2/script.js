
let tarefas = [];

function cadastrarTarefa() {
    const codigoTexto = document.getElementById("codigo").value;
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );
    const mensagem = document.getElementById("mensagem");

    // Validar os campos
    if (codigoTexto === "" || titulo === "") {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    const codigo = Number(codigoTexto);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        mensagem.textContent = "O código deve ser um número inteiro positivo!";
        return;
    }

    if (titulo.length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres!";
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent =
            "A prioridade deve ser 1, 2 ou 3!";
        return;
    }

    // Verificar se o código já existe
    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        mensagem.textContent = "Esse código já está cadastrado!";
        return;
    }

    // Criar e cadastrar a tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "Tarefa cadastrada com sucesso! 💗";

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    listarTarefas();
}

function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.replaceChildren();

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    for (const tarefa of tarefas) {
        const item = document.createElement("div");
        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade + " - " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída ✅"
            : "Status: Pendente ⏳";

        item.append(titulo, codigo, prioridade, status);
        lista.appendChild(item);
    }
}

function concluirTarefa() {
    const codigoTexto =
        document.getElementById("codigoAlterar").value;

    if (codigoTexto === "") {
        alert("Informe o código da tarefa!");
        return;
    }

    const codigo = Number(codigoTexto);
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída! ✅");
    listarTarefas();
}

function alterarPrioridade() {
    const codigoTexto =
        document.getElementById("codigoAlterar").value;

    const prioridade = Number(
        document.getElementById("novaPrioridade").value
    );

    if (codigoTexto === "") {
        alert("Informe o código da tarefa!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Use 1, 2 ou 3.");
        return;
    }

    const codigo = Number(codigoTexto);
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso! 💗");
    listarTarefas();
}
