// Elementos para interação
const btnTheme = document.getElementById('btn-theme');
const btnSubscribe = document.getElementById('btn-subscribe');
const mainImage = document.getElementById('main-image');

// 1. Funcionalidade de Dark Mode (Manipulação de classes)
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        btnTheme.textContent = 'Modo Claro';
    } else {
        btnTheme.textContent = 'Modo Escuro';
    }
});

// 2. Simulação de inscrição na Newsletter
btnSubscribe.addEventListener('click', () => {
    const email = document.querySelector('input[type="email"]').value;
    
    if (email.includes('@')) {
        alert(`Obrigado por assinar, ${email}!`);
        console.log("Inscrição registrada com sucesso.");
    } else {
        alert("Por favor, insira um e-mail válido.");
    }
});

// 3. Efeito na imagem via JS
mainImage.addEventListener('dblclick', () => {
    mainImage.style.filter = "grayscale(100%)";
    setTimeout(() => {
        mainImage.style.filter = "grayscale(0%)";
    }, 2000);
});