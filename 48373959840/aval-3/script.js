
// CURTIR PUBLICAÇÕES
document.querySelectorAll(".post").forEach(post => {

    const botaoCurtir = post.querySelector(".post-actions button");

    botaoCurtir.addEventListener("click", () => {

        const curtido = botaoCurtir.dataset.curtido === "true";

        if (curtido) {
            botaoCurtir.textContent = "♡";
            botaoCurtir.style.color = "#262626";
            botaoCurtir.dataset.curtido = "false";
        } else {
            botaoCurtir.textContent = "♥";
            botaoCurtir.style.color = "#ed4956";
            botaoCurtir.dataset.curtido = "true";
        }
    });

});


// SEGUIR USUÁRIOS
document.querySelectorAll(".suggestion a").forEach(botao => {

    botao.addEventListener("click", event => {

        event.preventDefault();

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#8e8e8e";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }

    });

});


// ABRIR STORIES
document.querySelectorAll(".story").forEach(story => {

    story.addEventListener("click", () => {

        const nome = story.querySelector("p").textContent;

        alert("Você abriu o story de " + nome);

    });

});


// COMENTÁRIOS
document.querySelectorAll(".comments").forEach(comentario => {

    comentario.addEventListener("click", () => {

        const resposta = prompt("Digite seu comentário:");

        if (resposta && resposta.trim() !== "") {
            alert("Comentário enviado: " + resposta);
        }

    });

});


// CRIAR PUBLICAÇÃO
function criarPublicacao() {

    const mensagem = prompt("O que você deseja publicar?");

    if (!mensagem || mensagem.trim() === "") {
        return;
    }

    const feed = document.querySelector(".feed");

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12" alt="Perfil">
            <strong>seu_usuario</strong>
            <span>•••</span>
        </div>

        <div class="post-content">
            <p>${mensagem.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </div>

        <div class="post-actions">
            <button>♡</button>
            <button>💬</button>
            <button>➤</button>
            <button class="save">♧</button>
        </div>
    `;

    feed.prepend(post);

    const botao = post.querySelector(".post-actions button");

    botao.addEventListener("click", () => {
        botao.textContent =
            botao.textContent === "♡" ? "♥" : "♡";
    });

    alert("Publicação criada com sucesso!");
}


// ATIVAR BOTÃO CRIAR
const links = document.querySelectorAll(".sidebar nav a");

links.forEach(link => {

    if (link.textContent.includes("Criar publicação")) {

        link.addEventListener("click", event => {
            event.preventDefault();
            criarPublicacao();
        });

    }

});


// MENSAGEM INICIAL
console.log("InstaClone iniciado com sucesso!");
