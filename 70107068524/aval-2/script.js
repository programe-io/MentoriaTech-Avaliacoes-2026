let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3.");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    alert("Tarefa cadastrada com sucesso!");

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

    tarefas.forEach(function(tarefa) {
        let div = document.createElement("div");

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Código: ${tarefa.codigo}</p>
            <p>Prioridade: ${tarefa.prioridade}</p>
            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>

            <hr>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Digite uma prioridade entre 1 e 3.");
        return;
    }

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        listarTarefas();
    }
}