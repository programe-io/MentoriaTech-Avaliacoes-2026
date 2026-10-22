// Função para testar typeof nos diferentes tipos de dados
function testarTypeof() {
  const exString = "Olá, JS!";
  const exNumber = 10.5;
  const exBoolean = true;
  let exUndefined;
  const exNull = null;

  const resultado = `
    "Olá, JS!" é: ${typeof exString} | 
    10.5 é: ${typeof exNumber} | 
    true é: ${typeof exBoolean} | 
    Sem valor é: ${typeof exUndefined} | 
    null retorna: ${typeof exNull}
  `;

  document.getElementById('res-typeof').innerText = resultado;
}

// Função para testar igualdade simples vs igualdade estrita
function testarComparacao() {
  const valor1 = 10;
  const valor2 = '10';

  const comparacaoSimples = (valor1 == valor2);   // true (compara apenas valor)
  const comparacaoEstrita = (valor1 === valor2); // false (compara valor e tipo)

  const textoResultado = `
    Comparando 10 == '10': ${comparacaoSimples} (Considera apenas o valor)
    Comparando 10 === '10': ${comparacaoEstrita} (Considera o tipo: Number vs String)
  `;

  document.getElementById('res-comparacao').innerText = textoResultado;
}