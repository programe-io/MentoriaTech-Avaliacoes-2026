/* =========================================================
   INDEX.JS - INTERATIVIDADE DO BLOG MORFANDO NO CINEMA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    configurarBotoesLerMais();
    configurarCurtidas();
    configurarFiltroMenu();
    criarFormularioNovoPost();
});

/* =========================================================
   1. EXPANDIR TEXTO COMPLETO ("CONTINUAR LENDO")
   ========================================================= */
function configurarBotoesLerMais() {
    // Textos completos extras para cada postagem existente
    const textosCompletos = [
        "Reassistir ao primeiro filme nos cinemas da época foi uma experiência mágica. Ivan Ooze continua sendo um dos vilões mais carismáticos e divertidos da franquia, e a trilha sonora com Van Halen na cena final de paraquedas é simplesmente inesquecível. Além disso, os novos trajes metálicos com armaduras reforçadas e os Zords em CGI — mesmo datados hoje em dia — marcaram toda uma geração de fãs nos anos 90.",
        "Muitos fãs dividem opiniões sobre o visual das armaduras e dos Zords no filme de 2017, mas o desenvolvimento dos personagens principais foi um dos pontos mais fortes. O filme dedicou tempo real para mostrar os conflitos pessoais de Jason, Kimberly, Billy, Trini e Zack antes mesmo de ganharem seus poderes. A cena pós-créditos deixando o gancho para o Tommy Oliver ainda dói no coração de quem queria ver a continuação.",
        "Diferente do filme de 1995, Turbo faz parte oficial da cronologia da série de TV. Vamos relembrar como foi a despedida dos antigos poderes Zeo, a entrada do jovem Justin como o novo Ranger Azul e a chegada da pirata espacial Divatox, preparando o terreno para toda a quinta temporada da série."
    ];

    const botoes = document.querySelectorAll(".btn-ler-mais");

    botoes.forEach((botao, index) => {
        const paragrafo = botao.previousElementSibling;
        const textoResumido = paragrafo.textContent;
        let expandido = false;

        botao.addEventListener("click", (evento) => {
            evento.preventDefault();

            if (!expandido) {
                // Mostra o texto completo (ou repete o resumo se for um post novo)
                paragrafo.textContent = textosCompletos[index] || textoResumido + " (Análise completa em breve!)";
                botao.textContent = "Mostrar menos";
                expandido = true;
            } else {
                // Volta para o texto resumido
                paragrafo.textContent = textoResumido;
                botao.textContent = "Continuar lendo";
                expandido = false;
            }
        });
    });
}

/* =========================================================
   2. SISTEMA DE CURTIDAS ("⚡ MORFAR") EM CADA POST
   ========================================================= */
function configurarCurtidas() {
    const conteudosPosts = document.querySelectorAll(".post-content");

    conteudosPosts.forEach((conteudo) => {
        let curtidas = Math.floor(Math.random() * 15) + 1; // Número inicial aleatório
        let jaCurtiu = false;

        const btnCurtir = document.createElement("button");
        btnCurtir.textContent = `⚡ Morfar (${curtidas})`;
        
        // Estilo inline para combinar com o CSS existente
        btnCurtir.style.marginLeft = "12px";
        btnCurtir.style.padding = "10px 16px";
        btnCurtir.style.backgroundColor = "#2a2a2a";
        btnCurtir.style.color = "#fbc02d";
        btnCurtir.style.border = "1px solid #fbc02d";
        btnCurtir.style.borderRadius = "4px";
        btnCurtir.style.fontWeight = "bold";
        btnCurtir.style.cursor = "pointer";
        btnCurtir.style.transition = "0.3s";

        btnCurtir.addEventListener("click", () => {
            if (!jaCurtiu) {
                curtidas++;
                jaCurtiu = true;
                btnCurtir.style.backgroundColor = "#fbc02d";
                btnCurtir.style.color = "#121212";
            } else {
                curtidas--;
                jaCurtiu = false;
                btnCurtir.style.backgroundColor = "#2a2a2a";
                btnCurtir.style.color = "#fbc02d";
            }
            btnCurtir.textContent = `⚡ Morfar (${curtidas})`;
        });

        conteudo.appendChild(btnCurtir);
    });
}

/* =========================================================
   3. FILTRO DE POSTAGENS PELO MENU SUPERIOR
   ========================================================= */
function configurarFiltroMenu() {
    const linksMenu = document.querySelectorAll("nav a");
    const cards = document.querySelectorAll(".post-card");

    linksMenu.forEach((link) => {
        link.addEventListener("click", (evento) => {
            const href = link.getAttribute("href");
            
            // Ignora o link "Sobre Mim" para ele rolar normalmente até a barra lateral
            if (href === "#sobre") return;

            evento.preventDefault();
            const termoFiltro = link.textContent.trim().toLowerCase();

            cards.forEach((card) => {
                const meta = card.querySelector(".post-meta").textContent.toLowerCase();

                if (termoFiltro === "início" || meta.includes(termoFiltro.slice(0, 5))) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* =========================================================
   4. ESPAÇO PARA PUBLICAR NOVO POST NO BLOG
   ========================================================= */
function criarFormularioNovoPost() {
    const postsArea = document.querySelector(".posts-area");
    if (!postsArea) return;

    const caixaForm = document.createElement("section");
    caixaForm.className = "widget";
    caixaForm.style.borderLeft = "6px solid #388e3c"; // Borda Verde Ranger

    caixaForm.innerHTML = `
        <h3>✍️ Escrever Nova Postagem no Blog</h3>
        <form id="form-novo-post" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="text" id="novo-titulo" placeholder="Título do post (ex: Especial 30 Anos na Netflix)" required 
                style="padding: 10px; border-radius: 4px; border: 1px solid #444; background: #121212; color: #fff;">
            
            <div style="display: flex; gap: 10px;">
                <select id="nova-categoria" style="flex: 1; padding: 10px; border-radius: 4px; border: 1px solid #444; background: #121212; color: #fff;">
                    <option value="Críticas">Categoria: Críticas</option>
                    <option value="Clássicos">Categoria: Clássicos</option>
                    <option value="Curiosidades">Categoria: Curiosidades</option>
                </select>

                <select id="nova-cor" style="flex: 1; padding: 10px; border-radius: 4px; border: 1px solid #444; background: #121212; color: #fff;">
                    <option value="">Cor da Borda: Vermelho</option>
                    <option value="azul">Cor da Borda: Azul</option>
                    <option value="amarelo">Cor da Borda: Amarelo</option>
                    <option value="verde">Cor da Borda: Verde</option>
                    <option value="rosa">Cor da Borda: Rosa</option>
                </select>
            </div>

            <textarea id="novo-texto" rows="4" placeholder="Escreva sua opinião sobre o filme aqui..." required 
                style="padding: 10px; border-radius: 4px; border: 1px solid #444; background: #121212; color: #fff; resize: vertical;"></textarea>

            <button type="submit" class="btn-ler-mais" style="border: none; cursor: pointer; align-self: flex-start;">
                Publicar no Blog
            </button>
        </form>
    `;

    // Insere o formulário no topo da área de postagens
    postsArea.prepend(caixaForm);

    // Evento de envio do formulário
    const form = document.getElementById("form-novo-post");
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const titulo = document.getElementById("novo-titulo").value;
        const categoria = document.getElementById("nova-categoria").value;
        const cor = document.getElementById("nova-cor").value;
        const texto = document.getElementById("novo-texto").value;

        const dataHoje = new Date().toLocaleDateString("pt-BR", {
            day: "2-digit", month: "long", year: "numeric"
        });

        const novoCard = document.createElement("article");
        novoCard.className = `post-card ${cor}`;
        novoCard.innerHTML = `
            <div class="post-image">[Nova Imagem do Filme]</div>
            <div class="post-content">
                <div class="post-meta">Publicado em ${dataHoje} • Categoria: ${categoria}</div>
                <h2 class="post-title">${titulo}</h2>
                <p class="post-text">${texto}</p>
                <a href="#" class="btn-ler-mais">Continuar lendo</a>
            </div>
        `;

        // Adiciona o novo post logo abaixo do formulário
        caixaForm.after(novoCard);
        form.reset();
    });
}
