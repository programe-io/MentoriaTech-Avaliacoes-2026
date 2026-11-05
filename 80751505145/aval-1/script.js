Este exemplo mostra uma mensagem na tela quando você clica em um botão.


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Aprendendo JavaScript</title>
</head>
<body>

    <h1>Meu primeiro JavaScript</h1>

    <p id="mensagem">Clique no botão abaixo!</p>

    <button onclick="mudarTexto()">
        Clique aqui
    </button>

    <script>
        function mudarTexto() {
            document.getElementById("mensagem").innerHTML =
                "Parabéns! Você aprendeu JavaScript!";
        }
    </script>

</body>
</html>
2. Explicação dos comandos
Código

Função

function

Cria uma função.

alert()

Mostra uma mensagem de alerta.

let

Cria uma variável.

const

Cria uma variável que não pode ser reatribuída.

document.getElementById()

Encontra um elemento HTML pelo ID.

innerHTML

Altera o conteúdo HTML de um elemento.

onclick

Executa uma ação ao clicar.

console.log()

Exibe informações no console.