document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleção de Elementos Principais
    const postForm = document.querySelector(".post-form");
    const feedInput = document.querySelector(".feed-input");
    const timeline = document.querySelector(".timeline");

    // 2. Evento para Criar Nova Publicação
    postForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede a página de recarregar ao enviar o formulário

        const textContent = feedInput.value.trim();

        // Validação: não permite publicação vazia
        if (textContent === "") {
            alert("Por favor, digite algo antes de postar!");
            return;
        }

        // Cria o elemento da nova postagem baseada na estrutura do feed
        const newPost = document.createElement("article");
        newPost.classList.add("feed-card");

        // Insere a estrutura interna HTML preenchendo com o texto digitado
        newPost.innerHTML = `
            <header class="card-header">
                <div class="author-info">
                    <div class="avatar-circle">M</div>
                    <div>
                        <h2 class="author-name">Minha Conta</h2>
                        <time class="post-time">agora mesmo</time>
                    </div>
                </div>
            </header>
            
            <div class="card-body">
                <p class="post-content">${escapeHTML(textContent)}</p>
            </div>

            <footer class="card-footer">
                <button class="btn-interaction btn-like">❤️ <span>Gostei</span></button>
                <button class="btn-interaction">💬 <span>Responder</span></button>
            </footer>
        `;

        // Adiciona o novo card no topo da linha do tempo (timeline)
        timeline.prepend(newPost);

        // Limpa o campo de texto e devolve o foco para ele
        feedInput.value = "";
        feedInput.focus();

        // Configura o botão de curtir para este novo card criado
        setupLikeButton(newPost.querySelector(".btn-like"));
    });

    // 3. Sistema Dinâmico de Curtidas (Para posts existentes e novos)
    function setupLikeButton(button) {
        button.addEventListener("click", () => {
            const spanText = button.querySelector("span");
            
            // Alterna o estado visual utilizando classes ou manipulação direta
            button.classList.toggle("liked");

            if (button.classList.contains("liked")) {
                button.style.color = "#ff4757"; // Muda o texto para vermelho
                spanText.textContent = "Curtido!";
            } else {
                button.style.color = "var(--text-secondary)"; // Volta para a cor padrão
                spanText.textContent = "Gostei";
            }
        });
    }

    // Aplica a lógica de clique em todos os botões de curtir iniciais da página
    document.querySelectorAll(".btn-interaction:first-child").forEach(button => {
        setupLikeButton(button);
    });

    // 4. Segurança: Função auxiliar para evitar que códigos maliciosos (XSS) quebrem o layout
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});
