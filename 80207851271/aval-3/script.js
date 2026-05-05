function mudarConteudo() {
  document.getElementById("titulo").innerText = "Novo Título!";
  document.getElementById("texto").innerText = "O conteúdo foi alterado com JavaScript.";
}

function enviar() {
  let nome = document.getElementById("nome").value;
  document.getElementById("resposta").innerText = "Olá, " + nome + "!";
}

function mudarTema() {
  document.body.classList.toggle("dark");
}