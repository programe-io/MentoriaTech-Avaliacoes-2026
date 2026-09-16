/* ==========================================
   MINEFEED — GOTHAM / BATMAN STYLE
   script.js
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       CURTIDAS
       ========================================== */

    const botoesCurtir = document.querySelectorAll(".actions span");

    botoesCurtir.forEach((botao) => {

        if (botao.textContent.includes("Curtir")) {

            botao.addEventListener("click", () => {

                if (!botao.dataset.curtidas) {
                    botao.dataset.curtidas = "0";
                }

                let curtidas = Number(botao.dataset.curtidas);

                if (!botao.classList.contains("curtido")) {

                    curtidas++;

                    botao.classList.add("curtido");

                    botao.innerHTML = `💛 Curtido (${curtidas})`;

                } else {

                    curtidas--;

                    botao.classList.remove("curtido");

                    botao.innerHTML =
                        curtidas > 0
                            ? `🖤 Curtir (${curtidas})`
                            : "🖤 Curtir";
                }

            });

        }

    });


    /* ==========================================
       COMENTÁRIOS
       ========================================== */

    document.querySelectorAll(".actions span").forEach((botao) => {

        if (botao.textContent.includes("Comentar")) {

            botao.addEventListener("click", () => {

                const comentario = prompt(
                    "💬 Digite seu comentário sobre Gotham:"
                );

                if (comentario && comentario.trim() !== "") {

                    const post = botao.closest(".post");

                    const novoComentario =
                        document.createElement("div");

                    novoComentario.className =
                        "comentario";

                    novoComentario.innerHTML = `
                        <strong>Você</strong>
                        <p>${escapeHTML(comentario)}</p>
                    `;

                    novoComentario.style.cssText = `
                        padding: 12px 18px;
                        border-top: 1px solid #272d36;
                        background: #0b0e13;
                        color: #ccc;
                        font-family: Arial, sans-serif;
                    `;

                    post.appendChild(novoComentario);
                }

            });

        }

    });


    /* ==========================================
       COMPARTILHAR
       ========================================== */

    document.querySelectorAll(".actions span").forEach((botao) => {

        if (botao.textContent.includes("Compartilhar")) {

            botao.addEventListener("click", async () => {

                const url = window.location.href;

                try {

                    await navigator.clipboard.writeText(url);

                    const textoOriginal =
                        botao.innerHTML;

                    botao.innerHTML =
                        "✅ Link copiado!";

                    setTimeout(() => {
                        botao.innerHTML = textoOriginal;
                    }, 2000);

                } catch {

                    alert(
                        "📡 Não foi possível copiar o link."
                    );

                }

            });

        }

    });


    /* ==========================================
       EFEITO BAT-SINAL
       ========================================== */

    const logo = document.querySelector(".bat-symbol");

    if (logo) {

        logo.addEventListener("click", () => {

            document.body.classList.toggle(
                "bat-sinal"
            );

        });

    }


    /* ==========================================
       CARREGAR NOVOS POSTS
       ========================================== */

    const feed = document.querySelector("#feed");

    const postsGotham = [

        {
            usuario: "Gotham Daily",
            avatar: "G",
            tempo: "agora",
            texto:
                "A noite caiu sobre Gotham. As ruas estão mais movimentadas do que o normal.",
            imagem:
                "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80"
        },

        {
            usuario: "Wayne Industries",
            avatar: "W",
            tempo: "há 5 min",
            texto:
                "Tecnologia e inovação continuam transformando Gotham.",
            imagem:
                "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80"
        },

        {
            usuario: "Gotham Reporter",
            avatar: "R",
            tempo: "há 15 min",
            texto:
                "O horizonte de Gotham nunca dorme.",
            imagem:
                "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80"
        }

    ];


    function criarPost(post) {

        const article =
            document.createElement("article");

        article.className = "post";

        article.innerHTML = `

            <div class="post-header">

                <div class="avatar">
                    ${escapeHTML(post.avatar)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(post.usuario)}
                    </strong>

                    <br>

                    <small>
                        @gotham • ${escapeHTML(post.tempo)}
                    </small>

                </div>

            </div>

            <div class="post-content">

                <p>
                    ${escapeHTML(post.texto)}
                </p>

            </div>

            <img
                class="post-image"
                src="${post.imagem}"
                alt="Imagem de Gotham"
            >

            <div class="actions">

                <span>
                    🖤 Curtir
                </span>

                <span>
                    💬 Comentar
                </span>

                <span>
                    ↗ Compartilhar
                </span>

            </div>
        `;

        return article;
    }


    /* ==========================================
       BOTÃO "CARREGAR MAIS"
       ========================================== */

    const botaoMais =
        document.createElement("button");

    botaoMais.textContent =
        "🦇 CARREGAR MAIS POSTS";

    botaoMais.style.cssText = `
        display: block;
        margin: 20px auto 40px;
        padding: 14px 25px;
        background: #f5c400;
        color: #050608;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        letter-spacing: 1px;
    `;

    if (feed) {

        feed.parentNode.insertBefore(
            botaoMais,
            feed.nextSibling
        );

    }


    botaoMais.addEventListener("click", () => {

        postsGotham.forEach((post) => {

            const novoPost =
                criarPost(post);

            feed.appendChild(novoPost);

        });

        ativarInteracoes();

    });


    /* ==========================================
       PESQUISA DO MINEFEED
       ========================================== */

    const pesquisa =
        document.querySelector("#pesquisa");

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            () => {

                const termo =
                    pesquisa.value.toLowerCase();

                document
                    .querySelectorAll(".post")
                    .forEach((post) => {

                        const texto =
                            post.textContent.toLowerCase();

                        post.style.display =
                            texto.includes(termo)
                                ? "block"
                                : "none";

                    });

            }
        );

    }


    /* ==========================================
       FUNÇÃO DE INTERAÇÕES
       ========================================== */

    function ativarInteracoes() {

        document
            .querySelectorAll(".actions span")
            .forEach((botao) => {

                if (botao.dataset.ativo) {
                    return;
                }

                botao.dataset.ativo = "true";

                if (
                    botao.textContent.includes("Curtir")
                ) {

                    botao.addEventListener(
                        "click",
                        () => {

                            botao.classList.toggle(
                                "curtido"
                            );

                            if (
                                botao.classList.contains(
                                    "curtido"
                                )
                            ) {

                                botao.innerHTML =
                                    "💛 Curtido";

                            } else {

                                botao.innerHTML =
                                    "🖤 Curtir";

                            }

                        }
                    );

                }

            });

    }


    /* ==========================================
       SEGURANÇA PARA TEXTO DO USUÁRIO
       ========================================== */

    function escapeHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;
    }


    /* ==========================================
       ANIMAÇÃO DE ENTRADA
       ========================================== */

    const observer =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.style.opacity =
                            "1";

                        entrada.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    document
        .querySelectorAll(".post")
        .forEach((post) => {

            post.style.opacity = "0";

            post.style.transform =
                "translateY(25px)";

            post.style.transition =
                "opacity .5s ease, transform .5s ease";

            observer.observe(post);

        });

});
