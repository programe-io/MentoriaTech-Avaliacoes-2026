// Array que armazenará as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    // Criação da tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    // Limpar o campo
    document.getElementById("titulo").value = "";

    // Atualizar a lista
    listarTarefas();
}


// Listar as tarefas cadastradas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let nomePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <div class="informacoes">

                <span>
                    <strong>Código:</strong> ${tarefa.codigo}
                </span>

                <span class="titulo">
                    <strong>Título:</strong> ${tarefa.titulo}
                </span>

                <span>
                    <strong>Prioridade:</strong>
                    ${tarefa.prioridade} - ${nomePrioridade}
                </span>

                <span>
                    <strong>Status:</strong>
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </span>

            </div>

            <div class="acoes">

                <button 
                    class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.codigo})">
                    ${tarefa.concluida ? "Desmarcar" : "Concluir"}
                </button>

                <button 
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// Marcar uma tarefa como concluída
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    listarTarefas();
}


// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    // Validação da nova prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3 || isNaN(novaPrioridade)) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibir a lista quando a página abrir
listarTarefas();

