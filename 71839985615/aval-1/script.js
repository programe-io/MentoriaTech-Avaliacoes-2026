// Lista onde as tarefas serão armazenadas
let tarefas = [];

// Elementos do HTML
const formTarefa = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const buscar = document.getElementById("buscar");
const listaTarefas = document.getElementById("listaTarefas");


// ================================
// VALIDAR TAREFA
// ================================

function validarTarefa(titulo, descricao) {

    if (titulo.trim() === "") {
        alert("O título da tarefa é obrigatório.");
        return false;
    }

    if (descricao.trim() === "") {
        alert("A descrição da tarefa é obrigatória.");
        return false;
    }

    return true;
}


// ================================
// CADASTRAR TAREFA
// ================================

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const tituloValor = titulo.value;
    const descricaoValor = descricao.value;

    if (!validarTarefa(tituloValor, descricaoValor)) {
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        titulo: tituloValor,
        descricao: descricaoValor,
        concluida: false
    };

    tarefas.push(novaTarefa);

    titulo.value = "";
    descricao.value = "";

    listarTarefas();
});


// ================================
// LISTAR TAREFAS
// ================================

function listarTarefas(lista = tarefas) {

    listaTarefas.innerHTML = "";

    if (lista.length === 0) {
        listaTarefas.innerHTML = `
            <div class="mensagem">
                Nenhuma tarefa encontrada.
            </div>
        `;

        return;
    }

    lista.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>${tarefa.descricao}</p>

            <p>
                Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="botoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "Desfazer" : "Concluir"}
                </button>

                <button
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// ================================
// BUSCAR TAREFA
// ================================

buscar.addEventListener("input", function() {

    const texto = buscar.value.toLowerCase();

    const resultado = tarefas.filter(function(tarefa) {

        return (
            tarefa.titulo.toLowerCase().includes(texto) ||
            tarefa.descricao.toLowerCase().includes(texto)
        );

    });

    listarTarefas(resultado);
});


// ================================
// CONCLUIR TAREFA
// ================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    listarTarefas();
}


// ================================
// ALTERAR TAREFA
// ================================

function alterarTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) {
        return;
    }

    const novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) {
        return;
    }

    if (!validarTarefa(novoTitulo, novaDescricao)) {
        return;
    }

    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;

    listarTarefas();
}


// ================================
// INICIAR SISTEMA
// ================================

listarTarefas();
