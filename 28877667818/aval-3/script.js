
function publicar() {

    const usuario = document.getElementById("usuario").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (usuario === "" || imagem === "") {
        alert("Digite seu nome e o link da imagem!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "usuario";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    const fotoPerfil = document.createElement("img");
    fotoPerfil.src = "https://i.pravatar.cc/100?img=12";
    fotoPerfil.alt = "Foto de perfil";

    cabecalho.appendChild(fotoPerfil);
    cabecalho.appendChild(nome);

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;
    foto.alt = "Foto publicada";

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const salvarBtn = document.createElement("button");
    salvarBtn.textContent = "🔖";
    salvarBtn.onclick = function() {
        alert("Publicação salva!");
    };

    acoes.appendChild(curtirBtn);
    acoes.appendChild(comentarBtn);
    acoes.appendChild(salvarBtn);

    const texto = document.createElement("p");
    const usuarioTexto = document.createElement("strong");
    usuarioTexto.textContent = usuario;

    texto.appendChild(usuarioTexto);
    texto.appendChild(document.createTextNode(" " + legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(cabecalho);
    post.appendChild(foto);
    post.appendChild(acoes);
    post.appendChild(texto);
    post.appendChild(comentarios);

    feed.prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    alert("Publicação compartilhada!");
}

function curtir(botao) {

    const numero = botao.querySelector("span");
    let curtidas = Number(numero.textContent);

    if (botao.dataset.curtido === "true") {
        curtidas--;
        botao.dataset.curtido = "false";
    } else {
        curtidas++;
        botao.dataset.curtido = "true";
    }

    numero.textContent = curtidas;
}

function comentar(botao) {

    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {

        const comentario = document.createElement("div");
        comentario.className = "comentario";

        comentario.textContent = texto;

        comentarios.appendChild(comentario);
    }
}
