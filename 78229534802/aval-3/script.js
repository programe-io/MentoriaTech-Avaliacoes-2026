// Mapeamento dos elementos do Formulário
const inputName = document.getElementById('inputName');
const inputRole = document.getElementById('inputRole');
const inputPhone = document.getElementById('inputPhone');
const inputEmail = document.getElementById('inputEmail');
const themeColor = document.getElementById('themeColor');

// Mapeamento dos elementos do Cartão de Visita
const cardName = document.getElementById('cardName');
const cardRole = document.getElementById('cardRole');
const cardPhone = document.getElementById('cardPhone');
const cardEmail = document.getElementById('cardEmail');
const businessCard = document.getElementById('businessCard');
const avatarDecoration = document.getElementById('avatarDecoration');

// Função para atualizar as iniciais do avatar
function updateInitials(name) {
    const words = name.trim().split(' ');
    let initials = '';
    if (words.length > 0 && words[0] !== '') {
        initials += words[0][0].toUpperCase();
        if (words.length > 1) {
            initials += words[words.length - 1][0].toUpperCase();
        }
    }
    avatarDecoration.textContent = initials || 'ID';
}

// Ouvintes de eventos (Event Listeners) para atualização dinâmica
inputName.addEventListener('input', (e) => {
    cardName.textContent = e.target.value || 'Seu Nome';
    updateInitials(e.target.value);
});

inputRole.addEventListener('input', (e) => {
    cardRole.textContent = e.target.value || 'Seu Cargo';
});

inputPhone.addEventListener('input', (e) => {
    cardPhone.textContent = e.target.value || '(00) 00000-0000';
});

inputEmail.addEventListener('input', (e) => {
    cardEmail.textContent = e.target.value || 'seu@email.com';
});

// Atualiza a cor temática do cartão
themeColor.addEventListener('input', (e) => {
    const selectedColor = e.target.value;
    document.documentElement.style.setProperty('--primary-color', selectedColor);
});

// Executa uma vez no início para ajustar as iniciais padrão
updateInitials(inputName.value);
