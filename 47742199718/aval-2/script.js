// ==========================================
// HABITFLOW
// Gerenciador de hábitos
// ==========================================


// ==========================================
// ELEMENTOS
// ==========================================

const habitsList =
    document.getElementById("habitsList");

const completedCount =
    document.getElementById("completedCount");

const totalCount =
    document.getElementById("totalCount");

const percentage =
    document.getElementById("percentage");

const progressBar =
    document.getElementById("progressBar");

const streakValue =
    document.getElementById("streakValue");

const insightText =
    document.getElementById("insightText");

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const habitForm =
    document.getElementById("habitForm");

const habitName =
    document.getElementById("habitName");

const habitCategory =
    document.getElementById("habitCategory");

const habitIcon =
    document.getElementById("habitIcon");

const themeButton =
    document.getElementById("themeButton");

const themeIcon =
    document.getElementById("themeIcon");

const themeText =
    document.getElementById("themeText");

const weekDays =
    document.getElementById("weekDays");

const todayButton =
    document.getElementById("todayButton");


// ==========================================
// DADOS INICIAIS
// ==========================================

const defaultHabits = [

    {
        id: 1,
        name: "Beber 2 litros de água",
        category: "Saúde",
        icon: "💧",
        streak: 8,
        completed: false
    },

    {
        id: 2,
        name: "Ler por 20 minutos",
        category: "Estudos",
        icon: "📚",
        streak: 12,
        completed: true
    },

    {
        id: 3,
        name: "Exercitar-se",
        category: "Saúde",
        icon: "🏃",
        streak: 5,
        completed: false
    },

    {
        id: 4,
        name: "Meditar por 10 minutos",
        category: "Bem-estar",
        icon: "🧘",
        streak: 15,
        completed: false
    },

    {
        id: 5,
        name: "Planejar o dia",
        category: "Produtividade",
        icon: "🎯",
        streak: 4,
        completed: true
    }

];


// ==========================================
// ESTADO
// ==========================================

let habits =
    JSON.parse(
        localStorage.getItem("habitflow_habits")
    ) || defaultHabits;

let selectedDate =
    new Date();


// ==========================================
// STORAGE
// ==========================================

function saveHabits() {

    localStorage.setItem(
        "habitflow_habits",
        JSON.stringify(habits)
    );
}


// ==========================================
// RENDERIZA HÁBITOS
// ==========================================

function renderHabits() {

    habitsList.innerHTML = "";

    habits.forEach(habit => {

        const element =
            document.createElement("article");

        element.className =
            `habit ${habit.completed ? "completed" : ""}`;

        element.dataset.id =
            habit.id;

        element.innerHTML = `

            <div class="habit-icon">
                ${habit.icon}
            </div>

            <div class="habit-info">

                <span class="habit-name">
                    ${escapeHTML(habit.name)}
                </span>

                <span class="habit-category">
                    ${escapeHTML(habit.category)}
                </span>

            </div>

            <div class="habit-streak">

                <strong>
                    🔥 ${habit.streak}
                </strong>

                <small>
                    sequência
                </small>

            </div>

            <button
                class="complete-button"
                aria-label="Concluir hábito"
            >
                ${habit.completed ? "✓" : ""}
            </button>

        `;


        const button =
            element.querySelector(
                ".complete-button"
            );


        button.addEventListener(
            "click",
            () => toggleHabit(habit.id)
        );


        habitsList.appendChild(element);

    });

    updateProgress();
}


// ==========================================
// CONCLUIR HÁBITO
// ==========================================

function toggleHabit(id) {

    habits = habits.map(habit => {

        if (habit.id !== id) {
            return habit;
        }

        const completed =
            !habit.completed;

        return {

            ...habit,

            completed,

            streak:
                completed
                    ? habit.streak + 1
                    : Math.max(
                        0,
                        habit.streak - 1
                    )
        };

    });

    saveHabits();

    renderHabits();
}


// ==========================================
// PROGRESSO
// ==========================================

function updateProgress() {

    const total =
        habits.length;

    const completed =
        habits.filter(
            habit => habit.completed
        ).length;

    const percent =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;


    completedCount.textContent =
        completed;

    totalCount.textContent =
        total;

    percentage.textContent =
        `${percent}%`;

    progressBar.style.width =
        `${percent}%`;


    updateInsight(
        percent
    );
}


// ==========================================
// INSIGHT
// ==========================================

function updateInsight(percent) {

    if (percent === 0) {

        insightText.textContent =
            "Comece pelo primeiro hábito. O importante é começar.";

        return;
    }

    if (percent < 50) {

        insightText.textContent =
            "Você já começou! Continue e avance mais um pouco.";

        return;
    }

    if (percent < 100) {

        insightText.textContent =
            "Muito bem! Você está perto de completar seu dia.";

        return;
    }

    insightText.textContent =
        "Todos os hábitos concluídos! Excelente trabalho hoje.";
}


// ==========================================
// MODAL
// ==========================================

openModal.addEventListener(
    "click",
    () => {

        modal.classList.add("show");

        setTimeout(
            () => habitName.focus(),
            100
        );
    }
);


function closeHabitModal() {

    modal.classList.remove("show");

    habitForm.reset();

}


closeModal.addEventListener(
    "click",
    closeHabitModal
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            closeHabitModal();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {
            closeHabitModal();
        }

    }
);


// ==========================================
// CRIAR HÁBITO
// ==========================================

habitForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            habitName.value.trim();

        const category =
            habitCategory.value;

        const icon =
            habitIcon.value;


        if (!name) {
            return;
        }


        const newHabit = {

            id:
                Date.now(),

            name,

            category,

            icon,

            streak: 0,

            completed: false

        };


        habits.unshift(
            newHabit
        );


        saveHabits();

        renderHabits();

        closeHabitModal();

    }
);


// ==========================================
// SEMANA
// ==========================================

function renderWeek() {

    weekDays.innerHTML = "";

    const today =
        new Date();

    const dayOfWeek =
        today.getDay();

    const mondayOffset =
        dayOfWeek === 0
            ? -6
            : 1 - dayOfWeek;


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date(today);

        date.setDate(
            today.getDate() +
            mondayOffset +
            i
        );


        const day =
            document.createElement("button");

        day.className =
            "day";


        const isToday =
            date.toDateString() ===
            today.toDateString();


        if (isToday) {
            day.classList.add("active");
        }


        const labels = [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb"
        ];


        day.innerHTML = `

            <span class="day-name">
                ${labels[date.getDay()]}
            </span>

            <span class="day-number">
                ${date.getDate()}
            </span>

        `;


        day.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".day")
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                day.classList.add("active");

            }
        );


        weekDays.appendChild(day);

    }

}


// ==========================================
// BOTÃO HOJE
// ==========================================

todayButton.addEventListener(
    "click",
    () => {

        renderWeek();

    }
);


// ==========================================
// MODO ESCURO
// ==========================================

const savedTheme =
    localStorage.getItem(
        "habitflow_theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    updateThemeButton(true);
}


themeButton.addEventListener(
    "click",
    () => {

        const dark =
            document.body.classList.toggle(
                "dark"
            );

        localStorage.setItem(
            "habitflow_theme",
            dark
                ? "dark"
                : "light"
        );

        updateThemeButton(
            dark
        );

    }
);


function updateThemeButton(isDark) {

    themeIcon.textContent =
        isDark
            ? "☀"
            : "☾";

    themeText.textContent =
        isDark
            ? "Modo claro"
            : "Modo escuro";

}


// ==========================================
// SEGURANÇA
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderWeek();

renderHabits();