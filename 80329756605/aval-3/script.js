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
