// 1. Variáveis: Caixas para guardar dados (Texto, Números, Booleanos)
let nomeUsuario = "Carlos"; 
const idadeMinima = 18; 

// 2. Funções: Blocos de código que executam uma tarefa específica quando chamados
function verificarAcesso(idade) {
    // 3. Condicionais (if/else): Tomada de decisão
    if (idade >= idadeMinima) {
        return "Acesso permitido para " + nomeUsuario;
    \} else {
        return "Acesso negado.";
    \}
\}

// 4. Execução: Chamando a função e exibindo o resultado no console de testes do navegador
console.log(verificarAcesso(20)); // Saída: Acesso permitido para Carlos$0