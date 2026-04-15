function carregarAula(aula) {
  const conteudo = document.getElementById("conteudo");

  if (aula === "aula1") {
    conteudo.innerHTML = `
      <h2>1.01 Introdução à Lógica de Programação e JavaScript</h2>
      <p>Lógica de programação é a forma de organizar pensamentos para resolver problemas.</p>
      <p>JavaScript é uma linguagem usada para criar interatividade em sites.</p>
      <pre>
Exemplo:
console.log("Olá, mundo!");
      </pre>
    `;
  }

  if (aula === "aula2") {
    conteudo.innerHTML = `
      <h2>1.02 Variáveis e Tipos de Dados</h2>
      <p>Variáveis armazenam valores.</p>
      <pre>
let nome = "João";
let idade = 25;
let ativo = true;
      </pre>
      <p>Tipos principais: String, Number, Boolean</p>
    `;
  }

  if (aula === "aula3") {
    conteudo.innerHTML = `
      <h2>1.03 Operadores Aritméticos e Entrada de Dados</h2>
      <p>Operadores:</p>
      <ul>
        <li>+ (soma)</li>
        <li>- (subtração)</li>
        <li>* (multiplicação)</li>
        <li>/ (divisão)</li>
      </ul>

      <h3>Teste:</h3>
      <input type="number" id="num1" placeholder="Número 1">
      <input type="number" id="num2" placeholder="Número 2">
      <button onclick="somar()">Somar</button>

      <p id="resultado"></p>
    `;
  }
}

function somar() {
  const n1 = Number(document.getElementById("num1").value);
  const n2 = Number(document.getElementById("num2").value);
  const resultado = n1 + n2;

  document.getElementById("resultado").innerText = "Resultado: " + resultado;
}