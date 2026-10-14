
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");
    const temaToggle = document.getElementById("temaToggle");
    const botaoTopo = document.getElementById("botaoTopo");
    const formContato = document.getElementById("formContato");
    const formStatus = document.getElementById("formStatus");

    // MENU PARA CELULAR
    function fecharMenu() {
        menu.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }

    menuToggle.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            fecharMenu();
        }
    });

    document.addEventListener("click", (evento) => {
        if (
            menu.classList.contains("aberto") &&
            !menu.contains(evento.target) &&
            !menuToggle.contains(evento.target)
        ) {
            fecharMenu();
        }
    });

    // TEMA CLARO E ESCURO
    function aplicarTema(tema) {
        const claro = tema === "claro";

        document.body.classList.toggle("light", claro);
        temaToggle.textContent = claro ? "🌙" : "☀️";
        temaToggle.setAttribute(
            "aria-label",
            claro ? "Ativar tema escuro" : "Ativar tema claro"
        );
        document.documentElement.style.colorScheme =
            claro ? "light" : "dark";
    }

    let temaSalvo = null;

    try {
        temaSalvo = localStorage.getItem("novaweb-tema");
    } catch (erro) {
        // O site continua funcionando sem armazenamento local.
    }

    aplicarTema(temaSalvo === "claro" ? "claro" : "escuro");

    temaToggle.addEventListener("click", () => {
        const novoTema = document.body.classList.contains("light")
            ? "escuro"
            : "claro";

        aplicarTema(novoTema);

        try {
            localStorage.setItem("novaweb-tema", novoTema);
        } catch (erro) {
            // A mudança visual funciona mesmo sem salvar a preferência.
        }
    });

    // FILTRO DA GALERIA
    const filtros = document.querySelectorAll(".filtro");
    const projetos = document.querySelectorAll(".projeto");

    filtros.forEach((botao) => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.filtro;

            filtros.forEach((filtro) => {
                const selecionado = filtro === botao;

                filtro.classList.toggle("ativo", selecionado);
                filtro.setAttribute(
                    "aria-pressed",
                    String(selecionado)
                );
            });

            projetos.forEach((projeto) => {
                const corresponde =
                    categoria === "todos" ||
                    projeto.dataset.categoria === categoria;

                projeto.hidden = !corresponde;
            });
        });

        botao.setAttribute(
            "aria-pressed",
            String(botao.classList.contains("ativo"))
        );
    });

    // ANIMAÇÕES DURANTE A ROLAGEM
    const elementos = document.querySelectorAll(".reveal");

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !movimentoReduzido) {
        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("apareceu");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        elementos.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementos.forEach((elemento) => {
            elemento.classList.add("apareceu");
        });
    }

    // BOTÃO VOLTAR AO TOPO
    function atualizarBotaoTopo() {
        botaoTopo.classList.toggle(
            "visivel",
            window.scrollY > 400
        );
    }

    window.addEventListener("scroll", atualizarBotaoTopo, {
        passive: true
    });

    atualizarBotaoTopo();

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: movimentoReduzido ? "auto" : "smooth"
        });
    });

    // ANO AUTOMÁTICO NO RODAPÉ
    document.getElementById("ano").textContent =
        new Date().getFullYear();

    // FORMULÁRIO DE DEMONSTRAÇÃO
    formContato.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formContato.checkValidity()) {
            formContato.reportValidity();
            return;
        }

        const dados = new FormData(formContato);
        const nome = String(dados.get("nome") || "").trim();

        formStatus.textContent =
            `Obrigado, ${nome}! O formulário está funcionando, ` +
            "mas precisa de um serviço de backend para enviar sua mensagem.";

        formContato.reset();
    });
});
