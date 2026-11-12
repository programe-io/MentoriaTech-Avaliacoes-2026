// EFEITO MATRIX

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let colunas = [];
let tamanho = 16;

function ajustarTela() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const quantidade = Math.floor(canvas.width / tamanho);

    colunas = Array(quantidade).fill(0);
}

window.addEventListener("resize", ajustarTela);
ajustarTela();

function desenharMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = tamanho + "px monospace";

    colunas.forEach((y, i) => {
        const letra = String.fromCharCode(
            33 + Math.random() * 90
        );

        ctx.fillText(
            letra,
            i * tamanho,
            y * tamanho
        );

        if (y * tamanho > canvas.height && Math.random() > 0.975) {
            colunas[i] = 0;
        }

        colunas[i]++;
    });

    requestAnimationFrame(desenharMatrix);
}

desenharMatrix();


// TERMINAL INTERATIVO

const saida = document.getElementById("saida");
const comando = document.getElementById("comando");

function escrever(texto, cor = "#00ff41") {
    const linha = document.createElement("p");

    linha.textContent = texto;
    linha.style.color = cor;

    saida.appendChild(linha);
    saida.scrollTop = saida.scrollHeight;
}

function executar() {
    const texto = comando.value.trim().toLowerCase();

    if (!texto) return;

    escrever("root@matrix:~$ " + texto, "#ffffff");

    switch (texto) {
        case "help":
            escrever("COMANDOS DISPONÍVEIS:");
            escrever("help - Mostrar comandos");
            escrever("status - Ver status do sistema");
            escrever("date - Mostrar data e hora");
            escrever("hello - Enviar saudação");
            escrever("clear - Limpar terminal");
            break;

        case "status":
            escrever("Sistema: ONLINE");
            escrever("Simulação: ATIVA");
            escrever("Segurança: DEMONSTRAÇÃO");
            break;

        case "date":
            escrever(new Date().toLocaleString("pt-BR"));
            break;

        case "hello":
            escrever("Bem-vindo, operador! 🚀");
            break;

        case "clear":
            saida.innerHTML = "";
            break;

        default:
            escrever("Comando não reconhecido!", "#ff4444");
    }

    comando.value = "";
    comando.focus();
}

comando.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        executar();
    }
});