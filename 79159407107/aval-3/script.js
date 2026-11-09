// Base de dados estruturada do material teórico adaptado para o Instagram do Osmar
const postsData = {
    post1: {
        title: "1. Introdução à Internet",
        category: "INTRO",
        badgeColor: "#FF006E",
        content: `
            <p>A internet e a web estão tão presentes no quotidiano que muitas vezes as utilizamos sem realmente compreender a infraestrutura complexa por trás do miolo de pão.</p>
            <p>Todos os dias acedemos a sites, assistimos a vídeos e trocamos informações online.</p>
            <p><strong>Neste estudo veremos:</strong></p>
            <ul>
                <li>O que é a internet</li>
                <li>Como ela surgiu</li>
                <li>Como computadores comunicam</li>
                <li>Como a Web roda em cima da Net</li>
            </ul>
        `
    },
    post2: {
        title: "2. O que é a Internet?",
        category: "CONCEITO",
        badgeColor: "#3A86FF",
        content: `
            <p>A internet é um sistema global de redes de computadores interligadas por todo o planeta.</p>
            <p>Estas redes comunicam usando regras chamadas <strong>protocolos de comunicação</strong>, permitindo que telemóveis, PCs e servidores troquem pacotes de dados.</p>
            <p>Em suma, a internet é a autoestrada física de comunicação!</p>
        `
    },
    post3: {
        title: "3. História da Internet (ARPANET)",
        category: "HISTÓRIA",
        badgeColor: "#00F5D4",
        content: `
            <p>Tudo começou nos anos 1960 durante a Guerra Fria! O Departamento de Defesa dos EUA criou a <strong>ARPANET</strong>.</p>
            <p>O plano era ter uma rede de comunicação descentralizada: se uma parte explodisse, os dados podiam dar a volta por outros caminhos!</p>
            <ol>
                <li><strong>1970:</strong> Criados os protocolos TCP/IP.</li>
                <li><strong>1980:</strong> Chega às Universidades.</li>
                <li><strong>1990:</strong> Abre-se ao comércio mundial.</li>
            </ol>
        `
    },
    post4: {
        title: "4. Infraestrutura da Internet",
        category: "HARDWARE",
        badgeColor: "#FF9F1C",
        content: `
            <p>A internet não é uma nuvem mágica! Ela depende de infraestruturas físicas brutas:</p>
            <ul>
                <li>Data Centers gigantes</li>
                <li>Servidores ligados sem parar</li>
                <li>Roteadores e antenas</li>
                <li>Satélites orbitais</li>
            </ul>
            <p>Quando pedes um site, a requisição viaja, bate no servidor e regressa ao teu ecrã em escassos milissegundos.</p>
        `
    },
    post5: {
        title: "5. Cabos Submarinos",
        category: "OCEANO",
        badgeColor: "#8338EC",
        content: `
            <p>Esquece os satélites! Quase 99% do tráfego internacional de dados passa por <strong>cabos submarinos de fibra óptica</strong> estendidos no fundo do mar.</p>
            <p>Eles cruzam oceanos inteiros porque oferecem uma largura de banda monumental e uma latência infinitamente menor do que enviar dados para o espaço.</p>
        `
    },
    post6: {
        title: "6 & 7. O que é a Web (WWW)",
        category: "A TEIA",
        badgeColor: "#FF006E",
        content: `
            <p>A World Wide Web é um sistema de documentos de hipertexto (sites) que roda <strong>sobre</strong> a infraestrutura da internet.</p>
            <p>Funciona no modelo <strong>Cliente-Servidor</strong>:</p>
            <p>O teu navegador (Chrome, Safari) age como <em>Cliente</em> e pede dados. O <em>Servidor</em> processa e devolve os ficheiros via protocolo HTTP.</p>
        `
    },
    post7: {
        title: "8, 9 & 10. Internet vs Web",
        category: "VEREDICTO",
        badgeColor: "#3A86FF",
        content: `
            <p><strong>Não confundas:</strong></p>
            <p>• <strong>Internet:</strong> A infraestrutura de cabos e hardware (A ESTRADA).</p>
            <p>• <strong>Web:</strong> O sistema de páginas interligadas que acedes (OS CARROS).</p>
            <p>Serviços como e-mail, streaming direto da app e jogos online usam a internet, mas não pertencem à Web!</p>
        `
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Gestão de Abas da Aplicação (Grelha vs Feed Único)
    const btnGrid = document.getElementById("btnGrid");
    const btnList = document.getElementById("btnList");
    const gridContainer = document.getElementById("gridContainer");
    const detailContainer = document.getElementById("detailContainer");

    btnGrid.addEventListener("click", () => {
        btnGrid.classList.add("active");
        btnList.classList.remove("active");
        gridContainer.classList.add("active");
        detailContainer.classList.remove("active");
    });

    btnList.addEventListener("click", () => {
        btnList.classList.add("active");
        btnGrid.classList.remove("active");
        detailContainer.classList.add("active");
        gridContainer.classList.remove("active");
        
        // Renderizar dinamicamente o primeiro post na lista apenas para visualização
        renderizaListaCompleta();
    });

    // 2. Sistema de Pop-up Modal ao Clicar nas Fatias da Grelha ou Destaques
    const modal = document.getElementById("paoModal");
    const closeModal = document.getElementById("closeModal");
    const mBadge = document.getElementById("modalBadge");
    const mTitle = document.getElementById("modalTitle");
    const mBody = document.getElementById("modalBody");

    const tiles = document.querySelectorAll(".grid-tile, .highlight-item");
    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            // Identifica qual chave do objeto carregar baseado nos atributos inventados
            const postKey = tile.getAttribute("data-post") || tile.getAttribute("data-story");
            // Se clicou num destaque de story, faz o mapa correto
            const key = postKey.startsWith("post") ? postKey : mapeiaStoryParaPost(postKey);
            
            const data = postsData[key];
            if(data) {
                mBadge.textContent = data.category;
                mBadge.style.backgroundColor = data.badgeColor;
                mTitle.textContent = data.title;
                mBody.innerHTML = data.content;
                modal.classList.add("open");
            }
        });
    });

    closeModal.addEventListener("click", () => { modal.classList.remove("open"); });
    window.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("open"); });

    function mapeiaStoryParaPost(story) {
        if(story === "internet") return "post2";
        if(story === "historia") return "post3";
        if(story === "cabos") return "post5";
        return "post6";
    }

    // 3. Sistema de Botão de Coração Funcional (Efeito Visual)
    document.addEventListener("click", (e) => {
        if(e.target.classList.contains("insta-like-btn") || e.target.closest(".insta-like-btn")) {
            const btn = e.target.classList.contains("insta-like-btn") ? e.target : e.target.closest(".insta-like-btn");
            const span = btn.querySelector(".like-val");
            let num = parseInt(span.textContent, 10);
            num++;
            span.textContent = num;
            btn.style.transform = "scale(1.3)";
            setTimeout(() => btn.style.transform = "scale(1)", 150);
        }
    });

    // Constrói dinamicamente os posts em formato de feed corrido quando a aba correspondente é aberta
    function renderizaListaCompleta() {
        detailContainer.innerHTML = "";
        Object.keys(postsData).forEach(key => {
            const p = postsData[key];
            const art = document.createElement("article");
            art.className = "insta-card";
            art.innerHTML = `
                <div class="card-user"><div class="mini-avatar">🍞</div><strong>osmar.ultima.fatia</strong></div>
                <div class="card-graphic" style="background:${p.badgeColor}; color:${p.badgeColor === '#00F5D4' || p.badgeColor === '#FF9F1C' ? '#000': '#FFF'}">
                    <h4>${p.title}</h4>
                    <p class="subtitle">Sub-módulo: ${p.category}</p>
                </div>
                <div class="card-interactions">
                    <button class="insta-like-btn">❤️ <span class="like-val">88</span></button>
                    <span>💬 12</span>
                </div>
                <div class="card-caption">
                    <p><strong>osmar.ultima.fatia</strong> ${p.title} focado em ${p.category}. Lê o conteúdo completo tocando neste card na aba da grelha inicial!</p>
                </div>
            `;
            detailContainer.appendChild(art);
        });
    }
});
