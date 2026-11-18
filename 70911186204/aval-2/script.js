<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Calculadora JS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f4f4f9;
    }
    .calculadora {
      background: #222;
      padding: 20px;
      border-radius: 10px;
      width: 260px;
    }
    #visor {
      width: 100%;
      height: 50px;
      font-size: 1.5rem;
      text-align: right;
      margin-bottom: 12px;
      padding: 8px;
      box-sizing: border-box;
      border: none;
      border-radius: 5px;
      background: #fff;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    button {
      height: 45px;
      font-size: 1.1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background: #444;
      color: #fff;
    }
    button:hover {
      background: #666;
    }
    .operador {
      background: #ff9500;
    }
    .operador:hover {
      background: #e08200;
    }
    .igual {
      background: #28a745;
      grid-column: span 2;
    }
    .limpar {
      background: #dc3545;
    }
  </style>
</head>
<body>
  <div class="calculadora">
    <input type="text" id="visor" readonly value="0" />
    <div class="botoes">
      <button class="limpar" onclick="limpar()">C</button>
      <button onclick="apagar()">←</button>
      <button class="operador" onclick="escolherOperador('/')">/</button>
      <button class="operador" onclick="escolherOperador('*')">*</button>

      <button onclick="adicionarNumero('7')">7</button>
      <button onclick="adicionarNumero('8')">8</button>
      <button onclick="adicionarNumero('9')">9</button>
      <button class="operador" onclick="escolherOperador('-')">-</button>

      <button onclick="adicionarNumero('4')">4</button>
      <button onclick="adicionarNumero('5')">5</button>
      <button onclick="adicionarNumero('6')">6</button>
      <button class="operador" onclick="escolherOperador('+')">+</button>

      <button onclick="adicionarNumero('1')">1</button>
      <button onclick="adicionarNumero('2')">2</button>
      <button onclick="adicionarNumero('3')">3</button>
      <button onclick="adicionarNumero('.')">.</button>

      <button onclick="adicionarNumero('0')">0</button>
      <button class="igual" onclick="calcular()">=</button>
    </div>
  </div>

  <script>
    const visor = document.getElementById("visor");
    let numeroAtual = "0";
    let numeroAnterior = null;
    let operador = null;
    let reiniciarVisor = false;

    function atualizarVisor() {
      visor.value = numeroAtual;
    }

    function adicionarNumero(digito) {
      if (reiniciarVisor) {
        numeroAtual = digito === "." ? "0." : digito;
        reiniciarVisor = false;
      } else {
        if (digito === "." && numeroAtual.includes(".")) return;
        numeroAtual = numeroAtual === "0" && digito !== "." ? digito : numeroAtual + digito;
      }
      atualizarVisor();
    }

    function escolherOperador(op) {
      if (operador !== null && !reiniciarVisor) {
        calcular();
      }
      numeroAnterior = parseFloat(numeroAtual);
      operador = op;
      reiniciarVisor = true;
    }

    function calcular() {
      if (operador === null || numeroAnterior === null) return;
      const atual = parseFloat(numeroAtual);
      let resultado;

      switch (operador) {
        case "+":
          resultado = numeroAnterior + atual;
          break;
        case "-":
          resultado = numeroAnterior - atual;
          break;
        case "*":
          resultado = numeroAnterior * atual;
          break;
        case "/":
          resultado = atual === 0 ? "Erro" : numeroAnterior / atual;
          break;
        default:
          return;
      }

      numeroAtual = String(resultado);
      numeroAnterior = null;
      operador = null;
      reiniciarVisor = true;
      atualizarVisor();
    }

    function limpar() {
      numeroAtual = "0";
      numeroAnterior = null;
      operador = null;
      reiniciarVisor = false;
      atualizarVisor();
    }

    function apagar() {
      if (reiniciarVisor) return;
      numeroAtual = numeroAtual.length > 1 ? numeroAtual.slice(0, -1) : "0";
      atualizarVisor();
    }
  </script>
</body>
</h