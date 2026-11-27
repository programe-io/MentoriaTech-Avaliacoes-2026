
// ======================================
// GERENCIADOR DE TAREFAS
// ======================================

// Array de tarefas
let tarefas = [];

// Gerador automático de códigos
let proximoCodigo = 0;


// Elementos HTML
const formulario = document.getElementById("formTarefa");

const campoTitulo = document.getElementById("titulo");

const campoPrioridade = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");


// ======================================
// 1. VALIDAR DADOS DA TAREFA
// ======================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (
        typeof titulo !== "string" ||
        titulo.trim().length < 5
    ) {
        throw new Error(
            "O título deve possuir pelo menos 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

}


// ======================================
// 2. CADASTRAR TAREFA
// ======================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {

        codigo: ++proximoCodigo,

        titulo: titulo.trim(),

        prioridade: prioridade,

        status: true

    };

    tarefas.push(novaTarefa);

    listarTarefas();

    return novaTarefa;

}


// ======================================
// 3. LISTAR TAREFAS
// ======================================

function listarTarefas() {

    return tarefas;

}


// ======================================
// 4. BUSCAR TAREFA
// ======================================

function buscarTarefa(codigoTarefa) {

    const tarefa = tarefas.find(
        (item) => item.codigo === codigoTarefa
    );

    if (!tarefa) {

        throw new Error("Tarefa não encontrada.");

    }

    return tarefa;

}


// ======================================
// 5. CONCLUIR TAREFA
// ======================================

function concluirTarefa(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    if (!tarefa.status) {

        throw new Error(
            "Esta tarefa já foi concluída."
        );

    }

    tarefa.status = false;

    listarTarefas();

}


// ======================================
// 6. ALTERAR PRIORIDADE
// ======================================

function alterarPrioridade(codigoTarefa, novaPrioridade) {

    const tarefa = buscarTarefa(codigoTarefa);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

}


// ======================================
// 7. EXCLUIR TAREFA
// ======================================

function excluirTarefa(codigoTarefa) {

    buscarTarefa(codigoTarefa);

    tarefas = tarefas.filter(
        (item) => item.codigo !== codigoTarefa
    );

    listarTarefas();

}


// ======================================
// 8. ATUALIZAR RESUMO
// ======================================

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        (tarefa) => tarefa.status === false
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

}


// ======================================
// 9. EXIBIR TAREFAS NA TABELA
// ======================================

function exibirTarefas() {

    listaTarefas.innerHTML = "";

    const tarefasCadastradas = listarTarefas();

    if (tarefasCadastradas.length === 0) {

        const linha = document.createElement("tr");

        const coluna = document.createElement("td");

        coluna.colSpan = 5;

        coluna.textContent = "Nenhuma tarefa cadastrada.";

        linha.appendChild(coluna);

        listaTarefas.appendChild(linha);

        atualizarResumo();

        return;

    }

    tarefasCadastradas.forEach((tarefa) => {

        const linha = document.createElement("tr");

        // Código
        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        // Título
        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        // Prioridade
        const prioridade = document.createElement("td");

        if (tarefa.prioridade === 1) {

            prioridade.textContent = "Alta";
            prioridade.className = "prioridade-alta";

        } else if (tarefa.prioridade === 2) {

            prioridade.textContent = "Média";
            prioridade.className = "prioridade-media";

        } else {

            prioridade.textContent = "Baixa";
            prioridade.className = "prioridade-baixa";

        }

        // Status
        const status = document.createElement("td");

        if (tarefa.status) {

            status.textContent = "Pendente";
            status.className = "status-pendente";

        } else {

            status.textContent = "Concluída";
            status.className = "status-concluida";

        }

        // Ações
        const acoes = document.createElement("td");

        // Botão concluir
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = "Concluir";
        botaoConcluir.className = "btn-concluir";

        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener("click", () => {

            try {

                concluirTarefa(tarefa.codigo);

                exibirTarefas();

            } catch (erro) {

                alert(erro.message);

            }

        });

        // Botão alterar prioridade
        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.textContent = "Prioridade";
        botaoPrioridade.className = "btn-prioridade";

        botaoPrioridade.addEventListener("click", () => {

            alterarPrioridadeNaTela(tarefa.codigo);

        });

        // Botão excluir
        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", () => {

            excluirTarefaNaTela(tarefa.codigo);

        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoPrioridade);
        acoes.appendChild(botaoExcluir);

        // Montagem da linha
        linha.appendChild(codigo);
        linha.appendChild(titulo);
        linha.appendChild(prioridade);
        linha.appendChild(status);
        linha.appendChild(acoes);

        listaTarefas.appendChild(linha);

    });

    atualizarResumo();

}


// ======================================
// 10. ALTERAR PRIORIDADE PELA TELA
// ======================================

function alterarPrioridadeNaTela(codigoTarefa) {

    try {

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        );

        if (novaPrioridade === null) return;

        const prioridade = Number(novaPrioridade);

        alterarPrioridade(codigoTarefa, prioridade);

        exibirTarefas();

        alert("Prioridade alterada com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}


// ======================================
// 11. EXCLUIR PELA TELA
// ======================================

function excluirTarefaNaTela(codigoTarefa) {

    try {

        const tarefa = buscarTarefa(codigoTarefa);

        const confirmar = confirm(
            `Deseja excluir a tarefa "${tarefa.titulo}"?`
        );

        if (!confirmar) return;

        excluirTarefa(codigoTarefa);

        exibirTarefas();

        alert("Tarefa excluída com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}


// ======================================
// 12. EVENTO DO FORMULÁRIO
// ======================================

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    try {

        const titulo = campoTitulo.value;

        const prioridade = Number(campoPrioridade.value);

        cadastrarTarefa(titulo, prioridade);

        exibirTarefas();

        formulario.reset();

        alert("Tarefa cadastrada com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

});


// ======================================
// 13. INICIALIZAÇÃO
// ======================================

exibirTarefas();
