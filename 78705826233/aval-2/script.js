// Captura dos elementos do DOM
const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");
const txtPontos = document.getElementById("txtPontos");
const txtVidas = document.getElementById("txtVidas");
const btnReiniciar = document.getElementById("btnReiniciar");
const txtInstrucoes = document.getElementById("txtInstrucoes");

// Variáveis de Controle do Estado do Jogo
let pontos = 0;
let vidas = 3;
let jogoAtivo = true;
let listaBananas = [];
let frequenciaBanana = 0.02; 
let velocidadeQueda = 3;

// Monitoramento do estado do Teclado
let teclas = { Left: false, Right: false };

// Propriedades do Macaco Coletor
const coletor = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 90, 
    largura: 80,
    altura: 80,
    velocidadeTeclado: 7
};

/* ==========================================================================
   CONTROLES DO JOGADOR (MOUSE & TECLADO)
   ========================================================================== */

// Evento: Movimento do Mouse
canvas.addEventListener("mousemove", (e) => {
    if (!jogoAtivo) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    coletor.x = mouseX - coletor.largura / 2;
    limitarBordascoletor();
});

// Evento: Tecla Pressionada
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") teclas.Left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") teclas.Right = true;
});

// Evento: Tecla Solta
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") teclas.Left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") teclas.Right = false;
});

function limitarBordascoletor() {
    if (coletor.x < 0) coletor.x = 0;
    if (coletor.x > canvas.width - coletor.largura) coletor.x = canvas.width - coletor.largura;
}

/* ==========================================================================
   MECÂNICAS E LOOP DO JOGO
   ========================================================================== */

function iniciarJogo() {
    pontos = 0;
    vidas = 3;
    listaBananas = [];
    frequenciaBanana = 0.02;
    velocidadeQueda = 3;
    jogoAtivo = true;

    txtPontos.innerText = pontos;
    txtVidas.innerText = "♥♥♥";
    txtInstrucoes.style.visibility = "visible";
    btnReiniciar.style.display = "none";
    canvas.style.cursor = "none"; // Esconde a seta do mouse durante a partida

    loop();
}

function criarBanana() {
    if (Math.random() < frequenciaBanana) {
        listaBananas.push({
            x: Math.random() * (canvas.width - 30),
            y: -30,
            tamanho: 30
        });
    }
}

function atualizarLogica() {
    if (!jogoAtivo) return;

    // Atualiza movimento via teclado, se ativo
    if (teclas.Left) {
        coletor.x -= coletor.velocidadeTeclado;
        limitarBordascoletor();
    }
    if (teclas.Right) {
        coletor.x += coletor.velocidadeTeclado;
        limitarBordascoletor();
    }

    criarBanana();

    // Loop reverso para gerenciar remoção segura de arrays
    for (let i = listaBananas.length - 1; i >= 0; i--) {
        let b = listaBananas[i];
        b.y += velocidadeQueda;

        // Detector de colisão com o coletor
        if (b.x < coletor.x + coletor.largura &&
            b.x + b.tamanho > coletor.x &&
            b.y < coletor.y + coletor.altura &&
            b.y + b.tamanho > coletor.y) {
            
            listaBananas.splice(i, 1);
            pontos++;
            txtPontos.innerText = pontos;

            // Aumento progressivo de dificuldade
            if (pontos % 5 === 0) {
                velocidadeQueda += 0.5;
                frequenciaBanana += 0.005;
            }
            continue;
        }

        // Detector de queda livre no chão (perda de vida)
        if (b.y > canvas.height) {
            listaBananas.splice(i, 1);
            vidas--;
            atualizarVidasVisuais();

            if (vidas <= 0) {
                fimDeJogo();
            }
        }
    }
}

function atualizarVidasVisuais() {
    let coracoes = "";
    for (let i = 0; i < vidas; i++) coracoes += "♥";
    txtVidas.innerText = coracoes === "" ? "GAME OVER" : coracoes;
}

/* ==========================================================================
   RENDERIZAÇÃO GRÁFICA (CANVAS 2D)
   ========================================================================== */

function desenharTudo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Nuvens decorativas de fundo
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.beginPath(); ctx.arc(100, 80, 30, 0, Math.PI*2); ctx.arc(140, 80, 40, 0, Math.PI*2); ctx.arc(180, 80, 30, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(360, 120, 25, 0, Math.PI*2); ctx.arc(395, 120, 35, 0, Math.PI*2); ctx.arc(430, 120, 25, 0, Math.PI*2); ctx.fill();

    // Desenha as bananas caindo
    listaBananas.forEach(b => {
        ctx.fillStyle = "#ffe066";
        ctx.strokeStyle = "#e6b800";
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(b.x + 15, b.y + 15, 14, 0.2 * Math.PI, 1.2 * Math.PI);
        ctx.arc(b.x + 18, b.y + 12, 12, 1.2 * Math.PI, 0.2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#65330e";
        ctx.fillRect(b.x + 5, b.y + 5, 4, 4);
    });

    // Desenha o Macaco Coletor Neutro
    // Cabeça
    ctx.fillStyle = "#8B4513"; 
    ctx.beginPath();
    ctx.arc(coletor.x + 40, coletor.y + 40, 35, 0, Math.PI * 2); 
    ctx.fill();

    // Orelhas
    ctx.beginPath();
    ctx.arc(coletor.x + 10, coletor.y + 30, 12, 0, Math.PI * 2); 
    ctx.arc(coletor.x + 70, coletor.y + 30, 12, 0, Math.PI * 2); 
    ctx.fill();
    
    ctx.fillStyle = "#DEB887"; 
    ctx.beginPath();
    ctx.arc(coletor.x + 10, coletor.y + 30, 6, 0, Math.PI * 2);
    ctx.arc(coletor.x + 70, coletor.y + 30, 6, 0, Math.PI * 2);
    ctx.fill();

    // Máscara Facial Bege
    ctx.beginPath();
    ctx.arc(coletor.x + 30, coletor.y + 45, 18, 0, Math.PI * 2);
    ctx.arc(coletor.x + 50, coletor.y + 45, 18, 0, Math.PI * 2);
    ctx.arc(coletor.x + 40, coletor.y + 55, 18, 0, Math.PI * 2);
    ctx.fill();

    // Olhos
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(coletor.x + 32, coletor.y + 40, 4, 0, Math.PI * 2);
    ctx.arc(coletor.x + 48, coletor.y + 40, 4, 0, Math.PI * 2);
    ctx.fill();

    // Sorriso
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(coletor.x + 40, coletor.y + 52, 10, 0, Math.PI);
    ctx.stroke();
}

/* ==========================================================================
   GERENCIAMENTO DE FIM DE JOGO
   ========================================================================== */

function fimDeJogo() {
    jogoAtivo = false;
    txtInstrucoes.style.visibility = "hidden";
    btnReiniciar.style.display = "inline-block";
    canvas.style.cursor = "default"; // Traz o cursor de volta

    // Cortina de overlay escurecedora
    ctx.fillStyle = "rgba(40, 20, 5, 0.92)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto Centralizado de Game Over
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 32px 'Fredoka One'";
    ctx.textAlign = "center";
    ctx.fillText("FIM DE JOGO!", canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.fillStyle = "#fff";
    ctx.font = "20px 'Poppins'";
    ctx.fillText(`Você coletou ${pontos} bananas!`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.textAlign = "left"; 
}

function loop() {
    atualizarLogica();
    desenharTudo();
    if (jogoAtivo) {
        requestAnimationFrame(loop);
    }
}

function reiniciarJogo() {
    iniciarJogo();
}

// Inicia automaticamente o ciclo do jogo na primeira inicialização
iniciarJogo();