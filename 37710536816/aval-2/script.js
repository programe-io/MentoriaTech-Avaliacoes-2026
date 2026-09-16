let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Verificar campos vazios
    if (codigo === "" || titulo === "" || prioridade === 0) {
        alert("Preencha todos os campos!");
        return;
    }

    // Título deve ter no mínimo 5 caracteres
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Prioridade entre 1 e 3
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código repetido
    let codigoExiste = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (codigoExiste) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    let novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    listarTarefas();
    limparCampos();

    alert("Tarefa cadastrada com sucesso!");
}


function listarTarefas() {

    let tabela = document.getElementById("tabelaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach(function(tarefa, indice) {

        let status;
        let classeStatus;

        if (tarefa.concluida) {
            status = "Concluída";
            classeStatus = "concluida";
        } else {
            status = "Pendente";
            classeStatus = "pendente";
        }

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>

                <td>${tarefa.titulo}</td>

                <td class="${classePrioridade(tarefa.prioridade)}">
                    ${mostrarPrioridade(tarefa.prioridade)}
                </td>

                <td class="${classeStatus}">
                    ${status}
                </td>

                <td>
                    <button onclick="concluirTarefa(${indice})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${indice})">
                        Alterar prioridade
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
        alert("Prioridade inválida!");
        return;
    }

    tarefas[indice].prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada!");
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


function classePrioridade(prioridade) {

    if (prioridade === 1) {
        return "alta";
    }

    if (prioridade === 2) {
        return "media";
    }

    return "baixa";
}


function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";
}