
   <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora Simples</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .calculadora {
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 260px;
    }
    #visor {
      width: 100%;
      height: 50px;
      font-size: 1.5rem;
      text-align: right;
      margin-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #eee;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    button {
      height: 50px;
      font-size: 1.2rem;
      border: none;
      background-color: #e0e0e0;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background-color: #d5d5d5;
    }
    .operador {
      background-color: #ff9800;
      color: white;
    }
    .operador:hover {
      background-color: #e68a00;
    }
    .igual {
      background-color: #4CAF50;
      color: white;
      grid-column: span 2;
    }
    .igual:hover {
      background-color: #45a049;
    }
    .limpar {
      background-color: #f44336;
      color: white;
    }
    .limpar:hover {
      background-color: #d32f2f;
    }
  </style>
</head>
<body>

  <div class="calculadora">
    <input type="text" id="visor" disabled>
    <div class="botoes">
      <button class="limpar" onclick="limparVisor()">C</button>
      <button onclick="adicionar('/')">/</button>
      <button onclick="adicionar('*')">*</button>
      <button class="operador" onclick="apagarUltimo()">⌫</button>

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

    function adicionar(valor) {
      visor.value += valor;
    }

    function limparVisor() {
      visor.value = '';
    }

    function apagarUltimo() {
      visor.value = visor.value.slice(0, -1);
    }

    function calcular() {
      try {
        // eval() processa a string matemática no visor
        visor.value = eval(visor.value);
      } catch (e) {
        visor.value = 'Erro';
      }
    }
  </script>

</body>
</html>
