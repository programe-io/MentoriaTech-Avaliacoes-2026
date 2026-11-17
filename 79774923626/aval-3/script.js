
const publicacoes = [
    {
        id: 1,
        usuario: "ana.silva",
        avatar: "https://i.pravatar.cc/100?img=47",
        local: "Rio de Janeiro, Brasil",
        imagem: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        legenda: "Vivendo momentos incríveis! ❤️✨ #love #instagood",
        curtidas: 1250,
        comentarios: ["Linda foto! ❤️", "Maravilhosa!"],
        curtido: false
    },
    {
        id: 2,
        usuario: "pedro.jpg",
        avatar: "https://i.pravatar.cc/100?img=12",
        local: "São Paulo, Brasil",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        legenda: "A vida é feita de momentos especiais! 🌎",
        curtidas: 850,
        comentarios: ["Que lugar lindo!", "Quero conhecer!"],
        curtido: false
    },
    {
        id: 3,
        usuario: "maria.oficial",
        avatar: "https://i.pravatar.cc/100?img=44",
        local: "Fortaleza, Brasil",
        imagem: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
        legenda: "Sorria, a vida é maravilhosa! 💕",
        curtidas: 2300,
        comentarios: ["Perfeita!", "❤️❤️❤️"],
        curtido: false
    }
];

let publicacaoAtual = null;

// FORMATAR NÚMEROS

function formatarNumero(numero) {
    return numero.toLocaleString("pt-BR");
}

// MOSTRAR PUBLICAÇÕES

function mostrarPublicacoes(lista = publicacoes) {

    const feed = document.getElementById("publicacoes");

    feed.innerHTML = "";

    lista.forEach(post => {

        const artigo = document.createElement("article");

        artigo.className = "publicacao";

        artigo.innerHTML = `
            <div class="post-header">

                <div class="usuario">
                    <img src="${post.avatar}" alt="Foto de perfil">

                    <div>
                        <strong>${post.usuario}</strong>
                        <p>${post.local}</p>
                    </div>
                </div>

                <button class="post-menu"
                    onclick="alert('Opções da publicação')">
                    ⋯
                </button>

            </div>

            <img class="post-imagem"
                src="${post.imagem}"
                alt="Publicação de ${post.usuario}">

            <div class="acoes">

                <button class="${post.curtido ? 'curtido' : ''}"
                    onclick="curtir(${post.id})">
                    ${post.curtido ? '❤️' : '♡'}
                </button>

                <button onclick="abrirComentarios(${post.id})">
                    💬
                </button>

                <button onclick="compartilhar(${post.id})">
                    ➤
                </button>

                <button class="salvar"
                    onclick="salvar(${post.id})">
                    ♧
                </button>

            </div>

            <p class="likes">
                ${formatarNumero(post.curtidas)} curtidas
            </p>

            <p class="legenda">
                <strong>${post.usuario}</strong>
                ${post.legenda}
            </p>

            <button class="comentarios-link"
                onclick="abrirComentarios(${post.id})">
                Ver todos os ${post.comentarios.length} comentários
            </button>
        `;

        feed.appendChild(artigo);
    });
}

// CURTIR

function curtir(id) {

    const post = publicacoes.find(p => p.id === id);

    if (post.curtido) {
        post.curtidas--;
        post.curtido = false;
    } else {
        post.curtidas++;
        post.curtido = true;
    }

    mostrarPublicacoes();
}

// ABRIR COMENTÁRIOS

function abrirComentarios(id) {

    publicacaoAtual = id;

    const post = publicacoes.find(p => p.id === id);

    const corpo = document.getElementById("modalCorpo");

    corpo.innerHTML = "";

    post.comentarios.forEach(comentario => {

        const div = document.createElement("div");

        div.className = "comentario";

        div.textContent = comentario;

        corpo.appendChild(div);
    });

    const formulario = document.createElement("div");

    formulario.className = "comentario-form";

    formulario.innerHTML = `
        <input id="novoComentario"
            placeholder="Adicione um comentário...">

        <button onclick="enviarComentario()">
            Enviar
        </button>
    `;

    corpo.appendChild(formulario);

    document.getElementById("modalTitulo").textContent =
        "Comentários";

    document.getElementById("modal").classList.add("ativo");
}

// ENVIAR COMENTÁRIO

function enviarComentario() {

    const input = document.getElementById("novoComentario");

    const texto = input.value.trim();

    if (!texto) {
        alert("Digite um comentário!");
        return;
    }

    const post = publicacoes.find(
        p => p.id === publicacaoAtual
    );

    post.comentarios.push(texto);

    abrirComentarios(publicacaoAtual);

    mostrarPublicacoes();
}

// FECHAR MODAL

function fecharModal() {
    document.getElementById("modal").classList.remove("ativo");
}

// COMPARTILHAR

function compartilhar(id) {

    const link = window.location.href.split("#")[0] +
        "#publicacao-" + id;

    if (navigator.share) {

        navigator.share({
            title: "Instagram",
            text: "Confira esta publicação!",
            url: link
        }).catch(() => {});

    } else if (navigator.clipboard) {

        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar."));

    } else {
        alert(link);
    }
}

// SALVAR PUBLICAÇÃO

let salvos = [];

function salvar(id) {

    if (salvos.includes(id)) {

        salvos = salvos.filter(item => item !== id);

        alert("Publicação removida dos salvos!");

    } else {

        salvos.push(id);

        alert("Publicação salva! ⭐");
    }
}

// STORIES

function abrirStory(usuario) {

    document.getElementById("modalTitulo").textContent =
        "Story de " + usuario;

    const corpo = document.getElementById("modalCorpo");

    corpo.innerHTML = `
        <div style="text-align:center;padding:40px 10px">
            <h2>📸</h2>
            <p>Você está visualizando o story de ${usuario}.</p>
            <p style="margin-top:15px;color:#999">
                Story demonstrativo.
            </p>
        </div>
    `;

    document.getElementById("modal").classList.add("ativo");
}

// PESQUISAR

function pesquisar() {

    const termo = prompt("Digite o nome do usuário:");

    if (termo === null) return;

    const resultado = publicacoes.filter(post =>
        post.usuario.toLowerCase().includes(
            termo.toLowerCase().trim()
        )
    );

    mostrarPublicacoes(resultado);
}

// INÍCIO

function inicio() {
    mostrarPublicacoes(publicacoes);
}

// EXPLORAR

function mostrarExplorar() {

    document.getElementById("modalTitulo").textContent =
        "Explorar";

    document.getElementById("modalCorpo").innerHTML = `
        <p>🌎 Descubra novas publicações!</p>
        <p style="margin-top:15px">#Viagem</p>
        <p style="margin-top:10px">#Fotografia</p>
        <p style="margin-top:10px">#Moda</p>
        <p style="margin-top:10px">#Tecnologia</p>
    `;

    document.getElementById("modal").classList.add("ativo");
}

// REELS

function mostrarReels() {

    document.getElementById("modalTitulo").textContent =
        "Reels";

    document.getElementById("modalCorpo").innerHTML = `
        <video class="reels-video" controls autoplay loop playsinline>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4">
        </video>
        <p>Confira este vídeo demonstrativo! 🎬</p>
    `;

    document.getElementById("modal").classList.add("ativo");
}

// MENSAGENS

function mostrarMensagens() {

    document.getElementById("modalTitulo").textContent =
        "Mensagens";

    document.getElementById("modalCorpo").innerHTML = `
        <p>💬 Suas conversas aparecerão aqui.</p>
        <p style="margin-top:15px;color:#888">
            Sistema de mensagens demonstrativo.
        </p>
    `;

    document.getElementById("modal").classList.add("ativo");
}

// NOTIFICAÇÕES

function mostrarNotificacoes() {

    document.getElementById("modalTitulo").textContent =
        "Notificações";

    document.getElementById("modalCorpo").innerHTML = `
        <div class="comentario">❤️ ana.silva curtiu sua publicação.</div>
        <div class="comentario">👤 pedro.jpg começou a seguir você.</div>
        <div class="comentario">💬 maria.oficial comentou sua foto.</div>
    `;

    document.getElementById("modal").classList.add("ativo");
}

// CRIAR PUBLICAÇÃO

function criarPublicacao() {

    const arquivo = document.createElement("input");

    arquivo.type = "file";
    arquivo.accept = "image/*";

    arquivo.onchange = function() {

        const foto = arquivo.files[0];

        if (!foto) return;

        const leitor = new FileReader();

        leitor.onload = function(evento) {

            const legenda = prompt("Escreva uma legenda:");

            const novaPublicacao = {
                id: Date.now(),
                usuario: "meu_usuario",
                avatar: "https://i.pravatar.cc/100?img=68",
                local: "Minha localização",
                imagem: evento.target.result,
                legenda: legenda || "",
                curtidas: 0,
                comentarios: [],
                curtido: false
            };

            publicacoes.unshift(novaPublicacao);

            inicio();

            alert("Publicação criada com sucesso!");
        };

        leitor.readAsDataURL(foto);
    };

    arquivo.click();
}

// SEGUIR USUÁRIO

function seguir(botao) {

    if (botao.textContent === "Seguir") {

        botao.textContent = "Seguindo";
        botao.style.color = "#888";

    } else {

        botao.textContent = "Seguir";
        botao.style.color = "#0095f6";
    }
}

// PERFIL

function mostrarPerfil() {

    document.getElementById("publicacoes").innerHTML = `
        <div class="perfil">

            <img src="https://i.pravatar.cc/150?img=68">

            <h2>meu_usuario</h2>

            <p>Meu perfil | Criador de conteúdo ✨</p>

            <p style="margin-top:15px">
                3 publicações &nbsp; 250 seguidores &nbsp; 180 seguindo
            </p>

            <button onclick="criarPublicacao()">
                Editar publicação
            </button>

            <button onclick="inicio()">
                Voltar ao feed
            </button>

            <h3 style="margin-top:30px">
                Minhas publicações
            </h3>

        </div>
    `;
}

// INICIAR

mostrarPublicacoes();
