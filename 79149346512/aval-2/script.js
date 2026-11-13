document.addEventListener("DOMContentLoaded", () => {
    const subtitulo = document.getElementById("subtituloDigitado");
    const textoSubtitulo = "Seu mundo de games começa aqui!";
    let indexTexto = 0;

    function digitarTexto() {
        if (indexTexto < textoSubtitulo.length) {
            subtitulo.textContent += textoSubtitulo.charAt(indexTexto);
            indexTexto++;
            setTimeout(digitarTexto, 60);
        }
    }
    digitarTexto();

    const bannerTitulo = document.getElementById("saudacaoBanner");
    const horaAtual = new Date().getHours();
    if (horaAtual >= 5 && horaAtual < 12) {
        bannerTitulo.textContent = "🌅 Bom dia, gamer! Pronto para jogar?";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        bannerTitulo.textContent = "☀️ Boa tarde, gamer! Confira os destaques:";
    } else {
        bannerTitulo.textContent = "🌙 Boa noite, gamer! Hora da gameplay!";
    }

    const btnExplorar = document.getElementById("btnExplorar");
    btnExplorar.addEventListener("click", () => {
        document.getElementById("jogos").scrollIntoView({ behavior: "smooth" });
    });

    const barraProgresso = document.getElementById("barraProgresso");
    const navbar = document.getElementById("navbar");
    const btnTopo = document.getElementById("btnTopo");
    const secoes = document.querySelectorAll("section, main");
    const linksMenu = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const alturaDoc = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentual = (scrollTop / alturaDoc) * 100;
        barraProgresso.style.width = percentual + "%";

        if (scrollTop > 50) {
            navbar.classList.add("rolando");
        } else {
            navbar.classList.remove("rolando");
        }

        if (scrollTop > 300) {
            btnTopo.classList.add("mostrar");
        } else {
            btnTopo.classList.remove("mostrar");
        }

        let secaoAtual = "";
        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop - 150;
            if (scrollTop >= topoSecao) {
                secaoAtual = secao.getAttribute("id");
            }
        });

        linksMenu.forEach(link => {
            link.classList.remove("ativo");
            if (link.getAttribute("href") === `#${secaoAtual}`) {
                link.classList.add("ativo");
            }
        });
    });

    btnTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".revelar").forEach(el => observador.observe(el));

    const cards = document.querySelectorAll(".card-gamer");
    const inputBusca = document.getElementById("inputBusca");
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const contadorFav = document.getElementById("contadorFav");
    let filtroAtual = "todos";

    function atualizarExibicaoCards() {
        const termo = inputBusca.value.toLowerCase();
        let totalFavoritos = 0;

        cards.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase();
            const descricao = card.querySelector("p").textContent.toLowerCase();
            const ehFavorito = card.classList.contains("favorito");

            if (ehFavorito) totalFavoritos++;

            const bateBusca = titulo.includes(termo) || descricao.includes(termo);
            const bateFiltro = filtroAtual === "todos" || (filtroAtual === "favoritos" && ehFavorito);

            card.style.display = (bateBusca && bateFiltro) ? "block" : "none";
        });

        contadorFav.textContent = `Favoritos: ${totalFavoritos} ⭐`;
    }

    inputBusca.addEventListener("input", atualizarExibicaoCards);

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");
            filtroAtual = botao.dataset.filtro;
            atualizarExibicaoCards();
        });
    });

    const modal = document.getElementById("modalJogo");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalGenero = document.getElementById("modalGenero");
    const modalDescricao = document.getElementById("modalDescricao");
    const modalNota = document.getElementById("modalNota");
    const fecharModal = document.getElementById("fecharModal");

    cards.forEach(card => {
        const btnFav = card.querySelector(".btn-fav");
        const btnDetalhes = card.querySelector(".btn-detalhes");

        btnFav.addEventListener("click", () => {
            card.classList.toggle("favorito");
            btnFav.textContent = card.classList.contains("favorito") ? "⭐ Favoritado" : "⭐ Favoritar";
            atualizarExibicaoCards();
        });

        btnDetalhes.addEventListener("click", () => {
            modalTitulo.textContent = card.querySelector("h3").textContent;
            modalGenero.textContent = `Gênero: ${card.dataset.genero}`;
            modalDescricao.textContent = card.querySelector("p").textContent;
            modalNota.textContent = `Avaliação do Blog: ${card.dataset.nota} / 10 🏆`;
            modal.classList.add("aberto");
        });

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centroX = rect.width / 2;
            const centroY = rect.height / 2;
            const rotacaoX = ((y - centroY) / centroY) * -6;
            const rotacaoY = ((x - centroX) / centroX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });

    fecharModal.addEventListener("click", () => {
        modal.classList.remove("aberto");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("aberto");
        }
    });
});