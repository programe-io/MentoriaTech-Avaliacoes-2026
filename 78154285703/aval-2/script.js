
// ELEMENTOS PRINCIPAIS

const listaPosts = document.getElementById("listaPosts");
const modeloPost = document.getElementById("modeloPost");

const textoPost = document.getElementById("textoPost");
const imagemPost = document.getElementById("imagemPost");

let imagemSelecionada = "";
let contador = 4;


// PUBLICAÇÕES INICIAIS

let posts = [

    {
        id: 1,
        nome: "Ana Clara",
        usuario: "@anaclara",
        inicial: "A",
        texto: "Hoje resolvi tirar um tempinho para fazer algo criativo! 🎨✨",
        curtidas: 24,
        comentarios: ["Que inspiração boa! 💜"],
        curtido: false,
        salvo: false,
        imagem: ""
    },

    {
        id: 2,
        nome: "Rafael Costa",
        usuario: "@rafael.c",
        inicial: "R",
        texto: "Uma ideia para a semana: aprender uma coisa nova. Qual habilidade vocês gostariam de desenvolver?",
        curtidas: 18,
        comentarios: ["Quero aprender fotografia!"],
        curtido: false,
        salvo: false,
        imagem: ""
    },

    {
        id: 3,
        nome: "Bia Martins",
        usuario: "@bia.martins",
        inicial: "B",
        texto: "Meu cantinho de leitura está ficando pronto! 📚☕",
        curtidas: 42,
        comentarios: [],
        curtido: false,
        salvo: false,
        imagem: ""
    }

];


// MENSAGENS

function mensagem(texto) {

    const caixa = document.getElementById("mensagem");

    caixa.textContent = texto;

    caixa.classList.add("mostrar");

    clearTimeout(mensagem.timer);

    mensagem.timer = setTimeout(() => {
        caixa.classList.remove("mostrar");
    }, 2500);

}


// MOSTRAR PUBLICAÇÕES

function mostrarPosts() {

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    const ordenacao = document.getElementById("ordenacao").value;

    let resultado = posts.filter(post => {

        return (
            post.nome.toLowerCase().includes(busca) ||
            post.texto.toLowerCase().includes(busca)
        );

    });

    if (ordenacao === "curtidas") {

        resultado.sort((a, b) => b.curtidas - a.curtidas);

    } else {

        resultado.sort((a, b) => b.id - a.id);

    }

    listaPosts.innerHTML = "";

    resultado.forEach(post => {

        const fragmento = modeloPost.content.cloneNode(true);

        const artigo = fragmento.querySelector(".post");

        artigo.querySelector(".inicial").textContent = post.inicial;

        artigo.querySelector(".nome").textContent = post.nome;

        artigo.querySelector(".usuario").textContent = post.usuario;

        artigo.querySelector(".data").textContent =
            post.id >= 4 ? "agora" : "há alguns minutos";

        artigo.querySelector(".conteudo").textContent = post.texto;

        artigo.querySelector(".curtidas").textContent =
            post.curtidas + " curtidas";

        artigo.querySelector(".comentarios-total").textContent =
            post.comentarios.length + " comentários";


        // IMAGEM

        if (post.imagem) {

            const imagem = artigo.querySelector(".imagem-publicacao");

            imagem.src = post.imagem;

            imagem.hidden = false;

        }


        // CURTIR

        const botaoCurtir = artigo.querySelector(".curtir");

        botaoCurtir.textContent = post.curtido
            ? "♥ Curtido"
            : "♡ Curtir";

        if (post.curtido) {
            botaoCurtir.classList.add("curtido");
        }

        botaoCurtir.addEventListener("click", () => {

            post.curtido = !post.curtido;

            post.curtidas += post.curtido ? 1 : -1;

            mostrarPosts();

        });


        // ABRIR COMENTÁRIOS

        const formulario = artigo.querySelector(".form-comentario");

        artigo.querySelector(".comentar").addEventListener("click", () => {

            formulario.hidden = !formulario.hidden;

        });


        // ENVIAR COMENTÁRIO

        formulario.addEventListener("submit", evento => {

            evento.preventDefault();

            const campo = formulario.querySelector("input");

            const comentario = campo.value.trim();

            if (!comentario) return;

            post.comentarios.push(comentario);

            mostrarPosts();

            mensagem("Comentário enviado!");

        });


        // EXIBIR COMENTÁRIOS

        post.comentarios.forEach(comentario => {

            const div = document.createElement("div");

            div.className = "comentario";

            div.textContent = "Você: " + comentario;

            artigo.querySelector(".lista-comentarios")
                .appendChild(div);

        });


        // COMPARTILHAR

        artigo.querySelector(".compartilhar")
            .addEventListener("click", async () => {

                const conteudo = post.nome + ": " + post.texto;

                if (navigator.share) {

                    try {
                        await navigator.share({
                            title: "UPblog",
                            text: conteudo
                        });
                    } catch (erro) {
                        // Compartilhamento cancelado.
                    }

                } else if (navigator.clipboard) {

                    try {
                        await navigator.clipboard.writeText(conteudo);
                        mensagem("Texto copiado!");
                    } catch (erro) {
                        mensagem("Não foi possível copiar.");
                    }

                } else {

                    mensagem("Compartilhamento indisponível.");

                }

            });


        // SALVAR

        const botaoSalvar = artigo.querySelector(".salvar");

        botaoSalvar.textContent = post.salvo ? "▣" : "♧";

        if (post.salvo) {
            botaoSalvar.classList.add("salvo");
        }

        botaoSalvar.addEventListener("click", () => {

            post.salvo = !post.salvo;

            mostrarPosts();

            mensagem(post.salvo
                ? "Publicação salva!"
                : "Publicação removida dos salvos!");

        });


        listaPosts.appendChild(fragmento);

    });


    document.getElementById("semPosts").hidden =
        resultado.length > 0;

    document.getElementById("totalPosts").textContent =
        posts.filter(post => post.usuario === "@usuario_up").length;

}


// PUBLICAR

document.getElementById("publicar")
    .addEventListener("click", () => {

        const texto = textoPost.value.trim();

        if (!texto && !imagemSelecionada) {

            mensagem("Escreva algo ou escolha uma foto!");

            return;

        }

        posts.push({

            id: contador++,
            nome: "Você",
            usuario: "@usuario_up",
            inicial: "P",
            texto: texto,
            curtidas: 0,
            comentarios: [],
            curtido: false,
            salvo: false,
            imagem: imagemSelecionada

        });

        textoPost.value = "";

        imagemSelecionada = "";

        document.getElementById("preview").innerHTML = "";

        imagemPost.value = "";

        mostrarPosts();

        mensagem("Publicação compartilhada!");

    });


// ADICIONAR IMAGEM

imagemPost.addEventListener("change", () => {

    const arquivo = imagemPost.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {

        mensagem("Escolha uma imagem válida!");

        return;

    }

    if (arquivo.size > 5 * 1024 * 1024) {

        mensagem("A imagem deve ter no máximo 5 MB!");

        imagemPost.value = "";

        return;

    }

    const leitor = new FileReader();

    leitor.onload = () => {

        imagemSelecionada = leitor.result;

        document.getElementById("preview").innerHTML = "";

        const img = document.createElement("img");

        img.src = imagemSelecionada;

        img.alt = "Prévia da imagem";

        document.getElementById("preview").appendChild(img);

    };

    leitor.readAsDataURL(arquivo);

});


// PESQUISA

document.getElementById("pesquisa")
    .addEventListener("input", mostrarPosts);


// ORDENAÇÃO

document.getElementById("ordenacao")
    .addEventListener("change", mostrarPosts);


// SEGUIR USUÁRIOS

document.querySelectorAll(".seguir").forEach(botao => {

    botao.addEventListener("click", () => {

        const seguindo = botao.dataset.seguindo !== "true";

        botao.dataset.seguindo = String(seguindo);

        botao.textContent = seguindo ? "Seguindo" : "Seguir";

        mensagem(seguindo
            ? "Agora você está seguindo!"
            : "Você deixou de seguir!");

    });

});


// TEMA ESCURO

document.getElementById("tema")
    .addEventListener("click", () => {

        document.body.classList.toggle("escuro");

        const escuro =
            document.body.classList.contains("escuro");

        document.getElementById("tema").textContent =
            escuro ? "☀" : "☾";

    });


// ANO AUTOMÁTICO

document.getElementById("ano").textContent =
    new Date().getFullYear();


// INICIAR FEED

mostrarPosts();
