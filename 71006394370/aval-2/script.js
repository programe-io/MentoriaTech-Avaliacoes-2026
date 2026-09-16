```javascript
// =========================
// ELEMENTOS DO HTML
// =========================

const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagemVazia");
const limparConcluidas = document.getElementById("limparConcluidas");

const filtros = document.querySelectorAll(".filtro");


// =========================
// LISTA DE TAREFAS
// =========================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";


// =========================
// SALVAR TAREFAS
// =========================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// =========================
// MOSTRAR TAREFAS
// =========================

function mostrarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas.filter(function(tarefa) {

        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });


    // Mostrar mensagem quando não houver tarefas

    if (tarefasFiltradas.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";
    }


    // Criar cada tarefa

    tarefasFiltradas.forEach(function(tarefa) {

        const li = document.createElement("li");

        li.classList.add("tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }


        // Texto da tarefa

        const span = document.createElement("span");

        span.textContent = tarefa.texto;


        // Botão concluir

        const botaoConcluir = document.createElement("button");

        botaoConcluir.classList.add("botao-concluir");

        botaoConcluir.textContent = "✓";

        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {

            concluirTarefa(tarefa.id);

        });


        // Botão excluir

        const botaoExcluir = document.createElement("button");

        botaoExcluir.classList.add("botao-excluir");

        botaoExcluir.textContent = "✕";

        botaoExcluir.title = "Excluir tarefa";

        botaoExcluir.addEventListener("click", function() {

            excluirTarefa(tarefa.id);

        });


        li.appendChild(span);

        li.appendChild(botaoConcluir);

        li.appendChild(botaoExcluir);

        listaTarefas.appendChild(li);

    });


    atualizarContador();
}


// =========================
// ADICIONAR TAREFA
// =========================

function adicionarTarefa() {

    const texto = tarefaInput.value.trim();


    // Verificar se está vazio

    if (texto === "") {

        alert("Digite uma tarefa!");

        tarefaInput.focus();

        return;
    }


    // Criar tarefa

    const novaTarefa = {

        id: Date.now(),

        texto: texto,

        concluida: false
    };


    tarefas.push(novaTarefa);


    salvarTarefas();

    mostrarTarefas();


    // Limpar campo

    tarefaInput.value = "";

    tarefaInput.focus();
}


// =========================
// CONCLUIR TAREFA
// =========================

function concluirTarefa(id) {

    tarefas = tarefas.map(function(tarefa) {

        if (tarefa.id === id) {

            tarefa.concluida = !tarefa.concluida;
        }

        return tarefa;
    });


    salvarTarefas();

    mostrarTarefas();
}


// =========================
// EXCLUIR TAREFA
// =========================

function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {

        return tarefa.id !== id;
    });


    salvarTarefas();

    mostrarTarefas();
}


// =========================
// CONTADOR
// =========================

function atualizarContador() {

    const pendentes = tarefas.filter(function(tarefa) {

        return !tarefa.concluida;

    }).length;


    contador.textContent = pendentes;
}


// =========================
// LIMPAR CONCLUÍDAS
// =========================

limparConcluidas.addEventListener("click", function() {

    tarefas = tarefas.filter(function(tarefa) {

        return !tarefa.concluida;

    });


    salvarTarefas();

    mostrarTarefas();
});


// =========================
// BOTÃO ADICIONAR
// =========================

adicionarBtn.addEventListener("click", adicionarTarefa);


// =========================
// ENTER PARA ADICIONAR
// =========================

tarefaInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        adicionarTarefa();
    }
});


// =========================
// FILTROS
// =========================

filtros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtros.forEach(function(item) {

            item.classList.remove("ativo");

        });


        botao.classList.add("ativo");


        filtroAtual = botao.dataset.filtro;


        mostrarTarefas();
    });
});


// =========================
// INICIAR PROGRAMA
// =========================

mostrarTarefas();
```
