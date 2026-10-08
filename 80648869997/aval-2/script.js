// ============ CURTIR POST ============
document.querySelectorAll('.btn-curtir').forEach(botao => {
    botao.addEventListener('click', function() {
        const icone = this.querySelector('i');
        const post = this.closest('.post');
        const contador = post.querySelector('.contador-curtidas');
        let curtidas = parseInt(contador.textContent.replace(/\./g, ''));

        if (this.classList.contains('ativo')) {
            this.classList.remove('ativo');
            icone.classList.remove('fas');
            icone.classList.add('far');
            curtidas--;
        } else {
            this.classList.add('ativo');
            icone.classList.remove('far');
            icone.classList.add('fas');
            curtidas++;
        }

        contador.textContent = curtidas.toLocaleString('pt-BR');
    });
});

// ============ DUPLO CLIQUE NA IMAGEM PARA CURTIR ============
document.querySelectorAll('.post__imagem').forEach(imagem => {
    imagem.addEventListener('dblclick', function(e) {
        const post = this.closest('.post');
        const botaoCurtir = post.querySelector('.btn-curtir');

        if (!botaoCurtir.classList.contains('ativo')) {
            botaoCurtir.click();
        }

        // Animação do coração sobre a imagem
        const coracao = document.createElement('i');
        coracao.className = 'fas fa-heart coracao-animado';
        coracao.style.left = (e.offsetX - 40) + 'px';
        coracao.style.top = (e.offsetY - 40) + 'px';
        this.style.position = 'relative';
        this.appendChild(coracao);

        setTimeout(() => coracao.remove(), 900);
    });
});

// ============ SALVAR POST ============
document.querySelectorAll('.btn-salvar').forEach(botao => {
    botao.addEventListener('click', function() {
        const icone = this.querySelector('i');
        if (this.classList.contains('ativo')) {
            this.classList.remove('ativo');
            icone.classList.remove('fas');
            icone.classList.add('far');
        } else {
            this.classList.add('ativo');
            icone.classList.remove('far');
            icone.classList.add('fas');
        }
    });
});

// ============ SEGUIR USUÁRIO ============
document.querySelectorAll('.sugestao__seguir').forEach(botao => {
    botao.addEventListener('click', function() {
        if (this.classList.contains('seguindo')) {
            this.textContent = 'Seguir';
            this.classList.remove('seguindo');
        } else {
            this.textContent = 'Seguindo';
            this.classList.add('seguindo');
        }
    });
});

// ============ PUBLICAR COMENTÁRIO ============
document.querySelectorAll('.post__comentar').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const texto = input.value.trim();

        if (texto) {
            const post = this.closest('.post');
            const legenda = post.querySelector('.post__legenda');

            const novoComentario = document.createElement('p');
            novoComentario.innerHTML = `<strong>seu_usuario</strong> ${texto}`;
            legenda.appendChild(novoComentario);

            input.value = '';
            novoComentario.style.animation = 'pulsar 0.4s ease';
        }
    });
});

// ============ CLICK NOS STORIES ============
document.querySelectorAll('.story').forEach(story => {
    story.addEventListener('click', function() {
        const nome = this.querySelector('span').textContent;
        alert(`Abrindo story de: ${nome} 📸`);
        this.querySelector('img').style.background = '#ccc';
    });
});

// ============ ESTILO DO CORAÇÃO ANIMADO (injetado via JS) ============
const estilo = document.createElement('style');
estilo.textContent = `
    .coracao-animado {
        position: absolute;
        color: white;
        font-size: 80px;
        pointer-events: none;
        animation: surgir 0.9s ease forwards;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
    }
    @keyframes surgir {
        0% { transform: scale(0); opacity: 0; }
        30% { transform: scale(1.2); opacity: 1; }
        70% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.1); opacity: 0; }
    }
`;
document.head.appendChild(estilo);

console.log('🚀 InstaClone carregado com sucesso!');