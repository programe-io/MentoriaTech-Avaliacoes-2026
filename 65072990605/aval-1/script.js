/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* =====================================================
   FECHAR MENU AO CLICAR EM UM LINK
===================================================== */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =====================================================
   FILTRO DE JOGOS
===================================================== */

const filters = document.querySelectorAll(".filter");
const matchCards = document.querySelectorAll(".match-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedFilter = filter.dataset.filter;

        matchCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedFilter === "todos" ||
                selectedFilter === category
            ) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 10);

            } else {

                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 200);

            }

        });

    });

});


/* =====================================================
   BOTÕES DE DETALHES
===================================================== */

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".match-card");

        const teams = card.querySelectorAll(".match-teams strong");

        const homeTeam = teams[0].textContent;
        const awayTeam = teams[1].textContent;

        alert(
            `Partida selecionada:\n\n${homeTeam} x ${awayTeam}\n\nOs detalhes da partida poderão ser carregados através de uma API de futebol.`
        );

    });

});


/* =====================================================
   SELETOR DE CAMPEONATO
===================================================== */

const leagueSelect = document.getElementById("leagueSelect");

leagueSelect.addEventListener("change", () => {

    const league = leagueSelect.value;

    if (league === "premier") {

        alert(
            "Tabela da Premier League selecionada.\n\nAqui você poderá carregar os dados através de uma API."
        );

    } else {

        alert(
            "Tabela do Brasileirão selecionada."
        );

    }

});


/* =====================================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================================== */

const animatedElements = document.querySelectorAll(
    ".match-card, .news-card, .player-card, .stat-box"
);

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);

animatedElements.forEach(element => {

    element.classList.add("animate");

    observer.observe(element);

});


/* =====================================================
   ANO AUTOMÁTICO DO FOOTER
===================================================== */

const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} FutebolNews. Todos os direitos reservados.`;

}


/* =====================================================
   EFEITO DE SCROLL NO HEADER
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,.25)";

    } else {

        header.style.boxShadow = "none";

    }

});
