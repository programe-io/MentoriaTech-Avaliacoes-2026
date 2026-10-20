
function mostrarReceita(id) {
  const detalhes = document.getElementById(id);
  const botao = detalhes.previousElementSibling;

  if (detalhes.hidden) {
    detalhes.hidden = false;
    botao.textContent = "Ocultar receita";
  } else {
    detalhes.hidden = true;
    botao.textContent = "Ver receita";
  }
}

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const retorno = document.getElementById("retorno");

  if (!nome || !email || !mensagem) {
    retorno.textContent = "Preencha todos os campos.";
    return;
  }

  retorno.textContent =
    "Obrigado, " + nome +
    "! Sua mensagem foi validada com sucesso.";

  formulario.reset();
});
