// app.js — Aplicativo de Notas Rápidas em JavaScript puro (ES6+)

class NotesApp {
  constructor(storageKey = "js_notes_app_v1") {
    this.storageKey = storageKey;
    this.notes = this.loadNotes();
    this.searchQuery = "";
    this.editingId = null;

    this.cacheDOM();
    this.bindEvents();
    this.render();
  }

  loadNotes() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveNotes() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }

  cacheDOM() {
    this.form = document.getElementById("noteForm");
    this.titleInput = document.getElementById("noteTitle");
    this.contentInput = document.getElementById("noteContent");
    this.submitBtn = document.getElementById("submitBtn");
    this.cancelBtn = document.getElementById("cancelEditBtn");
    this.searchInput = document.getElementById("searchInput");
    this.notesList = document.getElementById("notesList");
    this.counter = document.getElementById("notesCounter");
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.titleInput.value.trim();
      const content = this.contentInput.value.trim();
      if (!title && !content) return;

      if (this.editingId) {
        this.updateNote(this.editingId, title || "Sem título", content);
      } else {
        this.addNote(title || "Sem título", content);
      }

      this.resetForm();
    });

    this.cancelBtn?.addEventListener("click", () => this.resetForm());

    this.searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.render();
    });

    this.notesList.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;
      const id = card.dataset.id;

      if (e.target.matches("[data-action='delete']")) {
        this.deleteNote(id);
      } else if (e.target.matches("[data-action='edit']")) {
        this.startEdit(id);
      }
    });
  }

  addNote(title, content) {
    const now = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });

    this.notes.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      content,
      updatedAt: now,
    });

    this.saveNotes();
    this.render();
  }

  updateNote(id, title, content) {
    const now = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });

    this.notes = this.notes.map((note) =>
      note.id === id ? { ...note, title, content, updatedAt: now } : note
    );

    this.saveNotes();
    this.render();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    if (this.editingId === id) {
      this.resetForm();
    }
    this.saveNotes();
    this.render();
  }

  startEdit(id) {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return;

    this.editingId = id;
    this.titleInput.value = note.title;
    this.contentInput.value = note.content;
    if (this.submitBtn) this.submitBtn.textContent = "Salvar alteração";
    if (this.cancelBtn) this.cancelBtn.hidden = false;
    this.titleInput.focus();
  }

  resetForm() {
    this.editingId = null;
    this.form.reset();
    if (this.submitBtn) this.submitBtn.textContent = "Adicionar nota";
    if (this.cancelBtn) this.cancelBtn.hidden = true;
  }

  getFilteredNotes() {
    if (!this.searchQuery) return this.notes;
    return this.notes.filter(
      (n) =>
        n.title.toLowerCase().includes(this.searchQuery) ||
        n.content.toLowerCase().includes(this.searchQuery)
    );
  }

  render() {
    const visibleNotes = this.getFilteredNotes();
    this.notesList.innerHTML = "";

    if (visibleNotes.length === 0) {
      this.notesList.innerHTML = `<p>Nenhuma nota encontrada.</p>`;
    } else {
      const fragment = document.createDocumentFragment();

      visibleNotes.forEach((note) => {
        const article = document.createElement("article");
        article.className = "card";
        article.dataset.id = note.id;

        const h3 = document.createElement("h3");
        h3.textContent = note.title;

        const p = document.createElement("p");
        p.textContent = note.content;

        const small = document.createElement("small");
        small.textContent = `Atualizado: ${note.updatedAt}`;  const actions = document.createElement("div");  const editBtn = document.createElement("button"); editBtn.type = "button"; editBtn.dataset.action = "edit"; editBtn.textContent = "Editar";  const delBtn = document.createElement("button"); delBtn.type = "button"; delBtn.dataset.action = "delete"; delBtn.textContent = "Excluir";  actions.append(editBtn, delBtn); article.append(h3, p, small, actions); fragment.appendChild(article); });  this.notesList.appendChild(fragment); }  if (this.counter) { this.counter.textContent = `${visibleNotes.length}