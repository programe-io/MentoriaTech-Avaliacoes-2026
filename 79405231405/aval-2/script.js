document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const btnPublicar = document.querySelector(".new-post button");

    // 1. FUNCIONALIDADE DO BOTÃO "PUBLICAR" (Cria um novo post no feed)
    btnPublicar.addEventListener("click", () => {
        const textoPost = prompt("O que você está pensando?");

        // Verifica se o usuário digitou algo e não clicou em cancelar
        if (textoPost && textoPost.trim() !== "") {
            const novoPost = document.createElement("article");
            novoPost.classList.add("post");

            novoPost.innerHTML = `
                <div class="post-header">
                    <div class="avatar">U</div>
                    <div class="user-info">
                        <strong>Seu Nome</strong>
                        <span>agora mesmo</span>
                    </div>
                </div>
                <div class="post-text">
                    <p>${textoPost}</p>
                </div>
                <div class="post-actions">
                    <button type="button">Curtir</button>
                    <button type="button">Comentar</button>
                </div>
            `;

            // Insere a nova postagem logo abaixo da caixa de "nova publicação"
            const secaoNovaPostagem = document.querySelector(".new-post");
            secaoNovaPostagem.insertAdjacentElement("afterend", novoPost);

            // Ativa os botões de Curtir e Comentar nesse novo post
            ativarBotoesPost(novoPost);
        }
    });

    // 2. FUNCIONALIDADE DOS BOTÕES "CURTIR" E "COMENTAR"
    function ativarBotoesPost(post) {
        const botoes = post.querySelectorAll(".post-actions button");
        const btnCurtir = botoes[0];
        const btnComentar = botoes[1];

        let curtido = false;
        let totalCurtidas = 0;

        // Evento de Curtir / Descurtir
        btnCurtir.addEventListener("click", () => {
            curtido = !curtido;

            if (curtido) {
                totalCurtidas++;
                btnCurtir.textContent = `Curtido (${totalCurtidas})`;
                btnCurtir.style.color = "#1877f2";
            } else {
                totalCurtidas--;
                btnCurtir.textContent = "Curtir";
                btnCurtir.style.color = "#333333";
            }
        });

        // Evento de Comentar
        btnComentar.addEventListener("click", () => {
            const comentario = prompt("Escreva seu comentário:");

            if (comentario && comentario.trim() !== "") {
                // Cria uma área para exibir o comentário abaixo dos botões
                const pComentario = document.createElement("p");
                pComentario.innerHTML = `<strong>Seu Nome:</strong> ${comentario}`;
                pComentario.style.marginTop = "10px";
                pComentario.style.padding = "8px 12px";
                pComentario.style.backgroundColor = "#f0f2f5";
                pComentario.style.borderRadius = "6px";
                pComentario.style.fontSize = "14px";

                post.appendChild(pComentario);
            }
        });
    }

    // Ativa os botões em todos os posts que já existem na página
    const postsExistentes = document.querySelectorAll(".post");
    postsExistentes.forEach((post) => ativarBotoesPost(post));
});
