// Lista de posts sobre Naruto
        const meusPosts = [
            {
                id: 1,
                titulo: "A verdade por trás do sacrifício de Itachi Uchiha",
                categoria: "personagens",
                imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600", 
                resumo: "Entenda os motivos reais que levaram o prodígio do clã Uchiha a tomar a decisão mais difícil da sua vida pelo bem de Konoha."
            },
            {
                id: 2,
                titulo: "Teoria: Minato sabia dos planos da Akatsuki desde o início?",
                categoria: "teorias",
                imagem: "https://images.unsplash.com/photo-1528164344705-475426879c0d?w=600",
                resumo: "Analisamos pistas escondidas no arco do Flashback do Quarto Hokage que indicam um conhecimento prévio sobre a organização."
            },
            {
                id: 3,
                titulo: "5 Curiosidades sobre o Lamen do Ichiraku que você não sabia",
                categoria: "curiosidades",
                imagem: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
                resumo: "Descubra a origem real do restaurante favorito do Naruto e como ele salvou a vida do nosso protagonista na infância."
            }
        ];

        // Função que desenha os posts na tela
        function mostrarPosts(lista) {
            const painel = document.getElementById('espaco-posts');
            painel.innerHTML = ""; 

            lista.forEach(post => {
                painel.innerHTML += `
                    <article class="card-post">
                        <img src="${post.imagem}" class="capa-post" alt="${post.titulo}">
                        <div class="conteudo-post">
                            <span class="tag-post">${post.categoria}</span>
                            <h2 class="titulo-post">${post.titulo}</h2>
                            <p class="resumo-post">${post.resumo}</p>
                            <span class="btn-ler" onclick="alert('O artigo completo estará disponível na próxima atualização do blog!')">Ler Artigo Completo →</span>
                        </div>
                    </article>
                `;
            });
        }

        // Função de filtro por categoria
        function filtrar(categoria) {
            const botoes = document.querySelectorAll('.btn-filtro');
            botoes.forEach(b => b.classList.remove('ativo'));
            
            if (event && event.target) {
                event.target.classList.add('ativo');
            }

            if (categoria === 'todos') {
                mostrarPosts(meusPosts);
            } else {
                const filtrados = meusPosts.filter(p => p.categoria === categoria);
                mostrarPosts(filtrados);
            }
        }

        // Executa automaticamente ao abrir a página
        window.onload = function() {
            mostrarPosts(meusPosts);
        };