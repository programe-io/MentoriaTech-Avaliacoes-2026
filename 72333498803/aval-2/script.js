
// Lista que armazenará as tarefas
let tarefas = [];

let proximoCodigo = 1;

let codigoTarefaSelecionada = null;


// ELEMENTOS DO HTML

const formulario = document.getElementById("formTarefa");

const titulo = document.getElementById("titulo");

const prioridade = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const mensagem = document.getElementById("mensagem");


// ELEMENTOS DO MODAL

const modalPrioridade =
    document.getElementById("modalPrioridade");

const novaPrioridade =
    document.getElementById("novaPrioridade");

const fecharModal =
    document.getElementById("fecharModal");

const cancelarModal =
    document.getElementById("cancelarModal");

const salvarPrioridade =
    document.getElementById("salvarPrioridade");


// CADASTRAR TAREFA

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const tituloTexto = titulo.value.trim();

    const prioridadeValor = Number(prioridade.value);


    // Verifica o título

    if (tituloTexto.length < 5) {

        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        mensagem.className = "erro";

        return;
    }


    // Verifica a prioridade

    if (
        prioridade.value === "" ||
        prioridadeValor < 1 ||
        prioridadeValor > 3
    ) {

        mensagem.textContent =
            "Escolha uma prioridade entre 1 e 3.";

        mensagem.className = "erro";

        return;
    }


    // Cria a tarefa

    const tarefa = {

        codigo: proximoCodigo,

        titulo: tituloTexto,

        prioridade: prioridadeValor,

        concluida: false
    };


    tarefas.push(tarefa);

    proximoCodigo++;


    // Limpa os campos

    titulo.value = "";

    prioridade.value = "";


    mensagem.textContent =
        "Tarefa cadastrada com sucesso!";

    mensagem.className = "sucesso";


    mostrarTarefas();

});


// MOSTRAR TAREFAS

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    if (tarefas.length === 0) {

        listaTarefas.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;
    }


    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";


        if (tarefa.concluida) {

            div.classList.add("concluida");

        }


        let nomePrioridade;


        if (tarefa.prioridade === 1) {

            nomePrioridade = "Alta";

        } else if (tarefa.prioridade === 2) {

            nomePrioridade = "Média";

        } else {

            nomePrioridade = "Baixa";

        }


        let status;


        if (tarefa.concluida) {

            status = "Concluída";

        } else {

            status = "Pendente";

        }


        div.innerHTML = `

            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${status}
            </p>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})">

                            Concluir

                        </button>
                    `
                    : ""
                }


                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">

                    Alterar prioridade

                </button>

            </div>

        `;


        listaTarefas.appendChild(div);

    });

}


// CONCLUIR TAREFA

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (tarefa) {

        tarefa.concluida = true;


        mensagem.textContent =
            "Tarefa concluída com sucesso!";

        mensagem.className = "sucesso";


        mostrarTarefas();

    }

}


// ABRIR MODAL

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;

    });


    if (!tarefa) {

        return;

    }


    // Guarda qual tarefa será alterada

    codigoTarefaSelecionada = codigo;


    // Mostra a prioridade atual no select

    novaPrioridade.value = tarefa.prioridade;


    // Abre o modal

    modalPrioridade.classList.add("ativo");

}


// SALVAR NOVA PRIORIDADE

salvarPrioridade.addEventListener("click", function() {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigoTarefaSelecionada;

    });


    if (!tarefa) {

        return;

    }


    const valor = Number(novaPrioridade.value);


    tarefa.prioridade = valor;


    mensagem.textContent =
        "Prioridade alterada com sucesso!";

    mensagem.className = "sucesso";


    mostrarTarefas();


    fecharModalFuncao();

});


// FECHAR MODAL

function fecharModalFuncao() {

    modalPrioridade.classList.remove("ativo");

    codigoTarefaSelecionada = null;

}


// BOTÃO X

fecharModal.addEventListener("click", function() {

    fecharModalFuncao();

});


// BOTÃO CANCELAR

cancelarModal.addEventListener("click", function() {

    fecharModalFuncao();

});


// FECHAR CLICANDO FORA DO MODAL

modalPrioridade.addEventListener("click", function(event) {

    if (event.target === modalPrioridade) {

        fecharModalFuncao();

    }

});

