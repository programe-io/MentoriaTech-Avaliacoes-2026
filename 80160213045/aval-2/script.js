/* =====================================
   GAMEVERSE - JAVASCRIPT
   Sistema principal da plataforma gamer
===================================== */

// BANCO DE JOGOS

const games = [
    {
        id: 1,
        name: "Cyberpunk 2077",
        category: "Ação",
        rating: 9.5,
        image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?w=600",
        description: "Explore Night City, uma metrópole futurista cheia de tecnologia, perigos e aventuras."
    \},
    {
        id: 2,
        name: "The Last Adventure",
        category: "Aventura",
        rating: 9.2,
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600",
        description: "Uma jornada épica por um mundo misterioso cheio de desafios."
    \},
    {
        id: 3,
        name: "Street Racing",
        category: "Corrida",
        rating: 9.0,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
        description: "Prepare seu carro e dispute corridas em alta velocidade."
    \},
    {
        id: 4,
        name: "Dark Forest",
        category: "Terror",
        rating: 9.4,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
        description: "Sobreviva em uma floresta sombria cheia de criaturas assustadoras."
    \},
    {
        id: 5,
        name: "Battle Arena",
        category: "Ação",
        rating: 9.1,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
        description: "Entre em batalhas intensas e prove suas habilidades."
    \},
    {
        id: 6,
        name: "Lost World",
        category: "Aventura",
        rating: 8.9,
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600",
        description: "Descubra territórios desconhecidos e explore novos mundos."
    \}
];

// ESTADO DA PLATAFORMA

let currentCategory = "Todos";
let favorites = JSON.parse(localStorage.getItem("gameverse_favorites")) || [];


// =====================================
// INICIALIZAÇÃO
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    renderGames();
    setupSearch();
    setupMenu();
    setupModal();
    setupKeyboard();

    console.log("GAMEVERSE iniciado com sucesso!");
\});


// =====================================
// EXIBIR JOGOS
// =====================================

function renderGames() {

    const gameList = document.getElementById("gameList");

    if (!gameList) return;

    const searchInput = document.getElementById("search");

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    gameList.innerHTML = "";

    const filteredGames = games.filter(game => {

        const matchesSearch =
            game.name.toLowerCase().includes(search);

        const matchesCategory =
            currentCategory === "Todos" ||
            game.category === currentCategory ||
            (
                currentCategory === "Favoritos" &&
                favorites.includes(game.id)
            );

        return matchesSearch && matchesCategory;
    \});

    if (filteredGames.length === 0) {

        gameList.innerHTML = `
            <div class="empty-state">
                <h2>🎮 Nenhum jogo encontrado</h2>
                <p>Tente pesquisar outro jogo.</p>
            </div>
        `;

        return;
    \}

    filteredGames.forEach(game => {

        const isFavorite = favorites.includes(game.id);

        const card = document.createElement("article");

        card.className = "game-card";

        card.innerHTML = `
            <img
                src="\${game.image\}"
                alt="\${game.name\}"
                loading="lazy"
            >

            <div class="game-info">

                <h3>\${game.name\}</h3>

                <p>\${game.category\}</p>

                <div class="game-bottom">

                    <span class="rating">
                        ⭐ \${game.rating\}
                    </span>

                    <button
                        class="favorite \${isFavorite ? "liked" : ""\}"
                        data-favorite="\${game.id\}"
                        aria-label="Adicionar aos favoritos"
                    >
                        \${isFavorite ? "♥" : "♡"\}
                    </button>

                    <button
                        class="play"
                        data-game="\${game.id\}"
                    >
                        Ver jogo
                    </button>

                </div>

            </div>
        `;

        gameList.appendChild(card);
    \});

\}


// =====================================
// PESQUISA DE JOGOS
// =====================================

function setupSearch() {

    const search = document.getElementById("search");

    if (!search) return;

    search.addEventListener("input", () => {
        renderGames();
    \});

\}


// =====================================
// FILTRO DE CATEGORIAS
// =====================================

function filterGames(category, button) {

    currentCategory = category;

    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    \});

    if (button) {
        button.classList.add("active");
    \}

    renderGames();
\}


// =====================================
// SISTEMA DE FAVORITOS
// =====================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

    \} else {

        favorites.push(id);

    \}

    localStorage.setItem(
        "gameverse_favorites",
        JSON.stringify(favorites)
    );

    renderGames();
\}


// =====================================
// EVENTOS DOS CARDS
// =====================================

document.addEventListener("click", event => {

    const favoriteButton = event.target.closest("[data-favorite]");

    if (favoriteButton) {

        const id = Number(favoriteButton.dataset.favorite);

        toggleFavorite(id);

        return;
    \}

    const gameButton = event.target.closest("[data-game]");

    if (gameButton) {

        const id = Number(gameButton.dataset.game);

        openGame(id);

    \}

\});


// =====================================
// DETALHES DO JOGO
// =====================================

function openGame(id) {

    const game = games.find(item => item.id === id);

    if (!game) return;

    const modal = document.getElementById("modal");

    const title = document.getElementById("modalTitle");

    const description = document.getElementById("modalDescription");

    if (!modal || !title || !description) return;

    title.textContent = game.name;

    description.textContent =
        game.description +
        " | Categoria: " + game.category +
        " | Avaliação: " + game.rating + "/10";

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

\}


// =====================================
// FECHAR MODAL
// =====================================

function closeModal() {

    const modal = document.getElementById("modal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "";

\}


// =====================================
// CONFIGURAR MODAL
// =====================================

function setupModal() {

    const modal = document.getElementById("modal");

    if (!modal) return;

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        \}

    \});

\}


// =====================================
// MENU RESPONSIVO
// =====================================

function toggleMenu() {

    const nav = document.getElementById("nav");

    if (!nav) return;

    nav.classList.toggle("open");

\}


function setupMenu() {

    const nav = document.getElementById("nav");

    if (!nav) return;

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("open");
        \});

    \});

\}


// =====================================
// TECLADO
// =====================================

function setupKeyboard() {

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        \}

    \});

\}


// =====================================
// ANIMAÇÃO DOS ELEMENTOS
// =====================================

function animateElements() {

    const cards = document.querySelectorAll(".game-card");

    cards.forEach((card, index) => {

        card.style.animationDelay = `\${index * 0.08\}s`;

    \});

\}


// =====================================
// NOTIFICAÇÃO
// =====================================

function showNotification(message) {

    let notification = document.getElementById("notification");

    if (!notification) {

        notification = document.createElement("div");

        notification.id = "notification";

        notification.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: #9147ff;
            color: white;
            padding: 16px 25px;
            border-radius: 8px;
            z-index: 3000;
            box-shadow: 0 0 20px #9147ff66;
            animation: fadeIn .3s ease;
        `;

        document.body.appendChild(notification);

    \}

    notification.textContent = message;

    notification.style.display = "block";

    clearTimeout(notification.timer);

    notification.timer = setTimeout(() => {
        notification.style.display = "none";
    \}, 2500);

\}


// =====================================
// CARREGAMENTO FINAL
// =====================================

renderGames()$0