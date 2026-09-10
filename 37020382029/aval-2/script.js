let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;

    let titulo = document.getElementById("titulo").value;

    let prioridade = Number(
        document.getElementById("prioridade").value
    );


    // Validação do código
    if (codigo === "") {

        alert("Informe o código da tarefa.");

        return;
    }


    // Verifica código repetido
    let tarefaExistente = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (tarefaExistente) {

        alert("Já existe uma tarefa com esse código.");

        return;
    }


    // Validação do título
    if (titulo.length < 5) {

        alert("O título deve ter no mínimo 5 caracteres.");

        return;
    }


    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {

        alert("Escolha uma prioridade entre 1 e 3.");

        return;
    }


    let tarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    tarefas.push(tarefa);

    limparCampos();

    listarTarefas();
}


function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";


    tarefas.forEach(function(tarefa) {

        let prioridadeTexto;


        if (tarefa.prioridade === 1) {

            prioridadeTexto = "Alta";

        } else if (tarefa.prioridade === 2) {

            prioridadeTexto = "Média";

        } else {

            prioridadeTexto = "Baixa";

        }


        let status;

        if (tarefa.concluida) {

            status = "Concluída";

        } else {

            status = "Pendente";

        }


        tabela.innerHTML += `
            <tr>

                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td>${prioridadeTexto}</td>

                <td>${status}</td>

                <td>

                    <button onclick="concluirTarefa('${tarefa.codigo}')">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade('${tarefa.codigo}')">
                        Alterar prioridade
                    </button>

                </td>

            </tr>
        `;
    });
}


function concluirTarefa(codigo) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    tarefa.concluida = true;

    listarTarefas();
}


function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    let novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );


    if (novaPrioridade < 1 || novaPrioridade > 3) {

        alert("A prioridade deve estar entre 1 e 3.");

        return;
    }


    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


function limparCampos() {

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";
}