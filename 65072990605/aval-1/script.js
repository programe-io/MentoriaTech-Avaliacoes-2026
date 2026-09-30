// Lógica do Menu Mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu ao clicar em algum link interno
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Funções para Modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal ao clicar fora da caixa principal
window.addEventListener('click', (e) => {
    ['loginModal', 'signupModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && e.target === modal) {
            closeModal(modalId);
        }
    });
});

// Sistema de Notificações Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('translate-y-32');
        
        setTimeout(() => {
            toast.classList.add('translate-y-32');
        }, 3500);
    }
}

// Manipulador simulado de Autenticação
function handleAuth(event, successMessage) {
    event.preventDefault();
    
    // Fecha todos os modais abertos
    closeModal('loginModal');
    closeModal('signupModal');
    
    // Exibe notificação de sucesso
    showToast(successMessage);
    
    // Reseta o formulário
    event.target.reset();
}