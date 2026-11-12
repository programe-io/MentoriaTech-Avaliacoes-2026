const canvas = document.getElementById("particulas");
const ctx = canvas.getContext("2d");

let particulas = [];

function ajustarTela() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", ajustarTela);
ajustarTela();

class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamanho = Math.random() * 3 + 1;
        this.velocidadeX = Math.random() * 2 - 1;
        this.velocidadeY = Math.random() * 2 - 1;
    }

    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff";
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        if (this.x < 0 || this.x > canvas.width) {
            this.velocidadeX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.velocidadeY *= -1;
        }

        this.desenhar();
    }
}

for (let i = 0; i < 100; i++) {
    particulas.push(new Particula());
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach(particula => {
        particula.atualizar();
    });

    requestAnimationFrame(animar);
}

animar();

document.getElementById("botao").addEventListener("click", () => {
    document.getElementById("mensagem").textContent =
        "✨ Você entrou no universo neon!";
});