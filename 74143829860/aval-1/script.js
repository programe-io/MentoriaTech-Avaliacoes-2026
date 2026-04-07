// 1. Selecionando elementos do HTML
const botao = document.querySelector('.btn-primary');
const titulo = document.querySelector('h1');
const container = document.querySelector('.card');

// 2. Adicionando um "Ouvinte de Eventos" (Event Listener)
botao.addEventListener('click', () => {
    // Altera o texto do título
    titulo.innerText = "Mágica feita! ✨";
    
    // Altera o estilo via JS
    container.style.borderColor = "#6c5ce7";
    container.style.borderWidth = "2px";
    container.style.borderStyle = "solid";

    // Chama uma função de saudação
    mostrarSaudacaoPersonalizada();
});

// 3. Função com lógica e Template Strings
function mostrarSaudacaoPersonalizada() {
    const hora = new Date().getHours();
    let saudacao = "";

    if (hora < 12) {
        saudacao = "Bom dia!";
    } else if (hora < 18) {
        saudacao = "Boa tarde!";
    } else {
        saudacao = "Boa noite!";
    }

    console.log(`${saudacao} O script foi executado com sucesso.`);
    alert(`${saudacao} Você clicou no botão.`);
}