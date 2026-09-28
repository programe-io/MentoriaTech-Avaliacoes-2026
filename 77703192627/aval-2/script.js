```javascript
let posts = [
    {
        id: 1,
        texto: "Olá! Eu sou o Carlos e essa é minha MiniSocial! 🚀",
        curtidas: 15,
        comentarios: [
            "Muito legal!",
            "Bem-vindo, Carlos!"
        ]
    },

    {
        id: 2,
        texto: "Hoje comecei a estudar programação! 💻🔥",
        curtidas: 8,
        comentarios: []
    }
];


// MOSTRAR POSTS

function mostrarPosts(lista = posts) {

    const container = document.getElementById("listaPosts");

    container.innerHTML = "";

    lista.forEach(post => {

        const elemento = document.createElement("div");

        elemento.className = "post";

        elemento.innerHTML = `

            <div class="post-cabecalho">

                <div class="post-foto">
                    👤
                </div>

                <div class="post-info">

                    <strong>Carlos</strong>

                    <span>
                        @carlos • agora
                    </span>

                </div>

            </div>


            <div class="post-texto">
                ${post.texto}
            </div>


            <div class="acoes">

                <button onclick="curtir(${post.id})">
                    ❤️ ${post.curtidas}
                </button>

                <button onclick="focarComentario(${post.id})">
                    💬 ${post.comentarios.length}
                </button>

                <button onclick="compartilhar()">
                    🔗 Compartilhar
                </button>

                <button onclick="excluir(${post.id})">
                    🗑️
                </button>

            </div>


            <div class="comentarios">

                <input
                    id="comentario-${post.id}"
                    type="text"
                    placeholder="Escreva um comentário..."
                    onkeydown="adicionarComentario(event, ${post.id})"
                >

                <div>

                    ${post.comentarios.map(comentario => `

                        <div class="comentario">
                            👤 ${comentario}
                        </div>

                    `).join("")}

                </div>

            </div>
        `;

        container.appendChild(elemento);
    });
}


// CURTIR

function curtir(id) {

    const post = posts.find(p => p.id === id);

    if (post) {

        post.curtidas++;

        salvar();

        mostrarPosts();
    }
}


// COMENTAR

function adicionarComentario(event, id) {

    if (event.key !== "Enter") {
        return;
    }

    const input = event.target;

    const comentario = input.value.trim();

    if (comentario === "") {
        return;
    }

    const post = posts.find(p => p.id === id);

    post.comentarios.push(comentario);

    input.value = "";

    salvar();

    mostrarPosts();
}


// FOCAR COMENTÁRIO

function focarComentario(id) {

    const input = document.getElementById(
        "comentario-" + id
    );

    if (input) {
        input.focus();
    }
}


// EXCLUIR POST

function excluir(id) {

    const confirmar = confirm(
        "Deseja excluir esta publicação?"
    );

    if (!confirmar) {
        return;
    }

    posts = posts.filter(
        post => post.id !== id
    );

    salvar();

    mostrarPosts();
}


// COMPARTILHAR

function compartilhar() {

    alert(
        "Publicação compartilhada! 🔗"
    );
}


// PUBLICAR

document
    .getElementById("publicar")
    .addEventListener("click", function () {

        const campo =
            document.getElementById("textoPost");

        const texto =
            campo.value.trim();

        if (texto === "") {

            alert(
                "Digite alguma coisa antes de publicar!"
            );

            return;
        }

        const novoPost = {

            id: Date.now(),

            texto: texto,

            curtidas: 0,

            comentarios: []
        };

        posts.unshift(novoPost);

        campo.value = "";

        salvar();

        mostrarPosts();
    });


// PESQUISAR

document
    .getElementById("pesquisa")
    .addEventListener("input", function () {

        const pesquisa =
            this.value.toLowerCase();

        const resultado =
            posts.filter(post =>
                post.texto
                    .toLowerCase()
                    .includes(pesquisa)
            );

        mostrarPosts(resultado);
    });


// MODO ESCURO

document
    .getElementById("modoBtn")
    .addEventListener("click", function () {

        document.body.classList.toggle("escuro");

        if (
            document.body.classList.contains("escuro")
        ) {

            this.textContent = "☀️";

        } else {

            this.textContent = "🌙";
        }
    });


// SALVAR

function salvar() {

    localStorage.setItem(
        "miniSocialPosts",
        JSON.stringify(posts)
    );
}


// INICIAR

const dadosSalvos =
    localStorage.getItem("miniSocialPosts");

if (dadosSalvos) {

    posts = JSON.parse(dadosSalvos);
}

mostrarPosts();
```
