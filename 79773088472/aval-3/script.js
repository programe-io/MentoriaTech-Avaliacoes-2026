// Adiciona funcionalidade de curtida em cada post
document.addEventListener("DOMContentLoaded", () => {
  const botoesCurtir = document.querySelectorAll(".btn-like");

  botoesCurtir.buttons = [];

  botoesCurtir.forEach((botao) => {
    let curtidas = 0;
    const contadorSpan = botao.querySelector(".like-count");

    botao.addEventListener("click", () => {
      curtidas++;
      contadorSpan.textContent = curtidas;
      botao.style.backgroundColor = "#e74c3c"; // Muda a cor ao curtir
    });
  });
});
