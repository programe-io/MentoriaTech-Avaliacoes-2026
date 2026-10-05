// Lista que armazenará as tarefas
let tarefas = [];

// Código para identificar a próxima tarefa
let proximoCodigo = 1;

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// CADASTRAR UMA NOVA TAREFA
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent = "O título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent = "A prioridade deve estar entre 1 e 3.";
        mensagem.style.color = "red";
        return;
    }

    // Criando a tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    tituloInput.value = "";

    listarTarefas();
});


// LISTAR AS TAREFAS
function listarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");
        div.classList.add("tarefa");

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
            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p class="titulo">
                <strong>Título:</strong> ${tarefa.titulo}
            </p>

            <p>
                <strong>Prioridade:</strong> 
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                ${tarefa.concluida ? "Desmarcar" : "Concluir"}
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        listaTarefas.appendChild(div);
    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
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

    // Validação da prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3 || isNaN(novaPrioridade)) {
        alert("Prioridade inválida! Digite um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Mostra as tarefas inicialmente
listarTarefas();