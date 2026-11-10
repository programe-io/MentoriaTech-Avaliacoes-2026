
function publicar() {
    const texto = document.getElementById("texto").value;
    const imagem = document.getElementById("imagem").value;

    if (texto.trim() === "") {
        alert("Digite alguma coisa!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "Você";

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(paragrafo);

    if (imagem.trim() !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.src = url.href;
                img.alt = "Imagem da publicação";
                post.appendChild(img);
            }
        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button onclick="curtir(this)">
            ❤️ Curtir <span>0</span>
        </button>
        <button onclick="comentar()">💬 Comentar</button>
    `;

    post.appendChild(acoes);

    document.getElementById("feed").appendChild(post);

    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.dataset.curtido === "sim") {
        numero--;
        botao.dataset.curtido = "nao";
    } else {
        numero++;
        botao.dataset.curtido = "sim";
    }

    contador.textContent = numero;
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário publicado: " + comentario);
    }
}
