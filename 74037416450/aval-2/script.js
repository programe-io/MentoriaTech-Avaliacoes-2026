/* ==========================================================================
   1. SISTEMA DE CURTIDAS (LIKE) COM ARMAZENAMENTO LOCAL
   ========================================================================== */
// Exemplo de estrutura HTML necessária dentro do <article>:
// <button class="btn-like" data-post-id="1">❤️ <span class="likes-count">0</span> Curtidas</button>

document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".btn-like");

    likeButtons.forEach(button => {
        const postId = button.getAttribute("data-post-id");
        const countSpan = button.querySelector(".likes-count");
        
        // Recupera curtidas já salvas no navegador do usuário, ou começa em 0
        let likes = localStorage.getItem(`post_likes_${postId}`) || 0;
        countSpan.textContent = likes;

        button.addEventListener("click", () => {
            likes++;
            countSpan.textContent = likes;
            // Salva o novo valor no LocalStorage para não sumir ao atualizar a página
            localStorage.setItem(`post_likes_${postId}`, likes);
            
            // Efeito visual simples de clique
            button.style.transform = "scale(1.1)";
            setTimeout(() => button.style.transform = "scale(1)", 150);
        });
    });
});

/* ==========================================================================
   2. MODO ESCURO / MODO CLARO (DARK MODE)
   ========================================================================== */
// Exemplo de botão para o menu ou header:
// <button id="toggle-dark-mode">🌙 Alternar Tema</button>

const darkModeToggle = document.getElementById("toggle-dark-mode");

if (darkModeToggle) {
    // Verifica se o usuário já tinha escolhido o modo escuro antes
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        // Salva a preferência do usuário
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

/* ==========================================================================
   3. SISTEMA DE BUSCA DE ARTIGOS (FILTRO DINÂMICO)
   ========================================================================== */
// Exemplo de input na barra lateral:
// <input type="text" id="search-input" placeholder="Buscar artigos...">

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const articles = document.querySelectorAll("main article");

        articles.forEach(article => {
            // Pega o título de cada artigo
            const title = article.querySelector("h2").textContent.toLowerCase();
            // Pega o texto do resumo
            const content = article.querySelector("p").textContent.toLowerCase();

            // Se o termo pesquisado estiver no título ou no conteúdo, mostra o artigo, senão esconde
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    });
}