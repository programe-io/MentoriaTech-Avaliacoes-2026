let tarefas = [];
let proximoCodigo = 1;

const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// Cadastrar tarefa
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "red"
        );
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mostrarMensagem(
            "A prioridade deve estar entre 1 e 3.",
            "red"
        );
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

    formTarefa.reset();

    listarTarefas();
});


// Listar tarefas
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

        let nomePrioridade;

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        div.innerHTML = `
            <h3>${tarefa.codigo} - ${tarefa.titulo}</h3>

            <p>
                Prioridade:
                <span class="prioridade-${nomePrioridade.toLowerCase()}">
                    ${tarefa.prioridade} - ${nomePrioridade}
                </span>
            </p>

            <p>
                Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})"
                    ${tarefa.concluida ? "disabled" : ""}
                >
                    ${tarefa.concluida ? "Concluída" : "Concluir"}
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", "red");
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "green"
    );

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", "red");
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

    if (![1, 2, 3].includes(novaPrioridade)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "red"
        );
        return;
    }

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "green"
    );

    listarTarefas();
}


// Mostrar mensagens
function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(function() {
        mensagem.textContent = "";
    }, 3000);
}


// Exibir lista inicialmente
listarTarefas();