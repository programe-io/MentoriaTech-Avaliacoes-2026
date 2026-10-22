// 1. Mapeamento dos Elementos do DOM
const cartao = document.getElementById('cartao-preview');
const textoInterno = document.getElementById('texto-cartao');

// Botões de Classe
const btnTema = document.getElementById('btn-classe-tema');
const btnBorda = document.getElementById('btn-classe-borda');
const btnSombra = document.getElementById('btn-classe-sombra');

// Inputs de Estilo Direto
const seletorCor = document.getElementById('seletor-cor');
const controleFonte = document.getElementById('controle-fonte');

/* ==========================================================================
   MÉTODO 1: Manipulação de Classes (Uso de classList)
   Indicado para aplicar conjuntos de estilos pré-definidos no CSS.
   ========================================================================== */

// Alterna a classe '.modo-noturno' no cartão ao clicar
btnTema.addEventListener('click', () => {
    cartao.classList.toggle('modo-noturno');
});

// Alterna a classe '.borda-arredondada'
btnBorda.addEventListener('click', () => {
    cartao.classList.toggle('borda-arredondada');
});

// Alterna a classe '.sombra-destaque'
btnSombra.addEventListener('click', () => {
    cartao.classList.toggle('sombra-destaque');
});


/* ==========================================================================
   MÉTODO 2: Manipulação de Estilos Diretos (Propriedade style)
   Indicado para valores dinâmicos/customizados que mudam constantemente.
   ========================================================================== */

// Altera a cor de fundo dinamicamente usando a propriedade .style.backgroundColor
seletorCor.addEventListener('input', (event) => {
    const corSelecionada = event.target.value;
    cartao.style.backgroundColor = corSelecionada;
});

// Altera o tamanho da fonte do texto usando a propriedade .style.fontSize
controleFonte.addEventListener('input', (event) => {
    const tamanho = event.target.value;
    // Atenção: É obrigatório concatenar a unidade de medida (ex: 'px')
    textoInterno.style.fontSize = `${tamanho}px`;
});
