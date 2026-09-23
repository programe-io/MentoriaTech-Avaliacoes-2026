const tarefaInput = document.getElementById("tarefaInput");
const adicionarBtn = document.getElementById("adicionarBtn");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const limparBtn = document.getElementById("limparBtn");
const filtros = document.querySelectorAll(".filtro");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

// Adicionar tarefa
function adicionarTarefa() {
    const texto = tarefaInput.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    renderizarTarefas();

    tarefaInput.value = "";
    tarefaInput.focus();
}

// Renderizar tarefas
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(tarefa => !tarefa.concluida);
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(tarefa => tarefa.concluida);
    }

    if (tarefasFiltradas.length === 0) {
        listaTarefas.innerHTML = `
            <li class="vazia">
                Nenhuma tarefa encontrada.
            </li>
        `;
    }

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement("li");

        li.className = "tarefa";

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.innerHTML = `
            <input
                type="checkbox"
                class="checkbox"
                ${tarefa.concluida ? "checked" : ""}
            >

            <span>${escaparHTML(tarefa.texto)}</span>

            <button class="excluir">Excluir</button>
        `;

        const checkbox = li.querySelector(".checkbox");
        const excluirBtn = li.querySelector(".excluir");

        // Concluir tarefa
        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;

            salvarTarefas();
            renderizarTarefas();
        });

        // Excluir tarefa
        excluirBtn.addEventListener("click", () => {
            tarefas = tarefas.filter(item => item.id !== tarefa.id);

            salvarTarefas();
            renderizarTarefas();
        });

        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Atualizar contador
function atualizarContador() {
    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    contador.textContent =
        pendentes === 1
            ? "1 tarefa pendente"
            : `${pendentes} tarefas pendentes`;
}

// Salvar no LocalStorage
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Limpar tarefas concluídas
function limparConcluidas() {
    tarefas = tarefas.filter(tarefa => !tarefa.concluida);

    salvarTarefas();
    renderizarTarefas();
}

// Alterar filtro
filtros.forEach(botao => {
    botao.addEventListener("click", () => {
        filtros.forEach(item => item.classList.remove("ativo"));

        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        renderizarTarefas();
    });
});

// Eventos
adicionarBtn.addEventListener("click", adicionarTarefa);

limparBtn.addEventListener("click", limparConcluidas);

tarefaInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// Evita que HTML digitado pelo usuário seja interpretado como código
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// Inicializar
renderizarTarefas();
