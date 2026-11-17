
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar os campos
    if (codigo === "" || titulo.trim() === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Validar o título
    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar a prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código repetido
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "1";
}

// Listar tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        let status = tarefa.status ? "Concluída" : "Pendente";

        let classe = tarefa.status ? "concluida" : "pendente";

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${prioridadeTexto}</td>
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

// Marcar tarefa como concluída
function concluirTarefa(index) {

    tarefas[index].status = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");
}

// Alterar prioridade da tarefa
function alterarPrioridade(index) {

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Digite uma prioridade válida (1, 2 ou 3)!");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
