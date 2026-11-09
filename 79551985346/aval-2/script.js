
let filtroAtual = "Todos";

function atualizarEstatisticas() {
    const posts = document.querySelectorAll("#feed .post");
    const curtidas = document.querySelectorAll("#feed .curtido");

    document.getElementById("totalPosts").textContent = posts.length;

    let total = 0;

    curtidas.forEach(botao => {
        total += Number(botao.querySelector("span").textContent);
    });

    document.getElementById("totalCurtidas").textContent = total;
}

// CURTIR PUBLICAÇÕES

function curtir(botao) {
    let contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.innerHTML = `♡ Curtir <span>${quantidade}</span>`;
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.innerHTML = `♥ Curtido <span>${quantidade}</span>`;
    }

    atualizarEstatisticas();
}

// COMENTAR

function comentar(botao) {
    let area = botao.parentElement;
    let input = area.querySelector("input");
    let lista = area.querySelector(".lista-comentarios");

    let texto = input.value.trim();

    if (!texto) {
        alert("Digite um comentário primeiro!");
        return;
    }

    let comentario = document.createElement("p");
    let mensagem = document.createElement("span");
    let excluir = document.createElement("button");

    mensagem.textContent = "💬 " + texto;
    excluir.textContent = "Excluir";

    excluir.onclick = function() {
        comentario.remove();
    };

    comentario.appendChild(mensagem);
    comentario.appendChild(excluir);

    lista.appendChild(comentario);

    input.value = "";
}

// IR PARA COMENTÁRIOS

function focarComentario(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comentarios input");

    input.focus();
}

// PUBLICAR

function publicar() {
    const texto = document.getElementById("textoPost");
    const categoria = document.getElementById("categoriaPost");

    if (texto.value.trim() === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.categoria = categoria.value;

    const titulo = document.createElement("h3");
    titulo.textContent = "✚ Guilherme";

    const etiqueta = document.createElement("span");
    etiqueta.className = "categoria";
    etiqueta.textContent = categoria.value.toUpperCase();

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto.value;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBotao = document.createElement("button");
    curtirBotao.className = "curtir";
    curtirBotao.innerHTML = '♡ Curtir <span>0</span>';
    curtirBotao.onclick = function() {
        curtir(this);
    };

    const comentarBotao = document.createElement("button");
    comentarBotao.textContent = "💬 Comentar";
    comentarBotao.onclick = function() {
        focarComentario(this);
    };

    acoes.append(curtirBotao, comentarBotao);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";
    comentarios.innerHTML = `
        <input placeholder="Escreva um comentário...">
        <button>Enviar</button>
        <div class="lista-comentarios"></div>
    `;

    comentarios.querySelector("button").onclick = function() {
        comentar(this);
    };

    post.append(etiqueta, titulo, paragrafo, acoes, comentarios);

    document.getElementById("feed").prepend(post);

    texto.value = "";

    atualizarEstatisticas();
    aplicarFiltro();

    alert("Sua publicação foi realizada! 💚");
}

// FILTRAR PUBLICAÇÕES

function filtrar(categoria, botao) {
    filtroAtual = categoria;

    document.querySelectorAll(".filtro").forEach(item => {
        item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    aplicarFiltro();
}

function aplicarFiltro() {
    document.querySelectorAll("#feed .post").forEach(post => {
        if (
            filtroAtual === "Todos" ||
            post.dataset.categoria === filtroAtual
        ) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

// MODAL DO SONHO

function mostrarSonho() {
    document.getElementById("modal").classList.add("aberto");
}

function fecharModal() {
    document.getElementById("modal").classList.remove("aberto");
}

// FECHAR MODAL AO CLICAR FORA

document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

// BOTÃO PUBLICAR DO MENU

function irParaPublicacao() {
    document.getElementById("criar").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("textoPost").focus();
}

// INICIALIZAÇÃO

atualizarEstatisticas();
