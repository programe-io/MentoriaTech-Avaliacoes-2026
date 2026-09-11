// Array que irá armazenar todas as tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// FUNÇÃO PARA CADASTRAR UMA TAREFA
function cadastrarTarefa() {

    // Pegando os valores dos campos
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    let mensagem = document.getElementById("mensagem");


    // VALIDAÇÃO DO TÍTULO
    if (titulo.length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        mensagem.style.color = "red";

        return;
    }


    // VALIDAÇÃO DA PRIORIDADE
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent =
            "A prioridade deve estar entre 1 e 3.";

        mensagem.style.color = "red";

        return;
    }


    // Criando a tarefa
    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };


    // Adicionando a tarefa ao array
    tarefas.push(tarefa);

    // Aumentando o código
    proximoCodigo++;


    // Limpando os campos
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "1";


    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";


    // Atualizando a lista
    listarTarefas();
}


// FUNÇÃO PARA LISTAR AS TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";


    // Verifica se não existem tarefas
    if (tarefas.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';

        return;
    }


    // Percorre todas as tarefas
    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.classList.add("tarefa");


        // Se a tarefa estiver concluída
        if (tarefa.concluida) {
            div.classList.add("concluida");
        }


        let textoPrioridade = "";

        if (tarefa.prioridade === 1) {
            textoPrioridade = "Alta";
        } else if (tarefa.prioridade === 2) {
            textoPrioridade = "Média";
        } else {
            textoPrioridade = "Baixa";
        }


        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";


        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong>
                ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${textoPrioridade}
            </p>

            <p>
                <strong>Status:</strong>
                ${status}
            </p>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="marcarConcluida(${tarefa.codigo})">
                    ${tarefa.concluida
                        ? "Marcar como pendente"
                        : "Marcar como concluída"}
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


// FUNÇÃO PARA MARCAR COMO CONCLUÍDA
function marcarConcluida(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });


    if (tarefa) {

        tarefa.concluida = !tarefa.concluida;

        listarTarefas();
    }
}


// FUNÇÃO PARA ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });


    if (tarefa) {

        let novaPrioridade = prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );


        novaPrioridade = Number(novaPrioridade);


        // Validação
        if (
            novaPrioridade < 1 ||
            novaPrioridade > 3 ||
            isNaN(novaPrioridade)
        ) {

            alert(
                "Prioridade inválida! " +
                "Digite um valor entre 1 e 3."
            );

            return;
        }


        tarefa.prioridade = novaPrioridade;

        listarTarefas();
    }
}


// Mostra a lista inicialmente
listarTarefas();