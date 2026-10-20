
const pesquisa = document.getElementById("pesquisa");
const jogos = document.querySelectorAll(".card");
const semResultados = document.getElementById("sem-resultados");

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  let encontrados = 0;

  jogos.forEach((jogo) => {
    const nome = jogo.dataset.nome.toLocaleLowerCase("pt-BR");
    const categoria = jogo.querySelector(".categoria")
      .textContent.toLocaleLowerCase("pt-BR");

    const corresponde =
      nome.includes(termo) || categoria.includes(termo);

    jogo.hidden = !corresponde;

    if (corresponde) {
      encontrados++;
    }
  });

  semResultados.hidden = encontrados > 0;
});

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalTexto = document.getElementById("modal-texto");

document.querySelectorAll(".detalhes").forEach((botao) => {
  botao.addEventListener("click", () => {
    modalTitulo.textContent = botao.dataset.titulo;
    modalTexto.textContent = botao.dataset.descricao;
    modal.showModal();
  });
});

document.getElementById("fechar").addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    modal.close();
  }
});
