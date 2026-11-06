// Banco de dados contendo o resumo estruturado de cada tópico da aula
const conteudoResumo = {
    1: {
        title: "1. Introdução",
        content: `
            <h3>Apresentação da Matéria</h3>
            <p>A internet e a web estão tão presentes no cotidiano que as utilizamos sem compreender a fundo como operam. Por trás de sites e redes sociais existe uma infraestrutura tecnológica complexa.</p>
            <br>
            <p><strong>Nesta aula abordamos:</strong></p>
            <ul>
                <li>O que é a internet e sua história;</li>
                <li>Como os computadores se comunicam;</li>
                <li>O conceito e funcionamento da web.</li>
            </ul>
        `
    },
    2: {
        title: "2. O que é a Internet",
        content: `
            <h3>Rede Global de Computadores</h3>
            <p>A internet é um <strong>sistema global de redes de computadores interligadas</strong> que se comunicam através de protocolos padronizados.</p>
            <br>
            <p><strong>Características principais:</strong></p>
            <ul>
                <li>Conecta bilhões de dispositivos;</li>
                <li>Usa protocolos padronizados;</li>
                <li>Permite compartilhamento de dados, streaming e computação em nuvem.</li>
            </ul>
            <p><em>Resumo: A internet é a infraestrutura física de comunicação.</em></p>
        `
    },
    3: {
        title: "3. História da Internet",
        content: `
            <h3>Da ARPANET à Era Moderna</h3>
            <p>Criada na década de 1960 (Guerra Fria), a <strong>ARPANET</strong> (projeto do Depto. de Defesa dos EUA) buscava uma comunicação militar e de pesquisa descentralizada e resiliente.</p>
            <br>
            <p><strong>Marcos Temporais:</strong></p>
            <ul>
                <li><strong>1960s:</strong> Criação da ARPANET;</li>
                <li><strong>1970s:</strong> Protocolos TCP/IP;</li>
                <li><strong>1980s:</strong> Expansão universitária;</li>
                <li><strong>1990s:</strong> Popularização comercial.</li>
            </ul>
        `
    },
    4: {
        title: "4. Infraestrutura da Internet",
        content: `
            <h3>Muito além do Wi-Fi</h3>
            <p>A internet depende de uma estrutura física pesada e real:</p>
            <ul>
                <li>Data centers e servidores;</li>
                <li>Cabos de fibra óptica e roteadores;</li>
                <li>Satélites de comunicação.</li>
            </ul>
            <br>
            <p>Quando você acessa um site, uma requisição física e elétrica percorre redes em milissegundos para buscar os dados no servidor de hospedagem.</p>
        `
    },
    5: {
        title: "5. Cabos Submarinos",
        content: `
            <h3>Conectando Continentes</h3>
            <p>Grande parte do tráfego global transita por <strong>cabos submarinos de fibra óptica</strong> que atravessam os oceanos.</p>
            <ul>
                <li>Percorrem milhares de quilômetros;</li>
                <li>Altíssima capacidade de dados;</li>
                <li>Oferecem maior velocidade e menor latência se comparados aos satélites.</li>
            </ul>
        `
    },
    6: {
        title: "6. O que é a Web",
        content: `
            <h3>World Wide Web (WWW)</h3>
            <p>A Web é um sistema que <strong>funciona sobre a internet</strong>, consistindo em documentos interligados por hiperlinks (textos, imagens, vídeos, áudios).</p>
            <br>
            <p>Ao navegar por sites, você está utilizando a Web hospedada e transmitida através da infraestrutura da Internet.</p>
        `
    },
    7: {
        title: "7. Como funciona a Web",
        content: `
            <h3>Arquitetura Cliente-Servidor</h3>
            <p>O funcionamento baseia-se em dois papéis principais:</p>
            <ul>
                <li><strong>Cliente:</strong> Seu dispositivo (PC/Celular) usando um navegador (Chrome, Edge, Safari);</li>
                <li><strong>Servidor:</strong> O computador que armazena o site.</li>
            </ul>
            <br>
            <p>O navegador envia uma requisição via protocolo <strong>HTTP</strong>, o servidor processa e devolve os dados para exibição.</p>
        `
    },
    8: {
        title: "8. O papel de Tim Berners-Lee",
        content: `
            <h3>O Criador da Web</h3>
            <p>No final dos anos 1980, no CERN, <strong>Tim Berners-Lee</strong> criou a Web para facilitar a troca de dados entre cientistas.</p>
            <br>
            <p><strong>As 3 tecnologias fundamentais criadas por ele:</strong></p>
            <ul>
                <li><strong>HTML:</strong> Linguagem de marcação;</li>
                <li><strong>HTTP:</strong> Protocolo de comunicação;</li>
                <li><strong>URL:</strong> Sistema de endereçamento.</li>
            </ul>
        `
    },
    9: {
        title: "9. Internet x Web",
        content: `
            <h3>Diferenças Fundamentais</h3>
            <p>Não confunda os termos:</p>
            <ul>
                <li><strong>Internet:</strong> É a infraestrutura global de rede que conecta os computadores (hardware/redes).</li>
                <li><strong>Web:</strong> É um dos serviços que rodam <em>sobre</em> a internet (sistema de páginas e documentos hiperligados).</li>
            </ul>
            <br>
            <p>Outros serviços da internet: E-mail, FTP, Streaming, Jogos online.</p>
        `
    },
    10: {
        title: "10. Conclusão",
        content: `
            <h3>Resumo Final da Aula</h3>
            <p>A evolução da internet aliada à criação da World Wide Web revolucionou o acesso à informação global.</p>
            <br>
            <p>Estes fundamentos são a base indispensável para quem deseja atuar em desenvolvimento web, engenharia de software e redes de computadores!</p>
        `
    }
};

// Função para abrir o modal com o conteúdo correspondente
function openModal(postId) {
    const modal = document.getElementById('postModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (conteudoResumo[postId]) {
        modalTitle.innerText = conteudoResumo[postId].title;
        modalBody.innerHTML = conteudoResumo[postId].content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Trava o scroll de fundo
    }
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura o scroll de fundo
}

// Fecha o modal ao clicar fora da caixa central
window.onclick = function(event) {
    const modal = document.getElementById('postModal');
    if (event.target === modal) {
        closeModal();
    }
};