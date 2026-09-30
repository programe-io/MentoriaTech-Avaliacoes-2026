document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Botão de Rolagem Suave (Hero para Seção de Filmes)
    const btnExplore = document.getElementById("btn-explore");
    const moviesSection = document.getElementById("movies-section");

    btnExplore.addEventListener("click", () => {
        moviesSection.scrollIntoView({ behavior: "smooth" });
    });

    // 2. Filtro Interativo de Filmes via Menu de Navegação
    const navLinks = document.querySelectorAll(".nav-link");
    const movieCards = document.querySelectorAll(".movie-card");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove a classe ativa de todos os links e adiciona ao clicado
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Pega o alvo do filtro (all, homecoming, farfromhome, nowayhome)
            const target = link.getAttribute("data-target");

            // Lógica do filtro
            movieCards.forEach(card => {
                const movieCategory = card.getAttribute("data-movie");

                if (target === "all" || target === movieCategory) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });

            // Rola automaticamente para a seção se o usuário clicar no menu
            moviesSection.scrollIntoView({ behavior: "smooth" });
        });
    });
});
