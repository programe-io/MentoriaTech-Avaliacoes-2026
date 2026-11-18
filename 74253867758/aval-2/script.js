
// Carregar tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

// Salvar no navegador
function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Adicionar tarefa
function adicionarTarefa() {

    const nome = document
        .getElementById("nomeTarefa")
        .value.trim();

    const data = document
        .getElementById("dataTarefa")
        .value;

    const prioridade = document
        .getElementById("prioridade")
        .value;

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

// Concluir ou reabrir tarefa
function concluirTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvar();

    renderizar();
}

// Excluir tarefa
function excluirTarefa(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(t => t.id !== id);

    salvar();

    renderizar();
}

// Verificar tarefa atrasada
function estaAtrasada(tarefa) {

    if (!tarefa.data || tarefa.concluida) {
        return false;
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const prazo = new Date(tarefa.data + "T00:00:00");

    return prazo < hoje;
}

// Filtrar tarefas
function filtrar(tipo) {

    filtroAtual = tipo;

    renderizar();
}

// Proteger texto inserido pelo usuário
function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);

}

// Mostrar tarefas
function renderizar() {

    const lista = document.getElementById("listaTarefas");

    let filtradas = tarefas.filter(tarefa => {

        if (filtroAtual === "pendente") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluida") {
            return tarefa.concluida;
        }

        if (filtroAtual === "atrasada") {
            return estaAtrasada(tarefa);
        }

        return true;

    });

    // Ordenar prioridades e tarefas concluídas
    const ordem = {
        alta: 0,
        media: 1,
        baixa: 2
    };

    filtradas.sort((a, b) => {

        if (a.concluida !== b.concluida) {
            return Number(a.concluida) - Number(b.concluida);
        }

        return ordem[a.prioridade] - ordem[b.prioridade];

    });

    lista.innerHTML = "";

    if (filtradas.length === 0) {

        lista.innerHTML = `
            <p>Nenhuma tarefa encontrada!</p>
        `;

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
            ? new Date(
                tarefa.data + "T00:00:00"
              ).toLocaleDateString("pt-BR")
            : "Sem prazo";

        let status = "⏳ Pendente";

        if (tarefa.concluida) {
            status = "✅ Concluída";
        } else if (atrasada) {
            status = "⚠️ Tarefa atrasada";
        }

        div.innerHTML = `

            <div class="informacoes">

                <h3>${escaparHTML(tarefa.nome)}</h3>

                <span class="prioridade ${tarefa.prioridade}">
                    Prioridade ${tarefa.prioridade}
                </span>

                <p>📅 Prazo: ${dataFormatada}</p>

                <p>${status}</p>

            </div>

            <div class="acoes">

                <button
                    class="concluir"
                    onclick="concluirTarefa(${tarefa.id})">

                    ${
                        tarefa.concluida
                        ? "↩ Reabrir tarefa"
                        : "✓ Concluir tarefa"
                    }

                </button>

                <button
                    class="excluir"
                    onclick="excluirTarefa(${tarefa.id})">

                    🗑 Excluir

                </button>

            </div>

        `;

        lista.appendChild(div);

    });

    atualizarDashboard();

}

// Atualizar painel de estatísticas
function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    const pendentes = tarefas.filter(
        t => !t.concluida
    ).length;

    const atrasadas = tarefas.filter(
        t => estaAtrasada(t)
    ).length;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent =
        pendentes;

    document.getElementById("concluidas").textContent =
        concluidas;

    document.getElementById("atrasadas").textContent =
        atrasadas;

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").textContent =
        porcentagem + "% das tarefas concluídas";

}

// Permitir adicionar usando Enter
document.getElementById("nomeTarefa").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarTarefa();
        }

    }
);

// Inicializar sistema
renderizar();
