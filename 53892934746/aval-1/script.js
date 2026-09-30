/* =================================
   DADOS DO USUÁRIO
================================= */

let usuario = {
    nome: "Carlos Silva",
    username: "carlos",
    avatar: "C"
};


/* =================================
   PUBLICAÇÕES INICIAIS
================================= */

let posts = JSON.parse(
    localStorage.getItem("posts")
) || [

    {
        id: 1,
        nome: "Mariana",
        username: "mariana",
        avatar: "M",
        texto: "Olá! Seja bem-vindo à rede social Conecta!",
        curtidas: 12,
        curtido: false,
        comentarios: []
    },

    {
        id: 2,
        nome: "João",
        username: "joao",
        avatar: "J",
        texto: "Hoje estou estudando JavaScript. 🚀",
        curtidas: 8,
        curtido: false,
        comentarios: []
    }

];


/* =================================
   INICIALIZAÇÃO
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarUsuario();

        mostrarPosts();

    }
);


/* =================================
   CARREGAR USUÁRIO
================================= */

function carregarUsuario() {

    document.getElementById(
        "nomeUsuario"
    ).textContent = usuario.nome;

    document.getElementById(
        "usuario"
    ).textContent = "@" + usuario.username;

    document.getElementById(
        "avatarUsuario"
    ).textContent = usuario.avatar;

    document.getElementById(
        "perfilNome"
    ).textContent = usuario.nome;

    document.getElementById(
        "perfilUsuario"
    ).textContent = "@" + usuario.username;

}


/* =================================
   CRIAR PUBLICAÇÃO
================================= */

function criarPost() {

    const campo = document.getElementById(
        "textoPost"
    );

    const texto = campo.value.trim();


    if (texto === "") {

        alert(
            "Digite alguma coisa antes de publicar."
        );

        return;
    }


    const novoPost = {

        id: Date.now(),

        nome: usuario.nome,

        username: usuario.username,

        avatar: usuario.avatar,

        texto: texto,

        curtidas: 0,

        curtido: false,

        comentarios: []

    };


    posts.unshift(novoPost);


    salvarPosts();

    mostrarPosts();


    campo.value = "";

}


/* =================================
   EXIBIR POSTS
================================= */

function mostrarPosts() {

    const lista = document.getElementById(
        "listaPosts"
    );


    lista.innerHTML = "";


    posts.forEach(function (post) {

        const elemento = document.createElement(
            "div"
        );


        elemento.className = "post";


        elemento.innerHTML = `

            <div class="post-cabecalho">

                <div class="avatar">
                    ${post.avatar}
                </div>

                <div class="post-usuario">

                    <strong>
                        ${post.nome}
                    </strong>

                    <p>
                        @${post.username}
                    </p>

                </div>

            </div>


            <div class="post-texto">
                ${post.texto}
            </div>


            <div class="post-rodape">

                <button
                    onclick="curtirPost(${post.id})"
                >
                    ${post.curtido ? "❤️" : "🤍"}
                    ${post.curtidas}
                </button>


                <button
                    onclick="comentarPost(${post.id})"
                >
                    💬
                    ${post.comentarios.length}
                </button>


                <button
                    onclick="compartilharPost(${post.id})"
                >
                    ↗ Compartilhar
                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });


    document.getElementById(
        "totalPublicacoes"
    ).textContent = posts.filter(
        post => post.username === usuario.username
    ).length;

}


/* =================================
   CURTIR POST
================================= */

function curtirPost(id) {

    const post = posts.find(
        post => post.id === id
    );


    if (!post) return;


    if (post.curtido) {

        post.curtidas--;

        post.curtido = false;

    } else {

        post.curtidas++;

        post.curtido = true;

    }


    salvarPosts();

    mostrarPosts();

}


/* =================================
   COMENTAR
================================= */

function comentarPost(id) {

    const comentario = prompt(
        "Digite seu comentário:"
    );


    if (
        comentario === null ||
        comentario.trim() === ""
    ) {
        return;
    }


    const post = posts.find(
        post => post.id === id
    );


    post.comentarios.push({

        usuario: usuario.nome,

        texto: comentario

    });


    salvarPosts();

    mostrarPosts();

}


/* =================================
   COMPARTILHAR
================================= */

function compartilharPost(id) {

    const post = posts.find(
        post => post.id === id
    );


    if (!post) return;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard.writeText(
            post.texto
        );

        alert(
            "Publicação copiada para a área de transferência!"
        );

    } else {

        alert(
            "Publicação compartilhada!"
        );

    }

}


/* =================================
   SEGUIR USUÁRIO
================================= */

function seguir(botao) {

    if (botao.textContent.trim() === "Seguir") {

        botao.textContent = "Seguindo";

        botao.style.background =
            "#42b883";

    } else {

        botao.textContent = "Seguir";

        botao.style.background =
            "#4267B2";

    }

}


/* =================================
   PESQUISA
================================= */

function pesquisarUsuarios() {

    const texto =
        document
            .getElementById("campoPesquisa")
            .value
            .toLowerCase();


    const postsFiltrados =
        posts.filter(function (post) {

            return (

                post.nome
                    .toLowerCase()
                    .includes(texto)

                ||

                post.username
                    .toLowerCase()
                    .includes(texto)

                ||

                post.texto
                    .toLowerCase()
                    .includes(texto)

            );

        });


    mostrarPostsPesquisa(postsFiltrados);

}


/* =================================
   MOSTRAR RESULTADO DA PESQUISA
================================= */

function mostrarPostsPesquisa(listaPosts) {

    const lista =
        document.getElementById(
            "listaPosts"
        );


    lista.innerHTML = "";


    listaPosts.forEach(function (post) {

        const elemento =
            document.createElement("div");


        elemento.className = "post";


        elemento.innerHTML = `

            <div class="post-cabecalho">

                <div class="avatar">
                    ${post.avatar}
                </div>

                <div class="post-usuario">

                    <strong>
                        ${post.nome}
                    </strong>

                    <p>
                        @${post.username}
                    </p>

                </div>

            </div>


            <div class="post-texto">
                ${post.texto}
            </div>

            <div class="post-rodape">

                <button
                    onclick="curtirPost(${post.id})"
                >
                    ❤️ ${post.curtidas}
                </button>

                <button
                    onclick="comentarPost(${post.id})"
                >
                    💬 ${post.comentarios.length}
                </button>

            </div>

        `;


        lista.appendChild(elemento);

    });

}


/* =================================
   PERFIL
================================= */

function mostrarPerfil() {

    document
        .getElementById("modalPerfil")
        .classList.add("ativo");

}


/* =================================
   FECHAR MODAL
================================= */

function fecharModal() {

    document
        .getElementById("modalPerfil")
        .classList.remove("ativo");

}


/* =================================
   INÍCIO
================================= */

function mostrarInicio() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =================================
   NOTIFICAÇÕES
================================= */

function mostrarNotificacoes() {

    alert(
        "Você não possui novas notificações."
    );

}


/* =================================
   CONFIGURAÇÕES
================================= */

function mostrarConfiguracoes() {

    alert(
        "Área de configurações em desenvolvimento."
    );

}


/* =================================
   TEMA
================================= */

function alternarTema() {

    document.body.classList.toggle(
        "escuro"
    );


    const temaEscuro =
        document.body.classList.contains(
            "escuro"
        );


    localStorage.setItem(
        "tema",
        temaEscuro ? "escuro" : "claro"
    );

}


/* =================================
   RECUPERAR TEMA
================================= */

if (
    localStorage.getItem("tema") ===
    "escuro"
) {

    document.body.classList.add(
        "escuro"
    );

}


/* =================================
   SALVAR POSTS
================================= */

function salvarPosts() {

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

}
