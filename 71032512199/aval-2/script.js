
function likePost(button) {
    let contador = button.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (button.classList.contains("curtido")) {
        curtidas--;
        button.classList.remove("curtido");
        button.style.color = "#70432b";
    } else {
        curtidas++;
        button.classList.add("curtido");
        button.style.color = "#e63946";
    }

    contador.textContent = curtidas;
}

function commentPost(button) {
    let comentarios = button.parentElement.nextElementSibling;

    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        let novoComentario = document.createElement("div");

        novoComentario.className = "comment";
        novoComentario.textContent = "💬 " + texto;

        comentarios.appendChild(novoComentario);
    }
}

function addPost() {
    let campo = document.getElementById("postText");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    let post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="profile">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="Perfil">
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        <div class="actions">
            <button onclick="likePost(this)">❤️ Curtir <span>0</span></button>
            <button onclick="commentPost(this)">💬 Comentar</button>
        </div>

        <div class="comments"></div>
    `;

    post.querySelector("p").textContent = texto;

    let feed = document.getElementById("feed");
    feed.insertBefore(post, feed.children[1]);

    campo.value = "";
}
