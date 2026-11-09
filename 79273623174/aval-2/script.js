
function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.classList.contains("active")) {
        total--;
        botao.classList.remove("active");
        botao.innerHTML = `♡ Curtir <span>${total}</span>`;
    } else {
        total++;
        botao.classList.add("active");
        botao.innerHTML = `♥ Curtido <span>${total}</span>`;
    }
}

function mostrarComentario(botao) {
    const area = botao.closest(".post").querySelector(".comments");

    if (area.querySelector("input")) return;

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";

    enviar.onclick = function() {
        if (!input.value.trim()) {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("div");
        comentario.className = "comment-item";
        comentario.textContent = "🌸 " + input.value;

        area.appendChild(comentario);
        input.value = "";
    };

    area.append(input, enviar);
}

function criarPost() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !mensagem) {
        alert("Preencha seu nome e sua mensagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "🌷 " + nome;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    post.append(titulo, texto);

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error();
            }

            const foto = document.createElement("img");
            foto.src = url.href;
            foto.alt = "Imagem da publicação";
            post.appendChild(foto);
        } catch {
            alert("Digite um link de imagem válido!");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const like = document.createElement("button");
    like.className = "like";
    like.innerHTML = '♡ Curtir <span>0</span>';
    like.onclick = () => curtir(like);

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";
    comentar.onclick = () => mostrarComentario(comentar);

    acoes.append(like, comentar);
    post.appendChild(acoes);

    document.getElementById("posts").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("imagem").value = "";

    alert("Publicação criada com sucesso! 🌸");
}
