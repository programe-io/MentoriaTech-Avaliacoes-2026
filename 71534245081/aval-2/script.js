
let tarefas = [];
let proximoCodigo = 1;

// CADASTRAR UMA NOVA TAREFA
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve possuir no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("titulo").value = "";

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
}


// LISTAR TODAS AS TAREFAS
function listarTarefas() {

    let area = document.getElementById("tarefas");

    area.innerHTML = "";

    if (tarefas.length === 0) {
        area.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let titulo = document.createElement("h3");
        titulo.textContent = "Código: " + tarefa.codigo +
            " - " + tarefa.titulo;

        let prioridade = document.createElement("p");
        prioridade.className = "prioridade";
        prioridade.textContent =
            "Prioridade: " + prioridadeTexto[tarefa.prioridade];

        let situacao = document.createElement("p");
        situacao.textContent = "Status: " + status;

        div.appendChild(titulo);
        div.appendChild(prioridade);
        div.appendChild(situacao);

        if (!tarefa.concluida) {

            let concluir = document.createElement("button");

            concluir.textContent = "Marcar como concluída";

            concluir.onclick = function() {
                concluirTarefa(tarefa.codigo);
            };

            div.appendChild(concluir);
        }

        let alterar = document.createElement("button");

        alterar.textContent = "Alterar prioridade";
        alterar.className = "alterar";

        alterar.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        div.appendChild(alterar);

        area.appendChild(div);

    });
}


// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;

        listarTarefas();

        alert("Tarefa concluída com sucesso!");
    }
}


// ALTERAR PRIORIDADE DA TAREFA
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}


// EXIBIR A LISTA INICIAL
listarTarefas();
