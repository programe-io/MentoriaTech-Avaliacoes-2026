tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                insta: {
                    bg: '#ffffff',
                    darkBg: '#000000',
                    border: '#dbdbdb',
                    darkBorder: '#262626',
                    textSecondary: '#737373',
                    blue: '#0095f6',
                    hoverBlue: '#1877f2',
                    red: '#ff3040'
                }
            }
        }
    }
};

const DEFAULT_AVATAR = "https://rollingstone.com.br/wp-content/uploads/cillian_murphy_como_tommy_shelby_reproducao_netflix.jpg";

const imageLinks = [
    "https://rollingstone.com.br/wp-content/uploads/cillian_murphy_como_tommy_shelby_reproducao_netflix.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqLQ69bpbsT3eYVfA1i-DO-JpOM8k3pRQO441KNLexXQ&s",
    "https://manofmany.com/wp-content/uploads/2024/03/The-Real-Thomas-Shelby-of-Peaky-Blinders-Background-on-Thomas-Shelbys-Character.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSocwLGRJbj4cLN6T29gW5S74KdSOHKg3kquFa_jEF_sGPeZRYyTRsGdQA&s=10",
    "https://manofmany.com/wp-content/uploads/2023/08/The-Real-Thomas-Shelby-of-Peaky-Blinders.jpg",
    "https://i.pinimg.com/736x/d5/b6/c9/d5b6c948b515089c3e56e7f75af8d44d.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9-ckkX-FSbEdaFZ5pMASVlzT_eEQNwIEawTLkQnhaRfrU9fvJGlTpkuy4Qq8rsH7vDzGhuBp7W8sxMPxgzbPoH4By93AyvuCjsjfROg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5IWbrJNnu-R7sQzgUaOzWHVsW8ideSmtyEY6wG98vubP9A6Gqt9-rBgE&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2ENH4yvZuFcRVHDjLm7GQ-_CCT9mZRgoaYvClAd6vIr8o_1vVjo7_wv1&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwKgirpYowNfAR-GcWrPZKgOA9qdymvETG6KlMIEaRC8UQstoRuse49n63&s=10",
    "https://fandomwire.com/wp-content/uploads/2020/10/john-wick-1-1024x537.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulfxqTPDFl8k-G9-vfdtZDZQM581i9qmm2TMC2BNyiOTS8Tfhp0S97hwm&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFab30uDivK5V7Phq4TN196u_E6hOweAx3wS8JZlY0NXkSpa_0RiN7p4&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRomCmiW4T1b75YELjTiFpsmQiHGFNd3HRGUbWMR7oTiygjTImWJ5duUDCh&s=10",
    "https://www.cinemascomics.com/wp-content/uploads/2026/08/reacher-temporada-4.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrb2rxALMfKcP37PsgBmeqajFSt2X4LPSqokBs2tQzbQSi3wzZrDOQBzw9&s=10",
    "https://i.pinimg.com/474x/b7/3a/b3/b73ab3d80cae488ec3ab619ca7af64d6.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzFu25Kp-C3esMga6sLzbxtNS-f78WtIjKzqLLoYYfwmsaMFz39uaELbHs&s=10"
];

const defaultProfile = {
    username: "tommy_shelby",
    name: "Thomas Shelby OBE",
    subtitle: "Shelby Company Limited • Birmingham, UK",
    bio: "By order of the Peaky Blinders. 🥃",
    avatar: DEFAULT_AVATAR
};
let userProfile = JSON.parse(localStorage.getItem("insta_pb_profile")) || { ...defaultProfile };

const exploreItems = [
    { id: 101, username: "peaky_archive", avatar: imageLinks[0], image: imageLinks[1], likes: "32,4 mil", comments: 412, caption: "A névoa de Small Heath nunca dorme. 🌫️🎩", featured: true },
    { id: 102, username: "continental_ny", avatar: imageLinks[10], image: imageLinks[11], likes: "98,1 mil", comments: 1205, caption: "Nenhum negócio deve ser conduzido em solo do Continental.", featured: false },
    { id: 103, username: "arthur_shelby", avatar: imageLinks[3], image: imageLinks[3], likes: "27,9 mil", comments: 318, caption: "Noites no The Garrison Pub. 🥃", featured: false },
    { id: 104, username: "shelby_company", avatar: imageLinks[4], image: imageLinks[4], likes: "41,0 mil", comments: 509, caption: "Expansão dos negócios em Londres.", featured: false },
    { id: 105, username: "grace_shelby", avatar: imageLinks[6], image: imageLinks[6], likes: "53,2 mil", comments: 640, caption: "Lembranças de uma noite inesquecível.", featured: false },
    { id: 106, username: "birmingham_1920", avatar: imageLinks[5], image: imageLinks[7], likes: "19,8 mil", comments: 184, caption: "Estilo clássico britânico anos 20.", featured: true },
    { id: 107, username: "john_shelby", avatar: imageLinks[8], image: imageLinks[8], likes: "24,5 mil", comments: 276, caption: "Sempre leal à família.", featured: false },
    { id: 108, username: "ada_thorne", avatar: imageLinks[9], image: imageLinks[9], likes: "31,1 mil", comments: 390, caption: "Estratégia e elegância.", featured: false },
    { id: 109, username: "tommy_shelby", avatar: imageLinks[0], image: imageLinks[2], likes: "112 mil", comments: 2340, caption: "Já tenho tudo planejado.", featured: false },
    { id: 110, username: "jack_reacher", avatar: imageLinks[14], image: imageLinks[14], likes: "76,8 mil", comments: 940, caption: "Em uma investigação, detalhes importam. 👊 #reacher", featured: true },
    { id: 111, username: "peaky_classics", avatar: imageLinks[12], image: imageLinks[12], likes: "48,9 mil", comments: 512, caption: "Respeito se conquista. 🥃", featured: false },
    { id: 112, username: "shelby_brothers", avatar: imageLinks[13], image: imageLinks[13], likes: "62,1 mil", comments: 730, caption: "Irmãos de sangue e negócios.", featured: false },
    { id: 113, username: "small_heath_club", avatar: imageLinks[15], image: imageLinks[15], likes: "29,4 mil", comments: 215, caption: "Noite fechada em Birmingham.", featured: false },
    { id: 114, username: "vintage_uk", avatar: imageLinks[16], image: imageLinks[16], likes: "35,7 mil", comments: 304, caption: "Elegância atemporal.", featured: false },
    { id: 115, username: "garrison_tavern", avatar: imageLinks[17], image: imageLinks[17], likes: "44,2 mil", comments: 488, caption: "Um brinde aos Peaky Blinders.", featured: false }
];

const reelsData = [
    {
        id: 1,
        username: "tommy_shelby",
        avatar: imageLinks[0],
        image: imageLinks[2],
        caption: "Eu não pago por ternos. Os ternos são por conta da casa. 🥃🔥 #peakyblinders #mindset",
        audio: "Red Right Hand - Nick Cave & The Bad Seeds",
        likes: 142800,
        liked: false,
        following: true,
        comments: [
            { user: "arthur_shelby", text: "Isso mesmo, irmão!" },
            { user: "john_wick", text: "Belo corte de terno." }
        ]
    },
    {
        id: 2,
        username: "john_wick",
        avatar: imageLinks[10],
        image: imageLinks[10],
        caption: "Pessoas continuam me perguntando se eu voltei... Sim, acho que estou de volta. 🐕🔫 #johnwick",
        audio: "LED Spirals - Le Castle Vania",
        likes: 289500,
        liked: false,
        following: true,
        comments: [
            { user: "tommy_shelby", text: "Bem-vindo de volta, Wick." }
        ]
    },
    {
        id: 3,
        username: "jack_reacher",
        avatar: imageLinks[14],
        image: imageLinks[14],
        caption: "Não mexa com os investigadores especiais. 👊💼 #reacher #justice",
        audio: "Mississippi Queen - Mountain",
        likes: 198400,
        liked: false,
        following: true,
        comments: [
            { user: "tommy_shelby", text: "Homem de poucas palavras." }
        ]
    },
    {
        id: 4,
        username: "arthur_shelby",
        avatar: imageLinks[3],
        image: imageLinks[3],
        caption: "BY ORDER OF THE PEAKY FOOKIN' BLINDERS! 🎩💥 #garrison #birmingham",
        audio: "Do I Wanna Know? - Arctic Monkeys",
        likes: 95400,
        liked: false,
        following: false,
        comments: [
            { user: "john_shelby", text: "Nos vemos no Garrison hoje à noite!" }
        ]
    },
    {
        id: 5,
        username: "shelby_company",
        avatar: imageLinks[12],
        image: imageLinks[12],
        caption: "Cada passo calculado antes mesmo do jogo começar. ♟️🥃 #shelby",
        audio: "Red Right Hand - Nick Cave",
        likes: 118900,
        liked: false,
        following: true,
        comments: [
            { user: "ada_thorne", text: "Sempre um passo à frente." }
        ]
    }
];
let currentReelIndex = 0;

const notificationsData = [
    { id: 1, section: "Hoje", type: "like", username: "john_wick", avatar: imageLinks[10], text: "curtiu sua publicação.", time: "14 min", preview: imageLinks[2], unread: true },
    { id: 2, section: "Hoje", type: "like", username: "jack_reacher", avatar: imageLinks[14], text: "curtiu sua publicação.", time: "28 min", preview: imageLinks[12], unread: true },
    { id: 3, section: "Hoje", type: "comment", username: "arthur_shelby", avatar: imageLinks[3], text: "comentou: \"Ninguém toca nos Shelby! 🔥\"", time: "1 h", preview: imageLinks[2], unread: true },
    { id: 4, section: "Hoje", type: "follow", username: "alfie_solomons", avatar: imageLinks[7], text: "começou a seguir você.", time: "3 h", following: false, unread: true },
    { id: 5, section: "Esta semana", type: "like", username: "grace_shelby", avatar: imageLinks[6], text: "curtiu seu story.", time: "2 d", preview: imageLinks[0], unread: false },
    { id: 6, section: "Esta semana", type: "follow", username: "ada_thorne", avatar: imageLinks[9], text: "começou a seguir você.", time: "4 d", following: true, unread: false },
    { id: 7, section: "Este mês", type: "mention", username: "shelby_company", avatar: imageLinks[4], text: "mencionou você em uma publicação: \"Sob direção de @tommy_shelby\".", time: "2 sem", preview: imageLinks[5], unread: false }
];

const defaultChats = [
    {
        id: "john_wick",
        username: "john_wick",
        name: "John Wick",
        avatar: imageLinks[10],
        online: true,
        autoReplies: [
            "Considera feito. O Continental garante nossa trégua.",
            "Preciso de armas. Muitas armas.",
            "Quem quer que venha, eu vou matar todos eles."
        ],
        messages: [
            { sender: "them", text: "Thomas. Precisamos conversar sobre o carregamento em Nova York.", time: "10:14" },
            { sender: "me", text: "Os Peaky Blinders já cuidaram disso, Wick.", time: "10:16" },
            { sender: "them", text: "Ótimo. Regras são regras.", time: "10:17" }
        ]
    },
    {
        id: "jack_reacher",
        username: "jack_reacher",
        name: "Jack Reacher",
        avatar: imageLinks[14],
        online: true,
        autoReplies: [
            "Em uma investigação, suposições matam.",
            "Estou passando pela cidade. Se precisar de reforço, avise.",
            "Não tenho bagagem, só a verdade dos fatos."
        ],
        messages: [
            { sender: "them", text: "Shelby. Verifiquei os números daquele depósito.", time: "14:20" },
            { sender: "me", text: "E o que você descobriu, Reacher?", time: "14:22" },
            { sender: "them", text: "Alguém está desviando carga. Vamos resolver isso hoje.", time: "14:23" }
        ]
    },
    {
        id: "arthur_shelby",
        username: "arthur_shelby",
        name: "Arthur Shelby",
        avatar: imageLinks[3],
        online: true,
        autoReplies: [
            "BY ORDER OF THE PEAKY BLINDERS!",
            "Vou chamar os rapazes para o Garrison.",
            "Tommy, tudo sob controle aqui!"
        ],
        messages: [
            { sender: "them", text: "Tommy! O carregamento chegou no porto de Bristol.", time: "Ontem" },
            { sender: "me", text: "Mantenha a guarda alta. A polícia está de olho.", time: "Ontem" }
        ]
    },
    {
        id: "grace_shelby",
        username: "grace_shelby",
        name: "Grace Shelby",
        avatar: imageLinks[6],
        online: false,
        autoReplies: [
            "Te vejo em casa para o jantar, Thomas.",
            "Tome cuidado nas ruas hoje.",
            "A música vai começar logo."
        ],
        messages: [
            { sender: "them", text: "Você vem para casa hoje à noite?", time: "Seg" },
            { sender: "me", text: "Estarei lá às 20h.", time: "Seg" }
        ]
    }
];
let chatsData = JSON.parse(localStorage.getItem("insta_pb_chats")) || JSON.parse(JSON.stringify(defaultChats));
let activeChatId = chatsData[0].id;
let typingChatId = null;

const initialPosts = [
    {
        id: 1,
        username: "tommy_shelby",
        location: "Birmingham, Reino Unido",
        avatar: imageLinks[0],
        image: imageLinks[2],
        likes: 45200,
        liked: false,
        saved: false,
        caption: "By order of the Peaky Blinders. 🥃 #peakyblinders #tommyshelby",
        comments: ["Incrível!", "Ninguém toca nos Shelby! 🔥"]
    },
    {
        id: 2,
        username: "john_wick",
        location: "Nova York, EUA",
        avatar: imageLinks[10],
        image: imageLinks[10],
        likes: 89300,
        liked: false,
        saved: false,
        caption: "Yeah, I think I'm back. 🐕 #johnwick",
        comments: ["Que filme sensacional!", "Lenda!"]
    },
    {
        id: 3,
        username: "shelby_company",
        location: "London, UK",
        avatar: imageLinks[4],
        image: imageLinks[5],
        likes: 12400,
        liked: false,
        saved: false,
        caption: "Negócios são negócios. 💼",
        comments: ["Perfeito!"]
    },
    {
        id: 4,
        username: "jack_reacher",
        location: "Margrave, Geórgia",
        avatar: imageLinks[14],
        image: imageLinks[14],
        likes: 67800,
        liked: false,
        saved: false,
        caption: "Viajando leve. Apenas uma escova de dentes e um plano. 👊 #reacher",
        comments: ["Ninguém mexe com o Reacher!", "Brabo demais!"]
    },
    {
        id: 5,
        username: "tommy_shelby",
        location: "Small Heath, Birmingham",
        avatar: imageLinks[0],
        image: imageLinks[12],
        likes: 54100,
        liked: false,
        saved: false,
        caption: "O poder pertence a quem tem coragem de tomá-lo. 🎩🥃 #peakyblinders",
        comments: ["Clássico!", "Tommy Shelby nunca erra."]
    },
    {
        id: 6,
        username: "arthur_shelby",
        location: "The Garrison Pub, Birmingham",
        avatar: imageLinks[3],
        image: imageLinks[13],
        likes: 38900,
        liked: false,
        saved: false,
        caption: "A família sempre vem em primeiro lugar. 🥃🔥 #shelbyfamily",
        comments: ["By order!"]
    },
    {
        id: 7,
        username: "john_shelby",
        location: "Birmingham, UK",
        avatar: imageLinks[8],
        image: imageLinks[15],
        likes: 29700,
        liked: false,
        saved: false,
        caption: "Prontos para qualquer batalha. 💼🎩",
        comments: ["Pesado demais!"]
    },
    {
        id: 8,
        username: "grace_shelby",
        location: "Warwickshire, Reino Unido",
        avatar: imageLinks[6],
        image: imageLinks[16],
        likes: 41300,
        liked: false,
        saved: false,
        caption: "Dias inesquecíveis. ✨",
        comments: ["Maravilhosa!"]
    },
    {
        id: 9,
        username: "shelby_company",
        location: "Londres, Reino Unido",
        avatar: imageLinks[4],
        image: imageLinks[17],
        likes: 33600,
        liked: false,
        saved: false,
        caption: "Novos horizontes, as mesmas regras. 🥃",
        comments: ["Impecável."]
    }
];

let posts = JSON.parse(localStorage.getItem("insta_pb_posts_v3")) || [...initialPosts];
let storyTimer = null;
let lastTapTime = 0;
let profileTab = "posts";

function saveState() {
    try {
        localStorage.setItem("insta_pb_posts_v3", JSON.stringify(posts));
        localStorage.setItem("insta_pb_chats", JSON.stringify(chatsData));
        localStorage.setItem("insta_pb_profile", JSON.stringify(userProfile));
    } catch (e) {
        console.warn(e);
    }
}

function showToast(msg) {
    const toast = document.getElementById("toast-banner");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add("hidden"), 2500);
}

function setActiveNav(navId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('font-bold'));
    const activeEl = document.getElementById(navId);
    if (activeEl) activeEl.classList.add('font-bold');
}

function carregarAvatares() {
    const sideAv = document.getElementById("sidebar-user-avatar");
    const mobAv = document.getElementById("mobile-nav-avatar");
    if (sideAv) sideAv.src = userProfile.avatar;
    if (mobAv) mobAv.src = userProfile.avatar;
}

function resetFeed() {
    setActiveNav('nav-home');
    const mainArea = document.getElementById("main-area");
    mainArea.innerHTML = `
        <div id="feed-layout" class="w-full flex justify-center animate-fade-in">
            <div class="w-full max-w-[470px]">
                <section class="bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] rounded-xl p-3 mb-6 shadow-sm overflow-hidden">
                    <div class="flex gap-4 overflow-x-auto no-scrollbar">
                        <div onclick="openStory('${userProfile.username} (Você)', '${userProfile.avatar}')" class="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                            <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 transition-transform group-hover:scale-105">
                                <img src="${userProfile.avatar}" class="w-full h-full rounded-full border-2 border-white dark:border-black object-cover" />
                            </div>
                            <span class="text-xs mt-1 text-gray-500 font-medium">Seu story</span>
                        </div>
                        <div id="stories-container" class="flex gap-4"></div>
                    </div>
                </section>

                <div id="main-content">
                    <div id="posts-container" class="space-y-6"></div>
                </div>
            </div>

            <aside class="hidden lg:block w-80 ml-16">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3 cursor-pointer" onclick="showProfile()">
                        <img src="${userProfile.avatar}" class="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p class="font-semibold text-sm">${userProfile.username}</p>
                            <p class="text-xs text-[#737373]">${userProfile.name}</p>
                        </div>
                    </div>
                    <button onclick="showProfile()" class="text-xs font-semibold text-insta-blue hover:opacity-80">Ver perfil</button>
                </div>

                <div class="mb-6">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-xs font-semibold text-[#737373]">Sugestões para você</span>
                        <button onclick="showExplore()" class="text-xs font-semibold hover:opacity-70">Ver tudo</button>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <img src="${imageLinks[14]}" class="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <p class="text-xs font-semibold">jack_reacher</p>
                                    <p class="text-[11px] text-[#737373]">Investigador Especial</p>
                                </div>
                            </div>
                            <button onclick="toggleSuggestionFollow(this)" class="text-xs font-semibold text-insta-blue">Seguir</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <img src="${imageLinks[7]}" class="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <p class="text-xs font-semibold">alfie_solomons</p>
                                    <p class="text-[11px] text-[#737373]">Camden Town, Londres</p>
                                </div>
                            </div>
                            <button onclick="toggleSuggestionFollow(this)" class="text-xs font-semibold text-insta-blue">Seguir</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2.5">
                                <img src="${imageLinks[8]}" class="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <p class="text-xs font-semibold">john_shelby</p>
                                    <p class="text-[11px] text-[#737373]">Seguido por arthur_shelby</p>
                                </div>
                            </div>
                            <button onclick="toggleSuggestionFollow(this)" class="text-xs font-semibold text-insta-blue">Seguir</button>
                        </div>
                    </div>
                </div>

                <div class="text-xs text-[#737373]">
                    © 2026 INSTAGRAM CLONE - PEAKY BLINDERS EDITION
                </div>
            </aside>
        </div>
    `;
    renderStories();
    renderPosts();
}

function toggleSuggestionFollow(btn) {
    const isFollowing = btn.textContent.trim() === "Seguindo";
    btn.textContent = isFollowing ? "Seguir" : "Seguindo";
    btn.classList.toggle("text-insta-blue", isFollowing);
    btn.classList.toggle("text-[#737373]", !isFollowing);
    showToast(isFollowing ? "Deixou de seguir" : "Você começou a seguir");
}

function renderStories() {
    const container = document.getElementById("stories-container");
    if (!container) return;
    container.innerHTML = "";
    const storiesList = [
        { user: "arthur_shelby", img: imageLinks[3] },
        { user: "ada_thorne", img: imageLinks[4] },
        { user: "john_shelby", img: imageLinks[5] },
        { user: "grace_shelby", img: imageLinks[6] },
        { user: "jack_reacher", img: imageLinks[14] }
    ];
    storiesList.forEach((st) => {
        container.innerHTML += `
            <div onclick="openStory('${st.user}', '${st.img}')" class="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 transition-transform group-hover:scale-105">
                    <img src="${st.img}" class="w-full h-full rounded-full border-2 border-white dark:border-black object-cover" />
                </div>
                <span class="text-xs mt-1 text-gray-500 font-medium">${st.user}</span>
            </div>
        `;
    });
}

function renderPosts(data = posts) {
    const container = document.getElementById("posts-container");
    if (!container) return;
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `<p class="text-center text-sm text-[#737373] py-10">Nenhuma publicação encontrada.</p>`;
        return;
    }

    data.forEach((post) => {
        const realIndex = posts.findIndex(p => p.id === post.id);
        const postAvatar = post.username === userProfile.username ? userProfile.avatar : post.avatar;
        const article = document.createElement("article");
        article.className = "bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] rounded-xl shadow-sm overflow-hidden";
        article.innerHTML = `
            <div class="flex justify-between items-center p-3.5">
                <div class="flex items-center gap-3">
                    <img src="${postAvatar}" class="w-9 h-9 rounded-full object-cover" />
                    <div>
                        <span class="font-semibold text-sm block leading-tight">${post.username}</span>
                        <span class="text-xs text-[#737373] block">${post.location}</span>
                    </div>
                </div>
                ${post.username === userProfile.username ? `
                    <button onclick="deletePost(${realIndex})" title="Excluir publicação" class="text-xs text-[#737373] hover:text-insta-red transition">Excluir</button>
                ` : ''}
            </div>

            <div class="relative flex items-center justify-center select-none bg-black" onclick="handlePostTap(${realIndex})">
                <img src="${post.image}" class="w-full object-cover aspect-square cursor-pointer" />
                <span id="heart-anim-${realIndex}" class="absolute opacity-0 text-white text-7xl pointer-events-none">❤️</span>
            </div>

            <div class="p-4">
                <div class="flex justify-between mb-3 text-2xl">
                    <div class="flex gap-4">
                        <button onclick="toggleLike(${realIndex})" class="transition-transform active:scale-125">${post.liked ? '❤️' : '🤍'}</button>
                        <button onclick="focusCommentInput(${realIndex})">💬</button>
                    </div>
                    <button onclick="toggleSave(${realIndex})" title="${post.saved ? 'Remover dos salvos' : 'Salvar'}">${post.saved ? '🏷️' : '🔖'}</button>
                </div>
                <p class="text-sm font-semibold mb-1">${post.likes.toLocaleString('pt-BR')} curtidas</p>
                <p class="text-sm mb-2"><span class="font-semibold mr-1">${post.username}</span> ${post.caption}</p>
                <div id="comments-list-${realIndex}" class="space-y-1 mb-2">
                    ${post.comments.map(c => `<p class="text-xs"><span class="font-semibold mr-1">${userProfile.username}</span> ${c}</p>`).join('')}
                </div>
                <div class="flex items-center gap-2 border-t border-gray-100 dark:border-[#262626] pt-3 mt-2">
                    <input id="comment-input-${realIndex}" type="text" placeholder="Adicione um comentário..." class="w-full text-xs bg-transparent outline-none" onkeypress="handleCommentKeyPress(event, ${realIndex})" />
                    <button onclick="addComment(${realIndex})" class="text-xs font-semibold text-insta-blue hover:opacity-80">Publicar</button>
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

function deletePost(index) {
    posts.splice(index, 1);
    saveState();
    renderPosts();
    showToast("Publicação removida");
}

function showExplore() {
    setActiveNav('nav-explore');
    const mainArea = document.getElementById("main-area");
    mainArea.innerHTML = `
        <div class="w-full max-w-4xl animate-fade-in">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
                <div>
                    <h2 class="text-xl font-bold">Explorar</h2>
                    <p class="text-xs text-[#737373]">Destaques de Birmingham, Londres e Nova York</p>
                </div>
                <div class="flex gap-2 overflow-x-auto no-scrollbar">
                    <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-black text-white dark:bg-white dark:text-black cursor-pointer">Para você</span>
                    <span onclick="showReels()" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-[#1c1c1c] hover:opacity-80 cursor-pointer">Reels</span>
                    <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-[#1c1c1c] cursor-pointer">Peaky Blinders</span>
                    <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-[#1c1c1c] cursor-pointer">Reacher</span>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-1 sm:gap-3">
                ${exploreItems.map((item, idx) => `
                    <div onclick="openExploreDetail(${idx})" class="relative group aspect-square bg-neutral-900 overflow-hidden cursor-pointer rounded-sm sm:rounded-lg ${item.featured ? 'row-span-2 aspect-auto' : ''}">
                        <img src="${item.image}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        ${item.featured ? '<span class="absolute top-2.5 right-2.5 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md backdrop-blur-sm">🎬 Destaque</span>' : ''}
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-5 text-white font-bold text-sm">
                            <span>❤️ ${item.likes}</span>
                            <span>💬 ${item.comments}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openExploreDetail(index) {
    const item = exploreItems[index];
    if (!item) return;
    document.getElementById("explore-modal-img").src = item.image;
    document.getElementById("explore-modal-avatar").src = item.avatar;
    document.getElementById("explore-modal-user").textContent = item.username;
    document.getElementById("explore-modal-caption").textContent = item.caption;
    document.getElementById("explore-modal-stats").textContent = `${item.likes} curtidas • ${item.comments} comentários`;
    document.getElementById("explore-detail-modal").classList.remove("hidden");
}

function showReels() {
    setActiveNav('nav-reels');
    const mainArea = document.getElementById("main-area");
    const reel = reelsData[currentReelIndex];

    mainArea.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center py-1 animate-fade-in">
            <div class="relative w-full max-w-[390px] h-[74vh] md:h-[80vh] bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-[#dbdbdb] dark:border-[#262626] select-none" ondblclick="likeCurrentReel(true)">
                <img src="${reel.image}" class="w-full h-full object-cover opacity-90 scale-105 transition-transform duration-700" />
                
                <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none"></div>

                <div class="absolute top-4 inset-x-4 flex items-center justify-between text-white">
                    <span class="font-bold text-lg tracking-wide drop-shadow">Reels</span>
                    <span class="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">${currentReelIndex + 1} / ${reelsData.length}</span>
                </div>

                <span id="reel-heart-pop" class="absolute inset-0 flex items-center justify-center opacity-0 text-white text-8xl pointer-events-none">❤️</span>

                <div class="absolute right-3 bottom-20 flex flex-col items-center gap-5 text-white z-10">
                    <button onclick="likeCurrentReel(false)" class="flex flex-col items-center gap-1 group">
                        <span class="text-3xl transition-transform group-active:scale-125">${reel.liked ? '❤️' : '🤍'}</span>
                        <span class="text-xs font-semibold drop-shadow">${(reel.likes / 1000).toFixed(1)} mil</span>
                    </button>

                    <button onclick="openReelComments()" class="flex flex-col items-center gap-1">
                        <span class="text-2xl">💬</span>
                        <span class="text-xs font-semibold drop-shadow">${reel.comments.length}</span>
                    </button>

                    <button onclick="showDirectMessages()" class="flex flex-col items-center gap-1">
                        <span class="text-2xl">✈️</span>
                        <span class="text-xs font-semibold drop-shadow">Enviar</span>
                    </button>

                    <div class="w-8 h-8 rounded-full border-2 border-white overflow-hidden animate-spin-slow mt-1">
                        <img src="${reel.avatar}" class="w-full h-full object-cover" />
                    </div>
                </div>

                <div class="absolute bottom-4 left-4 right-16 text-white z-10 space-y-2.5">
                    <div class="flex items-center gap-2.5">
                        <img src="${reel.avatar}" class="w-9 h-9 rounded-full border border-white object-cover" />
                        <span class="font-semibold text-sm drop-shadow">${reel.username}</span>
                        <button onclick="toggleFollowReel()" class="text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/80 hover:bg-white/20 transition-colors">
                            ${reel.following ? 'Seguindo' : 'Seguir'}
                        </button>
                    </div>
                    <p class="text-xs sm:text-sm leading-snug drop-shadow">${reel.caption}</p>
                    <div class="flex items-center gap-2 text-xs text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full w-fit max-w-full">
                        <span>🎵</span>
                        <span class="truncate">${reel.audio}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4 mt-4">
                <button onclick="prevReel()" class="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 dark:bg-[#181818] border border-[#dbdbdb] dark:border-[#262626] hover:opacity-80 transition">
                    ↑ Anterior
                </button>
                <button onclick="nextReel()" class="px-4 py-2 rounded-full text-xs font-semibold bg-insta-blue text-white hover:bg-insta-hoverBlue transition">
                    ↓ Próximo Reel
                </button>
            </div>
        </div>
    `;
}

function nextReel() {
    currentReelIndex = (currentReelIndex + 1) % reelsData.length;
    showReels();
}

function prevReel() {
    currentReelIndex = (currentReelIndex - 1 + reelsData.length) % reelsData.length;
    showReels();
}

function likeCurrentReel(fromDoubleTap) {
    const reel = reelsData[currentReelIndex];
    if (fromDoubleTap) {
        if (!reel.liked) {
            reel.liked = true;
            reel.likes += 1;
        }
    } else {
        reel.liked = !reel.liked;
        reel.likes += reel.liked ? 1 : -1;
    }
    showReels();
    if (fromDoubleTap) {
        const heart = document.getElementById("reel-heart-pop");
        if (heart) heart.classList.add("animate-heart-pop");
    }
}

function toggleFollowReel() {
    reelsData[currentReelIndex].following = !reelsData[currentReelIndex].following;
    showReels();
}

function openReelComments() {
    const reel = reelsData[currentReelIndex];
    const listEl = document.getElementById("reel-comments-list");
    listEl.innerHTML = reel.comments.map(c => `
        <div class="text-xs flex items-start gap-2">
            <span class="font-semibold">${c.user}</span>
            <span>${c.text}</span>
        </div>
    `).join('');
    document.getElementById("reel-comments-modal").classList.remove("hidden");
    document.getElementById("reel-comment-input").focus();
}

function closeReelComments() {
    document.getElementById("reel-comments-modal").classList.add("hidden");
}

function submitReelComment() {
    const input = document.getElementById("reel-comment-input");
    if (!input || !input.value.trim()) return;
    reelsData[currentReelIndex].comments.push({
        user: userProfile.username,
        text: input.value.trim()
    });
    input.value = "";
    openReelComments();
    showReels();
}

function showNotifications() {
    setActiveNav('nav-notifications');
    ['notif-unread-badge', 'notif-mobile-badge'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    notificationsData.forEach(n => n.unread = false);

    const sections = ["Hoje", "Esta semana", "Este mês"];
    const mainArea = document.getElementById("main-area");

    mainArea.innerHTML = `
        <div class="w-full max-w-xl bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] rounded-2xl p-4 sm:p-6 shadow-sm animate-fade-in">
            <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-bold">Notificações</h2>
                <span class="text-xs text-[#737373]">Atividade recente</span>
            </div>

            <div class="space-y-6">
                ${sections.map(sec => {
                    const items = notificationsData.filter(n => n.section === sec);
                    if (items.length === 0) return '';
                    return `
                        <div>
                            <h3 class="font-bold text-sm mb-3 text-[#0f1419] dark:text-[#f3f5f7]">${sec}</h3>
                            <div class="space-y-3.5">
                                ${items.map(item => `
                                    <div class="flex items-center justify-between gap-3">
                                        <div class="flex items-center gap-3 min-w-0">
                                            <img src="${item.avatar}" class="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-gray-200 dark:border-neutral-800" />
                                            <p class="text-sm leading-snug">
                                                <span class="font-semibold">${item.username}</span> ${item.text}
                                                <span class="text-xs text-[#737373] ml-1">${item.time}</span>
                                            </p>
                                        </div>
                                        ${item.type === 'follow' ? `
                                            <button onclick="toggleFollowNotification(${item.id})" class="px-4 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 transition-colors ${item.following ? 'bg-gray-100 dark:bg-[#262626] text-current' : 'bg-insta-blue text-white hover:bg-insta-hoverBlue'}">
                                                ${item.following ? 'Seguindo' : 'Seguir'}
                                            </button>
                                        ` : `
                                            <img src="${item.preview}" onclick="resetFeed()" class="w-11 h-11 rounded-md object-cover flex-shrink-0 cursor-pointer border border-gray-200 dark:border-neutral-800" />
                                        `}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function toggleFollowNotification(id) {
    const notif = notificationsData.find(n => n.id === id);
    if (notif) {
        notif.following = !notif.following;
        showNotifications();
    }
}

function showProfile() {
    setActiveNav('nav-profile');
    const myPosts = posts.filter(p => p.username === userProfile.username);
    const savedPosts = posts.filter(p => p.saved);
    const mainArea = document.getElementById("main-area");

    let tabContentHtml = "";
    if (profileTab === "posts") {
        tabContentHtml = myPosts.length === 0
            ? `<p class="text-center text-sm text-[#737373] py-12">Nenhuma publicação ainda. Clique em "+ Novo post" para publicar.</p>`
            : `<div class="grid grid-cols-3 gap-1 sm:gap-3 pt-4">
                ${myPosts.map(p => `
                    <div onclick="resetFeed()" class="aspect-square bg-black overflow-hidden cursor-pointer relative group rounded-sm">
                        <img src="${p.image}" class="w-full h-full object-cover group-hover:opacity-80 transition" />
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white text-xs font-bold">
                            <span>❤️ ${p.likes.toLocaleString('pt-BR')}</span>
                            <span>💬 ${p.comments.length}</span>
                        </div>
                    </div>
                `).join('')}
               </div>`;
    } else if (profileTab === "saved") {
        tabContentHtml = savedPosts.length === 0
            ? `<p class="text-center text-sm text-[#737373] py-12">Você ainda não salvou nenhuma publicação. Toque em 🔖 nos posts do feed para salvar aqui.</p>`
            : `<div class="grid grid-cols-3 gap-1 sm:gap-3 pt-4">
                ${savedPosts.map(p => `
                    <div onclick="resetFeed()" class="aspect-square bg-black overflow-hidden cursor-pointer relative group rounded-sm">
                        <img src="${p.image}" class="w-full h-full object-cover group-hover:opacity-80 transition" />
                    </div>
                `).join('')}
               </div>`;
    } else if (profileTab === "edit") {
        tabContentHtml = `
            <div class="max-w-md mx-auto pt-6 space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-[#737373] mb-1">Nome de exibição</label>
                    <input id="edit-prof-name" type="text" value="${userProfile.name}" class="w-full border border-[#dbdbdb] dark:border-[#262626] bg-gray-50 dark:bg-[#121212] px-3 py-2 rounded-xl text-sm outline-none" />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-[#737373] mb-1">Subtítulo / Cargo</label>
                    <input id="edit-prof-subtitle" type="text" value="${userProfile.subtitle}" class="w-full border border-[#dbdbdb] dark:border-[#262626] bg-gray-50 dark:bg-[#121212] px-3 py-2 rounded-xl text-sm outline-none" />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-[#737373] mb-1">Biografia</label>
                    <textarea id="edit-prof-bio" rows="2" class="w-full border border-[#dbdbdb] dark:border-[#262626] bg-gray-50 dark:bg-[#121212] px-3 py-2 rounded-xl text-sm outline-none resize-none">${userProfile.bio}</textarea>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-[#737373] mb-1">URL da foto de perfil</label>
                    <input id="edit-prof-avatar" type="text" value="${userProfile.avatar}" class="w-full border border-[#dbdbdb] dark:border-[#262626] bg-gray-50 dark:bg-[#121212] px-3 py-2 rounded-xl text-sm outline-none" />
                </div>
                <div class="flex items-center justify-between pt-2">
                    <button onclick="resetAllData()" class="text-xs font-semibold text-insta-red hover:underline">Restaurar dados padrão</button>
                    <button onclick="saveProfileChanges()" class="px-5 py-2 bg-insta-blue hover:bg-insta-hoverBlue text-white text-xs font-semibold rounded-xl">Salvar alterações</button>
                </div>
            </div>
        `;
    }

    mainArea.innerHTML = `
        <div class="w-full max-w-3xl animate-fade-in">
            <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 pb-8 border-b border-[#dbdbdb] dark:border-[#262626]">
                <img src="${userProfile.avatar}" class="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-[#dbdbdb] dark:border-[#262626]" />
                <div class="text-center sm:text-left space-y-3">
                    <div class="flex flex-wrap justify-center sm:justify-start items-center gap-2.5">
                        <h2 class="text-xl font-semibold">${userProfile.username}</h2>
                        <button onclick="setProfileTab('edit')" class="px-3.5 py-1.5 bg-gray-100 dark:bg-[#262626] hover:opacity-80 rounded-lg text-xs font-semibold">Editar perfil</button>
                        <button onclick="openCreateModal()" class="px-3.5 py-1.5 bg-insta-blue text-white hover:bg-insta-hoverBlue rounded-lg text-xs font-semibold">+ Novo post</button>
                    </div>
                    <div class="flex justify-center sm:justify-start gap-6 text-sm">
                        <span><strong>${myPosts.length}</strong> publicações</span>
                        <span><strong>1,4 mi</strong> seguidores</span>
                        <span><strong>42</strong> seguindo</span>
                    </div>
                    <div class="text-sm">
                        <p class="font-semibold">${userProfile.name}</p>
                        <p class="text-[#737373]">${userProfile.subtitle}</p>
                        <p class="mt-1">${userProfile.bio}</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-center gap-8 border-b border-[#dbdbdb] dark:border-[#262626] text-xs font-semibold tracking-wider uppercase">
                <button onclick="setProfileTab('posts')" class="py-3 border-t-2 -mt-[1px] transition ${profileTab === 'posts' ? 'border-black dark:border-white text-current' : 'border-transparent text-[#737373]'}">
                    Publicações
                </button>
                <button onclick="setProfileTab('saved')" class="py-3 border-t-2 -mt-[1px] transition ${profileTab === 'saved' ? 'border-black dark:border-white text-current' : 'border-transparent text-[#737373]'}">
                    Salvos (${savedPosts.length})
                </button>
                <button onclick="setProfileTab('edit')" class="py-3 border-t-2 -mt-[1px] transition ${profileTab === 'edit' ? 'border-black dark:border-white text-current' : 'border-transparent text-[#737373]'}">
                    Configurações
                </button>
            </div>

            ${tabContentHtml}
        </div>
    `;
}

function setProfileTab(tab) {
    profileTab = tab;
    showProfile();
}

function saveProfileChanges() {
    const newName = document.getElementById("edit-prof-name").value.trim();
    const newSub = document.getElementById("edit-prof-subtitle").value.trim();
    const newBio = document.getElementById("edit-prof-bio").value.trim();
    const newAv = document.getElementById("edit-prof-avatar").value.trim();

    if (newName) userProfile.name = newName;
    userProfile.subtitle = newSub;
    userProfile.bio = newBio;
    if (newAv) userProfile.avatar = newAv;

    saveState();
    carregarAvatares();
    profileTab = "posts";
    showProfile();
    showToast("Perfil atualizado com sucesso!");
}

function resetAllData() {
    localStorage.removeItem("insta_pb_posts_v3");
    localStorage.removeItem("insta_pb_chats");
    localStorage.removeItem("insta_pb_profile");
    posts = [...initialPosts];
    chatsData = JSON.parse(JSON.stringify(defaultChats));
    userProfile = { ...defaultProfile };
    carregarAvatares();
    profileTab = "posts";
    showProfile();
    showToast("Dados restaurados ao padrão!");
}

function showDirectMessages() {
    setActiveNav('nav-dm');
    ['dm-unread-badge', 'dm-mobile-badge'].forEach(id => {
        const badge = document.getElementById(id);
        if (badge) badge.classList.add("hidden");
    });

    const mainArea = document.getElementById("main-area");
    mainArea.innerHTML = `
        <div class="w-full max-w-5xl h-[calc(100vh-130px)] md:h-[calc(100vh-65px)] bg-white dark:bg-black border border-[#dbdbdb] dark:border-[#262626] rounded-xl flex overflow-hidden shadow-sm animate-fade-in">
            <div id="dm-chats-list" class="w-full md:w-80 border-r border-[#dbdbdb] dark:border-[#262626] flex flex-col h-full bg-white dark:bg-black">
                <div class="p-4 border-b border-[#dbdbdb] dark:border-[#262626] flex items-center justify-between">
                    <span class="font-bold text-lg">${userProfile.username}</span>
                    <span class="text-lg">✏️</span>
                </div>
                <div class="flex-1 overflow-y-auto">
                    ${chatsData.map(chat => {
                        const lastMsg = chat.messages[chat.messages.length - 1];
                        const isSelected = chat.id === activeChatId;
                        return `
                            <div onclick="selectChat('${chat.id}')" class="flex items-center gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-[#121212] cursor-pointer transition-colors ${isSelected ? 'bg-gray-100 dark:bg-[#121212]' : ''}">
                                <div class="relative">
                                    <img src="${chat.avatar}" class="w-12 h-12 rounded-full object-cover" />
                                    ${chat.online ? '<span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>' : ''}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-semibold text-sm truncate">${chat.name}</p>
                                    <p class="text-xs text-[#737373] truncate">${typingChatId === chat.id ? '<span class="text-insta-blue font-medium">digitando...</span>' : (lastMsg ? (lastMsg.sender === 'me' ? 'Você: ' : '') + lastMsg.text : 'Nenhuma mensagem')}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div id="dm-chat-window" class="hidden md:flex flex-1 flex-col h-full bg-white dark:bg-black">
                ${renderActiveChatHeader()}
                
                <div id="messages-container" class="flex-1 p-4 overflow-y-auto space-y-3">
                    ${renderActiveChatMessages()}
                </div>

                <div class="p-3 border-t border-[#dbdbdb] dark:border-[#262626]">
                    <div class="flex items-center bg-gray-100 dark:bg-[#121212] rounded-full px-4 py-2 border border-[#dbdbdb] dark:border-[#262626]">
                        <input id="dm-message-input" type="text" placeholder="Escreva uma mensagem..." class="w-full text-sm bg-transparent outline-none" onkeypress="handleDMKeyPress(event)" />
                        <button onclick="sendDirectMessage()" class="text-sm font-semibold text-insta-blue hover:text-insta-hoverBlue transition-colors ml-2">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    scrollToBottom();
}

function renderActiveChatHeader() {
    const activeChat = chatsData.find(c => c.id === activeChatId);
    if (!activeChat) return '';
    const statusText = typingChatId === activeChat.id
        ? '<span class="text-insta-blue font-medium">digitando...</span>'
        : (activeChat.online ? 'Ativo(a) agora' : 'Offline');

    return `
        <div class="p-3.5 border-b border-[#dbdbdb] dark:border-[#262626] flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button onclick="backToChatsList()" class="md:hidden text-xl mr-1">←</button>
                <img src="${activeChat.avatar}" class="w-9 h-9 rounded-full object-cover" />
                <div>
                    <p class="font-semibold text-sm leading-tight">${activeChat.name}</p>
                    <p class="text-xs text-[#737373]">${statusText}</p>
                </div>
            </div>
        </div>
    `;
}

function renderActiveChatMessages() {
    const activeChat = chatsData.find(c => c.id === activeChatId);
    if (!activeChat) return '';
    return activeChat.messages.map(msg => `
        <div class="flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-insta-blue text-white rounded-br-none' : 'bg-gray-100 dark:bg-[#262626] rounded-bl-none'}">
                <p>${msg.text}</p>
                <span class="text-[10px] opacity-70 block text-right mt-1">${msg.time}</span>
            </div>
        </div>
    `).join('');
}

function selectChat(id) {
    activeChatId = id;
    showDirectMessages();
    const windowEl = document.getElementById("dm-chat-window");
    const listEl = document.getElementById("dm-chats-list");
    if (windowEl && listEl && window.innerWidth < 768) {
        listEl.classList.add("hidden");
        windowEl.classList.remove("hidden");
        windowEl.classList.add("flex");
    }
}

function backToChatsList() {
    const windowEl = document.getElementById("dm-chat-window");
    const listEl = document.getElementById("dm-chats-list");
    if (windowEl && listEl) {
        windowEl.classList.add("hidden");
        windowEl.classList.remove("flex");
        listEl.classList.remove("hidden");
    }
}

function handleDMKeyPress(e) {
    if (e.key === 'Enter') sendDirectMessage();
}

function sendDirectMessage() {
    const input = document.getElementById("dm-message-input");
    if (!input || input.value.trim() === "") return;

    const text = input.value.trim();
    input.value = "";

    const activeChat = chatsData.find(c => c.id === activeChatId);
    if (!activeChat) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    activeChat.messages.push({ sender: 'me', text: text, time: timeStr });
    typingChatId = activeChat.id;
    saveState();
    showDirectMessages();

    setTimeout(() => {
        const replies = activeChat.autoReplies;
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        activeChat.messages.push({
            sender: 'them',
            text: randomReply,
            time: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`
        });
        typingChatId = null;
        saveState();
        if (document.getElementById("messages-container")) {
            showDirectMessages();
        }
    }, 1400);
}

function scrollToBottom() {
    const container = document.getElementById("messages-container");
    if (container) container.scrollTop = container.scrollHeight;
}

function handlePostTap(index) {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 300) {
        const heart = document.getElementById(`heart-anim-${index}`);
        if (heart) {
            heart.classList.remove("animate-heart-pop");
            void heart.offsetWidth;
            heart.classList.add("animate-heart-pop");
        }
        if (!posts[index].liked) toggleLike(index);
    }
    lastTapTime = currentTime;
}

function toggleLike(index) {
    posts[index].liked = !posts[index].liked;
    posts[index].likes += posts[index].liked ? 1 : -1;
    saveState();
    renderPosts();
}

function toggleSave(index) {
    posts[index].saved = !posts[index].saved;
    saveState();
    renderPosts();
    showToast(posts[index].saved ? "Salvo na sua coleção" : "Removido dos salvos");
}

function focusCommentInput(index) {
    const input = document.getElementById(`comment-input-${index}`);
    if (input) input.focus();
}

function handleCommentKeyPress(e, index) {
    if (e.key === 'Enter') addComment(index);
}

function addComment(index) {
    const input = document.getElementById(`comment-input-${index}`);
    if (!input || input.value.trim() === "") return;
    posts[index].comments.push(input.value.trim());
    saveState();
    renderPosts();
}

function toggleSearchModal() {
    const modal = document.getElementById("search-modal");
    modal.classList.toggle("hidden");
    if (!modal.classList.contains("hidden")) {
        resetFeed();
        document.getElementById("search-input").focus();
    }
}

function quickSearch(term) {
    const input = document.getElementById("search-input");
    input.value = term;
    filterPosts();
}

function filterPosts() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filtered = posts.filter(p =>
        p.username.toLowerCase().includes(query) ||
        p.caption.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
    );
    renderPosts(filtered);
}

function openStory(username, imgUrl) {
    const modal = document.getElementById("story-modal");
    const bg = document.getElementById("story-bg");
    const progress = document.getElementById("story-progress");

    document.getElementById("story-username").textContent = username;
    document.getElementById("story-user-img").src = imgUrl;
    bg.style.backgroundImage = `url('${imgUrl}')`;

    modal.classList.remove("hidden");
    progress.classList.remove("animate-progress");
    void progress.offsetWidth;
    progress.classList.add("animate-progress");

    clearTimeout(storyTimer);
    storyTimer = setTimeout(closeStory, 5000);
}

function closeStory() {
    clearTimeout(storyTimer);
    document.getElementById("story-modal").classList.add("hidden");
}

function openCreateModal() {
    document.getElementById("create-modal").classList.remove("hidden");
}

function closeCreateModal() {
    document.getElementById("create-modal").classList.add("hidden");
    clearPostPreview();
    document.getElementById("post-caption").value = "";
    document.getElementById("post-location").value = "";
}

function clearPostPreview() {
    document.getElementById("post-image-url").value = "";
    document.getElementById("post-file-input").value = "";
    document.getElementById("image-preview").src = "";
    document.getElementById("image-preview-container").classList.add("hidden");
}

function handleImageFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById("post-image-url").value = evt.target.result;
        previewPostImage();
    };
    reader.readAsDataURL(file);
}

function previewPostImage() {
    const url = document.getElementById("post-image-url").value.trim();
    const previewContainer = document.getElementById("image-preview-container");
    const previewImg = document.getElementById("image-preview");
    if (url) {
        previewImg.src = url;
        previewContainer.classList.remove("hidden");
    } else {
        previewContainer.classList.add("hidden");
    }
}

function submitNewPost() {
    const imageUrl = document.getElementById("post-image-url").value.trim() || userProfile.avatar;
    const caption = document.getElementById("post-caption").value.trim() || "Nova publicação.";
    const location = document.getElementById("post-location").value.trim() || "Birmingham, Reino Unido";

    posts.unshift({
        id: Date.now(),
        username: userProfile.username,
        location: location,
        avatar: userProfile.avatar,
        image: imageUrl,
        likes: 1,
        liked: true,
        saved: false,
        caption: caption,
        comments: []
    });

    saveState();
    closeCreateModal();
    resetFeed();
    showToast("Publicação compartilhada!");
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("insta_pb_theme", isDark ? "dark" : "light");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeStory();
        closeCreateModal();
        closeReelComments();
        document.getElementById("search-modal").classList.add("hidden");
        document.getElementById("explore-detail-modal").classList.add("hidden");
    }
});

if (localStorage.getItem("insta_pb_theme") === "dark") {
    document.documentElement.classList.add("dark");
}
carregarAvatares();
resetFeed();