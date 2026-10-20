
 // Lista de tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Elementos do HTML
const form = document.getElementById("taskForm");
const codigoInput = document.getElementById("codigo");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");

const tituloErro = document.getElementById("tituloErro");
const prioridadeErro = document.getElementById("prioridadeErro");

const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

// ===============================
// CADASTRAR TAREFA
// ===============================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    limparErros();

    const codigo = codigoInput.value.trim();
    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    let valido = true;

    // Validação do código
    if (codigo.length === 0) {
        alert("Informe o código da tarefa.");
        return;
    }

    // Validação do título
    if (titulo.length < 5) {
        tituloErro.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        valido = false;
    }

    // Validação da prioridade
    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        prioridadeErro.textContent =
            "A prioridade deve estar entre 1 e 3.";

        valido = false;
    }

    if (!valido) {
        return;
    }

    // Verifica se o código já existe
    const codigoExiste = tarefas.some(
        tarefa =>
            tarefa.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (codigoExiste) {
        alert("Já existe uma tarefa com esse código.");
        return;
    }

    // Cria a nova tarefa
    const novaTarefa = {
        id: Date.now(),
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    form.reset();

    renderizarTarefas();
});

// ===============================
// RENDERIZAR TAREFAS
// ===============================

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa cadastrada.
            </div>
        `;

        atualizarContador();
        return;
    }

    tarefas.forEach(tarefa => {
        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (tarefa.concluida) {
            elemento.classList.add("concluida");
        }

        const prioridadeTexto = obterPrioridadeTexto(
            tarefa.prioridade
        );

        elemento.innerHTML = `
            <div class="codigo">
                ${escaparHTML(tarefa.codigo)}
            </div>

            <div>
                <div class="titulo">
                    ${escaparHTML(tarefa.titulo)}
                </div>

                <div class="info">
                    <span class="badge prioridade-${tarefa.prioridade}">
                        Prioridade ${tarefa.prioridade} - ${prioridadeTexto}
                    </span>

                    <span class="badge status ${
                        tarefa.concluida ? "concluida" : ""
                    }">
                        ${
                            tarefa.concluida
                                ? "Concluída"
                                : "Pendente"
                        }
                    </span>
                </div>
            </div>

            <div class="acoes">
                ${
                    !tarefa.concluida
                        ? `
                            <button
                                class="btn-success"
                                data-acao="concluir"
                                data-id="${tarefa.id}"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                }

                <button
                    class="btn-secondary"
                    data-acao="prioridade"
                    data-id="${tarefa.id}"
                >
                    Alterar prioridade
                </button>
            </div>
        `;

        listaTarefas.appendChild(elemento);
    });

    atualizarContador();
}

// ===============================
// EVENTOS DOS BOTÕES
// ===============================

listaTarefas.addEventListener("click", function (event) {
    const botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    if (acao === "concluir") {
        concluirTarefa(id);
    }

    if (acao === "prioridade") {
        alterarPrioridade(id);
    }
});

// ===============================
// CONCLUIR TAREFA
// ===============================

function concluirTarefa(id) {
    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        return;
    }

    tarefa.concluida = true;

    salvarTarefas();

    renderizarTarefas();
}

// ===============================
// ALTERAR PRIORIDADE
// ===============================

function alterarPrioridade(id) {
    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        return;
    }

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa",
        tarefa.prioridade
    );

    if (novaPrioridade === null) {
        return;
    }

    novaPrioridade = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(novaPrioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(novaPrioridade);

    salvarTarefas();

    renderizarTarefas();
}

// ===============================
// FUNÇÕES AUXILIARES
// ===============================

function obterPrioridadeTexto(prioridade) {
    switch (Number(prioridade)) {
        case 1:
            return "Alta";

        case 2:
            return "Média";

        case 3:
            return "Baixa";

        default:
            return "Não definida";
    }
}

function limparErros() {
    tituloErro.textContent = "";
    prioridadeErro.textContent = "";
}

function salvarTarefas() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function atualizarContador() {
    const quantidade = tarefas.length;

    if (quantidade === 1) {
        contador.textContent = "1 tarefa";
    } else {
        contador.textContent = `${quantidade} tarefas`;
    }
}

// Evita interpretar texto do usuário como HTML
function escaparHTML(texto) {
    const div = document.createElement("div");

    div.textContent = String(texto);

    return div.innerHTML;
}

// ===============================
// RENDERIZAÇÃO INICIAL
// ===============================

renderizarTarefas();
