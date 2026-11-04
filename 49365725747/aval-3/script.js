
let publicacoes = [
    {
        usuario: "maria",
        imagem: "https://picsum.photos/id/1011/500/400",
        legenda: "Aproveitando o dia! ❤️",
        curtidas: 10,
        comentarios: []
    },
    {
        usuario: "pedro",
        imagem: "https://picsum.photos/id/1039/500/400",
        legenda: "Que lugar incrível! 🌎",
        curtidas: 25,
        comentarios: []
    }
];

function mostrarPosts() {
    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    publicacoes.forEach((post, index) => {

        feed.innerHTML += `
            <div class="post">

                <h3>👤 ${post.usuario}</h3>

                <img src="${post.imagem}" alt="Publicação">

                <div class="post-info">

                    <div class="acoes">
                        <span onclick="curtir(${index})">❤️</span>
                        <span>💬</span>
                    </div>

                    <strong>${post.curtidas} curtidas</strong>

                    <p>
                        <b>${post.usuario}</b>
                        ${post.legenda}
                    </p>

                    ${post.comentarios.map(c => `
                        <p>💬 ${c}</p>
                    `).join("")}

                    <div class="comentario">
                        <input
                            type="text"
                            id="comentario-${index}"
                            placeholder="Adicionar comentário"
                        >

                        <button onclick="comentar(${index})">
                            Enviar
                        </button>
                    </div>

                </div>
            </div>
        `;
    });
}

function curtir(index) {
    publicacoes[index].curtidas++;
    mostrarPosts();
}

function comentar(index) {
    const campo = document.getElementById(
        `comentario-${index}`
    );

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    publicacoes[index].comentarios.push(texto);

    mostrarPosts();
}

function criarPost() {
    const usuario = document.getElementById("usuario").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !imagem || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    publicacoes.unshift({
        usuario: usuario,
        imagem: imagem,
        legenda: legenda,
        curtidas: 0,
        comentarios: []
    });

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    mostrarPosts();
}

// Iniciar o Instagram
mostrarPosts();
