
function publicar() {
    let usuario = document.getElementById("usuario").value.trim();
    let texto = document.getElementById("texto").value.trim();

    if (usuario === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("article");
    post.className = "post";

    let nome = document.createElement("h3");
    nome.textContent = usuario;

    let data = document.createElement("p");
    data.className = "data";
    data.textContent = "Agora";

    let mensagem = document.createElement("p");
    mensagem.textContent = texto;

    let curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = 'Curtir ❤️ <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    let comentarBtn = document.createElement("button");
    comentarBtn.textContent = "Comentar 💬";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(nome, data, mensagem, curtirBtn, comentarBtn, comentarios);

    feed.prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("texto").value = "";
}

function curtir(botao) {
    let contador = botao.querySelector("span");
    contador.textContent = Number(contador.textContent) + 1;
}

function comentar(botao) {
    let area = botao.parentElement.querySelector(".comentarios");

    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let novo = document.createElement("div");
        novo.className = "comentario";
        novo.textContent = comentario.trim();

        area.appendChild(novo);
    }
}
