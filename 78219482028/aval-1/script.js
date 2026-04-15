// Lista de jogos (você pode adicionar mais aqui)
const games = [
    { title: "Guerra Estelar", category: "Ação" },
    { title: "Labirinto Azul", category: "Puzzle" },
    { title: "Corrida Noturna", category: "Esportes" },
    { title: "Defesa de Torres", category: "Estratégia" },
    { title: "Mestre das Cartas", category: "Cartas" },
    { title: "Salto Galáctico", category: "Arcade" }
];

const gameGrid = document.getElementById('gameGrid');

// Função para renderizar os jogos na tela
function loadGames() {
    gameGrid.innerHTML = games.map(game => `
        <div class="card-jogo">
            <div class="thumb-placeholder"></div>
            <div class="card-info">
                <h3>${game.title}</h3>
                <p style="font-size: 0.8rem; color: #888;">${game.category}</p>
                <a href="#" class="btn-jogar">JOGAR</a>
            </div>
        </div>
    `).join('');
}

// Inicializa o site
document.addEventListener('DOMContentLoaded', loadGames);