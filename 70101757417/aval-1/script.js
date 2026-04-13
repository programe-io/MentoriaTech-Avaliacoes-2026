// Senha correta (como solicitado na prática)
const SENHA_CORRETA = "0406";

// Número máximo de tentativas
const MAX_TENTATIVAS = 3;

// Elementos do DOM
const senhaInput = document.getElementById("senhaInput");
const btnEntrar = document.getElementById("btnEntrar");
const mensagem = document.getElementById("mensagem");

// Variável de controle
let tentativas = 0;
let acessoBloqueado = false;

// Função principal de validação com do/while
function validarSenha() {
  do {
    const senhaDigitada = senhaInput.value.trim();

    if (acessoBloqueado) {
      mensagem.textContent = "Acesso bloqueado. Contate o suporte.";
      mensagem.classList.add("blocked");
      break;
    }

    if (senhaDigitada === SENHA_CORRETA) {
      mensagem.textContent = "✅ Bem‑vindo(a) ao sistema!";
      mensagem.classList.remove("blocked");
      mensagem.classList.add("success");
      acessoBloqueado = true; // Bloqueia após acerto também
      break;
    } else {
      tentativas++;
      const restantes = MAX_TENTATIVAS - tentativas;
      mensagem.textContent =
        restantes > 0
          ? `Senha incorreta. Tentativas restantes: ${restantes}`
          : "❌ Senha incorreta. Acesso bloqueado.";
      mensagem.classList.add("blocked");

      if (restantes <= 0) {
        acessoBloqueado = true;
      }
    }
  } while (!acessoBloqueado);
}

// Limpa mensagem e input ao focar
senhaInput.addEventListener("focus", () => {
  if (!acessoBloqueado) {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
  }
});

// Evento de clique no botão
btnEntrar.addEventListener("click", () => {
  if (!acessoBloqueado) {
    validarSenha();
  }
});

// Torna possível pressionar Enter no input
senhaInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !acessoBloqueado) {
    validarSenha();
  }
});