
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const nome = document.getElementById("nomeTarefa").value.trim();
    const data = document.getElementById("dataTarefa").value;
    const prioridade = document.getElementById("prioridade").value;

    if (!nome) {
        alert("Digite o nome da tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome: nome,
        data: data,
        prioridade: prioridade,
        concluida: false
    });

    salvar();

    document.getElementById("nomeTarefa").value = "";
    document.getElementById("dataTarefa").value = "";

    renderizar();
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    tarefa.concluida = !tarefa.concluida;

    salvar();
    renderizar();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);

    salvar();
    renderizar();
}

function estaAtrasada(tarefa) {
    if (!tarefa.data || tarefa.concluida) return false;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const prazo = new Date(tarefa.data + "T00:00:00");

    return prazo < hoje;
}

function filtrar(tipo) {
    filtroAtual = tipo;
    renderizar();
}

function renderizar() {
    const lista = document.getElementById("listaTarefas");

    let filtradas = tarefas.filter(t => {
        if (filtroAtual === "pendente") return !t.concluida;
        if (filtroAtual === "concluida") return t.concluida;
        if (filtroAtual === "atrasada") return estaAtrasada(t);

        return true;
    });

    // Ordenar tarefas: prioridade alta primeiro,
    // depois as demais, mantendo as concluídas no final.
    const ordem = { alta: 0, media: 1, baixa: 2 };

    filtradas.sort((a, b) => {
        if (a.concluida !== b.concluida) {
            return Number(a.concluida) - Number(b.concluida);
        }

        return ordem[a.prioridade] - ordem[b.prioridade];
    });

    lista.innerHTML = "";

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa encontrada!</p>";
    }

    filtradas.forEach(tarefa => {
        const atrasada = estaAtrasada(tarefa);

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        if (atrasada) {
            div.classList.add("atrasada");
        }

        const dataFormatada = tarefa.data
            ? new Date(tarefa.data + "T00:00:00").toLocaleDateString("pt-BR")
            : "Sem prazo";

        div.innerHTML = `
            <div>
                <h3>${escaparHTML(tarefa.nome)}</h3>

                <span class="prioridade ${tarefa.prioridade}">
                    Prioridade ${tarefa.prioridade}
                </span>

                <p>📅 Prazo: ${dataFormatada}</p>

                <p>
                    ${tarefa.concluida
                        ? "✅ Concluída"
                        : atrasada
                            ? "⚠️ Tarefa atrasada"
                            : "⏳ Pendente"}
                </p>
            </div>

            <div class="acoes">
                <button class="concluir"
                    onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button class="excluir"
                    onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(div);
    });

    atualizarDashboard();
}

function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

function atualizarDashboard() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(t => t.concluida).length;

    const pendentes = tarefas.filter(t => !t.concluida).length;

    const atrasadas = tarefas.filter(t => estaAtrasada(t)).length;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;

    document.getElementById("atrasadas").textContent = atrasadas;

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").textContent =
        porcentagem + "% das tarefas concluídas";
}

renderizar();
