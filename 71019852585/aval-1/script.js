const senhaCorreta = "2316";
let tentativasRestantes = 3;
let bloqueado = false;

const input = document.getElementById('senhaInput');
const visor = document.getElementById('visor');
const textoTentativas = document.getElementById('tentativas');

function addNumero(num) {
    if (bloqueado) return;
    if (input.value.length < 4) {
        input.value += num;
    }
}

function limpar() {
    if (bloqueado) return;
    input.value = "";
}

function validarSenha() {
    if (bloqueado) return;

    const senhaDigitada = input.value;

    if (senhaDigitada === senhaCorreta) {
        visor.innerText = "ACESSO LIBERADO";
        visor.style.color = "#2ecc71";
        alert("Bem-vindo ao sistema!");
        bloqueado = true; // Impede novas ações após sucesso
    } else {
        tentativasRestantes--;
        input.value = "";
        
        if (tentativasRestantes > 0) {
            visor.innerText = "SENHA INCORRETA";
            textoTentativas.innerText = `Tentativas restantes: ${tentativasRestantes}`;
        } else {
            bloqueado = true;
            visor.innerText = "ACESSO BLOQUEADO";
            visor.style.color = "#e74c3c";
            textoTentativas.innerText = "Procure sua agência.";
            alert("Cartão Retido! Muitas tentativas inválidas.");
        }
    }
}