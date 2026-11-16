
const goalInput = document.getElementById("goalInput");
const addGoalButton = document.getElementById("addGoalButton");
const goalList = document.getElementById("goalList");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressMessage = document.getElementById("progressMessage");
const currentDate = document.getElementById("currentDate");

// Identificar o dia atual
function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = getToday();

// Mostrar a data
currentDate.textContent = new Date().toLocaleDateString(
    "pt-BR",
    {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
);

// Carregar metas salvas
let savedData = JSON.parse(
    localStorage.getItem("jeanGoals")
);

let goals = [];

if (savedData && savedData.date === today) {
    goals = savedData.goals || [];
}

// Salvar metas
function saveGoals() {
    const data = {
        date: today,
        goals: goals
    };

    localStorage.setItem(
        "jeanGoals",
        JSON.stringify(data)
    );
}

// Adicionar uma meta
function addGoal() {

    const text = goalInput.value.trim();

    if (text === "") {
        alert("Digite uma meta antes de adicionar!");
        return;
    }

    const newGoal = {
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    };

    goals.push(newGoal);

    goalInput.value = "";

    saveGoals();
    renderGoals();
}

// Criar a lista de metas
function renderGoals() {

    goalList.innerHTML = "";

    if (goals.length === 0) {

        const message = document.createElement("p");

        message.className = "empty-message";
        message.textContent =
            "Nenhuma meta adicionada ainda.";

        goalList.appendChild(message);

    }

    goals.forEach((goal) => {

        const item = document.createElement("div");

        item.className = "goal-item";

        if (goal.completed) {
            item.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;

        checkbox.addEventListener("change", () => {

            goal.completed = checkbox.checked;

            saveGoals();
            renderGoals();

        });

        // Texto da meta
        const text = document.createElement("span");

        text.className = "goal-text";
        text.textContent = goal.text;

        // Botão excluir
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {

            goals = goals.filter(
                item => item.id !== goal.id
            );

            saveGoals();
            renderGoals();

        });

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);

        goalList.appendChild(item);

    });

    updateProgress();
}

// Atualizar progresso
function updateProgress() {

    const total = goals.length;

    const completed = goals.filter(
        goal => goal.completed
    ).length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round(
            (completed / total) * 100
        );
    }

    progressText.textContent = percentage + "%";

    progressFill.style.width = percentage + "%";

    if (total === 0) {

        progressMessage.textContent =
            "Sua jornada está apenas começando!";

    } else if (percentage === 100) {

        progressMessage.textContent =
            "Todas as metas concluídas! Você conseguiu, Jean!";

    } else if (percentage >= 50) {

        progressMessage.textContent =
            "Você está no caminho certo. Continue avançando!";

    } else {

        progressMessage.textContent =
            "Cada pequeno passo aproxima você da vitória!";

    }
}

// Evento do botão
addGoalButton.addEventListener("click", addGoal);

// Adicionar usando Enter
goalInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addGoal();
    }

});

// Iniciar o programa
renderGoals();
