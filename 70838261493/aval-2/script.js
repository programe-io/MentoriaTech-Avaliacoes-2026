
/* =========================================
   HALA MADRID - JAVASCRIPT
   HISTÓRIA DO REAL MADRID
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("👑 HALA MADRID carregado!");

    // =====================================
    // 1. NAVEGAÇÃO
    // =====================================

    const linksMenu = document.querySelectorAll("nav a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            linksMenu.forEach(item => {
                item.classList.remove("selecionado");
            });

            link.classList.add("selecionado");

        });

    });


    // =====================================
    // 2. ANO AUTOMÁTICO
    // =====================================

    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    // =====================================
    // 3. SISTEMA DE FAVORITOS
    // =====================================

    const jogadores = document.querySelectorAll(".card");

    let favoritos = [];

    try {

        favoritos = JSON.parse(
            localStorage.getItem("halaMadridFavoritos") || "[]"
        );

        if (!Array.isArray(favoritos)) {
            favoritos = [];
        }

    } catch (erro) {

        favoritos = [];

    }


    function salvarFavoritos() {

        localStorage.setItem(
            "halaMadridFavoritos",
            JSON.stringify(favoritos)
        );

    }


    jogadores.forEach(card => {

        const nomeElemento = card.querySelector("h3");

        if (!nomeElemento) return;

        const nome = nomeElemento.textContent.trim();

        const botao = document.createElement("button");

        botao.className = "favorito";

        function atualizarBotao() {

            const estaFavoritado = favoritos.includes(nome);

            botao.textContent = estaFavoritado
                ? "❤️ Favoritado"
                : "♡ Adicionar aos favoritos";

            botao.setAttribute(
                "aria-pressed",
                String(estaFavoritado)
            );

        }

        atualizarBotao();

        botao.addEventListener("click", () => {

            if (favoritos.includes(nome)) {

                favoritos = favoritos.filter(
                    jogador => jogador !== nome
                );

            } else {

                favoritos.push(nome);

            }

            salvarFavoritos();

            atualizarBotao();

        });

        card.appendChild(botao);

    });


    // =====================================
    // 4. PESQUISA DE JOGADORES
    // =====================================

    const areaJogadores = document.querySelector(".jogadores");

    if (areaJogadores) {

        const titulo = areaJogadores.querySelector(".titulo");

        const pesquisa = document.createElement("input");

        pesquisa.type = "search";

        pesquisa.placeholder = "🔎 Pesquisar jogador...";

        pesquisa.className = "pesquisa-jogador";

        pesquisa.setAttribute(
            "aria-label",
            "Pesquisar jogadores"
        );

        titulo.insertAdjacentElement(
            "afterend",
            pesquisa
        );


        pesquisa.addEventListener("input", () => {

            const termo = pesquisa.value
                .toLowerCase()
                .trim();

            jogadores.forEach(card => {

                const nome = card.querySelector("h3")
                    ?.textContent.toLowerCase() || "";

                const informacoes = card.querySelector(".card-info")
                    ?.textContent.toLowerCase() || "";

                const encontrado =
                    nome.includes(termo) ||
                    informacoes.includes(termo);

                card.style.display = encontrado ? "" : "none";

            });

        });

    }


    // =====================================
    // 5. ANIMAÇÕES AO ROLAR A PÁGINA
    // =====================================

    const elementosAnimados = document.querySelectorAll(
        ".card, .conquista, .evento, .historia-conteudo, .estadio"
    );

    const observadorAnimacao = new IntersectionObserver(
        (entradas, observador) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("aparecer");

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elementosAnimados.forEach(elemento => {

        observadorAnimacao.observe(elemento);

    });


    // =====================================
    // 6. ANIMAÇÃO DAS CONQUISTAS
    // =====================================

    const numeros = document.querySelectorAll(".conquista h3");

    const observadorNumeros = new IntersectionObserver(
        (entradas, observador) => {

            entradas.forEach(entrada => {

                if (!entrada.isIntersecting) return;

                const elemento = entrada.target;

                const valorFinal = parseInt(
                    elemento.textContent,
                    10
                );

                if (Number.isNaN(valorFinal)) return;

                let atual = 0;

                const incremento = Math.max(
                    1,
                    Math.ceil(valorFinal / 50)
                );

                const intervalo = setInterval(() => {

                    atual += incremento;

                    if (atual >= valorFinal) {

                        atual = valorFinal;

                        clearInterval(intervalo);

                    }

                    elemento.textContent = atual;

                }, 30);

                observador.unobserve(elemento);

            });

        },
        {
            threshold: 0.5
        }
    );

    numeros.forEach(numero => {

        observadorNumeros.observe(numero);

    });


    // =====================================
    // 7. BOTÃO VOLTAR AO TOPO
    // =====================================

    const voltarTopo = document.createElement("button");

    voltarTopo.id = "voltarTopo";

    voltarTopo.textContent = "↑";

    voltarTopo.title = "Voltar ao topo";

    voltarTopo.setAttribute(
        "aria-label",
        "Voltar ao topo da página"
    );

    voltarTopo.style.display = "none";

    document.body.appendChild(voltarTopo);


    window.addEventListener("scroll", () => {

        voltarTopo.style.display =
            window.scrollY > 400 ? "block" : "none";

    });

    voltarTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =====================================
    // 8. DESTAQUE DO MENU AO ROLAR
    // =====================================

    const secoes = document.querySelectorAll(
        "section[id]"
    );

    const observadorMenu = new IntersectionObserver(
        (entradas) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    const id = entrada.target.id;

                    linksMenu.forEach(link => {

                        link.classList.toggle(
                            "selecionado",
                            link.getAttribute("href") === "#" + id
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-20% 0px -65% 0px"
        }
    );

    secoes.forEach(secao => {

        observadorMenu.observe(secao);

    });


    // =====================================
    // 9. EFEITO DE CARREGAMENTO DAS FOTOS
    // =====================================

    const imagens = document.querySelectorAll("img");

    imagens.forEach(imagem => {

        imagem.addEventListener("error", () => {

            imagem.style.backgroundColor = "#e9edf4";

            imagem.style.color = "#17213a";

            console.warn(
                "Não foi possível carregar uma imagem:",
                imagem.src
            );

        });

    });


    // =====================================
    // 10. MENSAGEM DE BOAS-VINDAS
    // =====================================

    console.log(
        "⚽ Bem-vindo ao portal HALA MADRID!"
    );

    console.log(
        "🏆 Conheça nossa história e nossas conquistas!"
    );

    console.log(
        "👑 ¡HALA MADRID Y NADA MÁS!"
    );

});
