document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Impede o envio padrão do formulário para validação manual
    event.preventDefault();
    
    // Captura os elementos e valores
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');
    
    let isValid = true;
    
    // Validação do E-mail (Verifica formato simples)
    if (!emailInput.value.includes('@') || emailInput.value.length < 5) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = '#2ecc71';
    }
    
    // Validação da Senha (Mínimo de 6 caracteres)
    if (passwordInput.value.length < 6) {
        passwordError.style.display = 'block';
        passwordInput.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
        passwordInput.style.borderColor = '#2ecc71';
    }
    
    // Se tudo estiver correto, exibe mensagem de sucesso
    if (isValid) {
        successMessage.style.display = 'block';
        // Aqui você poderia redirecionar o usuário ou enviar os dados para um servidor
    } else {
        successMessage.style.display = 'none';
    }
});
