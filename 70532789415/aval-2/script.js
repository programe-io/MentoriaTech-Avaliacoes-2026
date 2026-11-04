
// ==========================================
// 1. ARRAY PARA ARMAZENAR AS TAREFAS
// ==========================================

let tarefas = [];

let contadorCodigo = 0;


// ==========================================
// 2. MAPEAMENTO DOS ELEMENTOS HTML
// ==========================================

const formTarefa = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");

const prioridadeInput = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const mensagem = document.getElementById("mensagem");


// ==========================================
// 3. GERAÇÃO AUTOMÁTICA DE CÓDIGOS
// ==========================================

function gerarCodigo() {

    contadorCodigo++;

    return contadorCodigo;

}


// ==========================================
// 4. VALIDAÇÃO DOS DADOS DA TAREFA
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== "string" || titulo.trim().length < 5) {

        throw new Error(
            "O título deve possuir no mínimo cinco caracteres."
        );

    }

    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {

        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );

    }

}


// ==========================================
// 5. CADASTRAR UMA NOVA TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {

        codigo: gerarCodigo(),

        titulo: titulo.trim(),

        prioridade: prioridade,

        status: true

    };

    tarefas.push(novaTarefa);

    listarTarefas();

    return novaTarefa;

}


// ==========================================
// 6. LISTAR AS TAREFAS
// ==========================================

function listarTarefas() {

    renderizarTarefas(tarefas);

}


// ==========================================
// 7. RENDERIZAR AS TAREFAS NA TABELA
// ==========================================

function renderizarTarefas(lista) {

    listaTarefas.innerHTML = "";

    lista.forEach(function(tarefa) {

        const linha = document.createElement("tr");

        // Código
        const codigo = document.createElement("td");

        codigo.textContent = tarefa.codigo;

        // Título
        const titulo = document.createElement("td");

        titulo.textContent = tarefa.titulo;

        if (!tarefa.status) {

            titulo.classList.add("status-concluida");

        }

        // Prioridade
        const prioridade = document.createElement("td");

        prioridade.textContent =
            tarefa.prioridade + " - " +
            obterNomePrioridade(tarefa.prioridade);

        if (tarefa.prioridade === 1) {

            prioridade.classList.add("prioridade-alta");

        } else if (tarefa.prioridade === 2) {

            prioridade.classList.add("prioridade-media");

        } else {

            prioridade.classList.add("prioridade-baixa");

        }

        // Status
        const status = document.createElement("td");

        if (tarefa.status) {

            status.textContent = "Em andamento";

            status.classList.add("status-pendente");

        } else {

            status.textContent = "Concluída";

            status.classList.add("status-concluida");

        }

        // Ações
        const acoes = document.createElement("td");

        // Botão concluir
        const botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = "Concluir";

        botaoConcluir.classList.add("concluir");

        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener("click", function() {

            try {

                concluirTarefa(tarefa.codigo);

                mostrarMensagem("Tarefa concluída com sucesso!", "green");

            } catch (erro) {

                mostrarMensagem(erro.message, "red");

            }

        });

        // Botão alterar prioridade
        const botaoAlterar = document.createElement("button");

        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.classList.add("alterar");

        botaoAlterar.addEventListener("click", function() {

            alterarPrioridadePelaTela(tarefa.codigo);

        });

        acoes.appendChild(botaoConcluir);

        acoes.appendChild(botaoAlterar);

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


// ==========================================
// 8. NOME DA PRIORIDADE
// ==========================================

function obterNomePrioridade(prioridade) {

    if (prioridade === 1) {

        return "Alta";

    } else if (prioridade === 2) {

        return "Média";

    } else {

        return "Baixa";

    }

}


// ==========================================
// 9. BUSCAR TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(function(item) {

        return item.codigo === codigo;

    });

    if (!tarefa) {

        throw new Error("Tarefa não encontrada!");

    }

    return tarefa;

}


// ==========================================
// 10. CONCLUIR UMA TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {

        throw new Error("Esta tarefa já está concluída!");

    }

    tarefa.status = false;

    listarTarefas();

}


// ==========================================
// 11. ALTERAR A PRIORIDADE
// ==========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    // Reutiliza a função de validação
    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

}


// ==========================================
// 12. ALTERAR PRIORIDADE PELA INTERFACE
// ==========================================

function alterarPrioridadePelaTela(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (novaPrioridade === null || novaPrioridade.trim() === "") {

            return;

        }

        const prioridade = Number(novaPrioridade);

        alterarPrioridade(codigo, prioridade);

        mostrarMensagem("Prioridade alterada com sucesso!", "green");

    } catch (erro) {

        mostrarMensagem(erro.message, "red");

    }

}


// ==========================================
// 13. BUSCAR TAREFA PELA INTERFACE
// ==========================================

document.getElementById("botaoBuscar").addEventListener("click", function() {

    const codigo = Number(
        document.getElementById("codigoBusca").value
    );

    try {

        if (!Number.isInteger(codigo) || codigo < 1) {

            throw new Error("Digite um código válido!");

        }

        const tarefa = buscarTarefa(codigo);

        renderizarTarefas([tarefa]);

        mostrarMensagem("Tarefa encontrada!", "green");

    } catch (erro) {

        mostrarMensagem(erro.message, "red");

    }

});


// ==========================================
// 14. MOSTRAR TODAS AS TAREFAS
// ==========================================

document.getElementById("botaoMostrarTodas")
    .addEventListener("click", function() {

        document.getElementById("codigoBusca").value = "";

        listarTarefas();

        mostrarMensagem("Exibindo todas as tarefas.", "green");

    });


// ==========================================
// 15. ATUALIZAR O RESUMO
// ==========================================

function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(function(tarefa) {

        return tarefa.status === true;

    }).length;

    const concluidas = tarefas.filter(function(tarefa) {

        return tarefa.status === false;

    }).length;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

}


// ==========================================
// 16. EXIBIR MENSAGENS
// ==========================================

function mostrarMensagem(texto, cor) {

    mensagem.textContent = texto;

    mensagem.style.color = cor;

}


// ==========================================
// 17. EVENTO DE CADASTRO DO FORMULÁRIO
// ==========================================

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const titulo = tituloInput.value;

        const prioridade = Number(prioridadeInput.value);

        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

        formTarefa.reset();

    } catch (erro) {

        mostrarMensagem(erro.message, "red");

    }

});


// ==========================================
// 18. INICIALIZAÇÃO DO SISTEMA
// ==========================================

listarTarefas();
