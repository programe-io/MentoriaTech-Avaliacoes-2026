// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================


// Array onde as tarefas serão armazenadas
let tarefas = [];


// Código da próxima tarefa
let proximoCodigo = 1;


// ==========================================
// CADASTRAR NOVA TAREFA
// ==========================================

function cadastrarTarefa() {

    // Receber o título
    let titulo = document
        .getElementById("titulo")
        .value
        .trim();


    // Receber a prioridade
    let prioridade = parseInt(
        document.getElementById("prioridade").value
    );


    // ==========================================
    // VALIDAR TÍTULO
    // ==========================================

    if (titulo.length < 5) {

        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        return;
    }


    // ==========================================
    // VALIDAR PRIORIDADE
    // ==========================================

    if (
        isNaN(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "erro"
        );

        return;
    }


    // ==========================================
    // CRIAR TAREFA
    // ==========================================

    let tarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adicionar ao array
    tarefas.push(tarefa);


    // Incrementar código
    proximoCodigo++;


    // Limpar campos
    document.getElementById(
        "titulo"
    ).value = "";

    document.getElementById(
        "prioridade"
    ).value = "";


    // Atualizar lista
    listarTarefas();


    // Mostrar mensagem
    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );
}



// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    let lista = document.getElementById(
        "listaTarefas"
    );


    let total = document.getElementById(
        "totalTarefas"
    );


    // Limpar lista
    lista.innerHTML = "";


    // Atualizar contador
    total.textContent =
        tarefas.length +
        (
            tarefas.length === 1
                ? " tarefa"
                : " tarefas"
        );


    // ==========================================
    // VERIFICAR SE EXISTEM TAREFAS
    // ==========================================

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <div class="mensagem-vazia">
                Nenhuma tarefa cadastrada.
            </div>
        `;

        return;
    }


    // ==========================================
    // CRIAR CADA TAREFA
    // ==========================================

    tarefas.forEach(function(tarefa) {

        let elemento =
            document.createElement("div");


        elemento.classList.add("tarefa");


        // Adicionar classe se estiver concluída
        if (tarefa.concluida) {

            elemento.classList.add(
                "tarefa-concluida"
            );

        }


        // Definir nome da prioridade
        let nomePrioridade =
            obterNomePrioridade(
                tarefa.prioridade
            );


        // Definir classe da prioridade
        let classePrioridade =
            obterClassePrioridade(
                tarefa.prioridade
            );


        // Definir status
        let status =
            tarefa.concluida
                ? "Concluída"
                : "Pendente";


        let classeStatus =
            tarefa.concluida
                ? "status-concluida"
                : "status-pendente";


        // Criar conteúdo
        elemento.innerHTML = `

            <div class="codigo-tarefa">
                #${tarefa.codigo}
            </div>


            <div class="titulo-tarefa">
                ${tarefa.titulo}
            </div>


            <div
                class="prioridade ${classePrioridade}"
            >
                ${tarefa.prioridade}
                - ${nomePrioridade}
            </div>


            <div
                class="status ${classeStatus}"
            >
                ${status}
            </div>


            <div>

                ${
                    tarefa.concluida

                    ? ""

                    : `
                        <button
                            class="btn-concluir"
                            onclick="marcarComoConcluida(${tarefa.codigo})"
                        >
                            ✓ Concluir
                        </button>
                    `
                }

            </div>

        `;


        lista.appendChild(elemento);

    });
}



// ==========================================
// OBTER NOME DA PRIORIDADE
// ==========================================

function obterNomePrioridade(prioridade) {

    if (prioridade === 1) {

        return "Alta";

    }

    if (prioridade === 2) {

        return "Média";

    }

    return "Baixa";
}



// ==========================================
// OBTER CLASSE DA PRIORIDADE
// ==========================================

function obterClassePrioridade(prioridade) {

    if (prioridade === 1) {

        return "prioridade-alta";

    }

    if (prioridade === 2) {

        return "prioridade-media";

    }

    return "prioridade-baixa";
}



// ==========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ==========================================

function marcarComoConcluida(codigo) {

    // Procurar a tarefa
    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    // Verificar se encontrou
    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }


    // Alterar status
    tarefa.concluida = true;


    // Atualizar lista
    listarTarefas();


    // Mostrar mensagem
    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "sucesso"
    );
}



// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade() {

    // Receber código
    let codigo = parseInt(
        document.getElementById(
            "codigoAlteracao"
        ).value
    );


    // Receber nova prioridade
    let novaPrioridade = parseInt(
        document.getElementById(
            "novaPrioridade"
        ).value
    );


    // ==========================================
    // VALIDAR CÓDIGO
    // ==========================================

    if (isNaN(codigo) || codigo <= 0) {

        mostrarMensagem(
            "Digite um código válido.",
            "erro"
        );

        return;
    }


    // ==========================================
    // VALIDAR PRIORIDADE
    // ==========================================

    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        mostrarMensagem(
            "A prioridade deve ser entre 1 e 3.",
            "erro"
        );

        return;
    }


    // ==========================================
    // PROCURAR TAREFA
    // ==========================================

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    // Verificar se existe
    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }


    // ==========================================
    // ALTERAR PRIORIDADE
    // ==========================================

    tarefa.prioridade = novaPrioridade;


    // Atualizar lista
    listarTarefas();


    // Limpar campos
    document.getElementById(
        "codigoAlteracao"
    ).value = "";

    document.getElementById(
        "novaPrioridade"
    ).value = "";


    // Mostrar mensagem
    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );
}



// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    let mensagem =
        document.getElementById(
            "mensagem"
        );


    mensagem.textContent = texto;

    mensagem.style.display = "block";


    // Mensagem de sucesso
    if (tipo === "sucesso") {

        mensagem.style.backgroundColor =
            "#2e7d32";

    }

    // Mensagem de erro
    else {

        mensagem.style.backgroundColor =
            "#c62828";

    }


    // Esconder depois de 3 segundos
    setTimeout(function() {

        mensagem.style.display = "none";

    }, 3000);
}



// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();