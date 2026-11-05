const postsDatabase = {
    "intro": {
        title: "1. Introdução à Redes",
        likes: 125432,
        liked: false,
        slides: [
            { label: "CAPA", desc: "A internet e a web estão em todo lugar, mas aposto que você as usa sem entender como funcionam. Vamos corrigir esse lapso de conhecimento, queridinho(a)..." },
            { label: "O QUE VEREMOS", desc: "Neste feed você aprenderá de forma cirúrgica:<br>• O conceito real de internet<br>• As origens militares<br>• A arquitetura cliente-servidor<br>• Como a Web roda por cima de tudo." }
        ],
        comments: [
            { user: "v_lodge", text: "Amei o formato carrossel, Cheryl! Super explicativo para quem vive no offline. 💅" },
            { user: "jughead_jones", text: "Olha só, a rainha de Thornhill virou arquiteta de sistemas distribuídos? Surpreendente." },
            { user: "cheryl_blossom", text: "@jughead_jones Menos sarcasmo, Jones. Meu intelecto é multifacetado." }
        ]
    },
    "o-que-e-internet": {
        title: "2. O que é a Internet",
        likes: 98114,
        liked: false,
        slides: [
            { label: "DEFINIÇÃO", desc: "A internet é o <strong>sistema físico global de redes de computadores interconectadas</strong>. Ela liga celulares, PCs e servidores pelo mundo todo." },
            { label: "PROTOCOLOS", desc: "Tudo isso só funciona porque existe um conjunto estrito de regras universais chamado <strong>Protocolos de Comunicação (TCP/IP)</strong>. Eles ditam como os dados se quebram e viajam." }
        ],
        comments: [
            { user: "betty_cooper", text: "Excelente resumo dos protocolos de rede. Salvando para estudar pro exame!" },
            { user: "archie_andrews", text: "Eu achava que os computadores se conectavam direto por mágica rs 🤓" }
        ]
    },
    "historia": {
        title: "3. História da Internet",
        likes: 142903,
        liked: false,
        slides: [
            { label: "ARPANET", desc: "Anos 1960, Guerra Fria. O Departamento de Defesa dos EUA criou a ARPANET. Uma rede descentralizada para resistir a ataques militares locais." },
            { label: "MARCOS", desc: "Evolução temporal rápida:<br>• 1970: Padronização do TCP/IP.<br>• 1980: Entrada em massa de centros acadêmicos.<br>• 1990: Abertura comercial definitiva." }
        ],
        comments: [
            { user: "jughead_jones", text: "História militar misturada com tecnologia. Agora você capturou minha atenção." }
        ]
    },
    "infraestrutura": {
        title: "4. Infraestrutura Real",
        likes: 87341,
        liked: false,
        slides: [
            { label: "FÍSICO", desc: "A internet não flutua no ar! Ela depende de uma infraestrutura massiva: Data Centers gigantes, Servidores potentes, Roteadores de borda e cabos." },
            { label: "PROCESSO", desc: "Quando você requisita um site, o sinal viaja fisicamente por esses equipamentos em milissegundos até bater no servidor de destino e retornar." }
        ],
        comments: [
            { user: "v_lodge", text: "Sempre imaginei data centers parecidos com cofres de banco, muito elegantes." }
        ]
    },
    "cabos": {
        title: "5. Cabos Submarinos",
        likes: 110567,
        liked: false,
        slides: [
            { label: "OCEANOS", desc: "Esqueça satélites lentos. Quase 99% do tráfego internacional de dados passa por <strong>cabos submarinos de fibra óptica</strong> esticados no leito do oceano." },
            { label: "VANTAGEM", desc: "A fibra subaquática fornece velocidades absurdas de transmissão de dados e uma latência muito menor do que mandar dados para o espaço." }
        ],
        comments: [
            { user: "betty_cooper", text: "Minha nossa, imagine o trabalho técnico de manutenção desses cabos profundos!" }
        ]
    },
    "o-que-e-web": {
        title: "6. O que é a Web",
        likes: 134291,
        liked: false,
        slides: [
            { label: "CONCEITO", desc: "A World Wide Web (WWW) é apenas <strong>um dos serviços</strong> que rodam em cima da Internet. É a coleção de páginas digitais interligadas." },
            { label: "MÍDIAS", desc: "Essas páginas agregam hipermídias: textos, imagens, áudios e vídeos estruturados, acessíveis a partir de navegadores web através de links." }
        ],
        comments: [
            { user: "reggie_mantle", text: "Finalmente entendi. Internet = pista de corrida. Web = os carros esportivos. Correto?" },
            { user: "cheryl_blossom", text: "@reggie_mantle Surpreendentemente preciso, Reggie. Te dou um 10." }
        ]
    },
    "como-funciona-web": {
        title: "7. Como Funciona a Web",
        likes: 95400,
        liked: false,
        slides: [
            { label: "ARQUITETURA", desc: "O ecossistema é baseado no modelo <strong>Cliente-Servidor</strong>. O cliente faz pedidos e o servidor responde com dados." },
            { label: "FLUXO", desc: "Seu navegador (Cliente) envia um <strong>HTTP Request</strong>. O Servidor recebe, processa os arquivos HTML/CSS e devolve um <strong>HTTP Response</strong>." }
        ],
        comments: []
    },
    "tim": {
        title: "8. Tim Berners-Lee",
        likes: 156112,
        liked: false,
        slides: [
            { label: "O MITO", desc: "O cientista britânico Tim Berners-Lee inventou a Web no fim dos anos 80 enquanto trabalhava no CERN para facilitar a troca de arquivos científicos." },
            { label: "PILAS", desc: "Para fazer a teia funcionar, ele criou os três pilares absolutos de qualquer desenvolvedor:<br>• <strong>HTML</strong><br>• <strong>HTTP</strong><br>• <strong>URL</strong>" }
        ],
        comments: [
            { user: "jughead_jones", text: "Esse homem mudou a história humana operando de uma mesa de laboratório suíça." }
        ]
    },
    "diferencas": {
        title: "9. Internet x Web",
        likes: 210889,
        liked: false,
        slides: [
            { label: "COMPARATIVO", desc: "<strong>Internet:</strong> A rede de hardware, cabos e roteadores mundiais.<br><strong>Web:</strong> O sistema de documentos acessados via navegador." },
            { label: "OUTROS SERVIÇOS", desc: "Se lembre que existem outros serviços que usam a internet e não passam pela web, tais como: Emails diretos, Transferência FTP, Jogos Online e canais de streaming de apps." }
        ],
        comments: [
            { user: "v_lodge", text: "Post necessário! Metade de Manhattan confunde esses dois termos cotidianamente." }
        ]
    },
    "conclusao": {
        title: "10. Conclusão",
        likes: 180320,
        liked: false,
        slides: [
            { label: "ENCERRAMENTO", desc: "Dominar a espinha dorsal técnica da rede é o primeiro passo para quem quer controlar o desenvolvimento tecnológico ou sistemas modernos." },
            { label: "BYE", desc: "Fundamentos consolidados com sucesso. Agora vocês estão prontos para criar impérios. Beijos da Cheryl. 🍷🍒" }
        ],
        comments: [
            { user: "betty_cooper", text: "Adorei a mini-classe de redes, Cheryl! Faça mais vezes." }
        ]
    }
};

let activePostId = null;
let activeSlideIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    setupEventListeners();
});

// Renderização dinâmica da grade do feed do IG
function renderGrid() {
    const grid = document.getElementById('gridContent');
    grid.innerHTML = '';
    
    Object.keys(postsDatabase).forEach(key => {
        const post = postsDatabase[key];
        const card = document.createElement('article');
        card.className = 'post-card';
        card.id = key;
        card.innerHTML = `
            <span class="post-card-tag">🗂️ Carrossel</span>
            <div>
                <h3>${post.title}</h3>
            </div>
            <div class="post-overlay">
                <div class="post-overlay-stats">❤️ ${formatNumber(post.likes)}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupEventListeners() {
    const modal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Abrir Post ao Clicar na Grade
    document.getElementById('gridContent').addEventListener('click', (e) => {
        const card = e.target.closest('.post-card');
        if (card) openModal(card.id);
    });

    // Cliques nos Destaques
    document.querySelectorAll('.highlight-item').forEach(item => {
        item.addEventListener('click', () => {
            openModal(item.getAttribute('data-target'));
        });
    });

    // Fechar Modal
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    // Navegação do Carrossel interno
    document.getElementById('prevBtn').addEventListener('click', () => changeSlide(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changeSlide(1));

    // Duplo Clique na Imagem do Modal (Efeito Curtida IG)
    document.getElementById('modalImageSide').addEventListener('dblclick', () => {
        triggerHeartPop();
        if(!postsDatabase[activePostId].liked) {
            toggleLike();
        }
    });

    // Botão Curtir na Barra de Ações
    document.getElementById('likeActionBtn').addEventListener('click', toggleLike);

    // Publicar Comentário Interativo
    document.getElementById('postCommentBtn').addEventListener('click', addNewComment);
    document.getElementById('commentInput').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addNewComment();
    });

    // Troca de Abas do Perfil
    document.querySelectorAll('.profile-tabs .tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.profile-tabs .tab').forEach(t => t.classList.remove('active'));
