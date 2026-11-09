// Exibe uma mensagem no console quando a página é carregada
console.log("Script carregado com sucesso!");

// Função para exibir a data atual no elemento com o ID 'data-atual'
function mostrarDataAtual() {
    const elementoData = document.getElementById('data-atual');
        if (elementoData) {
                const hoje = new Date();
                        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
                                elementoData.textContent = hoje.toLocaleDateString('pt-BR', opcoes);
                                    }
                                    }

                                    // Executa a função assim que a página termina de carregar
                                    window.onload = function() {
                                        mostrarDataAtual();
                                        };