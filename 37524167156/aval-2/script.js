let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (codigo === "" || titulo === "" || prioridade === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

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
    document.getElementById("prioridade").value = "";
}


function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {

        let status;
        let classe;

        if (tarefa.concluida) {
            status = "Concluída";
            classe = "concluida";
        } else {
            status = "Pendente";
            classe = "pendente";
        }

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td>${mostrarPrioridade(tarefa.prioridade)}</td>

                <td class="${classe}">
                    ${status}
                </td>

                <td>
                    <button onclick="concluirTarefa(${indice})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${indice})">
                        Alterar Prioridade
                    </button>
                </td>
            </tr>
        `;
    });
}


function concluirTarefa(indice) {

    tarefas[indice].concluida = true;

    listarTarefas();
}


function alterarPrioridade(indice) {

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade: 1 - Alta, 2 - Média ou 3 - Baixa")
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("Prioridade inválida! Digite um valor entre 1 e 3.");
        return;
    }

    tarefas[indice].prioridade = novaPrioridade;

    listarTarefas();
}


function mostrarPrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";
}