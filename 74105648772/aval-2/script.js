
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const perfil = document.createElement("div");
    perfil.className = "perfil";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = nome.substring(0, 2).toUpperCase();

    const dados = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const hora = document.createElement("small");
    hora.textContent = "Agora";

    dados.append(titulo, hora);
    perfil.append(avatar, dados);

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.append(perfil, mensagem);

    if (foto) {
        try {
            const url = new URL(foto);
            if (url.protocol === "https:" || url.protocol === "http:") {
                const imagem = document.createElement("img");
                imagem.src = url.href;
                imagem.alt = "Imagem da publicação";
                post.appendChild(imagem);
            }
        } catch {
            alert("URL da imagem inválida.");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botao = document.createElement("button");
    botao.textContent = "🤍 Curtir";
    botao.onclick = function() {
        curtir(this);
    };

    const contador = document.createElement("span");
    contador.textContent = "0 curtidas";

    acoes.append(botao, contador);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";
    enviar.onclick = function() {
        comentar(this);
    };

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    comentarios.append(campo, enviar, lista);
    post.append(acoes, comentarios);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("foto").value = "";
}

function curtir(botao) {
    const contador = botao.nextElementSibling;
    let total = Number(contador.textContent.split(" ")[0]);

    const curtido = botao.dataset.curtido === "true";

    total += curtido ? -1 : 1;

    botao.dataset.curtido = String(!curtido);
    botao.textContent = curtido ? "🤍 Curtir" : "❤️ Curtido";

    contador.textContent = total + " curtidas";
}

function comentar(botao) {
    const area = botao.parentElement;
    const campo = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = campo.value.trim();

    if (!texto) {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;

    lista.appendChild(comentario);
    campo.value = "";
}
