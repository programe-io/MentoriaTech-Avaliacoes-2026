
document.addEventListener("DOMContentLoaded", () => {
    const $ = (seletor, contexto = document) =>
        contexto.querySelector(seletor);

    const $$ = (seletor, contexto = document) =>
        [...contexto.querySelectorAll(seletor)];

    // ========================================
    // 1. ANO AUTOMÁTICO
    // ========================================
    $("#anoRodape").textContent =
        `© ${new Date().getFullYear()} Meu Blog`;

    // ========================================
    // 2. MENU RESPONSIVO
    // ========================================
    const menuToggle = $("#menuToggle");
    const menuPrincipal = $("#menuPrincipal");

    function fecharMenu() {
        menuPrincipal.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }

    menuToggle.addEventListener("click", () => {
        const aberto = menuPrincipal.classList.toggle("aberto");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    $$("#menuPrincipal a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    // ========================================
    // 3. MODO CLARO E ESCURO
    // ========================================
    const temaToggle = $("#temaToggle");

    function aplicarTema(tema) {
        const claro = tema === "claro";

        document.body.classList.toggle("tema-claro", claro);
        temaToggle.textContent = claro ? "☾" : "☀";
        temaToggle.setAttribute(
            "aria-label",
            claro ? "Ativar modo escuro" : "Ativar modo claro"
        );

        const metaTema = $('meta[name="theme-color"]');

        if (metaTema) {
            metaTema.content = claro ? "#f7f6fc" : "#0b0b10";
        }
    }

    let temaSalvo = null;

    try {
        temaSalvo = localStorage.getItem("meublog-tema");
    } catch (erro) {
        // O site continua funcionando sem armazenamento.
    }

    aplicarTema(temaSalvo === "claro" ? "claro" : "escuro");

    temaToggle.addEventListener("click", () => {
        const novoTema = document.body.classList.contains("tema-claro")
            ? "escuro"
            : "claro";

        aplicarTema(novoTema);

        try {
            localStorage.setItem("meublog-tema", novoTema);
        } catch (erro) {
            // O tema continua ativo durante esta visita.
        }
    });

    // ========================================
    // 4. PESQUISA E FILTROS
    // ========================================
    const pesquisa = $("#pesquisaArtigos");
    const botoesFiltro = $$(".filtro");
    const artigos = $$(".post");
    const grade = $("#gradeArtigos");
    const contador = $("#contadorArtigos");
    const totalHero = $("#totalArtigos");
    const resultadoPesquisa = $("#resultadoPesquisa");
    const semResultados = $("#semResultados");

    let categoriaAtual = "todos";

    totalHero.textContent = String(artigos.length).padStart(2, "0");

    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function atualizarArtigos() {
        const termo = normalizar(pesquisa.value);
        let quantidade = 0;

        artigos.forEach((artigo) => {
            const categoria = artigo.dataset.categoria;
            const texto = normalizar(artigo.textContent);

            const correspondeCategoria =
                categoriaAtual === "todos" ||
                categoria === categoriaAtual;

            const correspondePesquisa = texto.includes(termo);
            const visivel = correspondeCategoria && correspondePesquisa;

            artigo.hidden = !visivel;

            if (visivel) {
                quantidade++;
            }
        });

        contador.textContent =
            `${String(quantidade).padStart(2, "0")} ` +
            (quantidade === 1 ? "PUBLICAÇÃO" : "PUBLICAÇÕES");

        resultadoPesquisa.textContent = termo
            ? `${quantidade} resultado(s) para "${pesquisa.value.trim()}"`
            : "";

        semResultados.hidden = quantidade !== 0;
        grade.hidden = quantidade === 0;
    }

    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            categoriaAtual = botao.dataset.categoria;

            botoesFiltro.forEach((outro) => {
                const ativo = outro === botao;

                outro.classList.toggle("ativo", ativo);
                outro.setAttribute("aria-pressed", String(ativo));
            });

            atualizarArtigos();
        });
    });

    pesquisa.addEventListener("input", atualizarArtigos);

    $("#limparPesquisa").addEventListener("click", () => {
        pesquisa.value = "";
        categoriaAtual = "todos";

        botoesFiltro.forEach((botao) => {
            const ativo = botao.dataset.categoria === "todos";

            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", String(ativo));
        });

        atualizarArtigos();
        pesquisa.focus();
    });

    // Atalho "/" para abrir a pesquisa.
    document.addEventListener("keydown", (evento) => {
        const elemento = evento.target;
        const digitando =
            elemento instanceof HTMLInputElement ||
            elemento instanceof HTMLTextAreaElement ||
            elemento.isContentEditable;

        if (
            evento.key === "/" &&
            !digitando &&
            !evento.ctrlKey &&
            !evento.metaKey &&
            !evento.altKey
        ) {
            evento.preventDefault();
            pesquisa.focus();
        }
    });

    atualizarArtigos();

    // ========================================
    // 5. CONTEÚDO DOS ARTIGOS
    // ========================================
    const conteudos = {
        html: {
            titulo: "Os primeiros passos no HTML",
            categoria: "DESENVOLVIMENTO",
            paragrafos: [
                "HTML é a linguagem de marcação utilizada para organizar o conteúdo de páginas web. Com ela, você define títulos, parágrafos, links, imagens e muito mais.",
                "Uma página começa com uma estrutura básica. As tags indicam ao navegador a função de cada elemento."
            ],
            subtitulo: "Seu primeiro exemplo",
            codigo:
`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha página</title>
</head>
<body>
    <h1>Olá, mundo!</h1>
    <p>Minha primeira página web.</p>
</body>
</html>`,
            final:
                "Experimente alterar o título e o texto. Depois, adicione outros parágrafos e links para conhecer melhor o HTML."
        },

        css: {
            titulo: "CSS: dando estilo à web",
            categoria: "DESIGN WEB",
            paragrafos: [
                "CSS é a linguagem que controla a apresentação visual das páginas. Com ela, você pode alterar cores, fontes, espaçamentos, bordas e a disposição dos elementos.",
                "Uma das melhores práticas é separar os estilos do HTML em um arquivo chamado style.css."
            ],
            subtitulo: "Personalizando um elemento",
            codigo:
`body {
    background: #0b0b10;
    color: #f5f3ff;
    font-family: sans-serif;
}

h1 {
    color: #a78bfa;
    font-size: 36px;
}`,
            final:
                "Teste novas cores e tamanhos. Use também media queries para adaptar o visual a celulares e tablets."
        },

        flexbox: {
            titulo: "Flexbox sem complicação",
            categoria: "LAYOUT",
            paragrafos: [
                "Flexbox é um sistema de layout CSS que facilita o alinhamento e a distribuição de elementos dentro de um contêiner.",
                "Ele é especialmente útil para menus, barras de navegação, cartões e grupos de botões que precisam se adaptar a diferentes espaços."
            ],
            subtitulo: "Organizando elementos",
            codigo:
`.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}`,
            final:
                "Experimente trocar space-between por center ou flex-start. Observe como o alinhamento muda."
        }
    };

    const modal = $("#modalArtigo");
    const conteudoModal = $("#conteudoModal");
    const fecharModal = $("#fecharModal");

    function adicionarTexto(tag, texto, pai) {
        const elemento = document.createElement(tag);
        elemento.textContent = texto;
        pai.appendChild(elemento);
        return elemento;
    }

    function abrirArtigo(chave) {
        const artigo = conteudos[chave];

        if (!artigo) return;

        conteudoModal.replaceChildren();

        adicionarTexto("span", artigo.categoria, conteudoModal);
        adicionarTexto("h2", artigo.titulo, conteudoModal);

        artigo.paragrafos.forEach((paragrafo) => {
            adicionarTexto("p", paragrafo, conteudoModal);
        });

        adicionarTexto("h3", artigo.subtitulo, conteudoModal);

        const codigo = document.createElement("pre");
        const codigoTexto = document.createElement("code");

        codigoTexto.textContent = artigo.codigo;
        codigo.appendChild(codigoTexto);
        conteudoModal.appendChild(codigo);

        adicionarTexto("p", artigo.final, conteudoModal);

        if (typeof modal.showModal === "function") {
            modal.showModal();
        } else {
            notificar("Seu navegador não oferece suporte a esta janela.");
        }
    }

    $$(".abrir-artigo").forEach((botao) => {
        botao.addEventListener("click", () => {
            abrirArtigo(botao.dataset.artigo);
        });
    });

    fecharModal.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.close();
        }
    });

    // ========================================
    // 6. NOTIFICAÇÕES
    // ========================================
    const notificacao = $("#notificacao");
    let temporizadorNotificacao;

    function notificar(mensagem) {
        notificacao.textContent = mensagem;
        notificacao.classList.add("visivel");

        clearTimeout(temporizadorNotificacao);

        temporizadorNotificacao = setTimeout(() => {
            notificacao.classList.remove("visivel");
        }, 2800);
    }

    // ========================================
    // 7. ANIMAÇÕES AO ROLAR A PÁGINA
    // ========================================
    const elementosAnimados = $$(".post, .sobre, .contato");

    if ("IntersectionObserver" in window) {
        const observadorAnimacao = new IntersectionObserver(
            (entradas, observador) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visivel");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("animar");
            observadorAnimacao.observe(elemento);
        });
    }

    // ========================================
    // 8. BOTÃO VOLTAR AO TOPO
    // ========================================
    const botaoTopo = document.createElement("button");

    botaoTopo.type = "button";
    botaoTopo.className = "voltar-topo";
    botaoTopo.textContent = "↑";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    botaoTopo.hidden = true;

    document.body.appendChild(botaoTopo);

    window.addEventListener("scroll", () => {
        botaoTopo.hidden = window.scrollY < 400;
    }, { passive: true });

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ========================================
    // 9. MENU ATIVO CONFORME A SEÇÃO
    // ========================================
    const linksMenu = $$("#menuPrincipal a");
    const secoes = $$("#inicio, #artigos, #sobre, #contato");

    if ("IntersectionObserver" in window) {
        const observadorMenu = new IntersectionObserver(
            (entradas) => {
                const visiveis = entradas
                    .filter((entrada) => entrada.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (!visiveis.length) return;

                const idAtual = visiveis[0].target.id;

                linksMenu.forEach((link) => {
                    const ativo =
                        link.getAttribute("href") === `#${idAtual}`;

                    link.classList.toggle("ativo", ativo);

                    if (ativo) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            },
            {
                rootMargin: "-15% 0px -60% 0px",
                threshold: [0, 0.2, 0.5]
            }
        );

        secoes.forEach((secao) => observadorMenu.observe(secao));
    }

    console.log("Meu Blog carregado com sucesso!");
});
