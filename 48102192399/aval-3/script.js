// Seleciona o botão de curtir e o texto do contador
const botaoCurtir = document.getElementById('btnCurtir');
const textoContador = document.getElementById('contador');

// Cria uma variável para armazenar o número de curtidas
let numeroCurtidas = 0;

// Adiciona o evento de clique
botaoCurtir.addEventListener('click', function() {
    // Adiciona +1 ao número atual
        numeroCurtidas++;
            
                // Atualiza o texto que aparece na tela com o novo número
                    textoContador.textContent = numeroCurtidas;
                        
                            // Pequena animação de clique usando estilo temporário
                                botaoCurtir.style.transform = 'scale(1.1)';
                                    setTimeout(function() {
                                            botaoCurtir.style.transform = 'scale(1)';
                                                }, 100);
                                                });