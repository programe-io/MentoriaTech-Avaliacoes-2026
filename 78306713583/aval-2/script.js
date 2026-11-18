
const textoPost = document.getElementById("textoPost");
const listaPosts = document.getElementById("listaPosts");
const publicarBtn = document.getElementById("publicarBtn");

// Função para publicar novos posts
function adicionarPost() {

    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite uma mensagem antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "🗳️ Nova publicação";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    const autor = document.createElement("span");
    autor.textContent = "Publicado por: Visitante";

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.innerHTML = '❤️ Curtir <span>0</span>';

    post.appendChild(titulo);
    post.appendChild(conteudo);
    post.appendChild(autor);
    post.appendChild(botao);

    listaPosts.prepend(post);

    textoPost.value = "";

}

// Função para curtir publicações
function curtirPost(event) {

    const botao = event.target.closest(".curtir");

    if (!botao) return;

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    contador.textContent = curtidas + 1;

}

// Eventos dos botões
publicarBtn.addEventListener("click", adicionarPost);

listaPosts.addEventListener("click", curtirPost);
