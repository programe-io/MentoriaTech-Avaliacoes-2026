// Lista que vai armazenar as tarefas
let tarefas = [
    {
        codigo: 1,
        titulo: "Revisar anotações",
        prioridade: 2,
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Enviar relatório",
        prioridade: 3,
        concluida: false
    }
];

// Código da próxima tarefa
let proximoCodigo = 3;


// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    // Pegando os valores digitados
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);


    // VALIDAÇÃO DO TÍTULO
    if (titulo.trim().length < 5) {

        alert("O título deve ter no mínimo 5 caracteres.");

        return;
    }


    // VALIDAÇÃO DA PRIORIDADE
    if (prioridade < 1 || prioridade > 3) {

        alert("A prioridade deve estar entre 1 e 3.");

        return;
    }


    // Criando uma nova tarefa
    let tarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false
    };


    // Adicionando a tarefa na lista
    tarefas.push(tarefa);


    // Próximo código
    proximoCodigo++;


    // Limpando o campo do título
    document.getElementById("titulo").value = "";


    // Atualizando a lista
    listarTarefas();
}



// Listar as tarefas cadastradas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    // Limpa a lista
    lista.innerHTML = "";


    // Percorre todas as tarefas
    tarefas.forEach(function(tarefa) {

        let item = document.createElement("li");


        // Verifica se a tarefa está concluída
        if (tarefa.concluida) {

            item.classList.add("concluida");
        }


        // Nome da prioridade
        let nomePrioridade;

        if (tarefa.prioridade == 1) {

            nomePrioridade = "Alta";

        } else if (tarefa.prioridade == 2) {

            nomePrioridade = "Média";

        } else {

            nomePrioridade = "Baixa";
        }


        // Classe da prioridade
        let classePrioridade;

        if (tarefa.prioridade == 1) {

            classePrioridade = "alta";

        } else if (tarefa.prioridade == 2) {

            classePrioridade = "media";

        } else {

            classePrioridade = "baixa";
        }


        // Status da tarefa
        let status;

        if (tarefa.concluida) {

            status = "Concluída";

        } else {

            status = "Pendente";
        }


        // Montando a tarefa na tela
        item.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}
            <br>

            <strong>Título:</strong> ${tarefa.titulo}
            <br>

            <strong>Prioridade:</strong>

            <span class="${classePrioridade}">
                ${tarefa.prioridade} - ${nomePrioridade}
            </span>

            <br>

            <strong>Status:</strong> ${status}

            <br>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                ${tarefa.concluida
                    ? "Desmarcar conclusão"
                    : "Marcar como concluída"}
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Próxima prioridade
            </button>
        `;


        // Adiciona a tarefa na lista
        lista.appendChild(item);
    });
}



// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    // Procura a tarefa pelo código
    let tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;
    });


    if (tarefa) {

        // Inverte o status
        tarefa.concluida = !tarefa.concluida;
    }


    // Atualiza a lista
    listarTarefas();
}



// Alterar a prioridade
function alterarPrioridade(codigo) {

    // Procura a tarefa
    let tarefa = tarefas.find(function(tarefa) {

        return tarefa.codigo === codigo;
    });


    if (!tarefa) {

        return;
    }


    // Avança ciclicamente entre alta, média e baixa.
    tarefa.prioridade = tarefa.prioridade === 3
        ? 1
        : tarefa.prioridade + 1;


    // Atualiza a lista
    listarTarefas();
}

// Exibe as tarefas iniciais assim que a página carrega.
listarTarefas();