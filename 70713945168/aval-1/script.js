const botao = document.getElementById("botaoFiel");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
  mensagem.textContent =
    "Aqui é Corinthians! 🖤🤍 Vai, Timão!";
});

const pesquisa = document.getElementById("pesquisa");
const noticias = document.querySelectorAll(".noticia");

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value
    .toLocaleLowerCase("pt-BR");

  noticias.forEach((noticia) => {
    const conteudo = noticia.textContent
      .toLocaleLowerCase("pt-BR");

    noticia.style.display =
      conteudo.includes(termo) ? "" : "none";
  });
});