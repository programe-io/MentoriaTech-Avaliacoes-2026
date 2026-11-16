
const textoPublicacao = document.getElementById("textoPublicacao");
const imagemPublicacao = document.getElementById("imagemPublicacao");
const botaoPublicar = document.getElementById("botaoPublicar");
const listaPublicacoes = document.getElementById("listaPublicacoes");
const previewContainer = document.getElementById("previewContainer");

let imagemSelecionada = "";

// CARREGAR PUBLICAÇÕES SALVAS
function carregarPublicacoes() {
    try {
        const dados = localStorage.getItem("miniFeedPublicacoes");
        return dados ? JSON.parse(dados) : null;
    } catch (erro) {
        console.error("Erro ao carregar publicações:", erro);
        return null;
    }
}

// PUBLICAÇÕES INICIAIS
let publicacoes = carregarPublicacoes();

if (!Array.isArray(publicacoes)) {
    publicacoes = [
        {
            id: 1,
            nome: "Ana Silva",
            avatar: "A",
            texto: "Olá, pessoal! Estou muito feliz em participar do Mini Feed. Vamos compartilhar ideias e aprender juntos! 💜",
            imagem: "",
            curtidas: 3,
            curtido: false,
            comentarios: [],
            data: "Publicação de exemplo"
        },
        {
            id: 2,
            nome: "Lucas Oliveira",
            avatar: "L",
            texto: "Hoje é um ótimo dia para aprender algo novo sobre tecnologia! 🚀",
            imagem: "",
            curtidas: 5,
            curtido: false,
            comentarios: [],
            data: "Publicação de exemplo"
        }
    ];

    salvarPublicacoes();
}

// SALVAR NO NAVEGADOR
function salvarPublicacoes() {
    try {
        localStorage.setItem(
            "miniFeedPublicacoes",
            JSON.stringify(publicacoes)
        );
    } catch (erro) {
        alert("Não foi possível salvar. Tente remover uma imagem ou publicação antiga.");
        console.error("Erro ao salvar:", erro);
    }
}

// PRÉ-VISUALIZAÇÃO DA IMAGEM
imagemPublicacao.addEventListener("change", function () {
    const arquivo = this.files[0];

    imagemSelecionada = "";
    previewContainer.replaceChildren();

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem válido.");
        this.value = "";
        return;
    }

    if (arquivo.size > 1024 * 1024) {
        alert("A imagem deve ter no máximo 1 MB.");
        this.value = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {
        imagemSelecionada = evento.target.result;

        const imagem = document.createElement("img");
        imagem.src = imagemSelecionada;
        imagem.alt = "Pré-visualização da publicação";

        previewContainer.appendChild(imagem);
    };

    leitor.readAsDataURL(arquivo);
});

// CRIAR PUBLICAÇÃO
botaoPublicar.addEventListener("click", function () {
    const texto = textoPublicacao.value.trim();

    if (texto === "" && imagemSelecionada === "") {
        alert("Escreva alguma coisa ou adicione uma imagem!");
        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        nome: "Meu Usuário",
        avatar: "U",
        texto: texto,
        imagem: imagemSelecionada,
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: "Agora mesmo"
    };

    publicacoes.unshift(novaPublicacao);

    salvarPublicacoes();
    renderizarPublicacoes();

    textoPublicacao.value = "";
    imagemPublicacao.value = "";
    imagemSelecionada = "";
    previewContainer.replaceChildren();

    alert("Publicação realizada com sucesso!");
});

// CRIAR ELEMENTOS DE TEXTO COM SEGURANÇA
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// RENDERIZAR PUBLICAÇÕES
function renderizarPublicacoes() {
    listaPublicacoes.replaceChildren();

    if (publicacoes.length === 0) {
        const mensagem = criarElemento(
            "p",
            "mensagem-vazia",
            "Ainda não existem publicações. Seja o primeiro a publicar!"
        );

        listaPublicacoes.appendChild(mensagem);
        return;
    }

    publicacoes.forEach(function (post) {
        const artigo = criarElemento("article", "post");

        // CABEÇALHO
        const cabecalho = criarElemento("div", "post-header");
        const usuario = criarElemento("div", "user");

        const avatar = criarElemento(
            "div",
            "avatar",
            post.avatar
        );

        const informacoes = criarElemento("div", "user-info");

        informacoes.appendChild(
            criarElemento("strong", "", post.nome)
        );

        informacoes.appendChild(
            criarElemento("span", "", post.data)
        );

        usuario.appendChild(avatar);
        usuario.appendChild(informacoes);
        cabecalho.appendChild(usuario);

        // BOTÃO EXCLUIR
        if (post.nome === "Meu Usuário") {
            const excluir = criarElemento(
                "button",
                "excluir",
                "Excluir"
            );

            excluir.type = "button";

            excluir.addEventListener("click", function () {
                if (confirm("Deseja excluir esta publicação?")) {
                    publicacoes = publicacoes.filter(
                        item => item.id !== post.id
                    );

                    salvarPublicacoes();
                    renderizarPublicacoes();
                }
            });

            cabecalho.appendChild(excluir);
        }

        artigo.appendChild(cabecalho);

        // TEXTO
        if (post.texto) {
            artigo.appendChild(
                criarElemento("p", "post-text", post.texto)
            );
        }

        // IMAGEM
        if (post.imagem) {
            const imagem = document.createElement("img");

            imagem.src = post.imagem;
            imagem.alt = "Imagem da publicação";
            imagem.className = "post-imagem";

            artigo.appendChild(imagem);
        }

        // BOTÕES DE AÇÃO
        const acoes = criarElemento("div", "post-actions");

        const curtir = criarElemento(
            "button",
            post.curtido ? "curtido" : "",
            `❤️ Curtir (${post.curtidas})`
        );

        curtir.type = "button";

        curtir.addEventListener("click", function () {
            if (post.curtido) {
                post.curtidas--;
                post.curtido = false;
            } else {
                post.curtidas++;
                post.curtido = true;
            }

            salvarPublicacoes();
            renderizarPublicacoes();
        });

        const comentar = criarElemento(
            "button",
            "",
            "💬 Comentar"
        );

        comentar.type = "button";

        acoes.appendChild(curtir);
        acoes.appendChild(comentar);

        artigo.appendChild(acoes);

        // ÁREA DE COMENTÁRIOS
        const areaComentarios = criarElemento(
            "div",
            "comentarios"
        );

        areaComentarios.hidden = true;

        const tituloComentarios = criarElemento(
            "h4",
            "",
            "Comentários"
        );

        areaComentarios.appendChild(tituloComentarios);

        const listaComentarios = criarElemento("div");

        post.comentarios.forEach(function (comentario) {
            const item = criarElemento(
                "div",
                "comentario-item"
            );

            const nome = criarElemento(
                "strong",
                "",
                comentario.nome + ": "
            );

            const mensagem = criarElemento(
                "span",
                "",
                comentario.texto
            );

            item.appendChild(nome);
            item.appendChild(mensagem);

            listaComentarios.appendChild(item);
        });

        areaComentarios.appendChild(listaComentarios);

        // FORMULÁRIO DE COMENTÁRIO
        const formulario = criarElemento(
            "form",
            "form-comentario"
        );

        const campo = document.createElement("input");

        campo.type = "text";
        campo.placeholder = "Escreva um comentário...";
        campo.maxLength = 300;
        campo.required = true;

        const enviar = criarElemento(
            "button",
            "",
            "Enviar"
        );

        enviar.type = "submit";

        formulario.appendChild(campo);
        formulario.appendChild(enviar);

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const mensagem = campo.value.trim();

            if (!mensagem) return;

            post.comentarios.push({
                nome: "Meu Usuário",
                texto: mensagem
            });

            salvarPublicacoes();
            renderizarPublicacoes();
        });

        areaComentarios.appendChild(formulario);
        artigo.appendChild(areaComentarios);

        // ABRIR E FECHAR COMENTÁRIOS
        comentar.addEventListener("click", function () {
            areaComentarios.hidden = !areaComentarios.hidden;

            if (!areaComentarios.hidden) {
                campo.focus();
            }
        });

        listaPublicacoes.appendChild(artigo);
    });
}

// EXIBIR PUBLICAÇÕES AO ABRIR A PÁGINA
renderizarPublicacoes();
