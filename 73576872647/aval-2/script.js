
let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    formulario.reset();
    renderizarTarefas();

    alert("Tarefa cadastrada com sucesso!");
});

// Listar tarefas
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");
        prioridade.textContent = tarefa.prioridade;

        const status = document.createElement("td");
        status.textContent = tarefa.concluida ? "Concluída" : "Pendente";
        status.className = tarefa.concluida ? "concluida" : "pendente";

        const acoes = document.createElement("td");

        // Botão concluir tarefa
        const botaoStatus = document.createElement("button");
        botaoStatus.textContent = tarefa.concluida
            ? "Retomar"
            : "Concluir";

        botaoStatus.addEventListener("click", function() {
            alternarStatus(tarefa.codigo);
        });

        // Botão alterar prioridade
        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(botaoStatus);
        acoes.appendChild(botaoPrioridade);

        linha.appendChild(codigo);
        linha.appendChild(titulo);
        linha.appendChild(prioridade);
        linha.appendChild(status);
        linha.appendChild(acoes);

        listaTarefas.appendChild(linha);
    });
}

// Concluir ou retomar tarefa
function alternarStatus(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    renderizarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    renderizarTarefas();

    alert("Prioridade alterada com sucesso!");
}
