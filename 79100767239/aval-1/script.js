// Lista de artigos do blog
const artigos = [
    {
            titulo: "🌿 A Importância da Natureza",
                    conteudo: "Preservar o meio ambiente é essencial para a nossa vida e para as futuras gerações. Cada pequena atitude faz diferença: reciclar, economizar água e plantar árvores são gestos que ajudam muito o nosso planeta."
                        },
                            {
                                    titulo: "💻 Tecnologia no Dia a Dia",
                                            conteudo: "A tecnologia está em todo lugar: na escola, em casa, no trabalho. Ela facilita tarefas, aproxima pessoas e cria novas oportunidades. O importante é saber usá-la com sabedoria e responsabilidade."
                                                },
                                                    {
                                                            titulo: "📚 O Poder da Leitura",
                                                                    conteudo: "Ler nos transporta para mundos diferentes, amplia o conhecimento e melhora nossa escrita. Quem lê muito, aprende muito e desenvolve novas ideias!"
                                                                        }
                                                                        ];

                                                                        // Carrega a lista de artigos na página
                                                                        function carregarPosts() {
                                                                            const lista = document.getElementById('posts');
                                                                                
                                                                                    artigos.forEach((artigo, indice) => {
                                                                                            const item = document.createElement('li');
                                                                                                    item.textContent = artigo.titulo;
                                                                                                            item.onclick = () => mostrarConteudo(indice);
                                                                                                                    lista.appendChild(item);
                                                                                                                        });
                                                                                                                        }

                                                                                                                        // Mostra o conteúdo do artigo clicado
                                                                                                                        function mostrarConteudo(indice) {
                                                                                                                            const conteudo = document.getElementById('conteudo');
                                                                                                                                conteudo.innerHTML = `
                                                                                                                                        <h2>${artigos[indice].titulo}</h2>
                                                                                                                                                <p>${artigos[indice].conteudo}</p>
                                                                                                                                                    `;
                                                                                                                                                    }

                                                                                                                                                    // Inicia o blog quando a página carrega
                                                                                                                                                    document.addEventListener('DOMContentLoaded', carregarPosts);
                                                                                                                                                    