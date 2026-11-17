
// CURTIDAS

function curtir(botao) {

    let icone = botao.querySelector("i");
    let numero = botao.querySelector("span");

    let curtidas = Number(numero.innerText);

    if (botao.classList.contains("curtido")) {

        botao.classList.remove("curtido");
        icone.className = "bi bi-heart";
        numero.innerText = curtidas - 1;

    } else {

        botao.classList.add("curtido");
        icone.className = "bi bi-heart-fill";
        numero.innerText = curtidas + 1;

    }
}


// SEGUIR USUÁRIO

function seguirUsuario(botao) {

    if (botao.classList.contains("seguindo")) {

        botao.classList.remove("seguindo");
        botao.innerText = "Seguir";

        Swal.fire({
            title: "Você deixou de seguir!",
            icon: "info",
            confirmButtonColor: "#8b5cf6"
        });

    } else {

        botao.classList.add("seguindo");
        botao.innerText = "Seguindo";

        Swal.fire({
            title: "Agora você está seguindo!",
            text: "Você começou a seguir este perfil.",
            icon: "success",
            confirmButtonColor: "#8b5cf6"
        });

    }
}


// COMENTÁRIOS

function comentar() {

    Swal.fire({
        title: "Deixe seu comentário!",
        input: "textarea",
        inputPlaceholder: "Escreva seu comentário...",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#8b5cf6",

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
                confirmButtonColor: "#8b5cf6"
            });

        }

    });

}


// COMPARTILHAR

function compartilhar() {

    const link = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(link).then(() => {

            Swal.fire({
                title: "Link copiado!",
                text: "Você já pode compartilhar esta página.",
                icon: "success",
                confirmButtonColor: "#8b5cf6"
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
        confirmButtonColor: "#8b5cf6"
    });

}


// PUBLICAR POSTAGEM

function publicarPost() {

    let texto = document.getElementById("textoPost").value.trim();

    if (texto === "") {

        Swal.fire({
            title: "Ops!",
            text: "Escreva alguma coisa antes de publicar.",
            icon: "warning",
            confirmButtonColor: "#8b5cf6"
        });

        return;

    }

    const novoPost = document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `
        <div class="usuario">

            <img src="https://i.pravatar.cc/100?img=12">

            <div>
                <strong>Meu Perfil</strong>
                <small>@meuperfil</small>
            </div>

        </div>

        <p class="legenda"></p>

        <div class="acoes">

            <button onclick="curtir(this)">
                <i class="bi bi-heart"></i>
                <span>0</span>
            </button>

            <button onclick="comentar()">
                <i class="bi bi-chat"></i> Comentar
            </button>

            <button onclick="compartilhar()">
                <i class="bi bi-share"></i> Compartilhar
            </button>

        </div>
    `;

    novoPost.querySelector(".legenda").textContent = texto;

    document.getElementById("feed").prepend(novoPost);

    document.getElementById("textoPost").value = "";

    Swal.fire({
        title: "Publicação realizada!",
        text: "Sua publicação apareceu no feed.",
        icon: "success",
        confirmButtonColor: "#8b5cf6"
    });

}


// EDITAR PERFIL

function editarPerfil() {

    Swal.fire({
        title: "Editar perfil",
        text: "Esta função poderá ser conectada a um sistema de cadastro futuramente.",
        icon: "info",
        confirmButtonText: "Entendi",
        confirmButtonColor: "#8b5cf6"
    });

}


/* SISTEMA DE STORIES */

let stories = [
    {
        nome: "Seu story",
        imagem: ""
    },
    {
        nome: "Ana",
        imagem: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900"
    },
    {
        nome: "Lucas",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
    },
    {
        nome: "Mariana",
        imagem: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900"
    },
    {
        nome: "Pedro",
        imagem: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900"
    }
];

let storyAtual = 0;
let temporizadorStory;
let animacaoStory;

function abrirStory(indice) {

    if (indice === 0 && !stories[0].imagem) {
        document.getElementById("arquivoStory").click();
        return;
    }

    storyAtual = indice;

    mostrarStory();
}

function mostrarStory() {

    clearTimeout(temporizadorStory);
    cancelAnimationFrame(animacaoStory);

    let story = stories[storyAtual];

    document.getElementById("nomeStory").innerText = story.nome;

    document.getElementById("imagemStory").src = story.imagem;

    let barra = document.getElementById("barraProgresso");

    barra.style.width = "0%";

    document.getElementById("visualizadorStory")
        .classList.add("ativo");

    let inicio = performance.now();
    const duracao = 5000;

    function atualizarBarra(tempo) {

        let progresso = Math.min(
            ((tempo - inicio) / duracao) * 100,
            100
        );

        barra.style.width = progresso + "%";

        if (progresso < 100) {
            animacaoStory = requestAnimationFrame(atualizarBarra);
        }

    }

    animacaoStory = requestAnimationFrame(atualizarBarra);

    temporizadorStory = setTimeout(() => {
        storyProximo();
    }, duracao);
}

function storyProximo() {

    if (storyAtual < stories.length - 1) {
        storyAtual++;
        mostrarStory();
    } else {
        fecharStory();
    }

}

function storyAnterior() {

    if (storyAtual > 0) {
        storyAtual--;
        mostrarStory();
    }

}

function fecharStory() {

    clearTimeout(temporizadorStory);
    cancelAnimationFrame(animacaoStory);

    document.getElementById("visualizadorStory")
        .classList.remove("ativo");

}

function adicionarStory(evento) {

    let arquivo = evento.target.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        Swal.fire("Arquivo inválido", "Escolha uma imagem.", "warning");
        return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {
        Swal.fire("Imagem muito grande", "Escolha uma imagem de até 5 MB.", "warning");
        return;
    }

    let leitor = new FileReader();

    leitor.onload = function(e) {

        stories[0] = {
            nome: "Seu story",
            imagem: e.target.result
        };

        let primeiroStory = document.querySelector(".story");

        primeiroStory.querySelector("img").src = e.target.result;

        Swal.fire({
            title: "Story publicado!",
            text: "Sua imagem foi adicionada aos stories.",
            icon: "success",
            confirmButtonColor: "#8b5cf6"
        });

        mostrarStory();

    };

    leitor.readAsDataURL(arquivo);

    evento.target.value = "";

}
