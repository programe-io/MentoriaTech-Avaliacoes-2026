
// ==================================
// AZUL DE VIAGEM - JAVASCRIPT
// ==================================


// 1. MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", () => {
    console.log("Bem-vindo ao Azul de Viagem! ✈️");

    const titulo = document.querySelector(".inicio h1");

    if (titulo) {
        titulo.style.opacity = "0";

        setTimeout(() => {
            titulo.style.transition = "opacity 1.5s ease";
            titulo.style.opacity = "1";
        }, 300);
    }
});


// 2. ANIMAÇÃO AO ROLAR A PÁGINA

const elementos = document.querySelectorAll(
    ".card, .cultura, .titulo, .historia p"
);

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("mostrar");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach((elemento) => {
    elemento.classList.add("aparecer");
    observador.observe(elemento);
});


// 3. PESQUISA DE DESTINOS

const campoPesquisa = document.createElement("input");

campoPesquisa.type = "text";
campoPesquisa.placeholder = "Pesquisar destinos...";
campoPesquisa.id = "pesquisaDestino";

campoPesquisa.style.cssText = `
    padding: 12px;
    width: 100%;
    max-width: 400px;
    display: block;
    margin: 0 auto 30px;
    border-radius: 25px;
    border: 1px solid #60dfff;
    background: #0b2a50;
    color: white;
    outline: none;
`;

const secaoDestinos = document.querySelector("#destinos");
const listaDestinos = document.querySelectorAll(".card");

if (secaoDestinos) {
    secaoDestinos.insertBefore(
        campoPesquisa,
        secaoDestinos.querySelector(".destinos")
    );
}

campoPesquisa.addEventListener("input", () => {
    const pesquisa = campoPesquisa.value.toLowerCase();

    listaDestinos.forEach((card) => {
        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = card.querySelector("p")
            .textContent.toLowerCase();

        if (
            nome.includes(pesquisa) ||
            descricao.includes(pesquisa)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


// 4. BOTÃO DE FAVORITAR DESTINOS

listaDestinos.forEach((card) => {

    const botaoFavorito = document.createElement("button");

    botaoFavorito.textContent = "♡ Favoritar";

    botaoFavorito.style.cssText = `
        background: transparent;
        border: 1px solid #60dfff;
        color: #60dfff;
        padding: 10px 15px;
        margin: 0 15px 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: 0.3s;
    `;

    botaoFavorito.addEventListener("click", () => {

        const favorito = botaoFavorito.classList.toggle("favorito");

        if (favorito) {
            botaoFavorito.textContent = "♥ Favoritado";
            botaoFavorito.style.background = "#087bc1";

            alert("Destino adicionado aos favoritos! 💙");
        } else {
            botaoFavorito.textContent = "♡ Favoritar";
            botaoFavorito.style.background = "transparent";
        }
    });

    card.appendChild(botaoFavorito);
});


// 5. BOTÃO DE VOLTAR AO TOPO

const voltarTopo = document.createElement("button");

voltarTopo.innerHTML = "↑";

voltarTopo.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(90deg, #087bc1, #55dfff);
    color: #06152f;
    font-size: 25px;
    cursor: pointer;
    box-shadow: 0 0 20px #00bfff;
    display: none;
    z-index: 1000;
`;

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        voltarTopo.style.display = "block";
    } else {
        voltarTopo.style.display = "none";
    }
});

voltarTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 6. ANO AUTOMÁTICO NO RODAPÉ

const rodape = document.querySelector("footer");

if (rodape) {
    const ano = rodape.querySelector(".ano-atual");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
}


// 7. EFEITO DE BRILHO NOS CARDS

listaDestinos.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 30px #00bfff";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "0 0 15px #008cff33";
    });

});


// 8. MENSAGEM DE FINALIZAÇÃO

console.log(
    "Azul de Viagem carregado com sucesso! 🌍💙"
);
