
function curtir(botao) {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        curtidas--;
        botao.classList.remove("curtido");
        botao.style.background = "#fce7f3";
    } else {
        curtidas++;
        botao.classList.add("curtido");
        botao.style.background = "#f9a8d4";
    }

    contador.textContent = curtidas;
}

function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector(".comentarios input").focus();
}

function comentar(botao) {
    const area = botao.closest(".comentarios");
    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;

    lista.appendChild(comentario);
    input.value = "";
}

function criarPost() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="usuario">
            <img src="https://i.pravatar.cc/100?img=5" alt="Foto do usuário">
            <div>
                <h3></h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        ${imagem ? `<img class="foto-post" alt="Imagem da publicação">` : ""}

        <div class="acoes">
            <button class="like" onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>
            <button onclick="focarComentario(this)">💬 Comentar</button>
        </div>

        <div class="comentarios">
            <input type="text" placeholder="Escreva um comentário...">
            <button onclick="comentar(this)">Enviar</button>
            <div class="lista-comentarios"></div>
        </div>
    `;

    post.querySelector(".usuario h3").textContent = nome;
    post.querySelector(".post > p").textContent = texto;

    if (imagem) {
        post.querySelector(".foto-post").src = imagem;
    }

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}
