
let tarefas = [];

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar código
    if (codigo === "") {
        alert("Digite o código da tarefa!");
        return;
    }

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar código duplicado
    let duplicado = tarefas.some(t => t.codigo === codigo);

    if (duplicado) {
        alert("Este código já está cadastrado!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar à lista
    tarefas.push(tarefa);

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    // Atualizar lista
    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}


// LISTAR TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa, indice) {

        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let titulo = document.createElement("p");
        titulo.className = "titulo";
        titulo.textContent = "Título: " + tarefa.titulo;

        let prioridade = document.createElement("p");

        let nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent = "Prioridade: " + nomes[tarefa.prioridade];

        let status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        let botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.onclick = function() {
            concluirTarefa(indice);
        };

        let botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar Prioridade";
        botaoPrioridade.onclick = function() {
            alterarPrioridade(indice);
        };

        div.appendChild(codigo);
        div.appendChild(titulo);
        div.appendChild(prioridade);
        div.appendChild(status);
        div.appendChild(botaoConcluir);
        div.appendChild(botaoPrioridade);

        lista.appendChild(div);

    });
}


// CONCLUIR TAREFA
function concluirTarefa(indice) {

    tarefas[indice].concluida = true;

    listarTarefas();

    alert("Tarefa concluída!");
}


// ALTERAR PRIORIDADE
function alterarPrioridade(indice) {

    let nova = Number(prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    ));

    if (![1, 2, 3].includes(nova)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefas[indice].prioridade = nova;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}
