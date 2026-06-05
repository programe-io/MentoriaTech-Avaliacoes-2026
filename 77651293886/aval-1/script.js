const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const currentYear = document.getElementById("currentYear");

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Modo Claro" : "Modo Escuro";
}

function handleContactSubmit(event) {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    contactFeedback.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  contactFeedback.textContent = `Obrigado, ${name}! Sua mensagem foi enviada.`;
  contactForm.reset();
}

function initializePage() {
  currentYear.textContent = new Date().getFullYear();
}

themeToggle.addEventListener("click", toggleTheme);
contactForm.addEventListener("submit", handleContactSubmit);

initializePage();
