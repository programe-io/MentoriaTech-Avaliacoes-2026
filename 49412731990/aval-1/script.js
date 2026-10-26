
const cursor = document.createElement("div");
cursor.id = "cursor-magico";

Object.assign(cursor.style, {
    position: "fixed",
    width: "18px",
    height: "18px",
    border: "2px solid #60a5fa",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: "99999",
    transform: "translate(-50%, -50%)",
    transition: "width .2s, height .2s, border-color .2s",
    boxShadow: "0 0 15px #3b82f6",
    left: "-100px",
    top: "-100px"
});

document.body.appendChild(cursor);

const rastro = [];
const quantidade = 12;

for (let i = 0; i < quantidade; i++) {
    const ponto = document.createElement("div");

    Object.assign(ponto.style, {
        position: "fixed",
        width: `${10 - i * 0.6}px`,
        height: `${10 - i * 0.6}px`,
        borderRadius: "50%",
        background: `rgba(96, 165, 250, ${0.8 - i * 0.055})`,
        pointerEvents: "none",
        zIndex: "99998",
        transform: "translate(-50%, -50%)",
        left: "-100px",
        top: "-100px"
    });

    document.body.appendChild(ponto);
    rastro.push({ elemento: ponto, x: -100, y: -100 });
}

let mouseX = -100;
let mouseY = -100;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animarCursor() {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    let x = mouseX;
    let y = mouseY;

    rastro.forEach((ponto) => {
        ponto.x += (x - ponto.x) * 0.35;
        ponto.y += (y - ponto.y) * 0.35;

        ponto.elemento.style.left = ponto.x + "px";
        ponto.elemento.style.top = ponto.y + "px";

        x = ponto.x;
        y = ponto.y;
    });

    requestAnimationFrame(animarCursor);
}

animarCursor();

// O cursor reage quando passa sobre links e botões.
document.querySelectorAll("a, button, article").forEach((elemento) => {
    elemento.addEventListener("mouseenter", () => {
        cursor.style.width = "35px";
        cursor.style.height = "35px";
        cursor.style.borderColor = "#c084fc";
        cursor.style.boxShadow = "0 0 25px #a855f7";
    });

    elemento.addEventListener("mouseleave", () => {
        cursor.style.width = "18px";
        cursor.style.height = "18px";
        cursor.style.borderColor = "#60a5fa";
        cursor.style.boxShadow = "0 0 15px #3b82f6";
    });
});

// Efeito de inclinação nos artigos conforme a posição do mouse.
document.querySelectorAll("article").forEach((artigo) => {
    artigo.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";

    artigo.addEventListener("mousemove", (e) => {
        const rect = artigo.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotacaoY = (x - 0.5) * 8;
        const rotacaoX = (0.5 - y) * 8;

        artigo.style.transform =
            `perspective(700px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateY(-3px)`;

        artigo.style.boxShadow = "0 15px 35px #2563eb25";
    });

    artigo.addEventListener("mouseleave", () => {
        artigo.style.transform = "";
        artigo.style.boxShadow = "";
    });
});

// Pequenas partículas aparecem quando você clica.
document.addEventListener("click", (e) => {
    for (let i = 0; i < 8; i++) {
        const particula = document.createElement("span");
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 30 + Math.random() * 50;

        Object.assign(particula.style, {
            position: "fixed",
            left: e.clientX + "px",
            top: e.clientY + "px",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: ["#60a5fa", "#c084fc", "#facc15"][
                Math.floor(Math.random() * 3)
            ],
            pointerEvents: "none",
            zIndex: "99999"
        });

        document.body.appendChild(particula);

        particula.animate([
            { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
            {
                transform: `translate(calc(-50% + ${Math.cos(angulo) * distancia}px), calc(-50% + ${Math.sin(angulo) * distancia}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: "ease-out"
        });

        setTimeout(() => particula.remove(), 650);
    }
});

// Inicia a animação.
animarCursor();
