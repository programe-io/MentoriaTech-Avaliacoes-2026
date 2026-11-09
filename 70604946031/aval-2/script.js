
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.appendChild(titulo);

    if (imagem !== "") {
        const foto = document.createElement("img");
        foto.src = imagem;
        foto.alt = "Imagem da publicação";
        post.appendChild(foto);
    }

    post.appendChild(mensagem);

    post.innerHTML += `
        <button class="curtir">❤️ Curtir <span>0</span></button>
        <div class="comentarios">
            <input type="text" placeholder="Escreva um comentário...">
            <button class="comentar">Comentar</button>
            <div class="lista-comentarios"></div>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("curtir")) {
        const contador = event.target.querySelector("span");
        let curtidas = Number(contador.textContent);

        curtidas++;
        contador.textContent = curtidas;
    }

    if (event.target.classList.contains("comentar")) {
        const area = event.target.parentElement;
        const input = area.querySelector("input");
        const lista = area.querySelector(".lista-comentarios");

        if (input.value.trim() === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("p");
        comentario.textContent = "💬 " + input.value;

        lista.appendChild(comentario);
        input.value = "";
    }

});
