
function curtir(botao) {
    const contador = botao.nextElementSibling;

    let curtidas = Number(contador.dataset.total || 0);

    if (botao.classList.contains("curtido")) {
        curtidas--;
        botao.classList.remove("curtido");
        botao.innerText = "♡ Curtir";
    } else {
        curtidas++;
        botao.classList.add("curtido");
        botao.innerText = "♥ Curtido";
    }

    contador.dataset.total = curtidas;
    contador.innerText = curtidas + " curtidas";
}

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!nome || !imagem || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const post = document.createElement("article");
        post.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = nome;

        const foto = document.createElement("img");
        foto.src = url.href;
        foto.alt = "Look publicado";
        foto.onerror = () => {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        const texto = document.createElement("p");
        texto.textContent = legenda;

        const botao = document.createElement("button");
        botao.textContent = "♡ Curtir";
        botao.onclick = function() {
            curtir(this);
        };

        const contador = document.createElement("span");
        contador.textContent = "0 curtidas";

        post.append(titulo, foto, texto, botao, contador);

        document.getElementById("feed").prepend(post);

        document.getElementById("nome").value = "";
        document.getElementById("imagem").value = "";
        document.getElementById("legenda").value = "";

    } catch (erro) {
        alert("Digite uma URL de imagem válida!");
    }
}
