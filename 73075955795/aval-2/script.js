/* Array que armazena todas as tarefas */
let tarefas = [];


/* =========================================================
   VALIDA OS DADOS DE UMA TAREFA
========================================================= */

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


/* =========================================================
   ADICIONA UMA NOVA TAREFA
========================================================= */

function adicionarTarefa(titulo, prioridade) {

    const validacao = validarDadosTarefa(
        titulo,
        prioridade
    );

    if (!validacao.valido) {
        console.error(validacao.mensagem);

        mostrarMensagem(
            validacao.mensagem,
            "erro"
        );

        return null;
    }

    const novaTarefa = {

        id: tarefas.length > 0
            ? Math.max(...tarefas.map((tarefa) => tarefa.id)) + 1
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


/* =========================================================
   LISTA TODAS AS TAREFAS
========================================================= */

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazia">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        console.log("Nenhuma tarefa cadastrada.");

        return [];
    }

    console.table(tarefas);

    tarefas.forEach((tarefa) => {

        const elementoTarefa = document.createElement("div");

        elementoTarefa.classList.add("tarefa");

        if (tarefa.concluida) {
            elementoTarefa.classList.add(
                "tarefa-concluida"
            );
        }

        elementoTarefa.innerHTML = `

            <div class="tarefa-info">

                <div class="tarefa-titulo">
                    ${tarefa.titulo}
                </div>

                <div class="tarefa-prioridade prioridade-${tarefa.prioridade}">
                    Prioridade:
                    ${formatarPrioridade(tarefa.prioridade)}
                </div>

            </div>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.id})"
                >
                    ${tarefa.concluida ? "Concluída" : "Concluir"}
                </button>

                <button
                    class="btn-remover"
                    onclick="removerTarefa(${tarefa.id})"
                >
                    Remover
                </button>

            </div>
        `;

        lista.appendChild(elementoTarefa);
    });

    return tarefas;
}


/* =========================================================
   MARCA UMA TAREFA COMO CONCLUÍDA
========================================================= */

function concluirTarefa(id) {

    const tarefa = tarefas.find(
        (item) => item.id === id
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
        `Tarefa "${tarefa.titulo}" concluída!`,
        "sucesso"
    );

    listarTarefas();

    return true;
}


/* =========================================================
   REMOVE UMA TAREFA
========================================================= */

function removerTarefa(id) {

    const indice = tarefas.findIndex(
        (item) => item.id === id
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

    const [tarefaRemovida] = tarefas.splice(
        indice,
        1
    );

    console.log(
        `Tarefa "${tarefaRemovida.titulo}" removida.`
    );

    mostrarMensagem(
        `Tarefa "${tarefaRemovida.titulo}" removida!`,
        "sucesso"
    );

    listarTarefas();

    return true;
}


/* =========================================================
   FORMATA A PRIORIDADE
========================================================= */

function formatarPrioridade(prioridade) {

    const nomes = {
        baixa: "Baixa",
        media: "Média",
        alta: "Alta"
    };

    return nomes[prioridade] || prioridade;
}


/* =========================================================
   MOSTRA MENSAGEM NA TELA
========================================================= */

function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById(
        "mensagem"
    );

    mensagem.textContent = texto;

    mensagem.className = tipo;

    setTimeout(() => {

        mensagem.textContent = "";
        mensagem.className = "";

    }, 3000);
}


/* =========================================================
   EVENTO DO FORMULÁRIO
========================================================= */

document
    .getElementById("formTarefa")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const titulo = document
            .getElementById("titulo")
            .value;

        const prioridade = document
            .getElementById("prioridade")
            .value;

        const resultado = adicionarTarefa(
            titulo,
            prioridade
        );

        if (resultado) {

            document
                .getElementById("formTarefa")
                .reset();
        }
    });


/* =========================================================
   EXIBIÇÃO INICIAL
========================================================= */

listarTarefas();