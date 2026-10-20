/**
 * Script de manipulação de DOM e estilos (Baseado na lista de tópicos)
 */

// Garante que o código execute somente após o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MANIPULAÇÃO DE CLASSES COM classList (Tópicos 6 e 7)
    // ==========================================================================
    
    // Seleção de elementos individuais usando ID
    const paragrafo = document.getElementById('meu-paragrafo');
    const btnEstilo = document.getElementById('btn-estilo');
    const btnClasse = document.getElementById('btn-classe');

    // Tópico 4: Aplicando propriedades CSS diretamente (style / CSS inline)
    if (btnEstilo && paragrafo) {
        btnEstilo.addEventListener('click', () => {
            // Tópico 5 (Limitação): Altera o estilo inline diretamente, sobrescrevendo o CSS externo
            paragrafo.style.color = '#4f46e5';
            paragrafo.style.fontSize = '18px';
            paragrafo.style.fontWeight = 'bold';
        });
    }

    // Tópico 7: Utilizando métodos add, remove e toggle através do classList
    if (btnClasse && paragrafo) {
        btnClasse.addEventListener('click', () => {
            // O método toggle adiciona a classe se ela não existir, ou remove se já existir
            paragrafo.classList.toggle('destaque');
        });
    }


    // ==========================================================================
    // 2. SELEÇÃO MÚLTIPLA E ESTILOS CONDICIONAIS (Tópicos 9, 10 e 11)
    // ==========================================================================
    const btnFormatartabela = document.getElementById('btn-formatar-tabela');

    if (btnFormatartabela) {
        btnFormatartabela.addEventListener('click', () => {
            
            // Tópico 10: Selecionando vários elementos com getElementsByClassName
            // Retorna um HTMLCollection (uma lista de elementos vivos do DOM)
            const linhas = document.getElementsByClassName('linha-tabela');
            const statusCelulas = document.getElementsByClassName('status');

            // Tópico 11: Percorrendo elementos e aplicando estilos condicionais
            // Como é um HTMLCollection, usamos o loop "for" tradicional ou o convertemos para array
            for (let i = 0; i < statusCelulas.length; i++) {
                
                // Remove espaços em branco nas pontas e captura o texto da célula de situação
                const situacaoTexto = statusCelulas[i].textContent.trim();

                // Aplicação condicional com base no texto encontrado (Tópico 11)
                if (situacaoTexto === 'Concluído') {
                    // Adiciona classes específicas da folha de estilo (Tópico 8)
                    statusCelulas[i].classList.add('sucesso');
                    statusCelulas[i].classList.remove('pendente'); // Garante consistência se houver troca
                    
                    // Modifica a linha inteira da tabela adicionando uma classe do CSS
                    linhas[i].classList.add('linha-concluida');
                    linhas[i].classList.remove('linha-pendente');

                } else if (situacaoTexto === 'Pendente') {
                    // Aplica as classes correspondentes para o estado pendente
                    statusCelulas[i].classList.add('pendente');
                    statusCelulas[i].classList.remove('sucesso');
                    
                    linhas[i].classList.add('linha-pendente');
                    linhas[i].classList.remove('linha-concluida');
                }
            }
        });
    }
});
