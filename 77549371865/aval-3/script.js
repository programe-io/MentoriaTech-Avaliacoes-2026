document.addEventListener('DOMContentLoaded', () => {
        // 1. Seleciona o formulário e os campos de entrada
            const formulario = document.querySelector('form');
                const inputNome = document.getElementById('nome');
                    const inputEmail = document.getElementById('email');

                        // 2. Cria um elemento para exibir a mensagem de retorno na tela
                            const mensagemFeedback = document.createElement('p');
                                mensagemFeedback.style.marginTop = '15px';
                                    mensagemFeedback.style.fontWeight = 'bold';
                                        mensagemFeedback.style.textAlign = 'center';
                                            formulario.appendChild(mensagemFeedback);

                                                // 3. Escuta o evento de envio (submit) do formulário
                                                    formulario.addEventListener('submit', (evento) => {
                                                            // Impede que a página recarregue ao clicar no botão
                                                                    evento.preventDefault();

                                                                            // Pega os valores digitados removendo espaços extras nas pontas
                                                                                    const nome = inputNome.value.trim();
                                                                                            const email = inputEmail.value.trim();

                                                                                                    // Validação simples
                                                                                                            if (nome === '' || email === '') {
                                                                                                                        mensagemFeedback.textContent = '⚠️ Por favor, preencha todos os campos.';
                                                                                                                                    mensagemFeedback.style.color = '#e74c3c'; // Vermelho
                                                                                                                                                return;
                                                                                                                                                        }

                                                                                                                                                                // Simula o envio com sucesso
                                                                                                                                                                        mensagemFeedback.textContent = `✅ Obrigado, ${nome}! Mensagem enviada para ${email}.`;
                                                                                                                                                                                mensagemFeedback.style.color = '#27ae60'; // Verde

                                                                                                                                                                                        // Limpa os campos do formulário após o envio
                                                                                                                                                                                                formulario.reset();

                                                                                                                                                                                                        // Faz a mensagem desaparecer após 5 segundos
                                                                                                                                                                                                                setTimeout(() => {
                                                                                                                                                                                                                            mensagemFeedback.textContent = '';
                                                                                                                                                                                                                                    }, 5000);
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        
})