
function publicar() {
    const texto = document.getElementById("texto");
    const conteudo = texto.value.trim();

    if (conteudo === "") {
        alert("Escreva algo antes de publicar! 💜");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "ARMY 💜";

    const mensagem = document.createElement("p");
    mensagem.textContent = conteudo;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = "🤍 Curtir <span>0</span>";
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentario = document.createElement("div");
    comentario.className = "comentario";

    const input = document.createElement("input");
    input.placeholder = "Comente...";

    const enviarBtn = document.createElement("button");
    enviarBtn.textContent = "Enviar";
    enviarBtn.onclick = function() {
        comentar(this);
    };

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    acoes.appendChild(curtirBtn);
    comentario.append(input, enviarBtn);

    post.append(
        titulo,
        mensagem,
        acoes,
        comentario,
        lista
    );

    document.getElementById("feed").prepend(post);

    texto.value = "";
}

function curtir(botao) {
    const numero = botao.querySelector("span");
    let total = Number(numero.textContent);

    total++;

    numero.textContent = total;
    botao.innerHTML = `💜 Curtido <span>${total}</span>`;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comentario input");
    const lista = post.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");
    novoComentario.textContent = "💜 ARMY: " + texto;

    lista.appendChild(novoComentario);

    input.value = "";
}
