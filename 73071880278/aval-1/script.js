// Array que armazenará as tarefas
let tarefas = [];

// ID usado para criar novas tarefas
let proximoId = 1;


// ==========================================
// VALIDAR DADOS DA TAREFA
// ==========================================

function validarTarefa(titulo, descricao) {

    if (titulo.trim() === "") {
        return "O título da tarefa é obrigatório.";
    }

    if (titulo.trim().length < 3) {
        return "O título deve ter pelo menos 3 caracteres.";
    }

    if (descricao.trim() === "") {
        return "A descrição da tarefa é obrigatória.";
    }

    if (descricao.trim().length < 5) {
        return "A descrição deve ter pelo menos 5 caracteres.";
    }

    return null;
}


// ==========================================
// CADASTRAR / ALTERAR TAREFA
// ==========================================

function salvarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const id = document.getElementById("idTarefa").value;

    // Validação
    const erro = validarTarefa(titulo, descricao);

    if (erro) {
        mostrarMensagem(erro, "red");
        return;
    }

    // Se existe ID, significa que estamos alterando
    if (id !== "") {

        alterarTarefa(
            Number(id),
            titulo.trim(),
            descricao.trim()
        );

        mostrarMensagem(
            "Tarefa alterada com sucesso!",
            "green"
        );

    } else {

        // Criando nova tarefa
        const novaTarefa = {
            id: proximoId,
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            status: "pendente"
        };

        tarefas.push(novaTarefa);

        proximoId++;

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "green"
        );
    }

    limparFormulario();
    listarTarefas();
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas(lista = tarefas) {

    const elementoLista = document.getElementById("listaTarefas");

    elementoLista.innerHTML = "";

    if (lista.length === 0) {

        elementoLista.innerHTML = `
            <p class="nenhuma-tarefa">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;
    }

    lista.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.status === "concluida") {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>${tarefa.descricao}</p>

            <p class="status">
                Status:
                <span class="${
                    tarefa.status === "concluida"
                    ? "concluida-texto"
                    : "pendente"
                }">
                    ${
                        tarefa.status === "concluida"
                        ? "Concluída"
                        : "Pendente"
                    }
                </span>
            </p>

            ${
                tarefa.status === "pendente"
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
        `;

        elementoLista.appendChild(div);
    });
}


// ==========================================
// BUSCAR TAREFAS
// ==========================================

function buscarTarefas() {

    const texto = document
        .getElementById("campoBusca")
        .value
        .toLowerCase()
        .trim();

    if (texto === "") {
        listarTarefas();
        return;
    }

    const resultado = tarefas.filter(function(tarefa) {

        return (
            tarefa.titulo.toLowerCase().includes(texto) ||
            tarefa.descricao.toLowerCase().includes(texto)
        );

    });

    listarTarefas(resultado);
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );

        return;
    }

    tarefa.status = "concluida";

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "green"
    );

    listarTarefas();
}


// ==========================================
// ALTERAR TAREFA
// ==========================================

function alterarTarefa(id, novoTitulo, novaDescricao) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );

        return;
    }

    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
}


// ==========================================
// PREPARAR ALTERAÇÃO
// ==========================================

function prepararAlteracao(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );

        return;
    }

    document.getElementById("idTarefa").value = tarefa.id;

    document.getElementById("titulo").value = tarefa.titulo;

    document.getElementById("descricao").value = tarefa.descricao;

    document.getElementById("tituloFormulario").textContent =
        "Alterar Tarefa";

    document.getElementById("btnCancelar").style.display =
        "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// CANCELAR ALTERAÇÃO
// ==========================================

function cancelarEdicao() {

    limparFormulario();

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Tarefa";

    document.getElementById("btnCancelar").style.display =
        "none";
}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    document.getElementById("idTarefa").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Tarefa";

    document.getElementById("btnCancelar").style.display =
        "none";
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, cor) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.style.color = cor;

    setTimeout(function() {
        mensagem.textContent = "";
    }, 3000);
}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();
