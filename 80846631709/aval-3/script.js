
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jogo da Cobrinha</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #101827;
      color: white;
      font-family: Arial, sans-serif;
    }

    .jogo {
      text-align: center;
      padding: 20px;
    }

    h1 {
      color: #4ade80;
      margin-bottom: 10px;
    }

    .pontuacao {
      font-size: 20px;
      margin: 15px;
    }

    canvas {
      display: block;
      width: min(400px, 85vw);
      height: min(400px, 85vw);
      background: #1e293b;
      border: 3px solid #4ade80;
      border-radius: 8px;
    }

    button {
      margin-top: 18px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      background: #4ade80;
      color: #101827;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: #22c55e;
    }

    p {
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <div class="jogo">
    <h1>🐍 Cobrinha</h1>
    <div class="pontuacao">
      Pontuação: <span id="pontos">0</span>
    </div>

    <canvas id="tabuleiro" width="400" height="400"></canvas>

    <button id="reiniciar">Jogar novamente</button>
    <p>Use as setas do teclado para movimentar.</p>
  </div>

  <script>
    const canvas = document.getElementById("tabuleiro");
    const ctx = canvas.getContext("2d");
    const pontosEl = document.getElementById("pontos");
    const botao = document.getElementById("reiniciar");

    const tamanho = 20;
    const quantidade = canvas.width / tamanho;

    let cobrinha;
    let comida;
    let dx;
    let dy;
    let pontos;
    let intervalo;
    let jogoAtivo;
    let proximaDirecao;

    function iniciarJogo() {
      cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ];

      dx = 1;
      dy = 0;
      proximaDirecao = { dx: 1, dy: 0 };
      pontos = 0;
      jogoAtivo = true;

      pontosEl.textContent = pontos;
      criarComida();

      clearInterval(intervalo);
      desenhar();
      intervalo = setInterval(atualizar, 120);
    }

    function criarComida() {
      do {
        comida = {
          x: Math.floor(Math.random() * quantidade),
          y: Math.floor(Math.random() * quantidade)
        };
      } while (
        cobrinha.some(p => p.x === comida.x && p.y === comida.y)
      );
    }

    document.addEventListener("keydown", (e) => {
      const teclas = {
        ArrowUp:    { dx: 0, dy: -1 },
        ArrowDown:  { dx: 0, dy: 1 },
        ArrowLeft:  { dx: -1, dy: 0 },
        ArrowRight: { dx: 1, dy: 0 },
        w: { dx: 0, dy: -1 },
        s: { dx: 0, dy: 1 },
        a: { dx: -1, dy: 0 },
        d: { dx: 1, dy: 0 }
      };

      const direcao = teclas[e.key];
      if (!direcao) return;

      e.preventDefault();

      if (
        direcao.dx === -dx &&
        direcao.dy === -dy
      ) return;

      proximaDirecao = direcao;
    });

    function atualizar() {
      if (!jogoAtivo) return;

      dx = proximaDirecao.dx;
      dy = proximaDirecao.dy;

      const cabeca = {
        x: cobrinha[0].x + dx,
        y: cobrinha[0].y + dy
      };

      const comeu = cabeca.x === comida.x &&
                    cabeca.y === comida.y;

      const corpo = comeu
        ? cobrinha
        : cobrinha.slice(0, -1);

      const bateuNoCorpo = corpo.some(
        p => p.x === cabeca.x && p.y === cabeca.y
      );

      if (
        cabeca.x < 0 ||
        cabeca.y < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y >= quantidade ||
        bateuNoCorpo
      ) {
        fimDeJogo();
        return;
      }

      cobrinha.unshift(cabeca);

      if (comeu) {
        pontos += 10;
        pontosEl.textContent = pontos;
        criarComida();
      } else {
        cobrinha.pop();
      }

      desenhar();
    }

    function desenhar() {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grade do tabuleiro
      ctx.strokeStyle = "#293548";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < quantidade; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tamanho, 0);
        ctx.lineTo(i * tamanho, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * tamanho);
        ctx.lineTo(canvas.width, i * tamanho);
        ctx.stroke();
      }

      // Comida
      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      ctx.arc(
        comida.x * tamanho + tamanho / 2,
        comida.y * tamanho + tamanho / 2,
        tamanho / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Cobrinha
      cobrinha.forEach((parte, i) => {
        ctx.fillStyle = i === 0 ? "#86efac" : "#4ade80";
        ctx.fillRect(
          parte.x * tamanho + 1,
          parte.y * tamanho + 1,
          tamanho - 2,
          tamanho - 2
        );
      });

      // Olhos da cabeça
      const cabeca = cobrinha[0];
      ctx.fillStyle = "#14532d";

      const olhoX = cabeca.x * tamanho;
      const olhoY = cabeca.y * tamanho;

      if (dx !== 0) {
        ctx.fillRect(olhoX + (dx > 0 ? 13 : 4), olhoY + 5, 3, 3);
        ctx.fillRect(olhoX + (dx > 0 ? 13 : 4), olhoY + 12, 3, 3);
      } else {
        ctx.fillRect(olhoX + 5, olhoY + (dy > 0 ? 13 : 4), 3, 3);
        ctx.fillRect(olhoX + 12, olhoY + (dy > 0 ? 13 : 4), 3, 3);
      }
    }

    function fimDeJogo() {
      jogoAtivo = false;
      clearInterval(intervalo);

      desenhar();

      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.font = "bold 32px Arial";
      ctx.fillText("Fim de jogo!", 200, 180);

      ctx.font = "20px Arial";
      ctx.fillText(`Pontuação: ${pontos}`, 200, 220);
      ctx.font = "15px Arial";
      ctx.fillText("Clique em Jogar novamente", 200, 255);
    }

    botao.addEventListener("click", iniciarJogo);

    iniciarJogo();
  </script>
</body>
</html>
