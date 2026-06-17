// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // 1. Sistema Dinâmico de Filtros (Categorias)
    const linksFiltro = document.querySelectorAll('#menu-filtro a');
    const posts = document.querySelectorAll('#lista-posts article');

    linksFiltro.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Gerencia classe ativa do menu
            linksFiltro.forEach(l => l.classList.remove('ativo'));
            link.classList.add('ativo');

            // Filtra os posts na tela
            const categoriaSelecionada = link.getAttribute('data-categoria');
            
            posts.forEach(post => {
                const categoriaPost = post.getAttribute('data-categoria');
                if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoriaPost) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // 2. Sistema de Curtidas
    const botoesCurtir = document.querySelectorAll('.btn-curtir');
    botoesCurtir.forEach(botao => {
        botao.addEventListener('click', function() {
            const span = this.querySelector('span');
            if (span) {
                span.textContent = parseInt(span.textContent) + 1;
            }
        });
    });

    // 3. Validação da Newsletter
    const btnNews = document.querySelector('.btn-enviar-news');
    const inputNews = document.getElementById('email-news');

    if (btnNews && inputNews) {
        btnNews.addEventListener('click', () => {
            const email = inputNews.value;
            if (email.includes('@')) {
                alert('Inscrição realizada com sucesso! Verifique sua caixa de entrada.');
                inputNews.value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});
