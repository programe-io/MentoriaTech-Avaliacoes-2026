
let tarefas = [];
let proximoCodigo = 1;

function cadastrarTarefa() {
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    if (titulo.length < 5) {
        alert("Digite um título com pelo menos 5 caracteres!");
        return;
    }

    tarefas.push({
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    proximoCodigo++;

    document.getElementById("titulo").value = "";

    listarTarefas();
}

function listarTarefas() {
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML =
            "<strong>" + tarefa.titulo + "</strong>" +
            "<p>Código: " + tarefa.codigo + "</p>" +
            "<p>Prioridade: " + tarefa.prioridade + "</p>" +
            "<p>Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente") +
            "</p>";

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        let concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        concluir.onclick = function() {
            tarefa.concluida = !tarefa.concluida;
            listarTarefas();
        };

        let alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";

        alterar.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        acoes.appendChild(concluir);
        acoes.appendChild(alterar);
        div.appendChild(acoes);

        lista.appendChild(div);
    });
}

function alterarPrioridade(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    let novaPrioridade = prompt(
        "Escolha a nova prioridade:\nAlta, Média ou Baixa"
    );

    if (novaPrioridade === null) return;

    novaPrioridade = novaPrioridade.trim().toLowerCase();

    let prioridades = {
        alta: "Alta",
        média: "Média",
        media: "Média",
        baixa: "Baixa"
    };

    if (!prioridades[novaPrioridade]) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = prioridades[novaPrioridade];

    listarTarefas();
}
