
let tarefas = [];
let geradorCodigo = 0;

// Elementos do HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Função para validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres"
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3"
        );
    }
}

// Função para cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// Função para listar todas as tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(
        tarefa => tarefa.codigo === codigo
    );
}

// Função para concluir uma tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    tarefa.status = false;

    return tarefa;
}

// Função para excluir uma tarefa
function excluirTarefa(codigo) {

    let indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);
}

// Função para mostrar as tarefas na tela
function renderizarTarefas() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }

    tarefas.forEach(function(tarefa) {

        let elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        elemento.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${prioridadeTexto}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.status ? "Pendente" : "Concluída"}
            </p>

            <div class="acoes">

                ${
                    tarefa.status
                    ? `
                        <button
                            class="btn-concluir"
                            data-acao="concluir"
                            data-codigo="${tarefa.codigo}"
                        >
                            Concluir
                        </button>
                    `
                    : ""
                }

                <button
                    class="btn-excluir"
                    data-acao="excluir"
                    data-codigo="${tarefa.codigo}"
                >
                    Excluir
                </button>

            </div>
        `;

        listaTarefas.appendChild(elemento);

    });
}

// Evento para cadastrar uma tarefa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let titulo = campoTitulo.value.trim();

    let prioridade = Number(campoPrioridade.value);

    try {

        cadastrarTarefa(titulo, prioridade);

        mensagem.textContent = "Tarefa cadastrada com sucesso!";
        mensagem.style.color = "green";

        formulario.reset();

        renderizarTarefas();

    } catch (erro) {

        mensagem.textContent = erro.message;
        mensagem.style.color = "red";

    }

});

// Evento para concluir ou excluir tarefas
listaTarefas.addEventListener("click", function(event) {

    let botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    let codigo = Number(botao.dataset.codigo);

    let acao = botao.dataset.acao;

    try {

        if (acao === "concluir") {

            concluirTarefa(codigo);

            mensagem.textContent = "Tarefa concluída!";
            mensagem.style.color = "green";

        }

        if (acao === "excluir") {

            excluirTarefa(codigo);

            mensagem.textContent = "Tarefa excluída!";
            mensagem.style.color = "green";

        }

        renderizarTarefas();

    } catch (erro) {

        mensagem.textContent = erro.message;
        mensagem.style.color = "red";

    }

});

// Exibir a lista inicial
renderizarTarefas();
