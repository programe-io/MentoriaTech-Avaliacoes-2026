<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Calculadora Simples</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
    }
    .calculadora {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 250px;
    }
    #tela {
      width: 100%;
      height: 40px;
      text-align: right;
      font-size: 1.2rem;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 5px;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }
    button {
      padding: 15px;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      background-color: #e0e0e0;
      border-radius: 4px;
    }
    button:hover {
      background-color: #d0d0d0;
    }
    .igual {
      grid-column: span 2;
      background-color: #4CAF50;
      color: white;
    }
    .limpar {
      grid-column: span 2;
      background-color: #f44336;
      color: white;
    }
  </style>
</head>
<body>

  <div class="calculadora">
    <input type="text" id="tela" disabled>
    <div class="botoes">
      <button onclick="adicionar('7')">7</button>
      <button onclick="adicionar('8')">8</button>
      <button onclick="adicionar('9')">9</button>
      <button onclick="adicionar('/')">/</button>

      <button onclick="adicionar('4')">4</button>
      <button onclick="adicionar('5')">5</button>
      <button onclick="adicionar('6')">6</button>
      <button onclick="adicionar('*')">*</button>

      <button onclick="adicionar('1')">1</button>
      <button onclick="adicionar('2')">2</button>
      <button onclick="adicionar('3')">3</button>
      <button onclick="adicionar('-')">-</button>

      <button onclick="adicionar('0')">0</button>
      <button onclick="adicionar('.')">.</button>
      <button onclick="adicionar('+')">+</button>
      <button onclick="calcular()">=</button>

      <button class="limpar" onclick="limpar()">Limpar</button>
    </div>
  </div>

  <script>
    const tela = document.getElementById('tela');

    function adicionar(valor) {
      tela.value += valor;
    }

    function limpar() {
      tela.value = '';
    }

    function calcular() {
      try {
        // eval processa a string matemática
        tela.value = eval(tela.value);
      } catch (e) {
        tela.value = 'Erro';
      }
    }
  </script>

</body>
</html>