
function publicar() {
    let nome = document.getElementById("nome").value.trim();
    let texto = document.getElementById("texto").value.trim();
    let foto = document.getElementById("foto").value.trim();

    if (nome === "" || texto === "" || foto === "") {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        let url = new URL(foto);

        if (!["http:", "https:"].includes(url.protocol)) {
            alert("Digite um link de imagem válido!");
            return;
        }

        let post = document.createElement("article");
        post.className = "post";

        let titulo = document.createElement("h3");
        titulo.textContent = nome;

        let mensagem = document.createElement("p");
        mensagem.textContent = texto;

        let imagem = document.createElement("img");
        imagem.src = url.href;
        imagem.alt = "Foto da publicação";

        imagem.onerror = function() {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        let botao = document.createElement("button");
        botao.innerHTML = '❤️ Curtir <span>0</span>';

        botao.onclick = function() {
            curtir(this);
        };

        post.append(titulo, mensagem, imagem, botao);

        document.getElementById("feed").prepend(post);

        document.getElementById("nome").value = "";
        document.getElementById("texto").value = "";
        document.getElementById("foto").value = "";

    } catch (erro) {
        alert("Digite um endereço de imagem válido!");
    }
}

function curtir(botao) {
    let contador = botao.querySelector("span");

    contador.textContent =
        Number(contador.textContent) + 1;
}
