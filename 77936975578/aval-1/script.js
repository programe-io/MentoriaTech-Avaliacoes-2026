
/* ==========================
   1. MODO ESCURO
========================== */

const botaoTema = document.createElement("button");

botaoTema.textContent = "🌙 Modo escuro";
botaoTema.id = "botao-tema";

botaoTema.style.cssText = `
    padding: 10px 15px;
    margin: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #61dafb;
    color: #172b4d;
    font-weight: bold;
`;

document.querySelector("header").appendChild(botaoTema);

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-escuro");

    const escuro = document.body.classList.contains("modo-escuro");

    botaoTema.textContent = escuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
});


/* ==========================
   2. PESQUISA DE ARTIGOS
========================== */

const campoPesquisa = document.createElement("input");

campoPesquisa.type = "text";
campoPesquisa.placeholder = "Pesquisar artigos...";
campoPesquisa.id = "pesquisa";

campoPesquisa.style.cssText = `
    display: block;
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
`;

const secaoArtigos = document.querySelector("#artigos");
secaoArtigos.insertBefore(
    campoPesquisa,
    secaoArtigos.querySelector(".artigos")
);

campoPesquisa.addEventListener("input", () => {
    const pesquisa = campoPesquisa.value.toLowerCase();

    document.querySelectorAll(".artigo").forEach(artigo => {
        const conteudo = artigo.textContent.toLowerCase();

        artigo.style.display = conteudo.includes(pesquisa)
            ? ""
            : "none";
    });
});


/* ==========================
   3. BOTÃO VOLTAR AO TOPO
========================== */

const botaoTopo = document.createElement("button");

botaoTopo.textContent = "↑";
botaoTopo.title = "Voltar ao topo";

botaoTopo.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background: #1769aa;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
`;

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {
    botaoTopo.style.display =
        window.scrollY > 300 ? "block" : "none";
});

botaoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ==========================
   4. ANO AUTOMÁTICO NO RODAPÉ
========================== */

const textoRodape = document.querySelector("footer p");

if (textoRodape) {
    textoRodape.textContent =
        `© ${new Date().getFullYear()} Meu Blog. Todos os direitos reservados.`;
}


/* ==========================
   5. ANIMAÇÃO DOS ARTIGOS
========================== */

document.querySelectorAll(".artigo").forEach((artigo, indice) => {
    artigo.style.opacity = "0";

    artigo.animate(
        [
            {
                opacity: 0,
                transform: "translateY(20px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 500,
            delay: indice * 150,
            fill: "forwards"
        }
    );
});
