```javascript
// ============================================
// 👑 JAVASCRIPT - MINI FEED PRINCESINHA SOFIA
// ============================================


// 💜 FUNÇÃO DE CURTIR
function curtir(botao) {

    let contador = botao.querySelector("span");

    let numero = Number(contador.innerText);

    if (botao.classList.contains("liked")) {

        numero--;

        botao.classList.remove("liked");

    } else {

        numero++;

        botao.classList.add("liked");
    }

    contador.innerText = numero;
}



// 💬 MOSTRAR OU ESCONDER COMENTÁRIOS
function comentarios(botao) {

    let post = botao.closest(".post");

    let areaComentarios = post.querySelector(".comments");

    if (areaComentarios.style.display === "block") {

        areaComentarios.style.display = "none";

    } else {

        areaComentarios.style.display = "block";
    }
}



// ✍️ ADICIONAR COMENTÁRIO
function adicionarComentario(botao) {

    let area = botao.closest(".comments");

    let input = area.querySelector("input");

    let lista = area.querySelector(".comment-list");

    let texto = input.value.trim();

    if (texto === "") {

        alert("💜 Digite um comentário antes de enviar!");

        return;
    }

    let comentario = document.createElement("p");

    comentario.innerHTML =
        "👑 <strong>Você:</strong> " + texto;

    lista.appendChild(comentario);

    input.value = "";

}



// 📤 COMPARTILHAR
function compartilhar() {

    if (navigator.share) {

        navigator.share({

            title: "Mini Feed Princesinha Sofia",

            text:
                "👑 Veja este mini feed mágico da Princesinha Sofia! 💜✨",

            url: window.location.href

        });

    } else {

        navigator.clipboard.writeText(
            window.location.href
        );

        alert(
            "✨ Link copiado! Agora você pode compartilhar 💜"
        );
    }

}



// 🏰 VOLTAR PARA O INÍCIO
function inicio() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ✨ MENSAGENS DO MENU
function mostrarMensagem(mensagem) {

    alert(mensagem);

}



// 👑 CARREGAR MAIS POSTS
function carregarMais() {

    let feed = document.querySelector(".feed");

    let botaoMais = document.getElementById("mais");

    let novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `

        <div class="post-top">

            <div class="avatar">
                👸
            </div>

            <div>

                <h3>Princesinha Sofia</h3>

                <small>Agora mesmo</small>

            </div>

        </div>


        <img
            src="https://loremflickr.com/800/500/princess,castle,magic"
            alt="Aventura de princesa"
        >


        <div class="post-content">

            <h2>
                ✨ Uma nova aventura apareceu!
            </h2>

            <p>
                Sofia encontrou um novo caminho mágico
                pelo Reino de Encantia. 👑💜
                Será que uma nova aventura está começando?
            </p>

        </div>


        <div class="actions">

            <button onclick="curtir(this)">
                💜 Curtir
                <span>0</span>
            </button>

            <button onclick="comentarios(this)">
                💬 Comentar
            </button>

            <button onclick="compartilhar()">
                📤 Compartilhar
            </button>

        </div>


        <div class="comments">

            <input
                type="text"
                placeholder="Escreva um comentário..."
            >

            <button onclick="adicionarComentario(this)">
                Enviar
            </button>

            <div class="comment-list"></div>

        </div>

    `;


    feed.insertBefore(
        novoPost,
        botaoMais
    );


    // efeito suave quando o post aparece
    novoPost.style.opacity = "0";

    novoPost.style.transform =
        "translateY(30px)";


    setTimeout(() => {

        novoPost.style.transition =
            "all 0.5s ease";

        novoPost.style.opacity = "1";

        novoPost.style.transform =
            "translateY(0)";

    }, 50);

}



// ⌨️ ENVIAR COMENTÁRIO COM ENTER
document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            event.target.matches(".comments input")
        ) {

            let area =
                event.target.closest(".comments");

            let botao =
                area.querySelector("button");

            adicionarComentario(botao);

        }

    }
);



// ✨ MENSAGEM AO ABRIR O SITE
window.addEventListener(
    "load",
    function() {

        console.log(
            "👑 Bem-vinda ao Mini Feed da Princesinha Sofia! 💜"
        );

    }
);
```
