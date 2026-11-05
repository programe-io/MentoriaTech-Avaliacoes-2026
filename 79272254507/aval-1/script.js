/**
 * Blog Tecnológico Dinâmico: Edge Computing & Redes de Próxima Geração
 * Arquitetura: Vanilla JavaScript estruturado orientando dados para a View
 */

// 1. Repositório de Dados do Artigo (Simula um payload de API/Servidor)
const blogData = {
    meta: {
        category: "Infraestrutura & Redes",
        date: "Novembro de 2026",
        author: "TechEdge Labs",
        avatarInitials: "TL"
    },
    title: "Além da Nuvem: Como o Edge Computing está Redefinindo a Arquitetura da Internet",
    content: [
        {
            type: "paragraph",
            text: "Desde os primórdios da ARPANET na década de 1960 até a popularização da Web por Tim Berners-Lee, a comunicação de dados sempre seguiu uma lógica centralizada: o cliente faz uma requisição HTTP, essa solicitação viaja milhares de quilômetros por cabos submarinos e roteadores, e o servidor responde."
        },
        {
            type: "paragraph",
            text: "No entanto, na era da Inteligência Artificial em tempo real, dos carros autônomos e da automação industrial sob redes 5G e 6G, os milissegundos que os dados levam para ir até um Data Center centralizado geram uma latência inaceitável. É aqui que entra o Edge Computing (Computação de Borda)."
        },
        {
            type: "heading",
            text: "O que é Edge Computing?"
        },
        {
            type: "paragraph",
            text: "Em vez de enviar todo o tráfego de dados para servidores localizados em outros continentes, o processamento acontece na 'borda' da rede — isto é, o mais próximo fisicamente possível do dispositivo cliente (como em antenas de celular locais, roteadores corporativos ou pequenos servidores regionais)."
        },
        {
            type: "callout",
            title: "Internet vs. Web no Contexto do Edge",
            text: "A distinção fundamental continua viva: a Internet é a infraestrutura física que conecta tudo. O Edge Computing altera a física dessa infraestrutura, aproximando os servidores dos clientes. Com isso, os protocolos da Web (como o HTTP) operam de forma absurdamente mais veloz, pois a distância física que os dados precisam percorrer cai de milhares de quilômetros para poucos metros."
        },
        {
            type: "heading",
            text: "Impactos na Infraestrutura Global"
        },
        {
            type: "list",
            items: [
                "Menos sobrecarga nos cabos submarinos transatlânticos.",
                "Redução drástica do consumo de energia nos grandes Data Centers centrais.",
                "Velocidade de resposta quase instantânea para aplicações críticas.",
                "Maior privacidade, mantendo dados sensíveis processados localmente."
            ]
        },
        {
            type: "paragraph",
            text: "Compreender como a infraestrutura física e a arquitetura cliente-servidor evoluem é o pilar central para qualquer profissional de tecnologia que deseja construir sistemas escaláveis, eficientes e preparados para a próxima década."
        }
    ]
};

// 2. Mecanismo de Renderização e Criação do DOM via JS
function renderBlog() {
    // Configuração do Container Principal do Documento
    document.documentElement.lang = "pt-BR";
    document.title = `${blogData.title} | TechEdge`;

    // Injeção de Estilos CSS Dinâmicos
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --bg: #0b0f19;
            --surface: #151f32;
            --primary: #38bdf8;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border: #22314d;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui, -apple-system, sans-serif; background-color: var(--bg); color: var(--text-main); line-height: 1.7; padding: 2rem 1rem; }
        .container { max-width: 700px; margin: 0 auto; background: var(--surface); padding: 2.5rem; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); }
        .meta { font-size: 0.8rem; text-transform: uppercase; color: var(--primary); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        h1 { font-size: 2.25rem; line-height: 1.2; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
        .author-box { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; font-size: 0.9rem; color: var(--text-muted); padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
        .avatar { width: 36px; height: 36px; background: var(--primary); color: var(--bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        p { margin-bottom: 1.5rem; font-size: 1.05rem; opacity: 0.95; }
        h2 { font-size: 1.5rem; margin: 2rem 0 1rem; color: var(--primary); }
        ul { margin-bottom: 1.5rem; padding-left: 1.25rem; }
        li { margin-bottom: 0.5rem; color: var(--text-main); }
        .callout { background: rgba(56, 189, 248, 0.05); border-left: 4px solid var(--primary); padding: 1.25rem; margin: 2rem 0; border-radius: 0 8px 8px 0; }
        .callout h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--primary); }
        footer { text-align: center; margin-top: 3rem; font-size: 0.8rem; color: var(--text-muted); }
    `;
    document.head.appendChild(style);

    // Criação dos Elementos Estruturais
    const wrapper = document.createElement('div');
    wrapper.className = 'container';

    // Header do Artigo
    const categoryEl = document.createElement('div');
    categoryEl.className = 'meta';
    categoryEl.textContent = blogData.meta.category;

    const titleEl = document.createElement('h1');
    titleEl.textContent = blogData.title;

    // Caixa do Autor
    const authorBox = document.createElement('div');
    authorBox.className = 'author-box';
    authorBox.innerHTML = `
        <div class="avatar">${blogData.meta.avatarInitials}</div>
        <div>Por <strong>${blogData.meta.author}</strong> &bull; <span>${blogData.meta.date}</span></div>
    `;

    wrapper.appendChild(categoryEl);
    wrapper.appendChild(titleEl);
    wrapper.appendChild(authorBox);

    // Corpo do Artigo - Loop processador de blocos de conteúdo
    const contentBody = document.createElement('div');
    
    blogData.content.forEach(block => {
        if (block.type === 'paragraph') {
            const p = document.createElement('p');
            p.textContent = block.text;
            contentBody.appendChild(p);
        } 
        else if (block.type === 'heading') {
            const h2 = document.createElement('h2');
            h2.textContent = block.text;
            contentBody.appendChild(h2);
        } 
        else if (block.type === 'callout') {
            const callout = document.createElement('div');
            callout.className = 'callout';
            callout.innerHTML = `<h3>${block.title}</h3><p>${block.text}</p>`;
            contentBody.appendChild(callout);
        } 
        else if (block.type === 'list') {
            const ul = document.createElement('ul');
            block.items.forEach(itemText => {
                const li = document.createElement('li');
                li.textContent = itemText;
                ul.appendChild(li);
            });
            contentBody.appendChild(ul);
        }
    });

    wrapper.appendChild(contentBody);

    // Rodapé
    const footer = document.createElement('footer');
    footer.innerHTML = `&copy; 2026 TechEdge Blog. Gerado via JavaScript dinâmico estruturado.`;
    wrapper.appendChild(footer);

    // Injeta tudo no Body da página
    document.body.appendChild(wrapper);
}

// 3. Inicialização automática assim que o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBlog);
} else {
    renderBlog();
}
