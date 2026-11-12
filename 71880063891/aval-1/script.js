
// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================

// Array de tarefas
let tarefas = [];

// Gerador automático de códigos
let geradorDeCodigo = 0;


// ==========================================
// 1. VALIDAR DADOS
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve ter no mínimo cinco caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// ==========================================
// 2. CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    let novaTarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}


// ==========================================
// 3. BUSCAR TAREFA
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        (item) => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}


// ==========================================
// 4. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';

        return;
    }

    tarefas.forEach((tarefa) => {

        const elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

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

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Prioridade:</strong> ${prioridadeTexto}</p>

            <p><strong>Status:</strong>
                ${tarefa.status ? "Em andamento" : "Concluída"}
            </p>

            <div class="acoes">

                <button class="btn-concluir"
                    ${!tarefa.status ? "disabled" : ""}
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button class="btn-prioridade"
                    onclick="alterarPrioridadeTela(${tarefa.codigo})">
                    Alterar prioridade
                </button>

                <button class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>

            </div>
        `;

        lista.appendChild(elemento);

    });
}


// ==========================================
// 5. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {
            throw new Error("Tarefa já concluída.");
        }

        tarefa.status = false;

        mostrarMensagem("Tarefa concluída com sucesso!");

        listarTarefas();

    } catch (erro) {

        mostrarMensagem(erro.message);

    }
}


// ==========================================
// 6. ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


function alterarPrioridadeTela(codigo) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    try {

        const prioridade = Number(novaPrioridade);

        alterarPrioridade(codigo, prioridade);

        mostrarMensagem("Prioridade alterada com sucesso!");

        listarTarefas();

    } catch (erro) {

        mostrarMensagem(erro.message);

    }
}


// ==========================================
// 7. EXCLUIR TAREFA
// ==========================================

function excluirTarefa(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    const indice = tarefas.findIndex(
        (item) => item.codigo === codigo
    );

    if (indice === -1) {

        mostrarMensagem("Tarefa não encontrada.");

        return;
    }

    tarefas.splice(indice, 1);

    mostrarMensagem("Tarefa excluída com sucesso!");

    listarTarefas();
}


// ==========================================
// 8. MOSTRAR MENSAGENS
// ==========================================

function mostrarMensagem(texto) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

}


// ==========================================
// 9. EVENTO DE CADASTRO
// ==========================================

document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document
            .getElementById("titulo")
            .value.trim();

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {

            cadastrarTarefa(titulo, prioridade);

            mostrarMensagem(
                "Tarefa cadastrada com sucesso!"
            );

            this.reset();

            listarTarefas();

        } catch (erro) {

            mostrarMensagem(erro.message);

        }

    });


// ==========================================
// 10. INICIAR SISTEMA
// ==========================================

listarTarefas();
