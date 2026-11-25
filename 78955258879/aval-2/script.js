
// Função para curtir notícias
function likeNews(button) {
    const counter = button.querySelector("span");

    let likes = Number(counter.textContent);

    likes++;

    counter.textContent = likes;
}

// Função para pesquisar notícias
function searchNews() {
    const input = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".news-card");

    cards.forEach(card => {
        const title = card.querySelector("h2")
            .textContent.toLowerCase();

        const description = card.querySelector("p")
            .textContent.toLowerCase();

        if (
            title.includes(input) ||
            description.includes(input)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Pesquisar também ao pressionar Enter
document.getElementById("searchInput")
    .addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchNews();
        }
    });
