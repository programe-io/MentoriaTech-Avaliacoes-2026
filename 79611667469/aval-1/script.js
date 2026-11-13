
/* =====================================
   ERNANDES - BLOG DE CARROS ESPORTIVOS
   JAVASCRIPT
   ===================================== */

// Quando a página carregar
document.addEventListener("DOMContentLoaded", () => {

    console.log("Bem-vindo ao blog ERNANDES!");

    // ANO AUTOMÁTICO NO RODAPÉ
    const footer = document.querySelector("footer");

    if (footer) {
        footer.innerHTML = `
            <p>© ${new Date().getFullYear()} ERNANDES - Blog de Carros Esportivos</p>
            <p>Feito com paixão por automobilismo 🏎️</p>
        `;
    }

    // EFEITO DE APARECIMENTO
    const elementos = document.querySelectorAll(
        ".car-card, .section-title, .about p"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visivel");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        elementos.forEach(elemento => {
            observer.observe(elemento);
        });
    }

    // BOTÃO VOLTAR AO TOPO
    const botaoTopo = document.createElement("button");

    botaoTopo.innerHTML = "↑";
    botaoTopo.id = "voltarTopo";

    botaoTopo.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 45px;
        height: 45px;
        border: none;
        border-radius: 50%;
        background: #e10600;
        color: white;
        font-size: 25px;
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

    // ANO E MENSAGEM DE BOAS-VINDAS
    console.log("ERNANDES: velocidade, potência e paixão!");

});


// PESQUISA DE CARROS
function pesquisarCarros() {

    const campo = document.getElementById("pesquisaCarro");

    if (!campo) return;

    const pesquisa = campo.value.toLowerCase();

    const carros = document.querySelectorAll(".car-card");

    carros.forEach(carro => {

        const nome = carro.querySelector("h3");

        if (!nome) return;

        const encontrado = nome.textContent
            .toLowerCase()
            .includes(pesquisa);

        carro.style.display = encontrado ? "block" : "none";
    });

}


// FILTRAR CARROS POR MARCA
function filtrarCarros(marca) {

    const carros = document.querySelectorAll(".car-card");

    carros.forEach(carro => {

        const nome = carro.querySelector("h3");

        if (!nome) return;

        const nomeCarro = nome.textContent.toLowerCase();

        if (
            marca === "todos" ||
            nomeCarro.includes(marca.toLowerCase())
        ) {
            carro.style.display = "block";
        } else {
            carro.style.display = "none";
        }

    });

}


// MENSAGEM DE CONTATO
function enviarMensagem() {

    alert(
        "Obrigado por visitar o blog ERNANDES! 🏎️\n" +
        "Sua paixão por carros esportivos é bem-vinda aqui!"
    );

}


// MENU MOBILE
function abrirMenu() {

    const menu = document.querySelector("nav");

    if (menu) {
        menu.classList.toggle("menu-aberto");
    }

}
