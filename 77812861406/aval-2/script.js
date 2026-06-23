const canvas = document.getElementById("telaJogo");
const ctx = canvas.getContext("2d");

// Elementos da Interface
const txtMoedas = document.getElementById("txt-moedas");
const txtFerramenta = document.getElementById("txt-ferramenta");
const txtSemente = document.getElementById("txt-semente");
const txtQtdTrigo = document.getElementById("qtd-trigo");
const txtTimer = document.getElementById("timer");

// Variáveis do Jogo
let moedas = 100;
let ferramentaAtual = "Enxada";
let sementesTrigo = 5;
let segundos = 0;
const META = 5000;

// Configuração do Lote de Terra (Grade 4x4)
const TAMANHO_BLOCO = 60;
const LINHAS = 4;
const COLUNAS = 4;
const OFFSET_X = 80;
const OFFSET_Y = 80;
let grade = [];

// Jogador
const player = { x: 200, y: 200, tamanho: 20 };

// Inicializa a grade (0: Grama, 1: Terra Arada, 2: Plantado, 3: Pronto)
for (let l = 0; l < LINHAS; l++) {
    grade[l] = [];
    for (let c = 0; c < COLUNAS; c++) {
        grade[l][c] = { estado: 0, progresso: 0 };
    }
}

// Cronômetro do Header
setInterval(() => {
    if (moedas < META) {
        segundos++;
        let m = Math.floor(segundos / 60).toString().padStart(2, "0");
        let s = (segundos % 60).toString().padStart(2, "0");
        txtTimer.innerText = `${m}:${s}`;
    }
}, 1000);

// Seguir o mouse suavemente
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left - player.tamanho / 2;
    player.y = e.clientY - rect.top - player.tamanho / 2;
});

// Clique para interagir
canvas.addEventListener("mousedown", () => {
    if (moedas >= META) return;

    let centroX = player.x + player.tamanho / 2;
    let centroY = player.y + player.tamanho / 2;
    
    let c = Math.floor((centroX - OFFSET_X) / TAMANHO_BLOCO);
    let l = Math.floor((centroY - OFFSET_Y) / TAMANHO_BLOCO);

    if (l >= 0 && l < LINHAS && c >= 0 && c < COLUNAS) {
        let bloco = grade[l][c];

        if (ferramentaAtual === "Enxada") {
            if (bloco.estado === 0) {
                bloco.estado = 1; // Ara a terra
            } else if (bloco.estado === 1 && sementesTrigo > 0) {
                bloco.estado = 2; // Planta trigo
                bloco.progresso = 0;
                sementesTrigo--;
            } else if (bloco.estado === 3) {
                bloco.estado = 0; // Colhe
                moedas += 25; // Valor da venda
            }
        } else if (ferramentaAtual === "Regador" && bloco.estado === 2) {
            bloco.progresso += 25; // Acelera o crescimento
            if (bloco.progresso >= 100) bloco.estado = 3;
        }
        atualizarHUD();
    }
});

// Troca de ferramentas por teclas
window.addEventListener("keydown", (e) => {
    if (e.key === "1") { ferramentaAtual = "Enxada"; txtFerramenta.innerText = "Enxada"; }
    if (e.key === "2") { ferramentaAtual = "Regador"; txtFerramenta.innerText = "Regador"; }
});

// Mercado
document.getElementById("btn-comprar-trigo").addEventListener("click", () => {
    if (moedas >= 10) {
        moedas -= 10;
        sementesTrigo++;
        atualizarHUD();
    }
});

function atualizarHUD() {
    txtMoedas.innerText = moedas;
    txtQtdTrigo.innerText = sementesTrigo;
}

// Loop Principal do Jogo
function loop() {
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a Grade
    for (let l = 0; l < LINHAS; l++) {
        for (let c = 0; c < COLUNAS; c++) {
            let bloco = grade[l][c];
            let x = OFFSET_X + c * TAMANHO_BLOCO;
            let y = OFFSET_Y + l * TAMANHO_BLOCO;

            if (bloco.estado === 0) ctx.fillStyle = "#27ae60"; 
            if (bloco.estado === 1) ctx.fillStyle = "#8d6e63"; 
            if (bloco.estado === 2) ctx.fillStyle = "#a1887f"; 
            if (bloco.estado === 3) ctx.fillStyle = "#f1c40f"; 

            ctx.fillRect(x, y, TAMANHO_BLOCO - 4, TAMANHO_BLOCO - 4);

            // Crescimento passivo
            if (bloco.estado === 2) {
                bloco.progresso += 0.05;
                if (bloco.progresso >= 100) bloco.estado = 3;
                
                ctx.fillStyle = "#2ecc71";
                ctx.fillRect(x + 25, y + 25, 10, 10);
            }
        }
    }

    // Desenha o Fazendeiro
    ctx.fillStyle = "#3498db";
    ctx.fillRect(player.x, player.y, player.tamanho, player.tamanho);

    // Tela de Vitória
    if (moedas >= META) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.fillText("🏆 Vitória! Meta Atingida!", 80, 200);
    }

    requestAnimationFrame(loop);
}

loop();