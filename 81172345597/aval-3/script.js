const botoes = document.querySelectorAll(".btn");

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    alert("Abrindo detalhes da viagem...");
  });
});