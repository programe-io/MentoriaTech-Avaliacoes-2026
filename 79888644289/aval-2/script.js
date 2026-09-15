```javascript
/* =========================================
   MOTOFEEED - JAVASCRIPT
   ========================================= */


/* =========================================
   1. CURTIR / DESCURTIR PUBLICAÇÃO
   ========================================= */

function curtir(botao) {

    const contador = botao.querySelector("span");

    let numero = parseInt(contador.textContent) || 0;

    if (botao.classList.contains("curtido")) {

        numero--;

        botao.classList.remove("curtido");

        botao.innerHTML = `❤️ Curtir <span>${numero}</span>`;

    } else {

        numero++;

        botao.classList.add("curtido");

        botao.innerHTML = `❤️ Curtido <span>${numero}</span>`;

    }
}


/* =========================================
   2. MOSTRAR / ESCONDER COMENTÁRIOS
   ========================================= */

function mostrarComentarios(botao) {

    const post = botao.closest(".post");

    if (!post) return;

    const comentarios =
        post.querySelector(".comentarios");

    if (!comentarios) return;

    if (comentarios.style.display === "block") {

        comentarios.style.display = "none";

    } else {

        comentarios.style.display = "block";

        const input =
            comentarios.querySelector("input");

        if (input) {
            input.focus();
        }
    }
}


/* =========================================
   3. ADICIONAR COMENTÁRIO
   ========================================= */

function adicionarComentario(botao) {

    const area =
        botao.closest(".comentarios");

    if (!area) return;

    const input =
        area.querySelector("input");

    const lista =
        area.querySelector(".lista");

    if (!input || !lista) return;

    const texto =
        input.value.trim();

    if (texto === "") {

        alert("⚠️ Digite um comentário!");

        input.focus();

        return;
    }

    const comentario =
        document.createElement("div");

    comentario.className = "comentario";

    comentario.innerHTML = `
        👤 <strong>Você:</strong>
        ${escaparHTML(texto)}
    `;

    lista.appendChild(comentario);

    input.value = "";

    input.focus();
}


/* =========================================
   4. PROTEGER TEXTO DOS COMENTÁRIOS
   ========================================= */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;
}


/* =========================================
   5. AMPLIAR IMAGEM
   ========================================= */

function ampliar(imagem) {

    const modal =
        document.getElementById("modal");

    const imagemAmpliada =
        document.getElementById("imagemAmpliada");

    if (!modal || !imagemAmpliada) return;

    imagemAmpliada.src = imagem.src;

    imagemAmpliada.alt =
        imagem.alt || "Imagem ampliada";

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


/* =========================================
   6. FECHAR MODAL
   ========================================= */

function fecharModal() {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "auto";
}


/* =========================================
   7. FECHAR IMAGEM COM ESC
   ========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        fecharModal();

    }

});


/* =========================================
   8. COMPARTILHAR
   ========================================= */

function compartilhar() {

    const texto =
        "🏍️ Confira essa publicação incrível no MotoFeed!";

    const url =
        window.location.href;

    if (navigator.share) {

        navigator.share({

            title: "MotoFeed 🏍️",

            text: texto,

            url: url

        }).catch(function() {

            console.log(
                "Compartilhamento cancelado."
            );

        });

    } else {

        copiarTexto(url);

        alert(
            "🔗 Link copiado! Agora você pode compartilhar."
        );

    }
}


/* =========================================
   9. COPIAR TEXTO
   ========================================= */

function copiarTexto(texto) {

    if (navigator.clipboard) {

        navigator.clipboard.writeText(texto);

    } else {

        const area =
            document.createElement("textarea");

        area.value = texto;

        document.body.appendChild(area);

        area.select();

        document.execCommand("copy");

        area.remove();
    }
}


/* =========================================
   10. PESQUISAR POSTS
   ========================================= */

function pesquisar() {

    const campo =
        document.getElementById("pesquisa");

    if (!campo) return;

    const pesquisa =
        campo.value
        .toLowerCase()
        .trim();

    const posts =
        document.querySelectorAll(".post");

    posts.forEach(function(post) {

        const texto =
            post.innerText.toLowerCase();

        if (texto.includes(pesquisa)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });
}


/* =========================================
   11. PUBLICAR NOVO POST
   ========================================= */

function publicar() {

    const campo =
        document.getElementById("textoPost");

    if (!campo) return;

    const texto =
        campo.value.trim();

    if (texto === "") {

        alert(
            "⚠️ Escreva alguma coisa antes de publicar!"
        );

        campo.focus();

        return;
    }

    const novoPost =
        document.createElement("div");

    novoPost.className = "card post";

    novoPost.innerHTML = `

        <div class="perfil">

            <div class="avatar">
                🏍️
            </div>

            <div>
                <strong>Você</strong>
                <small> · Agora</small>
            </div>

        </div>

        <p>
            ${escaparHTML(texto)}
        </p>

        <div
            style="
                background:
                linear-gradient(135deg,#222,#111);
                padding:45px;
                text-align:center;
                border-radius:15px;
                margin:18px 0;
                font-size:65px;
            "
        >
            🏍️
        </div>

        <div class="acoes">

            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="mostrarComentarios(this)">
                💬 Comentários
            </button>

            <button onclick="compartilhar()">
                📤 Compartilhar
            </button>

        </div>

        <div class="comentarios">

            <input
                type="text"
                placeholder="Escreva um comentário..."
                onkeydown="comentarioEnter(event, this)"
            >

            <button onclick="adicionarComentario(this)">
                Enviar
            </button>

            <div class="lista"></div>

        </div>
    `;

    const container =
        document.querySelector(".container");

    if (!container) return;

    container.appendChild(novoPost);

    campo.value = "";

    novoPost.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    mostrarMensagem(
        "✅ Publicação criada com sucesso!"
    );
}


/* =========================================
   12. COMENTÁRIO COM ENTER
   ========================================= */

function comentarioEnter(event, input) {

    if (event.key === "Enter") {

        event.preventDefault();

        const botao =
            input.parentElement.querySelector("button");

        if (botao) {

            adicionarComentario(botao);

        }
    }
}


/* =========================================
   13. MENSAGEM TEMPORÁRIA
   ========================================= */

function mostrarMensagem(texto) {

    const mensagem =
        document.createElement("div");

    mensagem.textContent = texto;

    mensagem.style.position = "fixed";

    mensagem.style.bottom = "25px";

    mensagem.style.left = "50%";

    mensagem.style.transform =
        "translateX(-50%)";

    mensagem.style.background = "#ff4d00";

    mensagem.style.color = "white";

    mensagem.style.padding =
        "14px 22px";

    mensagem.style.borderRadius =
        "12px";

    mensagem.style.fontWeight =
        "bold";

    mensagem.style.zIndex = "10000";

    mensagem.style.boxShadow =
        "0 8px 25px rgba(0,0,0,.5)";

    document.body.appendChild(mensagem);

    setTimeout(function() {

        mensagem.style.opacity = "0";

        mensagem.style.transition =
            "opacity .3s";

        setTimeout(function() {

            mensagem.remove();

        }, 300);

    }, 2000);
}


/* =========================================
   14. CLICAR NA IMAGEM
   ========================================= */

document.addEventListener("click", function(event) {

    if (
        event.target.classList.contains("moto-img")
    ) {

        ampliar(event.target);

    }

});


/* =========================================
   15. CLICAR FORA DA IMAGEM PARA FECHAR
   ========================================= */

document.addEventListener("click", function(event) {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    if (event.target === modal) {

        fecharModal();

    }

});


/* =========================================
   16. PESQUISA EM TEMPO REAL
   ========================================= */

const campoPesquisa =
    document.getElementById("pesquisa");

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        pesquisar
    );
}


/* =========================================
   17. SALVAR CURTIDAS NO NAVEGADOR
   ========================================= */

function salvarCurtidas() {

    const curtidas = [];

    document
        .querySelectorAll(".post")
        .forEach(function(post, index) {

            const botao =
                post.querySelector(
                    ".acoes button"
                );

            if (botao) {

                curtidas[index] =
                    botao.classList.contains("curtido");

            }

        });

    localStorage.setItem(
        "motoFeedCurtidas",
        JSON.stringify(curtidas)
    );
}


/* =========================================
   18. RECUPERAR CURTIDAS
   ========================================= */

function carregarCurtidas() {

    const dados =
        localStorage.getItem(
            "motoFeedCurtidas"
        );

    if (!dados) return;

    try {

        const curtidas =
            JSON.parse(dados);

        document
            .querySelectorAll(".post")
            .forEach(function(post, index) {

                const botao =
                    post.querySelector(
                        ".acoes button"
                    );

                if (
                    botao &&
                    curtidas[index]
                ) {

                    botao.classList.add(
                        "curtido"
                    );

                    const contador =
                        botao.querySelector("span");

                    if (contador) {

                        let numero =
                            parseInt(
                                contador.textContent
                            ) || 0;

                        if (numero === 0) {

                            contador.textContent = "1";

                        }

                    }
                }

            });

    } catch (erro) {

        console.log(
            "Não foi possível carregar as curtidas."
        );

    }
}


/* =========================================
   19. SALVAR QUANDO CURTIR
   ========================================= */

document.addEventListener("click", function(event) {

    if (
        event.target.closest(
            ".acoes button"
        )
    ) {

        const botao =
            event.target.closest(
                ".acoes button"
            );

        if (
            botao &&
            botao.textContent.includes("Curt")
        ) {

            setTimeout(
                salvarCurtidas,
                50
            );

        }

    }

});


/* =========================================
   20. INICIALIZAÇÃO
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarCurtidas();

        console.log(
            "🏍️ MotoFeed carregado com sucesso!"
        );

    }
);
```
