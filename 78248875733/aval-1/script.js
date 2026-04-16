const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

// Escuta o clique no botão e alterna a classe 'active'
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    });