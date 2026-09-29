const form = document.getElementById("formTarefa");

const campoTarefa = document.getElementById("tarefa");
const campoCategoria = document.getElementById("categoria");

const listaTarefas = document.getElementById("listaTarefas");
const filtro = document.getElementById("filtro");

const total = document.getElementById("total");
const pendentes = document.getElementById("pendentes");
const concluidas = document.getElementById("concluidas");

let tarefas = [];


// ADICIONAR TAREFA

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = campoTarefa.value.trim();
    const categoria = campoCategoria.value;

    if (texto === "") {
        alert("Digite uma tarefa.");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        categoria: categoria,
        concluida: false
    };

    tarefas.push(novaTarefa);

    campoTarefa.value = "";

    atualizarTela();
});


// FILTRO

filtro.addEventListener("change", function() {
    atualizarTela();
});


// ATUALIZAR TELA

function atualizarTela() {

    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtro.value === "pendentes") {

        tarefasFiltradas = tarefas.filter(
            tarefa => !tarefa.concluida
        );

    }

    if (filtro.value === "concluidas") {

        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.concluida
        );

    }


    if (tarefasFiltradas.length === 0) {

        const vazio = document.createElement("div");

        vazio.className = "vazio";

        vazio.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";

        listaTarefas.appendChild(vazio);

    } else {

        tarefasFiltradas.forEach(function(tarefa) {

            criarTarefa(tarefa);

        });

    }

    atualizarResumo();
}


// CRIAR ELEMENTO DA TAREFA

function criarTarefa(tarefa) {

    const elemento = document.createElement("div");

    elemento.className = "tarefa";

    if (tarefa.concluida) {
        elemento.classList.add("concluida");
    }


    const informacoes = document.createElement("div");

    informacoes.className = "info-tarefa";


    const titulo = document.createElement("h3");

    titulo.textContent = tarefa.texto;


    const categoria = document.createElement("p");

    categoria.textContent = "Categoria: " + tarefa.categoria;


    informacoes.appendChild(titulo);
    informacoes.appendChild(categoria);


    const acoes = document.createElement("div");

    acoes.className = "acoes";


    const botaoConcluir = document.createElement("button");

    botaoConcluir.className = "btn-concluir";

    botaoConcluir.textContent =
        tarefa.concluida ? "Reabrir" : "Concluir";


    botaoConcluir.addEventListener("click", function() {

        alternarTarefa(tarefa.id);

    });


    const botaoExcluir = document.createElement("button");

    botaoExcluir.className = "btn-excluir";

    botaoExcluir.textContent = "Excluir";


    botaoExcluir.addEventListener("click", function() {

        excluirTarefa(tarefa.id);

    });


    acoes.appendChild(botaoConcluir);
    acoes.appendChild(botaoExcluir);


    elemento.appendChild(informacoes);
    elemento.appendChild(