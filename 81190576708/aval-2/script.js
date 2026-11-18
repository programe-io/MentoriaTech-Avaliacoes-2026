<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Calculadora Simples</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; justify-content: center; margin-top: 50px; }
    .calculadora { border: 2px solid #333; padding: 15px; border-radius: 8px; width: 220px; }
    input[type="text"] { width: 100%; height: 40px; font-size: 18px; text-align: right; margin-bottom: 10px; box-sizing: border-box; }
    .botoes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
    button { height: 40px; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>

  <div class="calculadora">
    <input type="text" id="display" disabled>
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
    const display = document.getElementById('display');

    function adicionar(valor) {
      display.value += valor;
    }

    function limpar() {
      display.value = '';
    }

    function calcular() {
      try {
        display.value = eval(display.value);
      } catch (e) {
        display.value = 'Erro';
      }
    }
  </script>

</body>
</html>
