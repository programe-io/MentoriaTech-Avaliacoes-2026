
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filterTasks = document.getElementById("filterTasks");
const filterPriority = document.getElementById("filterPriority");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyMessage = document.getElementById("emptyMessage");
const cancelEdit = document.getElementById("cancelEdit");
const submitButton = document.getElementById("submitButton");
const formTitle = document.getElementById("formTitle");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = carregarTarefas();
let editingId = null;

// Gerar identificadores únicos
function gerarId() {
    return crypto.randomUUID();
}

// Carregar tarefas do LocalStorage
function carregarTarefas() {
    try {
        const dados = JSON.parse(localStorage.getItem("minhasTarefas"));

        if (!Array.isArray(dados)) return [];

        return dados.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.completed === "boolean" &&
            ["baixa", "media", "alta"].includes(task.priority)
        );
    } catch {
        return [];
    }
}

// Salvar tarefas
function salvarTarefas() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tasks));
}

// Adicionar ou editar tarefa
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (!title) {
        alert("Digite o nome da tarefa!");
        return;
    }

    if (editingId) {
        tasks = tasks.map(task => {
            if (task.id === editingId) {
                return {
                    ...task,
                    title,
                    description: taskDescription.value.trim(),
                    priority: taskPriority.value,
                    date: taskDate.value
                };
            }

            return task;
        });
    } else {
        const newTask = {
            id: gerarId(),
            title,
            description: taskDescription.value.trim(),
            priority: taskPriority.value,
            date: taskDate.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
    }

    salvarTarefas();
    resetForm();
    renderTasks();
});

// Limpar formulário
function resetForm() {
    taskForm.reset();
    editingId = null;

    formTitle.textContent = "Adicionar nova tarefa";
    submitButton.textContent = "Adicionar tarefa";
    cancelEdit.hidden = true;
}

// Editar tarefa
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;

    editingId = id;

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDate.value = task.date || "";

    formTitle.textContent = "Editar tarefa";
    submitButton.textContent = "Salvar alterações";
    cancelEdit.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Cancelar edição
cancelEdit.addEventListener("click", resetForm);

// Excluir tarefa
function deleteTask(id) {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) return;

    tasks = tasks.filter(task => task.id !== id);

    if (editingId === id) {
        resetForm();
    }

    salvarTarefas();
    renderTasks();
}

// Concluir ou reabrir tarefa
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    salvarTarefas();
    renderTasks();
}

// Criar elemento de texto seguro
function criarTexto(tag, conteudo, classe = "") {
    const elemento = document.createElement(tag);
    elemento.textContent = conteudo;

    if (classe) elemento.className = classe;

    return elemento;
}

// Criar botão
function criarBotao(texto, classe, callback) {
    const botao = document.createElement("button");

    botao.textContent = texto;
    botao.className = classe;
    botao.type = "button";
    botao.addEventListener("click", callback);

    return botao;
}

// Renderizar tarefas
function renderTasks() {
    taskList.replaceChildren();

    const busca = searchTask.value.toLowerCase().trim();
    const filtro = filterTasks.value;
    const prioridade = filterPriority.value;

    const filteredTasks = tasks.filter(task => {
        const correspondeBusca =
            task.title.toLowerCase().includes(busca) ||
            task.description.toLowerCase().includes(busca);

        const correspondeStatus =
            filtro === "todas" ||
            (filtro === "pendentes" && !task.completed) ||
            (filtro === "concluidas" && task.completed);

        const correspondePrioridade =
            prioridade === "todas" ||
            task.priority === prioridade;

        return correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade;
    });

    filteredTasks.forEach(task => {
        const article = document.createElement("article");

        article.className = task.completed
            ? "task concluida completed"
            : "task";

        const title = criarTexto("h3", task.title);
        const description = criarTexto(
            "p",
            task.description || "Sem descrição."
        );

        const info = document.createElement("div");
        info.className = "task-info";

        const priority = criarTexto(
            "span",
            "Prioridade: " + task.priority.toUpperCase(),
            "priority " + task.priority
        );

        info.appendChild(priority);

        if (task.date) {
            info.appendChild(
                criarTexto("span", "Vencimento: " + formatarData(task.date))
            );
        }

        const status = criarTexto(
            "span",
            task.completed ? "Concluída" : "Pendente"
        );

        info.appendChild(status);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        actions.appendChild(
            criarBotao(
                task.completed ? "Reabrir" : "Concluir",
                "complete-btn",
                () => toggleTask(task.id)
            )
        );

        actions.appendChild(
            criarBotao(
                "Editar",
                "edit-btn",
                () => editTask(task.id)
            )
        );

        actions.appendChild(
            criarBotao(
                "Excluir",
                "delete-btn",
                () => deleteTask(task.id)
            )
        );

        article.append(title, description, info, actions);
        taskList.appendChild(article);
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    atualizarDashboard();
}

// Formatar data
function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Atualizar indicadores
function atualizarDashboard() {
    const concluidas = tasks.filter(task => task.completed).length;
    const pendentes = tasks.length - concluidas;

    totalTasks.textContent = tasks.length;
    pendingTasks.textContent = pendentes;
    completedTasks.textContent = concluidas;
}

// Excluir tarefas concluídas
clearCompleted.addEventListener("click", function() {
    const concluidas = tasks.filter(task => task.completed);

    if (concluidas.length === 0) {
        alert("Não existem tarefas concluídas.");
        return;
    }

    if (!confirm("Deseja excluir todas as tarefas concluídas?")) {
        return;
    }

    tasks = tasks.filter(task => !task.completed);

    if (editingId && !tasks.some(task => task.id === editingId)) {
        resetForm();
    }

    salvarTarefas();
    renderTasks();
});

// Eventos dos filtros
searchTask.addEventListener("input", renderTasks);
filterTasks.addEventListener("change", renderTasks);
filterPriority.addEventListener("change", renderTasks);

// Inicialização
renderTasks();
