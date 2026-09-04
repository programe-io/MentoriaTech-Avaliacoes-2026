// ==============================
// THAINA SOCIAL
// Desenvolvedora: Thaina
// ==============================


// BOTÃO PUBLICAR

const publicarBtn = document.getElementById("publicarBtn");
const textoPost = document.getElementById("textoPost");
const novosPosts = document.getElementById("novosPosts");


publicarBtn.addEventListener("click", publicarPost);


// Permite publicar apertando ENTER

textoPost.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        publicarPost();
    }

});


function publicarPost() {

    const texto = textoPost.value.trim();

    if (texto === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }


    const novoPost = document.createElement("article");

    novoPost.classList.add("post");


    novoPost.innerHTML = `

        <div class="post-header">

            <div class="avatar">T</div>

            <div>
                <h3>Thaina</h3>
                <span>Agora mesmo</span>
            </div>

            <button class="mais">•••</button>

        </div>


        <p class="post-texto">
            ${texto}
        </p>


        <div class="post-info">

            <span>❤️ 0 curtidas</span>

            <span>0 comentários</span>

        </div>


        <div class="acoes">

            <button class="curtir">
                ❤️ <span>Curtir</span>
            </button>

            <button>
                💬 Comentar
            </button>

            <button>
                ↗️ Compartilhar
            </button>

        </div>
    `;


    novosPosts.prepend(novoPost);

    textoPost.value = "";


    configurarCurtida(novoPost);
}


// ==============================
// SISTEMA DE CURTIDA
// ==============================

function configurarCurtida(post) {

    const botaoCurtir = post.querySelector(".curtir");

    botaoCurtir.addEventListener("click", function() {

        botaoCurtir.classList.toggle("liked");


        if (botaoCurtir.classList.contains("liked")) {

            botaoCurtir.innerHTML = "💖 <span>Curtido</span>";

        } else {

            botaoCurtir.innerHTML = "❤️ <span>Curtir</span>";

        }

    });

}


// Configura curtidas dos posts que já existem

document.querySelectorAll(".post").forEach(function(post) {

    configurarCurtida(post);

});


// ==============================
// BOTÕES SEGUIR
// ==============================

const botoesSeguir = document.querySelectorAll(".sugestao button");


botoesSeguir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.classList.contains("seguindo")) {

            botao.classList.remove("seguindo");

            botao.textContent = "Seguir";

        } else {

            botao.classList.add("seguindo");

            botao.textContent = "Seguindo";

        }

    });

});


// ==============================
// PESQUISA
// ==============================

const campoPesquisa = document.getElementById("campoPesquisa");


campoPesquisa.addEventListener("input", function() {

    const pesquisa = campoPesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");


    posts.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();


        if (conteudo.includes(pesquisa)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

});
