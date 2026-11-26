
// ======================================
// 1. ARRAY E GERADOR DE CÓDIGOS
// ======================================

const tarefas = [];

let proximoCodigo = 0;


// ======================================
// 2. FUNÇÃO DE VALIDAÇÃO
// ======================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título precisa ter no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
        throw new Error(
            "A prioridade deve ser 1, 2 ou 3."
        );
    }
}


// ======================================
// 3. FUNÇÃO DE CADASTRO
// ======================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}


// ======================================
// 4. FUNÇÃO DE LISTAGEM
// ======================================

function listarTarefas() {

    return tarefas;
}


// ======================================
// 5. FUNÇÃO DE BUSCA
// ======================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Tarefa não encontrada. Verifique o código informado."
        );
    }

    return tarefa;
}


// ======================================
// 6. FUNÇÃO PARA CONCLUIR TAREFA
// ======================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            "Esta tarefa já foi concluída."
        );
    }

    tarefa.status = false;

    return tarefa;
}


// ======================================
// 7. FUNÇÃO PARA ALTERAR PRIORIDADE
// ======================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}


// ======================================
// 8. ELEMENTOS DO HTML
// ======================================

const formTarefa = document.getElementById("formTarefa");

const campoTitulo = document.getElementById("titulo");

const campoPrioridade = document.getElementById("prioridade");

const campoCodigo = document.getElementById("codigo");

const campoNovaPrioridade = document.getElementById("novaPrioridade");

const listaTarefas = document.getElementById("listaTarefas");

const contador = document.getElementById("contador");

const mensagem = document.getElementById("mensagem");

const btnConcluir = document.getElementById("btnConcluir");

const btnAlterar = document.getElementById("btnAlterar");


// ======================================
// 9. FUNÇÃO PARA MOSTRAR MENSAGENS
// ======================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;
}


// ======================================
// 10. FUNÇÃO PARA MOSTRAR AS TAREFAS
// ======================================

function exibirTarefas() {

    listaTarefas.innerHTML = "";

    const tarefasCadastradas = listarTarefas();

    contador.textContent =
        tarefasCadastradas.length +
        (tarefasCadastradas.length === 1
            ? " tarefa"
            : " tarefas");

    if (tarefasCadastradas.length === 0) {

        const vazio = document.createElement("p");

        vazio.className = "vazio";

        vazio.textContent = "Nenhuma tarefa cadastrada.";

        listaTarefas.appendChild(vazio);

        return;
    }

    tarefasCadastradas.forEach(tarefa => {

        const card = document.createElement("div");

        card.className = "tarefa";

        if (tarefa.prioridade === 1) {
            card.classList.add("prioridade-alta");
        } else if (tarefa.prioridade === 2) {
            card.classList.add("prioridade-media");
        } else {
            card.classList.add("prioridade-baixa");
        }

        if (!tarefa.status) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");

        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");

        status.className = "status";

        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        card.appendChild(titulo);
        card.appendChild(codigo);
        card.appendChild(prioridade);
        card.appendChild(status);

        listaTarefas.appendChild(card);

    });
}


// ======================================
// 11. EVENTO DE CADASTRO
// ======================================

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const titulo = campoTitulo.value;

        const prioridade = Number(campoPrioridade.value);

        const tarefa = cadastrarTarefa(titulo, prioridade);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso! Código: " + tarefa.codigo,
            "sucesso"
        );

        formTarefa.reset();

        exibirTarefas();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

});


// ======================================
// 12. EVENTO DE CONCLUSÃO
// ======================================

btnConcluir.addEventListener("click", function() {

    try {

        if (campoCodigo.value.trim() === "") {
            throw new Error("Informe o código da tarefa.");
        }

        const codigo = Number(campoCodigo.value);

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        concluirTarefa(codigo);

        mostrarMensagem(
            "Tarefa concluída com sucesso!",
            "sucesso"
        );

        campoCodigo.value = "";

        exibirTarefas();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

});


// ======================================
// 13. EVENTO DE ALTERAÇÃO DE PRIORIDADE
// ======================================

btnAlterar.addEventListener("click", function() {

    try {

        if (campoCodigo.value.trim() === "") {
            throw new Error("Informe o código da tarefa.");
        }

        const codigo = Number(campoCodigo.value);

        const novaPrioridade = Number(
            campoNovaPrioridade.value
        );

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código válido.");
        }

        if (campoNovaPrioridade.value === "") {
            throw new Error("Selecione uma nova prioridade.");
        }

        alterarPrioridade(codigo, novaPrioridade);

        mostrarMensagem(
            "Prioridade alterada com sucesso!",
            "sucesso"
        );

        campoCodigo.value = "";

        campoNovaPrioridade.value = "";

        exibirTarefas();

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

});


// ======================================
// 14. EXIBIÇÃO INICIAL
// ======================================

exibirTarefas();
