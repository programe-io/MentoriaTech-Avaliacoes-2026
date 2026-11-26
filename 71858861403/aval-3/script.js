// 1. Alternância de Tema com salvamento no navegador
const btnTema = document.getElementById("toggle-tema");
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
  document.body.classList.add("dark");
  btnTema.textContent = "Tema Claro";
}

btnTema.addEventListener("click", () => {
  const escuroAtivo = document.body.classList.toggle("dark");
  btnTema.textContent = escuroAtivo ? "Tema Claro" : "Tema Escuro";
  localStorage.setItem("tema", escuroAtivo ? "dark" : "light");
});

// 2. Filtro de busca em tempo real
const inputBusca = document.getElementById("busca");
const cards = document.querySelectorAll(".card");

inputBusca.addEventListener("input", (evento) => {
  const termo = evento.target.value.toLowerCase();

  cards.forEach((card) => {
    const titulo = card.dataset.titulo.toLowerCase();
    card.classList.toggle("oculto", !titulo.includes(termo));
  });
});

// 3. Validação e envio simulado do formulário
const form = document.getElementById("form-contato");
const statusForm = document.getElementById("status-form");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email.includes("@") || !mensagem) {
    statusForm.style.color = "#ef4444";
    statusForm.textContent = "Preencha todos os campos com um e-mail válido.";
    return;
  }

  statusForm.style.color = "#22c55e";
  statusForm.textContent = `Obrigado, ${nome}! Mensagem enviada com sucesso.`;
  form.reset();
});
