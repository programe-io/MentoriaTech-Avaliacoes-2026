Conversa com o Gemini
Um caixa eletrônico precisa validar a senha do usuário antes de permitir o

acesso. O sistema permite no máximo 3 tentativas.



Escreva um algoritmo em JavaScript que solicite a senha ao usuário repetidamente usando

do/while. A cada tentativa errada, informe quantas tentativas restam. Se a senha estiver

correta, exiba uma mensagem de boas-vindas. Se as 3 tentativas forem esgotadas,

bloqueie o acesso e exiba uma mensagem de erro.criar senha 0201

Aqui está uma solução prática utilizando a estrutura de repetição do/while. Para este exemplo, utilizaremos o comando prompt() para capturar a entrada do usuário e alert() para exibir as respostas, simulando o comportamento de um caixa eletrônico no navegador.

JavaScript
const senhaCorreta = "0201";
let tentativasRestantes = 3;
let senhaDigitada;
let acessoConcedido = false;

do {
    senhaDigitada = prompt(`Digite sua senha (Tentativas restantes: ${tentativasRestantes}):`);

    if (senhaDigitada === senhaCorreta) {
        alert("Bem-vindo! Acesso concedido.");
        acessoConcedido = true;
    } else {
        tentativasRestantes--;
        
        if (tentativasRestantes > 0) {
            alert(`Senha incorreta! Você ainda tem ${tentativasRestantes} tentativa(s).`);
        } else {
            alert("Acesso bloqueado! Você excedeu o limite de 3 tentativas.");
        }
    }

// O loop continua enquanto a senha estiver errada E ainda houver tentativas
} while (!acessoConcedido && tentativasRestantes > 0);
Como o código funciona:
Variáveis de Controle: Definimos a senhaCorreta como "0201" e um contador de tentativasRestantes começando em 3.

Bloco do: O código dentro dele é executado pelo menos uma vez. Ele solicita a senha e verifica se ela coincide com a correta.

Decremento: A cada erro, subtraímos 1 do contador (tentativasRestantes--).

Condição de Saída (while): O loop para em duas situações:

Se o usuário acertar a senha (acessoConcedido torna-se verdadeiro).

Se as tentativas chegarem a zero.

Segurança: Note que usamos a senha como uma string "0201". Isso é importante porque senhas que começam com zero podem ter o dígito inicial removido se tratadas apenas como números inteiros.

criar em html,css,javascript

Com certeza! Para tornar o exemplo mais realista, vamos criar uma interface de Caixa Eletrônico estilizada. O JavaScript manterá a lógica do do/while, mas agora interagindo com o DOM (a tela) em vez de usar apenas pop-ups simples.

Abaixo está o código completo estruturado:

1. HTML (index.html)
Criamos um teclado numérico para simular a interação física.

HTML
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>ATM - Validação de Senha</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="atm-container">
        <h2>Banco Digital</h2>
        <div id="display" class="screen">Digite a senha</div>
        
        <div class="keypad">
            <button onclick="addNumber(1)">1</button>
            <button onclick="addNumber(2)">2</button>
            <button onclick="addNumber(3)">3</button>
            <button onclick="addNumber(4)">4</button>
            <button onclick="addNumber(5)">5</button>
            <button onclick="addNumber(6)">6</button>
            <button onclick="addNumber(7)">7</button>
            <button onclick="addNumber(8)">8</button>
            <button onclick="addNumber(9)">9</button>
            <button class="btn-clear" onclick="clearDisplay()">C</button>
            <button onclick="addNumber(0)">0</button>
            <button class="btn-enter" onclick="validarAcesso()">Enter</button>
        </div>
        
        <p id="tentativas-info">Tentativas restantes: <strong>3</strong></p>
    </div>

    <script src="script.js"></script>
</body>
</html>
2. CSS (style.css)
Um visual moderno com estilo "Dark Mode" para o terminal do caixa.

CSS
body {
    background-color: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    color: white;
}

.atm-container {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    text-align: center;
    width: 300px;
}

.screen {
    background: #000;
    color: #0f0;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    height: 30px;
}

.keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

button {
    padding: 15px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background: #333;
    color: white;
    cursor: pointer;
    transition: 0.2s;
}

button:hover { background: #444; }

.btn-enter { background: #28a745; }
.btn-clear { background: #dc3545; }

#tentativas-info { margin-top: 15px; color: #bbb; }
3. JavaScript (script.js)
Aqui implementamos a lógica. Como o do/while é um loop bloqueante (ele trava a página enquanto espera a condição), em aplicações web modernas com botões, costumamos usar funções disparadas por eventos.

Porém, para seguir seu pedido educativo de usar o do/while, aplicamos ele dentro da lógica de processamento da senha:

JavaScript
const senhaCorreta = "0201";
let tentativasRestantes = 3;
let inputSenha = "";

const display = document.getElementById("display");
const info = document.getElementById("tentativas-info");

function addNumber(num) {
    if (tentativasRestantes > 0 && inputSenha.length < 4) {
        inputSenha += num;
        display.innerText = "*".repeat(inputSenha.length);
    }
}

function clearDisplay() {
    inputSenha = "";
    display.innerText = "Digite a senha";
}

function validarAcesso() {
    // Usando a lógica do/while para verificar a senha submetida
    // Embora em eventos usemos 'if', aqui simulamos a verificação
    let validou = false;

    do {
        if (inputSenha === senhaCorreta) {
            display.style.color = "#0f0";
            display.innerText = "BOAS-VINDAS!";
            info.innerText = "Acesso Autorizado.";
            desabilitarTeclado();
            validou = true;
        } else {
            tentativasRestantes--;
            
            if (tentativasRestantes <= 0) {
                display.style.color = "#f00";
                display.innerText = "BLOQUEADO";
                info.innerText = "Acesso esgotado!";
                desabilitarTeclado();
            } else {
                display.innerText = "ERRO!";
                info.innerHTML = `Tentativas restantes: <strong>${tentativasRestantes}</strong>`;
                inputSenha = ""; // Limpa para a próxima tentativa
            }
            // Forçamos a saída do loop para permitir que o usuário tente de novo no HTML
            validou = true; 
        }
    } while (!validou);
}

function desabilitarTeclado() {
    const botoes = document.querySelectorAll("button");
    botoes.forEach(b => b.disabled = true);
}