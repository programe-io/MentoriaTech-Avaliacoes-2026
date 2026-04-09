// 1. Exibir mensagem no console
console.log("Olá, mundo!");

// 2. Variáveis e constantes
let nome = "Maria";
const idade = 25;

// 3. Tipos de dados
let numero = 10;         // Number
let texto = "Olá";       // String
let ativo = true;        // Boolean
let lista = [1, 2, 3];   // Array
let objeto = { chave: "valor" }; // Object

// 4. Condicional
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// 5. Laço de repetição
for (let i = 0; i < 5; i++) {
    console.log("Contagem:", i);
}

// 6. Função
function somar(a, b) {
    return a + b;
}
console.log(somar(5, 3));

// 7. Função de seta (arrow function)
const multiplicar = (a, b) => a * b;
console.log(multiplicar(4, 2));

// 8. Manipulação de arrays
let frutas = ["maçã", "banana", "laranja"];
frutas.push("uva"); // adiciona
frutas.splice(1, 1); // remove banana
console.log(frutas);

// 9. Objeto e acesso a propriedades
let pessoa = { nome: "João", idade: 30 };
console.log(pessoa.nome);

// 10. Trabalhando com datas
let agora = new Date();
console.log(agora.toLocaleString());

// 11. Try/Catch (tratamento de erros)
try {
    let resultado = 10 / 0;
    console.log(resultado);
} catch (erro) {
    console.error("Ocorreu um erro:", erro);
}

// 12. Função assíncrona e Promise
async function buscarDados() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Dados recebidos!"), 2000);
    });
}

buscarDados().then(console.log);
