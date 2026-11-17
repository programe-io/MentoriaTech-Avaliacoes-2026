
// CURTIR PUBLICAÇÃO

function curtir(botao) {

    let icone = botao.querySelector("i");
    let numero = botao.querySelector("span");

    let quantidade = Number(numero.innerText);

    if (botao.classList.contains("curtido")) {

        botao.classList.remove("curtido");
        icone.className = "bi bi-heart";
        numero.innerText = quantidade - 1;

    } else {

        botao.classList.add("curtido");
        icone.className = "bi bi-heart-fill";
        numero.innerText = quantidade + 1;

    }

}


// SEGUIR USUÁRIO

function seguirUsuario(botao) {

    botao.classList.toggle("seguindo");

    if (botao.classList.contains("seguindo")) {

        botao.innerText = "Seguindo";

        Swal.fire({
            title: "Novo perfil seguido!",
            icon: "success",
            confirmButtonColor: "#ff6b35"
        });

    } else {

        botao.innerText = "Seguir";

        Swal.fire({
            title: "Você deixou de seguir!",
            icon: "info",
            confirmButtonColor: "#ff6b35"
        });

    }

}


// COMENTAR

function comentar() {

    Swal.fire({
        title: "Escreva seu comentário",
        input: "textarea",
        inputPlaceholder: "Digite seu comentário...",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ff6b35",

        inputValidator: (valor) => {

            if (!valor.trim()) {
                return "Digite um comentário!";
            }

        }

    }).then((resultado) => {

        if (resultado.isConfirmed) {

            Swal.fire({
                title: "Comentário enviado!",
                text: resultado.value,
                icon: "success",
                confirmButtonColor: "#ff6b35"
            });

        }

    });

}


// REPOSTAR

function repostar(botao) {

    let numero = botao.querySelector("span");
    let quantidade = Number(numero.innerText);

    if (botao.classList.contains("repostado")) {

        botao.classList.remove("repostado");
        numero.innerText = quantidade - 1;

        Swal.fire({
            title: "Repostagem desfeita!",
            icon: "info",
            confirmButtonColor: "#ff6b35"
        });

    } else {

        botao.classList.add("repostado");
        numero.innerText = quantidade + 1;

        Swal.fire({
            title: "Publicação repostada!",
            text: "Você compartilhou esta publicação.",
            icon: "success",
            confirmButtonColor: "#ff6b35"
        });

    }

}


// COMPARTILHAR

function compartilhar() {

    let link = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(link).then(() => {

            Swal.fire({
                title: "Link copiado!",
                text: "Compartilhe com seus amigos.",
                icon: "success",
                confirmButtonColor: "#ff6b35"
            });

        }).catch(() => mostrarLink(link));

    } else {

        mostrarLink(link);

    }

}

function mostrarLink(link) {

    Swal.fire({
        title: "Compartilhe esta página",
        text: link,
        icon: "info",
        confirmButtonColor: "#ff6b35"
    });

}


// PUBLICAR

function publicarPost() {

    let texto = document.getElementById("textoPost").value.trim();

    if (texto === "") {

        Swal.fire({
            title: "Ops!",
            text: "Escreva alguma coisa antes de publicar.",
            icon: "warning",
            confirmButtonColor: "#ff6b35"
        });

        return;

    }

    const post = document.createElement("article");

    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const foto = document.createElement("img");
    foto.src = "https://i.pravatar.cc/100?img=12";
    foto.alt = "Foto do perfil";

    const informacoes = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Perfil";

    const identificador = document.createElement("small");
    identificador.textContent = "@meuperfil";

    informacoes.append(nome, identificador);
    usuario.append(foto, informacoes);

    const conteudo = document.createElement("p");
    conteudo.className = "texto-publicacao";
    conteudo.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button onclick="curtir(this)">
            <i class="bi bi-heart"></i>
            <span>0</span>
        </button>

        <button onclick="comentar()">
            <i class="bi bi-chat"></i> Comentar
        </button>

        <button onclick="repostar(this)">
            <i class="bi bi-repeat"></i>
            <span>0</span>
        </button>

        <button onclick="compartilhar()">
            <i class="bi bi-share"></i>
        </button>
    `;

    post.append(usuario, conteudo, acoes);

    document.getElementById("publicacoes").prepend(post);

    document.getElementById("textoPost").value = "";

    let total = document.getElementById("totalPosts");

    total.innerText = Number(total.innerText) + 1;

    Swal.fire({
        title: "Publicado com sucesso!",
        text: "Sua publicação já está no feed.",
        icon: "success",
        confirmButtonColor: "#ff6b35"
    });

}


// EDITAR PERFIL

function editarPerfil() {

    Swal.fire({
        title: "Editar perfil",
        text: "Em breve você poderá alterar sua foto, nome e descrição.",
        icon: "info",
        confirmButtonColor: "#ff6b35"
    });

}
