
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Meu Primeiro JavaScript</title>
</head>
<body>

    <h1>Bem-vindo!</h1>

    <p>Digite seu nome:</p>

    <input type="text" id="nome" placeholder="Seu nome">

    <button onclick="mostrarMensagem()">
        Clique aqui
    </button>

    <h2 id="resultado"></h2>

    <script>
        function mostrarMensagem() {
            let nome = document.getElementById("nome").value;

            document.getElementById("resultado").innerHTML =
                "Olá, " + nome + "! Seja bem-vindo!";
        }
    </script>

</body>
</html>
2. Explicação do código
Vamos entender cada parte:

Código

Explicação

<script>

Indica onde começa o JavaScript no HTML.

function

Cria uma função.

mostrarMensagem()

Nome da função criada.

let

Declara uma variável.

document.getElementById()

Localiza um elemento pelo seu ID.

.value

Obtém o valor digitado no campo.

innerHTML

Insere conteúdo dentro de um elemento HTML.

onclick

Executa uma ação quando o botão é clicado.