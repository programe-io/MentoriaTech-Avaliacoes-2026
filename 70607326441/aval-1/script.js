// Definindo a senha correta
const SENHA_CORRETA = "2109";
let tentativasRestantes = 3;

// Selecionando os elementos do DOM
const senhaInput = document.getElementById("senhaInput");
const btnEntrar = document.getElementById("btnEntrar");
const mensagemDiv = document.getElementById("mensagem");
const tentativasDiv = document.getElementById("tentativasRestantes");

// Função para validar a senha
function validarSenha() {
    const senhaInformada = senhaInput.value;

    if (senhaInformada === SENHA_CORRETA) {
        // Senha correta
        mensagemDiv.style.color = "green";
        mensagemDiv.textContent = "Bem-vindo(a) ao sistema!";
        senhaInput.disabled = true;
        btnEntrar.disabled = true;
        tentativasDiv.textContent = "";
    } else {
        // Senha incorreta
        tentativasRestantes--;

        if (tentativasRestantes > 0) {
            mensagemDiv.style.color = "orange";
            mensagemDiv.textContent = `Senha incorreta! Você tem ${tentativasRestantes} tentativa(s) restante(s).`;
            tentativasDiv.textContent = `Tentativas restantes: ${tentativasRestantes}`;
            senhaInput.value = "";
            senhaInput.focus();
        } else {
            // Esgotou as tentativas
            mensagemDiv.style.color = "red";
            mensagemDiv.textContent = "Acesso bloqueado! Número máximo de tentativas excedido.";
            senhaInput.disabled = true;
            btnEntrar.disabled = true;
            tentativasDiv.textContent = "Tentativas restantes: 0";
        }
    }
}

// Evento de clique no botão
btnEntrar.addEventListener("click", validarSenha);

// Evento para permitir o envio pressionando a tecla "Enter"
senhaInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        validarSenha();
    }
});