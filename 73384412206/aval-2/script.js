
let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    // Validar os campos
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!["1", "2", "3"].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar se o código já existe
    let existe = tarefas.find(t => t.codigo === codigo);

    if (existe) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar objeto da tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    limparCampos();
    listarTarefas();
}


// Listar as tarefas cadastradas
function listarTarefas() {

    let tabela = document.getElementById("tabelaTarefas");

    tabela.innerHTML = "";

    tarefas.forEach(tarefa => {

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let classe = tarefa.concluida
            ? "concluida"
            : "pendente";

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${prioridadeTexto}</td>
                <td class="${classe}">${status}</td>
            </tr>
        `;

    });

}


// Marcar tarefa como concluída
function concluirTarefa() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        if (tarefa.concluida) {
            alert("Essa tarefa já está concluída!");
            return;
        }

        tarefa.concluida = true;

        alert("Tarefa marcada como concluída!");

        listarTarefas();

    } else {
        alert("Tarefa não encontrada!");
    }

}


// Alterar prioridade da tarefa
function alterarPrioridade() {

    let codigo = Number(
        document.getElementById("codigoAlterar").value
    );

    let prioridade = document.getElementById("novaPrioridade").value;

    if (!["1", "2", "3"].includes(prioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.prioridade = Number(prioridade);

        alert("Prioridade alterada com sucesso!");

        listarTarefas();

    } else {
        alert("Tarefa não encontrada!");
    }

}


// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

}
