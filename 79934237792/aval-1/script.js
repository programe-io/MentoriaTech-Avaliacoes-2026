// ==========================================
// ANIMAÇÃO DE ENTRADA
// ==========================================

const elementos = document.querySelectorAll(
    "section, .card, .sobre img, .galeria img"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elementos.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(30px)";
    elemento.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(elemento);
});


// ==========================================
// ADICIONA CLASSE VISÍVEL
// ==========================================

const estilo = document.createElement("style");

estilo.innerHTML = `
    .visivel {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .teia {
        position: fixed;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: teiaCaindo 1.5s linear forwards;
    }

    @keyframes teiaCaindo {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
    }

    .imagem-ampliada {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        cursor: pointer;
    }

    .imagem-ampliada img {
        max-width: 90%;
        max-height: 85%;
        border: 4px solid #e50914;
        border-radius: 15px;
        box-shadow: 0 0 40px #e50914;
    }

    .contador {
        text-align: center;
        margin: 50px auto;
        font-size: 25px;
        color: #e50914;
    }
`;

document.head.appendChild(estilo);


// ==========================================
// EFEITO DE TEIA AO CLICAR
// ==========================================

document.addEventListener("click", (evento) => {

    for (let i = 0; i < 8; i++) {

        const teia = document.createElement("span");

        teia.classList.add("teia");

        teia.style.left = evento.clientX + "px";
        teia.style.top = evento.clientY + "px";

        teia.style.animationDelay =
            Math.random() * 0.3 + "s";

        document.body.appendChild(teia);

        setTimeout(() => {
            teia.remove();
        }, 1800);
    }
});


// ==========================================
// GALERIA DE IMAGENS
// ==========================================

const imagens = document.querySelectorAll(
    ".galeria img, .card img, .sobre img"
);

imagens.forEach((imagem) => {

    imagem.style.cursor = "pointer";

    imagem.addEventListener("click", () => {

        const janela = document.createElement("div");

        janela.classList.add("imagem-ampliada");

        const imagemGrande = document.createElement("img");

        imagemGrande.src = imagem.src;
        imagemGrande.alt = imagem.alt;

        janela.appendChild(imagemGrande);

        document.body.appendChild(janela);

        janela.addEventListener("click", () => {
            janela.remove();
        });
    });
});


// ==========================================
// EFEITO NOS CARDS
// ==========================================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px) scale(1.03)";

        card.style.boxShadow =
            "0 15px 40px rgba(229, 9, 20, 0.7)";
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

        card.style.boxShadow = "";
    });
});


// ==========================================
// MENU SUAVE
// ==========================================

const links = document.querySelectorAll(
    'nav a[href^="#"]'
);

links.forEach((link) => {

    link.addEventListener("click", (evento) => {

        evento.preventDefault();

        const destino = document.querySelector(
            link.getAttribute("href")
        );

        if (destino) {

            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ==========================================
// EFEITO DE MOVIMENTO DO MOUSE
// ==========================================

const hero = document.querySelector(".hero");

if (hero) {

    document.addEventListener("mousemove", (evento) => {

        const x =
            (evento.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (evento.clientY / window.innerHeight - 0.5) * 10;

        hero.style.transform =
            `translate(${x}px, ${y}px)`;
    });
}


// ==========================================
// CONTADOR DE AVENTURAS
// ==========================================

let contador = 0;

const contadorElemento =
    document.createElement("div");

contadorElemento.classList.add("contador");

contadorElemento.innerHTML =
    "🕷️ Aventuras do Homem-Aranha: <strong>0</strong>";

const personagens =
    document.querySelector("#personagens");

if (personagens) {

    personagens.appendChild(
        contadorElemento
    );

    const numero =
        contadorElemento.querySelector("strong");

    const intervalo =
        setInterval(() => {

            contador += 1;

            numero.textContent = contador;

            if (contador >= 100) {
                clearInterval(intervalo);
            }

        }, 30);
}


// ==========================================
// FRASES DO HOMEM-ARANHA
// ==========================================

const frases = [
    "🕷️ Com grandes poderes vêm grandes responsabilidades.",
    "🕸️ Nunca desista de fazer o que é certo.",
    "🕷️ Um herói pode estar escondido em qualquer pessoa.",
    "🕸️ A responsabilidade acompanha o poder.",
    "🕷️ Continue lutando!"
];

let fraseAtual = 0;

const botaoFrase = document.createElement("button");

botaoFrase.textContent =
    "🕷️ Nova frase";

botaoFrase.style.cssText = `
    display: block;
    margin: 30px auto;
    padding: 14px 25px;
    background: #e50914;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
`;

document.body.appendChild(botaoFrase);

botaoFrase.addEventListener("click", () => {

    fraseAtual++;

    if (fraseAtual >= frases.length) {
        fraseAtual = 0;
    }

    alert(frases[fraseAtual]);
});


// ==========================================
// MENSAGEM NO CONSOLE
// ==========================================

console.log(
    "%c🕷️ HOMEM-ARANHA 🕷️",
    "color: red; font-size: 25px; font-weight: bold;"
);

console.log(
    "%cGrandes poderes trazem grandes responsabilidades!",
    "color: white; font-size: 16px;"
);
