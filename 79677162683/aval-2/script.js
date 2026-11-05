<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Aprendendo JavaScript</title>

</head>

<body>

    <h1>Meu Primeiro JavaScript</h1>

    <p id="mensagem">Clique no botão abaixo!</p>

    <button onclick="mostrarMensagem()">
        Clique aqui
    </button>

    <script>

        // Criando uma função
        function mostrarMensagem() {

            // Alterando o texto da página
            document.getElementById("mensagem").innerHTML =
                "Parabéns! Você aprendeu JavaScript!";

        }

    </script>

</body>
</html>
2. Explicação dos comandos
1. function

Cria uma função, ou seja, um conjunto de instruções que pode ser executado quando necessário.


javascript
function mostrarMensagem() {
    alert("Olá, mundo!");
}
2. alert()

Mostra uma mensagem em uma janela de aviso.


javascript
alert("Bem-vindo!");
3. console.log()

Mostra informações no console do navegador.


javascript
console.log("Estou aprendendo JavaScript!");
4. let

Cria uma variável que pode receber novos valores.


javascript
let nome = "João";

console.log(nome);
5. const

Cria uma variável que não pode receber outro valor por atribuição.


javascript
const idade = 20;

console.log(idade);
6. if e else

São utilizados para criar condições.


javascript
let idade = 18;

if (idade >= 18) {
    console.log("Você é maior de idade.");
} else {
    console.log("Você é menor de idade.");
}
3. Criando uma calculadora com JavaScript
Agora vamos fazer um projeto um pouco mais avançado: uma calculadora que soma dois números.


<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Calculadora JavaScript</title>

    <style>
        body {
            font-family: Arial;
            text-align: center;
            margin-top: 50px;
        }

        input {
            padding: 10px;
            margin: 5px;
        }

        button {
            padding: 10px 20px;
            background: blue;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>

<body>

    <h1>Calculadora</h1>

    <input type="number" id="numero1" placeholder="Primeiro número">

    <input type="number" id="numero2" placeholder="Segundo número">

    <br><br>

    <button onclick="somar()">Somar</button>

    <h2 id="resultado">Resultado: </h2>

    <script>

        function somar() {

            let n1 = Number(document.getElementById("numero1").value);

            let n2 = Number(document.getElementById("numero2").value);

            let resultado = n1 + n2;

            document.getElementById("resultado").innerHTML =
                "Resultado: " + resultado;

        }

    </script>

</body>
</html>
4. Principais comandos JavaScript
Comando

Função

let

Cria variável modificável

const

Cria variável constante

var

Declara variável

function

Cria uma função

if

Cria uma condição

else

Define outra possibilidade

for

Cria um laço de repetição

while

Repete enquanto uma condição for verdadeira

alert()

Mostra uma mensagem

console.log()

Exibe informações no console

return

Retorna um valor de uma função

