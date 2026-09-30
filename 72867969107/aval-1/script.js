const botaoPublicar = document.getElementById("botaoPublicar");
const textoPost = document.getElementById("textoPost");
const feed = document.getElementById("feed");
const campoPesquisa = document.getElementById("campoPesquisa");


// PUBLICAR POST
botaoPublicar.addEventListener("click", function () {

    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar.");
        return;
    }

    const novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `
        <div class="post-cabecalho">

            <div class="avatar">
                EU
            </div>

            <div>
                <h3>Meu Perfil</h3>
                <small>Agora</small>
            </div>

        </div>

        <p>${texto}</p>

        <div class="post-acoes">

            <button class="curtir">
                ❤️ <span>0</span>
            </button>

            <button>
                💬 Comentar
            </button>

            <button>
                ↗ Compartilhar
            </button>

        </div>
    `;

    feed.prepend(novoPost);

    textoPost.value = "";

    ativarCurtidas();
});


// SISTEMA DE CURTIDAS
function ativarCurtidas() {

    const botoesCurtir = document.querySelectorAll(".curtir");

    botoesCurtir.forEach(function (botao) {

        botao.onclick = function () {

            const contador = botao.querySelector("span");

            let quantidade = Number(contador.textContent);

            if (botao.classList.contains("curtido")) {

                quantidade--;

                botao.classList.remove("curtido");

            } else {

                quantidade++;

                botao.classList.add("curtido");

            }

            contador.textContent = quantidade;
        };
    });
}

ativarCurtidas();


// PESQUISA
campoPesquisa.addEventListener("input", function () {

    const pesquisa = campoPesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(function (post) {

        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// BOTÃO DE FOTO
document.getElementById("botaoImagem")
    .addEventListener("click", function () {

        alert("Função de upload de imagens será implementada posteriormente.");

    });
