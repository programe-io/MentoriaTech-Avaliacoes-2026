
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

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

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>
            <p>Código: ${tarefa.codigo}</p>
            <p>Prioridade: ${prioridadeTexto[tarefa.prioridade]}</p>
            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <div class="acoes">
                <button class="concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button class="alterar"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Concluir tarefa
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
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

// Exibir lista inicial
listarTarefas();
