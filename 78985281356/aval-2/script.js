// Declaração
let nome = "Maria";          // Pode mudar
const idade = 25;            // Não muda (constante)
var antigo = "evite usar";   // Forma antiga

// Tipos
let texto = "Olá";           // String
let numero = 10;             // Número
let booleano = true;         // Booleano (verdadeiro/falso)
let lista = [1, 2, 3, "a"];  // Array
let pessoa = {nome: "João", idade: 30}; // Objeto

// Exibir no console (F12 → Console)
console.log(nome);
let a = 10;
let b = 3;

console.log(a + b); // 13 (adição)
console.log(a - b); // 7  (subtração)
console.log(a * b); // 30 (multiplicação)
console.log(a / b); // 3.333... (divisão)
console.log(a % b); // 1  (resto da divisão)

// Concatenação de texto
let frase = "Olá, " + nome + "!"; // "Olá, Maria!"
// Condição
if (idade >= 18) {
  console.log("Maior de idade");
} else if (idade >= 12) {
  console.log("Adolescente");
} else {
  console.log("Criança");
}

// Repetição
for (let i = 1; i <= 5; i++) {
  console.log("Número " + i);
}

let contador = 1;
while (contador <= 5) {
  console.log(contador);
  contador++;
}// Declarar função
function saudacao(nome = "Visitante") {
  return "Olá, " + nome + "!";
}

// Chamar função
let mensagem = saudacao("Carlos");
console.log(mensagem); // "Olá, Carlos!"

// Função anônima / seta
const dobro = (n) => n * 2;
console.log(dobro(5)); // 10
<p id="meuTexto">Texto original</p>
<button id="meuBotao">Clique</button>

<script>
// Pegar elementos
const texto = document.getElementById("meuTexto");
const botao = document.querySelector("#meuBotao");

// Ler/alterar conteúdo
console.log(texto.textContent);
texto.textContent = "Texto mudado!";
texto.style.color = "blue";
texto.classList.add("destaque"); // Adicionar classe CSS

// Evento de clique
botao.addEventListener("click", function() {
  texto.textContent = "Você clicou! 🎉";
  texto.style.color = "red";
});
</script>
document.getElementById("id")           // Por ID
document.querySelector(".classe")        // Primeiro com a classe
document.querySelectorAll("p")           // Todos os <p>
document.createElement("div")            // Criar elemento
elemento.remove()                         // Remover elemento
// Mensagem
alert("Atenção!");

// Pergunta
let nome = prompt("Qual seu nome?");
console.log("Usuário: " + nome);

// Confirmação
let confirmar = confirm("Deseja prosseguir?");
if (confirmar) {
  console.log("Prosseguindo...");
}