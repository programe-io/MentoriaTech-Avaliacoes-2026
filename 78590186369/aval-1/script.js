// =========================================================
// 1. CONFIGURAÇÃO DO NOME DO(A) AUTOR(A) DO BLOG
// =========================================================
// Você pode digitar seu nome padrão abaixo entre as aspas:
const NOME_PADRAO = "SEU NOME AQUI";

document.addEventListener("DOMContentLoaded", () => {
    const elementoNomeTopo = document.querySelector(".nome-autor");
    const elementoNomeRodape = document.querySelector(".rodape strong");

    // Verifica se já existe um nome salvo no navegador
    let nomeSalvo = localStorage.getItem("nomeBruxoBlog") || NOME_PADRAO;

    function atualizarNomeNaTela(novoNome) {
        if (elementoNomeTopo) elementoNomeTopo.textContent = novoNome;
        if (elementoNomeRodape) elementoNomeRodape.textContent = novoNome;
    }

    atualizarNomeNaTela(nomeSalvo);

    // Permite clicar no nome no topo para editá-lo diretamente no navegador
    if (elementoNomeTopo) {
        elementoNomeTopo.style.cursor = "pointer";
        elementoNomeTopo.title = "Clique para alterar o seu nome";

        elementoNomeTopo.addEventListener("click", () => {
            const nomeDigitado = prompt("Digite o seu nome para o cabeçalho do blog:", elementoNomeTopo.textContent);
            if (nomeDigitado && nomeDigitado.trim() !== "") {
                const nomeLimpo = nomeDigitado.trim();
                localStorage.setItem("nomeBruxoBlog", nomeLimpo);
                atualizarNomeNaTela(nomeLimpo);
            }
        });
    }

    // =========================================================
    // 2. FILTRO DE POSTAGENS PELO MENU
    // =========================================================
    const linksMenu = document.querySelectorAll(".menu a");
    const postagens = document.querySelectorAll(".post-card");

    linksMenu.forEach(link => {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();
            const categoriaEscolhida = link.textContent.trim().toLowerCase();

            postagens.forEach(post => {
                const metaTexto = post.querySelector(".post-meta").textContent.toLowerCase();

                if (categoriaEscolhida === "início" || metaTexto.includes(categoriaEscolhida)) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });
        });
    });

    // =========================================================
    // 3. BOTÃO "CONTINUAR LENDO" (EXPANDIR / RECOLHER TEXTO)
    // =========================================================
    const botoesLerMais = document.querySelectorAll(".btn-ler-mais");

    botoesLerMais.forEach(botao => {
        const paragrafo = botao.previousElementSibling;
        const textoResumo = paragrafo.textContent;
        const textoCompleto = paragrafo.getAttribute("data-completo") || textoResumo + " Além disso, cada detalhe da trilha sonora de John Williams e a atuação do elenco tornaram essa cena um marco inesquecível para os fãs da saga nos cinemas.";
        let expandido = false;

        botao.addEventListener("click", (evento) => {
            evento.preventDefault();
            expandido = !expandido;

            if (expandido) {
                paragrafo.textContent = textoCompleto;
                botao.textContent = "Mostrar menos ↑";
            } else {
                paragrafo.textContent = textoResumo;
                botao.textContent = "Continuar lendo →";
            }
        });
    });

    // =========================================================
    // 4. FEITIÇO LUMOS / NOX (ALTERNAR TEMA CLARO / ESCURO)
    // =========================================================
    const barraLateral = document.querySelector(".widget");
    if (barraLateral) {
        const btnFeitico = document.createElement("button");
        btnFeitico.textContent = "🪄 Lançar Lumos (Modo Claro)";
        btnFeitico.style.cssText = `
            margin-top: 15px;
            width: 100%;
            padding: 10px;
            background-color: transparent;
            color: #d4af37;
            border: 1px solid #d4af37;
            border-radius: 5px;
            font-family: 'Cinzel', serif;
            cursor: pointer;
            font-weight: 600;
        `;

        let lumosAtivo = false;

        btnFeitico.addEventListener("click", () => {
            lumosAtivo = !lumosAtivo;
            if (lumosAtivo) {
                document.body.style.background = "#f4ecd8";
                document.body.style.color = "#2b2118";
                btnFeitico.textContent = "🌑 Lançar Nox (Modo Escuro)";
            } else {
                document.body.style.background = "";
                document.body.style.color = "";
                btnFeitico.textContent = "🪄 Lançar Lumos (Modo Claro)";
            }
        });

        barraLateral.appendChild(btnFeitico);
    }
});
