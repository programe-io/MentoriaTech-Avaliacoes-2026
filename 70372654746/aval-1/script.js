const senhaCorreta = "3890";
let tentativasRestantes = 3;
let bloqueado = false;

function validarSenha() {
    if (bloqueado) return;

    const input = document.getElementById("senhaInput");
    const msgDiv = document.getElementById("mensagem");
    const senhaDigitada = input.value;

    if (senhaDigitada === senhaCorreta) {
        msgDiv.innerHTML = "<span class='sucesso'>Bem-vindo! Acesso liberado.</span>";
        msgDiv.className = "status sucesso";
        bloqueado = true; // Impede novas tentativas após sucesso
    } else {
        tentativasRestantes--;
        input.value = ""; // Limpa o campo
        
        if (tentativasRestantes > 0) {
            msgDiv.innerHTML = `Senha Incorreta!<br>Tentativas restantes: ${tentativasRestantes}`;
            msgDiv.className = "status erro";
        } else {
            msgDiv.innerHTML = "ACESSO BLOQUEADO!<br>Procure seu gerente.";
            msgDiv.className = "status erro";
            input.disabled = true;
            bloqueado = true;
        }
    }
}