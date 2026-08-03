// 1. Modo Escuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// 2. Cálculo do Progresso Semanal
const checkboxes = document.querySelectorAll('.task-check');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const progressFill = document.getElementById('progress-fill');

function updateProgress() {
  const total = checkboxes.length;
  let completed = 0;

  checkboxes.forEach((checkbox) => {
    const parentLabel = checkbox.closest('.topic-item');
    if (checkbox.checked) {
      completed++;
      parentLabel.classList.add('completed');
    } else {
      parentLabel.classList.remove('completed');
    }
  });

  totalCountEl.textContent = total;
  completedCountEl.textContent = completed;

  const percentage = total === 0 ? 0 : (completed / total) * 100;
  progressFill.style.width = `${percentage}%`;
}

// Escuta a mudança em qualquer caixa de seleção
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateProgress);
});

// Inicializa a contagem ao carregar
updateProgress();

// 3. Bloco de Notas Lateral com LocalStorage
const notesTextarea = document.getElementById('weekly-notes');
const saveNotesBtn = document.getElementById('save-notes-btn');
const saveStatus = document.getElementById('save-status');

// Recupera nota salva no navegador
const savedNote = localStorage.getItem('dev_weekly_notes');
if (savedNote) {
  notesTextarea.value = savedNote;
}

// Salva a nota no LocalStorage
saveNotesBtn.addEventListener('click', () => {
  localStorage.setItem('dev_weekly_notes', notesTextarea.value);
  
  saveStatus.style.display = 'block';
  setTimeout(() => {
    saveStatus.style.display = 'none';
  }, 2000);
});