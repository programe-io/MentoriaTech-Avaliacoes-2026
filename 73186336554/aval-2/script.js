let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

const prioridades = {
    1: "🔴 Alta",
    2: "🟡 Média",
    3: "🟢 Baixa"
};

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        mostrarMensagem("Digite pelo menos 5 caracteres.", false);
        return;
    }

    tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    mostrarMensagem("Tarefa adicionada com sucesso!", true);
    formulario.reset();
    renderizarTarefas();
});

function mostrarMensagem(texto, sucesso) {
    mensagem.textContent = texto;
    mensagem.style.color = sucesso ? "#4ade80" : "#f87171";
}

function renderizarTarefas() {
    lista.innerHTML = "";

    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = tarefas.length - concluidas;

    document.getElementById("total").textContent = tarefas.length;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("contador").textContent =
        `${tarefas.length} ${tarefas.length === 1 ? "tarefa" : "tarefas"}`;

    if (tarefas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "empty";
        vazio.textContent = "Nenhuma tarefa por enquanto. Crie a primeira!";
        lista.appendChild(vazio);
        return;
    }

    tarefas.forEach(tarefa => {
        const card = document.createElement("article");
        card.className = "task-card" + (tarefa.concluida ? " done" : "");

        const info = document.createElement("div");
        info.className = "task-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhe = document.createElement("p");
        detalhe.textContent =
            `Código: ${tarefa.codigo} • Prioridade: ${prioridades[tarefa.prioridade]} • ` +
            (tarefa.concluida ? "Concluída" : "Pendente");

        info.append(titulo, detalhe);

        const acoes = document.createElement("div");
        acoes.className = "task-actions";

        const concluir = document.createElement("button");
        concluir.className = "btn-done";
        concluir.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
        concluir.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });

        const excluir = document.createElement("button");
        excluir.className = "btn-delete";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => {
            tarefas = tarefas.filter(t => t.codigo !== tarefa.codigo);
            renderizarTarefas();
        });

        acoes.append(concluir, excluir);
        card.append(info, acoes);
        lista.appendChild(card);
    });
}

renderizarTarefas();