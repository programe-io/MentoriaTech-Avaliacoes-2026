// Função para gerar a tabuada de um número
function gerarTabuada(numero) {
  console.log(`=== Tabuada do ${numero} ===`);
  
  for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
  }
}

// Exemplo de uso:
gerarTabuada(5);
