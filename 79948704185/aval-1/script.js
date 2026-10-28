
const nome = document.getElementById("nome");
const texto = document.getElementById("texto");
const feed = document.getElementById("feed");
const publicar = document.getElementById("publicar");

let posts = [];
let proximoId = 1;

function renderizar() {
  feed.innerHTML = "";

    if (posts.length === 0) {
        feed.innerHTML =
              '<p class="vazio">Nenhuma publicação ainda. Seja o primeiro!</p>';
                  return;
                    }

                      posts.forEach(post => {
                          const artigo = document.createElement("article");
                              artigo.className = "post";

                                  const autor = document.createElement("p");
                                      autor.className = "autor";
                                          autor.textContent = "👤 " + post.nome;

                                              const data = document.createElement("p");
                                                  data.className = "data";
                                                      data.textContent = post.data;

                                                          const conteudo = document.createElement("p");
                                                              conteudo.className = "conteudo";
                                                                  conteudo.textContent = post.texto;

                                                                      const acoes = document.createElement("div");
                                                                          acoes.className = "acoes";

                                                                              const curtir = document.createElement("button");
                                                                                  curtir.className = "curtir" + (post.curtido ? " ativo" : "");
                                                                                      curtir.textContent =
                                                                                            (post.curtido ? "❤️" : "🤍") + " Curtir (" + post.curtidas + ")";

                                                                                                curtir.addEventListener("click", () => {
                                                                                                      post.curtido = !post.curtido;
                                                                                                            post.curtidas += post.curtido ? 1 : -1;
                                                                                                                  renderizar();
                                                                                                                      });

                                                                                                                          const contador = document.createElement("span");
                                                                                                                              contador.textContent = "💬 " + post.comentarios.length;

                                                                                                                                  acoes.append(curtir, contador);

                                                                                                                                      const areaComentarios = document.createElement("div");
                                                                                                                                          areaComentarios.className = "comentarios";

                                                                                                                                              post.comentarios.forEach(comentario => {
                                                                                                                                                    const item = document.createElement("p");
                                                                                                                                                          item.className = "comentario";
                                                                                                                                                                item.textContent = comentario;
                                                                                                                                                                      areaComentarios.appendChild(item);
                                                                                                                                                                          });

                                                                                                                                                                              const entrada = document.createElement("input");
                                                                                                                                                                                  entrada.placeholder = "Escreva um comentário...";
                                                                                                                                                                                      entrada.setAttribute("aria-label", "Comentário");

                                                                                                                                                                                          const comentar = document.createElement("button");
                                                                                                                                                                                              comentar.textContent = "Comentar";

                                                                                                                                                                                                  function adicionarComentario() {
                                                                                                                                                                                                        const valor = entrada.value.trim();

                                                                                                                                                                                                              if (!valor) return;

                                                                                                                                                                                                                    post.comentarios.push(valor);
                                                                                                                                                                                                                          renderizar();
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                  comentar.addEventListener("click", adicionarComentario);

                                                                                                                                                                                                                                      entrada.addEventListener("keydown", evento => {
                                                                                                                                                                                                                                            if (evento.key === "Enter") adicionarComentario();
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                    areaComentarios.append(entrada, comentar);
                                                                                                                                                                                                                                                        artigo.append(autor, data, conteudo, acoes, areaComentarios);
                                                                                                                                                                                                                                                            feed.appendChild(artigo);
                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                              publicar.addEventListener("click", () => {
                                                                                                                                                                                                                                                                const autor = nome.value.trim();
                                                                                                                                                                                                                                                                  const mensagem = texto.value.trim();

                                                                                                                                                                                                                                                                    if (!autor || !mensagem) {
                                                                                                                                                                                                                                                                        alert("Preencha seu nome e sua publicação!");
                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                posts.unshift({
                                                                                                                                                                                                                                                                                    id: proximoId++,
                                                                                                                                                                                                                                                                                        nome: autor,
                                                                                                                                                                                                                                                                                            texto: mensagem,
                                                                                                                                                                                                                                                                                                data: new Date().toLocaleString("pt-BR"),
                                                                                                                                                                                                                                                                                                    curtidas: 0,
                                                                                                                                                                                                                                                                                                        curtido: false,
                                                                                                                                                                                                                                                                                                            comentarios: []
                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                nome.value = "";
                                                                                                                                                                                                                                                                                                                  texto.value = "";
                                                                                                                                                                                                                                                                                                                    renderizar();
                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                    renderizar();
                                                                                                                                                                                                                                                                                                                    