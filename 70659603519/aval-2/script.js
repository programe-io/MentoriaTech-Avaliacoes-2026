
let tarefas = [];
let proximoCodigo = 1;

// CADASTRAR NOVA TAREFA
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres!", "red");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("A prioridade deve ser 1, 2 ou 3!", "red");
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

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

    document.getElementById("formTarefa").reset();

    listarTarefas();
});


// LISTAR TODAS AS TAREFAS
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
            <strong>Status:</strong> 
            ${tarefa.concluida ? "Concluída" : "Pendente"}
            <br>
            <button onclick="marcarConcluida(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function marcarConcluida(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;

        mostrarMensagem("Tarefa marcada como concluída!", "green");

        listarTarefas();
    }
}


// ALTERAR PRIORIDADE DA TAREFA
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        let novaPrioridade = Number(
            prompt("Digite a nova prioridade (1, 2 ou 3):")
        );

        if (![1, 2, 3].includes(novaPrioridade)) {
            mostrarMensagem("Prioridade inválida! Digite 1, 2 ou 3.", "red");
            return;
        }

        tarefa.prioridade = novaPrioridade;

        mostrarMensagem("Prioridade alterada com sucesso!", "green");

        listarTarefas();
    }
}


// EXIBIR MENSAGENS
function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;
}


// Exibir lista inicial
listarTarefas();
