// Seleciona o elemento root onde a aplicação será montada
const root = document.getElementById('root');

// Função para criar a estrutura da Mentoria
function renderApp() {
    const container = document.createElement('div');
    container.style.textAlign = 'center';
    container.style.padding = '50px 20px';

    // Criando o Título
    const title = document.createElement('h1');
    title.innerText = 'BEM-VINDO AO PROGRAMA DE MENTORIAS';
    title.style.color = '#1a73e8';
    title.style.marginBottom = '20px';

    // Criando a Descrição
    const description = document.createElement('p');
    description.innerText = 'Conectando mentores experientes a mentes brilhantes.';
    description.style.fontSize = '1.2rem';
    description.style.color = '#555';
    description.style.marginBottom = '30px';

    // Criando um Botão de Ação
    const btn = document.createElement('button');
    btn.innerText = 'Quero Começar';
    btn.className = 'btn-primary'; // Usa a classe que definimos no CSS anterior
    
    // Evento de Clique
    btn.addEventListener('click', () => {
        alert('Inscrição iniciada! Redirecionando para o formulário...');
        btn.innerText = 'Carregando...';
        btn.disabled = true;
    });

    // Montando a interface
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(btn);
    
    root.appendChild(container);
}

// Executa a função após o carregamento do DOM
document.addEventListener('DOMContentLoaded', renderApp);
