
// GERENCIADOR DE TAREFAS - JAVASCRIPT

document.body.innerHTML = "";

const estilo = document.createElement("style");

estilo.textContent = `
* {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #f1f5f9;
    margin: 0;
    padding: 40px 15px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px #0001;
}

h1 {
    text-align: center;
    color: #1e293b;
}

.form {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    outline: none;
}

button {
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
}

.adicionar {
    background: #2563eb;
    color: white;
}

.filtros {
    display: flex;
    gap: 8px;
    margin: 20px 0;
}

.filtros button {
    background: #e2e8f0;
}

.filtros button.ativo {
    background: #2563eb;
    color: white;
}

li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px;
    border-bottom: 1px solid #e2e8f0;
}

li span {
    flex: 1;
    overflow-wrap: anywhere;
}

.concluida {
    text-decoration: line-through;
    color: #94a3b8;
}

.excluir {
    background: #ef4444;
    color: white;
}

.info {
    color: #64748b;
    text-align: center;
    margin-top: 20px;
}
`;

document.head.appendChild(estilo);

const container = document.createElement("div");
container.className = "container";

container.innerHTML = `
    <h1>📝 Gerenciador de Tarefas</h1>

    <div class="form">
        <input id="tarefaInput"
            placeholder="Digite uma tarefa...">
        <button class="adicionar" id="adicionar">
            Adicionar
        </button>
    </div>

    <div class="filtros">
        <button class="ativo" data-filtro="todas">Todas</button>
        <button data-filtro="pendentes">Pendentes</button>
        <button data-filtro="concluidas">Concluídas</button>
    </div>

    <ul id="lista"></ul>

    <p class="info" id="contador"></p>
`;

document.body.appendChild(container);

// Dados
let tarefas = JSON.parse(
    localStorage.getItem("tarefas") || "[]"
);

let filtroAtual = "todas";

// Salvar tarefas
function salvar() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

// Renderizar tarefas
function renderizar() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";

    let filtradas = tarefas.filter(tarefa => {
        if (filtroAtual === "pendentes")
            return !tarefa.concluida;

        if (filtroAtual === "concluidas")
            return tarefa.concluida;

        return true;
    });

    filtradas.forEach(tarefa => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;

        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            salvar();
            renderizar();
        });

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";

        excluir.addEventListener("click", () => {
            tarefas = tarefas.filter(t => t.id !== tarefa.id);
            salvar();
            renderizar();
        });

        li.append(checkbox, texto, excluir);
        lista.appendChild(li);
    });

    const pendentes = tarefas.filter(t => !t.concluida).length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    contador.textContent =
        `Total: ${tarefas.length} | Pendentes: ${pendentes} | Concluídas: ${concluidas}`;
}

// Adicionar tarefa
function adicionarTarefa() {
    const input = document.getElementById("tarefaInput");
    const nome = input.value.trim();

    if (!nome) {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        id: Date.now(),
        nome: nome,
        concluida: false
    });

    input.value = "";

    salvar();
    renderizar();
}

// Botão adicionar
document.getElementById("adicionar")
    .addEventListener("click", adicionarTarefa);

// Adicionar com Enter
document.getElementById("tarefaInput")
    .addEventListener("keydown", evento => {
        if (evento.key === "Enter") {
            adicionarTarefa();
        }
    });

// Filtros
document.querySelectorAll("[data-filtro]")
    .forEach(botao => {
        botao.addEventListener("click", () => {
            filtroAtual = botao.dataset.filtro;

            document.querySelectorAll("[data-filtro]")
                .forEach(b => b.classList.remove("ativo"));

            botao.classList.add("ativo");

            renderizar();
        });
    });

// Inicializar
renderizar();
