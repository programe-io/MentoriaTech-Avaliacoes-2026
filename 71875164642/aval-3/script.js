/**
 * ==========================================================================
 * SCRIPT DE MANIPULAÇÃO DO DOM E ESTILOS
 * Baseado no sumário de estilização direta vs. manipulação de classes
 * ==========================================================================
 */

// --- 2 e 4. APLICANDO PROPRIEDADES CSS VIA JAVASCRIPT (Estilização Direta) ---
// Nota (Item 3 e 5): Isto altera o atributo 'style' do elemento (CSS inline).
// Tem como limitação a baixa reutilização e alta precedência sobre o CSS externo.
function alterarEstiloDireto() {
    const texto = document.getElementById('texto-introducao');
    
    if (texto) {
        // Aplica os estilos diretamente no nó do HTML
        texto.style.color = '#007bff';
        texto.style.fontSize = '18px';
        texto.style.fontWeight = 'bold';
    }
}

// --- 6 e 7. MANIPULANDO CLASSES COM classList (add, remove e toggle) ---
// Boa prática (Item 8): O JavaScript apenas gerencia o estado (adiciona/remove a classe),
// enquanto o design visual fica isolado dentro do arquivo CSS externo.
function alternarClasse() {
    const elemento = document.getElementById('texto-classe');
    
    if (elemento) {
        // O método .toggle() adiciona a classe se ela não existir, ou remove se já existir
        elemento.classList.toggle('destaque');
    }
}

// --- 10 e 11. SELECIONANDO VÁRIOS ELEMENTOS E APLICANDO ESTILOS CONDICIONAIS ---
// 9. Exemplo prático aplicado sobre uma tabela de situações
function formatarTabela() {
    // 10. Seleciona uma coleção de elementos HTML através da classe em comum
    const situacoes = document.getElementsByClassName('coluna-situacao');
    
    // 11. Percorrendo a lista de elementos (HTMLCollection) com uma estrutura de repetição
    for (let i = 0; i < situacoes.length; i++) {
        // Obtém e limpa o texto interno de cada célula para evitar espaços em branco
        const textoSituacao = situacoes[i].innerText.trim();
        
        // Aplicação das regras condicionais baseadas no conteúdo de texto
        if (textoSituacao === 'Aprovado') {
            // 7. Método .add() injeta a classe sem interferir em outras existentes
            situacoes[i].classList.add('sucesso');
            situacoes[i].classList.remove('pendente'); // Garante que não haverá conflito de cor
        } else if (textoSituacao === 'Pendente') {
            situacoes[i].classList.add('pendente');
            situacoes[i].classList.remove('sucesso');
        }
    }
}
