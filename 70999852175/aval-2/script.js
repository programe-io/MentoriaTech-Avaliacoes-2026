// --- Efeito de Digitação Automática do Nome ---
const textArray = ["Weslley", "Estudante", "Futuro Médico"];
let arrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.getElementById("typed-text");

function type() {
  if (charIndex < textArray[arrayIndex].length) {
    typedTextSpan.textContent += textArray[arrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    setTimeout(erase, 1800);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    arrayIndex++;
    if (arrayIndex >= textArray.length) arrayIndex = 0;
    setTimeout(type, 400);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, 800);
});

// --- Lógica do Formulário de Contato ---
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;

  formFeedback.style.color = "#16a34a";
  formFeedback.textContent = `Obrigado pelo contato, ${nome}! Sua mensagem foi enviada.`;

  contactForm.reset();

  setTimeout(() => {
    formFeedback.textContent = "";
  }, 4000);
});