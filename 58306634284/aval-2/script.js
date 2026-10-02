let tarefas = [];
let geradorCodigo = 0;

// Elementos do HTML
const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// ==============================
// VALIDAÇÃO
// ==============================

function validarDadosDaTarefa(titulo, prioridade) {

if (titulo.length < 5) {
    throw new Error(
        "O título deve possuir no mínimo 5 caracteres."
    );
}

if (prioridade < 1 || prioridade > 3) {
    throw new Error(
        "A prioridade deve estar entre 1 e 3."
    );
}


}

// ==============================
// CADASTRAR TAREFA
// ==============================

function cadastrarTarefa(titulo, prioridade) {

validarDadosDaTarefa(titulo, prioridade);

geradorCodigo++;

const tarefa = {
    codigo: geradorCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true
};

tarefas.push(tarefa);


}

// ==============================
// LISTAR TAREFAS
// ==============================

function listarTarefas() {
return tarefas;
}

// ==============================
// BUSCAR TAREFA
// ==============================

function buscarTarefa(codigo) {

const tarefa = tarefas.find(
    tarefa => tarefa.codigo === codigo
);

if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
}

return tarefa;


}

// ==============================
// CONCLUIR TAREFA
// ==============================

function concluirTarefa(codigo) {

const tarefa = buscarTarefa(codigo);

if (!tarefa.status) {
    throw new Error(
        "Esta tarefa já está concluída."
    );
}

tarefa.status = false;


}

// ==============================
// ALTERAR PRIORIDADE
// ==============================

function alterarPrioridade(codigo, novaPrioridade) {

const tarefa = buscarTarefa(codigo);

validarDadosDaTarefa(
    tarefa.titulo,
    novaPrioridade
);

tarefa.prioridade = novaPrioridade;


}

// ==============================
// EXIBIR TAREFAS NA TELA
// ==============================

function atualizarTela() {

const tarefasCadastradas = listarTarefas();

contador.textContent =
    `${tarefasCadastradas.length} ${
        tarefasCadastradas.length === 1
            ? "tarefa"
            : "tarefas"
    }`;

if (tarefasCadastradas.length === 0) {

    listaTarefas.innerHTML = `
        <div class="vazio">
            Nenhuma tarefa cadastrada.
        </div>
    `;

    return;
}

listaTarefas.innerHTML = "";

tarefasCadastradas.forEach(tarefa => {

    const elemento = document.createElement("div");

    elemento.className = "tarefa";

    if (!tarefa.status) {
        elemento.classList.add("concluida");
    }

    const prioridadeTexto = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    elemento.innerHTML = `
        <div class="tarefa-topo">

            <div>
                <div class="titulo">
                    ${tarefa.titulo}
                </div>

                <div class="codigo">
                    Código: ${tarefa.codigo}
                </div>
            </div>

        </div>

        <div class="info">

            <span class="badge prioridade-${tarefa.prioridade}">
                Prioridade ${tarefa.prioridade} -
                ${prioridadeTexto[tarefa.prioridade]}
            </span>

            <span class="badge status">
                ${tarefa.status ? "Em andamento" : "Concluída"}
            </span>

        </div>

        <div class="acoes">

            ${
                tarefa.status
                ? `
                    <button
                        class="btn-concluir"
                        onclick="finalizarTarefa(${tarefa.codigo})"
                    >
                        Concluir
                    </button>
                `
                : ""
            }

            ${
                tarefa.status
                ? `
                    <button
                        class="btn-prioridade"
                        onclick="mudarPrioridade(${tarefa.codigo})"
                    >
                        Alterar prioridade
                    </button>
                `
                : ""
            }

        </div>
    `;

    listaTarefas.appendChild(elemento);
});


}

// ==============================
// EVENTO DE CADASTRO
// ==============================

formTarefa.addEventListener("submit", function(event) {

event.preventDefault();

const titulo = tituloInput.value.trim();
const prioridade = Number(prioridadeInput.value);

try {

    cadastrarTarefa(titulo, prioridade);

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    formTarefa.reset();

    atualizarTela();

} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );
}


});

// ==============================
// CONCLUIR PELA INTERFACE
// ==============================

function finalizarTarefa(codigo) {

try {

    concluirTarefa(codigo);

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );

    atualizarTela();

} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );
}


}

// ==============================
// ALTERAR PRIORIDADE PELA INTERFACE
// ==============================

function mudarPrioridade(codigo) {

const novaPrioridade = prompt(
    "Digite a nova prioridade (1, 2 ou 3):"
);

if (novaPrioridade === null) {
    return;
}

try {

    alterarPrioridade(
        codigo,
        Number(novaPrioridade)
    );

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );

    atualizarTela();

} catch (erro) {

    mostrarMensagem(
        erro.message,
        "erro"
    );
}


}

// ==============================
// MENSAGENS
// ==============================

function mostrarMensagem(texto, tipo) {

mensagem.textContent = texto;
mensagem.className = tipo;

setTimeout(() => {
    mensagem.textContent = "";
    mensagem.className = "";
}, 3000);


}

// ==============================
// INICIALIZAÇÃO
// ==============================

atualizarTela();