<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora em JavaScript</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .calculadora {
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      width: 240px;
    }
    #visor {
      width: 100%;
      height: 45px;
      background: #222;
      color: #fff;
      font-size: 22px;
      text-align: right;
      padding: 0 10px;
      box-sizing: border-box;
      margin-bottom: 12px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    button {
      padding: 14px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      background: #e4e6eb;
      border-radius: 6px;
      font-weight: bold;
      transition: background 0.2s;
    }
    button:hover {
      background: #d8dadf;
    }
    .operador {
      background: #e7f3ff;
      color: #1877f2;
    }
    .operador:hover {
      background: #d0e8ff;
    }
    .igual {
      background: #2ecc71;
      color: white;
      grid-column: span 2;
    }
    .igual:hover {
      background: #27ae60;
    }
    .limpar {
      background: #ffebe8;
      color: #c0392b;
      grid-column: span 2;
    }
    .limpar:hover {
      background: #fde2de;
    }
  </style>
</head>
<body>

  <div class="calculadora">
    <div id="visor">0</div>
    <div class="botoes">
      <button class="limpar" onclick="limpar()">C</button>
      <button class="operador" onclick="adicionar('/')">/</button>
      <button class="operador" onclick="adicionar('*')">*</button>
      
      <button onclick="adicionar('7')">7</button>
      <button onclick="adicionar('8')">8</button>
      <button onclick="adicionar('9')">9</button>
      <button class="operador" onclick="adicionar('-')">-</button>
      
      <button onclick="adicionar('4')">4</button>
      <button onclick="adicionar('5')">5</button>
      <button onclick="adicionar('6')">6</button>
      <button class="operador" onclick="adicionar('+')">+</button>
      
      <button onclick="adicionar('1')">1</button>
      <button onclick="adicionar('2')">2</button>
      <button onclick="adicionar('3')">3</button>
      <button class="igual" onclick="calcular()">=</button>
      
      <button onclick="adicionar('0')" style="grid-column: span 2;">0</button>
      <button onclick="adicionar('.')">.</button>
    </div>
  </div>

  <script>
    const visor = document.getElementById('visor');

    // Função para adicionar números e operadores na tela
    function adicionar(valor) {
      if (visor.textContent === '0' && valor !== '.') {
        visor.textContent = valor;
      } else {
        visor.textContent += valor;
      }
    }

    // Função para limpar o visor
    function limpar() {
      visor.textContent = '0';
    }

    // Função que calcula o resultado usando eval()
    function calcular() {
      try {
        visor.textContent = eval(visor.textContent);
      } catch (erro) {
        visor.textContent = 'Erro';
      }
    }
  </script>

</body>
</html>