
function curtir(botao) {
    const icone = botao.querySelector("i");
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    if (icone.classList.contains("fa-regular")) {
        icone.classList.replace("fa-regular", "fa-solid");
        botao.classList.add("liked");
        likes.innerText = "1.251 curtidas";
    } else {
        icone.classList.replace("fa-solid", "fa-regular");
        botao.classList.remove("liked");
        likes.innerText = "1.250 curtidas";
    }
}

function comentar() {
    alert("Área de comentários!");
}

function novaPublicacao() {
    const legenda = prompt("Digite a legenda da publicação:");

    if (legenda) {
        const feed = document.getElementById("feed");

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <div class="post-header">
                <img src="https://i.pravatar.cc/100?img=12">
                <strong>seu_perfil</strong>
                <span>• agora</span>
            </div>

            <div style="padding:40px; text-align:center;">
                <h2>Nova publicação</h2>
                <p>${legenda.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </div>

            <div class="description">
                <strong>0 curtidas</strong>
            </div>
        `;

        feed.prepend(post);
    }
}
