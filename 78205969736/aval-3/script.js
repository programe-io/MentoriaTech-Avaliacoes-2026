
const posts = document.querySelector("#publicacoes");
const modal = document.querySelector("#modal");

// ABRIR E FECHAR A JANELA DE PUBLICAÇÃO

function abrirCriacao() {
    modal.classList.add("aberto");
}

function fecharCriacao() {
    modal.classList.remove("aberto");
}

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        fecharCriacao();
    }
});

// CURTIR PUBLICAÇÕES

document.addEventListener("click", function(event) {
    const botao = event.target.closest(".curtir");

    if (!botao) return;

    botao.classList.toggle("liked");

    const icone = botao.querySelector("i");
    const post = botao.closest(".post");
    const contador = post.querySelector(".contador");

    let numero = Number(contador.dataset.numero);

    if (Number.isNaN(numero)) {
        numero = Number(contador.textContent.replace(/\D/g, ""));
    }

    if (botao.classList.contains("liked")) {
        numero++;
        icone.className = "fa-solid fa-heart";
    } else {
        numero--;
        icone.className = "fa-regular fa-heart";
    }

    contador.dataset.numero = numero;
    contador.textContent = numero.toLocaleString("pt-BR") + " curtidas";
});

// SALVAR PUBLICAÇÕES

document.addEventListener("click", function(event) {
    const botao = event.target.closest(".salvar");

    if (!botao) return;

    botao.classList.toggle("saved");

    const icone = botao.querySelector("i");

    if (botao.classList.contains("saved")) {
        icone.className = "fa-solid fa-bookmark";
    } else {
        icone.className = "fa-regular fa-bookmark";
    }
});

// COMENTÁRIOS

document.addEventListener("submit", function(event) {
    if (!event.target.classList.contains("form-comentario")) return;

    event.preventDefault();

    const formulario = event.target;
    const campo = formulario.querySelector("input");
    const texto = campo.value.trim();

    if (texto === "") return;

    const post = formulario.closest(".post");

    let lista = post.querySelector(".lista-comentarios");

    if (!lista) {
        lista = document.createElement("div");
        lista.className = "lista-comentarios";
        lista.style.padding = "0 18px 12px";
        lista.style.fontSize = "11px";
        post.insertBefore(lista, formulario);
    }

    const comentario = document.createElement("p");
    comentario.style.marginBottom = "7px";

    const usuario = document.createElement("strong");
    usuario.textContent = "Você ";

    const mensagem = document.createTextNode(texto);

    comentario.append(usuario, mensagem);
    lista.appendChild(comentario);

    campo.value = "";
});

// COMPARTILHAR PUBLICAÇÕES

document.addEventListener("click", async function(event) {
    const botao = event.target.closest(".compartilhar");

    if (!botao) return;

    const post = botao.closest(".post");
    const descricao = post.querySelector(".post-info p").textContent;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Publicação Vibra",
                text: descricao
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(descricao);
            alert("Texto da publicação copiado!");
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    } catch (erro) {
        if (erro.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});

// FILTRAR PUBLICAÇÕES

let filtroAtual = "todos";

document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", function() {
        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;
        aplicarFiltros();
    });
});

// PESQUISAR PUBLICAÇÕES

const pesquisa = document.querySelector("#pesquisa");

pesquisa.addEventListener("input", aplicarFiltros);

function aplicarFiltros() {
    const termo = pesquisa.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const categoria = post.dataset.categoria;
        const conteudo = post.textContent.toLowerCase();

        const combinaCategoria =
            filtroAtual === "todos" || categoria === filtroAtual;

        const combinaPesquisa = conteudo.includes(termo);

        post.style.display =
            combinaCategoria && combinaPesquisa ? "block" : "none";
    });
}

// SEGUIR PERFIS

document.querySelectorAll(".seguir").forEach(botao => {
    botao.addEventListener("click", function() {
        if (this.classList.contains("seguindo")) {
            this.classList.remove("seguindo");
            this.textContent = "Seguir";
        } else {
            this.classList.add("seguindo");
            this.textContent = "Seguindo";
        }
    });
});

// CRIAR NOVA PUBLICAÇÃO

function criarPost() {
    const nome = document.querySelector("#nomePost").value.trim();
    const texto = document.querySelector("#textoPost").value.trim();
    const imagem = document.querySelector("#imagemPost").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e o texto da publicação!");
        return;
    }

    if (imagem && !/^https?:\/\//i.test(imagem)) {
        alert("Insira um endereço de imagem válido começando com http:// ou https://.");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.categoria = "todos";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Foto do perfil";

    const dados = document.createElement("div");

    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = nome;

    const local = document.createElement("small");
    local.textContent = "Compartilhado agora";

    dados.append(nomeUsuario, local);
    usuario.append(avatar, dados);

    const menu = document.createElement("i");
    menu.className = "fa-solid fa-ellipsis";

    topo.append(usuario, menu);

    const conteudo = document.createElement("div");
    conteudo.className = "post-info";

    const contador = document.createElement("strong");
    contador.className = "contador";
    contador.dataset.numero = "0";
    contador.textContent = "0 curtidas";

    const descricao = document.createElement("p");
    descricao.textContent = texto;

    const comentarios = document.createElement("span");
    comentarios.className = "ver-comentarios";
    comentarios.textContent = "Seja o primeiro a comentar!";

    const tempo = document.createElement("small");
    tempo.textContent = "AGORA";

    conteudo.append(contador, descricao, comentarios, tempo);

    const acoes = document.createElement("div");
    acoes.className = "post-acoes";

    const grupo = document.createElement("div");

    function criarBotao(classe, icone) {
        const botao = document.createElement("button");
        botao.className = classe;

        const elementoIcone = document.createElement("i");
        elementoIcone.className = icone;

        botao.appendChild(elementoIcone);
        return botao;
    }

    grupo.append(
        criarBotao("curtir", "fa-regular fa-heart"),
        criarBotao("comentar", "fa-regular fa-comment"),
        criarBotao("compartilhar", "fa-regular fa-paper-plane")
    );

    acoes.append(grupo, criarBotao("salvar", "fa-regular fa-bookmark"));

    const formulario = document.createElement("form");
    formulario.className = "form-comentario";

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Adicione um comentário...";

    const publicar = document.createElement("button");
    publicar.textContent = "Publicar";

    formulario.append(campo, publicar);

    if (imagem) {
        const foto = document.createElement("img");
        foto.className = "imagem-post";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";
        foto.onerror = () => foto.remove();
        post.append(topo, foto, acoes, conteudo, formulario);
    } else {
        post.append(topo, acoes, conteudo, formulario);
    }

    posts.prepend(post);

    document.querySelector("#nomePost").value = "";
    document.querySelector("#textoPost").value = "";
    document.querySelector("#imagemPost").value = "";

    fecharCriacao();

    // Mostrar a nova publicação mesmo com um filtro selecionado
    filtroAtual = "todos";
    document.querySelectorAll(".filtro").forEach(item => {
        item.classList.toggle("ativo", item.dataset.filtro === "todos");
    });
    pesquisa.value = "";
    aplicarFiltros();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
