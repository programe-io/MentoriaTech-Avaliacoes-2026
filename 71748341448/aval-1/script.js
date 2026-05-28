document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        // 1. Impede o comportamento padrão de recarregar a página
        event.preventDefault();

        // 2. Captura os dados simples dos inputs de texto e select
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const motivo = document.getElementById('motivo').value;
        const comentarios = document.getElementById('comentarios').value.trim();

        // 3. Captura o valor da estrela selecionada (radio button)
        const estrelaSelecionada = document.querySelector('input[name="rating"]:checked');
        
        // Validação: Verifica se o usuário selecionou uma nota em estrelas
        if (!estrelaSelecionada) {
            alert('Por favor, selecione uma nota de 1 a 5 estrelas antes de enviar.');
            return; // Interrompe o envio se não houver nota
        }

        const nota = estrelaSelecionada.value;

        // 4. Cria o objeto com todas as respostas estruturadas
        const dadosAvaliacao = {
            nome: nome,
            email: email,
            categoria: motivo,
            notaEstrelas: Number(nota),
            comentario: comentarios || "Nenhum comentário enviado.",
            dataEnvio: new Date().toLocaleDateString('pt-BR')
        };

        // 5. Exibe o resultado no Console (Para testes)
        console.log('Avaliação recebida com sucesso!', dadosAvaliacao);

        // 6. Feedback visual de sucesso para o usuário
        exibirMensagemSucesso(nome);

        // 7. Limpa o formulário após o envio bem-sucedido
        form.reset();
    });
});

/**
 * Função auxiliar para renderizar uma mensagem bonita de sucesso na tela
 */
function exibirMensagemSucesso(nomeUsuario) {
    const container = document.querySelector('.container');
    
    // Guarda o primeiro nome para uma saudação mais pessoal
    const primeiroNome = nomeUsuario.split(' ')[0];

    // Substitui o conteúdo do formulário por uma mensagem de agradecimento
    container.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 50px; color: #28a745; margin-bottom: 15px;">✓</div>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">Obrigado, ${primeiroNome}!</h2>
            <p style="color: #64748b; line-height: 1.6;">
                Sua avaliação foi enviada com sucesso. Nosso time agradece imensamente o seu feedback para continuarmos melhorando.
            </p>
        </div>
    `;
}