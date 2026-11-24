
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {

        alert("Selecione uma prioridade entre 1 e 3!");
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
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("tarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "concluida"
            : "";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        lista.innerHTML += `
            <div class="tarefa ${classe}">

                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade:
                ${prioridadeTexto[tarefa.prioridade]}</p>

                <p>Status: ${status}</p>

                <div class="acoes">

                    <button class="concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>

                    <button class="alterar"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>

                </div>

            </div>
        `;
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {

        let novaPrioridade = Number(
            prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
        );

        if (!Number.isInteger(novaPrioridade) ||
            novaPrioridade < 1 || novaPrioridade > 3) {

            alert("Prioridade inválida!");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        listarTarefas();
    }
}
