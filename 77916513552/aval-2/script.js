
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        });

        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, observerOptions);
        document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const countEl = document.getElementById(`count-${id}`);
                const totalEl = document.getElementById(`total-likes-${id}`);
                let count = parseInt(countEl.textContent);
                
                if (this.classList.contains('liked')) {
                    count--;
                    this.classList.remove('liked');
                } else {
                    count++;
                    this.classList.add('liked');
                    this.classList.add('explode');
                    setTimeout(() => this.classList.remove('explode'), 400);
                }
                countEl.textContent = count;
                totalEl.textContent = count;
            });
        });

        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                document.getElementById(`comments-${id}`).classList.toggle('show');
                this.classList.toggle('active');
            });
        });

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.add('copied');
                this.innerHTML = '<span class="icon">✅</span> <span class="label">Copiado!</span>';
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = '<span class="icon">🔗</span> <span class="label">Compartilhar</span>';
                }, 2000);
            });
        });

        document.querySelectorAll('.send-comment').forEach(btn => {
            btn.addEventListener('click', enviarComentario);
        });
        document.querySelectorAll('.comment-field').forEach(input => {
            input.addEventListener('keypress', e => {
                if (e.key === 'Enter') enviarComentario.call(e.target.nextElementSibling);
            });
        });

        function enviarComentario() {
            const id = this.dataset.id;
            const input = document.querySelector(`.comment-field[data-id="${id}"]`);
            const texto = input.value.trim();
            if (!texto) return;
            
            const commentsDiv = document.getElementById(`comments-${id}`);
            const novoComentario = document.createElement('div');
            novoComentario.className = 'comment new';
            novoComentario.innerHTML = `
                <div class="comment-avatar">V</div>
                <div class="comment-content">
                    <p><strong>Você</strong> <span class="time-sm">agora</span></p>
                    ${texto}
                </div>
            `;
            commentsDiv.insertBefore(novoComentario, commentsDiv.lastElementChild);
            input.value = '';
            commentsDiv.classList.add('show');
            
            const contador = document.getElementById(`comm-count-${id}`);
            const qtd = commentsDiv.querySelectorAll('.comment').length;
            contador.innerHTML = `<span class="stat-icon">💬</span> ${qtd} comentário${qtd !== 1 ? 's' : ''}`;
        }
