function curtir(botao) {

    let contador = botao.querySelector("span");

    let numero = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {

        numero--;

        botao.classList.remove("curtido");

    } else {

        numero++;

        botao.classList.add("curtido");
    }

    contador.textContent = numero;
}


function comentar() {

    let comentario = prompt("Digite seu comentário:");

    if (comentario !== null && comentario.trim() !== "") {

        alert("Comentário publicado! 💬");
    }
}


function compartilhar() {

    alert("Publicação compartilhada! 🔄");
}


function publicar() {

    let texto = document.getElementById("textoPost").value;

    if (texto.trim() === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }

    let feed = document.getElementById("feed");

    let novoPost = document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `
        <div class="usuario">

            <div class="avatar">
                JM
            </div>

            <div>
                <h3>José Milton</h3>
                <span>@josemilton • agora</span>
            </div>

        </div>

        <p class="texto">
            ${texto}
        </p>

        <div class="acoes">

            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="comentar()">
                💬 Comentar
            </button>

            <button onclick="compartilhar()">
                🔄 Compartilhar
            </button>

        </div>
    `;

    feed.prepend(novoPost);

    document.getElementById("textoPost").value = "";
}