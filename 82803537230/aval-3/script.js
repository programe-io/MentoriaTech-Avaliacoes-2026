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

Executa uma ação quando o botão é clicado./* Estilo geral da página */
body {
    background-color: #e6f2ff;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 30px;
}

/* Estilo do título */
h1 {
    color: #0066cc;
    font-size: 36px;
}

/* Estilo do parágrafo */
p {
    color: #333333;
    font-size: 20px;
}

/* Estilo do botão */
button {
    background-color: #0066cc;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

/* Efeito ao passar o mouse */
button:hover {
    background-color: #004080;
}
2. Explicação de cada comando
Código CSS

Explicação

body

Estiliza o corpo da página.

background-color

Define a cor de fundo.

font-family

Escolhe o tipo de fonte.

text-align

Alinha o texto.

margin

Define a margem externa.

padding

Define o espaçamento interno.

color

Define a cor do texto.

font-size

Define o tamanho da letra.

border

Define a borda de um elemento.

border-radius

Arredonda os cantos.

cursor

Define o formato do cursor do mouse.

:hover

Aplica um efeito quando o mouse passa sobre o elemento.

3. Como funciona o CSS?
O CSS utiliza uma estrutura simples:/* Estilo geral da página */
body {
    background-color: #e6f2ff;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 30px;
}

/* Estilo do título */
h1 {
    color: #0066cc;
    font-size: 36px;
}

/* Estilo do parágrafo */
p {
    color: #333333;
    font-size: 20px;
}

/* Estilo do botão */
button {
    background-color: #0066cc;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

/* Efeito ao passar o mouse */
button:hover {
    background-color: #004080;
}
2. Explicação de cada comando
Código CSS

Explicação

body

Estiliza o corpo da página.

background-color

Define a cor de fundo.

font-family

Escolhe o tipo de fonte.

text-align

Alinha o texto.

margin

Define a margem externa.

padding

Define o espaçamento interno.

color

Define a cor do texto.

font-size

Define o tamanho da letra.

border

Define a borda de um elemento.

border-radius

Arredonda os cantos.

cursor

Define o formato do cursor do mouse.

:hover

Aplica um efeito quando o mouse passa sobre o elemento.

3. Como funciona o CSS?
O CSS utiliza uma estrutura simples: