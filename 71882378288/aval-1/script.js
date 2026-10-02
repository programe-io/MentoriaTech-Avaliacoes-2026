// ==============================
// VARIÁVEIS
// ==============================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let tarefaEditando = null;


// ==============================
// ELEMENTOS HTML
// ==============================

const formTarefa = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const prioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const campoBusca = document.getElementById("campoBusca");
const mensagem = document.getElementById("mensagem");
const btnSalvar = document.getElementById("btnSalvar");


// ==============================
// SALVAR NO LOCALSTORAGE
// ==============================

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// ==============================
// VALIDAR DADOS
// ==============================

function validarTarefa(titulo, descricao, prioridade) {

    if (titulo.trim() === "") {
        return "O título da tarefa é obrigatório.";
    }

    if (titulo.trim().length < 3) {
        return "O título deve ter pelo menos 3 caracteres.";
    }

    if (prioridade === "") {
        return "Selecione uma prioridade.";
    }

    return null;
}


// ==============================
// CADASTRAR / ALTERAR TAREFA
// ==============================

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const tituloValor = titulo.value.trim();
    const descricaoValor = descricao.value.trim();
    const prioridadeValor = prioridade.value;

    const erro = validarTarefa(
        tituloValor,
        descricaoValor,
        prioridadeValor
    );

    if (erro) {
        mostrarMensagem(erro, "erro");
        return;
    }


    // ALTERAR
    if (tarefaEditando !== null) {

        const tarefa = tarefas.find(
            tarefa => tarefa.id === tarefaEditando
        );

        tarefa.titulo = tituloValor;
        tarefa.descricao = descricaoValor;
        tarefa.prioridade = prioridadeValor;

        tarefaEditando = null;

        btnSalvar.textContent = "Cadastrar tarefa";

        mostrarMensagem(
            "Tarefa alterada com sucesso!",
            "sucesso"
        );

    } 
    
    // CADASTRAR
    else {

        const novaTarefa = {
            id: Date.now(),
            titulo: tituloValor,
            descricao: descricaoValor,
            prioridade: prioridadeValor,
            concluida: false
        };

        tarefas.push(novaTarefa);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );
    }

    salvarTarefas();

    formTarefa.reset();

    listarTarefas();
});


// ==============================
// LISTAR TAREFAS
// ==============================

function listarTarefas(lista = tarefas) {

    listaTarefas.innerHTML = "";

    if (lista.length === 0) {

        listaTarefas.innerHTML = `
            <p class="sem-tarefas">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;
    }


    lista.forEach(tarefa => {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }


        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                ${tarefa.descricao || "Sem descrição"}
            </p>

            <span class="prioridade ${tarefa.prioridade}">
                Prioridade: ${tarefa.prioridade}
            </span>

            <p>
                Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

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
                    onclick="alterarTarefa(${tarefa.id})"
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


// ==============================
// BUSCAR TAREFA
// ==============================

campoBusca.addEventListener("input", function() {

    const termo = campoBusca.value.toLowerCase().trim();

    const resultado = tarefas.filter(tarefa => {

        return (
            tarefa.titulo.toLowerCase().includes(termo) ||
            tarefa.descricao.toLowerCase().includes(termo)
        );

    });

    listarTarefas(resultado);
});


// ==============================
// CONCLUIR TAREFA
// ==============================

function concluirTarefa(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        return;
    }

    tarefa.concluida = true;

    salvarTarefas();

    listarTarefas();

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );
}


// ==============================
// ALTERAR TAREFA
// ==============================

function alterarTarefa(id) {

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (!tarefa) {
        return;
    }

    titulo.value = tarefa.titulo;
    descricao.value = tarefa.descricao;
    prioridade.value = tarefa.prioridade;

    tarefaEditando = id;

    btnSalvar.textContent = "Salvar alteração";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// EXCLUIR TAREFA
// ==============================

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

    salvarTarefas();

    listarTarefas();

    mostrarMensagem(
        "Tarefa excluída com sucesso!",
        "sucesso"
    );
}


// ==============================
// MENSAGENS
// ==============================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    if (tipo === "erro") {
        mensagem.style.color = "#dc2626";
    } else {
        mensagem.style.color = "#16a34a";
    }

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}


// ==============================
// INICIAR SISTEMA
// ==============================

listarTarefas();
