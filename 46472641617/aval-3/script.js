
document.addEventListener("DOMContentLoaded", () => {
  const workoutList = document.getElementById("workoutList");
  const goalList = document.getElementById("goalList");
  const activityList = document.getElementById("activityList");

  const workoutDialog = document.getElementById("workoutDialog");
  const goalDialog = document.getElementById("goalDialog");

  const workoutForm = document.getElementById("workoutForm");
  const goalForm = document.getElementById("goalForm");

  const workoutCount = document.getElementById("workoutCount");
  const minutesCount = document.getElementById("minutesCount");
  const goalCount = document.getElementById("goalCount");

  let nextId = 1;

  // ABRIR JANELAS
  document.getElementById("addWorkoutBtn").addEventListener("click", () => {
    workoutForm.reset();
    workoutDialog.showModal();
    document.getElementById("workoutName").focus();
  });

  document.getElementById("addGoalBtn").addEventListener("click", () => {
    goalForm.reset();
    goalDialog.showModal();
    document.getElementById("goalName").focus();
  });

  // FECHAR JANELAS
  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.close).close();
    });
  });

  [workoutDialog, goalDialog].forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });

  // ADICIONAR ATIVIDADE RECENTE
  function addActivity(message) {
    const empty = activityList.querySelector(".empty-state");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "activity-item";

    const icon = document.createElement("div");
    icon.className = "item-icon";

    const iconElement = document.createElement("i");
    iconElement.className = "bx bx-check-circle";
    icon.appendChild(iconElement);

    const content = document.createElement("div");
    content.className = "item-content";

    const description = document.createElement("p");
    description.textContent = message;

    const time = document.createElement("small");
    time.textContent = "Agora";

    content.append(description, time);
    item.append(icon, content);
    activityList.prepend(item);
  }

  // ATUALIZAR ESTATÍSTICAS
  function updateStats() {
    const workouts = workoutList.querySelectorAll(".workout-item");
    const goals = goalList.querySelectorAll(".goal-item");

    let totalMinutes = 0;

    workouts.forEach(workout => {
      totalMinutes += Number(workout.dataset.minutes);
    });

    workoutCount.textContent = workouts.length;
    minutesCount.textContent = totalMinutes;
    goalCount.textContent = goals.length;

    updateEmptyMessages();
  }

  // MENSAGENS QUANDO AS LISTAS ESTÃO VAZIAS
  function updateEmptyMessages() {
    const lists = [
      {
        element: workoutList,
        message: "Nenhum treino registrado ainda. Adicione sua primeira atividade!"
      },
      {
        element: goalList,
        message: "Cadastre uma meta para começar."
      }
    ];

    lists.forEach(({ element, message }) => {
      const hasItems = element.querySelector(
        ".workout-item, .goal-item"
      );

      let empty = element.querySelector(".empty-state");

      if (!hasItems && !empty) {
        empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = message;
        element.appendChild(empty);
      } else if (hasItems && empty) {
        empty.remove();
      }
    });
  }

  // CRIAR BOTÃO DE EXCLUSÃO
  function createDeleteButton(onDelete) {
    const button = document.createElement("button");
    button.className = "delete-button";
    button.type = "button";
    button.setAttribute("aria-label", "Excluir registro");

    const icon = document.createElement("i");
    icon.className = "bx bx-trash";
    button.appendChild(icon);

    button.addEventListener("click", onDelete);

    return button;
  }

  // REGISTRAR NOVO TREINO
  workoutForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("workoutName").value.trim();
    const type = document.getElementById("workoutType").value;
    const minutes = Number(
      document.getElementById("workoutMinutes").value
    );

    if (!name || !Number.isInteger(minutes) ||
        minutes < 1 || minutes > 1440) {
      return;
    }

    const empty = workoutList.querySelector(".empty-state");
    if (empty) empty.remove();

    const item = document.createElement("article");
    item.className = "workout-item";
    item.dataset.id = nextId++;
    item.dataset.minutes = minutes;

    const iconBox = document.createElement("div");
    iconBox.className = "item-icon";

    const icon = document.createElement("i");
    const icons = {
      Musculação: "bx-dumbbell",
      Caminhada: "bx-walk",
      Corrida: "bx-run",
      Ciclismo: "bx-cycling",
      Alongamento: "bx-body",
      Outro: "bx-heart"
    };

    icon.className = `bx ${icons[type] || "bx-heart"}`;
    iconBox.appendChild(icon);

    const content = document.createElement("div");
    content.className = "item-content";

    const title = document.createElement("h3");
    title.textContent = name;

    const details = document.createElement("p");
    details.textContent = `${type} · ${minutes} minutos`;

    content.append(title, details);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const deleteButton = createDeleteButton(() => {
      if (!confirm(`Excluir o treino "${name}"?`)) return;

      item.remove();
      updateStats();
      addActivity(`Treino excluído: ${name}`);
    });

    actions.appendChild(deleteButton);
    item.append(iconBox, content, actions);
    workoutList.prepend(item);

    workoutDialog.close();
    workoutForm.reset();

    updateStats();
    addActivity(`Treino registrado: ${name}`);
  });

  // CRIAR UMA NOVA META
  goalForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("goalName").value.trim();
    if (!name) return;

    const empty = goalList.querySelector(".empty-state");
    if (empty) empty.remove();

    const item = document.createElement("article");
    item.className = "goal-item";
    item.dataset.id = nextId++;

    const checkButton = document.createElement("button");
    checkButton.className = "goal-check";
    checkButton.type = "button";
    checkButton.setAttribute("aria-label", "Concluir meta");

    const checkIcon = document.createElement("i");
    checkIcon.className = "bx bx-circle";
    checkButton.appendChild(checkIcon);

    const content = document.createElement("div");
    content.className = "item-content";

    const title = document.createElement("h3");
    title.textContent = name;

    const status = document.createElement("p");
    status.textContent = "Em andamento";

    content.append(title, status);

    const deleteButton = createDeleteButton(() => {
      if (!confirm(`Excluir a meta "${name}"?`)) return;

      item.remove();
      updateStats();
      addActivity(`Meta excluída: ${name}`);
    });

    item.append(checkButton, content, deleteButton);
    goalList.prepend(item);

    // MARCAR META COMO CONCLUÍDA
    checkButton.addEventListener("click", () => {
      const done = item.classList.toggle("done");

      checkIcon.className = done
        ? "bx bx-check-circle"
        : "bx bx-circle";

      checkButton.setAttribute(
        "aria-label",
        done ? "Reabrir meta" : "Concluir meta"
      );

      status.textContent = done ? "Concluída" : "Em andamento";

      addActivity(
        done
          ? `Meta concluída: ${name}`
          : `Meta reaberta: ${name}`
      );
    });

    goalDialog.close();
    goalForm.reset();

    updateStats();
    addActivity(`Nova meta criada: ${name}`);
  });

  // NAVEGAÇÃO
  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link === button);
      });

      const page = button.dataset.page;

      const titles = {
        inicio: ["Meus treinos", "Registre suas atividades realizadas."],
        treinos: ["Meus treinos", "Consulte e organize suas atividades."],
        metas: ["Minhas metas", "Acompanhe os objetivos que cadastrou."],
        historico: ["Histórico de atividades", "Consulte seus registros recentes."]
      };

      document.getElementById("sectionTitle").textContent =
        titles[page][0];

      document.getElementById("sectionDescription").textContent =
        titles[page][1];

      if (page === "metas") {
        document.getElementById("goalsPanel").scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else if (page === "historico") {
        document.querySelector(".activity-panel").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else {
        document.querySelector(".content-grid").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ESTADO INICIAL
  updateStats();
});
