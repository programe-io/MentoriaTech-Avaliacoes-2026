document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados dos Posts do Feed
    const postsData = [
        {
            id: 1,
            time: 'Há 2 horas',
            text: 'Mais três pontos importantes em casa! Seguimos trabalhando forte com a equipe. Obrigado a todos os torcedores pelo apoio de sempre! 🦩⚽️',
            image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
            likes: 1200000,
            comments: '45.2K',
            liked: false
        },
        {
            id: 2,
            time: 'Há 2 dias',
            text: 'Recordar é viver! Um dos momentos mais especiais da minha vida com a seleção Argentina. CAMPEONES DEL MUNDO! 🏆🇦🇷',
            image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80',
            likes: 5800000,
            comments: '120K',
            liked: false
        }
    ];

    // 2. Interatividade do Botão de Curtir (Like)
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const post = postsData[index];
            post.liked = !post.liked;
            
            if (post.liked) {
                post.likes += 1;
                btn.style.color = '#ff4b4b';
                btn.innerHTML = `❤️ ${(post.likes / 1000000).toFixed(1)}M`;
            } else {
                post.likes -= 1;
                btn.style.color = '#8b949e';
                btn.innerHTML = `❤️ ${(post.likes / 1000000).toFixed(1)}M`;
            }
        });
    });

    // 3. Interatividade nos Botões de Comentário e Compartilhar
    const actionButtons = document.querySelectorAll('.btn-action:not(.btn-like)');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const actionType = e.target.innerText.trim();
            if (actionType.includes('💬')) {
                alert('Abre a seção de comentários do post.');
            } else if (actionType.includes('🔄')) {