// ========================================
// ARRAY QUE ARMAZENA TODAS AS TAREFAS
// ========================================

let tarefas = [];


// ========================================
// ELEMENTOS DO HTML
// ========================================

const formTarefa = document.getElementById("formTarefa");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// ========================================
// VALIDA OS DADOS DE UMA TAREFA
// ========================================

function validarDadosTarefa(titulo, prioridade) {

    const prioridadesValidas = ["baixa", "media", "alta"];

    if (
        typeof titulo !== "string" ||
        titulo.trim().length < 5
    ) {
        return {
            valido: false,
            mensagem: "O título deve possuir pelo menos 5 caracteres."
        };
    }

    if (
        typeof prioridade !== "string" ||
        !prioridadesValidas.includes(prioridade.toLowerCase())
    ) {
        return {
            valido: false,
            mensagem: "A prioridade deve ser: baixa, media ou alta."
        };
    }

    return {
        valido: true,
        mensagem: "Dados válidos."
    };
}


// ========================================
// ADICIONA UMA NOVA TAREFA
// ========================================

function adicionarTarefa(titulo, prioridade) {

    const validacao = validarDadosTarefa(
        titulo,
        prioridade
    );

    if (!validacao.valido) {

        mostrarMensagem(
            validacao.mensagem,
            "erro"
        );

        return null;
    }

    const novaTarefa = {

        id: tarefas.length > 0
            ? Math.max(
                ...tarefas.map(
                    tarefa => tarefa.id
                )
            ) + 1
            : 1,

        titulo: titulo.trim(),

        prioridade: prioridade.toLowerCase(),

        concluida: false
    };

    tarefas.push(novaTarefa);

    console.log(
        "Tarefa adicionada com sucesso:",
        novaTarefa
    );

    mostrarMensagem(
        "Tarefa adicionada com sucesso!",
        "sucesso"
    );

    listarTarefas();

    return novaTarefa;
}


// ========================================
// LISTA TODAS AS TAREFAS
// ========================================

function listarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return [];
    }

    tarefas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");

        if (tarefa.concluida) {
            elemento.classList.add("concluida");
        }

        elemento.innerHTML = `

            <div class="tarefa-info">

                <h3>${tarefa.titulo}</h3>

                <p>
                    ID: ${tarefa.id}
                </p>

                <span class="prioridade ${tarefa.prioridade}">
                    Prioridade: ${tarefa.prioridade}
                </span>

            </div>

            <div class="acoes">

                ${
                    tarefa.concluida
                    ? ""
                    : `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.id})"
                        >
                            Concluir
                        </button>
                    `
                }

                <button
                    class="btn-remover"
                    onclick="removerTarefa(${tarefa.id})"
                >
                    Remover
                </button>

            </div>
        `;

        listaTarefas.appendChild(elemento);
    });

    console.table(tarefas);

    return tarefas;
}


// ========================================
// MARCA UMA TAREFA COMO CONCLUÍDA
// ========================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(
        item => item.id === id
    );

    if (!tarefa) {

        console.error(
            `Tarefa com ID ${id} não encontrada.`
        );

        mostrarMensagem(
            `Tarefa com ID ${id} não encontrada.`,
            "erro"
        );

        return false;
    }

    if (tarefa.concluida) {

        console.log(
            "Essa tarefa já está concluída."
        );

        return true;
    }

    tarefa.concluida = true;

    console.log(
        `Tarefa "${tarefa.titulo}" concluída.`
    );

    mostrarMensagem(
        "Tarefa concluída!",
        "sucesso"
    );

    listarTarefas();

    return true;
}


// ========================================
// REMOVE UMA TAREFA
// ========================================

function removerTarefa(id) {

    const indice = tarefas.findIndex(
        item => item.id === id
    );

    if (indice === -1) {

        console.error(
            `Tarefa com ID ${id} não encontrada.`
        );

        mostrarMensagem(
            `Tarefa com ID ${id} não encontrada.`,
            "erro"
        );

        return false;
    }

    const [tarefaRemovida] =
        tarefas.splice(indice, 1);

    console.log(
        `Tarefa "${tarefaRemovida.titulo}" removida.`
    );

    mostrarMensagem(
        "Tarefa removida!",
        "sucesso"
    );

    listarTarefas();

    return true;
}


// ========================================
// MOSTRA MENSAGEM NA TELA
// ========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;

    setTimeout(() => {

        mensagem.textContent = "";
        mensagem.className = "";

    }, 3000);
}


// ========================================
// EVENTO DO FORMULÁRIO
// ========================================

formTarefa.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();

        const titulo = inputTitulo.value;

        const prioridade =
            selectPrioridade.value;

        const tarefa = adicionarTarefa(
            titulo,
            prioridade
        );

        if (tarefa) {

            formTarefa.reset();

            inputTitulo.focus();
        }
    }
);


// ========================================
// EXEMPLOS DE USO
// ========================================

// Você pode testar pelo console do navegador:
//
// adicionarTarefa("Estudar JavaScript", "alta");
// adicionarTarefa("Fazer exercícios", "media");
// adicionarTarefa("Ler um livro", "baixa");
//
// listarTarefas();
//
// concluirTarefa(1);
//
// removerTarefa(2);
//
// listarTarefas();


// ========================================
// INICIA A LISTA
// ========================================

listarTarefas();