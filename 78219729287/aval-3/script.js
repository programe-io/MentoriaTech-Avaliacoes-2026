
// ELEMENTOS PRINCIPAIS
const modalCriar = document.getElementById("modalCriar");
const modalStory = document.getElementById("modalStory");
const notificacao = document.getElementById("notificacao");
const pesquisa = document.getElementById("pesquisa");

// SISTEMA DE NOTIFICAÇÕES
let tempoNotificacao;

function mostrarAviso(mensagem) {
    notificacao.textContent = mensagem;
    notificacao.classList.add("visivel");

    clearTimeout(tempoNotificacao);

    tempoNotificacao = setTimeout(() => {
        notificacao.classList.remove("visivel");
    }, 2500);
}

// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes span");

    let total = Number(contador.textContent.replace(/\D/g, ""));

    if (botao.classList.contains("ativo")) {
        botao.classList.remove("ativo");
        botao.textContent = "♡";
        total--;
        mostrarAviso("Curtida removida!");
    } else {
        botao.classList.add("ativo");
        botao.textContent = "♥";
        total++;
        mostrarAviso("Você curtiu esta publicação! ❤️");
    }

    contador.textContent = total.toLocaleString("pt-BR");
}

// FOCO NO CAMPO DE COMENTÁRIO
function focarComentario(botao) {
    const post = botao.closest(".post");
    const entrada = post.querySelector(".campo-comentario input");

    entrada.focus();
}

// PUBLICAR COMENTÁRIO
function comentar(botao) {
    const comentarios = botao.closest(".comentarios");
    const entrada = comentarios.querySelector("input");
    const lista = comentarios.querySelector(".lista-comentarios");

    const texto = entrada.value.trim();

    if (!texto) {
        mostrarAviso("Digite um comentário primeiro!");
        entrada.focus();
        return;
    }

    const item = document.createElement("p");
    item.className = "comentario-item";

    const usuario = document.createElement("strong");
    usuario.textContent = "seu.perfil ";

    item.append(usuario, document.createTextNode(texto));
    lista.appendChild(item);

    entrada.value = "";
    mostrarAviso("Comentário publicado! 💬");
}

// COMPARTILHAR PUBLICAÇÃO
async function compartilhar(botao) {
    const post = botao.closest(".post");
    const legenda = post.querySelector(".legenda").innerText;
    const usuario = post.querySelector(".user-info strong").innerText;

    const texto = `${usuario}: ${legenda}`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "InstaMix",
                text: texto
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(texto);
            mostrarAviso("Publicação copiada! 📋");
        } else {
            mostrarAviso("Compartilhamento não disponível neste navegador.");
        }
    } catch (erro) {
        if (erro.name !== "AbortError") {
            mostrarAviso("Não foi possível compartilhar.");
        }
    }
}

// SALVAR PUBLICAÇÃO
function salvar(botao) {
    if (botao.classList.contains("salvo")) {
        botao.classList.remove("salvo");
        botao.textContent = "♧";
        mostrarAviso("Publicação removida dos salvos.");
    } else {
        botao.classList.add("salvo");
        botao.textContent = "🔖";
        mostrarAviso("Publicação salva! 🔖");
    }
}

// SEGUIR PERFIS
function seguir(botao) {
    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
        botao.style.color = "#777";
        mostrarAviso("Você começou a seguir este perfil! 🎉");
    } else {
        botao.textContent = "Seguir";
        botao.style.color = "#b12b91";
        mostrarAviso("Você deixou de seguir este perfil.");
    }
}

// ABRIR MODAL DE CRIAÇÃO
function abrirCriacao() {
    modalCriar.classList.add("aberto");
}

// FECHAR MODAL DE CRIAÇÃO
function fecharCriacao() {
    modalCriar.classList.remove("aberto");
}

// CRIAR NOVA PUBLICAÇÃO
function criarPublicacao() {
    const usuario = document.getElementById("novoUsuario").value.trim();
    const imagem = document.getElementById("novaImagem").value.trim();
    const legenda = document.getElementById("novaLegenda").value.trim();

    if (!usuario || !legenda) {
        mostrarAviso("Preencha seu usuário e a legenda!");
        return;
    }

    // Verifica se o endereço da imagem é válido
    let imagemFinal = "";

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("Endereço inválido");
            }

            imagemFinal = url.href;
        } catch {
            mostrarAviso("Informe um endereço de imagem válido!");
            return;
        }
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.search = `${usuario} ${legenda}`.toLowerCase();

    // CABEÇALHO
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "😎";

    const informacoes = document.createElement("div");
    informacoes.className = "user-info";

    const nome = document.createElement("strong");
    nome.textContent = usuario.replace(/^@/, "");

    const local = document.createElement("small");
    local.textContent = "✨ Nova publicação";

    informacoes.append(nome, local);

    const opcoes = document.createElement("button");
    opcoes.className = "mais";
    opcoes.textContent = "•••";
    opcoes.addEventListener("click", () => {
        mostrarAviso("Opções da publicação");
    });

    cabecalho.append(avatar, informacoes, opcoes);

    // IMAGEM
    const foto = document.createElement("img");
    foto.className = "post-imagem";
    foto.alt = "Imagem da publicação";

    foto.src = imagemFinal ||
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900";

    foto.onerror = function () {
        this.onerror = null;
        this.src = "https://placehold.co/900x900/e9d8ff/7b2ff7?text=InstaMix";
    };

    // AÇÕES
    const acoes = document.createElement("div");
    acoes.className = "post-acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "like";
    botaoCurtir.textContent = "♡";
    botaoCurtir.addEventListener("click", function () {
        curtir(this);
    });

    const botaoComentario = document.createElement("button");
    botaoComentario.textContent = "💬";
    botaoComentario.addEventListener("click", function () {
        focarComentario(this);
    });

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "➤";
    botaoCompartilhar.addEventListener("click", function () {
        compartilhar(this);
    });

    const botaoSalvar = document.createElement("button");
    botaoSalvar.className = "salvar";
    botaoSalvar.textContent = "♧";
    botaoSalvar.addEventListener("click", function () {
        salvar(this);
    });

    acoes.append(
        botaoCurtir,
        botaoComentario,
        botaoCompartilhar,
        botaoSalvar
    );

    // LEGENDA E CURTIDAS
    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "❤️ ";

    const numero = document.createElement("span");
    numero.textContent = "0";
    likes.appendChild(numero);
    likes.append(" curtidas");

    const textoLegenda = document.createElement("p");
    textoLegenda.className = "legenda";

    const nomeLegenda = document.createElement("strong");
    nomeLegenda.textContent = usuario.replace(/^@/, "") + " ";

    textoLegenda.append(nomeLegenda, document.createTextNode(legenda));

    const data = document.createElement("p");
    data.className = "data";
    data.textContent = "AGORA";

    // COMENTÁRIOS
    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    const campo = document.createElement("div");
    campo.className = "campo-comentario";

    const entrada = document.createElement("input");
    entrada.type = "text";
    entrada.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.addEventListener("click", function () {
        comentar(this);
    });

    entrada.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            comentar(enviar);
        }
    });

    campo.append(entrada, enviar);
    comentarios.append(lista, campo);

    // MONTA PUBLICAÇÃO
    post.append(
        cabecalho,
        foto,
        acoes,
        likes,
        textoLegenda,
        data,
        comentarios
    );

    document.querySelector(".feed").prepend(post);

    // LIMPA FORMULÁRIO
    document.getElementById("novaLegenda").value = "";
    document.getElementById("novaImagem").value = "";

    fecharCriacao();
    mostrarAviso("Sua publicação foi compartilhada! 🎉");

    post.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    filtrarPublicacoes();
}

// STORIES
function abrirStory(nome) {
    document.getElementById("nomeStory").textContent = nome;
    modalStory.classList.add("aberto");
}

function fecharStory() {
    modalStory.classList.remove("aberto");
}

// PESQUISA
pesquisa.addEventListener("input", filtrarPublicacoes);

function filtrarPublicacoes() {
    const termo = pesquisa.value.toLowerCase().trim();
    const posts = document.querySelectorAll(".feed .post");

    posts.forEach(post => {
        const conteudo = (
            post.innerText + " " + (post.dataset.search || "")
        ).toLowerCase();

        post.style.display = conteudo.includes(termo)
            ? "block"
            : "none";
    });
}

// NAVEGAÇÃO
function irParaInicio() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function irParaPerfil() {
    mostrarAviso("Este é o perfil demonstrativo @seu.perfil! 😎");
}

// FECHAR MODAIS AO CLICAR FORA
modalCriar.addEventListener("click", function (evento) {
    if (evento.target === modalCriar) {
        fecharCriacao();
    }
});

modalStory.addEventListener("click", function (evento) {
    if (evento.target === modalStory) {
        fecharStory();
    }
});

// TECLA ESC FECHA OS MODAIS
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        fecharCriacao();
        fecharStory();
    }
});

// INICIALIZAÇÃO
filtrarPublicacoes();
