
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    let mensagem = document.getElementById("mensagem");

    if (titulo.length < 5) {
        mensagem.style.color = "red";
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres!";
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mensagem.style.color = "red";
        mensagem.textContent = "Prioridade inválida!";
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.style.color = "green";
    mensagem.textContent = "Tarefa cadastrada com sucesso!";

    document.getElementById("titulo").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p class="prioridade">
                Prioridade: ${prioridadeTexto[tarefa.prioridade]}
            </p>

            <p>Status: ${
                tarefa.concluida ? "Concluída" : "Pendente"
            }</p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Escolha 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}

// Exibir lista inicial
listarTarefas();
