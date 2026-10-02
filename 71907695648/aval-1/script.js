// ========================================
// VARIÁVEIS
// ========================================

let tarefas = [];

let tarefaEmEdicao = null;


// Elementos HTML
const form = document.getElementById("formTarefa");

const titulo = document.getElementById("titulo");

const descricao = document.getElementById("descricao");

const data = document.getElementById("data");

const buscar = document.getElementById("buscar");

const listaTarefas = document.getElementById("listaTarefas");

const mensagem = document.getElementById("mensagem");

const btnSalvar = document.getElementById("btnSalvar");

const btnCancelar = document.getElementById("btnCancelar");


// ========================================
// CADASTRAR / ALTERAR
// ========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const dados = {

        titulo: titulo.value.trim(),

        descricao: descricao.value.trim(),

        data: data.value

    };


    // VALIDAR DADOS

    if (!validarTarefa(dados)) {

        return;

    }


    // ====================================
    // ALTERAR TAREFA
    // ====================================

    if (tarefaEmEdicao !== null) {

        const tarefa = tarefas.find(function (tarefa) {

            return tarefa.id === tarefaEmEdicao;

        });


        if (tarefa) {

            tarefa.titulo = dados.titulo;

            tarefa.descricao = dados.descricao;

            tarefa.data = dados.data;

        }


        mostrarMensagem(
            "Tarefa alterada com sucesso!",
            "sucesso"
        );


        cancelarEdicao();

        listarTarefas();

        return;
    }


    // ====================================
    // CADASTRAR TAREFA
    // ====================================

    const novaTarefa = {

        id: Date.now(),

        titulo: dados.titulo,

        descricao: dados.descricao,

        data: dados.data,

        concluida: false

    };


    tarefas.push(novaTarefa);


    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );


    form.reset();

    listarTarefas();

});


// ========================================
// VALIDAR DADOS
// ========================================

function validarTarefa(tarefa) {


    if (tarefa.titulo === "") {

        mostrarMensagem(
            "O título é obrigatório.",
            "erro"
        );

        return false;

    }


    if (tarefa.titulo.length < 3) {

        mostrarMensagem(
            "O título deve possuir pelo menos 3 caracteres.",
            "erro"
        );

        return false;

    }


    if (tarefa.descricao === "") {

        mostrarMensagem(
            "A descrição é obrigatória.",
            "erro"
        );

        return false;

    }


    if (tarefa.data === "") {

        mostrarMensagem(
            "A data é obrigatória.",
            "erro"
        );

        return false;

    }


    return true;

}


// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas(lista = tarefas) {


    listaTarefas.innerHTML = "";


    if (lista.length === 0) {

        listaTarefas.innerHTML = `
            <li>
                Nenhuma tarefa encontrada.
            </li>
        `;

        return;

    }


    lista.forEach(function (tarefa) {


        const item = document.createElement("li");

        item.classList.add("tarefa");


        if (tarefa.concluida) {

            item.classList.add("concluida");

        }


        item.innerHTML = `

            <h3>
                ${tarefa.titulo}
            </h3>

            <p>
                ${tarefa.descricao}
            </p>

            <p>
                <strong>Data:</strong>
                ${tarefa.data}
            </p>

            <p>
                <strong>Status:</strong>

                ${
                    tarefa.concluida
                    ? "Concluída"
                    : "Pendente"
                }

            </p>


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
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})"
                >
                    Alterar
                </button>

            </div>

        `;


        listaTarefas.appendChild(item);

    });

}


// ========================================
// BUSCAR TAREFAS
// ========================================

buscar.addEventListener("input", function () {


    const texto = buscar.value
        .toLowerCase()
        .trim();


    const resultado = tarefas.filter(function (tarefa) {


        return (

            tarefa.titulo
                .toLowerCase()
                .includes(texto)

            ||

            tarefa.descricao
                .toLowerCase()
                .includes(texto)

        );

    });


    listarTarefas(resultado);

});


// ========================================
// CONCLUIR TAREFA
// ========================================

function concluirTarefa(id) {


    const tarefa = tarefas.find(function (tarefa) {

        return tarefa.id === id;

    });


    if (!tarefa) {

        return;

    }


    tarefa.concluida = true;


    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );


    listarTarefas();

}


// ========================================
// ALTERAR TAREFA
// ========================================

function alterarTarefa(id) {


    const tarefa = tarefas.find(function (tarefa) {

        return tarefa.id === id;

    });


    if (!tarefa) {

        return;

    }


    // Guardar o ID da tarefa
    tarefaEmEdicao = id;


    // Colocar dados no formulário
    titulo.value = tarefa.titulo;

    descricao.value = tarefa.descricao;

    data.value = tarefa.data;


    // Alterar botão
    btnSalvar.textContent = "Salvar alteração";


    // Mostrar botão cancelar
    btnCancelar.hidden = false;


    // Colocar cursor no título
    titulo.focus();

}


// ========================================
// CANCELAR ALTERAÇÃO
// ========================================

btnCancelar.addEventListener("click", function () {

    cancelarEdicao();

});


function cancelarEdicao() {


    tarefaEmEdicao = null;


    form.reset();


    btnSalvar.textContent = "Cadastrar tarefa";


    btnCancelar.hidden = true;

}


// ========================================
// MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {


    mensagem.textContent = texto;

    mensagem.className = tipo;


    setTimeout(function () {

        mensagem.textContent = "";

        mensagem.className = "";

    }, 3000);

}


// ========================================
// INICIALIZAR
// ========================================

listarTarefas();