
let totalPublicacoes = 0;

// CURTIDAS

document.addEventListener("click", function(event) {

    if (event.target.closest(".curtir")) {

        const botao = event.target.closest(".curtir");
        const numero = botao.querySelector("span");

        let curtidas = Number(numero.textContent);

        if (botao.classList.contains("ativo")) {
            curtidas--;
            botao.classList.remove("ativo");
        } else {
            curtidas++;
            botao.classList.add("ativo");
        }

        numero.textContent = curtidas;
    }

});

// COMENTÁRIOS

document.addEventListener("click", function(event) {

    if (event.target.closest(".comentario")) {

        const post = event.target.closest(".post");
        const area = post.querySelector(".comentarios");

        if (area.querySelector("input")) return;

        const campo = document.createElement("input");
        campo.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        enviar.onclick = function() {

            const texto = campo.value.trim();

            if (!texto) {
                alert("Digite um comentário!");
                return;
            }

            const comentario = document.createElement("p");
            comentario.textContent = "👤 Você: " + texto;

            area.appendChild(comentario);

            campo.remove();
            enviar.remove();
        };

        area.appendChild(campo);
        area.appendChild(enviar);
    }

});

// STORIES

function verStory(nome) {

    document.getElementById("nome-story").textContent =
        "Story de " + nome;

    document.getElementById("visualizador").style.display = "flex";
}

function fecharStory() {

    document.getElementById("visualizador").style.display = "none";
}

// PUBLICAR FOTO

function publicarFoto() {

    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!imagem) {
        alert("Adicione o link de uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.nome = "Você";

    const usuario = document.createElement("div");
    usuario.className = "usuario";
    usuario.innerHTML = "<div class='avatar'>👤</div><strong>Você</strong>";

    const foto = document.createElement("img");
    foto.src = imagem;
    foto.alt = "Minha publicação";

    foto.onerror = function() {
        alert("Não foi possível carregar essa imagem.");
        post.remove();
    };

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button class="curtir">❤️ Curtir <span>0</span></button>
        <button class="comentario">💬 Comentar</button>
        <button class="compartilhar">↗ Compartilhar</button>
    `;

    const texto = document.createElement("p");
    texto.textContent = "Você: " + (legenda || "Nova publicação! 📸");

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(usuario, foto, acoes, texto, comentarios);

    document.getElementById("inicio").prepend(post);

    totalPublicacoes++;

    document.getElementById("total-posts").textContent =
        totalPublicacoes;

    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";

    alert("Publicação criada com sucesso!");
}

// PESQUISAR USUÁRIOS

document.getElementById("pesquisa").addEventListener("input", function() {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const nome = post.dataset.nome.toLowerCase();

        post.style.display = nome.includes(pesquisa)
            ? "block"
            : "none";

    });

});

// COMPARTILHAR PUBLICAÇÃO

document.addEventListener("click", async function(event) {

    if (event.target.closest(".compartilhar")) {

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Instagram Social",
                    text: "Confira esta publicação!",
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copiado!");
            }
        } catch (erro) {
            console.log("Compartilhamento cancelado.");
        }
    }

});
