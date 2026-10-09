
document.addEventListener("DOMContentLoaded", () => {
    // Elementos principais do blog
    const body = document.body;
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");

    // Mensagem de boas-vindas
    console.log("Bem-vindo ao Meu Blog!");

    // Botão de modo escuro
    const darkButton = document.createElement("button");
    darkButton.textContent = "🌙 Modo escuro";
    darkButton.className = "js-button";

    nav.appendChild(darkButton);

    let darkMode = false;

    darkButton.addEventListener("click", () => {
        darkMode = !darkMode;

        body.style.backgroundColor = darkMode ? "#181818" : "#ffffff";
        body.style.color = darkMode ? "#f5f5f5" : "#222222";

        document.querySelectorAll("main, aside").forEach(element => {
            element.style.backgroundColor = darkMode
                ? "#242424"
                : element.tagName === "ASIDE" ? "#f1f1f1" : "#ffffff";

            element.style.color = darkMode ? "#f5f5f5" : "#222222";
        });

        darkButton.textContent = darkMode
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";
    });

    // Campo de pesquisa
    const searchBox = document.createElement("input");
    searchBox.type = "search";
    searchBox.placeholder = "🔎 Pesquisar postagem...";
    searchBox.setAttribute("aria-label", "Pesquisar postagem");
    searchBox.className = "js-search";

    nav.appendChild(searchBox);

    // Filtrar postagens pelo texto
    searchBox.addEventListener("input", () => {
        const searchText = searchBox.value.toLowerCase();

        const articles = document.querySelectorAll("main article");

        articles.forEach(article => {
            const content = article.textContent.toLowerCase();

            article.style.display = content.includes(searchText)
                ? ""
                : "none";
        });
    });

    // Efeito ao passar o mouse nas imagens falsas
    document.querySelectorAll(".fakeimg").forEach(image => {
        image.style.transition = "transform 0.25s ease";

        image.addEventListener("mouseenter", () => {
            image.style.transform = "scale(1.02)";
        });

        image.addEventListener("mouseleave", () => {
            image.style.transform = "scale(1)";
        });
    });

    // Atualizar o ano do rodapé
    if (footer) {
        const year = document.createElement("p");
        year.textContent = `© ${new Date().getFullYear()} - Meu Blog`;
        footer.appendChild(year);
    }

    // Botão para voltar ao topo
    const topButton = document.createElement("button");
    topButton.textContent = "⬆ Voltar ao topo";
    topButton.className = "js-button";
    topButton.style.position = "fixed";
    topButton.style.right = "20px";
    topButton.style.bottom = "20px";
    topButton.style.zIndex = "1000";

    body.appendChild(topButton);

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});