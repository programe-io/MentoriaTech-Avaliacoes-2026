// Seleciona os elementos da página
const caixa = document.querySelector('.caixa-principal');
const titulo = document.querySelector('h1');
const texto = document.querySelector('p');

// Efeito ao passar o mouse sobre a caixa
caixa.addEventListener('mouseover', () => {
  titulo.style.color = '#165DFF';
  caixa.style.backgroundColor = '#f0f6ff';
  caixa.style.transition = 'all 0.3s ease';
\});

// Efeito ao tirar o mouse da caixa
caixa.addEventListener('mouseout', () => {
  titulo.style.color = '#333333';
  caixa.style.backgroundColor = '#ffffff';
\});

// Mensagem de confirmação no console
console.log('Projeto carregado com sucesso! Desenvolvido com HTML, CSS e JavaScript.');$0