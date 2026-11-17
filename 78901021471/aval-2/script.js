
const stories = [
    {nome: "Lucas", foto: 12},
    {nome: "Gabriel", foto: 13},
    {nome: "Pedro", foto: 14},
    {nome: "Matheus", foto: 15},
    {nome: "Rafael", foto: 16},
    {nome: "João", foto: 17},
    {nome: "Bruno", foto: 18}
];

const publicacoes = [
    {
        nome: "Lucas Oliveira",
        foto: 12,
        legenda: "Treino de futebol hoje! ⚽🔥",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        nome: "Gabriel Santos",
        foto: 13,
        legenda: "Momentos de futsal com os amigos! 🏆",
        imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"
    },
    {
        nome: "Pedro Henrique",
        foto: 14,
        legenda: "O futebol é nossa paixão! ⚽",
        imagem: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800"
    }
];

const areaStories = document.getElementById("listaStories");

stories.forEach(story => {
    areaStories.innerHTML += `
        <div class="story" onclick="abrirStory('${story.nome}')">
            <img src="https://i.pravatar.cc/100?img=${story.foto}">
            <p>${story.nome}</p>
        </div>
    `;
});

function abrirStory(nome) {
    alert("Você está vendo o story de " + nome);
}

function mostrarPublicacoes(lista) {
    const area = document.getElementById("publicacoes");
    area.innerHTML = "";

    lista.forEach((post, index) => {
        const conteudo = document.createElement("div");
        conteudo.className = "publicacao";

        conteudo.innerHTML = `
            <div class="usuario">
                <img src="https://i.pravatar.cc/100?img=${post.foto}">
                <h3>${post.nome}</h3>
            </div>

            <p class="legenda">${post.legenda}</p>

            ${post.video ?
                `<video controls>
                    <source src="${post.video}" type="video/mp4">
                    Seu navegador não suporta vídeos.
                </video>` :
                `<img class="foto-post" src="${post.imagem}">`
            }

            <div class="interacoes">
                <button onclick="curtir(this)">❤️ Curtir</button>
                <button onclick="mostrarComentario(${index})">💬 Comentar</button>
                <button onclick="compartilhar()">📤 Compartilhar</button>
            </div>

            <div class="comentarios" id="comentarios${index}">
                <input id="comentario${index}"
                placeholder="Escreva um comentário...">

                <button onclick="comentar(${index})">Enviar</button>

                <div id="listaComentarios${index}"></div>
            </div>
        `;

        area.appendChild(conteudo);
    });
}

function curtir(botao) {
    botao.classList.toggle("curtido");

    if (botao.classList.contains("curtido")) {
        botao.textContent = "❤️ Curtido";
    } else {
        botao.textContent = "❤️ Curtir";
    }
}

function mostrarComentario(index) {
    document.getElementById("comentario" + index).focus();
}

function comentar(index) {
    const campo = document.getElementById("comentario" + index);
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "Você: " + texto;

    document.getElementById("listaComentarios" + index)
        .appendChild(comentario);

    campo.value = "";
}

function compartilhar() {
    alert("Publicação pronta para compartilhar!");
}

function criarPost() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa!");
        return;
    }

    const novoPost = {
        nome: "Lucas Oliveira",
        foto: 12,
        legenda: texto,
        imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"
    };

    publicacoes.unshift(novoPost);
    mostrarPublicacoes(publicacoes);

    document.getElementById("totalPosts").textContent =
        publicacoes.length;

    campo.value = "";
}

function mostrarPagina(pagina) {
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("mensagens").classList.add("escondido");
    document.getElementById("perfil").classList.add("escondido");

    document.getElementById(pagina).classList.remove("escondido");
}

function enviarMensagem() {
    const campo = document.getElementById("mensagemTexto");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma mensagem!");
        return;
    }

    const mensagem = document.createElement("p");
    mensagem.textContent = "Você: " + texto;

    document.getElementById("historico").appendChild(mensagem);

    campo.value = "";
}

function seguirPerfil(botao) {
    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
    } else {
        botao.textContent = "Seguir";
    }
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    const resultado = publicacoes.filter(post =>
        post.nome.toLowerCase().includes(termo) ||
        post.legenda.toLowerCase().includes(termo)
    );

    mostrarPublicacoes(resultado);
});

mostrarPublicacoes(publicacoes);
