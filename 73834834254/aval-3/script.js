// Base de Dados Teórica Estruturada como se fossem as legendas estendidas do Instagram
const postsData = {
    "intro": {
        title: "1. Introdução à Web",
        visual: "🍒 CONTEÚDO EXCLUSIVO BLOSSOM",
        text: "A internet e a web estão tão presentes no cotidiano que muitas vezes as pessoas usam sem entender a complexidade nos bastidores. Todo santo dia você acessa redes sociais e assiste a vídeos, mas saiba que há uma malha gigantesca conectando bilhões de dispositivos mundiais. <br><br>Neste perfil, você vai dominar de forma impecável: O surgimento da rede, a comunicação de computadores e a diferença crucial entre Web e Internet."
    },
    "o-que-e-internet": {
        title: "2. O que é a Internet?",
        visual: "🌐 REDE DE REDES MUNDIAL",
        text: "Simplificando para quem não tem neurônios digitais: a Internet é o <strong>sistema global de infraestrutura física e digital</strong> que conecta computadores por todo o planeta. <br><br>Ela opera através de um conjunto rígido de regras padronizadas conhecidas como <strong>protocolos de comunicação</strong> (como o TCP/IP). Sem essas regras, os dispositivos simplesmente não conseguiriam conversar entre si."
    },
    "historia": {
        title: "3. Origens da Rede",
        visual: "⏳ DA GUERRA FRIA PARA O SEU FEED",
        text: "Tudo começou na década de 1960. Em meio à paranoia da Guerra Fria, o Departamento de Defesa dos EUA precisava de uma rede de comunicação que não caísse se um pedaço fosse destruído. Nasceu a <strong>ARPANET</strong>. <br><br>Anote a evolução, querido(a):<br>• Década de 60: ARPANET<br>• Década de 70: Surgem os protocolos TCP/IP<br>• Década de 80: Universidades entram no jogo<br>• Década de 90: A explosão comercial."
    },
    "infraestrutura": {
        title: "4. Infraestrutura Física",
        visual: "🏢 A NUVEM NÃO EXISTE, SÃO COMPUTADORES DOS OUTROS",
        text: "Você acha que a internet é mágica e virtual? Que amador. Ela depende de uma infraestrutura física massiva: <strong>data centers gigantescos, servidores dedicados, roteadores de alta performance e cabos potentes</strong>.<br><br> Quando você digita um endereço, sua requisição viaja fisicamente por esses aparelhos em milissegundos até encontrar a resposta do servidor."
    },
    "cabos": {
        title: "5. Cabos Submarinos",
        visual: "⚓ INTERNET DE BAIXO D'ÁGUA",
        text: "Esqueça os satélites por um momento. A grande espinha dorsal da internet mundial está no fundo dos oceanos. <br><br>São <strong>milhares de quilômetros de cabos submarinos de fibra óptica</strong> que interligam continentes. Eles são os preferidos para o tráfego internacional porque entregam largura de banda gigantesca e latência infinitamente menor que conexões espaciais."
    },
    "o-que-e-web": {
        title: "6. O que é a Web?",
        visual: "🕸️ WORLD WIDE WEB",
        text: "Atenção: A Web <strong>NÃO</strong> é a internet. Ela é um sistema de informações que roda <em>sobre</em> a internet. <br><br>A Web consiste em um conjunto gigantesco de documentos digitais e arquivos de mídia (vídeos, textos, imagens) totalmente interconectados por meio de <strong>hiperlinks</strong>. Você navega por essa teia usando o seu browser."
    },
    "como-funciona-web": {
        title: "7. Arquitetura Cliente-Servidor",
        visual: "⚙️ COMO ELES CONVERSAM",
        text: "A engrenagem da Web roda sob o modelo <strong>Cliente-Servidor</strong>:<br><br>1. <strong>Cliente:</strong> O seu smartphone ou PC rodando navegadores de elite como Chrome, Safari ou Firefox.<br>2. <strong>Servidor:</strong> Supercomputadores que guardam os sites.<br><br>O cliente faz uma requisição via protocolo <strong>HTTP</strong>, o servidor processa e envia os dados de volta para montar sua tela."
    },
    "tim": {
        title: "8. O Toque de Midas de Tim Berners-Lee",
        visual: "👑 O ARQUITETO DA WEB",
        text: "No final dos anos 80, o cientista <strong>Tim Berners-Lee</strong> precisava facilitar o compartilhamento de pesquisas no CERN. Ele simplesmente revolucionou o mundo criando a trindade da Web:<br><br>• <strong>HTML:</strong> A linguagem para estruturar as páginas.<br>• <strong>HTTP:</strong> O protocolo para transferir os dados.<br>• <strong>URL:</strong> O endereço exclusivo para achar cada página."
    },
    "diferencas": {
        title: "9. O Erro Amador: Internet x Web",
        visual: "🔥 ANATOMIA DA DIFERENÇA",
        text: "Aprenda de uma vez por todas para não passar vergonha:<br><br>• <strong>INTERNET:</strong> É a infraestrutura global. As estradas, os fios, a parte física e de rede.<br>• <strong>WEB:</strong> É apenas um dos serviços que roda nessa estrada (as páginas digitais).<br><br>Outros serviços que usam a internet e não são a web: Aplicativos de Email, Protocolos de FTP, Jogos Online e Streams de App."
    },
    "conclusao": {
        title: "10. Conclusão da Aula",
        visual: "🍷 DOMÍNIO TOTAL",
        text: "A internet veio de um projeto militar estratégico e a Web tornou tudo visual e acessível. <br><br>Compreender essa base não é opcional, é fundamental se você deseja dominar o desenvolvimento moderno, segurança ou engenharia de sistemas. Classe dispensada. Deixe seu like."
    }
};

// Lógica de Interação da Página (Modal e Destaques)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-modal');
    const postCards = document.querySelectorAll('.post-card');
    const highlightItems = document.querySelectorAll('.highlight-item');

    // Função para abrir o modal com os dados corretos
    function openPost(id) {
        const data = postsData[id];
        if (data) {
            document.getElementById('modalPostTitle').innerText = data.title;
            document.getElementById('modalPostVisual').innerHTML = `<strong>[${data.visual}]</strong>`;
            document.getElementById('modalPostFullText').innerHTML = data.text;
            modal.style.display = 'flex';
        }
    }

    // Clique nos posts da grade
    postCards.forEach(card => {
        card.addEventListener('click', () => {
            openPost(card.id);
        });
    });

    // Clique nos círculos de Destaque (Stories) abre direto o respectivo post
    highlightItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            openPost(targetId);
        });
    });

    // Fechar Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar clicando fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
