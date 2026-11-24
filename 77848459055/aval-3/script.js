const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const promptForm = document.getElementById('promptForm');
const promptInput = document.getElementById('promptInput');
const suggestionCards = document.querySelectorAll('.suggestion-card');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

promptForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

function fillPrompt(text) {
  promptInput.value = text;
  promptInput.focus();
}

suggestionCards.forEach((card) => {
  card.addEventListener('click', () => {
    const promptText = card.dataset.prompt;
    if (promptText) {
      fillPrompt(promptText);
    }
  });
});