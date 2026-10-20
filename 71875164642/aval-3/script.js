/* ==========================================================================
   1. SELEÇÃO DE ELEMENTOS (Item 10)
   ========================================================================== */
// Selecionando os botões e elementos que vão sofrer alterações
const btnTema = document.getElementById('btn-tema');
const card = document.querySelector('.card-produto');
const precoElemento = document.querySelector('.preco');

/* ==========================================================================
   2. MANIPULANDO CLASSES COM CLASSLIST (Item 6 e 7)
   Esta é a abordagem recomendada (Item 8 - usando CSS externo)
   ========================================================================== */

// Exemplo de .toggle() -> Adiciona a classe se não existir; remove se já existir.
btnTema.addEventListener('click', () => {
    // Alterna a classe 'tema-escuro' no corpo da página e no card
    document.body.classList.toggle('tema-escuro');
    card.classList.toggle('tema-escuro');
});

// Exemplo de .add() -> Adiciona uma ou mais classes ao elemento
function marcarEsgotado() {
    // Injeta a classe que criamos no arquivo CSS externo
    card.classList.add('produto-esgotado');
    
    // Você também poderia usar .remove() se quisesse tirar uma classe:
    // card.classList.remove('classe-antiga');
}

/* ==========================================================================
   3. ESTILIZAÇÃO DIRETA COM A PROPRIEDADE .style (Item 2, 3 e 4)
   ========================================================================== */
function aplicarDesconto() {
    // Altera o conteúdo de texto do preço
    precoElemento.textContent = "R\$ 3.999,00";
    
    // Aplica o estilo diretamente na tag HTML (Gera um CSS Inline)
    precoElemento.style.color = "#e74c3c";       // Altera a cor para vermelho
    precoElemento.style.fontSize = "30px";        // Aumenta o tamanho da fonte
    precoElemento.style.fontWeight = "bold";      // Deixa em negrito
}


/* ==========================================================================
   4. LIMITAÇÕES DA ESTILIZAÇÃO DIRETA (Item 5 do Sumário)
   ==========================================================================
   Por que o item 5 do seu sumário alerta sobre as "Limitações"?
   
   Quando rodamos a função `aplicarDesconto()` acima, o JavaScript injeta o 
   estilo direto no HTML, ficando assim: <p class="preco" style="color: rgb(231, 76, 60); font-size: 30px;">
   
   O problema: O CSS Inline criado pelo `.style` tem prioridade quase absoluta. 
   Se você ativar o Modo Noturno depois disso, o preço CONTINUARÁ vermelho e grande, 
   ignorando qualquer regra de cor que você tenha planejado para o tema escuro no CSS.
   
   Conclusão do Guia: Prefira SEMPRE o `classList.add()` ou `.toggle()` em vez de 
   ficar alterando propriedades pelo `.style` diretamente!
*/
