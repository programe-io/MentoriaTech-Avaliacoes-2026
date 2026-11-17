
// ======================================
// MEU UNIVERSO ♡
// Sistema de organização e autocuidado
// ======================================

const STORAGE_KEY = "meuUniverso_v1";

const defaultData = {
    profile: {
        name: "",
        bio: "",
        photo: ""
    },
    diary: [],
    tasks: [],
    notes: [],
    goals: [],
    travels: []
};

function loadData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved ? { ...defaultData, ...saved } : structuredClone(defaultData);
    } catch {
        return structuredClone(defaultData);
    }
}

let data = loadData();

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        showToast("Não foi possível salvar. O armazenamento pode estar cheio.");
        return false;
    }
}

function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function today() {
    const date = new Date();
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
}

function formatDate(value) {
    if (!value) return "Sem data";
    const parts = value.split("-");
    if (parts.length !== 3) return value;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function emptyMessage(message) {
    return `<div class="empty-state">${escapeHTML(message)}</div>`;
}

// ======================================
// NAVEGAÇÃO
// ======================================

const pageTitles = {
    inicio: "Meu cantinho especial ♡",
    perfil: "Meu perfil",
    diario: "Meu diário",
    tarefas: "Minha organização",
    saude: "Um carinho para sua mente",
    notas: "Minhas notas",
    metas: "Meus sonhos e objetivos",
    viagens: "Minhas memórias pelo mundo"
};

function openPage(page) {
    const target = document.getElementById(`page-${page}`);
    if (!target) return;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active");
    });

    target.classList.add("active");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    document.getElementById("top-title").textContent = pageTitles[page] || "Meu Universo";

    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button) return;

    event.preventDefault();
    openPage(button.dataset.page);
});

function initializeNavigation() {
    const initialPage = location.hash.replace("#", "");
    openPage(pageTitles[initialPage] ? initialPage : "inicio");
}

// ======================================
// DATA ATUAL
// ======================================

function initializeDate() {
    const date = new Date();

    document.getElementById("current-date").textContent =
        date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("diary-date").value = today();
}

// ======================================
// PERFIL
// ======================================

const defaultPhoto =
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400";

function updateProfileDisplay() {
    const name = data.profile.name || "Minha conta";
    const photo = data.profile.photo || defaultPhoto;

    document.getElementById("sidebar-name").textContent = name;
    document.getElementById("welcome-name").textContent =
        data.profile.name || "flores";

    document.getElementById("profile-name").value = data.profile.name || "";
    document.getElementById("profile-bio").value = data.profile.bio || "";

    document.getElementById("sidebar-photo").src = photo;
    document.getElementById("top-photo").src = photo;
    document.getElementById("profile-preview").src = photo;
}

document.getElementById("profile-file").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Escolha um arquivo de imagem.");
        return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
        showToast("Escolha uma imagem de até 1,5 MB.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        data.profile.photo = reader.result;

        if (saveData()) {
            updateProfileDisplay();
            showToast("Foto atualizada! ♡");
        }
    };

    reader.readAsDataURL(file);
});

document.getElementById("profile-form").addEventListener("submit", event => {
    event.preventDefault();

    data.profile.name = document.getElementById("profile-name").value.trim();
    data.profile.bio = document.getElementById("profile-bio").value.trim();

    if (saveData()) {
        updateProfileDisplay();
        showToast("Seu perfil foi atualizado! ♡");
    }
});

// ======================================
// FRASES INSPIRADORAS
// ======================================

const quotes = [
    "Você está florescendo, mesmo nos dias em que não percebe.",
    "Seu caminho não precisa ser igual ao de ninguém.",
    "Pequenos passos também levam a lugares incríveis.",
    "Você merece o mesmo carinho que oferece aos outros.",
    "Não tenha pressa para viver a sua própria história.",
    "Cada novo dia é uma oportunidade de recomeçar.",
    "Permita-se descansar e aproveitar o presente.",
    "A sua história ainda tem muitos capítulos bonitos.",
    "Celebre também as pequenas conquistas.",
    "Você não precisa ser perfeita para ser incrível.",
    "Cuide dos seus sonhos com paciência e carinho.",
    "Um dia de cada vez também é uma forma de avançar."
];

function newQuote(elementId) {
    const element = document.getElementById(elementId);
    let index = Math.floor(Math.random() * quotes.length);

    if (element.textContent.includes(quotes[index])) {
        index = (index + 1) % quotes.length;
    }

    element.textContent = quotes[index];
}

document.getElementById("home-new-quote").addEventListener("click", () => {
    newQuote("home-quote");
});

document.getElementById("mental-new-quote").addEventListener("click", () => {
    newQuote("mental-quote");
});

// ======================================
// DIÁRIO
// ======================================

document.getElementById("save-diary").addEventListener("click", () => {
    const date = document.getElementById("diary-date").value;
    const mood = document.getElementById("diary-mood").value;
    const content = document.getElementById("diary-content").value.trim();

    if (!date || !content) {
        showToast("Preencha a data e escreva sobre seu dia.");
        return;
    }

    data.diary.unshift({
        id: createId(),
        date,
        mood,
        content
    });

    if (saveData()) {
        document.getElementById("diary-content").value = "";
        renderDiary();
        updateDashboard();
        showToast("Seu registro foi guardado! ♡");
    }
});

function renderDiary() {
    const list = document.getElementById("diary-list");

    document.getElementById("diary-total").textContent =
        `${data.diary.length} registros`;

    if (!data.diary.length) {
        list.innerHTML = emptyMessage("Seu diário ainda está vazio. Que tal registrar seu primeiro dia? 🌷");
        return;
    }

    list.innerHTML = data.diary.map(entry => `
        <article class="record-item">
            <div class="record-meta">${formatDate(entry.date)} · ${escapeHTML(entry.mood)}</div>
            <p>${escapeHTML(entry.content)}</p>
            <div class="item-actions">
                <button class="delete-button" data-action="delete-diary" data-id="${entry.id}">Excluir</button>
            </div>
        </article>
    `).join("");
}

// ======================================
// TAREFAS
// ======================================

let currentFilter = "all";

document.getElementById("task-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("task-input");
    const title = input.value.trim();

    if (!title) return;

    data.tasks.unshift({
        id: createId(),
        title,
        category: document.getElementById("task-category").value,
        date: document.getElementById("task-date").value,
        done: false
    });

    if (saveData()) {
        event.target.reset();
        renderTasks();
        updateDashboard();
        showToast("Tarefa adicionada! ♡");
    }
});

document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter-button").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderTasks();
    });
});

function renderTasks() {
    const list = document.getElementById("task-list");

    const completed = data.tasks.filter(task => task.done).length;
    const total = data.tasks.length;
    const percent = total ? Math.round(completed / total * 100) : 0;

    document.getElementById("task-total").textContent =
        `${total} tarefas`;

    document.getElementById("task-completed").textContent =
        `${completed} concluídas`;

    document.getElementById("task-progress-fill").style.width =
        `${percent}%`;

    let tasks = data.tasks;

    if (currentFilter === "pending") {
        tasks = tasks.filter(task => !task.done);
    }

    if (currentFilter === "done") {
        tasks = tasks.filter(task => task.done);
    }

    if (!tasks.length) {
        list.innerHTML = emptyMessage("Nenhuma tarefa por aqui. Aproveite esse momento! ☁");
        return;
    }

    list.innerHTML = tasks.map(task => `
        <div class="task-item ${task.done ? "done" : ""}">
            <input type="checkbox"
                data-action="toggle-task"
                data-id="${task.id}"
                ${task.done ? "checked" : ""}
                aria-label="Concluir tarefa">

            <div class="task-info">
                <strong>${escapeHTML(task.title)}</strong>
                <small>${escapeHTML(task.category)}${task.date ? " · " + formatDate(task.date) : ""}</small>
            </div>

            <button class="delete-button"
                data-action="delete-task"
                data-id="${task.id}">Excluir</button>
        </div>
    `).join("");
}

// ======================================
// NOTAS
// ======================================

document.getElementById("note-form").addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();

    if (!title || !content) {
        showToast("Preencha o título e o conteúdo da nota.");
        return;
    }

    data.notes.unshift({
        id: createId(),
        title,
        content,
        category: document.getElementById("note-category").value,
        date: today()
    });

    if (saveData()) {
        event.target.reset();
        renderNotes();
        showToast("Nota salva com carinho! ♡");
    }
});

function renderNotes() {
    const grid = document.getElementById("notes-grid");

    if (!data.notes.length) {
        grid.innerHTML = emptyMessage("Suas anotações aparecerão aqui. ✎");
        return;
    }

    grid.innerHTML = data.notes.map(note => `
        <article class="note-card">
            <span class="soft-tag">${escapeHTML(note.category)}</span>
            <h3>${escapeHTML(note.title)}</h3>
            <div class="record-meta">${formatDate(note.date)}</div>
            <p>${escapeHTML(note.content)}</p>
            <div class="item-actions">
                <button class="delete-button" data-action="delete-note" data-id="${note.id}">Excluir</button>
            </div>
        </article>
    `).join("");
}

// ======================================
// METAS
// ======================================

document.getElementById("goal-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("goal-name").value.trim();
    if (!name) return;

    data.goals.unshift({
        id: createId(),
        name,
        category: document.getElementById("goal-category").value,
        date: document.getElementById("goal-date").value,
        done: false
    });

    if (saveData()) {
        event.target.reset();
        renderGoals();
        updateDashboard();
        showToast("Nova meta criada! ⭐");
    }
});

function renderGoals() {
    const list = document.getElementById("goals-list");
    const done = data.goals.filter(goal => goal.done).length;

    document.getElementById("goal-total").textContent = data.goals.length;
    document.getElementById("goal-done").textContent = done;

    if (!data.goals.length) {
        list.innerHTML = emptyMessage("Seus sonhos merecem um lugar especial. Adicione sua primeira meta! ⭐");
        return;
    }

    list.innerHTML = data.goals.map(goal => `
        <article class="goal-card ${goal.done ? "completed" : ""}">
            <span class="soft-tag">${escapeHTML(goal.category)}</span>
            <h3>${escapeHTML(goal.name)}</h3>
            <small>${goal.date ? "Prazo: " + formatDate(goal.date) : "Sem prazo definido"}</small>
            <div class="item-actions">
                <button class="small-button" data-action="toggle-goal" data-id="${goal.id}">
                    ${goal.done ? "Desmarcar" : "Concluir"}
                </button>
                <button class="delete-button" data-action="delete-goal" data-id="${goal.id}">Excluir</button>
            </div>
        </article>
    `).join("");
}

// ======================================
// VIAGENS
// ======================================

document.getElementById("travel-form").addEventListener("submit", async event => {
    event.preventDefault();

    const place = document.getElementById("travel-place").value.trim();
    const file = document.getElementById("travel-photo").files[0];

    if (!place) {
        showToast("Informe o nome do lugar.");
        return;
    }

    if (file && !file.type.startsWith("image/")) {
        showToast("Escolha um arquivo de imagem válido.");
        return;
    }

    if (file && file.size > 1.5 * 1024 * 1024) {
        showToast("A foto precisa ter até 1,5 MB.");
        return;
    }

    let photo = "";

    if (file) {
        try {
            photo = await readImage(file);
        } catch {
            showToast("Não foi possível carregar essa foto.");
            return;
        }
    }

    data.travels.unshift({
        id: createId(),
        place,
        region: document.getElementById("travel-region").value.trim(),
        date: document.getElementById("travel-date").value,
        description: document.getElementById("travel-description").value.trim(),
        photo
    });

    if (saveData()) {
        event.target.reset();
        renderTravels();
        updateDashboard();
        showToast("Lembrança guardada! ✈");
    }
});

function readImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function renderTravels() {
    const grid = document.getElementById("travel-grid");

    if (!data.travels.length) {
        grid.innerHTML = emptyMessage("Suas aventuras e lembranças aparecerão aqui. 🌍");
        return;
    }

    grid.innerHTML = data.travels.map(trip => `
        <article class="travel-card">
            ${trip.photo ? `<img src="${trip.photo}" alt="Foto de ${escapeHTML(trip.place)}">` : `
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600" alt="Paisagem de viagem">
            `}
            <div class="travel-card-content">
                <div class="record-meta">${trip.date ? formatDate(trip.date) : "Uma lembrança especial"}</div>
                <h3>${escapeHTML(trip.place)}</h3>
                <p>${escapeHTML(trip.region)}</p>
                <p>${escapeHTML(trip.description)}</p>
                <div class="item-actions">
                    <button class="delete-button" data-action="delete-travel" data-id="${trip.id}">Excluir</button>
                </div>
            </div>
        </article>
    `).join("");
}

// ======================================
// AUTOCUIDADO E RESPIRAÇÃO
// ======================================

const pauseSuggestions = [
    "Prepare uma bebida que você gosta e aproveite alguns minutos de tranquilidade. ☕",
    "Coloque uma música calma e faça uma pausa das telas. 🎵",
    "Observe o ambiente ao seu redor e perceba pequenos detalhes. 🌷",
    "Faça um alongamento leve, respeitando seu corpo. 🌿",
    "Converse com alguém de confiança ou envie uma mensagem carinhosa. 💗"
];

const hobbySuggestions = [
    "Que tal desenhar ou pintar alguma coisa? 🎨",
    "Você pode ouvir suas músicas favoritas. 🎧",
    "Experimente escrever uma história ou um poema. 📖",
    "Separe um tempinho para cuidar de uma plantinha. 🪴",
    "Faça uma receita simples que você goste. 🍓"
];

document.getElementById("pause-button").addEventListener("click", () => {
    const suggestion = pauseSuggestions[Math.floor(Math.random() * pauseSuggestions.length)];
    showToast(suggestion);
});

document.getElementById("hobby-button").addEventListener("click", () => {
    const suggestion = hobbySuggestions[Math.floor(Math.random() * hobbySuggestions.length)];
    showToast(suggestion);
});

let breathingInterval = null;
let breathingStep = 0;

const breathingStages = [
    { text: "Inspire", instruction: "Inspire suavemente, sem forçar.", duration: 4000, expand: true },
    { text: "Solte o ar", instruction: "Solte o ar devagar, no seu ritmo.", duration: 6000, expand: false }
];

function showBreathingStage() {
    const stage = breathingStages[breathingStep];

    document.getElementById("breathing-text").textContent = stage.text;
    document.getElementById("breathing-instruction").textContent = stage.instruction;

    document.getElementById("breathing-circle")
        .classList.toggle("expand", stage.expand);

    breathingStep = (breathingStep + 1) % breathingStages.length;
}

document.getElementById("breathing-start").addEventListener("click", () => {
    const card = document.getElementById("breathing-card");
    card.hidden = false;
    card.scrollIntoView({ behavior: "smooth", block: "center" });

    clearInterval(breathingInterval);
    breathingStep = 0;
    showBreathingStage();

    breathingInterval = setInterval(() => {
        showBreathingStage();
    }, 5000);
});

document.getElementById("breathing-stop").addEventListener("click", () => {
    clearInterval(breathingInterval);
    breathingInterval = null;

    document.getElementById("breathing-card").hidden = true;
    document.getElementById("breathing-circle").classList.remove("expand");

    showToast("Exercício encerrado. Cuide de você! ♡");
});

// ======================================
// AÇÕES DE EXCLUIR E CONCLUIR
// ======================================

document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    if (!id) return;

    if (action === "delete-diary") {
        data.diary = data.diary.filter(item => item.id !== id);
        if (saveData()) renderDiary();
    }

    if (action === "delete-task") {
        data.tasks = data.tasks.filter(item => item.id !== id);
        if (saveData()) {
            renderTasks();
            updateDashboard();
        }
    }

    if (action === "delete-note") {
        data.notes = data.notes.filter(item => item.id !== id);
        if (saveData()) renderNotes();
    }

    if (action === "delete-goal") {
        data.goals = data.goals.filter(item => item.id !== id);
        if (saveData()) {
            renderGoals();
            updateDashboard();
        }
    }

    if (action === "delete-travel") {
        data.travels = data.travels.filter(item => item.id !== id);
        if (saveData()) {
            renderTravels();
            updateDashboard();
        }
    }

    if (action === "toggle-task") {
        const task = data.tasks.find(item => item.id === id);
        if (task) {
            task.done = button.checked;
            if (saveData()) {
                renderTasks();
                updateDashboard();
            }
        }
    }

    if (action === "toggle-goal") {
        const goal = data.goals.find(item => item.id === id);
        if (goal) {
            goal.done = !goal.done;
            if (saveData()) {
                renderGoals();
                updateDashboard();
            }
        }
    }
});

// ======================================
// PAINEL INICIAL
// ======================================

function updateDashboard() {
    const completedTasks = data.tasks.filter(task => task.done).length;
    const completedGoals = data.goals.filter(goal => goal.done).length;

    document.getElementById("stat-diary").textContent = data.diary.length;
    document.getElementById("stat-tasks").textContent = completedTasks;
    document.getElementById("stat-goals").textContent = completedGoals;
    document.getElementById("stat-trips").textContent = data.travels.length;

    const totalTasks = data.tasks.length;
    const percentage = totalTasks
        ? Math.round(completedTasks / totalTasks * 100)
        : 0;

    document.getElementById("home-task-percent").textContent = `${percentage}%`;
    document.getElementById("home-task-bar").style.width = `${percentage}%`;
}

// ======================================
// INICIALIZAÇÃO
// ======================================

function initializeApp() {
    initializeDate();
    updateProfileDisplay();
    renderDiary();
    renderTasks();
    renderNotes();
    renderGoals();
    renderTravels();
    updateDashboard();
    initializeNavigation();
}

initializeApp();
