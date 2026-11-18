<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Calculadora Simples</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f9;
    }
    .calculadora {
      background: #222;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      width: 260px;
    }
    #display {
      width: 100%;
      height: 50px;
      font-size: 24px;
      text-align: right;
      margin-bottom: 12px;
      padding: 8px;
      box-sizing: border-box;
      border: none;
      border-radius: 6px;
      background: #fff;
      color: #111;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    button {
      height: 48px;
      font-size: 18px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #444;
      color: #fff;
    }
    button:hover {
      background: #555;
    }
    .operador {
      background: #ff9500;
    }
    .operador:hover {
      background: #e08600;
    }
    .limpar {
      background: #d9534f;
      grid-column: span 4;
    }
    .limpar:hover {
      background: #c9302c;
    }
  </style>
</head>
<body>
  <div class="calculadora">
    <input type="text" id="display" readonly />
    <div class="botoes">
      <button onclick="adicionar('7')">7</button>
      <button onclick="adicionar('8')">8</button>
      <button onclick="adicionar('9')">9</button>
      <button class="operador" onclick="adicionar('/')">/</button>

      <button onclick="adicionar('4')">4</button>
      <button onclick="adicionar('5')">5</button>
      <button onclick="adicionar('6')">6</button>
      <button class="operador" onclick="adicionar('*')">*</button>

      <button onclick="adicionar('1')">1</button>
      <button onclick="adicionar('2')">2</button>
      <button onclick="adicionar('3')">3</button>
      <button class="operador" onclick="adicionar('-')">-</button>

      <button onclick="adicionar('0')">0</button>
      <button onclick="adicionar('.')">.</button>
      <button class="operador" onclick="calcular()">=</button>
      <button class="operador" onclick="adicionar('+')">+</button>

      <button class="limpar" onclick="limpar()">C</button>
    </div>
  </div>

  <script>
    const display = document.getElementById("display");

    function adicionar(valor) {
      display.value += valor;
    }

    function limpar() {
      display.value = "";
    }

    function calcular() {
      const expressao = display.value.trim();
      if (!expressao) return;

      // Permite apenas dígitos, operadores básicos, ponto e espaços
      if (!/^[0-9+\-*/.\s]+$/.test(expressao)) {
        display.value = "Erro";
        return;
      }

      try {
        const resultado = Function(`"use strict"; return (${expressao})`)();
        if (!Number.isFinite(resultado)) {
          display.value = "Erro";
          return;
        }
        display.value = resultado;
      } catch {
        display.value = "Erro";
      }
    }
  </script>
</body>
</html>