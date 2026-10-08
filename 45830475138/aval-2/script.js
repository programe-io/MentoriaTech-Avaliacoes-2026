// Lista onde as tarefas serão armazenadas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// CADASTRAR UMA NOVA TAREFA
document
    .getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo =
            document.getElementById("titulo").value.trim();

        const prioridade =
            Number(document.getElementById("prioridade").value);


        // VALIDAÇÃO DO TÍTULO
        if (titulo.length < 5) {

            mostrarMensagem(
                "O título deve ter no mínimo 5 caracteres.",
                "red"
            );

            return;
        }


        // VALIDAÇÃO DA PRIORIDADE
        if (prioridade < 1 || prioridade > 3) {

            mostrarMensagem(
                "A prioridade deve ser entre 1 e 3.",
                "red"
            );

            return;
        }


        // CRIAR A TAREFA
        const tarefa = {

            codigo: proximoCodigo,

            titulo: titulo,

            prioridade: prioridade,

            concluida: false
        };


        // Aumentar o código para a próxima tarefa
        proximoCodigo++;


        // Adicionar tarefa à lista
        tarefas.push(tarefa);


        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "green"
        );


        // Limpar formulário
        document.getElementById("formTarefa").reset();


        // Atualizar lista
        listarTarefas();

});


// LISTAR AS TAREFAS
function listarTarefas() {

    const lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";


    // Caso não existam tarefas
    if (tarefas.length === 0) {

        lista.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;
    }


    // Percorrer todas as tarefas
    tarefas.forEach(function(tarefa) {

        const div =
            document.createElement("div");

        div.classList.add("tarefa");


        // Se estiver concluída
        if (tarefa.concluida) {

            div.classList.add("concluida");
        }


        div.innerHTML = `

            <div class="info">

                <strong>
                    Código: ${tarefa.codigo}
                </strong>

                <p>
                    Título: ${tarefa.titulo}
                </p>

                <p>
                    Prioridade:
                    ${nomePrioridade(tarefa.prioridade)}
                </p>

                <p>
                    Status:
                    ${tarefa.concluida
                        ? "Concluída"
                        : "Pendente"}
                </p>

            </div>


            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.codigo})">

                    ${tarefa.concluida
                        ? "Desmarcar"
                        : "Concluir"}

                </button>


                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">

                    Alterar prioridade

                </button>

            </div>
        `;


        lista.appendChild(div);

    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function marcarConcluida(codigo) {

    const tarefa =
        tarefas.find(function(tarefa) {

            return tarefa.codigo === codigo;

        });


    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );

        return;
    }


    // Alterar o status
    tarefa.concluida =
        !tarefa.concluida;


    // Atualizar a tela
    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa =
        tarefas.find(function(tarefa) {

            return tarefa.codigo === codigo;

        });


    if (!tarefa) {

        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );

        return;
    }


    const novaPrioridade =
        Number(
            prompt(
                "Digite a nova prioridade:\n\n" +
                "1 - Alta\n" +
                "2 - Média\n" +
                "3 - Baixa"
            )
        );


    // Validar prioridade
    if (
        novaPrioridade !== 1 &&
        novaPrioridade !== 2 &&
        novaPrioridade !== 3
    ) {

        mostrarMensagem(
            "Prioridade inválida! Use 1, 2 ou 3.",
            "red"
        );

        return;
    }


    // Alterar prioridade
    tarefa.prioridade =
        novaPrioridade;


    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "green"
    );


    // Atualizar a lista
    listarTarefas();
}


// CONVERTER PRIORIDADE EM TEXTO
function nomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    if (prioridade === 3) {
        return "3 - Baixa";
    }

    return "Inválida";
}


// MOSTRAR MENSAGEM
function mostrarMensagem(texto, cor) {

    const mensagem =
        document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.style.color = cor;


    setTimeout(function() {

        mensagem.textContent = "";

    }, 3000);
}


// EXIBIR AS TAREFAS AO INICIAR
listarTarefas();