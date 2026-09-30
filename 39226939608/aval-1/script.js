/* =========================================
   CONFIGURAÇÕES
========================================= */

const CHAVE_STORAGE = "conecta_posts";

let publicacoes = JSON.parse(
    localStorage.getItem(CHAVE_STORAGE)
) || [
    {
        id: 1,
        usuario: "Ana Martins",
        username: "@anamartins",
        avatar: "AM",
        texto: "Hoje comecei um novo projeto de desenvolvimento web! 🚀",
        curtidas: 12,
        curtido: false,
        comentarios: [
            {
                usuario: "Carlos Souza",
                texto: "Muito legal! Boa sorte no projeto!"
            }
        ],
        data: Date.now() - 3600000
    },

    {
        id: 2,
        usuario: "Carlos Souza",
        username: "@carlossouza",
        avatar: "CS",
        texto: "JavaScript é uma linguagem incrível para criar aplicações web interativas. 💻",
        curtidas: 24,
        curtido: false,
        comentarios: [],
        data: Date.now() - 7200000
    },

    {
        id: 3,
        usuario: "Maria Lima",
        username: "@marialima",
        avatar: "ML",
        texto: "Terminando mais uma semana de estudos. Nunca pare de aprender! 📚",
        curtidas: 8,
        curtido: false,
        comentarios: [],
        data: Date.now() - 86400000
    }
];


/* =========================================
   ELEMENTOS HTML
========================================= */

const listaPublicacoes =
    document.getElementById("listaPublicacoes");

const textoPublicacao =
    document.getElementById("textoPublicacao");

const btnPublicar =
    document.getElementById("btnPublicar");

const contadorPosts =
    document.getElementById("contadorPosts");

const campoBusca =
    document.getElementById("campoBusca");

const ordenacao =
    document.getElementById("ordenacao");

const modalPerfil =
    document.getElementById("modalPerfil");

const fecharModal =
    document.getElementById("fecharModal");


/* =========================================
   SALVAR NO LOCALSTORAGE
========================================= */

function salvarPublicacoes() {

    localStorage.setItem(
        CHAVE_STORAGE,
        JSON.stringify(publicacoes)
    );
}


/* =========================================
   FORMATAR DATA
========================================= */

function formatarData(data) {

    const agora = Date.now();

    const diferenca =
        agora - data;

    const minuto =
        60 * 1000;

    const hora =
        60 * minuto;

    const dia =
        24 * hora;


    if (diferenca < minuto) {
        return "agora";
    }

    if (diferenca < hora) {

        const minutos =
            Math.floor(diferenca / minuto);

        return `há ${minutos} min`;
    }

    if (diferenca < dia) {

        const horas =
            Math.floor(diferenca / hora);

        return `há ${horas} h`;
    }

    const dias =
        Math.floor(diferenca / dia);

    return `há ${dias} dia${dias > 1 ? "s" : ""}`;
}


/* =========================================
   RENDERIZAR PUBLICAÇÕES
========================================= */

function renderizarPublicacoes() {

    let lista = [...publicacoes];

    const termo =
        campoBusca.value
            .toLowerCase()
            .trim();


    /* BUSCA */

    if (termo !== "") {

        lista = lista.filter(post => {

            return (
                post.texto
                    .toLowerCase()
                    .includes(termo)
                ||

                post.usuario
                    .toLowerCase()
                    .includes(termo)
                ||

                post.username
                    .toLowerCase()
                    .includes(termo)
            );
        });
    }


    /* ORDENAÇÃO */

    if (ordenacao.value === "recentes") {

        lista.sort(
            (a, b) => b.data - a.data
        );

    } else if (ordenacao.value === "antigas") {

        lista.sort(
            (a, b) => a.data - b.data
        );

    } else if (ordenacao.value === "curtidas") {

        lista.sort(
            (a, b) => b.curtidas - a.curtidas
        );
    }


    /* LIMPAR FEED */

    listaPublicacoes.innerHTML = "";


    /* NENHUM RESULTADO */

    if (lista.length === 0) {

        listaPublicacoes.innerHTML = `
            <div class="empty">
                <h3>Nenhuma publicação encontrada</h3>
                <p>Tente pesquisar outro termo.</p>
            </div>
        `;

        return;
    }


    /* CRIAR POSTS */

    lista.forEach(post => {

        const elemento =
            criarElementoPost(post);

        listaPublicacoes.appendChild(
            elemento
        );
    });


    atualizarContador();
}


/* =========================================
   CRIAR ELEMENTO DE POST
========================================= */

function criarElementoPost(post) {

    const article =
        document.createElement("article");

    article.className = "post";

    const comentariosHTML =
        post.comentarios
            .map(comentario => {

                return `
                    <div class="comment">
                        <strong>
                            ${escaparHTML(comentario.usuario)}
                        </strong>

                        <span>
                            ${escaparHTML(comentario.texto)}
                        </span>
                    </div>
                `;

            })
            .join("");


    article.innerHTML = `

        <div class="post-header">

            <div class="avatar">
                ${escaparHTML(post.avatar)}
            </div>

            <div class="post-user">

                <strong>
                    ${escaparHTML(post.usuario)}
                </strong>

                <span>
                    ${escaparHTML(post.username)}
                    ·
                    ${formatarData(post.data)}
                </span>

            </div>

            <button
                class="delete-post"
                data-id="${post.id}"
                title="Excluir publicação"
            >
                ⋮
            </button>

        </div>


        <div class="post-text">
            ${escaparHTML(post.texto)}
        </div>


        <div class="post-actions">

            <button
                class="action-btn ${post.curtido ? "liked" : ""}"
                data-action="like"
                data-id="${post.id}"
            >
                ${post.curtido ? "❤️" : "♡"}
                ${post.curtidas}
            </button>

            <button
                class="action-btn"
                data-action="comment"
                data-id="${post.id}"
            >
                💬
                ${post.comentarios.length}
            </button>

            <button
                class="action-btn"
                data-action="share"
                data-id="${post.id}"
            >
                ↗️ Compartilhar
            </button>

        </div>


        <div
            class="comments"
            id="comments-${post.id}"
        >

            ${comentariosHTML}

            <form
                class="comment-form"
                data-id="${post.id}"
            >

                <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    maxlength="200"
                >

                <button type="submit">
                    ➤
                </button>

            </form>

        </div>

    `;


    return article;
}


/* =========================================
   CURTIR PUBLICAÇÃO
========================================= */

function curtirPublicacao(id) {

    const post =
        publicacoes.find(
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


    salvarPublicacoes();

    renderizarPublicacoes();
}


/* =========================================
   ADICIONAR COMENTÁRIO
========================================= */

function adicionarComentario(
    id,
    texto
) {

    const post =
        publicacoes.find(
            post => post.id === id
        );

    if (!post || !texto.trim()) {
        return;
    }


    post.comentarios.push({

        usuario: "João Silva",

        texto: texto.trim()

    });


    salvarPublicacoes();

    renderizarPublicacoes();
}


/* =========================================
   EXCLUIR PUBLICAÇÃO
========================================= */

function excluirPublicacao(id) {

    const confirmacao =
        confirm(
            "Deseja realmente excluir esta publicação?"
        );

    if (!confirmacao) {
        return;
    }


    publicacoes =
        publicacoes.filter(
            post => post.id !== id
        );


    salvarPublicacoes();

    renderizarPublicacoes();
}


/* =========================================
   COMPARTILHAR
========================================= */

function compartilharPublicacao(id) {

    const post =
        publicacoes.find(
            post => post.id === id
        );

    if (!post) return;


    const texto =
        `Confira esta publicação de ${post.usuario}: ${post.texto}`;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(texto)
            .then(() => {

                alert(
                    "Publicação copiada para a área de transferência!"
                );

            })
            .catch(() => {

                alert(texto);

            });

    } else {

        alert(texto);
    }
}


/* =========================================
   PUBLICAR NOVO POST
========================================= */

function publicar() {

    const texto =
        textoPublicacao.value.trim();


    if (texto === "") {

        alert(
            "Digite alguma coisa antes de publicar."
        );

        textoPublicacao.focus();

        return;
    }


    const novoPost = {

        id:
            Date.now(),

        usuario:
            "João Silva",

        username:
            "@joaosilva",

        avatar:
            "JS",

        texto:
            texto,

        curtidas:
            0,

        curtido:
            false,

        comentarios:
            [],

        data:
            Date.now()
    };


    publicacoes.unshift(
        novoPost
    );


    salvarPublicacoes();


    textoPublicacao.value = "";


    renderizarPublicacoes();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =========================================
   ATUALIZAR CONTADOR
========================================= */

function atualizarContador() {

    const meusPosts =
        publicacoes.filter(
            post =>
                post.username === "@joaosilva"
        ).length;


    contadorPosts.textContent =
        meusPosts;
}


/* =========================================
   EVITAR HTML MALICIOSO
========================================= */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto;

    return div.innerHTML;
}


/* =========================================
   EVENTO DE PUBLICAR
========================================= */

btnPublicar.addEventListener(
    "click",
    publicar
);


/* =========================================
   CTRL + ENTER PUBLICA
========================================= */

textoPublicacao.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            publicar();
        }
    }
);


/* =========================================
   EVENTOS DO FEED
========================================= */

listaPublicacoes.addEventListener(
    "click",
    function(event) {

        const botao =
            event.target.closest("button");

        if (!botao) return;


        const id =
            Number(botao.dataset.id);

        const action =
            botao.dataset.action;


        /* CURTIR */

        if (action === "like") {

            curtirPublicacao(id);

            return;
        }


        /* COMENTÁRIO */

        if (action === "comment") {

            const input =
                document.querySelector(
                    `#comments-${id} input`
                );

            if (input) {
                input.focus();
            }

            return;
        }


        /* COMPARTILHAR */

        if (action === "share") {

            compartilharPublicacao(id);

            return;
        }


        /* EXCLUIR */

        if (
            botao.classList.contains(
                "delete-post"
            )
        ) {

            excluirPublicacao(id);
        }
    }
);


/* =========================================
   FORMULÁRIO DE COMENTÁRIO
========================================= */

listaPublicacoes.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const form =
            event.target.closest(
                ".comment-form"
            );

        if (!form) return;


        const id =
            Number(form.dataset.id);


        const input =
            form.querySelector("input");


        adicionarComentario(
            id,
            input.value
        );
    }
);


/* =========================================
   BUSCA
========================================= */

campoBusca.addEventListener(
    "input",
    renderizarPublicacoes
);


/* =========================================
   ORDENAÇÃO
========================================= */

ordenacao.addEventListener(
    "change",
    renderizarPublicacoes
);


/* =========================================
   BOTÕES SEGUIR
========================================= */

document
    .querySelectorAll(".follow-btn")
    .forEach(botao => {

        botao.addEventListener(
            "click",
            function() {

                if (
                    botao.textContent.trim()
                    === "Seguir"
                ) {

                    botao.textContent =
                        "Seguindo";

                    botao.style.background =
                        "var(--primary)";

                    botao.style.color =
                        "white";

                } else {

                    botao.textContent =
                        "Seguir";

                    botao.style.background =
                        "transparent";

                    botao.style.color =
                        "var(--primary)";
                }
            }
        );
    });


/* =========================================
   ABRIR PERFIL
========================================= */

document
    .querySelectorAll(".menu-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".menu-item"
                    )
                    .forEach(
                        menu =>
                            menu.classList
                                .remove("active")
                    );

                item.classList.add("active");


                const texto =
                    item.innerText;


                if (
                    texto.includes(
                        "Meu perfil"
                    )
                ) {

                    modalPerfil.classList
                        .add("show");
                }
            }
        );
    });


/* =========================================
   FECHAR MODAL
========================================= */

fecharModal.addEventListener(
    "click",
    function() {

        modalPerfil.classList
            .remove("show");
    }
);


modalPerfil.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modalPerfil
        ) {

            modalPerfil.classList
                .remove("show");
        }
    }
);


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            modalPerfil.classList
                .remove("show");
        }
    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderizarPublicacoes();
