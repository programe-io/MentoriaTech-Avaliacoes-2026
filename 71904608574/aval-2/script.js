// ======================================
// ELEMENTOS DO HTML
// ======================================

const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const contador = document.getElementById("contador");

const clearCompleted =
    document.getElementById("clearCompleted");

const filtros =
    document.querySelectorAll(".filtro");


// ======================================
// VARIÁVEIS
// ======================================

// Recupera as tarefas salvas
// ou cria uma lista vazia.

let tarefas =
    JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "all";


// ======================================
// SALVAR NO LOCALSTORAGE
// ======================================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// ======================================
// ADICIONAR TAREFA
// ======================================

function adicionarTarefa() {

    const texto = taskInput.value.trim();

    if (texto === "") {

        alert("Digite uma tarefa!");

        return;
    }

    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        concluida: false

    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    taskInput.value = "";

    mostrarTarefas();

}


// ======================================
// EXCLUIR TAREFA
// ======================================

function excluirTarefa(id) {

    tarefas = tarefas.filter(
        tarefa => tarefa.id !== id
    );

    salvarTarefas();

    mostrarTarefas();

}


// ======================================
// CONCLUIR TAREFA
// ======================================

function concluirTarefa(id) {

    tarefas = tarefas.map(tarefa => {

        if (tarefa.id === id) {

            tarefa.concluida =
                !tarefa.concluida;

        }

        return tarefa;

    });

    salvarTarefas();

    mostrarTarefas();

}


// ======================================
// EDITAR TAREFA
// ======================================

function editarTarefa(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    const novoTexto = prompt(
        "Digite o novo nome da tarefa:",
        tarefa.texto
    );

    if (novoTexto === null) {
        return;
    }

    if (novoTexto.trim() === "") {

        alert("A tarefa não pode ficar vazia!");

        return;
    }

    tarefa.texto = novoTexto.trim();

    salvarTarefas();

    mostrarTarefas();

}


// ======================================
// FILTROS
// ======================================

filtros.forEach(botao => {

    botao.addEventListener("click", () => {

        filtros.forEach(btn => {

            btn.classList.remove("ativo");

        });

        botao.classList.add("ativo");

        filtroAtual =
            botao.dataset.filter;

        mostrarTarefas();

    });

});


// ======================================
// EXCLUIR TAREFAS CONCLUÍDAS
// ======================================

clearCompleted.addEventListener(
    "click",
    () => {

        tarefas = tarefas.filter(
            tarefa => !tarefa.concluida
        );

        salvarTarefas();

        mostrarTarefas();

    }
);


// ======================================
// MOSTRAR TAREFAS
// ======================================

function mostrarTarefas() {

    taskList.innerHTML = "";

    let tarefasFiltradas = tarefas;


    // FILTRO PENDENTES

    if (filtroAtual === "pending") {

        tarefasFiltradas =
            tarefas.filter(
                tarefa => !tarefa.concluida
            );

    }


    // FILTRO CONCLUÍDAS

    if (filtroAtual === "completed") {

        tarefasFiltradas =
            tarefas.filter(
                tarefa => tarefa.concluida
            );

    }


    // NENHUMA TAREFA

    if (tarefasFiltradas.length === 0) {

        taskList.innerHTML = `
            <li class="vazio">
                Nenhuma tarefa encontrada.
            </li>
        `;

    }


    // CRIAR TAREFAS

    tarefasFiltradas.forEach(tarefa => {

        const li =
            document.createElement("li");

        li.classList.add("tarefa");


        if (tarefa.concluida) {

            li.classList.add("concluida");

        }


        li.innerHTML = `

            <div class="tarefa-info">

                <input
                    type="checkbox"
                    ${tarefa.concluida ? "checked" : ""}
                    onchange="concluirTarefa(${tarefa.id})"
                >

                <span class="tarefa-texto">
                    ${tarefa.texto}
                </span>

            </div>


            <div class="acoes">

                <button
                    class="editar"
                    onclick="editarTarefa(${tarefa.id})"
                >
                    ✏️
                </button>

                <button
                    class="excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        taskList.appendChild(li);

    });


    atualizarContador();

}


// ======================================
// CONTADOR
// ======================================

function atualizarContador() {

    const total = tarefas.length;

    const pendentes =
        tarefas.filter(
            tarefa => !tarefa.concluida
        ).length;

    contador.textContent =
        `${total} tarefa(s) | ${pendentes} pendente(s)`;

}


// ======================================
// BOTÃO ADICIONAR
// ======================================

addBtn.addEventListener(
    "click",
    adicionarTarefa
);


// ======================================
// ENTER PARA ADICIONAR
// ======================================

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            adicionarTarefa();

        }

    }
);


// ======================================
// INICIAR
// ======================================

mostrarTarefas();