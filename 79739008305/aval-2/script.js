// ========================================
// CURTIR POSTS
// ========================================

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const contador = botao.querySelector("span");

        let curtidas = Number(contador.textContent);

        if (botao.classList.contains("curtido")) {

            curtidas--;

            botao.classList.remove("curtido");

        } else {

            curtidas++;

            botao.classList.add("curtido");

        }

        contador.textContent = curtidas;

    });

});


// ========================================
// PUBLICAR NOVO POST
// ========================================

const botaoPublicar =
    document.getElementById("publicar");

const textoPost =
    document.getElementById("textoPost");

const feed =
    document.getElementById("feed");


botaoPublicar.addEventListener("click", function () {

    const texto = textoPost.value.trim();


    if (texto === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }


    const novoPost =
        document.createElement("article");

    novoPost.classList.add("post");


    novoPost.innerHTML = `

        <div class="post-cabecalho">

            <div class="avatar">
                👩🏻
            </div>

            <div>
                <h3>Maria Fashion</h3>

                <small>Agora mesmo</small>
            </div>

        </div>


        <p class="descricao">
            ${texto}
        </p>


        <div class="imagem-moda look-roxo">
            👗 👠 👜
        </div>


        <div class="acoes">

            <button class="curtir">
                ❤️ <span>0</span>
            </button>

            <button>
                💬 <span>0</span>
            </button>

            <button>
                🔄 Compartilhar
            </button>

        </div>
    `;


    feed.prepend(novoPost);


    // Ativa o botão de curtir do novo post

    const novoBotaoCurtir =
        novoPost.querySelector(".curtir");


    novoBotaoCurtir.addEventListener(
        "click",
        function () {

            const contador =
                novoBotaoCurtir.querySelector("span");

            let curtidas =
                Number(contador.textContent);


            if (
                novoBotaoCurtir
                .classList
                .contains("curtido")
            ) {

                curtidas--;

                novoBotaoCurtir
                    .classList
                    .remove("curtido");

            } else {

                curtidas++;

                novoBotaoCurtir
                    .classList
                    .add("curtido");
            }


            contador.textContent = curtidas;
        }
    );


    textoPost.value = "";

});


// ========================================
// PESQUISA
// ========================================

const campoPesquisa =
    document.getElementById("campoPesquisa");


campoPesquisa.addEventListener(
    "input",
    function () {

        const pesquisa =
            campoPesquisa.value.toLowerCase();


        const posts =
            document.querySelectorAll(".post");


        posts.forEach(function (post) {

            const texto =
                post.textContent.toLowerCase();


            if (texto.includes(pesquisa)) {

                post.style.display = "block";

            } else {

                post.style.display = "none";

            }

        });

    }
);