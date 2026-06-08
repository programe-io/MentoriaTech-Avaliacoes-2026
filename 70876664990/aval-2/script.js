// Captura o botão do artigo
const botaoArtigo = document.getElementById('btnLerMais');

// Adiciona o monitoramento de clique
botaoArtigo.addEventListener('click', function(event) {
    // Evita o redirecionamento imediato para você conseguir ver o log no console
    console.log('Métrica do Blog: O usuário clicou para ler o artigo.');
    
    // Alerta o leitor amigavelmente
    alert('Obrigado pelo interesse! Você está sendo direcionado para o artigo completo do blog.');
});
                        N N  B     M                                                                      