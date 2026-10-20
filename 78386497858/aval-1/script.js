
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");
const semResultados = document.getElementById("sem-resultados");

// Pesquisar jogos pelo nome
pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  let encontrados = 0;

  cards.forEach((card) => {
    const nome = card.dataset.nome
      .toLocaleLowerCase("pt-BR");

    const corresponde = nome.includes(termo);

    card.hidden = !corresponde;

    if (corresponde) {
      encontrados++;
    }
  });

  semResultados.hidden = encontrados !== 0;
});

// Botões de análise
document.querySelectorAll(".analisar").forEach((botao) => {
  botao.addEventListener("click", () => {
    const jogo = botao.dataset.jogo;

    alert(
      `🎮 ${jogo}\n\n` +
      "Você selecionou este jogo!\n" +
      "Em breve, teremos uma análise completa."
    );
  });
});
