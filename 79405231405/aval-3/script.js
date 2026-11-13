document.addEventListener("DOMContentLoaded", () => {

    // 1. BOTÃO DE CURTIR (Coração fica vermelho e atualiza o texto de curtidas)
    const botoesCurtir = document.querySelectorAll(".bx-heart");

    botoesCurtir.forEach((icone) => {
        const botao = icone.parentElement;
        const post = botao.closest("article");

        // Ignora os ícones de coração que ficam no cabeçalho ou na barra inferior
        if (!post) return;

        let curtido = false;

        botao.addEventListener("click", () => {
            curtido = !curtido;
            // Seleciona o parágrafo de curtidas dentro da mesma postagem
            const textoCurtidas = post.querySelector("p");

            if (curtido) {
                icone.classList.remove("bx-heart");
                icone.classList.add("bxs-heart"); // Ícone preenchido do Boxicons
                icone.style.color = "#ef4444";     // Vermelho
                if (textoCurtidas) {
                    textoCurtidas.textContent = "Você e outras mil e poucas pessoas curtiram";
                }
            } else {
                icone.classList.remove("bxs-heart");
                icone.classList.add("bx-heart");   // Ícone vazado do Boxicons
                icone.style.color = "";
                if (textoCurtidas) {
                    textoCurtidas.textContent = "mil e poucas curtidas";
                }
            }
        });
    });

    // 2. BOTÃO DE SALVAR POSTAGEM (Bookmark)
    const botoesSalvar = document.querySelectorAll(".bx-bookmark");

    botoesSalvar.forEach((icone) => {
        const botao = icone.parentElement;
        let salvo = false;

        botao.addEventListener("click", () => {
            salvo = !salvo;

            if (salvo) {
                icone.classList.remove("bx-bookmark");
                icone.classList.add("bxs-bookmark"); // Ícone preenchido
            } else {
                icone.classList.remove("bxs-bookmark");
                icone.classList.add("bx-bookmark");
            }
        });
    });

    // 3. BOTÃO DE COMENTAR (Adiciona um comentário direto na postagem)
    const botoesComentar = document.querySelectorAll(".bx-message-rounded");

    botoesComentar.forEach((icone) => {
        const botao = icone.parentElement;
        const post = botao.closest("article");

        botao.addEventListener("click", () => {
            const comentario = prompt("Escreva um comentário para frojo_dev:");

            if (comentario && comentario.trim() !== "") {
                const novoComentario = document.createElement("p");
                novoComentario.style.fontSize = "14px";
                novoComentario.style.marginTop = "6px";
                novoComentario.innerHTML = `<strong>voce_dev</strong> <span style="opacity: 0.85;">${comentario}</span>`;

                // Insere o comentário logo antes do horário da postagem ("HÁ DUAS HORAS")
                const horario = post.querySelector(".uppercase, .post-time");
                if (horario) {
                    horario.insertAdjacentElement("beforebegin", novoComentario);
                } else {
                    post.appendChild(novoComentario);
                }
            }
        });
    });

    // 4. FILTRO DE PESQUISA NO CABEÇALHO DESKTOP
    const campoPesquisa = document.querySelector("header input");

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", (evento) => {
            const termo = evento.target.value.toLowerCase();
            const postagens = document.querySelectorAll("article");

            postagens.forEach((post) => {
                const conteudoTexto = post.textContent.toLowerCase();
                if (conteudoTexto.includes(termo)) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });
        });
    }

});
