// Array que armazenará as tarefas

let tarefas = [];


// Pegando os elementos do HTML

const formTarefa = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");

const prioridadeInput = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");


// Evento para cadastrar uma nova tarefa

formTarefa.addEventListener("submit", function(event) {

    // Impede o recarregamento da página

    event.preventDefault();


    // Pegando os valores

    const titulo = tituloInput.value.trim();

    const prioridade = Number(prioridadeInput.value);


    // VALIDAÇÃO DO TÍTULO

    if (titulo.length < 5) {

        alert(
            "O título deve ter no mínimo 5 caracteres!"
        );

        tituloInput.focus();

        return;
    }


    // VALIDAÇÃO DA PRIORIDADE

    if (prioridade < 1 || prioridade > 3) {

        alert(
            "A prioridade deve ser um valor entre 1 e 3!"
        );

        return;
    }


    // Criando a tarefa

    const novaTarefa = {

        id: Date.now(),

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adicionando ao array

    tarefas.push(novaTarefa);


    // Limpando o formulário

    tituloInput.value = "";

    prioridadeInput.value = "1";


    // Atualizando a lista

    mostrarTarefas();

});


// Função para mostrar as tarefas

function mostrarTarefas() {

    // Limpa a lista

    listaTarefas.innerHTML = "";


    // Verifica se existem tarefas

    if (tarefas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    // Percorre todas as tarefas

    tarefas.forEach(function(tarefa) {

        // Texto da prioridade

        let textoPrioridade;


        if (tarefa.prioridade === 1) {

            textoPrioridade = "Alta";

        } else if (tarefa.prioridade === 2) {

            textoPrioridade = "Média";

        } else {

            textoPrioridade = "Baixa";

        }


        // Status

        let status;

        if (tarefa.concluida) {

            status = "Concluída";

        } else {

            status = "Pendente";

        }


        // Criando o elemento da tarefa

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");


        // Se estiver concluída

        if (tarefa.concluida) {

            elemento.classList.add("concluida");

        }


        // Conteúdo da tarefa

        elemento.innerHTML = `

            <div class="titulo">
                ${tarefa.titulo}
            </div>

            <div class="info">
                Prioridade: <strong>
                    ${tarefa.prioridade} - ${textoPrioridade}
                </strong>
            </div>

            <div class="info">
                Status: <strong>
                    ${status}
                </strong>
            </div>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.id})"
                >
                    ${tarefa.concluida
                        ? "Desmarcar conclusão"
                        : "Marcar como concluída"}
                </button>


                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.id})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;


        // Adiciona na página

        listaTarefas.appendChild(elemento);

    });

}


// Função para marcar tarefa como concluída

function marcarConcluida(id) {

    // Procura a tarefa

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    });


    // Altera o status

    if (tarefa) {

        tarefa.concluida = !tarefa.concluida;

    }


    // Atualiza a tela

    mostrarTarefas();
}


// Função para alterar prioridade

function alterarPrioridade(id) {

    const tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    });


    if (tarefa) {

        // Se estiver em 1, vai para 2
        // Se estiver em 2, vai para 3
        // Se estiver em 3, volta para 1

        if (tarefa.prioridade === 1) {

            tarefa.prioridade = 2;

        } else if (tarefa.prioridade === 2) {

            tarefa.prioridade = 3;

        } else {

            tarefa.prioridade = 1;

        }

    }


    // Atualiza a tela

    mostrarTarefas();
}
