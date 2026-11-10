
let tarefas = [];

function adicionarTarefa() {
    const campo = document.getElementById("tarefa");
    const data = document.getElementById("data");

    const nome = campo.value.trim();

    if (nome === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        nome: nome,
        data: data.value,
        concluida: false
    });

    campo.value = "";
    data.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {
    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const info = document.createElement("div");
        info.className = "info";

        const nome = document.createElement("span");
        nome.textContent = tarefa.nome;

        const data = document.createElement("small");
        data.textContent = tarefa.data
            ? "Entrega: " + tarefa.data.split("-").reverse().join("/")
            : "Sem data definida";

        info.appendChild(nome);
        info.appendChild(data);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida ? "↩" : "✔";
        concluir.title = "Concluir ou reabrir tarefa";
        concluir.onclick = () => {
            tarefas[indice].concluida =
                !tarefas[indice].concluida;
            mostrarTarefas();
        };

        const excluir = document.createElement("button");
        excluir.textContent = "🗑";
        excluir.className = "excluir";
        excluir.title = "Excluir tarefa";
        excluir.onclick = () => {
            tarefas.splice(indice, 1);
            mostrarTarefas();
        };

        acoes.appendChild(concluir);
        acoes.appendChild(excluir);

        item.appendChild(info);
        item.appendChild(acoes);

        lista.appendChild(item);
    });

    atualizarResumo();
}

function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
}

mostrarTarefas();
