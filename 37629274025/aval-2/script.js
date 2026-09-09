/* =====================================
   GERENCIADOR DE TAREFAS
===================================== */


/* =====================================
   VARIÁVEIS
===================================== */

let tarefas = [];

let proximoId = 1;


/* =====================================
   ELEMENTOS DO HTML
===================================== */

const formTarefa = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");

const prioridadeInput = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const mensagem = document.getElementById("mensagem");

const contador = document.getElementById("contador");


/* =====================================
   CADASTRAR TAREFA
===================================== */

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();


    // Pega os valores dos campos

    const titulo = tituloInput.value.trim();

    const prioridade = Number(prioridadeInput.value);


    /* =================================
       VALIDAÇÃO DO TÍTULO
    ================================= */

    if (titulo.length < 5) {

        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        tituloInput.focus();

        return;
    }


    /* =================================
       VALIDAÇÃO DA PRIORIDADE
    ================================= */

    if (prioridade < 1 || prioridade > 3) {

        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        return;
    }


    /* =================================
       CRIA A TAREFA
    ================================= */

    const novaTarefa = {

        id: proximoId,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    /* =================================
       ADICIONA AO ARRAY
    ================================= */

    tarefas.push(novaTarefa);

    proximoId++;


    /* =================================
       LIMPA FORMULÁRIO
    ================================= */

    tituloInput.value = "";

    prioridadeInput.value = "2";


    /* =================================
       ATUALIZA A TELA
    ================================= */

    renderizarTarefas();


    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

});


/* =====================================
   MOSTRAR MENSAGEM
===================================== */

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;


    setTimeout(function() {

        mensagem.textContent = "";

        mensagem.className = "mensagem";

    }, 3000);

}


/* =====================================
   RENDERIZAR TAREFAS
===================================== */

function renderizarTarefas() {

    listaTarefas.innerHTML = "";


    /* =================================
       CASO NÃO TENHA TAREFAS
    ================================= */

    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <div class="vazio">
                <p>Nenhuma tarefa cadastrada.</p>
            </div>
        `;

        atualizarContador();

        return;
    }


    /* =================================
       CRIA CADA TAREFA
    ================================= */

    tarefas.forEach(function(tarefa) {

        const elementoTarefa = document.createElement("div");

        elementoTarefa.classList.add("tarefa");


        /* Adiciona classe se estiver concluída */

        if (tarefa.concluida) {

            elementoTarefa.classList.add("concluida");

        }


        /* =================================
           NOME DA PRIORIDADE
        ================================= */

        let nomePrioridade = "";

        let classePrioridade = "";


        if (tarefa.prioridade === 1) {

            nomePrioridade = "Alta";

            classePrioridade = "alta";

        } else if (tarefa.prioridade === 2) {

            nomePrioridade = "Média";

            classePrioridade = "media";

        } else {

            nomePrioridade = "Baixa";

            classePrioridade = "baixa";

        }


        /* =================================
           TEXTO DO BOTÃO DE CONCLUSÃO
        ================================= */

        let textoConclusao = "";

        if (tarefa.concluida) {

            textoConclusao = "↩ Reabrir";

        } else {

            textoConclusao = "✓ Concluir";

        }


        /* =================================
           HTML DA TAREFA
        ================================= */

        elementoTarefa.innerHTML = `

            <div class="tarefa-topo">

                <span class="titulo-tarefa">
                    ${tarefa.titulo}
                </span>

                <span class="prioridade ${classePrioridade}">
                    Prioridade ${tarefa.prioridade} - ${nomePrioridade}
                </span>

            </div>


            <p class="info-tarefa">

                Status:
                <strong>
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </strong>

            </p>


            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="alternarConclusao(${tarefa.id})"
                >
                    ${textoConclusao}
                </button>


                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.id})"
                >
                    Alterar prioridade
                </button>


                <button
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    Excluir
                </button>

            </div>

        `;


        listaTarefas.appendChild(elementoTarefa);

    });


    atualizarContador();

}


/* =====================================
   MARCAR COMO CONCLUÍDA
===================================== */

function alternarConclusao(id) {

    const tarefa = tarefas.find(function(item) {

        return item.id === id;

    });


    if (!tarefa) {

        return;

    }


    tarefa.concluida = !tarefa.concluida;


    renderizarTarefas();

}


/* =====================================
   ALTERAR PRIORIDADE
===================================== */

function alterarPrioridade(id) {

    const tarefa = tarefas.find(function(item) {

        return item.id === id;

    });


    if (!tarefa) {

        return;

    }


    /*
        Ciclo das prioridades:

        1 -> 2
        2 -> 3
        3 -> 1
    */

    if (tarefa.prioridade === 1) {

        tarefa.prioridade = 2;

    } else if (tarefa.prioridade === 2) {

        tarefa.prioridade = 3;

    } else {

        tarefa.prioridade = 1;

    }


    renderizarTarefas();

}


/* =====================================
   EXCLUIR TAREFA
===================================== */

function excluirTarefa(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );


    if (!confirmar) {

        return;

    }


    tarefas = tarefas.filter(function(tarefa) {

        return tarefa.id !== id;

    });


    renderizarTarefas();

}


/* =====================================
   ATUALIZAR CONTADOR
===================================== */

function atualizarContador() {

    const quantidade = tarefas.length;


    if (quantidade === 1) {

        contador.textContent = "1 tarefa";

    } else {

        contador.textContent = quantidade + " tarefas";

    }

}


/* =====================================
   INICIALIZAÇÃO
===================================== */

renderizarTarefas();
