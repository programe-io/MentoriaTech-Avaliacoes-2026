
const musicas = [
  "Dia de Sol — Banda Horizonte",
  "Noite Tranquila — Lua Azul",
  "Energia Total — Som Elétrico"
];

const botaoSurpresa = document.getElementById("surpresa");
const mensagem = document.getElementById("mensagem");

botaoSurpresa.addEventListener("click", function () {
  const indice = Math.floor(Math.random() * musicas.length);

  mensagem.textContent =
    "Sugestão para você: " + musicas[indice];
});

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const curtiu = botao.classList.toggle("ativo");

    if (curtiu) {
      botao.textContent = "♥ Curtido";

      mensagem.textContent =
        "Você curtiu: " + botao.dataset.musica + "!";
    } else {
      botao.textContent = "♡ Curtir";

      mensagem.textContent =
        "Você removeu a curtida de " +
        botao.dataset.musica + ".";
    }
  });
});
