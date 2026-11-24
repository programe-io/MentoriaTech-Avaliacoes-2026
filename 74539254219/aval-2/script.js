
let tarefas = [];

function cadastrarTarefa() {
    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar os campos
    if (codigo === "" || titulo.length < 5) {
        alert("Informe um código e um título com no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código repetido
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    listarTarefas();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "1";

    alert("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    let tabela = document.getElementById("tabelaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${prioridadeTexto[tarefa.prioridade]}</td>
                <td>${status}</td>
                <td>
                    <button class="concluir"
                        onclick="concluirTarefa(${index})">
                        Concluir
                    </button>

                    <button class="alterar"
                        onclick="alterarPrioridade(${index})">
                        Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Marcar tarefa como concluída
function concluirTarefa(index) {
    tarefas[index].concluida = true;

    listarTarefas();

    alert("Tarefa concluída!");
}

// Alterar prioridade
function alterarPrioridade(index) {
    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) return;

    novaPrioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
