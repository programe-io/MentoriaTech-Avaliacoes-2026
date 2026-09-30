document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const messageContainer = document.getElementById('form-message');
    const emailInput = document.getElementById('email-input');

    // Executa apenas se todos os elementos existirem na página (Garante 0 erros no console)
    if (form && messageContainer && emailInput) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailValue = emailInput.value.trim();

            // Limpa mensagens anteriores
            messageContainer.textContent = '';
            messageContainer.className = 'form-message';

            // Validação simples e direta
            if (emailValue.includes('@') && emailValue.includes('.')) {
                // Extrai o nome antes do símbolo @
                const baseName = emailValue.split('@')[0];
                // Deixa a primeira letra maiúscula de forma simples
                const formattedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

                messageContainer.textContent = `Obrigado por se inscrever, ${formattedName}!`;
                messageContainer.classList.add('success');
                emailInput.value = ''; // Limpa o campo
            } else {
                messageContainer.textContent = 'Por favor, insira um e-mail válido.';
                messageContainer.classList.add('error');
            }
        });
    }
});
