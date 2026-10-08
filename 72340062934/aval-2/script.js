
// Array onde as tarefas serão armazenadas
let tarefas = [];


// Pegando o formulário pelo ID
const formTarefa = document.getElementById("formTarefa");


// Evento executado quando o formulário for enviado
formTarefa.addEventListener("submit", function(event) {

    // Impede o navegador de recarregar a página
    event.preventDefault();


    // Pegando os valores dos campos
    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);


    // ==========================
    // VALIDAÇÕES
    // ==========================

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }


    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3.");
        return;
    }


    // Verifica se o código já existe
    const codigoExistente = tarefas.some(function(tarefa) {
        return tarefa.codigo === codigo;
    });


    if (codigoExistente) {
        alert("Esse código já está cadastrado.");
        return;
    }


    // ==========================
    // CRIANDO A TAREFA
    // ==========================

    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };


    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);


    // Mensagem de sucesso
    alert("Tarefa cadastrada com sucesso!");


    // Limpa o formulário
    formTarefa.reset();


    // Atualiza a lista
    listarTarefas();

});


// ==========================
// LISTAR TAREFAS
// ==========================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    // Limpa a lista
    lista.innerHTML = "";


    // Se não houver tarefas
    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    // Percorre todas as tarefas
    tarefas.forEach(function(tarefa) {

        let nomePrioridade;


        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
        }
        else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
        }
        else {
            nomePrioridade = "Baixa";
        }


        // Cria o elemento da tarefa
        const div = document.createElement("div");

        div.className = "tarefa";


        // Se estiver concluída
        if (tarefa.concluida) {
            div.classList.add("concluida");
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
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;


        // Coloca a tarefa dentro da lista
        lista.appendChild(div);

    });

}


// ==========================
// CONCLUIR TAREFA
// ==========================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });


    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }


    tarefa.concluida = true;


    listarTarefas();

}


// ==========================
// ALTERAR PRIORIDADE
// ==========================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });


    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }


    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );


    // Verifica a prioridade
    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        alert("Digite uma prioridade válida entre 1 e 3.");

        return;
    }


    tarefa.prioridade = novaPrioridade;


    alert("Prioridade alterada com sucesso!");


    listarTarefas();

}


// Inicia a lista
listarTarefas();

