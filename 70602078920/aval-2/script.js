// ==========================================
// SISTEMA DE GERENCIAMENTO DE TAREFAS
// ==========================================

// Array que armazenará as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// ==========================================
// CADASTRAR UMA NOVA TAREFA
// ==========================================

function cadastrarTarefa() {

    // Pega os valores do HTML
    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );


    // ======================================
    // VALIDAÇÃO DO TÍTULO
    // ======================================

    if (titulo.length < 5) {

        mostrarMensagem(
            "Erro: o título deve ter no mínimo 5 caracteres."
        );

        return;
    }


    // ======================================
    // VALIDAÇÃO DA PRIORIDADE
    // ======================================

    if (prioridade < 1 || prioridade > 3) {

        mostrarMensagem(
            "Erro: a prioridade deve estar entre 1 e 3."
        );

        return;
    }


    // ======================================
    // CRIAÇÃO DA TAREFA
    // ======================================

    const tarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adiciona a tarefa ao array
    tarefas.push(tarefa);

    // Incrementa o código
    proximoCodigo++;


    // Limpa o campo de título
    document.getElementById("titulo").value = "";


    mostrarMensagem(
        "Tarefa cadastrada com sucesso!"
    );


    // Atualiza a lista
    listarTarefas();
}


// ==========================================
// LISTAR AS TAREFAS
// ==========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    // Limpa a lista antes de atualizar
    lista.innerHTML = "";


    // Verifica se existem tarefas
    if (tarefas.length === 0) {

        lista.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;
    }


    // Percorre todas as tarefas
    tarefas.forEach(function(tarefa) {

        let prioridadeTexto;


        // Define o texto da prioridade
        if (tarefa.prioridade === 1) {

            prioridadeTexto = "Alta";

        } else if (tarefa.prioridade === 2) {

            prioridadeTexto = "Média";

        } else {

            prioridadeTexto = "Baixa";
        }


        // Define o status
        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";


        // Cria o elemento HTML
        const div = document.createElement("div");

        div.className = "tarefa";


        // Se estiver concluída, adiciona a classe
        if (tarefa.concluida) {

            div.classList.add("concluida");
        }


        // Conteúdo da tarefa
        div.innerHTML = `

            <strong>Código:</strong>
            ${tarefa.codigo}

            <br>

            <strong>Título:</strong>
            ${tarefa.titulo}

            <br>

            <strong>Prioridade:</strong>
            ${tarefa.prioridade} - ${prioridadeTexto}

            <br>

            <strong>Status:</strong>
            ${status}

            <div class="botoes">

                <button
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar Prioridade
                </button>

            </div>
        `;


        // Adiciona a tarefa na página
        lista.appendChild(div);

    });
}


// ==========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ==========================================

function concluirTarefa(codigo) {

    // Procura a tarefa pelo código
    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    // Caso a tarefa não exista
    if (!tarefa) {

        mostrarMensagem(
            "Erro: tarefa não encontrada."
        );

        return;
    }


    // Marca como concluída
    tarefa.concluida = true;


    mostrarMensagem(
        "Tarefa marcada como concluída!"
    );


    // Atualiza a lista
    listarTarefas();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo) {

    // Procura a tarefa
    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (!tarefa) {

        mostrarMensagem(
            "Erro: tarefa não encontrada."
        );

        return;
    }


    // Solicita a nova prioridade
    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );


    // Validação
    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        mostrarMensagem(
            "Erro: prioridade inválida. Digite 1, 2 ou 3."
        );

        return;
    }


    // Altera a prioridade
    tarefa.prioridade = novaPrioridade;


    mostrarMensagem(
        "Prioridade alterada com sucesso!"
    );


    // Atualiza a lista
    listarTarefas();
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;


    // Remove a mensagem depois de 3 segundos
    setTimeout(function() {

        mensagem.textContent = "";

    }, 3000);
}


// ==========================================
// INICIAR O SISTEMA
// ==========================================

// Mostra a lista quando a página é aberta
listarTarefas();