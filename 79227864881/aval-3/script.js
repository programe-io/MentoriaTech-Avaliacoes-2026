document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const backdrop = document.getElementById("sidebarBackdrop");
  const taskDialog = document.getElementById("taskDialog");
  const taskForm = document.getElementById("taskForm");
  const taskName = document.getElementById("taskName");
  const taskPriority = document.getElementById("taskPriority");
  const taskList = document.getElementById("taskList");
  const emptyTasks = document.getElementById("emptyTasks");
  const taskNavCount = document.getElementById("taskNavCount");
  const pendingCount = document.getElementById("pendingCount");
  const completedCount = document.getElementById("completedCount");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function toggleSidebar(force) {
    const shouldOpen = typeof force === "boolean" ? force : !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", shouldOpen);
    backdrop.classList.toggle("visible", shouldOpen);
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  }
  menuToggle.addEventListener("click", () => toggleSidebar());
  backdrop.addEventListener("click", () => toggleSidebar(false));

  function openTaskDialog() {
    if (typeof taskDialog.showModal === "function") taskDialog.showModal();
    else taskDialog.setAttribute("open", "");
    setTimeout(() => taskName.focus(), 50);
  }
  ["newTaskTop", "newTaskSide"].forEach(id => document.getElementById(id).addEventListener("click", openTaskDialog));
  document.getElementById("closeDialog").addEventListener("click", () => taskDialog.close());
  document.getElementById("cancelDialog").addEventListener("click", () => taskDialog.close());

  function updateTaskCounts() {
    const rows = [...taskList.querySelectorAll(".task-row")];
    const pending = rows.filter(row => !row.querySelector(".task-check").checked).length;
    const completed = rows.length - pending;
    taskNavCount.textContent = pending;
    pendingCount.textContent = Math.max(0, 12 + pending - 3);
    completedCount.textContent = 128 + completed;
    emptyTasks.classList.toggle("hidden", pending !== 0);
    taskList.querySelectorAll(".task-row").forEach(row => {
      const check = row.querySelector(".task-check");
      row.classList.toggle("completed", check.checked);
    });
  }

  function bindTaskRow(row) {
    const checkbox = row.querySelector(".task-check");
    checkbox.addEventListener("change", () => {
      updateTaskCounts();
      const title = row.querySelector(".task-copy strong").textContent;
      showToast(checkbox.checked ? `Tarefa concluída: ${title}` : `Tarefa reaberta: ${title}`);
    });
    const more = row.querySelector(".more-button");
    more.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const title = row.querySelector(".task-copy strong").textContent;
      if (confirm(`Deseja remover a tarefa "${title}"?`)) {
        row.remove();
        updateTaskCounts();
        showToast("Tarefa removida.");
      }
    });
  }
  taskList.querySelectorAll(".task-row").forEach(bindTaskRow);

  taskForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = taskName.value.trim();
    if (!name) { taskName.focus(); return; }
    const priority = taskPriority.value;
    const priorityLabels = { high: "Alta", medium: "Média", low: "Baixa" };
    const row = document.createElement("label");
    row.className = "task-row";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    const checkmark = document.createElement("span");
    checkmark.className = "task-checkmark";
    const copy = document.createElement("span");
    copy.className = "task-copy";
    const strong = document.createElement("strong");
    strong.textContent = name;
    const meta = document.createElement("span");
    meta.className = "task-meta";
    const date = document.createElement("span");
    date.innerHTML = '<i class="bx bx-calendar"></i> Hoje';
    const priorityBadge = document.createElement("span");
    priorityBadge.className = `priority ${priority}`;
    priorityBadge.textContent = priorityLabels[priority];
    meta.append(date, priorityBadge);
    copy.append(strong, meta);
    const more = document.createElement("button");
    more.type = "button";
    more.className = "more-button";
    more.setAttribute("aria-label", "Remover tarefa");
    more.innerHTML = '<i class="bx bx-dots-horizontal-rounded"></i>';
    row.append(checkbox, checkmark, copy, more);
    taskList.prepend(row);
    bindTaskRow(row);
    taskForm.reset();
    taskDialog.close();
    updateTaskCounts();
    showToast("Nova tarefa adicionada!");
  });

  document.getElementById("viewAllTasks").addEventListener("click", () => {
    document.querySelectorAll(".nav-item[data-view]").forEach(item => item.classList.toggle("active", item.dataset.view === "tasks"));
    document.getElementById("pageTitle").textContent = "Tarefas";
    document.getElementById("tasksPanel").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.querySelectorAll(".nav-item[data-view]").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".nav-item[data-view]").forEach(nav => nav.classList.toggle("active", nav === item));
      const view = item.dataset.view;
      const titles = { overview: "Visão Geral", tasks: "Tarefas", projects: "Projetos" };
      document.getElementById("pageTitle").textContent = titles[view];
      if (view === "tasks") document.getElementById("tasksPanel").scrollIntoView({ behavior: "smooth", block: "start" });
      if (view === "projects") document.getElementById("projectsPanel").scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.innerWidth <= 800) toggleSidebar(false);
    });
  });

  document.getElementById("notificationButton").addEventListener("click", () => showToast("Você está em dia com suas notificações."));
  document.getElementById("profileButton").addEventListener("click", () => showToast("Perfil do aluno."));
  document.getElementById("settingsButton").addEventListener("click", () => showToast("Configurações: em breve."));
  document.getElementById("newProjectButton").addEventListener("click", () => showToast("Criação de projetos: em breve."));
  document.getElementById("focusButton").addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
    const active = document.body.classList.contains("focus-mode");
    document.getElementById("focusButton").innerHTML = active
      ? '<i class="bx bx-exit-fullscreen"></i> Sair do foco'
      : '<i class="bx bx-timer"></i> Modo foco';
    showToast(active ? "Modo foco ativado." : "Modo foco desativado.");
  });

  updateTaskCounts();
});
