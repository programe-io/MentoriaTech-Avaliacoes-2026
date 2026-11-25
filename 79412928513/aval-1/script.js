
const title = document.getElementById("title");
const category = document.getElementById("category");
const image = document.getElementById("image");
const content = document.getElementById("content");
const publish = document.getElementById("publish");
const articleList = document.getElementById("articleList");

let articles = JSON.parse(
    localStorage.getItem("blogArticles")
) || [];

const user = {
    name: "Meu Perfil"
};

// SALVAR ARTIGOS
function saveArticles() {
    localStorage.setItem(
        "blogArticles",
        JSON.stringify(articles)
    );
}

// PUBLICAR ARTIGO
publish.addEventListener("click", () => {

    const articleTitle = title.value.trim();
    const articleContent = content.value.trim();

    if (!articleTitle || !articleContent) {
        alert("Preencha o título e o conteúdo!");
        return;
    }

    const article = {
        id: Date.now() + Math.random(),
        title: articleTitle,
        category: category.value.trim() || "Geral",
        image: image.value.trim(),
        content: articleContent,
        author: user.name,
        date: new Date().toLocaleDateString("pt-BR"),
        likes: 0,
        liked: false,
        comments: []
    };

    articles.unshift(article);

    saveArticles();
    renderArticles();

    title.value = "";
    category.value = "";
    image.value = "";
    content.value = "";

});

// MOSTRAR ARTIGOS
function renderArticles() {

    articleList.innerHTML = "";

    if (articles.length === 0) {
        articleList.textContent = "Nenhum artigo publicado ainda.";
        return;
    }

    articles.forEach(article => {

        const card = document.createElement("article");
        card.className = "article";

        // IMAGEM
        if (article.image) {
            const img = document.createElement("img");
            img.className = "article-image";
            img.src = article.image;
            img.alt = article.title;
            img.onerror = () => img.remove();
            card.appendChild(img);
        }

        const body = document.createElement("div");
        body.className = "article-content";

        const cat = document.createElement("span");
        cat.className = "category";
        cat.textContent = article.category;

        const heading = document.createElement("h3");
        heading.textContent = article.title;

        const description = document.createElement("p");
        description.className = "description";
        description.textContent = article.content;

        const author = document.createElement("small");
        author.textContent = `Por ${article.author} • ${article.date}`;

        const footer = document.createElement("div");
        footer.className = "article-footer";

        const like = document.createElement("button");
        like.className = article.liked ? "liked" : "";
        like.textContent =
            `${article.liked ? "❤️" : "♡"} ${article.likes} Curtidas`;

        like.addEventListener("click", () => {

            article.liked = !article.liked;
            article.likes += article.liked ? 1 : -1;

            saveArticles();
            renderArticles();

        });

        const actions = document.createElement("div");
        actions.className = "article-actions";

        const commentsButton = document.createElement("button");
        commentsButton.textContent =
            `💬 ${article.comments.length} Comentários`;

        commentsButton.addEventListener("click", () => {
            const comment = prompt("Digite seu comentário:");

            if (!comment || !comment.trim()) return;

            article.comments.push({
                author: user.name,
                text: comment.trim()
            });

            saveArticles();
            renderArticles();
        });

        actions.appendChild(commentsButton);

        // EXCLUIR
        if (article.author === user.name) {

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "Excluir";

            deleteButton.addEventListener("click", () => {

                if (!confirm("Deseja excluir este artigo?")) return;

                articles = articles.filter(
                    item => item.id !== article.id
                );

                saveArticles();
                renderArticles();

            });

            actions.appendChild(deleteButton);
        }

        footer.append(like, actions);

        body.append(
            cat,
            heading,
            description,
            author,
            footer
        );

        card.appendChild(body);

        // COMENTÁRIOS
        article.comments.forEach(comment => {

            const commentElement = document.createElement("p");
            commentElement.className = "description";

            commentElement.textContent =
                `${comment.author}: ${comment.text}`;

            body.appendChild(commentElement);

        });

        articleList.appendChild(card);

    });

}

// CARREGAR ARTIGOS SALVOS
renderArticles();
