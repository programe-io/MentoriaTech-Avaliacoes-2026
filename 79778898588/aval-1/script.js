// Função que mostra uma mensagem quando o botão é clicado
function mensagem() {
    alert('E aí, mano! Tudo bem contigo? 🚀');
    }

    // Função que muda a cor do texto
    function mudarCor() {
        const texto = document.getElementById('texto');
            const cores = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
                const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
                    texto.style.color = corAleatoria;
                    }

                    // Função que conta quantas vezes você clicou
                    let contador = 0;í
                    function contarClique() {
                        contador++;
                            document.getElementById('contador').innerText = `Você clicou ${contador} vezes!`;
                            }

                            // Executa assim que a página carregar
                            window.onload = function() {
                                console.log('Página carregada com sucesso! ✅');
                                };
