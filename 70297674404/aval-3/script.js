// Array que armazenará todas as tarefas
let tarefas = [];

// Elementos do HTML
const form = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Código inicial da próxima tarefa
let proximoCodigo = 1;


// CADASTRAR UMA NOVA TAREFA
form.addEventListener("submit", function (event) {
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
    if (prioridade < 1 || prioridade > 3 || !prioridade) {
        mensagem.textContent = "A prioridade deve ser 1, 2 ou 3.";
        mensagem.style.color = "red";
        return;
    }

    // Criação da tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);

    proximoCodigo++;

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    // Limpa o formulário
    form.reset();

    // Atualiza a lista
    listarTarefas();
});


// LISTAR AS TAREFAS
function listarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function (tarefa) {

        const div = document.createElement("div");
        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const prioridadeTexto = obterPrioridade(tarefa.prioridade);

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p>
                <strong>Prioridade:</strong>
                ${prioridadeTexto}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button 
                    class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.codigo})">
                    ${tarefa.concluida ? "Desmarcar conclusão" : "Concluir tarefa"}
                </button>

                <button 
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}


// ALTERAR A PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    const prioridade = Number(novaPrioridade);

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();
}


// RETORNA O TEXTO DA PRIORIDADE
function obterPrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    if (prioridade === 3) {
        return "3 - Baixa";
    }

    return "Prioridade inválida";
}
