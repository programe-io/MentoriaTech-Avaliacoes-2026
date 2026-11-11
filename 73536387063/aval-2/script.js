
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
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

    document.getElementById("titulo").value = "";

    listarTarefas();
}

// Listar tarefas cadastradas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Código: ${tarefa.codigo}</p>
            <p>Prioridade: ${prioridadeTexto[tarefa.prioridade]}</p>
            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button class="alterar"
                onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade da tarefa
function alterarPrioridade(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade: 1 (Alta), 2 (Média), 3 (Baixa)")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}
