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
      border-radius: 12px;
      width: 260px;
    }
    #visor {
      width: 100%;
      height: 50px;
      font-size: 1.6rem;
      text-align: right;
      margin-bottom: 12px;
      padding: 8px;
      box-sizing: border-box;
      border: none;
      border-radius: 6px;
      background: #fff;
    }
    .botoes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    button {
      height: 48px;
      font-size: 1.1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #3a3a3c;
      color: #fff;
    }
    button:hover {
      background: #505052;
    }
    button.operador {
      background: #ff9f0a;
    }
    button.igual {
      background: #30d158;
      grid-column: span 2;
    }
    button.limpar {
      background: #ff453a;
    }
  </style>
</head>
<body>
  <div class="calculadora">
    <input type="text" id="visor" value="0" readonly />
    <div class="botoes">
      <button class="limpar" data-acao="limpar">C</button>
      <button data-acao="apagar">⌫</button>
      <button class="operador" data-acao="operador" data-valor="/">÷</button>
      <button class="operador" data-acao="operador" data-valor="*">×</button>

      <button data-valor="7">7</button>
      <button data-valor="8">8</button>
      <button data-valor="9">9</button>
      <button class="operador" data-acao="operador" data-valor="-">−</button>

      <button data-valor="4">4</button>
      <button data-valor="5">5</button>
      <button data-valor="6">6</button>
      <button class="operador" data-acao="operador" data-valor="+">+</button>

      <button data-valor="1">1</button>
      <button data-valor="2">2</button>
      <button data-valor="3">3</button>
      <button class="igual" data-acao="calcular">=</button>

      <button data-valor="0">0</button>
      <button data-valor=".">.</button>
    </div>
  </div>

  <script>
    const visor = document.getElementById("visor");
    let primeiroNumero = null;
    let operador = null;
    let aguardandoSegundoNumero = false;

    function calcular(n1, op, n2) {
      const a = parseFloat(n1);
      const b = parseFloat(n2);
      if (op === "+") return a + b;
      if (op === "-") return a - b;
      if (op === "*") return a * b;
      if (op === "/") return b === 0 ? "Erro" : a / b;
      return b;
    }

    function inserirDigito(digito) {
      if (aguardandoSegundoNumero) {
        visor.value = digito === "." ? "0." : digito;
        aguardandoSegundoNumero = false;
        return;
      }
      if (digito === "." && visor.value.includes(".")) return;
      visor.value = visor.value === "0" && digito !== "." ? digito : visor.value + digito;
    }

    function definirOperador(novoOperador) {
      const valorAtual = visor.value;
      if (primeiroNumero !== null && operador && !aguardandoSegundoNumero) {
        const resultado = calcular(primeiroNumero, operador, valorAtual);
        visor.value = String(resultado);
        primeiroNumero = resultado === "Erro" ? null : resultado;
      } else {
        primeiroNumero = parseFloat(valorAtual);
      }
      operador = novoOperador;
      aguardandoSegundoNumero = true;
    }

    function finalizarCalculo() {
      if (primeiroNumero === null || !operador) return;
      const resultado = calcular(primeiroNumero, operador, visor.value);
      visor.value = String(resultado);
      primeiroNumero = null;
      operador = null;
      aguardandoSegundoNumero = true;
    }

    function limparTudo() {
      visor.value = "0";
      primeiroNumero = null;
      operador = null;
      aguardandoSegundoNumero = false;
    }

    function apagarUltimo() {
      if (aguardandoSegundoNumero) return;
      visor.value = visor.value.length > 1 ? visor.value.slice(0, -1) : "0";
    }

    document.querySelector(".botoes").addEventListener("click", (evento) => {
      const botao = evento.target.closest("button");
      if (!botao) return;

      const { acao, valor } = botao.dataset;
      if (!acao && valor) inserirDigito(valor);
      else if (acao === "operador") definirOperador(valor);
      else if (acao === "calcular") finalizarCalculo();
      else if (acao === "limpar") limparTudo();
      else if (acao === "apagar") apagarUltimo();
    });
  </script>
</body>
</html>
