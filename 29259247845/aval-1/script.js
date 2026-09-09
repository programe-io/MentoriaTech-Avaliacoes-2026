// Array que armazenará as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// Elementos do HTML
const form = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");


// CADASTRAR NOVA TAREFA
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );
        return;
    }

    // Criando a tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    proximoCodigo++;

    form.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");

    listarTarefas();
});


// LISTAR TAREFAS
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <p class="vazio">Nenhuma tarefa cadastrada.</p>
        `;

        contador.textContent = "0 tarefas";
        return;
    }

    contador.textContent =
        tarefas.length === 1
            ? "1 tarefa"
            : `${tarefas.length} tarefas`;

    tarefas.forEach(function (tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const statusTexto = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const statusClasse = tarefa.concluida
            ? "status-concluida"
            : "status-pendente";

        const textoPrioridade = obterTextoPrioridade(
            tarefa.prioridade
        );

        div.innerHTML = `
            <div class="tarefa-topo">
                <h3>${tarefa.titulo}</h3>
                <span class="codigo">
                    Código: ${tarefa.codigo}
                </span>
            </div>

            <div class="info">
                <span class="badge prioridade-${tarefa.prioridade}">
                    Prioridade: ${textoPrioridade}
                </span>

                <span class="badge ${statusClasse}">
                    Status: ${statusTexto}
                </span>
            </div>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})"
                        >
                            Concluir
                        </button>
                    `
                    : ""
                }

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


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        function (tarefa) {
            return tarefa.codigo === codigo;
        }
    );

    if (!tarefa) {
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "sucesso"
    );

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        function (tarefa) {
            return tarefa.codigo === codigo;
        }
    );

    if (!tarefa) {
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    const prioridade = Number(novaPrioridade);

    // Validação da prioridade
    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3.",
            "erro"
        );
        return;
    }

    tarefa.prioridade = prioridade;

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );

    listarTarefas();
}


// RETORNA O TEXTO DA PRIORIDADE
function obterTextoPrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";
}


// EXIBE MENSAGENS
function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;

    setTimeout(function () {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}


// Exibe a lista inicialmente
listarTarefas();
