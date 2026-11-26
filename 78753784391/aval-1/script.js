
// =====================================
// CYBERPUNK 2077 - NIGHT CITY EFFECTS
// =====================================

// 1. EFEITO DE DIGITAÇÃO NO TÍTULO

const titulo = document.querySelector("header h1");

if (titulo) {
    const textoOriginal = titulo.textContent;
    titulo.textContent = "";

    let letra = 0;

    function digitar() {
        if (letra < textoOriginal.length) {
            titulo.textContent += textoOriginal.charAt(letra);
            letra++;
            setTimeout(digitar, 100);
        }
    }

    digitar();
}

// 2. RELÓGIO DIGITAL

const relogio = document.createElement("div");

relogio.id = "relogio";
relogio.style.textAlign = "center";
relogio.style.color = "#00f0ff";
relogio.style.fontFamily = "Orbitron, sans-serif";
relogio.style.padding = "12px";
relogio.style.fontSize = "16px";

document.querySelector("header")?.appendChild(relogio);

function atualizarRelogio() {
    const agora = new Date();

    relogio.textContent =
        "NIGHT CITY TIME: " +
        agora.toLocaleTimeString("pt-BR");
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// 3. BOTÃO DE MODO NEON

const botaoNeon = document.createElement("button");

botaoNeon.textContent = "ATIVAR MODO NEON";

botaoNeon.style.display = "block";
botaoNeon.style.margin = "20px auto";
botaoNeon.style.padding = "12px 22px";
botaoNeon.style.background = "#fcee0a";
botaoNeon.style.color = "#08090d";
botaoNeon.style.border = "none";
botaoNeon.style.borderRadius = "5px";
botaoNeon.style.fontWeight = "bold";
botaoNeon.style.cursor = "pointer";

document.querySelector("header")?.appendChild(botaoNeon);

let neonAtivo = false;

botaoNeon.addEventListener("click", function() {
    neonAtivo = !neonAtivo;

    document.body.classList.toggle("modo-neon", neonAtivo);

    botaoNeon.textContent = neonAtivo
        ? "DESATIVAR MODO NEON"
        : "ATIVAR MODO NEON";
});

// 4. ANIMAÇÃO DAS SEÇÕES

const secoes = document.querySelectorAll("main section");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

secoes.forEach((secao) => {
    secao.classList.add("animacao");
    observador.observe(secao);
});

// 5. BOTÃO VOLTAR AO TOPO

const voltarTopo = document.createElement("button");

voltarTopo.textContent = "⬆ VOLTAR AO TOPO";
voltarTopo.id = "voltar-topo";

document.body.appendChild(voltarTopo);

voltarTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    voltarTopo.style.display =
        window.scrollY > 300 ? "block" : "none";
});

// 6. EFEITO DE BRILHO NOS CARTÕES

document.querySelectorAll(".noticia").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 25px #ff2a6d";
        card.style.transform = "scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
        card.style.transform = "scale(1)";
    });
});
