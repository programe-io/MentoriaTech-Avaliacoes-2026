
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Conteúdo das dicas
const tips = {
  estilo: {
    category: "ESTILO PESSOAL",
    title: "Vista-se com identidade",
    text: "Comece pelo básico: escolha roupas que tenham bom caimento, combine cores neutras e mantenha suas peças limpas e bem cuidadas. O melhor estilo é aquele que combina com sua personalidade e faz você se sentir confortável."
  },

  mente: {
    category: "DISCIPLINA",
    title: "A motivação começa, a disciplina continua",
    text: "Defina uma meta pequena para cada dia. Organize suas tarefas, reduza as distrações e cumpra o que for possível com consistência. Não precisa ser perfeito: o importante é construir hábitos sustentáveis."
  },

  saude: {
    category: "CUIDADO PESSOAL",
    title: "Cuide de você por inteiro",
    text: "Reserve tempo para se movimentar, dormir bem, manter uma alimentação equilibrada e cuidar da sua saúde emocional. Procure orientação profissional quando necessário. Cuidar de si também é um sinal de responsabilidade."
  }
};

const modal = document.getElementById("tipModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", () => {
    const tip = tips[button.dataset.topic];

    if (!tip) return;

    modalCategory.textContent = tip.category;
    modalTitle.textContent = tip.title;
    modalText.textContent = tip.text;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalClose.focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Progresso da rotina diária
const routineCheckboxes = document.querySelectorAll(
  '.routine-item input[type="checkbox"]'
);

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const total = routineCheckboxes.length;
  const completed = document.querySelectorAll(
    '.routine-item input[type="checkbox"]:checked'
  ).length;

  const percentage = total > 0 ? (completed / total) * 100 : 0;

  progressText.textContent = `${completed} de ${total}`;
  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("aria-valuemin", "0");
  progressBar.setAttribute("aria-valuemax", String(total));
  progressBar.setAttribute("aria-valuenow", String(completed));
}

routineCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateProgress);
});

updateProgress();
