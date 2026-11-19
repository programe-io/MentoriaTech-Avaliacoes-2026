
// Lista de tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let proximoCodigo = tarefas.length > 0
    ? Math.max(...tarefas.map(t => t.codigo)) + 1
    : 1;

// Salvar tarefas
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
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

    salvarTarefas();
    listarTarefas();

    document.getElementById("formTarefa").reset();

});

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        let status = document.createElement("p");
        status.textContent = "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        let btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluir";
        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = tarefa.concluida;

        btnConcluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        let btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar Prioridade";
        btnAlterar.className = "btn-alterar";

        btnAlterar.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        acoes.appendChild(btnConcluir);
        acoes.appendChild(btnAlterar);

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(prioridade);
        div.appendChild(status);
        div.appendChild(acoes);

        lista.appendChild(div);

    });

}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;

        salvarTarefas();
        listarTarefas();
    }
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
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    salvarTarefas();
    listarTarefas();

}

// Exibir tarefas ao abrir a página
listarTarefas();
