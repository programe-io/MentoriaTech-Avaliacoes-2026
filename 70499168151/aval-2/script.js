
let tarefas = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (!document.getElementById("codigo").value ||
        !Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser de 1 a 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    alert("Tarefa cadastrada com sucesso!");
    listar();
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(t => {
        let div = document.createElement("div");
        div.className = "tarefa";

        if (t.concluida) {
            div.classList.add("concluida");
        }

        let titulo = document.createElement("h3");
        titulo.textContent = t.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + t.codigo;

        let prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            ["Alta", "Média", "Baixa"][t.prioridade - 1];

        let status = document.createElement("p");
        status.textContent = t.concluida
            ? "Status: Concluída ✅"
            : "Status: Pendente ⏳";

        let concluir = document.createElement("button");
        concluir.textContent = t.concluida
            ? "Tarefa Concluída"
            : "Marcar como Concluída";
        concluir.disabled = t.concluida;
        concluir.onclick = () => concluirTarefa(t.codigo);

        let alterar = document.createElement("button");
        alterar.textContent = "Alterar Prioridade";
        alterar.onclick = () => alterarPrioridade(t.codigo);

        div.append(codigo, titulo, prioridade, status, concluir, alterar);
        lista.appendChild(div);
    });
}

function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listar();
        alert("Tarefa concluída!");
    }
}

function alterarPrioridade(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    let nova = prompt("Digite a prioridade: 1-Alta, 2-Média, 3-Baixa");

    if (nova === null || !["1", "2", "3"].includes(nova.trim())) {
        alert("Digite 1, 2 ou 3!");
        return;
    }

    tarefa.prioridade = Number(nova);
    listar();

    alert("Prioridade alterada com sucesso!");
}

listar();
