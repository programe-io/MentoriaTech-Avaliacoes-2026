/**
 * ==========================================================================
 * MÓDULO: Manipulação de Estilos e Classes Dinâmicas
 * Referência aos itens 2, 4, 6, 7, 10 e 11 do sumário da imagem
 * ==========================================================================
 */

// Aguarda o DOM (estrutura do HTML) estar totalmente carregado antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa as funções principais do projeto
    inicializarEstiloDireto();
    inicializarAlternadorDeModo();
    processarTabelaDeSituacoes();
    
});

/**
 * 1. ESTILIZAÇÃO DIRETA VIA PROPRIEDADE .style (Itens 2, 4 e 5)
 * Altera os atributos CSS diretamente no elemento (injetando CSS inline).
 */
function inicializarEstiloDireto() {
    const btnEstiloDireto = document.getElementById('btnEstiloDireto');
    const caixaDestaque = document.getElementById('caixaDestaque');

    // Verifica se os elementos realmente existem na tela antes de adicionar o evento
    if (btnEstiloDireto && caixaDestaque) {
        btnEstiloDireto.addEventListener('click', () => {
            // Aplicando propriedades CSS usando a sintaxe camelCase (ex: backgroundColor)
            caixaDestaque.style.backgroundColor = '#007bff';
            caixaDestaque.style.color = '#ffffff';
            caixaDestaque.style.borderRadius = '8px';
            caixaDestaque.style.padding = '25px';
            caixaDestaque.style.border = '1px solid transparent';
            
            // Atualiza o texto interno para indicar que a alteração ocorreu
            caixaDestaque.querySelector('strong').textContent = 'estilizado diretamente!';
        });
    }
}

/**
 * 2. ALTERNANDO CLASSES COM classList E TOGGLE (Itens 6 e 7)
 * Adiciona ou remove uma classe do arquivo CSS externo na tag <body>.
 */
function inicializarAlternadorDeModo() {
    const btnAlternarModo = document.getElementById('btnAlternarModo');

    if (btnAlternarModo) {
        btnAlternarModo.addEventListener('click', () => {
            // O método toggle adiciona a classe se ela faltar, ou remove se já existir
            document.body.classList.toggle('modo-escuro');
        });
    }
}

/**
 * 3. SELEÇÃO MÚLTIPLA E ESTILOS CONDICIONAIS (Itens 10 e 11)
 * Varre uma coleção de elementos da tabela e injeta classes baseadas em regras de negócio.
 */
function processarTabelaDeSituacoes() {
    // Seleciona todos os elementos do DOM que contêm a classe alvo (Retorna uma HTMLCollection)
    const celulasSituacao = document.getElementsByClassName('coluna-situacao');

    // Converte a HTMLCollection estrutural em uma Array nativa para podermos usar o .forEach()
    const listaDeCelulas = Array.from(celulasSituacao);

    // Percorre cada elemento da lista aplicando a lógica condicional
    listaDeCelulas.forEach(celula => {
        // Normaliza o texto (remove espaços extras e converte para letras minúsculas)
        const textoSituacao = celula.textContent.trim().toLowerCase();

        // Limpa possíveis classes antigas para evitar sobreposição indesejada (Item 7 - remove)
        celula.classList.remove('situacao-aprovado', 'situacao-pendente', 'situacao-recusado');

        // Estrutura condicional para decidir qual estilo aplicar baseado no texto (Item 11)
        switch (textoSituacao) {
            case 'aprovado':
                celula.classList.add('situacao-aprovado'); // Item 7 - add
                break;
                
            case 'pendente':
                celula.classList.add('situacao-pendente');
                break;
                
            case 'recusado':
                celula.classList.add('situacao-recusado');
                break;
                
            default:
                // Caso haja um texto inesperado, mantém o estilo padrão neutro
                console.warn(`Situação desconhecida encontrada: "${textoSituacao}"`);
                break;
        }
    });
}
