
// Criar publicação
function publicar() {

    const usuario = document.getElementById("usuario").value;
    const texto = document.getElementById("textoPost").value;
    const imagem = document.getElementById("imagemPost").value;

    if (!usuario.trim() || !texto.trim()) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const nome = document.createElement("h3");
    nome.textContent = usuario;

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    post.appendChild(nome);
    post.appendChild(conteudo);

    // Adicionar imagem
    if (imagem.trim()) {
        const foto = document.createElement("img");
        foto.src = imagem;
        foto.alt = "Imagem da publicação";
        post.appendChild(foto);
    }

    // Botão curtir
    const botao = document.createElement("button");
    botao.innerHTML = '❤️ Curtir <span>0</span>';
    botao.onclick = function() {
        curtir(botao);
    };

    post.appendChild(botao);

    // Área de comentários
    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(comentarios);

    // Adicionar ao início do feed
    feed.prepend(post);

    // Limpar campos
    document.getElementById("usuario").value = "";
    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

// Sistema de curtidas
function curtir(botao) {

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
}
