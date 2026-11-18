// Função principal para publicar um novo post
function publicarPost() {
    // Captura os elementos da página
        const campoTexto = document.getElementById('campoTexto');
            const areaFeed = document.getElementById('areaFeed');
                const texto = campoTexto.value;

                    // Validação: não permite post vazio
                        if (texto.trim() === '') {
                                alert('Por favor, escreva algo antes de publicar! 🌱');
                                        return;
                                            }

                                                // Obtém data e hora atual formatada
                                                    const agora = new Date();
                                                        const dataFormatada = agora.toLocaleDateString('pt-BR') + ' • ' +
                                                                                   agora.toLocaleTimeString('pt-BR', {
                                                                                                                  hour: '2-digit',
                                                                                                                                                 minute: '2-digit'
                                                                                                                                                                            });

                                                                                                                                                                                // Cria o elemento HTML do novo post
                                                                                                                                                                                    const novoPost = document.createElement('div');
                                                                                                                                                                                        novoPost.className = 'post post-novo';
                                                                                                                                                                                            novoPost.innerHTML = `
                                                                                                                                                                                                    <div class="post-cabecalho">
                                                                                                                                                                                                                <h3 class="post-titulo">🌻 Minha Publicação</h3>
                                                                                                                                                                                                                            <span class="post-data">${dataFormatada}</span>
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                            <p class="post-conteudo">${texto}</p>
                                                                                                                                                                                                                                                    <span class="post-categoria">🌿 Nova</span>
                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                            // Adiciona o novo post no INÍCIO do feed
                                                                                                                                                                                                                                                                areaFeed.insertBefore(novoPost, areaFeed.firstChild);

                                                                                                                                                                                                                                                                    // Limpa o campo de texto após publicar
                                                                                                                                                                                                                                                                        campoTexto.value = '';
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        // Função de inicialização (executa quando a página carrega)
                                                                                                                                                                                                                                                                        window.onload = function() {
                                                                                                                                                                                                                                                                            console.log('🌱 Bem-vindo ao Meu Jardim de Plantas!');
                                                                                                                                                                                                                                                                                console.log('Página carregada com sucesso.');
                                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                                