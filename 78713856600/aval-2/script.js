const textoPost = document.getElementById('texto-post');
const btnPublicar = document.getElementById('btn-publicar');
const feed = document.getElementById('feed');

// Função para carregar posts salvos
function carregarPosts() {
    const postsSalvos = localStorage.getItem('posts');
        if (postsSalvos) {
                JSON.parse(postsSalvos).forEach(post => {
                            criarElementoPost(post.texto, post.data);
                                    });
                                        }
                                        }

                                        // Função para criar elemento do post
                                        function criarElementoPost(texto, data) {
                                            const postDiv = document.createElement('div');
                                                postDiv.classList.add('post');

                                                    postDiv.innerHTML = `
                                                            <div class="autor">Você</div>
                                                                    <div class="data">${data}</div>
                                                                            <div class="conteudo">${texto}</div>
                                                                                `;

                                                                                    feed.insertBefore(postDiv, feed.firstChild);
                                                                                    }

                                                                                    // Salvar post no localStorage
                                                                                    function salvarPost(texto, data) {
                                                                                        let posts = [];
                                                                                            const postsSalvos = localStorage.getItem('posts');
                                                                                                if (postsSalvos) {
                                                                                                        posts = JSON.parse(postsSalvos);
                                                                                                            }
                                                                                                                posts.unshift({ texto, data });
                                                                                                                    localStorage.setItem('posts', JSON.stringify(posts));
                                                                                                                    }

                                                                                                                    // Publicar novo post
                                                                                                                    btnPublicar.addEventListener('click', () => {
                                                                                                                        const texto = textoPost.value.trim();
                                                                                                                            
                                                                                                                                if (texto === '') {
                                                                                                                                        alert('Escreva algo antes de publicar!');
                                                                                                                                                return;
                                                                                                                                                    }

                                                                                                                                                        const data = new Date().toLocaleString('pt-BR');
                                                                                                                                                            
                                                                                                                                                                criarElementoPost(texto, data);
                                                                                                                                                                    salvarPost(texto, data);
                                                                                                                                                                        
                                                                                                                                                                            textoPost.value = '';
                                                                                                                                                                            });

                                                                                                                                                                            // Carregar posts ao abrir a página
                                                                                                                                                                            carregarPosts();
                                                                                                                                                                            