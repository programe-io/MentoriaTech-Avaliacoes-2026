```javascript
/* =========================================
   MICHAEL JACKSON FAN FEED
   JAVASCRIPT
========================================= */


/* =========================================
   BOTÕES DE CURTIR
========================================= */

const botoesCurtir = document.querySelectorAll(".acoes button:first-child");

botoesCurtir.forEach(function(botao) {

    let curtido = false;
    let contador = 0;

    botao.addEventListener("click", function() {

        if (curtido === false) {

            curtido = true;
            contador++;

            botao.innerHTML = "❤️ Curtido " + contador;

            botao.style.background = "#d00000";

        } else {

            curtido = false;
            contador--;

            botao.innerHTML = "🤍 Curtir";

            botao.style.background = "#151515";
        }

    });

});


/* =========================================
   BOTÃO DE COMENTAR
========================================= */

const botoesComentario =
    document.querySelectorAll(".acoes button:nth-child(2)");

botoesComentario.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const comentario = prompt(
            "Digite seu comentário sobre Michael Jackson:"
        );

        if (comentario !== null && comentario.trim() !== "") {

            alert(
                "💬 Seu comentário foi adicionado!\n\n" +
                comentario
            );

        }

    });

});


/* =========================================
   BOTÃO EXPLORAR
========================================= */

const botaoExplorar =
    document.querySelector(".hero-text button");

if (botaoExplorar) {

    botaoExplorar.addEventListener("click", function() {

        const feed = document.querySelector(".feed");

        feed.scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* =========================================
   EFEITO NAS FOTOS
========================================= */

const imagens = document.querySelectorAll(
    ".post img, .fotos img"
);

imagens.forEach(function(imagem) {

    imagem.addEventListener("click", function() {

        imagem.classList.toggle("imagem-grande");

    });

});


/* =========================================
   MENU DE NAVEGAÇÃO
========================================= */

const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const destino = link.getAttribute("href");

        if (destino.startsWith("#")) {

            event.preventDefault();

            const elemento =
                document.querySelector(destino);

            if (elemento) {

                elemento.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


/* =========================================
   ANIMAÇÃO DOS POSTS
========================================= */

const posts = document.querySelectorAll(".post");

const observador = new IntersectionObserver(
    function(entradas) {

        entradas.forEach(function(entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("mostrar");

            }

        });

    },
    {
        threshold: 0.15
    }
);


posts.forEach(function(post) {

    observador.observe(post);

});


/* =========================================
   MENSAGEM NO CONSOLE
========================================= */

console.log(
    "⭐ Michael Jackson Fan Feed carregado com sucesso!"
);

console.log(
    "🎤 Music • Dance • Legacy"
);
```
