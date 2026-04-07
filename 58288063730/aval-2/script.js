<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Jogo da Velha</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 50px;
      background: #f0f0f0;
    }

    h1 {
      color: #333;
    }

    .tabuleiro {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      gap: 5px;
      justify-content: center;
      margin: 20px auto;
    }

    .casa {
      width: 100px;
      height: 100px;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2px solid #333;
      background: #fff;
      transition: background 0.3s;
    }

    .casa:hover {
      background: #ddd;
    }

    #status {
      margin-top: 20px;
      font-size: 1.2rem;
    }

    button {
      margin-top: 15px;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>

<h1>Jogo da Velha</h1>

<div class="tabuleiro">
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
  <div class="casa"></div>
</div>

<p id="status">Vez do jogador: X</p>
<button onclick="reiniciar()">Reiniciar</button>

<script>
  const casas = document.querySelectorAll(".casa");
  const status = document.getElementById("status");

  let jogador = "X"; // Começa o jogador X
  let jogoAtivo = true;

  // Combinações vencedoras
  const combinacoes = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  casas.forEach(casa => {
    casa.addEventListener("click", () => jogar(casa));
  });

  function jogar(casa) {
    if (casa.textContent !== "" || !jogoAtivo) return;

    casa.textContent = jogador;

    if (verificarVencedor()) {
      status.textContent = `Jogador ${jogador} venceu!`;
      jogoAtivo = false;
      return;
    }

    if ([...casas].every(c => c.textContent !== "")) {
      status.textContent = "Empate!";
      jogoAtivo = false;
      return;
    }

    jogador = jogador === "X" ? "O" : "X";
    status.textContent = `Vez do jogador: ${jogador}`;
  }

  function verificarVencedor() {
    return combinacoes.some(comb => {
      const [a, b, c] = comb;
      return casas[a].textContent &&
             casas[a].textContent === casas[b].textContent &&
             casas[a].textContent === casas[c].textContent;
    });
  }

  function reiniciar() {
    casas.forEach(c => c.textContent = "");
    jogador = "X";
    jogoAtivo = true;
    status.textContent = "Vez do jogador: X";
  }
</script>

</body>
</html>