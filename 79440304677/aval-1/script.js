// FLOR ENCANTADA 🌸

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Flor Encantada! 🌸");
});

// PESQUISA DE FLORES
const campoPesquisa = document.createElement("input");

campoPesquisa.type = "text";
campoPesquisa.placeholder = "🔎 Pesquisar uma flor...";

const tituloFlores = document.querySelector("#flores h2");

tituloFlores.after(campoPesquisa);

campoPesquisa.style.display = "block";
campoPesquisa.style.width = "100%";
campoPesquisa.style.padding = "12px";
campoPesquisa.style.marginBottom = "25px";
campoPesquisa.style.border = "1px solid #e7b9cb";
campoPesquisa.style.borderRadius = "8px";

campoPesquisa.addEventListener("input", function() {

    const pesquisa = campoPesquisa.value.toLowerCase();

    const flores = document.querySelectorAll(".card");

    flores.forEach(function(flor) {

        const nome = flor.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = flor.querySelector("p")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa) ||
            descricao.includes(pesquisa)) {

            flor.style.display = "block";

        } else {

            flor.style.display = "none";

        }

    });

});

// FAVORITAR FLORES
document.querySelectorAll(".card").forEach(function(card) {

    const botao = document.createElement("button");

    botao.textContent = "🤍 Favoritar";

    botao.style.background = "#d85b91";
    botao.style.color = "white";
    botao.style.border = "none";
    botao.style.padding = "10px 20px";
    botao.style.borderRadius = "20px";
    botao.style.cursor = "pointer";
    botao.style.marginTop = "15px";

    botao.addEventListener("click", function() {

        const favorito = botao.dataset.favorito === "true";

        botao.dataset.favorito = !favorito;

        botao.textContent = favorito
            ? "🤍 Favoritar"
            : "❤️ Favoritado";

    });

    card.appendChild(botao);

});

// FORMULÁRIO DE CONTATO
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

        alert("Por favor, preencha todos os campos!");

        return;

    }

    alert(
        "🌸 Obrigado, " + nome +
        "! Sua mensagem foi recebida pelo formulário."
    );

    formulario.reset();

});

// ANIMAÇÃO AO ROLAR A PÁGINA
const elementos = document.querySelectorAll(
    ".card, .dica, .galeria img, .sobre"
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

// BOTÃO VOLTAR AO TOPO
const voltarTopo = document.createElement("button");

voltarTopo.textContent = "↑";

voltarTopo.title = "Voltar ao topo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "25px";
voltarTopo.style.right = "25px";
voltarTopo.style.width = "45px";
voltarTopo.style.height = "45px";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "50%";
voltarTopo.style.background = "#b34472";
voltarTopo.style.color = "white";
voltarTopo.style.fontSize = "25px";
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
2. Adicione esta parte ao CSS
Para fazer as animações funcionarem, coloque no final do style.css:


css

/* ANIMAÇÕES */

.animacao {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.aparecer {
    opacity: 1;
    transform: translateY(0);
}

/* CAMPO DE PESQUISA */

#flores input:focus {
    outline: none;
    border-color: #b34472;
    box-shadow: 0 0 5px #b3447255;
}

/* BOTÃO VOLTAR AO TOPO */

button:hover {
    filter: brightness(1.1);
}