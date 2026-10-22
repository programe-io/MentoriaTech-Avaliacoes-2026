
document.addEventListener("DOMContentLoaded", () => {
    const corpo = document.body;
    const seletorTema = document.getElementById("selecionar-tema");
    const campoBusca = document.getElementById("busca-postagens");
    const botaoLimpar = document.getElementById("limpar-busca");
    const mensagemBusca = document.getElementById("mensagem-busca");
    const botaoTopo = document.getElementById("voltar-topo");
    const barraProgresso = document.getElementById("progresso-leitura");
    const postagens = Array.from(document.querySelectorAll(".postagem"));

    // Troca de temas
    const temasPermitidos = [
        "claro",
        "escuro",
        "roblox",
        "google",
        "fma"
    ];

    function aplicarTema(tema) {
        if (!temasPermitidos.includes(tema)) {
            tema = "claro";
        }

        corpo.classList.remove(
            "tema-escuro",
            "tema-roblox",
            "tema-google",
            "tema-fma"
        );

        if (tema !== "claro") {
            corpo.classList.add(`tema-${tema}`);
        }

        seletorTema.value = tema;

        try {
            localStorage.setItem("tema-blog", tema);
        } catch (erro) {
            // O blog continua funcionando mesmo se o armazenamento estiver bloqueado.
        }
    }

    seletorTema.addEventListener("change", () => {
        aplicarTema(seletorTema.value);
    });

    try {
        const temaSalvo = localStorage.getItem("tema-blog");
        aplicarTema(temaSalvo || "claro");
    } catch (erro) {
        aplicarTema("claro");
    }

    // Remove os destaques anteriores da busca
    function removerDestaques() {
        document.querySelectorAll(".postagem mark").forEach((marca) => {
            marca.replaceWith(document.createTextNode(marca.textContent));
        });

        document.querySelectorAll(".postagem").forEach((postagem) => {
            postagem.normalize();
        });
    }

    // Normaliza o texto para permitir buscas sem diferença de acentos
    function normalizarTexto(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("pt-BR");
    }

    // Destaca os termos encontrados sem interpretar o texto como HTML
    function destacarTermo(elemento, termo) {
        if (!termo) return;

        const termoNormalizado = normalizarTexto(termo);
        const partes = [];
        const percorredor = document.createTreeWalker(
            elemento,
            NodeFilter.SHOW_TEXT
        );

        let no;

        while ((no = percorredor.nextNode())) {
            if (no.parentElement.closest("mark")) continue;

            const textoOriginal = no.nodeValue;
            const textoNormalizado = normalizarTexto(textoOriginal);
            let inicio = 0;
            let posicao = textoNormalizado.indexOf(termoNormalizado);

            if (posicao === -1) continue;

            const fragmento = document.createDocumentFragment();

            while (posicao !== -1) {
                if (posicao > inicio) {
                    fragmento.appendChild(
                        document.createTextNode(
                            textoOriginal.slice(inicio, posicao)
                        )
                    );
                }

                const marca = document.createElement("mark");
                marca.textContent = textoOriginal.slice(
                    posicao,
                    posicao + termo.length
                );

                fragmento.appendChild(marca);

                inicio = posicao + termo.length;
                posicao = textoNormalizado.indexOf(
                    termoNormalizado,
                    inicio
                );
            }

            if (inicio < textoOriginal.length) {
                fragmento.appendChild(
                    document.createTextNode(textoOriginal.slice(inicio))
                );
            }

            partes.push({ original: no, fragmento });
        }

        partes.forEach(({ original, fragmento }) => {
            original.replaceWith(fragmento);
        });
    }

    // Busca e filtragem das postagens
    function buscarPostagens() {
        removerDestaques();

        const termo = campoBusca.value.trim();
        const termoNormalizado = normalizarTexto(termo);
        let quantidadeEncontrada = 0;

        postagens.forEach((postagem) => {
            const conteudo = normalizarTexto(postagem.textContent);
            const encontrada =
                termoNormalizado === "" ||
                conteudo.includes(termoNormalizado);

            postagem.hidden = !encontrada;

            if (encontrada) {
                quantidadeEncontrada++;

                if (termoNormalizado !== "") {
                    destacarTermo(postagem, termo);
                }
            }
        });

        botaoLimpar.hidden = termo.length === 0;

        if (termo.length === 0) {
            mensagemBusca.hidden = true;
            mensagemBusca.textContent = "";
        } else {
            mensagemBusca.hidden = false;

            if (quantidadeEncontrada === 0) {
                mensagemBusca.textContent =
                    `Nenhuma postagem encontrada para "${termo}".`;
            } else {
                mensagemBusca.textContent =
                    `${quantidadeEncontrada} postagem(ns) encontrada(s).`;
            }
        }
    }

    campoBusca.addEventListener("input", buscarPostagens);

    botaoLimpar.addEventListener("click", () => {
        campoBusca.value = "";
        buscarPostagens();
        campoBusca.focus();
    });

    // Barra de progresso e botão de voltar ao topo
    function atualizarRolagem() {
        const alturaTotal =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progresso =
            alturaTotal > 0
                ? (window.scrollY / alturaTotal) * 100
                : 0;

        barraProgresso.style.width = `${Math.min(progresso, 100)}%`;

        if (window.scrollY > 300) {
            botaoTopo.classList.add("visivel");
        } else {
            botaoTopo.classList.remove("visivel");
        }
    }

    window.addEventListener("scroll", atualizarRolagem, {
        passive: true
    });

    window.addEventListener("resize", atualizarRolagem);

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    atualizarRolagem();
});
