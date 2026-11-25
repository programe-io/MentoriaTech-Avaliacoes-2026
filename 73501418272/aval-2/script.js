et tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let editando = null;
let filtroAtual = "Todas";

const formulario = document.getElementById("formTarefa");

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    mostrarTarefas();
}

function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    let filtradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(pesquisa)
    );

    if (filtroAtual === "Pendentes") {
        filtradas = filtradas.filter(t => !t.concluida);
    }

    if (filtroAtual === "Concluídas") {
        filtradas = filtradas.filter(t => t.concluida);
    }

    if (filtradas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa encontrada.</p>';
        return;
    }

    filtradas.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const prazo = tarefa.prazo
            ? tarefa.prazo.split("-").reverse().join("/")
            : "Sem prazo";

        div.innerHTML = `
            <div>
                <h3>${escapar(tarefa.titulo)}</h3>
                <p>Prazo: ${prazo}</p>
                <p>Prioridade: ${escapar(tarefa.prioridade)}</p>
                <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>
            </div>

            <div class="acoes">
                <button class="concluir" onclick="concluir('${tarefa.id}')">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button class="editar" onclick="editar('${tarefa.id}')">
                    Editar
                </button>

                <button class="excluir" onclick="excluir('${tarefa.id}')">
                    Excluir
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const tarefa = {
        id: editando || String(Date.now()),
        titulo: document.getElementById("titulo").value.trim(),
        prazo: document.getElementById("prazo").value,
        prioridade: document.getElementById("prioridade").value,
        concluida: editando
            ? tarefas.find(t => t.id === editando).concluida
            : false
    };

    if (editando) {
        tarefas = tarefas.map(t =>
            t.id === editando ? tarefa : t
        );
    } else {
        tarefas.push(tarefa);
    }

    limparFormulario();
    salvar();
});

function concluir(id) {
    tarefas = tarefas.map(t =>
        t.id === id
            ? { ...t, concluida: !t.concluida }
            : t
    );

    salvar();
}

function editar(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    editando = id;

    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("prazo").value = tarefa.prazo;
    document.getElementById("prioridade").value = tarefa.prioridade;

    document.getElementById("botaoSalvar").textContent =
        "Salvar Alterações";
}

function excluir(id) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas = tarefas.filter(t => t.id !== id);

        if (editando === id) {
            limparFormulario();
        }

        salvar();
    }
}

function limparFormulario() {
    formulario.reset();
    editando = null;

    document.getElementById("botaoSalvar").textContent =
        "Adicionar Tarefa";
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarTarefas);

document.querySelectorAll(".filtros button").forEach(botao => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filtro;
        mostrarTarefas();
    });
});

mostrarTarefas();