
let tarefas = [];

function adicionarTarefa() {

    let nome = document.getElementById("nome").value.trim();

    let prioridade = document.getElementById("prioridade").value;

    if (nome === "") {
        alert("Digite o nome da tarefa!");
        return;
    }

    tarefas.push({
        nome: nome,
        prioridade: prioridade,
        concluida: false
    });

    document.getElementById("nome").value = "";

    mostrarTarefas();
}

function mostrarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {

        let item = document.createElement("li");

        let informacoes = document.createElement("span");

        informacoes.textContent =
            tarefa.nome + " - Prioridade: " + tarefa.prioridade;

        informacoes.classList.add(
            tarefa.prioridade.toLowerCase()
        );

        if (tarefa.concluida) {
            informacoes.classList.add("concluida");
        }

        let botoes = document.createElement("div");

        let concluir = document.createElement("button");

        concluir.textContent = tarefa.concluida
            ? "Desfazer" : "Concluir";

        concluir.className = "concluir";

        concluir.onclick = function() {
            tarefas[indice].concluida =
                !tarefas[indice].concluida;

            mostrarTarefas();
        };

        let excluir = document.createElement("button");

        excluir.textContent = "Excluir";
        excluir.className = "excluir";

        excluir.onclick = function() {
            tarefas.splice(indice, 1);
            mostrarTarefas();
        };

        botoes.append(concluir, excluir);

        item.append(informacoes, botoes);

        lista.appendChild(item);

    });

    atualizarPainel();
}

function atualizarPainel() {

    let total = tarefas.length;

    let concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    let pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent =
        pendentes;

    document.getElementById("concluidas").textContent =
        concluidas;
}
