HTML
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora Simples</title>
  <style>
    /* Estilos CSS embutidos */
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    \}

    .calculadora {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 260px;
    \}

    #display {
      width: 100%;
      height: 50px;
      background-color: #222;
      color: #fff;
      font-size: 24px;
      text-align: right;
      padding: 0 10px;
      box-sizing: border-box;
      border: none;
      border-radius: 6px;
      margin-bottom: 15px;
    \}

    .teclado {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    \}

    button {
      padding: 15px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      background-color: #e0e0e0;
      transition: background-color 0.2s;
    \}

    button:hover {
      background-color: #d4d4d4;
    \}

    .operador {
      background-color: #ff9500;
      color: white;
    \}

    .operador:hover {
      background-color: #e08500;
    \}

    .igual {
      background-color: #34c759;
      color: white;
      grid-column: span 2;
    \}

    .igual:hover {
      background-color: #2db84d;
    \}

    .limpar {
      background-color: #ff3b30;
      color: white;
    \}

    .limpar:hover {
      background-color: #e03229;
    \}
  </style>
</head>
<body>

  <div class="calculadora">
    <!-- Visor da calculadora -->
    <input type="text" id="display" readonly>

    <!-- Teclado -->
    <div class="teclado">
      <button class="limpar" onclick="limparDisplay()">C</button>
      <button class="operador" onclick="adicionarValor('/')">/</button>
      <button class="operador" onclick="adicionarValor('*')">*</button>
      <button class="operador" onclick="adicionarValor('-')">-</button>

      <button onclick="adicionarValor('7')">7</button>
      <button onclick="adicionarValor('8')">8</button>
      <button onclick="adicionarValor('9')">9</button>
      <button class="operador" onclick="adicionarValor('+')">+</button>

      <button onclick="adicionarValor('4')">4</button>
      <button onclick="adicionarValor('5')">5</button>
      <button onclick="adicionarValor('6')">6</button>
      <button onclick="adicionarValor('.')">.</button>

      <button onclick="adicionarValor('1')">1</button>
      <button onclick="adicionarValor('2')">2</button>
      <button onclick="adicionarValor('3')">3</button>
      <button class="igual" onclick="calcular()">=</button>

      <button onclick="adicionarValor('0')" style="grid-column: span 2;">0</button>
    </div>
  </div>

  <script>
    // Funções JavaScript
    const display = document.getElementById('display');

    function adicionarValor(valor) {
      display.value += valor;
    \}

    function limparDisplay() {
      display.value = '';
    \}

    function calcular() {
      try {
        // A função eval calcula a expressão matemática escrita como texto no display
        display.value = eval(display.value);
      \} catch (erro) {
        display.value = 'Erro';
      \}
    \}
  </script>

</body>
</html>
Como separar caso sua plataforma exija blocos separados (HTML, CSS e JavaScript):
HTML:

HTML
<div class="calculadora">
  <input type="text" id="display" readonly>
  <div class="teclado">
    <button class="limpar" onclick="limparDisplay()">C</button>
    <button class="operador" onclick="adicionarValor('/')">/</button>
    <button class="operador" onclick="adicionarValor('*')">*</button>
    <button class="operador" onclick="adicionarValor('-')">-</button>
    <button onclick="adicionarValor('7')">7</button>
    <button onclick="adicionarValor('8')">8</button>
    <button onclick="adicionarValor('9')">9</button>
    <button class="operador" onclick="adicionarValor('+')">+</button>
    <button onclick="adicionarValor('4')">4</button>
    <button onclick="adicionarValor('5')">5</button>
    <button onclick="adicionarValor('6')">6</button>
    <button onclick="adicionarValor('.')">.</button>
    <button onclick="adicionarValor('1')">1</button>
    <button onclick="adicionarValor('2')">2</button>
    <button onclick="adicionarValor('3')">3</button>
    <button class="igual" onclick="calcular()">=</button>
    <button onclick="adicionarValor('0')" style="grid-column: span 2;">0</button>
  </div>
</div>
JavaScript:

JavaScript
const display = document.getElementById('display');

function adicionarValor(valor) {
  display.value += valor;
\}

function limparDisplay() {
  display.value = '';
\}

function calcular() {
  try {
    display.value = eval(display.value);
  \} catch (erro) {
    display.value = 'Erro';
  \}
\}
$0