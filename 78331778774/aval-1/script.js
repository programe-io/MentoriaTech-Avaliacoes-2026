// Dados dos posts. Você só edita aqui pra adicionar mais
const posts = [
  {
      id: 1,
          titulo: "Como começar em HTML",
              resumo: "HTML é a base de toda página web. Veja a estrutura mínima pra começar hoje.",
                  link: "post1.html"
                    },
                      {
                          id: 2,
                              titulo: "CSS na prática",
                                  resumo: "Aprenda a deixar seu site bonito com poucas linhas de CSS.",
                                      link: "post2.html"
                                        },
                                          {
                                              id: 3,
                                                  titulo: "JS para interatividade",
                                                      resumo: "Com JavaScript você faz seu site responder ao usuário. Ex: esse blog.",
                                                          link: "post3.html"
                                                            }
                                                            ];

                                                            // Função pra renderizar os posts na tela
                                                            const containerPosts = document.getElementById('posts');

                                                            posts.forEach(post => {
                                                              containerPosts.innerHTML += `
                                                                  <article class="post">
                                                                        <h2><a href="${post.link}">${post.titulo}</a></h2>
                                                                              <p>${post.resumo}</p>
                                                                                    <a href="${post.link}">Ler mais →</a>
                                                                                        </article>
                                                                                          `;
                                                                                          });
                                                                                          