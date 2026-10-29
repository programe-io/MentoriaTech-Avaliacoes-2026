const publicacoes = document.querySelectorAll(".post");
const secaoPosts = document.querySelector("#posts");

const botao = document.createElement("button");
botao.textContent = "Esconder publicações";
botao.classList.add("botao-posts");

secaoPosts.insertBefore(botao, publicacoes[0]);

botao.addEventListener("click", function () {
  const estaoVisiveis = publicacoes[0].hidden === false;

  publicacoes.forEach(function (publicacao) {
    publicacao.hidden = estaoVisiveis;
  });

  botao.textContent = estaoVisiveis
    ? "Mostrar publicações"
    : "Esconder publicações";
});
