// BOTÃO DE CURTIR

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const numero = botao.querySelector("span");
        const icone = botao.querySelector("i");

        let quantidade = Number(numero.textContent);

        if (botao.classList.contains("curtido")) {

            quantidade--;
            numero.textContent = quantidade;

            botao.classList.remove("curtido");
            icone.classList.remove("fa-solid");
            icone.classList.add("fa-regular");

        } else {

            quantidade++;
            numero.textContent = quantidade;

            botao.classList.add("curtido");
            icone.classList.remove("fa-regular");
            icone.classList.add("fa-solid");

        }

    });

});


// CRIAR UMA NOVA POSTAGEM

const botaoPublicar = document.getElementById("botaoPublicar");
const textoPost = document.getElementById("textoPost");
const feed = document.getElementById("feed");

botaoPublicar.addEventListener("click", function() {

    const texto = textoPost.value.trim();

    // Verifica se existe algum texto
    if (texto === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    // Cria a nova publicação
    const novaPostagem = document.createElement("article");

    novaPostagem.classList.add("post");

    novaPostagem.innerHTML = `

        <div class="post-topo">

            <div class="perfil-post">

                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                     alt="Foto do usuário">

                <div>
                    <h3>Seu Perfil</h3>
                    <p>@usuario • Agora mesmo</p>
                </div>

            </div>

            <i class="fa-solid fa-ellipsis"></i>

        </div>

        <p class="texto-publicacao">
            ${texto}
        </p>

        <div class="acoes">

            <button class="curtir">
                <i class="fa-regular fa-heart"></i>
                <span>0</span>
            </button>

            <button>
                <i class="fa-regular fa-comment"></i>
                0
            </button>

            <button>
                <i class="fa-solid fa-share"></i>
                Compartilhar
            </button>

        </div>
    `;

    // Coloca a nova postagem no início do feed
    feed.prepend(novaPostagem);

    // Limpa o campo de texto
    textoPost.value = "";

    // Faz o novo botão de curtir funcionar
    const novoBotaoCurtir = novaPostagem.querySelector(".curtir");

    novoBotaoCurtir.addEventListener("click", function() {

        const numero = novoBotaoCurtir.querySelector("span");
        const icone = novoBotaoCurtir.querySelector("i");

        let quantidade = Number(numero.textContent);

        if (novoBotaoCurtir.classList.contains("curtido")) {

            quantidade--;
            novoBotaoCurtir.classList.remove("curtido");

            icone.classList.remove("fa-solid");
            icone.classList.add("fa-regular");

        } else {

            quantidade++;
            novoBotaoCurtir.classList.add("curtido");

            icone.classList.remove("fa-regular");
            icone.classList.add("fa-solid");

        }

        numero.textContent = quantidade;

    });

});


// BOTÕES DE SEGUIR

const botoesSeguir = document.querySelectorAll(".pessoa button");

botoesSeguir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
        } else {
            botao.textContent = "Seguir";
        }

    });

});