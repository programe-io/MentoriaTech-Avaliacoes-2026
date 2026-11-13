let tarefas = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("Prioridade inválida!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    });

    alert("Tarefa cadastrada!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
}

function listar() {
    let lista = "";

    for (let i = 0; i < tarefas.length; i++) {
        lista += "Código: " + tarefas[i].codigo + "<br>";
        lista += "Título: " + tarefas[i].titulo + "<br>";
        lista += "Prioridade: " + tarefas[i].prioridade + "<br>";
        lista += "Status: " + tarefas[i].status + "<br><br>";
    }

    if (lista == "") {
        lista = "Nenhuma tarefa cadastrada!";
    }

    document.getElementById("lista").innerHTML = lista;
}

function concluir() {
    let codigo = document.getElementById("codigoAlterar").value;

    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].codigo == codigo) {
            tarefas[i].status = "Concluída";
            alert("Tarefa concluída!");
            return;
        }
    }

    alert("Tarefa não encontrada!");
}

function alterarPrioridade() {
    let codigo = document.getElementById("codigoAlterar").value;

    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].codigo == codigo) {
            let novaPrioridade = Number(prompt("Digite a prioridade (1, 2 ou 3):"));

            if (novaPrioridade >= 1 && novaPrioridade <= 3) {
                tarefas[i].prioridade = novaPrioridade;
                alert("Prioridade alterada!");
            } else {
                alert("Prioridade inválida!");
            }

            return;
        }
    }

    alert("Tarefa não encontrada!");
}