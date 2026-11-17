
// PUBLICAR UMA NOVA MENSAGEM

function publicar() {

    const campo = document.getElementById("textoPublicacao");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "V";

    const dados = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Você";

    const identificacao = document.createElement("p");
    identificacao.textContent = "@vibe_usuario · agora";

    dados.append(nome, identificacao);
    usuario.append(avatar, dados);

    const mensagem = document.createElement("p");
    mensagem.className = "mensagem";
    mensagem.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button onclick="comentar(this)">💬 <span>0</span></button>
        <button onclick="repostar(this)">🔁 <span>0</span></button>
        <button onclick="curtir(this)">❤️ <span>0</span></button>
    `;

    post.append(usuario, mensagem, acoes);

    document.getElementById("publicacoes")
        .prepend(post);

    campo.value = "";

    alert("Publicação realizada com sucesso!");
}


// SISTEMA DE CURTIDAS

function curtir(botao) {

    const numero = botao.querySelector("span");

    let quantidade = Number(numero.textContent);

    if (botao.dataset.curtido === "sim") {

        quantidade--;
        botao.dataset.curtido = "nao";
        botao.style.color = "#555";

    } else {

        quantidade++;
        botao.dataset.curtido = "sim";
        botao.style.color = "#e0245e";

    }

    numero.textContent = quantidade;
}


// SISTEMA DE COMENTÁRIOS

function comentar(botao) {

    const resposta = prompt("Escreva seu comentário:");

    if (resposta && resposta.trim() !== "") {

        const post = botao.closest(".post");

        const comentario = document.createElement("p");

        comentario.textContent = "💬 Você: " + resposta;

        comentario.style.marginTop = "15px";
        comentario.style.color = "#1685d9";

        post.appendChild(comentario);

        const numero = botao.querySelector("span");

        numero.textContent = Number(numero.textContent) + 1;
    }
}


// SISTEMA DE REPOSTAGEM

function repostar(botao) {

    const numero = botao.querySelector("span");

    let quantidade = Number(numero.textContent);

    quantidade++;

    numero.textContent = quantidade;

    alert("Você repostou esta publicação!");
}


// SISTEMA DE PESQUISA

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(texto)
            ? "block"
            : "none";

    });
});


// MOSTRAR PERFIL

function mostrarPerfil() {

    document.getElementById("perfil")
        .scrollIntoView({ behavior: "smooth" });

}
