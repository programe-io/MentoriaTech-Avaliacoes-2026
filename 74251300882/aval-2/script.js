
let tarefas = JSON.parse(
    localStorage.getItem("minhasTarefas")
) || [];

function salvar() {
    localStorage.setItem(
        "minhasTarefas",
        JSON.stringify(tarefas)
    );
}

function adicionarTarefa() {
    const nome = document.getElementById("nomeTarefa").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;

    if (!nome) {
        alert("Digite o nome da tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome,
        descricao,
        prioridade,
        data,
        concluida: false
    });

    salvar();

    document.getElementById("nomeTarefa").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";

    mostrarTarefas();
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    salvar();
    mostrarTarefas();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);

    salvar();
    mostrarTarefas();
}

function mostrarTarefas() {
    const area = document.getElementById("tarefas");
    const filtro = document.getElementById("filtro").value;

    let lista = tarefas;

    if (filtro === "Pendentes") {
        lista = tarefas.filter(t => !t.concluida);
    }

    if (filtro === "Concluidas") {
        lista = tarefas.filter(t => t.concluida);
    }

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhuma tarefa encontrada!</p>";
    } else {
        area.innerHTML = lista.map(t => `
            <div class="tarefa ${t.concluida ? "concluida" : ""}">
                <h3>${t.concluida ? "✅ " : "📌 "}${escapar(t.nome)}</h3>

                <p>${escapar(t.descricao || "Sem descrição")}</p>

                <div class="info">
                    <span class="prioridade ${
                        t.prioridade === "Alta" ? "alta" :
                        t.prioridade === "Media" ? "media" : "baixa"
                    }">
                        ${t.prioridade} prioridade
                    </span>

                    <span>
                        ${t.data ? formatarData(t.data) : "Sem prazo"}
                    </span>

                    <div class="acoes">
                        <button class="concluir"
                            onclick="concluirTarefa(${t.id})">
                            ${t.concluida ? "Desfazer" : "Concluir"}
                        </button>

                        <button class="excluir"
                            onclick="excluirTarefa(${t.id})">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    atualizarEstatisticas();
}

function atualizarEstatisticas() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    const pendentes = total - concluidas;

    const porcentagem = total > 0
        ? Math.round((concluidas / total) * 100)
        : 0;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;

    document.getElementById("porcentagem").textContent =
        porcentagem + "%";

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";
}

function formatarData(data) {
    return data.split("-").reverse().join("/");
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

mostrarTarefas();
