/**
 * ==========================================================================
 * FUNÇÃO PRINCIPAL: ANALISAR E COLORIR PRIORIDADES
 * Executa o loop para aplicar classes condicionais baseadas no texto (Item 11)
 * ==========================================================================
 */
function colorirPrioridades() {
    // 1. SELECIONANDO VÁRIOS ELEMENTOS (Item 10)
    // getElementsByClassName nos devolve uma lista viva (HTMLCollection) com as etiquetas
    const badges = document.getElementsByClassName('badge-prioridade');

    // 2. PERCORRENDO OS ELEMENTOS COM UM LAÇO DE REPETIÇÃO (Item 11)
    for (let i = 0; i < badges.length; i++) {
        // Captura o elemento atual baseado na posição do contador [i]
        let elementoAtual = badges[i];
        
        // Extrai o texto interno da tag, remove espaços vazios e joga para minúsculo
        let textoPrioridade = elementoAtual.textContent.trim().toLowerCase();

        // 3. MANIPULANDO CLASSES COM CLASSLIST (Item 6 e 7)
        // Primeiro, adicionamos a classe base compartilhada por todas as etiquetas (.badge)
        elementoAtual.classList.add('badge');

        // Aplicamos a condição para decidir qual classe o elemento vai ganhar (Item 11)
        if (textoPrioridade === 'urgente') {
            elementoAtual.classList.add('urgente');
        } else if (textoPrioridade === 'moderado') {
            elementoAtual.classList.add('moderado');
        } else if (textoPrioridade === 'normal') {
            elementoAtual.classList.add('normal');
        }
    }

    // 4. EXEMPLO DE ESTILIZAÇÃO DIRETA VIA PROPRIEDADE .style (Item 2 e 5)
    // Desativando o botão após o clique para que a análise ocorra apenas uma vez
    const botao = document.querySelector('.btn-analise');
    botao.textContent = "Lista Analisada!";
    botao.disabled = true;
    
    // Injetando CSS inline direto no botão (Limitação do Item 5: isso se sobrepõe ao arquivo CSS)
    botao.style.backgroundColor = "#2c3e50"; 
    botao.style.cursor = "not-allowed";
}


/**
 * ==========================================================================
 * FUNÇÃO EXTRA: MÉTODO TOGGLE PARA MARCAR COMO CONCLUÍDO (Item 7)
 * Adiciona interatividade para que o usuário possa riscar tarefas ao clicar
 * ==========================================================================
 */
// Aguarda o HTML carregar completamente na página antes de rodar as escutas de evento
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as linhas de tarefa (tags <li>) dentro da nossa lista
    const itensLista = document.querySelectorAll('#lista-tarefas li');

    // Percorre cada linha adicionando um detector de clique (Event Listener)
    itensLista.forEach(item => {
        item.style.cursor = "pointer"; // Estilização direta de usabilidade (Item 4)
        
        item.addEventListener('click', function() {
            // Usa o .toggle() para ligar/desligar a classe de riscado (Item 7)
            this.classList.toggle('concluido');
        });
    });
});
