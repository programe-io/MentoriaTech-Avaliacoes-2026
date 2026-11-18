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
      width: 220px;
    }
    #visor {
      width: 100%;
      height: 40px;
      font-size: 1.2rem;
      text-align: right;
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
    }
  </style>
</head>
<body>

  <div class="calculadora">
    <input type="text" id="visor" disabled>
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
      <button onclick="limpar()">C</button>
      <button onclick="calcular()">=</button>
      <button onclick="adicionar('+')">+</button>
    </div>
  </div>

  <script>
    const visor = document.getElementById('visor');

    function adicionar(valor) {
      visor.value += valor;
    }

    function limpar() {
      visor.value = '';
    }

    function calcular() {
      try {
        // O eval processa a expressão matemática contida na string do visor
        visor.value = eval(visor.value);
      } catch (e) {
        visor.value = 'Erro';
      }
    }
  </script>

</body>
</html>