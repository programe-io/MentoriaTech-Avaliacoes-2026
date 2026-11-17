// Cria uma variável para armazenar o valor do contador
let contador = 0;

// Função para incrementar o valor e exibir no console
function incrementar() {
    contador++;
    console.log(`O valor atual do contador é: ${contador}`);
}

// Função para decrementar o valor e exibir no console
function decrementar() {
    contador--;
    console.log(`O valor atual do contador é: ${contador}`);
}

// Testando as funções
incrementar(); // Saída: O valor atual do contador é: 1
incrementar(); // Saída: O valor atual do contador é: 2
decrementar(); // Saída: O valor atual do contador é: 1
