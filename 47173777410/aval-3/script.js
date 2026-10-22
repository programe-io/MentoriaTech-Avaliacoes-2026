
document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.getElementById("gameGrid");
  const gameDialog = document.getElementById("gameDialog");
  const gameForm = document.getElementById("gameForm");

  const gameCount = document.getElementById("gameCount");
  const favoriteCount = document.getElementById("favoriteCount");
  const gamesHeading = document.getElementById("gamesHeading");
  const emptyMessage = document.getElementById("emptyMessage");

  let currentPage = "inicio";

  // ATUALIZAR CONTADORES
  function updateStats() {
    const games = [...gameGrid.querySelectorAll(".game-card")];

    gameCount.textContent = games.length;

    favoriteCount.textContent = games.filter(
      game => game.dataset.favorite === "true"
    ).length;

    filterGames();
  }

  // FILTRAR JOGOS POR CATEGORIA
  function filterGames() {
    const games = [...gameGrid.querySelectorAll(".game-card")];

    games.forEach(game => {
      const isFavorite = game.dataset.favorite === "true";

      game.hidden =
        currentPage === "favoritos" && !isFavorite;
    });

    emptyMessage.hidden = games.some(game => !game.hidden);
  }

  // CONFIGURAR BOTÕES DE FAVORITO
  function configureFavoriteButton(card) {
    const button = card.querySelector(".favorite-btn");
    const icon = button.querySelector("i");

    button.addEventListener("click", () => {
      const isFavorite = card.dataset.favorite === "true";

      card.dataset.favorite = String(!isFavorite);
      button.classList.toggle("active", !isFavorite);
      icon.className = !isFavorite
        ? "bx bxs-heart"
        : "bx bx-heart";

      updateStats();
    });
  }

  // CONFIGURAR FAVORITOS INICIAIS
  gameGrid.querySelectorAll(".game-card").forEach(
    configureFavoriteButton
  );

  // NAVEGAÇÃO
  document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
      currentPage = button.dataset.page;

      document.querySelectorAll(".nav-button").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      const headings = {
        inicio: "Minha biblioteca",
        biblioteca: "Minha biblioteca",
        favoritos: "Jogos favoritos",
        tarefas: "Desafios gamer"
      };

      gamesHeading.textContent = headings[currentPage];

      if (currentPage === "tarefas") {
        document.getElementById("challengePanel").scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      } else {
        document.getElementById("gamesHeading").scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      filterGames();
    });
  });

  // ABRIR CADASTRO DE JOGO
  document.getElementById("addGameBtn").addEventListener("click", () => {
    gameForm.reset();
    gameDialog.showModal();
    document.getElementById("gameName").focus();
  });

  // FECHAR CADASTRO
  document.getElementById("closeDialog").addEventListener("click", () => {
    gameDialog.close();
  });

  // CRIAR UM NOVO JOGO
  gameForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("gameName").value.trim();
    const genre = document.getElementById("gameGenre").value;

    if (!name) return;

    const card = document.createElement("article");
    card.className = "game-card";
    card.dataset.favorite = "false";

    const cover = document.createElement("div");
    cover.className = "game-cover";

    const genreStyles = {
      Aventura: "cover-one",
      Ação: "cover-two",
      RPG: "cover-three",
      Corrida: "cover-four",
      Estratégia: "cover-three",
      Esporte: "cover-two"
    };

    cover.classList.add(genreStyles[genre] || "cover-one");

    const icon = document.createElement("i");
    const genreIcons = {
      Aventura: "bx-joystick",
      Ação: "bx-rocket",
      RPG: "bx-shield-quarter",
      Corrida: "bx-car",
      Estratégia: "bx-chess",
      Esporte: "bx-trophy"
    };

    icon.className = `bx ${genreIcons[genre] || "bx-game"}`;

    const tag = document.createElement("span");
    tag.className = "game-tag";
    tag.textContent = genre.toUpperCase();

    cover.append(icon, tag);

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = name;

    const description = document.createElement("p");
    description.textContent = `Gênero: ${genre}`;

    const footer = document.createElement("div");
    footer.className = "game-footer";

    const status = document.createElement("span");
    status.className = "game-status";
    status.textContent = "Não iniciado";

    const favoriteButton = document.createElement("button");
    favoriteButton.className = "favorite-btn";
    favoriteButton.setAttribute("aria-label", "Favoritar");

    const heart = document.createElement("i");
    heart.className = "bx bx-heart";

    favoriteButton.appendChild(heart);
    footer.append(status, favoriteButton);
    info.append(title, description, footer);
    card.append(cover, info);

    gameGrid.prepend(card);

    configureFavoriteButton(card);
    gameDialog.close();
    gameForm.reset();

    currentPage = "biblioteca";

    document.querySelectorAll(".nav-button").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.page === "biblioteca"
      );
    });

    gamesHeading.textContent = "Minha biblioteca";

    updateStats();
  });

  // FECHAR AO CLICAR FORA DO MODAL
  gameDialog.addEventListener("click", event => {
    if (event.target === gameDialog) {
      gameDialog.close();
    }
  });

  // DESAFIO DO DIA
  const challengeBtn = document.getElementById("challengeBtn");
  const challengePanel = document.getElementById("challengePanel");

  challengeBtn.addEventListener("click", () => {
    const completed = challengePanel.classList.toggle("done");

    challengeBtn.innerHTML = completed
      ? '<i class="bx bx-check-circle"></i> Desafio concluído'
      : '<i class="bx bx-check"></i> Marcar como concluído';

    challengeBtn.setAttribute("aria-pressed", String(completed));
  });

  updateStats();
});
