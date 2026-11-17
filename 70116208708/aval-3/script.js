JavaScript
/**
 * TaskFlow Pro — Sistema Kanban em JavaScript Puro (Vanilla JS)
 * Arquitetura: Gerenciamento de Estado (Store) + Renderização Reativa (UI)
 */

class KanbanStore {
  constructor(storageKey = 'taskflow_pro_v1') {
    this.storageKey = storageKey;
    this.listeners = [];
    this.state = {
      tasks: this.loadFromStorage(),
      filters: {
        search: '',
        priority: 'todas'
      \}
    \};
  \}

  loadFromStorage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      \} catch (e) {
        console.error('Erro ao ler LocalStorage:', e);
      \}
    \}
    return this.getInitialSeed();
  \}

  getInitialSeed() {
    return [
      {
        id: 't-101',
        title: 'Arquitetura do Banco de Dados',
        description: 'Modelar tabelas de usuários, permissões e logs de auditoria.',
        status: 'concluido',
        priority: 'alta',
        assignee: 'Ana Silva',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      \},
      {
        id: 't-102',
        title: 'Desenvolver API de Autenticação JWT',
        description: 'Implementar refresh token, middleware de proteção e rate limit.',
        status: 'andamento',
        priority: 'alta',
        assignee: 'Carlos Mendes',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      \},
      {
        id: 't-103',
        title: 'Criar Componentes do Dashboard',
        description: 'Cards de métricas, filtros dinâmicos e responsividade mobile.',
        status: 'andamento',
        priority: 'media',
        assignee: 'Mariana Costa',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      \},
      {
        id: 't-104',
        title: 'Documentar Endpoints no Swagger',
        description: 'Adicionar exemplos de payload e códigos de erro HTTP.',
        status: 'fazer',
        priority: 'baixa',
        assignee: 'Lucas Rocha',
        createdAt: new Date().toISOString()
      \}
    ];
  \}

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state.tasks));
  \}

  subscribe(listener) {
    this.listeners.push(listener);
  \}

  notify() {
    this.saveToStorage();
    this.listeners.forEach(fn => fn(this.state));
  \}

  addTask({ title, description, priority, assignee, status = 'fazer' \}) {
    const newTask = {
      id: 't-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assignee: assignee.trim() || 'Não atribuído',
      createdAt: new Date().toISOString()
    \};
    this.state.tasks.unshift(newTask);
    this.notify();
    return newTask;
  \}

  updateTask(id, updates) {
    const index = this.state.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.state.tasks[index] = { ...this.state.tasks[index], ...updates \};
      this.notify();
    \}
  \}

  moveTask(id, newStatus) {
    this.updateTask(id, { status: newStatus \});
  \}

  deleteTask(id) {
    this.state.tasks = this.state.tasks.filter(t => t.id !== id);
    this.notify();
  \}

  setFilter(key, value) {
    this.state.filters[key] = value;
    this.listeners.forEach(fn => fn(this.state));
  \}

  getFilteredTasks() {
    const { search, priority \} = this.state.filters;
    const term = search.toLowerCase().trim();

    return this.state.tasks.filter(task => {
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.assignee.toLowerCase().includes(term);

      const matchesPriority = priority === 'todas' || task.priority === priority;
      return matchesSearch && matchesPriority;
    \});
  \}
\}

class KanbanUI {
  constructor(store) {
    this.store = store;
    this.draggedTaskId = null;
    this.editingTaskId = null;

    this.columns = [
      { id: 'fazer', title: 'A Fazer', color: '#64748b', badgeBg: '#f1f5f9' \},
      { id: 'andamento', title: 'Em Andamento', color: '#0284c7', badgeBg: '#e0f2fe' \},
      { id: 'concluido', title: 'Concluído', color: '#059669', badgeBg: '#d1fae5' \}
    ];

    this.priorityConfig = {
      alta: { label: 'Alta', bg: '#fee2e2', color: '#b91c1c' \},
      media: { label: 'Média', bg: '#fef3c7', color: '#b45309' \},
      baixa: { label: 'Baixa', bg: '#e0f2fe', color: '#0369a1' \}
    \};

    this.initAppShell();
    this.bindGlobalEvents();
    this.store.subscribe(() => this.render());
    this.render();
  \}

  initAppShell() {
    const root = document.getElementById('app');
    root.innerHTML = `
      <header class="topbar">
        <div class="container topbar-inner">
          <div class="logo-area">
            <div class="logo-badge">JS</div>
            <div>
              <h1>TaskFlow <span>Pro</span></h1>
              <p>Quadro Kanban & Gestão Ágil em Vanilla JS</p>
            </div>
          </div>
          <div class="topbar-actions">
            <button id="btn-export-json" class="btn btn-secondary">Exportar JSON</button>
            <button id="btn-new-task" class="btn btn-primary">+ Nova Tarefa</button>
          </div>
        </div>
      </header>

      <main class="container main-wrapper">
        <section id="metrics-bar" class="metrics-grid"></section>

        <section class="toolbar">
          <input type="text" id="search-input" class="input-control" placeholder="Buscar por título, descrição ou responsável..." />
          <select id="priority-filter" class="input-control">
            <option value="todas">Todas as Prioridades</option>
            <option value="alta">Prioridade Alta</option>
            <option value="media">Prioridade Média</option>
            <option value="baixa">Prioridade Baixa</option>
          </select>
        </section>

        <section id="kanban-board" class="board-grid"></section>
      </main>

      <!-- Modal Criação / Edição -->
      <div id="task-modal" class="modal-backdrop hidden">
        <div class="modal-card">
          <div class="modal-header">
            <h2 id="modal-title">Nova Tarefa</h2>
            <button id="btn-close-modal" class="close-btn">&times;</button>
          </div>
          <form id="task-form" class="modal-form">
            <div class="field">
              <label>Título da Tarefa *</label>
              <input type="text" id="field-title" required placeholder="Ex: Refatorar módulo de pagamentos" />
            </div>
            <div class="field">
              <label>Descrição</label>
              <textarea id="field-desc" rows="3" placeholder="Detalhes técnicos ou critérios de aceite..."></textarea>
            </div>
            <div class="field-row">
              <div class="field">
                <label>Prioridade</label>
                <select id="field-priority">
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                  <option value="baixa">Baixa</option>
                </select>
              </div>
              <div class="field">
                <label>Coluna / Status</label>
                <select id="field-status">
                  <option value="fazer">A Fazer</option>
                  <option value="andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label>Responsável</label>
              <input type="text" id="field-assignee" placeholder="Nome do membro da equipe" />
            </div>
            <div class="modal-footer">
              <button type="button" id="btn-cancel-modal" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary">Salvar Tarefa</button>
            </div>
          </form>
        </div>
      </div>

      <div id="toast-container" class="toast-box"></div>
    `;
  \}

  bindGlobalEvents() {
    document.getElementById('btn-new-task').addEventListener('click', () => this.openModal());
    document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());
    document.getElementById('btn-cancel-modal').addEventListener('click', () => this.closeModal());
    document.getElementById('btn-export-json').addEventListener('click', () => this.exportData());

    document.getElementById('search-input').addEventListener('input', (e) => {
      this.store.setFilter('search', e.target.value);
    \});

    document.getElementById('priority-filter').addEventListener('change', (e) => {
      this.store.setFilter('priority', e.target.value);
    \});

    document.getElementById('task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    \});
  \}

  openModal(task = null) {
    const modal = document.getElementById('task-modal');
    const titleEl = document.getElementById('modal-title');

    if (task) {
      this.editingTaskId = task.id;
      titleEl.textContent = 'Editar Tarefa';
      document.getElementById('field-title').value = task.title;
      document.getElementById('field-desc').value = task.description;
      document.getElementById('field-priority').value = task.priority;
      document.getElementById('field-status').value = task.status;
      document.getElementById('field-assignee').value = task.assignee;
    \} else {
      this.editingTaskId = null;
      titleEl.textContent = 'Nova Tarefa';
      document.getElementById('task-form').reset();
    \}

    modal.classList.remove('hidden');
  \}

  closeModal() {
    document.getElementById('task-modal').classList.add('hidden');
    this.editingTaskId = null;
  \}

  handleFormSubmit() {
    const payload = {
      title: document.getElementById('field-title').value,
      description: document.getElementById('field-desc').value,
      priority: document.getElementById('field-priority').value,
      status: document.getElementById('field-status').value,
      assignee: document.getElementById('field-assignee').value
    \};

    if (!payload.title.trim()) return;

    if (this.editingTaskId) {
      this.store.updateTask(this.editingTaskId, payload);
      this.showToast('Tarefa atualizada com sucesso!');
    \} else {
      this.store.addTask(payload);
      this.showToast('Nova tarefa criada!');
    \}

    this.closeModal();
  \}

  render() {
    const filteredTasks = this.store.getFilteredTasks();
    this.renderMetrics(this.store.state.tasks);
    this.renderBoard(filteredTasks);
  \}

  renderMetrics(allTasks) {
    const total = allTasks.length;
    const done = allTasks.filter(t => t.status === 'concluido').length;
    const inProgress = allTasks.filter(t => t.status === 'andamento').length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    document.getElementById('metrics-bar').innerHTML = `
      <div class="metric-card">
        <span>Total de Tarefas</span>
        <strong>\${total\}</strong>
      </div>
      <div class="metric-card">
        <span>Em Andamento</span>
        <strong style="color:#0284c7">\${inProgress\}</strong>
      </div>
      <div class="metric-card">
        <span>Concluídas (\${percent\}%)</span>
        <strong style="color:#059669">\${done\}</strong>
      </div>
    `;
  \}

  renderBoard(tasks) {
    const board = document.getElementById('kanban-board');
    board.innerHTML = '';

    this.columns.forEach(col => {
      const colTasks = tasks.filter(t => t.status === col.id);

      const colEl = document.createElement('div');
      colEl.className = 'kanban-column';
      colEl.dataset.status = col.id;

      colEl.innerHTML = `
        <div class="column-header">
          <div class="column-title">
            <span class="dot" style="background:\${col.color\}"></span>
            <h3>\${col.title\}</h3>
          </div>
          <span class="counter" style="background:\${col.badgeBg\}; color:\${col.color\}">\${colTasks.length\}</span>
        </div>
        <div class="column-body" data-dropzone="\${col.id\}"></div>
      `;

      const dropzone = colEl.querySelector('.column-body');

      // Eventos de Drag & Drop na coluna
      colEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        colEl.classList.add('drag-over');
      \});

      colEl.addEventListener('dragleave', () => {
        colEl.classList.remove('drag-over');
      \});

      colEl.addEventListener('drop', (e) => {
        e.preventDefault();
        colEl.classList.remove('drag-over');
        if (this.draggedTaskId) {
          this.store.moveTask(this.draggedTaskId, col.id);
          this.showToast(`Movida para "\${col.title\}"`);
          this.draggedTaskId = null;
        \}
      \});

      if (colTasks.length === 0) {
        dropzone.innerHTML = `<div class="empty-drop">Arraste tarefas para cá ou crie uma nova</div>`;
      \} else {
        colTasks.forEach(task => {
          dropzone.appendChild(this.createTaskCard(task));
        \});
      \}

      board.appendChild(colEl);
    \});
  \}

  createTaskCard(task) {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.draggable = true;

    const prio = this.priorityConfig[task.priority] || this.priorityConfig.media;
    const dateStr = new Date(task.createdAt).toLocaleDateString('pt-BR');

    card.innerHTML = `
      <div class="card-top">
        <span class="prio-badge" style="background:\${prio.bg\}; color:\${prio.color\}">\${prio.label\}</span>
        <div class="card-actions">
          <button class="icon-btn btn-edit" title="Editar">✎</button>
          <button class="icon-btn btn-del" title="Excluir">✕</button>
        </div>
      </div>
      <h4>\${this.escapeHTML(task.title)\}</h4>
      \${task.description ? `<p class="task-desc">\${this.escapeHTML(task.description)\}</p>` : ''\}
      <div class="card-footer">
        <span class="assignee">👤 \${this.escapeHTML(task.assignee)\}</span>
        <span class="date">\${dateStr\}</span>
      </div>
    `;

    card.addEventListener('dragstart', () => {
      this.draggedTaskId = task.id;
      card.classList.add('dragging');
    \});

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    \});

    card.querySelector('.btn-edit').addEventListener('click', () => this.openModal(task));
    card.querySelector('.btn-del').addEventListener('click', () => {
      if (confirm(`Deseja excluir a tarefa "\${task.title\}"?`)) {
        this.store.deleteTask(task.id);
        this.showToast('Tarefa removida.');
      \}
    \});

    return card;
  \}

  exportData() {
    const dataStr = JSON.stringify(this.store.state.tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' \});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kanban_backup_\${new Date().toISOString().slice(0, 10)\}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Backup JSON exportado!');
  \}

  showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  \}

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  \}
\}

// Inicialização da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  const store = new KanbanStore();
  new KanbanUI(store);
\});$0