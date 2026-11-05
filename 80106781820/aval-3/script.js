/*
  O JavaScript adiciona inteligência, lógica e interatividade
  às páginas web (ele faz as coisas acontecerem).
*/

// 1. VARIÁVEIS (Caixas para guardar dados na memória)
let contador = 0; // Armazena um número que vai mudar ao longo do tempo
const limiteMaximo = 10; // "const" cria uma variável cujo valor é fixo e não muda

// 2. FUNÇÃO (Um bloco de código que executa uma tarefa quando é chamado)
function registrarClique() {
  
  // Aumenta o valor da variável "contador" em +1 toda vez que a função roda
  contador = contador + 1;
  
  // 3. CONDICIONAL (Tomada de decisão usando IF / ELSE)
  if (contador >= limiteMaximo) {
    
    // Mostra um aviso popup na tela do usuário se atingir o limite
    alert("Você atingiu o limite máximo de cliques!");
    
    // Reseta o contador de volta para zero
    contador = 0; 
    
  } else {
    
    // Imprime uma mensagem com o valor atual no console de desenvolvedor do navegador
    console.log("O botão foi clicado " + contador + " vezes.");
    
  }
}

// 4. DOM (Conectar o JavaScript com os elementos visuais do HTML)
// Procura no HTML um elemento que tenha o id="meuBotao"
const botaoDoSite = document.getElementById("meuBotao");

// Fica "ouvindo" o botão. Quando o usuário clicar nele, a função registrarClique é executada
botaoDoSite.addEventListener("click", registrarClique);
