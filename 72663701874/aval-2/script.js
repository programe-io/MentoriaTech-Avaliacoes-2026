const STORAGE_KEY = "taskflow_pro_tasks_v1";

let tasks = [];
let currentView = "list";
let modalSubtasks = [];

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  bindEvents();
  renderAll();
});

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    const today = new Date().toISOString().split("T")[0];
    tasks = [
      {
        id: crypto.randomUUID(),
        title: "Revisar proposta comercial do cliente",
        description: "Conferir valores e prazos antes da reunião.",
        category: "Trabalho",
        priority: "alta",
        status: "em_andamento",
        dueDate: today,
        subtasks: [
          { id: "1", text: "Validar orçamento", done: true },
          { id: "2", text: "Enviar PDF por e-mail", done: false }
        ]
      },
      {
        id: crypto.randomUUID(),
        title: "Pagar fatura do cartão e contas fixas",
        description: "",
        category: "Financeiro",
        priority: "media",
        status: "pendente",
        dueDate: today,
        subtasks: []
      },
      {
        id: crypto.randomUUID(),
        title: "Treino de corrida 5km",
        description: "Manter ritmo leve no parque.",
        category: "Saúde",
        priority: "baixa",
        status: "concluida",
        dueDate: "",
        subtasks: []
      }
    ];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function bindEvents() {
  // Criação Rápida
  document.getElementById("quickAddForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("quickTitle").value.trim();
    if (!title) return;

    tasks.unshift({
      id: crypto.randomUUID(),
      title,
      description: "",
      category: document.getElementById("quickCategory").value,
      priority: document.getElementById("quickPriority").value,
      status: "pendente",
      dueDate: document.getElementById("quickDueDate").value,
      subtasks: []
    });

    e.target.reset();
    saveTasks();
    renderAll();
  });

  // Filtros e Busca
  ["searchInput", "filterStatus", "filterPriority", "filterCategory"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderAll);
  });

  // Alternar Lista / Kanban
  document.getElementById("btnViewList").addEventListener("click", () => switchView("list"));
  document.getElementById("btnViewKanban").addEventListener("click", () => switchView("kanban"));

  // Modal
  document.getElementById("btnOpenNewTask").addEventListener("click", () => openModal());
  document.getElementById("btnCloseModal").addEventListener("click", closeModal);
  document.getElementById("btnCancelModal").addEventListener("click", closeModal);

  document.getElementById("btnAddSubtask").addEventListener("click", () => {
    const input = document.getElementById("newSubtaskInput");
    const text = input.value.trim();
    if (!text) return;
    modalSubtasks.push({ id: crypto.randomUUID(), text, done: false });
    input.value = "";
    renderModalSubtasks();
  });

  document.getElementById("taskForm").addEventListener("submit", handleSaveTask);

  // Exportação e Backup
  document.getElementById("btnExportCsv").addEventListener("click", exportToCSV);
  document.getElementById("btnBackupJson").addEventListener("click", backupJSON);
  document.getElementById("inputRestoreJson").addEventListener("change", restoreJSON);

  // Drag and Drop nas colunas Kanban
  document.querySelectorAll(".kanban-dropzone").forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      const taskId = e.dataTransfer.getData("text/plain");
      const newStatus = zone.dataset.status;
      updateTaskStatus(taskId, newStatus);
    });
  });
}

function switchView(view) {
  currentView = view;
  document.getElementById("btnViewList").classList.toggle("active", view === "list");
  document.getElementById("btnViewKanban").classList.toggle("active", view === "kanban");
  document.getElementById("listView").classList.toggle("hidden", view !== "list");
  document.getElementById("kanbanView").classList.toggle("hidden", view !== "kanban");
}

function getFilteredTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("filterStatus").value;
  const priority = document.getElementById("filterPriority").value;
  const category = document.getElementById("filterCategory").value;

  return tasks.filter((t) => {
    const matchText = t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
    const matchStatus = status === "todos" || t.status === status;
    const matchPrio = priority === "todas" || t.priority === priority;
    const matchCat = category === "todas" || t.category === category;
    return matchText && matchStatus && matchPrio && matchCat;
  });
}

function isOverdue(task) {
  if (!task.dueDate || task.status === "concluida") return false;
  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today;
}

function renderAll() {
  updateKPIs();
  const filtered = getFilteredTasks();
  renderListView(filtered);
  renderKanbanView(filtered);
}

function updateKPIs() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "concluida").length;
  const inProgress = tasks.filter((t) => t.status === "em_andamento").length;
  const overdue = tasks.filter(isOverdue).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("kpiTotal").textContent = total;
  document.getElementById("kpiCompleted").textContent = completed;
  document.getElementById("kpiProgress").textContent = inProgress;
  document.getElementById("kpiOverdue").textContent = overdue;
  document.getElementById("kpiPercent").textContent = `${percent}%`;
  document.getElementById("kpiProgressBar").style.width = `${percent}%`;
}

function renderListView(list) {
  const container = document.getElementById("listView");
  if (!list.length) {
    container.innerHTML = `<div class="empty-state">Nenhuma tarefa encontrada com os filtros atuais.</div>`;
    return;
  }

  container.innerHTML = list.map((task) => {
    const doneCount = task.subtasks.filter((s) => s.done).length;
    const subBadge = task.subtasks.length ? `<span>Checklist: ${doneCount}/${task.subtasks.length}</span>` : "";
    const overdueHtml = isOverdue(task) ? `<span class="overdue-badge">Atrasada (${formatDate(task.dueDate)})</span>` : (task.dueDate ? `<span>Prazo: ${formatDate(task.dueDate)}</span>` : "");

    return `
      <div class="task-item ${task.status === "concluida" ? "completed" : ""}">
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.status === "concluida" ? "checked" : ""}
            onchange="toggleComplete('${task.id}')" />
          <div>
            <div class="task-title">${escapeHtml(task.title)}</div>
            ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ""}
            <div class="task-meta">
              <span class="tag tag-cat">${task.category}</span>
              <span class="tag prio-${task.priority}">${capitalize(task.priority)}</span>
              ${overdueHtml}
              ${subBadge}
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn" onclick="openModal('${task.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteTask('${task.id}')">Excluir</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderKanbanView(list) {
  const cols = {
    pendente: document.getElementById("colPendente"),
    em_andamento: document.getElementById("colAndamento"),
    concluida: document.getElementById("colConcluida")
  };

  Object.values(cols).forEach((el) => (el.innerHTML = ""));

  const counts = { pendente: 0, em_andamento: 0, concluida: 0 };

  list.forEach((task) => {
    counts[task.status]++;
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.draggable = true;
    card.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", task.id));

    card.innerHTML = `
      <div class="task-meta" style="margin-bottom: 6px;">
        <span class="tag tag-cat">${task.category}</span>
        <span class="tag prio-${task.priority}">${capitalize(task.priority)}</span>
      </div>
      <div class="task-title">${escapeHtml(task.title)}</div>
      ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ""}
      <div class="kanban-card-footer">
        <small style="color: var(--text-muted)">${task.dueDate ? formatDate(task.dueDate) : "Sem prazo"}</small>
        <div class="task-actions">
          <button class="action-btn" onclick="openModal('${task.id}')">Editar</button>
          <button class="action-btn delete" onclick="deleteTask('${task.id}')">×</button>
        </div>
      </div>
    `;
    cols[task.status].appendChild(card);
  });

  document.getElementById("countPendente").textContent = counts.pendente;
  document.getElementById("countAndamento").textContent = counts.em_andamento;
  document.getElementById("countConcluida").textContent = counts.concluida;
}

// Ações CRUD
function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.status = task.status === "concluida" ? "pendente" : "concluida";
  saveTasks();
  renderAll();
}

function updateTaskStatus(id, newStatus) {
  const task = tasks.find((t) => t.id === id);
  if (!task || task.status === newStatus) return;
  task.status = newStatus;
  saveTasks();
  renderAll();
}

function deleteTask(id) {
  if (!confirm("Deseja realmente excluir esta tarefa?")) return;
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderAll();
}

// Modal
function openModal(id = null) {
  const modal = document.getElementById("taskModal");
  const form = document.getElementById("taskForm");
  form.reset();

  if (id) {
    const task = tasks.find((t) => t.id === id);
    document.getElementById("modalTitle").textContent = "Editar Tarefa";
    document.getElementById("taskId").value = task.id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.description;
    document.getElementById("taskCategory").value = task.category;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStatus").value = task.status;
    document.getElementById("taskDueDate").value = task.dueDate;
    modalSubtasks = JSON.parse(JSON.stringify(task.subtasks));
  } else {
    document.getElementById("modalTitle").textContent = "Nova Tarefa";
    document.getElementById("taskId").value = "";
    modalSubtasks = [];
  }

  renderModalSubtasks();
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("taskModal").classList.add("hidden");
}

function renderModalSubtasks() {
  const ul = document.getElementById("subtasksList");
  ul.innerHTML = modalSubtasks.map((sub, idx) => `
    <li>
      <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
        <input type="checkbox" ${sub.done ? "checked" : ""} onchange="toggleModalSubtask(${idx})" />
        <span style="${sub.done ? "text-decoration:line-through; color:#94a3b8;" : ""}">${escapeHtml(sub.text)}</span>
      </label>
      <button type="button" class="btn-icon" style="font-size:1rem;" onclick="removeModalSubtask(${idx})">×</button>
    </li>
  `).join("");
}

function toggleModalSubtask(idx) {
  modalSubtasks[idx].done = !modalSubtasks[idx].done;
  renderModalSubtasks();
}

function removeModalSubtask(idx) {
  modalSubtasks.splice(idx, 1);
  renderModalSubtasks();
}

function handleSaveTask(e) {
  e.preventDefault();
  const id = document.getElementById("taskId").value;
  const payload = {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDesc").value.trim(),
    category: document.getElementById("taskCategory").value,
    priority: document.getElementById("taskPriority").value,
    status: document.getElementById("taskStatus").value,
    dueDate: document.getElementById("taskDueDate").value,
    subtasks: modalSubtasks
  };

  if (id) {
    const idx = tasks.findIndex((t) => t.id === id);
    tasks[idx] = { ...tasks[idx], ...payload };
  } else {
    tasks.unshift({ id: crypto.randomUUID(), ...payload });
  }

  saveTasks();
  closeModal();
  renderAll();
}

// Exportação e Backup
function exportToCSV() {
  const headers = ["Título", "Categoria", "Prioridade", "Status", "Prazo", "Descrição"];
  const rows = tasks.map((t) => [
    `"${t.title.replace(/"/g, '""')}"`,
    t.category,
    t.priority,
    t.status,
    t.dueDate || "",
    `"${t.description.replace(/"/g, '""')}"`
  ]);
  const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
  downloadFile(csvContent, "tarefas.csv", "text/csv;charset=utf-8;");
}

function backupJSON() {
  downloadFile(JSON.stringify(tasks, null, 2), "backup-tarefas.json", "application/json");
}

function restoreJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        renderAll();
        alert("Backup restaurado com sucesso!");
      }
    } catch {
      alert("Arquivo JSON inválido.");
    }
  };
  reader.readAsText(file);
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Utilitários
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}