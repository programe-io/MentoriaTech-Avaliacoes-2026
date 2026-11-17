
let tarefas = [];

// Cadastrar tarefa
function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (codigo === "" || titulo.trim() === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Validar título
    if (titulo.trim().length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres!");
        return;
    }

    // Validar código repetido
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada!");

    listarTarefas();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
}

// Listar tarefas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let status = tarefa.status ? "Concluída" : "Pendente";

        let classe = tarefa.status ? "concluida" : "pendente";

        let prioridade = "";

        if (tarefa.prioridade === 1) {
            prioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridade = "Média";
        } else {
            prioridade = "Baixa";
        }

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${prioridade}</td>
                <td class="${classe}">${status}</td>

                <td>
                    <button onclick="concluirTarefa(${index})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${index})">
                        Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}

// Concluir tarefa
function concluirTarefa(index) {

    tarefas[index].status = true;

    listarTarefas();

    alert("Tarefa concluída!");
}

// Alterar prioridade
function alterarPrioridade(index) {

    let novaPrioridade = prompt(
        "Digite a prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada!");
}
