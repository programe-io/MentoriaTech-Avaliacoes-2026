
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

let filtroAtual = "Todas";

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const prioridade = document.getElementById("prioridade").value;

    if (nome === "") {
        alert("Digite o nome da tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome,
        data,
        prioridade,
        concluida: false
    });

    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";

    salvar();
    mostrarTarefas();
}

function concluir(id) {
    const tarefa = tarefas.find(t => t.id === id);
    tarefa.concluida = !tarefa.concluida;

    salvar();
    mostrarTarefas();
}

function excluir(id) {
    tarefas = tarefas.filter(t => t.id !== id);

    salvar();
    mostrarTarefas();
}

function filtrar(tipo) {
    filtroAtual = tipo;
    mostrarTarefas();
}

function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    let filtradas = tarefas;

    if (filtroAtual === "Pendente") {
        filtradas = tarefas.filter(t => !t.concluida);
    }

    if (filtroAtual === "Concluída") {
        filtradas = tarefas.filter(t => t.concluida);
    }

    lista.innerHTML = "";

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa encontrada!</p>";
    }

    filtradas.forEach(t => {
        const div = document.createElement("div");
        div.className = "tarefa" + (t.concluida ? " concluida" : "");

        const nome = document.createElement("h3");
        nome.textContent = t.nome;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " +
            (t.data ? t.data.split("-").reverse().join("/") : "Não definido");

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + t.prioridade;

        const status = document.createElement("p");
        status.textContent = t.concluida ? "Concluída" : "Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = t.concluida ? "Desfazer" : "Concluir";
        botaoConcluir.onclick = () => concluir(t.id);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluir(t.id);

        acoes.append(botaoConcluir, botaoExcluir);
        div.append(nome, prazo, prioridade, status, acoes);
        lista.appendChild(div);
    });

    atualizarEstatisticas();
}

function atualizarEstatisticas() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;

    document.getElementById("progresso").style.width =
        porcentagem + "%";

    document.getElementById("porcentagem").textContent =
        porcentagem + "% concluído";
}

mostrarTarefas();
