Vamos criar uma página com um botão que, ao ser clicado, mostra uma mensagem na tela.


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meu primeiro JavaScript</title>
</head>
<body>

    <h1>Aprendendo JavaScript</h1>

    <p id="mensagem">Clique no botão abaixo!</p>

    <button onclick="mostrarMensagem()">
        Clique aqui
    </button>

    <script>
        function mostrarMensagem() {
            document.getElementById("mensagem").innerHTML =
                "Parabéns! Você executou seu primeiro JavaScript!";
        }
    </script>

</body>
</html>
2. Explicação de cada comando
Código

Explicação

function

Cria uma função.

mostrarMensagem()

Nome da função que será executada.

document

Representa o documento HTML.

getElementById()

Localiza um elemento pelo seu ID.

innerHTML

Altera o conteúdo de um elemento HTML.

onclick

Executa uma ação ao clicar em um botão.

3. Conhecendo os principais conceitos do JavaScript
1. Variáveis

São utilizadas para guardar informações.


javascript
let nome = "João";
let idade = 20;

console.log(nome);
console.log(idade);
let: cria uma variável que pode ter seu valor alterado.

nome: nome da variável.

"João": valor armazenado.

2. Condições

Permitem que o programa tome decisões.


javascript
let idade = 18;

if (idade >= 18) {
    console.log("Você é maior de idade.");
} else {
    console.log("Você é menor de idade.");
}
if: verifica uma condição.

else: executa outra opção se a condição não for verdadeira.

3. Repetições

Permitem executar comandos várias vezes.


javascript
for (let i = 1; i <= 5; i++) {
    console.log("Número: " + i);
}
Esse código mostra os números de 1 até 5.

4. Funções

São blocos de código que executam uma tarefa.


javascript
function somar(a, b) {
    return a + b;
}

console.log(somar(10, 5));
Resultado: 15.

4. Onde utilizar JavaScript?
Aditya Raj | Data Analyst & AI Enthusiast
 
Calculadoras

Realizar operações matemáticas.

GitHub - sania-arooj/animated-login-form: Interactive animated login form built with HTML, CSS & JavaScript. Features floating labels, underline animations, real-time validation, success/error messages, and page refresh on login. Responsive design ideal for learning frontend form UI and animation effects. · GitHub
 
Sistemas de login

Validar informações de usuários.

Simple js Arkanoid game | Devpost
 
Jogos

Criar jogos interativos.

24 Best Web Dashboard Services To Buy Online | Fiverr
 
Sites interativos

Criar menus, animações e funcionalidades.

5. Desafio para praticar
Tente entender este pequeno código:


javascript
let numero1 = 10;
let numero2 = 20;

let resultado = numero1 + numero2;

alert("O resultado é: " + resultado);
Pergunta: qual será o resultado exibido na tela?

Escolha sua resposta:


10

20

30

1020

Dica: aprenda primeiro variáveis, condições, repetições e funções. Esses são os fundamentos para começar a desenvolver programas em JavaScript!


ChatGPT é uma IA e pode cometer erros.

Novo chat
Imagens
Plugins
Confira planos e preços
Ajuda

Pesquisa aprofundada
Configurações
Receba respostas personalizadas para você
Entre para receber respostas com base em chats salvos, além de criar imagens e carregar arquivos.

Você vai poder aproveitar respostas inteligentes e, além disso, carregar imagens, arquivos e muito mais.

Entrar
Cadastre-se grátis
Chat com o ChatGPT
Pergunte ao ChatGPT

