const senhaCorreta = "2311";
let tentativasRestantes = 3;

const btnAcessar = document.getElementById('btnAcessar');
const mensagem = document.getElementById('mensagem');
const inputSenha = document.getElementById('senha');

btnAcessar.addEventListener('click', () => {
    let senhaDigitada = inputSenha.value;
    let tentativa = 0;

    do {
        if (senhaDigitada === senhaCorreta) {
            mensagem.textContent = "Bem-vindo!";
            mensagem.style.color = "green";
            break;
        } else {
            tentativasRestantes--;
            if (tentativasRestantes > 0) {
                mensagem.textContent = `Senha incorreta. Você tem mais ${tentativasRestantes} tentativa(s).`;
                mensagem.style.color = "red";
                inputSenha.value = "";
                break; // Sai do do/while após informar
            } else {
                mensagem.textContent = "Acesso bloqueado. Número máximo de tentativas atingido.";
                mensagem.style.color = "red";
                inputSenha.disabled = true;
                btnAcessar.disabled = true;
                break; // Sai do do/while após bloquear
            }
        }
        tentativa++;
    } while (tentativa < 1);
});