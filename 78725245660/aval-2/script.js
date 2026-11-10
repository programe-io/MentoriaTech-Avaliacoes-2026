
// Função para publicar uma postagem
function publicarPost() {

    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const lista = document.getElementById("lista-posts");

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(conteudo);

    // Adiciona imagem se houver URL
    if (imagem !== "") {
        const img = document.createElement("img");
        img.src = imagem;
        img.alt = "Imagem da publicação";

        img.onerror = function () {
            img.remove();
        };

        post.appendChild(img);
    }

    // Área de ações
    const actions = document.createElement("div");
    actions.className = "actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function () {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function () {
        comentar(this);
    };

    actions.appendChild(curtirBtn);
    actions.appendChild(comentarBtn);

    post.appendChild(actions);

    // Adiciona a postagem no início do feed
    lista.prepend(post);

    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}


// Função para curtir uma postagem
function curtir(botao) {

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
}


// Função para comentar uma postagem
function comentar(botao) {

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {

        const post = botao.closest(".post");

        const novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 " + comentario;

        novoComentario.className = "comentario";

        post.appendChild(novoComentario);
    }
}
