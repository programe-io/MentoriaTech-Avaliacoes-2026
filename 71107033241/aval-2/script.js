```javascript
// Array que armazena as tarefas
let tarefas = [];


// Função para validar a tarefa
function validarTarefa(titulo, prioridade) {

    // O título deve ter no mínimo 5 caracteres
    if (titulo.length < 5) {

        console.log("O título deve ter no mínimo 5 caracteres!");

        return false;
    }

    // A prioridade deve estar entre 1 e 3
    if (prioridade < 1 || prioridade > 3) {

        console.log("A prioridade deve ser entre 1 e 3!");

        return false;
    }

    return true;
}


// Cadastrar nova tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;

    let prioridade = Number(
        document.getElementById("prioridade").value
    );


    // Verificar se os dados são válidos
    if (!validarTarefa(titulo, prioridade)) {

        document.getElementById("mensagem").innerHTML =
            "Erro: verifique os dados informados!";

        return;
    }


    // Criar nova tarefa
    let novaTarefa = {

        codigo: tarefas.length + 1,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false
    };


    // Adicionar tarefa ao array
    tarefas.push(novaTarefa);


    document.getElementById("mensagem").innerHTML =
        "Tarefa cadastrada com sucesso!";


    // Atualizar lista
    listarTarefas();


    // Limpar campo
    document.getElementById("titulo").value = "";
}


// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";


    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";


        let classe = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";


        let nomePrioridade = "";

        if (tarefa.prioridade == 1) {
            nomePrioridade = "Alta";
        }

        else if (tarefa.prioridade == 2) {
            nomePrioridade = "Média";
        }

        else {
            nomePrioridade = "Baixa";
        }


        lista.innerHTML += `

            <div class="${classe}">

                <strong>Código:</strong>
                ${tarefa.codigo}

                <br>

                <strong>Título:</strong>
                ${tarefa.titulo}

                <br>

                <strong>Prioridade:</strong>
                ${tarefa.prioridade} - ${nomePrioridade}

                <br>

                <strong>Status:</strong>
                ${status}

                <br>

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Marcar como concluída
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>

        `;
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigoTarefa) {

    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
    );


    if (tarefa) {

        tarefa.concluida = true;

        listarTarefas();

    } else {

        console.log("Tarefa não encontrada!");
    }
}


// Alterar prioridade
function alterarPrioridade(codigoTarefa) {

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );


    // Validar prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {

        alert("A prioridade deve ser 1, 2 ou 3!");

        return;
    }


    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigoTarefa
    );


    if (tarefa) {

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

    } else {

        console.log("Tarefa não encontrada!");
    }
}
```
