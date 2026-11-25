
function curtir(botao) {
    let contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.dataset.curtido === "true") {
        total--;
        botao.dataset.curtido = "false";
        botao.style.background = "#8b36ff";
    } else {
        total++;
        botao.dataset.curtido = "true";
        botao.style.background = "#e84393";
    }

    contador.textContent = total;
}

function comentar(botao) {
    let mensagem = prompt("Digite seu comentário:");

    if (!mensagem || !mensagem.trim()) return;

    let area = botao.closest(".post")
                   .querySelector(".comentarios");

    let comentario = document.createElement("p");
    comentario.textContent = "💬 " + mensagem;

    area.appendChild(comentario);
}

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !mensagem) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "⭐ " + nome;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    post.appendChild(titulo);

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["https:", "http:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const foto = document.createElement("img");
            foto.src = url.href;
            foto.alt = "Imagem da publicação";
            post.appendChild(foto);

        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    post.appendChild(texto);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    acoes.appendChild(curtirBtn);
    acoes.appendChild(comentarBtn);

    post.appendChild(acoes);
    post.appendChild(comentarios);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
    document.getElementById("imagem").value = "";
}
