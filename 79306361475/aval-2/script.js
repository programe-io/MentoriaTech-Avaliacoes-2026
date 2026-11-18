
function publicar() {
    const texto = document.getElementById("textoPost");
    const lista = document.getElementById("listaPosts");

    if (texto.value.trim() === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "🕷️ Peter Parker";

    const mensagem = document.createElement("p");
    mensagem.textContent = texto.value;

    const botao = document.createElement("button");
    botao.textContent = "❤️ Curtir";
    botao.onclick = function() {
        curtir(botao);
    };

    const curtidas = document.createElement("span");
    curtidas.textContent = "0 curtidas";

    post.appendChild(titulo);
    post.appendChild(mensagem);
    post.appendChild(botao);
    post.appendChild(curtidas);

    lista.prepend(post);

    texto.value = "";
}

function curtir(botao) {
    const contador = botao.nextElementSibling;

    let quantidade = parseInt(
        contador.textContent
    );

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.textContent = "❤️ Curtir";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.textContent = "💖 Curtido";
    }

    contador.textContent = quantidade + " curtidas";
