const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

let cliques = 0;

botao.addEventListener("click", () => {
  cliques++;

  mensagem.textContent =
    `Você clicou ${cliques} vez(es)! 🎉`;

  botao.textContent = "Clique novamente";
});