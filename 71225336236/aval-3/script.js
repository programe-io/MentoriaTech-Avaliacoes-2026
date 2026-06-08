// Espera a página HTML carregar completamente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Saudação automática baseada na hora atual
    const hora = new Date().getHours();
    let saudacao = 'Olá, estudante!';

    if (hora < 12) {
        saudacao = 'Bom dia, hora de focar nos estudos! 🌅';
    } else if (hora < 18) {
        saudacao = 'Boa tarde, mantenha o ritmo! 📚';
    } else {
        saudacao = 'Boa noite, bons estudos noturnos! 🌙';
    }

    // Altera o texto do parágrafo do cabeçalho
    const subituloHeader = document.querySelector('header p');
    if (subituloHeader) {
        subituloHeader.textContent = saudacao;
    }

    // 2. Criar e configurar o botão de Modo Escuro dinamicamente
    const botaoModo = document.createElement('button');
    botaoModo.textContent = 'Mudar Visual 🌓';
    
    // Estilização rápida do botão via JavaScript
    botaoModo.style.padding = '10px 15px';
    botaoModo.style.marginTop = '15px';
    botaoModo.style.cursor = 'pointer';
    botaoModo.style.border = 'none';
    botaoModo.style.borderRadius = '5px';
    botaoModo.style.fontWeight = 'bold';

    // Insere o botão dentro do cabeçalho da página
    document.querySelector('header').appendChild(botaoModo);

    // 3. Evento de clique para ativar/desativar o Modo Escuro
    botaoModo.addEventListener('click', () => {
        const corpoPagina = document.body;
        
        // Alterna entre as cores do modo escuro e o padrão
        if (corpoPagina.style.backgroundColor === 'rgb(30, 30, 30)') {
            corpoPagina.style.backgroundColor = '#f4f7f6';
            corpoPagina.style.color = '#333333';
        } else {
            corpoPagina.style.backgroundColor = '#1e1e1e';
            corpoPagina.style.color = '#ffffff';
        }
    });
});
