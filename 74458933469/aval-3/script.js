
function adicionar(produto, preco) {
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent =
    "Você selecionou " + produto +
    " — R$ " + preco.toFixed(2).replace(".", ",") +
    ". Entre em contato para consultar disponibilidade.";
}

const formulario = document.getElementById("form-contato");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const retorno = document.getElementById("retorno");

  if (!nome || !email || !texto) {
    retorno.textContent = "Preencha todos os campos.";
    return;
  }

  retorno.textContent =
    "Obrigada, " + nome +
    "! Sua mensagem foi validada neste site demonstrativo.";

  formulario.reset();
});
