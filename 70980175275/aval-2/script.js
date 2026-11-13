
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    listarTarefas();
});

// Listar tarefas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa) {
        let div = document.createElement("div");
        div.className = "tarefa";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        let status = document.createElement("p");
        status.textContent = "Status: " + tarefa.status;
        status.className = tarefa.status === "Concluída"
            ? "concluida"
            : "pendente";

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão concluir
        let btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluir";
        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = tarefa.status === "Concluída";

        btnConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Botão alterar prioridade
        let btnPrioridade = document.createElement("button");
        btnPrioridade.textContent = "Alterar Prioridade";
        btnPrioridade.className = "btn-prioridade";

        btnPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(btnConcluir);
        acoes.appendChild(btnPrioridade);

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(prioridade);
        div.appendChild(status);
        div.appendChild(acoes);

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

    tarefa.status = "Concluída";

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

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}
