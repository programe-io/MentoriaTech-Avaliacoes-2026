const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
event.preventDefault();

const nome = document.getElementById("nome").value.trim();
const turma = document.getElementById("turma").value.trim();
const titulo = document.getElementById("titulo").value.trim();
const descricao = document.getElementById("descricao").value.trim();
const arquivo = document.getElementById("arquivo").files[0];

if (!nome || !turma || !titulo || !descricao || !arquivo) {
mensagem.textContent = "⚠️ Preencha todos os campos.";
mensagem.style.color = "#dc2626";
return;
}

mensagem.textContent =
"✅ Trabalho enviado com sucesso! Aguarde a avaliação do professor.";

mensagem.style.color = "#16a34a";

formulario.reset();
});