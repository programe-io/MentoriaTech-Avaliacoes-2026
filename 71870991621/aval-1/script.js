// Array que armazena as tarefas
let tarefas = [];

// ID da próxima tarefa
let proximoId = 1;

// ID da tarefa que está sendo alterada
let idAlterando = null;


// Elementos do HTML
const formTarefa = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const listaTarefas = document.getElementById("listaTarefas");
const campoBusca = document.getElementById("campoBusca");
const mensagem = document.getElementById("mensagem");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


// ================================
// CADASTRAR / ALTERAR
// ================================

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const tituloValor = titulo.value.trim();
    const descricaoValor = descricao.value.trim();

    // Validação
    if (tituloValor === "") {
        mostrarMensagem("Digite o título da tarefa.", true);
        titulo.focus();
        return;
    }

    if (descricaoValor === "") {
        mostrarMensagem("Digite a descrição da tarefa.", true);
        descricao.focus();
        return;
    }


    // Se estiver alterando
    if (idAlterando !== null) {

        const tarefa = tarefas.find(
            tarefa => tarefa.id === idAlterando
        );

        if (tarefa) {
            tarefa.titulo = tituloValor;
            tarefa.descricao = descricaoValor;

            mostrarMensagem("Tarefa alterada com sucesso!");
        }

        idAlterando = null;

        btnSalvar.textContent = "Cadastrar Tarefa";
        btnCancelar.style.display = "none";

    }

    // Se estiver cadastrando
    else {

        const novaTarefa = {
            id: proximoId,
            titulo: tituloValor,
            descricao: descricaoValor,
            concluida: false
        };

        tarefas.push(novaTarefa);

        proximoId++;

        mostrarMensagem("Tarefa cadastrada com sucesso!");
    }


    limparFormulario();

    listarTarefas();
});


// ================================
// LISTAR TAREFAS
// ================================

function listarTarefas() {

    const busca = campoBusca.value
        .toLowerCase()
        .trim();

    let tarefasFiltradas = tarefas;

    // Buscar tarefas
    if (busca !== "") {

        tarefasFiltradas = tarefas.filter(tarefa =>

            tarefa.titulo
                .toLowerCase()
                .includes(busca) ||

            tarefa.descricao
                .toLowerCase()
                .includes(busca)
        );
    }


    // Nenhuma tarefa
    if (tarefasFiltradas.length === 0) {

        listaTarefas.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa encontrada.
            </div>
        `;

        return;
    }


    // Limpa a lista
    listaTarefas.innerHTML = "";


    // Cria cada tarefa
    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }


        div.innerHTML = `

            <h3>
                ${tarefa.titulo}
            </h3>

            <p>
                ${tarefa.descricao}
            </p>

            <div class="status">

                Status:

                <span class="${
                    tarefa.concluida
                        ? "concluida-texto"
                        : "pendente"
                }">

                    ${
                        tarefa.concluida
                            ? "Concluída"
                            : "Pendente"
                    }

                </span>

            </div>

            <div class="acoes">

                ${
                    !tarefa.concluida
                        ? `
                            <button
                                class="btn-concluir"
                                onclick="concluirTarefa(${tarefa.id})"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                }

                <button
                    class="btn-alterar"
                    onclick="prepararAlteracao(${tarefa.id})"
                >
                    Alterar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    Excluir
                </button>

            </div>
        `;


        listaTarefas.appendChild(div);
    });
}


// ================================
// CONCLUIR TAREFA
// ================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", true);
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem("Tarefa concluída com sucesso!");

    listarTarefas();
}


// ================================
// ALTERAR TAREFA
// ================================

function prepararAlteracao(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", true);
        return;
    }


    // Coloca os dados no formulário
    titulo.value = tarefa.titulo;
    descricao.value = tarefa.descricao;


    // Guarda o ID
    idAlterando = id;


    // Muda o botão
    btnSalvar.textContent = "Salvar Alteração";

    btnCancelar.style.display = "inline-block";


    // Volta para o formulário
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================================
// EXCLUIR TAREFA
// ================================

function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }


    tarefas = tarefas.filter(
        tarefa => tarefa.id !== id
    );


    mostrarMensagem("Tarefa excluída com sucesso!");

    listarTarefas();
}


// ================================
// BUSCAR TAREFA
// ================================

campoBusca.addEventListener("input", function() {

    listarTarefas();

});


// ================================
// CANCELAR ALTERAÇÃO
// ================================

btnCancelar.addEventListener("click", function() {

    idAlterando = null;

    limparFormulario();

    btnSalvar.textContent = "Cadastrar Tarefa";

    btnCancelar.style.display = "none";

});


// ================================
// LIMPAR FORMULÁRIO
// ================================

function limparFormulario() {

    titulo.value = "";
    descricao.value = "";

}


// ================================
// MENSAGEM
// ================================

function mostrarMensagem(texto, erro = false) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem";

    if (erro) {
        mensagem.classList.add("erro");
    }


    setTimeout(function() {

        mensagem.textContent = "";
        mensagem.className = "";

    }, 3000);
}


// ================================
// INICIAR SISTEMA
// ================================

listarTarefas();
