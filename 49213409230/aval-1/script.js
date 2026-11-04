
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>InstaBlog</title>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #fafafa;
    color: #262626;
}

header {
    background: white;
    border-bottom: 1px solid #ddd;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    font-size: 27px;
    font-weight: bold;
    color: #d62976;
}

header input {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #efefef;
    width: 200px;
}

.layout {
    max-width: 950px;
    margin: 25px auto;
    display: grid;
    grid-template-columns: minmax(0, 600px) 280px;
    gap: 30px;
    padding: 0 15px;
}

.stories {
    background: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    gap: 18px;
    overflow-x: auto;
    margin-bottom: 20px;
}

.story {
    text-align: center;
    min-width: 65px;
    font-size: 12px;
}

.story img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #e1306c;
    padding: 2px;
    object-fit: cover;
}

.post {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 25px;
    overflow: hidden;
}

.post-header {
    display: flex;
    align-items: center;
    padding: 14px;
    gap: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.post-image {
    width: 100%;
    display: block;
    max-height: 550px;
    object-fit: cover;
}

.actions {
    padding: 12px;
}

.actions button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-right: 12px;
}

.actions button.liked {
    color: #ed4956;
}

.likes {
    font-weight: bold;
    margin: 8px 0;
}

.caption {
    margin-bottom: 10px;
}

.comments {
    color: #888;
    font-size: 14px;
    margin: 8px 0;
}

.comment-area {
    display: flex;
    border-top: 1px solid #eee;
    padding: 10px;
    gap: 8px;
}

.comment-area input {
    flex: 1;
    border: none;
    outline: none;
}

.comment-area button {
    background: none;
    border: none;
    color: #0095f6;
    font-weight: bold;
    cursor: pointer;
}

.sidebar {
    padding: 15px;
}

.profile {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 25px;
}

.profile img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
}

.suggestion {
    color: #888;
    margin-bottom: 15px;
}

.create {
    background: white;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
}

.create input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 6px;
}

.create button {
    width: 100%;
    padding: 10px;
    background: #0095f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

footer {
    text-align: center;
    padding: 25px;
    color: #888;
}

@media(max-width: 750px) {
    .layout {
        display: block;
        max-width: 600px;
    }

    .sidebar {
        display: none;
    }

    header input {
        width: 130px;
    }
}
</style>
</head>

<body>

<header>
    <div class="logo">InstaBlog 📸</div>
    <input id="busca" placeholder="Pesquisar..." oninput="pesquisar()">
</header>

<main class="layout">

<section>

    <div class="create">
        <h3>➕ Criar publicação</h3><br>
        <input id="usuario" placeholder="Seu nome">
        <input id="legenda" placeholder="Escreva uma legenda">
        <input id="foto" placeholder="Link da foto (https://...)">
        <button onclick="publicar()">Compartilhar publicação</button>
    </div>

    <div class="stories">
        <div class="story">
            <img src="https://i.pravatar.cc/100?img=12">
            <p>Seu story</p>
        </div>
        <div class="story">
            <img src="https://i.pravatar.cc/100?img=5">
            <p>Ana</p>
        </div>
        <div class="story">
            <img src="https://i.pravatar.cc/100?img=8">
            <p>Pedro</p>
        </div>
        <div class="story">
            <img src="https://i.pravatar.cc/100?img=20">
            <p>Maria</p>
        </div>
        <div class="story">
            <img src="https://i.pravatar.cc/100?img=30">
            <p>Lucas</p>
        </div>
    </div>

    <div id="feed">

        <article class="post">
            <div class="post-header">
                <img class="avatar" src="https://i.pravatar.cc/100?img=12">
                <b>ana_oficial</b>
            </div>

            <img class="post-image"
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
            alt="Paisagem bonita">

            <div class="actions">
                <button onclick="curtir(this)">♡</button>
                <button onclick="focarComentario(this)">💬</button>
                <div class="likes">❤️ <span>120</span> curtidas</div>
                <p class="caption"><b>ana_oficial</b> Aproveitando a vida! 🌸</p>
                <div class="comments"></div>
            </div>

            <div class="comment-area">
                <input placeholder="Adicione um comentário...">
                <button onclick="comentar(this)">Publicar</button>
            </div>
        </article>

        <article class="post">
            <div class="post-header">
                <img class="avatar" src="https://i.pravatar.cc/100?img=8">
                <b>pedro_fotos</b>
            </div>

            <img class="post-image"
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900"
            alt="Praia e mar">

            <div class="actions">
                <button onclick="curtir(this)">♡</button>
                <button onclick="focarComentario(this)">💬</button>
                <div class="likes">❤️ <span>85</span> curtidas</div>
                <p class="caption"><b>pedro_fotos</b> Que lugar incrível! 🌊</p>
                <div class="comments"></div>
            </div>

            <div class="comment-area">
                <input placeholder="Adicione um comentário...">
                <button onclick="comentar(this)">Publicar</button>
            </div>
        </article>

    </div>

</section>

<aside class="sidebar">
    <div class="profile">
        <img src="https://i.pravatar.cc/100?img=12">
        <div>
            <b>meu_perfil</b>
            <p style="color:#888">Meu Instagram</p>
        </div>
    </div>

    <p class="suggestion">Sugestões para você</p>

    <div class="profile">
        <img src="https://i.pravatar.cc/100?img=15">
        <b>mariana</b>
    </div>

    <div class="profile">
        <img src="https://i.pravatar.cc/100?img=22">
        <b>joao_silva</b>
    </div>

    <div class="profile">
        <img src="https://i.pravatar.cc/100?img=32">
        <b>carol_fotos</b>
    </div>
</aside>

</main>

<footer>
    InstaBlog © 2026 - Projeto de rede social
</footer>

<script>
function curtir(botao) {
    const post = botao.closest(".post");
    const numero = post.querySelector(".likes span");
    let total = Number(numero.textContent);

    if (botao.classList.toggle("liked")) {
        numero.textContent = total + 1;
        botao.textContent = "♥";
    } else {
        numero.textContent = total - 1;
        botao.textContent = "♡";
    }
}

function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector(".comment-area input");
    const texto = campo.value.trim();

    if (!texto) return;

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;
    post.querySelector(".comments").appendChild(comentario);
    campo.value = "";
}

function focarComentario(botao) {
    botao.closest(".post").querySelector(".comment-area input").focus();
}

function publicar() {
    const nome = document.getElementById("usuario").value.trim() || "visitante";
    const legenda = document.getElementById("legenda").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!legenda || !foto) {
        alert("Digite uma legenda e o link de uma foto!");
        return;
    }

    let url;
    try {
        url = new URL(foto);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
        alert("Digite um link de imagem válido.");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = "https://i.pravatar.cc/100?u=" + encodeURIComponent(nome);
    avatar.alt = "Foto de perfil";

    const nomeEl = document.createElement("b");
    nomeEl.textContent = nome;

    cabecalho.append(avatar, nomeEl);

    const imagem = document.createElement("img");
    imagem.className = "post-image";
    imagem.src = url.href;
    imagem.alt = "Foto publicada";

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.onclick = function() { curtir(this); };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.onclick = function() { focarComentario(this); };

    const curtidas = document.createElement("div");
    curtidas.className = "likes";
    curtidas.append("❤️ ");
    const total = document.createElement("span");
    total.textContent = "0";
    curtidas.append(total, " curtidas");

    const legendaEl = document.createElement("p");
    legendaEl.className = "caption";
    const autor = document.createElement("b");
    autor.textContent = nome + " ";
    legendaEl.append(autor, document.createTextNode(legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "comments";

    acoes.append(curtirBtn, comentarBtn, curtidas, legendaEl, comentarios);

    const area = document.createElement("div");
    area.className = "comment-area";

    const campo = document.createElement("input");
    campo.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.onclick = function() { comentar(this); };

    area.append(campo, enviar);
    post.append(cabecalho, imagem, acoes, area);

    document.getElementById("feed").prepend(post);

    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";
}

function pesquisar() {
    const termo = document.getElementById("busca").value.toLowerCase();

    document.querySelectorAll("#feed .post").forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(termo)
            ? "block" : "none";
    });
}
</script>

</body>
</html>
