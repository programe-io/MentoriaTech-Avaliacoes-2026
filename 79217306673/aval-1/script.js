/* =========================================================
   BANCO DE DADOS DAS RESENHAS (SIMULADO)
   Você pode adicionar novos artigos aqui facilmente!
   ========================================================= */
const artigosCompletos = [
    {
        titulo: "Invocação do Mal: A Atmosfera que Redefiniu o Terror Moderno",
        categoria: "Casas Assombradas",
        data: "12 de Novembro, 2026",
        nota: "★★★★★",
        conteudo: `
            <p>Lançado em 2013, <strong>Invocação do Mal</strong> (<em>The Conjuring</em>) resgatou o terror clássico de casas assombradas dos anos 1970, apostando na construção lenta de tensão em vez de depender exclusivamente de violência gráfica.</p>
            <br>
            <p><strong>O Uso da Câmera e do Silêncio:</strong> A direção de James Wan utiliza movimentos de câmera fluidos que percorrem a fazenda da família Perron, fazendo o espectador sentir que há sempre algo observando nos cantos escuros do quadro. A famosa cena das palmas no porão é uma aula de como o som — e a ausência dele — pode gerar pavor genuíno.</p>
            <br>
            <p><strong>Veredito:</strong> Um divisor de águas que originou um universo inteiro, mas que brilha justamente por sua simplicidade e pelo carisma de Vera Farmiga e Patrick Wilson.</p>
        `
    },
    {
        titulo: "Os Símbolos Ocultos e o Luto em \"Hereditário\"",
        categoria: "Folk Horror / Ocultismo",
        data: "04 de Novembro, 2026",
        nota: "★★★★★",
        conteudo: `
            <p>Em sua estreia na direção de longas, Ari Aster entrega em <strong>Hereditário</strong> (2018) uma experiência sufocante onde o verdadeiro horror nasce da dor familiar e da perda.</p>
            <br>
            <p><strong>Pistas à Vista de Todos:</strong> Desde os primeiros minutos, o filme espalha símbolos do demônio Paimon em postes, colares e anotações. As maquetes construídas por Annie (Toni Collette) funcionam como uma metáfora visual perfeita: os personagens são apenas peças presas em uma casa de bonecas controlada por forças maiores.</p>
            <br>
            <p><strong>Veredito:</strong> Uma obra-prima perturbadora que exige ser assistida mais de uma vez para capturar cada detalhe escondido nas sombras.</p>
        `
    },
    {
        titulo: "Por que \"O Exorcista\" (1973) Ainda Assusta Tanto?",
        categoria: "Possessão e Exorcismo",
        data: "28 de Outubro, 2026",
        nota: "★★★★★",
        conteudo: `
            <p>Mesmo após mais de 50 anos, <strong>O Exorcista</strong> permanece no topo das listas de filmes mais assustadores da história. O segredo de William Friedkin foi tratar o sobrenatural com a frieza de um documentário.</p>
            <br>
            <p><strong>O Choque entre Medicina e Fé:</strong> Antes de qualquer ritual religioso acontecer, o filme dedica quase uma hora mostrando exames médicos dolorosos e realistas na pequena Regan. Quando a ciência esgota todas as respostas, o terreno está preparado para o terror espiritual.</p>
            <br>
            <p><strong>Veredito:</strong> Atemporal, corajoso e profundamente humano na jornada de redenção do Padre Karras.</p>
        `
    }
];

/* =========================================================
   INICIALIZAÇÃO QUANDO A PÁGINA CARREGAR
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    criarBarraDeBusca();
    criarModalDeLeitura();
    configurarBotoesDeLeitura();
    configurarFiltroCategorias();
});

/* =========================================================
   1. BARRA DE BUSCA DINÂMICA NA SIDEBAR
   ========================================================= */
function criarBarraDeBusca() {
    const sidebar = document.querySelector("aside");
    if (!sidebar) return;

    const searchWidget = document.createElement("div");
    searchWidget.className = "sidebar-widget";
    searchWidget.innerHTML = `
        <h3>Buscar no Arquivo</h3>
        <input type="text" id="campo-busca" placeholder="Digite o nome do filme ou tema..." 
               style="width: 100%; padding: 0.7rem; background: #0b0b0e; border: 1px solid #262633; 
                      color: #e0e0e0; border-radius: 4px; outline: none;">
    `;

    // Insere a busca no topo da barra lateral
    sidebar.insertBefore(searchWidget, sidebar.firstChild);

    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", (e) => {
        const termo = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".post-card");

        cards.forEach(card => {
            const titulo = card.querySelector(".post-title").textContent.toLowerCase();
            const resumo = card.querySelector(".post-excerpt").textContent.toLowerCase();
            const meta = card.querySelector(".post-meta").textContent.toLowerCase();

            if (titulo.includes(termo) || resumo.includes(termo) || meta.includes(termo)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

/* =========================================================
   2. FILTRO POR SUBGÊNEROS (CATEGORIAS)
   ========================================================= */
function configurarFiltroCategorias() {
    const linksCategorias = document.querySelectorAll(".category-list a");
    const cards = document.querySelectorAll(".post-card");

    linksCategorias.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            // Remove a contagem ex: "Casas Assombradas (14)" -> "casas assombradas"
            const categoriaSelecionada = link.textContent.replace(/\(\d+\)/, "").trim().toLowerCase();

            // Destaca o link ativo
            linksCategorias.forEach(l => l.style.color = "");
            link.style.color = "#c41626";

            cards.forEach((card, index) => {
                const artigo = artigosCompletos[index];
                if (artigo && artigo.categoria.toLowerCase().includes(categoriaSelecionada)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            mostrarBotaoLimparFiltro();
        });
    });
}

function mostrarBotaoLimparFiltro() {
    if (document.getElementById("btn-limpar-filtro")) return;

    const main = document.querySelector("main");
    const btnLimpar = document.createElement("button");
    btnLimpar.id = "btn-limpar-filtro";
    btnLimpar.textContent = "✕ Mostrar todos os artigos";
    btnLimpar.style.cssText = `
        background: #262633; color: #fff; border: none; padding: 0.6rem 1rem;
        border-radius: 4px; cursor: pointer; margin-bottom: 1.5rem; font-weight: bold;
    `;

    btnLimpar.addEventListener("click", () => {
        document.querySelectorAll(".post-card").forEach(c => c.style.display = "block");
        document.querySelectorAll(".category-list a").forEach(l => l.style.color = "");
        btnLimpar.remove();
    });

    main.insertBefore(btnLimpar, main.firstChild);
}

/* =========================================================
   3. MODAL PARA LEITURA COMPLETA E COMENTÁRIOS
   ========================================================= */
function criarModalDeLeitura() {
    const modal = document.createElement("div");
    modal.id = "modal-artigo";
    modal.style.cssText = `
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.88); z-index: 1000; overflow-y: auto; padding: 2rem 1rem;
    `;

    modal.innerHTML = `
        <div style="max-width: 750px; margin: 0 auto; background: #15151c; border: 1px solid #262633; 
                    border-radius: 8px; padding: 2.2rem; position: relative; color: #e0e0e0;">
            <button id="fechar-modal" style="position: absolute; top: 1.2rem; right: 1.5rem; background: none; 
                    border: none; color: #9a9aa6; font-size: 1.8rem; cursor: pointer;">&times;</button>
            
            <div id="modal-meta" style="color: #9b111e; font-weight: bold; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem;"></div>
            <h2 id="modal-titulo" style="font-family: Georgia, serif; font-size: 1.9rem; color: #fff; margin-bottom: 1.5rem;"></h2>
            <div id="modal-corpo" style="color: #d0d0d8; line-height: 1.8; font-size: 1.05rem; border-bottom: 1px solid #262633; padding-bottom: 2rem;"></div>

            <!-- Seção de Comentários -->
            <div style="margin-top: 2rem;">
                <h3 style="font-family: Georgia, serif; margin-bottom: 1rem; font-size: 1.3rem;">Deixe sua Teoria ou Comentário</h3>
                <form id="form-comentario" style="display: flex; flex-direction: column; gap: 0.8rem;">
                    <input type="text" id="comentario-nome" placeholder="Seu nome ou apelido" required
                           style="padding: 0.7rem; background: #0b0b0e; border: 1px solid #262633; color: #fff; border-radius: 4px;">
                    <textarea id="comentario-texto" rows="3" placeholder="O que você achou deste filme?" required
                              style="padding: 0.7rem; background: #0b0b0e; border: 1px solid #262633; color: #fff; border-radius: 4px;"></textarea>
                    <button type="submit" class="btn-read" style="border: none; cursor: pointer; align-self: flex-start;">Publicar Comentário</button>
                </form>
                <div id="lista-comentarios" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Fechar no botão X ou clicando fora da caixa
    document.getElementById("fechar-modal").addEventListener("click", () => modal.style.display = "none");
