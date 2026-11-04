
let currentCategory = "Todos";

// Alternar tema escuro
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Filtrar artigos por categoria
function filterPosts(category, button) {
    currentCategory = category;

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    searchPosts();
}

// Pesquisar artigos
function searchPosts() {
    const search = document.getElementById("search")
        .value.toLowerCase();

    const posts = document.querySelectorAll(".post");
    let visible = 0;

    posts.forEach(post => {
        const matchesCategory =
            currentCategory === "Todos" ||
            post.dataset.category === currentCategory;

        const matchesSearch =
            post.innerText.toLowerCase().includes(search);

        const show = matchesCategory && matchesSearch;

        post.style.display = show ? "block" : "none";

        if (show) visible++;
    });

    document.getElementById("empty").hidden = visible > 0;
}

// Evento da pesquisa
document.getElementById("search")
    .addEventListener("input", searchPosts);

// Abrir artigo
function readPost(title, content) {
    const articleWindow = window.open("", "_blank");

    if (!articleWindow) {
        alert("Permita a abertura de novas abas para ler o artigo.");
        return;
    }

    articleWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${title}</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 750px;
                    margin: 60px auto;
                    padding: 20px;
                    background: #f8fafc;
                    color: #172033;
                    line-height: 1.8;
                }

                h1 {
                    color: #6558e8;
                }
            </style>
        </head>

        <body>
            <h1>${title}</h1>
            <p>${content}</p>
            <a href="#" onclick="window.close()">Voltar</a>
        </body>
        </html>
    `);

    articleWindow.document.close();
}
