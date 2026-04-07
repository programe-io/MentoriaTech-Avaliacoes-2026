// ===== Seleção de elementos =====
const botaoMensagem = document.getElementById('btnMensagem');
const mensagem = document.getElementById('mensagem');

const form = document.getElementById('formContato');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');

const cardContainer = document.getElementById('cardContainer');

// ===== Função para exibir mensagem =====
function mostrarMensagem() {
    mensagem.textContent = "Você clicou no botão! 🎉";
    mensagem.style.color = "#4CAF50";
}

// ===== Função para validar formulário =====
function validarFormulario(event) {
    event.preventDefault(); // Impede envio padrão do formulário
    
    if (inputNome.value.trim() === '' || inputEmail.value.trim() === '') {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    alert(`Obrigado, ${inputNome.value}! Seu formulário foi enviado.`);
    
    // Limpar campos
    inputNome.value = '';
    inputEmail.value = '';
}

// ===== Função para criar cards dinamicamente =====
function criarCard(titulo, descricao, imagemUrl) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${imagemUrl}" alt="${titulo}">
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <button class="btn">Clique Aqui</button>
    `;

    // Evento para botão dentro do card
    const botaoCard = card.querySelector('button');
    botaoCard.addEventListener('click', () => {
        alert(`Você clicou no card: ${titulo}`);
    });

    cardContainer.appendChild(card);
}

// ===== Inicialização =====
botaoMensagem.addEventListener('click', mostrarMensagem);
form.addEventListener('submit', validarFormulario);

// Criar alguns cards de exemplo
criarCard(
    "Card 1",
    "Este é um card de exemplo criado dinamicamente com JavaScript.",
    "https://via.placeholder.com/300x150"
);
criarCard(
    "Card 2",
    "Outro card para demonstrar como criar elementos dinamicamente.",
    "https://via.placeholder.com/300x150"
);
criarCard(
    "Card 3",
    "Você pode adicionar quantos cards quiser!",
    "https://via.placeholder.com/300x150"
);