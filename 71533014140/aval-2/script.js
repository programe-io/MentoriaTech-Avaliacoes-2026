// Array que armazenará todas as tarefas
const tarefas = [];

// Gerador de códigos
let geradorCodigo = 0;


// =====================================================
// 1. VALIDAR DADOS DA TAREFA
// =====================================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// =====================================================
// 2. CADASTRAR TAREFA
// =====================================================

function cadastrarTarefa(titulo, prioridade) {

    // Validação dos dados
    validarDadosDaTarefa(titulo, prioridade);

    // Gera um novo código
    geradorCodigo++;

    // Cria o objeto da tarefa
    const novaTarefa = {
        codigo: geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);
}


// =====================================================
// 3. LISTAR TAREFAS
// =====================================================

function listarTarefas() {
    return tarefas;
}


// =====================================================
// 4. BUSCAR TAREFA
// =====================================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Tarefa não encontrada."
        );
    }

    return tarefa;
}


// =====================================================
// 5. CONCLUIR TAREFA
// =====================================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            "Essa tarefa já foi concluída."
        );
    }

    tarefa.status = false;
}


// =====================================================
// 6. ALTERAR PRIORIDADE
// =====================================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    // Reutiliza a função de validação
    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;
}


// =====================================================
// ELEMENTOS DO HTML
// =====================================================

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");


// =====================================================
// CADASTRO PELO FORMULÁRIO
// =====================================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    try {

        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "sucesso"
        );

        formulario.reset();

        atualizarLista();

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
});


// =====================================================
// MOSTRAR MENSAGEM
// =====================================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className =
        tipo === "erro"
            ? "mensagem-erro"
            : "mensagem-sucesso";

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}


// =====================================================
// ATUALIZAR LISTA NA TELA
// =====================================================

function atualizarLista() {

    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }

    tarefas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");

        if (tarefa.status === false) {
            elemento.classList.add("concluida");
        }

        const status = tarefa.status
            ? "Em andamento"
            : "Concluída";

        const prioridade = obterNomePrioridade(
            tarefa.prioridade
        );

        elemento.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${prioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${status}
            </p>

            <div class="acoes">

                ${
                    tarefa.status
                    ? `
                        <button
                            class="btn-concluir"
                            onclick="finalizarTarefa(${tarefa.codigo})"
                        >
                            Concluir
                        </button>
                    `
                    : `
                        <button
                            class="btn-concluida"
                            disabled
                        >
                            Concluída
                        </button>
                    `
                }

                <button
                    class="btn-prioridade"
                    onclick="mudarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;

        listaTarefas.appendChild(elemento);
    });
}


// =====================================================
// NOME DA PRIORIDADE
// =====================================================

function obterNomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}


// =====================================================
// CONCLUIR TAREFA PELA INTERFACE
// =====================================================

function finalizarTarefa(codigo) {

    try {

        concluirTarefa(codigo);

        mostrarMensagem(
            "Tarefa concluída com sucesso!",
            "sucesso"
        );

        atualizarLista();

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
}


// =====================================================
// ALTERAR PRIORIDADE PELA INTERFACE
// =====================================================

function mudarPrioridade(codigo) {

    const novaPrioridade = prompt(
        "Digite a nova prioridade (1, 2 ou 3):"
    );

    if (novaPrioridade === null) {
        return;
    }

    try {

        alterarPrioridade(
            codigo,
            Number(novaPrioridade)
        );

        mostrarMensagem(
            "Prioridade alterada com sucesso!",
            "sucesso"
        );

        atualizarLista();

    } catch (erro) {

        mostrarMensagem(
            erro.message,
            "erro"
        );
    }
}


// =====================================================
// INICIAR LISTA
// =====================================================

atualizarLista();
