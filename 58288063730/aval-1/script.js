<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Jogo da Velha JS</title>

<style>
  body {
    font-family: Arial;
    text-align: center;
    margin-top: 50px;
  }

  .tabuleiro {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    gap: 5px;
    justify-content: center;
  }

  .casa {
    width: 80px;
    height: 80px;
    font-size: 2rem;
    cursor: pointer;
  }
</style>

</head>
<body>

<h1>Jogo da Velha</h1>

<div class="tabuleiro">
  <button class="casa"></button>
  <button class="casa"></button>
  <button class="casa"></button>

  <button class="casa"></button>
  <button class="casa"></button>
  <button class="casa"></button>

  <button class="casa"></button>
  <button class="casa"></button>
  <button class="casa"></button>
</div>

<p id="status">Vez do jogador: X</p>

<script>
  const casas = document.querySelectorAll(".casa");
  const status = document.getElementById("status");

  let jogador = "X";
  let jogoAtivo = true;

  const combinacoes = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  casas.forEach((casa, index) => {
    casa.addEventListener("click", () => jogar(casa, index));
  });

  function jogar(casa, index) {
    if (casa.textContent !== "" || !jogoAtivo) return;

    casa.textContent = jogador;

    if (verificarVencedor()) {
      status.textContent = "Jogador " + jogador + " venceu!";
      jogoAtivo = false;
      return;
    }

    if ([...casas].every(c => c.textContent !== "")) {
      status.textContent = "Empate!";
      jogoAtivo = false;
      return;
    }

    jogador = jogador === "X" ? "O" : "X";
    status.textContent = "Vez do jogador: " + jogador;
  }

  function verificarVencedor() {
    return combinacoes.some(comb => {
      const [a, b, c] = comb;
      return casas[a].textContent &&
             casas[a].textContent === casas[b].textContent &&
             casas[a].textContent === casas[c].textContent;
    });
  }
</script>

</body>
</html>