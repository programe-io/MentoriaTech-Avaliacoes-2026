// ============================
// DADOS DOS JOGOS
// ============================

const games = [

    {
        home: "Alessandro FC",
        away: "Estrela FC",
        date: "Sábado · 16:00",
        stadium: "Arena Central"
    },

    {
        home: "Real Verde",
        away: "Alessandro FC",
        date: "Quarta · 20:30",
        stadium: "Estádio Municipal"
    },

    {
        home: "Alessandro FC",
        away: "União Brasil",
        date: "Domingo · 18:00",
        stadium: "Arena Central"
    }

];


// ============================
// TABELA
// ============================

const teams = [

    {
        name: "Alessandro FC",
        points: 18,
        games: 8,
        goalDifference: 9
    },

    {
        name: "Estrela FC",
        points: 16,
        games: 8,
        goalDifference: 6
    },

    {
        name: "Real Verde",
        points: 14,
        games: 8,
        goalDifference: 4
    },

    {
        name: "União Brasil",
        points: 11,
        games: 8,
        goalDifference: 1
    },

    {
        name: "Atlético Azul",
        points: 9,
        games: 8,
        goalDifference: -2
    },

    {
        name: "Nacional FC",
        points: 6,
        games: 8,
        goalDifference: -7
    }

];


// ============================
// RENDERIZAR JOGOS
// ============================

function renderGames() {

    const container =
        document.getElementById("games");

    container.innerHTML = games.map(game => {

        return `

            <article class="game-card">

                <p class="game-date">
                    ${game.date}
                </p>

                <div class="teams">

                    <div class="team">

                        <div class="team-icon">
                            🟢
                        </div>

                        ${game.home}

                    </div>

                    <span class="vs">
                        VS
                    </span>

                    <div class="team">

                        <div class="team-icon">
                            ⚪
                        </div>

                        ${game.away}

                    </div>

                </div>

                <p class="stadium">
                    📍 ${game.stadium}
                </p>

            </article>

        `;

    }).join("");

}


// ============================
// RENDERIZAR TABELA
// ============================

function renderTable() {

    const table =
        document.getElementById("tableBody");

    table.innerHTML = teams.map((team, index) => {

        const goalColor =
            team.goalDifference >= 0
                ? "text-emerald-400"
                : "text-red-400";

        return `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    <strong>
                        ${team.name}
                    </strong>
                </td>

                <td class="points">
                    ${team.points}
                </td>

                <td>
                    ${team.games}
                </td>

                <td class="${goalColor}">
                    ${team.goalDifference > 0 ? "+" : ""}
                    ${team.goalDifference}
                </td>

            </tr>

        `;

    }).join("");

}


// ============================
// MENU MOBILE
// ============================

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


// ============================
// FECHAR MENU AO CLICAR
// ============================

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


// ============================
// BOTÃO ATUALIZAR
// ============================

const refreshBtn =
    document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {

    refreshBtn.textContent =
        "Atualizado ✓";

    setTimeout(() => {

        refreshBtn.textContent =
            "Atualizar";

    }, 1500);

});


// ============================
// ANO DO FOOTER
// ============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ============================
// INICIALIZAÇÃO
// ============================

renderGames();

renderTable();
