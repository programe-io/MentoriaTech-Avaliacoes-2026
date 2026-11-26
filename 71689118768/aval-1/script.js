// Interações do projeto TaskFlow
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const formMessage = document.getElementById("formMessage");
const demoForm = document.getElementById("demoForm");
const mobileMenu = document.getElementById("mobileMenu");
const menuToggle = document.getElementById("menuToggle");

function openModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  formMessage.textContent = "";
  demoForm.reset();
  modal.classList.remove("hidden");
  document.getElementById("userName").focus();
}
function closeModal() { modal.classList.add("hidden"); }

document.getElementById("demoButton").addEventListener("click", () => {
  openModal("Solicite uma demonstração", "Preencha seus dados. Esta demonstração é ilustrativa e não envia dados para um servidor.");
});
document.getElementById("startButton").addEventListener("click", () => {
  openModal("Comece gratuitamente", "Preencha o formulário para simular o cadastro no plano Essencial gratuito.");
});
document.querySelectorAll(".plan-button[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    openModal(`Plano ${plan}`, `Você selecionou o plano ${plan}. Preencha os dados para simular sua solicitação.`);
  });
});
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

demoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!demoForm.reportValidity()) return;
  const name = document.getElementById("userName").value.trim();
  formMessage.textContent = `Obrigado, ${name}! Solicitação simulada com sucesso. Seus dados não foram enviados para um servidor.`;
  formMessage.className = "mt-4 text-sm text-green-700 font-semibold";
  demoForm.reset();
});

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  menuToggle.setAttribute("aria-expanded", String(isHidden));
});
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
