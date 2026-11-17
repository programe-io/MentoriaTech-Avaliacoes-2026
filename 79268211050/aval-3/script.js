document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    formulario.addEventListener('submit', (evento) => {
        // Impede o envio tradicional que recarrega a página
        evento.preventDefault();

        // Captura os valores digitados nos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').options[document.getElementById('assunto').selectedIndex].text;
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação simples para garantir que a mensagem não está vazia
        if (mensagem.length < 10) {
            alert('Por favor, escreva uma mensagem com pelo menos 10 caracteres.');
            return;
        }

        // Cria um elemento visual para mostrar o resumo do envio
        const areaPrincipal = document.querySelector('main');
        
        areaPrincipal.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: #28a745; margin-bottom: 10px;">Mensagem Enviada!</h2>
                <p style="margin-bottom: 15px;">Obrigado pelo contato, <strong>${nome}</strong>.</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: left; font-size: 0.9rem; margin-bottom: 20px;">
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                </div>
                <button onclick="location.reload()" style="background-color: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    Enviar outra mensagem
                </button>
            </div>
        `;
    });
});
