// ==================================
// 🍓 SABOR & ARTE - JAVASCRIPT
// ==================================

// MENSAGEM INICIAL
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Sabor & Arte! 🍓");
});

// ==================================
// 1. PESQUISAR RECEITAS
// ==================================

const campoPesquisa = document.createElement("input");

campoPesquisa.type = "text";
campoPesquisa.placeholder = "🔎 Pesquisar receitas...";

const titulo = document.querySelector("#receitas h2");

titulo.after(campoPesquisa);

campoPesquisa.style.width = "100%";
campoPesquisa.style.padding = "13px";
campoPesquisa.style.marginBottom = "25px";
campoPesquisa.style.border = "1px solid #ddd";
campoPesquisa.style.borderRadius = "8px";

campoPesquisa.addEventListener("input", function() {

    const pesquisa = campoPesquisa.value.toLowerCase();

    const receitas = document.querySelectorAll(".card");

    receitas.forEach(function(receita) {

        const nome = receita.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = receita.querySelector("p")
            .textContent.toLowerCase();

        receita.style.display =
            nome.includes(pesquisa) ||
            descricao.includes(pesquisa)
            ? "block"
            : "none";

    });

});

// ==================================
// 2. FAVORITAR RECEITAS
// ==================================

let favoritos = JSON.parse(
    localStorage.getItem("favoritos")
) || [];

document.querySelectorAll(".card").forEach(function(card, index) {

    const botao = document.createElement("button");

    botao.className = "botao-favorito";

    const nome = card.querySelector("h3").textContent;

    function atualizarBotao() {
        botao.textContent = favoritos.includes(nome)
            ? "❤️ Favoritado"
            : "🤍 Favoritar";
    }

    atualizarBotao();

    botao.addEventListener("click", function() {

        if (favoritos.includes(nome)) {

            favoritos = favoritos.filter(
                item => item !== nome
            );

        } else {

            favoritos.push(nome);

        }

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

        atualizarBotao();

    });

    card.appendChild(botao);

});

// ==================================
// 3. AVALIAR RECEITAS
// ==================================

document.querySelectorAll(".card").forEach(function(card) {

    const avaliacao = document.createElement("div");

    avaliacao.className = "avaliacao";

    const texto = document.createElement("p");
    texto.textContent = "Avalie esta receita:";

    avaliacao.appendChild(texto);

    for (let i = 1; i <= 5; i++) {

        const estrela = document.createElement("button");

        estrela.textContent = "☆";
        estrela.style.fontSize = "23px";
        estrela.style.color = "#e5a000";
        estrela.style.border = "none";
        estrela.style.background = "transparent";
        estrela.style.cursor = "pointer";

        estrela.addEventListener("click", function() {

            const estrelas = avaliacao.querySelectorAll("button");

            estrelas.forEach(function(botao, indice) {

                botao.textContent = indice < i ? "★" : "☆";

            });

            texto.textContent =
                "Você avaliou com " + i + " estrelas!";

        });

        avaliacao.appendChild(estrela);

    }

    card.appendChild(avaliacao);

});

// ==================================
// 4. FORMULÁRIO DE CONTATO
// ==================================

const formulario = document.querySelector(".contato form");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = formulario.querySelector(
        'input[type="text"]'
    ).value.trim();

    const email = formulario.querySelector(
        'input[type="email"]'
    ).value.trim();

    const mensagem = formulario.querySelector(
        "textarea"
    ).value.trim();

    if (!nome || !email || !mensagem) {

        alert("Preencha todos os campos!");

        return;

    }

    alert(
        "🍓 Obrigado, " + nome +
        "! Sua mensagem foi recebida."
    );

    formulario.reset();

});

// ==================================
// 5. MOSTRAR E ESCONDER RECEITAS
// ==================================

document.querySelectorAll(".botao-card").forEach(function(botao) {

    botao.addEventListener("click", function(event) {

        const link = botao.getAttribute("href");

        const receita = document.querySelector(link);

        if (receita) {

            receita.style.transition = "0.5s";
            receita.style.background = "#fff0e8";

            setTimeout(function() {

                receita.style.background = "white";

            }, 1500);

        }

    });

});

// ==================================
// 6. ANIMAÇÕES AO ROLAR A PÁGINA
// ==================================

const elementos = document.querySelectorAll(
    ".card, .categoria, .dica, .receita-detalhada"
);

const observador = new IntersectionObserver(function(entradas) {

    entradas.forEach(function(entrada) {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("aparecer");

            observador.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.15
});

elementos.forEach(function(elemento) {

    elemento.classList.add("animacao");

    observador.observe(elemento);

});

// ==================================
// 7. BOTÃO VOLTAR AO TOPO
// ==================================

const voltarTopo = document.createElement("button");

voltarTopo.textContent = "⬆";

voltarTopo.title = "Voltar ao topo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "25px";
voltarTopo.style.right = "25px";
voltarTopo.style.width = "45px";
voltarTopo.style.height = "45px";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "50%";
voltarTopo.style.background = "#b83245";
voltarTopo.style.color = "white";
voltarTopo.style.fontSize = "22px";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "none";
voltarTopo.style.zIndex = "999";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", function() {

    voltarTopo.style.display =
        window.scrollY > 300 ? "block" : "none";

});

voltarTopo.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
