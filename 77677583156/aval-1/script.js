/**
 * Script de Interatividade da Página
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos do DOM
    const botaoExemplo = document.querySelector('.botao');
    const container = document.querySelector('.container');

    // 2. Função de Saudação baseada no horário
    function atualizarSaudacao() {
        const horaAtual = new Date().getHours();
        let saudacao = '';

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = 'Bom dia!';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = 'Boa tarde!';
        } else {
            saudacao = 'Boa noite!';
        }

        console.log(`${saudacao} O script foi carregado com sucesso.`);
    }

    // 3. Evento de Clique no Botão (Alternar Tema Escuro)
    if (botaoExemplo) {
        botaoExemplo.addEventListener('click', (evento) => {
            // Evita que o link '#' recarregue a página ou role para o topo
            evento.preventDefault(); 
            
            // Alterna uma classe de estilo no corpo da página
            document.body.classList.toggle('modo-escuro');
            
            // Altera o texto do botão dinamicamente
            if (document.body.classList.contains('modo-escuro')) {
                botaoExemplo.textContent = 'Mudar para Modo Claro';
            } else {
                botaoExemplo.textContent = 'Clique Aqui';
            }
        });
    }

    // Executa a saudação inicial ao carregar a página
    atualizarSaudacao();
});
