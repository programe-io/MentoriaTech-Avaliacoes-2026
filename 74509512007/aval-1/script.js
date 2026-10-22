
// Lista de equipes
const equipes = [
  {
    nome: "Ferrari",
    pais: "Itália",
    pilotos: "Charles Leclerc e Lewis Hamilton",
    cor: "#e10600"
  },
  {
    nome: "Mercedes",
    pais: "Reino Unido",
    pilotos: "George Russell e Kimi Antonelli",
    cor: "#00d2be"
  },
  {
    nome: "McLaren",
    pais: "Reino Unido",
    pilotos: "Lando Norris e Oscar Piastri",
    cor: "#ff8000"
  },
  {
    nome: "Red Bull Racing",
    pais: "Reino Unido",
    pilotos: "Max Verstappen e Isack Hadjar",
    cor: "#3671c6"
  },
  {
    nome: "Sauber",
    pais: "Suíça",
    pilotos: "Equipe da temporada",
    cor: "#52e252"
  }
];

// Local onde os cartões serão exibidos
const lista = document.querySelector("#lista-equipes");

// Função que mostra as equipes
function mostrarEquipes(filtro = "Todas") {
  const resultado = filtro === "Todas"
    ? equipes
    : equipes.filter(equipe => equipe.pais === filtro);

  lista.innerHTML = resultado.map(equipe => `
    <article class="equipe">
      <h3>${equipe.nome}</h3>
      <p>${equipe.pilotos}</p>
      <p>País: ${equipe.pais}</p>
      <div style="
        height: 8px;
        margin-top: 15px;
        background: ${equipe.cor};
        border-radius: 5px;
      "></div>
    </article>
  `).join("");
}

// Exibe todas as equipes ao abrir a página
mostrarEquipes();

// Faz os botões de filtro funcionarem
document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelector(".filtro.ativo")
      ?.classList.remove("ativo");

    botao.classList.add("ativo");

    mostrarEquipes(botao.dataset.filtro);
  });
});
