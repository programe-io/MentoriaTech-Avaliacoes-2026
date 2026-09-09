// Função que recebe a idade e retorna uma mensagem
function verificarIdade(nome, idade) {
  if (idade >= 18) {
    return `\${nome\} é maior de idade.`;
  \} else {
    return `\${nome\} é menor de idade.`;
  \}
\}

// Testando a função
console.log(verificarIdade("Maria", 20)); // Saída: Maria é maior de idade.
console.log(verificarIdade("João", 15));  // Saída: João é menor de idade.$0