
// Lista de tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Elementos HTML
const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const totalTarefas = document.getElementById("totalTarefas");

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código repetido
    if (tarefas.some(tarefa => tarefa.codigo === codigo)) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    // Criar objeto da tarefa
    const tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa na lista
    tarefas.push(tarefa);

    salvarTarefas();
    listarTarefas();

    formulario.reset();

    alert("Tarefa cadastrada com sucesso!");

});

// Listar tarefas cadastradas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");

        if (tarefa.prioridade === 1) {
            prioridade.textContent = "1 - Alta";
        } else if (tarefa.prioridade === 2) {
            prioridade.textContent = "2 - Média";
        } else {
            prioridade.textContent = "3 - Baixa";
        }

        const status = document.createElement("td");

        if (tarefa.concluida) {
            status.textContent = "Concluída";
            status.className = "concluida";
        } else {
            status.textContent = "Pendente";
            status.className = "pendente";
        }

        const acoes = document.createElement("td");
        const divAcoes = document.createElement("div");

        divAcoes.className = "acoes";

        // Botão concluir tarefa
        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = tarefa.concluida;

        btnConcluir.addEventListener("click", function() {
            concluirTarefa(index);
        });

        // Botão alterar prioridade
        const btnPrioridade = document.createElement("button");

        btnPrioridade.textContent = "Alterar prioridade";
        btnPrioridade.className = "btn-prioridade";

        btnPrioridade.addEventListener("click", function() {
            alterarPrioridade(index);
        });

        divAcoes.appendChild(btnConcluir);
        divAcoes.appendChild(btnPrioridade);

        acoes.appendChild(divAcoes);

        // Montar linha da tabela
        linha.appendChild(codigo);
        linha.appendChild(titulo);
        linha.appendChild(prioridade);
        linha.appendChild(status);
        linha.appendChild(acoes);

        listaTarefas.appendChild(linha);

    });

    totalTarefas.textContent =
        "Total de tarefas cadastradas: " + tarefas.length;

}

// Marcar tarefa como concluída
function concluirTarefa(index) {

    tarefas[index].concluida = true;

    salvarTarefas();
    listarTarefas();

    alert("Tarefa concluída com sucesso!");

}

// Alterar prioridade da tarefa
function alterarPrioridade(index) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = prioridade;

    salvarTarefas();
    listarTarefas();

    alert("Prioridade alterada com sucesso!");

}

// Mostrar tarefas ao abrir o sistema
listarTarefas();
