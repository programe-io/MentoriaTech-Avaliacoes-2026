
/* =================================
   INSTAGRAM CLONE - JAVASCRIPT
================================= */

// 1. CURTIR PUBLICAÇÕES
document.querySelectorAll(".post").forEach(post => {
    const curtida = post.querySelector(".post-info strong");
    const botaoCurtir = post.querySelector(".post-actions span");

    let curtiu = false;

    botaoCurtir.addEventListener("click", () => {
        curtiu = !curtiu;

        botaoCurtir.textContent = curtiu ? "❤️" : "🤍";
        botaoCurtir.classList.toggle("curtido", curtiu);

        let quantidade = parseInt(
            curtida.textContent.replace(/\D/g, "")
        );

        quantidade = curtiu
            ? quantidade + 1
            : quantidade - 1;

        curtida.textContent = quantidade + " curtidas";
    });
});


// 2. COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const botaoComentario = post.querySelectorAll(
        ".post-actions span"
    )[1];

    botaoComentario.addEventListener("click", () => {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            const areaComentarios = post.querySelector(".post-info");

            const novoComentario = document.createElement("p");

            novoComentario.innerHTML =
                "<strong>meu_perfil</strong> " +
                comentario;

            areaComentarios.appendChild(novoComentario);
        }
    });
});


// 3. SALVAR PUBLICAÇÕES
document.querySelectorAll(".salvar").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.classList.toggle("salvo");

        botao.textContent = botao.classList.contains("salvo")
            ? "🔖"
            : "🔖";

        alert(
            botao.classList.contains("salvo")
                ? "Publicação salva!"
                : "Publicação removida dos salvos."
        );
    });
});


// 4. SEGUIR PERFIS
document.querySelectorAll(".perfil a").forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#262626";
        } else if (botao.textContent === "Seguindo") {
            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        } else if (botao.textContent === "Mudar") {
            alert("Você está visualizando seu perfil!");
        }
    });
});


// 5. VISUALIZAR STORIES
document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", () => {
        const imagem = story.querySelector("img").src;
        const nome = story.querySelector("p").textContent;

        const modal = document.createElement("div");

        modal.className = "story-modal";

        modal.innerHTML = `
            <div class="story-content">
                <button class="fechar-story">✖</button>
                <h3>${nome}</h3>
                <img src="${imagem}" alt="Story de ${nome}">
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".fechar-story").addEventListener(
            "click",
            () => modal.remove()
        );

        modal.addEventListener("click", event => {
            if (event.target === modal) {
                modal.remove();
            }
        });
    });
});


// 6. CRIAR PUBLICAÇÃO
function criarPublicacao() {
    const legenda = prompt("Escreva a legenda da publicação:");

    if (!legenda || legenda.trim() === "") {
        return;
    }

    const imagem = prompt("Cole o endereço da imagem:");

    if (!imagem || imagem.trim() === "") {
        return;
    }

    const novaPublicacao = document.createElement("article");

    novaPublicacao.className = "post";

    novaPublicacao.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>meu_perfil</strong>
            <span>•••</span>
        </div>

        <img class="post-image" src="${imagem}" alt="Nova publicação">

        <div class="post-actions">
            <span>🤍</span>
            <span>💬</span>
            <span>📤</span>
            <span class="salvar">🔖</span>
        </div>

        <div class="post-info">
            <strong>0 curtidas</strong>
            <p><strong>meu_perfil</strong> ${legenda}</p>
            <p class="data">Agora</p>
        </div>
    `;

    const feed = document.querySelector(".conteudo");

    feed.appendChild(novaPublicacao);

    alert("Publicação criada com sucesso!");
}


// Ativar criação de publicação
document.querySelectorAll(".menu a, .topo nav a").forEach(link => {
    if (link.textContent.includes("Criar publicação") ||
        link.textContent.includes("➕")) {

        link.addEventListener("click", event => {
            event.preventDefault();
            criarPublicacao();
        });
    }
});


// 7. PESQUISAR PUBLICAÇÕES
const campoPesquisa = document.querySelector(".topo input");

campoPesquisa.addEventListener("input", () => {
    const pesquisa = campoPesquisa.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const texto = post.textContent.toLowerCase();

        post.style.display = texto.includes(pesquisa)
            ? "block"
            : "none";
    });
});


// 8. MENSAGEM DE BOAS-VINDAS
console.log("Instagram Clone iniciado!");
