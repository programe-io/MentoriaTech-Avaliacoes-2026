document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleciona os elementos do formulário
    const form = document.querySelector("form");
    const submitBtn = document.querySelector(".btn-submit");

    if (!form) return; // Garante que o formulário existe na página

    // 2. Adiciona o evento de escuta para o envio (submit)
    form.addEventListener("submit", async (event) => {
        // Impede o comportamento padrão de recarregar a página
        event.preventDefault();

        // 3. Coleta os dados digitados pelo usuário
        const formData = {
            nome: document.getElementById("nome").value.trim(),
            email: document.getElementById("email").value.trim(),
            area: document.getElementById("area").value,
            objetivo: document.getElementById("objetivo").value.trim()
        };

        // 4. Validação básica de segurança
        if (!formData.nome || !formData.email || !formData.area || !formData.objetivo) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // 5. Efeito visual no botão (Desabilita e muda o texto)
        const textoOriginal = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando Candidatura...";
        submitBtn.style.backgroundColor = "#7f8c8d"; // Cor cinza de desabilitado

        try {
            // Simula uma requisição para um servidor (espera 2 segundos)
            await simularEnvioServidor(formData);

            // 6. Feedback de sucesso para o usuário
            exibirMensagemSucesso(formData.nome);
            form.reset(); // Limpa os campos do formulário

        } catch (error) {
            alert("Ops! Ocorreu um erro ao enviar. Tente novamente mais tarde.");
            console.error("Erro no envio:", error);
        } finally {
            // Restaura o botão ao estado original
            submitBtn.disabled = false;
            submitBtn.innerText = textoOriginal;
            submitBtn.style.backgroundColor = "#3498db";
        }
    });
});

/**
 * Função simuladora de API (Promessa)
 */
function simularEnvioServidor(dados) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Dados enviados com sucesso para o servidor:", dados);
            resolve(true);
        }, 2000);
    });
}

/**
 * Função para criar e exibir um modal/alerta bonito de sucesso
 */
function exibirMensagemSucesso(nomeUsuario) {
    // Cria um container para a mensagem
    const feedbackDiv = document.createElement("div");
    
    // Estiliza dinamicamente via JS
    feedbackDiv.style.position = "fixed";
    feedbackDiv.style.top = "20px";
    feedbackDiv.style.left = "50%";
    feedbackDiv.style.transform = "translateX(-50%)";
    feedbackDiv.style.backgroundColor = "#2ecc71";
    feedbackDiv.style.color = "white";
    feedbackDiv.style.padding = "15px 30px";
    feedbackDiv.style.borderRadius = "8px";
    feedbackDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    feedbackDiv.style.fontSize = "16px";
    feedbackDiv.style.fontWeight = "bold";
    feedbackDiv.style.zIndex = "1000";
    feedbackDiv.style.transition = "opacity 0.5s ease";
    
    feedbackDiv.innerText = `Obrigado, ${nomeUsuario}! Sua candidatura foi enviada com sucesso. 🎉`;

    // Adiciona na tela
    document.body.appendChild(feedbackDiv);

    // Remove a mensagem da tela após 4 segundos
    setTimeout(() => {
        feedbackDiv.style.opacity = "0";
        setTimeout(() => feedbackDiv.remove(), 500);
    }, 4000);
}