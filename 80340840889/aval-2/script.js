
const nomes = ["Jacy", "Abner", "Jatan", "Alvaro", "Kaiky"];

const publicacoes = [
    {
        nome: "Jacy",
        texto: "GENTE KKKKK quem lembra desse dia? Abner quase caiu de tanto rir 😂❤️",
        imagem: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900",
        comentarios: [
            {
                nome: "Abner",
                texto: "EU NÃO CAÍ KKKKKK",
                respostas: [
                    { nome: "Jatan", texto: "Caiu sim, eu vi tudo 😂" },
                    { nome: "Jacy", texto: "Tenho até testemunhas KKKKK" }
                ]
            },
            {
                nome: "Jatan",
                texto: "Esse dia foi perfeito! ❤️",
                respostas: [
                    { nome: "Alvaro", texto: "Menos a parte que vocês me deixaram esperando!" },
                    { nome: "Kaiky", texto: "KKKKKK sempre sobra pro Alvaro" }
                ]
            },
            {
                nome: "Kaiky",
                texto: "A próxima saída tem que ser melhor ainda!",
                respostas: [
                    { nome: "Jacy", texto: "Já pode deixar comigo 😎" }
                ]
            }
        ]
    },
    {
        nome: "Abner",
        texto: "Só os mais bonitos da turma. Não aceito opiniões KKKKK 😎",
        imagem: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900",
        comentarios: [
            {
                nome: "Jacy",
                texto: "Bonitos onde? KKKKKKK",
                respostas: [
                    { nome: "Abner", texto: "Inveja é complicado mesmo 😂" },
                    { nome: "Jatan", texto: "Jacy acabou contigo KKKKK" }
                ]
            },
            {
                nome: "Alvaro",
                texto: "Eu sou o único que salvou essa foto.",
                respostas: [
                    { nome: "Kaiky", texto: "Sonha, irmão KKKKK" }
                ]
            }
        ]
    },
    {
        nome: "Jatan",
        texto: "Minha gente, eu amo esses momentos com vocês! ❤️",
        imagem: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900",
        comentarios: [
            {
                nome: "Jacy",
                texto: "Minha parceira de loucuras ❤️",
                respostas: [
                    { nome: "Jatan", texto: "Sempre juntas nas resenhas! 🥹" }
                ]
            },
            {
                nome: "Kaiky",
                texto: "Só não vale marcar e cancelar de novo KKKK",
                respostas: [
                    { nome: "Jatan", texto: "EU NÃO CANCELEI 😂" },
                    { nome: "Abner", texto: "Cancelou sim, tenho prints KKKKK" }
                ]
            }
        ]
    },
    {
        nome: "Alvaro",
        texto: "O homem mais tranquilo desse grupo. Não me envolvam nas confusões 😂",
        imagem: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900",
        comentarios: [
            {
                nome: "Jacy",
                texto: "Você é o primeiro a começar tudo KKKKK",
                respostas: [
                    { nome: "Alvaro", texto: "Mentira, eu sou inocente!" },
                    { nome: "Abner", texto: "INOCENTE KKKKKKK" }
                ]
            },
            {
                nome: "Jatan",
                texto: "Alvaro nunca perde uma oportunidade 😂",
                respostas: [
                    { nome: "Alvaro", texto: "Obrigado pelo reconhecimento!" }
                ]
            }
        ]
    },
    {
        nome: "Kaiky",
        texto: "A gente não tem juízo, mas tem história pra contar KKKKK ❤️",
        imagem: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900",
        comentarios: [
            {
                nome: "Abner",
                texto: "Kaiky é o mais doido daqui!",
                respostas: [
                    { nome: "Kaiky", texto: "Olha quem fala KKKKK" }
                ]
            },
            {
                nome: "Jacy",
                texto: "Amo vocês, seus malucos! ❤️",
                respostas: [
                    { nome: "Alvaro", texto: "Também te amamos, Jacy!" },
                    { nome: "Jatan", texto: "Nosso grupinho ❤️" },
                    { nome: "Abner", texto: "Agora paga um lanche pra gente 😂" }
                ]
            }
        ]
    }
];

const fotos = {
    Jacy: "https://i.pravatar.cc/150?img=47",
    Abner: "https://i.pravatar.cc/150?img=12",
    Jatan: "https://i.pravatar.cc/150?img=44",
    Alvaro: "https://i.pravatar.cc/150?img=13",
    Kaiky: "https://i.pravatar.cc/150?img=14"
};

const feed = document.getElementById("feed");

let proximoId = 1;

function renderComentarios(comentarios, indice) {
    return comentarios.map((comentario, i) => {
        const respostas = comentario.respostas.map(resposta => `
            <div class="resposta">
                <img src="${fotos[resposta.nome]}" alt="${resposta.nome}">
                <div>
                    <strong>${resposta.nome}</strong>
                    <p>${resposta.texto}</p>
                </div>
            </div>
        `).join("");

        return `
            <div class="comentario">
                <img src="${fotos[comentario.nome]}" alt="${comentario.nome}">
                <div class="comentario-conteudo">
                    <strong>${comentario.nome}</strong>
                    <p>${comentario.texto}</p>

                    <button onclick="responder(${indice}, ${i})">
                        Responder
                    </button>

                    <div class="respostas">
                        ${respostas}
                    </div>

                    <div id="responder-${indice}-${i}"></div>
                </div>
            </div>
        `;
    }).join("");
}

function criarPublicacao(post, indice) {
    return `
        <article class="post">
            <div class="usuario">
                <img src="${fotos[post.nome]}" alt="${post.nome}">
                <div>
                    <h3>${post.nome} ${post.nome === "Jacy" ? "👑" : ""}</h3>
                    <span>Agora há pouco · Porto</span>
                </div>
            </div>

            <p>${post.texto}</p>

            <img class="foto-post" src="${post.imagem}" alt="Momento da galera">

            <div class="acoes">
                <button onclick="curtir(this)">
                    ❤️ Curtir <span>0</span>
                </button>
                <button onclick="focarComentario(${indice})">
                    💬 Comentar
                </button>
            </div>

            <div class="lista-comentarios" id="comentarios-${indice}">
                ${renderComentarios(post.comentarios, indice)}
            </div>

            <div class="comentar">
                <input id="input-${indice}"
                    placeholder="Comente alguma coisa...">
                <button onclick="adicionarComentario(${indice})">
                    Enviar
                </button>
            </div>
        </article>
    `;
}

function atualizarFeed() {
    feed.innerHTML = publicacoes
        .map((post, indice) => criarPublicacao(post, indice))
        .join("");
}

function curtir(botao) {
    let contador = botao.querySelector("span");
    let valor = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        valor--;
        botao.classList.remove("curtido");
    } else {
        valor++;
        botao.classList.add("curtido");
    }

    contador.textContent = valor;
}

function focarComentario(indice) {
    document.getElementById(`input-${indice}`).focus();
}

function adicionarComentario(indice) {
    const input = document.getElementById(`input-${indice}`);
    const texto = input.value.trim();

    if (!texto) return;

    publicacoes[indice].comentarios.push({
        nome: "Jacy",
        texto,
        respostas: []
    });

    input.value = "";
    atualizarFeed();
}

function responder(indice, comentarioIndice) {
    const local = document.getElementById(
        `responder-${indice}-${comentarioIndice}`
    );

    local.innerHTML = `
        <div class="comentar responder-box">
            <input id="resposta-input-${indice}-${comentarioIndice}"
                placeholder="Escreva sua resposta...">
            <button onclick="enviarResposta(${indice}, ${comentarioIndice})">
                Enviar
            </button>
        </div>
    `;

    local.querySelector("input").focus();
}

function enviarResposta(indice, comentarioIndice) {
    const input = document.getElementById(
        `resposta-input-${indice}-${comentarioIndice}`
    );

    const texto = input.value.trim();

    if (!texto) return;

    publicacoes[indice].comentarios[comentarioIndice].respostas.push({
        nome: "Jacy",
        texto
    });

    atualizarFeed();
}

// Conversas espontâneas automáticas
const conversas = [
    ["Abner", "KKKKKK Jacy, tu não existe 😂"],
    ["Jatan", "Gente, vamos combinar alguma coisa esse fim de semana? ❤️"],
    ["Alvaro", "Eu topo, mas dessa vez não me deixem esperando!"],
    ["Kaiky", "Alvaro chegando atrasado de novo KKKKK"],
    ["Jacy", "Vocês são impossíveis KKKKK ❤️"],
    ["Abner", "Alguém tem foto daquele dia?"],
    ["Jatan", "Eu tenho, mas vocês estão proibidos de reclamar 😂"],
    ["Alvaro", "Eu saí bonito, então pode postar."],
    ["Kaiky", "A autoestima do homem tá em dia KKKKK"],
    ["Jacy", "Amo essa bagunça toda! 🥹"]
];

function conversaAutomatica(indice) {
    const post = publicacoes[indice];

    const proxima = conversas[
        Math.floor(Math.random() * conversas.length)
    ];

    post.comentarios.push({
        nome: proxima[0],
        texto: proxima[1],
        respostas: []
    });

    atualizarFeed();
}

atualizarFeed();
