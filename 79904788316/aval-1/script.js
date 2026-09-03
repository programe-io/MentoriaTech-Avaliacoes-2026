```javascript
/* =========================================================
   MICHAEL JACKSON MINI FEED
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarCurtidas();
    iniciarComentarios();
    iniciarMusicas();
    iniciarGaleria();
    iniciarPesquisa();
    iniciarMenu();
    iniciarAlbuns();

});


/* =========================================================
   1. CURTIDAS
========================================================= */

function iniciarCurtidas() {

    const botoes =
        document.querySelectorAll(".acoes button:first-child");

    botoes.forEach((botao, index) => {

        let curtido =
            localStorage.getItem("mj_curtida_" + index);

        let quantidade =
            localStorage.getItem("mj_likes_" + index);

        if (quantidade === null) {
            quantidade = 0;
        }

        const contador =
            botao.querySelector("span");

        contador.textContent = quantidade;

        if (curtido === "true") {
            botao.classList.add("curtido");
        }

        botao.onclick = function () {

            let numero =
                Number(contador.textContent);

            if (botao.classList.contains("curtido")) {

                numero--;

                botao.classList.remove("curtido");

                localStorage.setItem(
                    "mj_curtida_" + index,
                    "false"
                );

            } else {

                numero++;

                botao.classList.add("curtido");

                localStorage.setItem(
                    "mj_curtida_" + index,
                    "true"
                );

            }

            contador.textContent = numero;

            localStorage.setItem(
                "mj_likes_" + index,
                numero
            );

        };

    });

}


/* =========================================================
   2. COMENTÁRIOS
========================================================= */

function iniciarComentarios() {

    const posts =
        document.querySelectorAll(".post");

    posts.forEach((post, index) => {

        const input =
            post.querySelector(".comentarios input");

        const enviar =
            post.querySelector(".comentarios button");

        const lista =
            post.querySelector(".lista-comentarios");

        if (!input || !enviar || !lista) return;


        carregarComentarios(
            index,
            lista
        );


        enviar.onclick = () => {

            adicionarComentario(
                index,
                input,
                lista
            );

        };


        input.addEventListener(
            "keydown",
            evento => {

                if (evento.key === "Enter") {

                    adicionarComentario(
                        index,
                        input,
                        lista
                    );

                }

            }
        );

    });

}


/* =========================================================
   ADICIONAR COMENTÁRIO
========================================================= */

function adicionarComentario(
    index,
    input,
    lista
) {

    const texto =
        input.value.trim();


    if (texto === "") {

        mostrarAviso(
            "Digite um comentário!"
        );

        input.focus();

        return;

    }


    const comentarios =
        JSON.parse(
            localStorage.getItem(
                "mj_comentarios_" + index
            ) || "[]"
        );


    comentarios.push(texto);


    localStorage.setItem(
        "mj_comentarios_" + index,
        JSON.stringify(comentarios)
    );


    input.value = "";


    atualizarComentarios(
        index,
        lista
    );

}


/* =========================================================
   ATUALIZAR COMENTÁRIOS
========================================================= */

function atualizarComentarios(
    index,
    lista
) {

    lista.innerHTML = "";


    const comentarios =
        JSON.parse(
            localStorage.getItem(
                "mj_comentarios_" + index
            ) || "[]"
        );


    comentarios.forEach(
        (texto, numero) => {

            const comentario =
                document.createElement("div");

            comentario.className =
                "comentario";


            const span =
                document.createElement("span");

            span.textContent =
                "💬 " + texto;


            const apagar =
                document.createElement("button");

            apagar.textContent = "×";

            apagar.title =
                "Apagar comentário";


            apagar.style.float = "right";

            apagar.style.background =
                "transparent";

            apagar.style.border =
                "none";

            apagar.style.color =
                "#888";

            apagar.style.cursor =
                "pointer";

            apagar.style.fontSize =
                "18px";


            apagar.onclick = () => {

                apagarComentario(
                    index,
                    numero,
                    lista
                );

            };


            comentario.appendChild(span);

            comentario.appendChild(apagar);

            lista.appendChild(comentario);

        }
    );

}


/* =========================================================
   CARREGAR COMENTÁRIOS
========================================================= */

function carregarComentarios(
    index,
    lista
) {

    atualizarComentarios(
        index,
        lista
    );

}


/* =========================================================
   APAGAR COMENTÁRIO
========================================================= */

function apagarComentario(
    index,
    numero,
    lista
) {

    const comentarios =
        JSON.parse(
            localStorage.getItem(
                "mj_comentarios_" + index
            ) || "[]"
        );


    comentarios.splice(
        numero,
        1
    );


    localStorage.setItem(
        "mj_comentarios_" + index,
        JSON.stringify(comentarios)
    );


    atualizarComentarios(
        index,
        lista
    );

}


/* =========================================================
   3. BOTÃO COMENTAR
========================================================= */

function focarComentario(botao) {

    const post =
        botao.closest(".post");


    if (!post) return;


    const input =
        post.querySelector(
            ".comentarios input"
        );


    if (input) {

        input.focus();

        input.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


/* =========================================================
   4. MÚSICAS
========================================================= */

function iniciarMusicas() {

    const players =
        document.querySelectorAll("audio");


    players.forEach(player => {

        player.addEventListener(
            "play",
            () => {

                players.forEach(
                    outro => {

                        if (outro !== player) {

                            outro.pause();

                        }

                    }
                );

            }
        );


        player.addEventListener(
            "error",
            () => {

                mostrarAviso(
                    "Não foi possível carregar esta música. Verifique o link do áudio."
                );

            }
        );

    });

}


/* =========================================================
   5. GALERIA
========================================================= */

function iniciarGaleria() {

    const imagens =
        document.querySelectorAll(
            ".galeria img"
        );


    imagens.forEach(imagem => {

        imagem.addEventListener(
            "click",
            () => {

                abrirImagem(
                    imagem.src,
                    imagem.alt
                );

            }
        );

    });

}


/* =========================================================
   VISUALIZADOR DE FOTO
========================================================= */

function abrirImagem(
    src,
    alt
) {

    const fundo =
        document.createElement("div");


    fundo.style.position =
        "fixed";

    fundo.style.inset = "0";

    fundo.style.background =
        "rgba(0,0,0,0.95)";

    fundo.style.zIndex =
        "99999";

    fundo.style.display =
        "flex";

    fundo.style.justifyContent =
        "center";

    fundo.style.alignItems =
        "center";

    fundo.style.padding =
        "20px";


    const imagem =
        document.createElement("img");


    imagem.src = src;

    imagem.alt = alt;


    imagem.style.maxWidth =
        "95%";

    imagem.style.maxHeight =
        "90vh";

    imagem.style.objectFit =
        "contain";

    imagem.style.borderRadius =
        "12px";


    const fechar =
        document.createElement("button");


    fechar.textContent = "×";


    fechar.style.position =
        "absolute";

    fechar.style.top = "15px";

    fechar.style.right = "25px";

    fechar.style.background =
        "transparent";

    fechar.style.border = "none";

    fechar.style.color = "white";

    fechar.style.fontSize = "50px";

    fechar.style.cursor = "pointer";


    fundo.appendChild(imagem);

    fundo.appendChild(fechar);

    document.body.appendChild(fundo);


    fechar.onclick =
        () => fundo.remove();


    fundo.onclick =
        evento => {

            if (
                evento.target === fundo
            ) {

                fundo.remove();

            }

        };


    document.addEventListener(
        "keydown",
        fecharESC
    );


    function fecharESC(evento) {

        if (evento.key === "Escape") {

            fundo.remove();

            document.removeEventListener(
                "keydown",
                fecharESC
            );

        }

    }

}


/* =========================================================
   6. PESQUISA
========================================================= */

function iniciarPesquisa() {

    const campo =
        document.getElementById(
            "pesquisa"
        );


    if (!campo) return;


    campo.addEventListener(
        "input",
        pesquisarPosts
    );

}


function pesquisarPosts() {

    const campo =
        document.getElementById(
            "pesquisa"
        );


    const texto =
        campo.value
            .toLowerCase()
            .trim();


    const posts =
        document.querySelectorAll(
            ".post"
        );


    posts.forEach(post => {

        const conteudo =
            post.textContent
                .toLowerCase();


        if (
            conteudo.includes(texto)
        ) {

            post.style.display =
                "";

        } else {

            post.style.display =
                "none";

        }

    });

}


/* =========================================================
   7. MENU
========================================================= */

function iniciarMenu() {

    const links =
        document.querySelectorAll(
            "nav a"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            evento => {

                const destino =
                    link.getAttribute(
                        "href"
                    );


                if (
                    destino &&
                    destino.startsWith("#")
                ) {

                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (elemento) {

                        evento.preventDefault();


                        elemento.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    });

}


/* =========================================================
   8. ÁLBUNS
========================================================= */

function iniciarAlbuns() {

    const albuns =
        document.querySelectorAll(
            ".album"
        );


    albuns.forEach(album => {

        album.addEventListener(
            "click",
            () => {

                const nome =
                    album.querySelector(
                        "h3"
                    );


                if (nome) {

                    mostrarAviso(
                        "💿 Álbum: " +
                        nome.textContent
                    );

                }

            }
        );

    });

}


/* =========================================================
   9. CRIAR POST
========================================================= */

function criarNovoPost() {

    const texto =
        prompt(
            "Escreva o seu post:"
        );


    if (!texto || texto.trim() === "") {

        return;

    }


    const feed =
        document.getElementById(
            "listaPosts"
        );


    if (!feed) return;


    const post =
        document.createElement(
            "article"
        );


    post.className = "post";


    post.innerHTML = `

        <div class="post-top">

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg"
                alt="Michael Jackson"
            >

            <div>

                <strong>
                    Fã do Michael Jackson
                </strong>

                <br>

                <small>
                    Agora
                </small>

            </div>

        </div>


        <p>
            ${protegerHTML(texto)}
        </p>


        <div class="acoes">

            <button>
                ❤️ Curtir <span>0</span>
            </button>

            <button>
                💬 Comentar
            </button>

        </div>


        <div class="comentarios">

            <input
                type="text"
                placeholder="Escreva um comentário..."
            >

            <button>
                Enviar
            </button>

            <div class="lista-comentarios"></div>

        </div>

    `;


    feed.prepend(post);


    /*
       Reativa os botões do novo post.
    */

    iniciarNovoPost(post);


    mostrarAviso(
        "✅ Post publicado!"
    );

}


/* =========================================================
   ATIVAR NOVO POST
========================================================= */

function iniciarNovoPost(post) {

    const curtir =
        post.querySelector(
            ".acoes button:first-child"
        );


    const comentarBotao =
        post.querySelector(
            ".acoes button:nth-child(2)"
        );


    const enviar =
        post.querySelector(
            ".comentarios button"
        );


    const input =
        post.querySelector(
            ".comentarios input"
        );


    const lista =
        post.querySelector(
            ".lista-comentarios"
        );


    curtir.onclick =
        () => {

            const span =
                curtir.querySelector("span");

            let numero =
                Number(span.textContent);


            if (
                curtir.classList.contains(
                    "curtido"
                )
            ) {

                numero--;

                curtir.classList.remove(
                    "curtido"
                );

            } else {

                numero++;

                curtir.classList.add(
                    "curtido"
                );

            }


            span.textContent =
                numero;

        };


    comentarBotao.onclick =
        () => {

            input.focus();

        };


    enviar.onclick =
        () => {

            if (
                input.value.trim() === ""
            ) {

                mostrarAviso(
                    "Digite um comentário!"
                );

                return;

            }


            const comentario =
                document.createElement(
                    "div"
                );


            comentario.className =
                "comentario";


            comentario.textContent =
                "💬 " +
                input.value;


            lista.appendChild(
                comentario
            );


            input.value = "";

        };

}


/* =========================================================
   10. PROTEGER TEXTO
========================================================= */

function protegerHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        texto;


    return elemento.innerHTML;

}


/* =========================================================
   11. AVISOS
========================================================= */

function mostrarAviso(
    mensagem
) {

    const antigo =
        document.getElementById(
            "avisoMJ"
        );


    if (antigo) {

        antigo.remove();

    }


    const aviso =
        document.createElement(
            "div"
        );


    aviso.id =
        "avisoMJ";


    aviso.textContent =
        mensagem;


    aviso.style.position =
        "fixed";

    aviso.style.bottom =
        "25px";

    aviso.style.left =
        "50%";

    aviso.style.transform =
        "translateX(-50%)";

    aviso.style.background =
        "white";

    aviso.style.color =
        "black";

    aviso.style.padding =
        "13px 22px";

    aviso.style.borderRadius =
        "30px";

    aviso.style.fontWeight =
        "bold";

    aviso.style.zIndex =
        "99999";

    aviso.style.boxShadow =
        "0 5px 25px rgba(0,0,0,.5)";


    document.body.appendChild(
        aviso
    );


    setTimeout(
        () => {

            aviso.remove();

        },
        2500
    );

}


/* =========================================================
   12. TECLA /
   ABRE A PESQUISA
========================================================= */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "/" &&
            evento.target.tagName !== "INPUT"
        ) {

            evento.preventDefault();


            const pesquisa =
                document.getElementById(
                    "pesquisa"
                );


            if (pesquisa) {

                pesquisa.focus();

            }

        }

    }
);


/* =========================================================
   13. BOTÃO DE NOVO POST
========================================================= */

function adicionarBotaoPost() {

    const feed =
        document.querySelector(
            "#feed .titulo"
        );


    if (!feed) return;


    const botao =
        document.createElement(
            "button"
        );


    botao.textContent =
        "➕ Criar publicação";


    botao.style.marginTop =
        "15px";

    botao.style.padding =
        "12px 20px";

    botao.style.borderRadius =
        "25px";

    botao.style.border =
        "1px solid #555";

    botao.style.background =
        "#111";

    botao.style.color =
        "white";

    botao.style.cursor =
        "pointer";


    botao.onclick =
        criarNovoPost;


    feed.appendChild(
        botao
    );

}


/* =========================================================
   INICIAR BOTÃO DE POST
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        adicionarBotaoPost();

    }
);
```
