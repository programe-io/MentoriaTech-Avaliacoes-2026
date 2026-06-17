// Função que altera a cor de fundo da página
function alterarCorDeFundo() {
    // Array com opções de cores
    const cores = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#33FFF0', '#F3FF33', '#f4f4f4'];
    
    // Seleciona um índice aleatório da lista de cores
    const indiceAleatorio = Math.floor(Math.random() * cores.length);
    const novaCor = cores[indiceAleatorio];
    
    // Aplica a cor selecionada ao corpo (body) do site
    document.body.style.backgroundColor = novaCor;
    
    // Exibe a cor atual no console do navegador (ferramenta de desenvolvedor)
    console.log('A cor de fundo foi alterada para: ' + novaCor);
}
// Seleciona os elementos
const botaoAbrir = document.getElementById('abrir-menu');
const botaoFechar = document.getElementById('fechar-menu');
const asideMenu = document.getElementById('meu-aside');

// Função para abrir o menu
botaoAbrir.addEventListener('click', () => {
    asideMenu.classList.add('ativo');
});

// Função para fechar o menu
botaoFechar.addEventListener('click', () => {
    asideMenu.classList.remove('ativo');
});

// Opcional: Fecha o menu se o usuário clicar fora dele
document.addEventListener('click', (evento) => {
    if (!asideMenu.contains(evento.target) && evento.target !== botaoAbrir) {
        asideMenu.classList.remove('ativo');
    }
});
