
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

let filtroAtual = "Todas";
let editando = null;

const form = document.getElementById("formTarefa");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const tarefa = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        prazo: document.getElementById("prazo").value,
        prioridade: document.getElementById("prioridade").value,
        concluida: editando !== null
            ? tarefas[editando].concluida
            : false
    };

    if (editando !== null) {
        tarefas[editando] = tarefa;
        editando = null;

        document.getElementById("btnSalvar").textContent =
            "Adicionar Tarefa";
    } else {
        tarefas.push(tarefa);
    }

    salvar();
    form.reset();
});

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    mostrarTarefas();
}

function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    const filtradas = tarefas
        .map((tarefa, index) => ({ ...tarefa, index }))
        .filter(tarefa => {
            if (filtroAtual === "Pendente") {
                return !tarefa.concluida;
            }

            if (filtroAtual === "Concluída") {
                return tarefa.concluida;
            }

            return true;
        });

    if (filtradas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa encontrada.</p>';
    }

    filtradas.forEach(tarefa => {

        let prioridade = tarefa.prioridade.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">
                <h3>${escapar(tarefa.titulo)}</h3>

                <p>${escapar(tarefa.descricao)}</p>

                <p>Prazo: ${tarefa.prazo || "Não definido"}</p>

                <p class="prioridade ${prioridade}">
                    Prioridade: ${tarefa.prioridade}
                </p>

                <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

                <div class="acoes">

                    <button class="concluir"
                        onclick="concluirTarefa(${tarefa.index})">
                        ${tarefa.concluida ? "Reabrir" : "Concluir"}
                    </button>

                    <button class="editar"
                        onclick="editarTarefa(${tarefa.index})">
                        Editar
                    </button>

                    <button class="excluir"
                        onclick="excluirTarefa(${tarefa.index})">
                        Excluir
                    </button>

                </div>
            </div>
        `;
    });

    atualizarResumo();
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

function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
}

function editarTarefa(index) {
    const tarefa = tarefas[index];

    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.descricao;
    document.getElementById("prazo").value = tarefa.prazo;
    document.getElementById("prioridade").value = tarefa.prioridade;

    editando = index;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    document.querySelector(".formulario").scrollIntoView({
        behavior: "smooth"
    });
}

function excluirTarefa(index) {
    if (confirm("Deseja excluir esta tarefa?")) {
        tarefas.splice(index, 1);

        if (editando === index) {
            editando = null;
            form.reset();
            document.getElementById("btnSalvar").textContent =
                "Adicionar Tarefa";
        } else if (editando !== null && editando > index) {
            editando--;
        }

        salvar();
    }
}

function filtrar(tipo) {
    filtroAtual = tipo;
    mostrarTarefas();
}

function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

mostrarTarefas();
