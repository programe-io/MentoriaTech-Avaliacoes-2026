ocument.addEventListener('DOMContentLoaded', () => {
    // Seleciona o formulário dentro da seção de inscrição
    const formulario = document.querySelector('#inscricao form');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            // Impede o recarregamento padrão da página ao enviar o formulário
            evento.preventDefault();

            // Captura os valores digitados pelo usuário
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();

            // Validação simples de segurança
            if (nome === '' || email === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            \}

            // Exibe mensagem de feedback bem-sucedido
            alert(`Obrigado pelo cadastro, \${nome\}! Sua inscrição foi enviada com sucesso.`);

            // Limpa os campos do formulário após o envio
            formulario.reset();
        \});
    \}
\});$0