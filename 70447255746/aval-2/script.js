// ================================
// BLOG DESCOBRINDO A SUÍÇA
// JavaScript
// ================================


// ================================
// MENU / NAVEGAÇÃO
// ================================

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", function(event) {

        const destino = document.querySelector(
            this.getAttribute("href")
        );

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ================================
// EFEITO DO CABEÇALHO AO ROLAR
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.backgroundColor =
            "rgba(0, 0, 0, 0.95)";

        header.style.boxShadow =
            "0 3px 15px rgba(0, 0, 0, 0.2)";

    } else {

        header.style.backgroundColor =
            "rgba(0, 0, 0, 0.75)";

        header.style.boxShadow = "none";
    }

});


// ================================
// ANIMAÇÃO DOS CARDS
// ================================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
    (elementos) => {

        elementos.forEach(elemento => {

            if (elemento.isIntersecting) {

                elemento.target.style.opacity = "1";

                elemento.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});


// ================================
// GALERIA DE IMAGENS
// ================================

const imagens = document.querySelectorAll(".gallery img");

imagens.forEach(imagem => {

    imagem.addEventListener("click", () => {

        const imagemAmpliada =
            document.createElement("div");

        imagemAmpliada.classList.add(
            "imagem-modal"
        );

        imagemAmpliada.innerHTML = `
            <div class="modal-conteudo">
                <span class="fechar">&times;</span>
                <img src="${imagem.src}" alt="${imagem.alt}">
            </div>
        `;

        document.body.appendChild(
            imagemAmpliada
        );

        const fechar =
            imagemAmpliada.querySelector(".fechar");

        fechar.addEventListener("click", () => {
            imagemAmpliada.remove();
        });

        imagemAmpliada.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    imagemAmpliada
                ) {
                    imagemAmpliada.remove();
                }

            }
        );

    });

});


// ================================
// FORMULÁRIO DE CONTATO
// ================================

const formulario =
    document.querySelector("form");

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nome =
            document.querySelector(
                'input[name="nome"]'
            ).value.trim();

        const email =
            document.querySelector(
                'input[name="email"]'
            ).value.trim();

        const mensagem =
            document.querySelector(
                'textarea[name="mensagem"]'
            ).value.trim();


        if (
            nome === "" ||
            email === "" ||
            mensagem === ""
        ) {

            alert(
                "Por favor, preencha todos os campos."
            );

            return;
        }


        alert(
            `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`
        );

        formulario.reset();

    }
);


// ================================
// BOTÃO "VOLTAR AO TOPO"
// ================================

const botaoTopo =
    document.createElement("button");

botaoTopo.innerHTML = "↑";

botaoTopo.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

botaoTopo.classList.add(
    "botao-topo"
);

document.body.appendChild(
    botaoTopo
);


window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        botaoTopo.classList.add("mostrar");

    } else {

        botaoTopo.classList.remove("mostrar");

    }

});


botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================================
// DATA ATUAL NO RODAPÉ
// ================================

const anoAtual =
    new Date().getFullYear();

const rodape =
    document.querySelector("footer");

const paragrafoAno =
    rodape.querySelector("p:last-child");

paragrafoAno.textContent =
    `© ${anoAtual} - Todos os direitos reservados.`;


// ================================
// MENSAGEM NO CONSOLE
// ================================

console.log(
    "🇨🇭 Blog Descobrindo a Suíça carregado com sucesso!"
);