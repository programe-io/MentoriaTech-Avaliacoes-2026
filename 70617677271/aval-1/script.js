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