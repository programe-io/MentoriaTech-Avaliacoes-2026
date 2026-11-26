
function publicar() {
  const texto = document.getElementById("texto");
    const feed = document.getElementById("feed");

      if (texto.value.trim() === "") {
          alert("Escreva alguma coisa antes de publicar!");
              return;
                }

                  const post = document.createElement("article");
                    post.className = "post card";

                      post.innerHTML = `
                          <div class="post-topo">
                                <div class="avatar">F</div>
                                      <div>
                                              <strong>Felipe apelão</strong>
                                                      <small>@felipe.apelao · agora</small>
                                                            </div>
                                                                </div>

                                                                    <p></p>

                                                                        <div class="acoes">
                                                                              <button onclick="curtir(this)">♡ Curtir</button>
                                                                                    <button onclick="comentar()">💬 Comentar</button>
                                                                                          <button onclick="repostar(this)">🔁 Repostar</button>
                                                                                              </div>
                                                                                                `;

                                                                                                  post.querySelector("p").textContent = texto.value;
                                                                                                    feed.prepend(post);
                                                                                                      texto.value = "";
                                                                                                      }

                                                                                                      function curtir(botao) {
                                                                                                        if (botao.classList.contains("curtido")) {
                                                                                                            botao.classList.remove("curtido");
                                                                                                                botao.textContent = "♡ Curtir";
                                                                                                                  } else {
                                                                                                                      botao.classList.add("curtido");
                                                                                                                          botao.textContent = "♥ Curtido";
                                                                                                                              botao.style.color = "#e94da9";
                                                                                                                                }
                                                                                                                                }

                                                                                                                                function comentar() {
                                                                                                                                  const comentario = prompt("Digite seu comentário:");

                                                                                                                                    if (comentario && comentario.trim() !== "") {
                                                                                                                                        alert("Comentário publicado: " + comentario);
                                                                                                                                          }
                                                                                                                                          }

                                                                                                                                          function repostar(botao) {
                                                                                                                                            const postOriginal = botao.closest(".post");
                                                                                                                                              const textoOriginal = postOriginal.querySelector("p").textContent;

                                                                                                                                                const novoPost = document.createElement("article");
                                                                                                                                                  novoPost.className = "post card";

                                                                                                                                                    novoPost.innerHTML = `
                                                                                                                                                        <div class="post-topo">
                                                                                                                                                              <div class="avatar">F</div>
                                                                                                                                                                    <div>
                                                                                                                                                                            <strong>Felipe apelão</strong>
                                                                                                                                                                                    <small>@felipe.apelao · repostou</small>
                                                                                                                                                                                          </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                  <p>🔁 Repostagem</p>
                                                                                                                                                                                                      <div class="post-repostado"></div>
                                                                                                                                                                                                          <div class="acoes">
                                                                                                                                                                                                                <button onclick="curtir(this)">♡ Curtir</button>
                                                                                                                                                                                                                      <button onclick="comentar()">💬 Comentar</button>
                                                                                                                                                                                                                            <button onclick="repostar(this)">🔁 Repostar</button>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                  `;

                                                                                                                                                                                                                                    novoPost.querySelector(".post-repostado").textContent =
                                                                                                                                                                                                                                        textoOriginal;

                                                                                                                                                                                                                                          document.getElementById("feed").prepend(novoPost);
                                                                                                                                                                                                                                            alert("Você repostou essa publicação!");
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                            function mostrarMensagens() {
                                                                                                                                                                                                                                              document.getElementById("areaFeed").classList.add("escondido");
                                                                                                                                                                                                                                                document.getElementById("areaMensagens").classList.remove("escondido");
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                function mostrarFeed() {
                                                                                                                                                                                                                                                  document.getElementById("areaMensagens").classList.add("escondido");
                                                                                                                                                                                                                                                    document.getElementById("areaFeed").classList.remove("escondido");
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    function abrirConversa(nome) {
                                                                                                                                                                                                                                                      const chat = document.getElementById("chat");

                                                                                                                                                                                                                                                        chat.classList.remove("escondido");
                                                                                                                                                                                                                                                          document.getElementById("nomeChat").textContent =
                                                                                                                                                                                                                                                              "Conversa com " + nome;

                                                                                                                                                                                                                                                                document.getElementById("mensagensChat").innerHTML = "";

                                                                                                                                                                                                                                                                  const mensagemInicial = document.createElement("div");
                                                                                                                                                                                                                                                                    mensagemInicial.className = "balao";
                                                                                                                                                                                                                                                                      mensagemInicial.textContent = "Olá! 👋";

                                                                                                                                                                                                                                                                        document.getElementById("mensagensChat").appendChild(
                                                                                                                                                                                                                                                                            mensagemInicial
                                                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                                                chat.dataset.nome = nome;
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                function enviarMensagem() {
                                                                                                                                                                                                                                                                                  const input = document.getElementById("mensagemInput");
                                                                                                                                                                                                                                                                                    const texto = input.value.trim();

                                                                                                                                                                                                                                                                                      if (texto === "") {
                                                                                                                                                                                                                                                                                          return;
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                              const balao = document.createElement("div");
                                                                                                                                                                                                                                                                                                balao.className = "balao meu";
                                                                                                                                                                                                                                                                                                  balao.textContent = texto;

                                                                                                                                                                                                                                                                                                    document.getElementById("mensagensChat").appendChild(balao);
                                                                                                                                                                                                                                                                                                      input.value = "";

                                                                                                                                                                                                                                                                                                        const area = document.getElementById("mensagensChat");
                                                                                                                                                                                                                                                                                                          area.scrollTop = area.scrollHeight;
                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                          function criarStory() {
                                                                                                                                                                                                                                                                                                            const story = prompt("O que você quer colocar no seu story?");

                                                                                                                                                                                                                                                                                                              if (story && story.trim() !== "") {
                                                                                                                                                                                                                                                                                                                  const novoStory = document.createElement("div");
                                                                                                                                                                                                                                                                                                                      novoStory.className = "story";

                                                                                                                                                                                                                                                                                                                          novoStory.innerHTML = `
                                                                                                                                                                                                                                                                                                                                <div class="story-foto">F</div>
                                                                                                                                                                                                                                                                                                                                      <span>Seu story</span>
                                                                                                                                                                                                                                                                                                                                          `;

                                                                                                                                                                                                                                                                                                                                              novoStory.onclick = function() {
                                                                                                                                                                                                                                                                                                                                                    alert(story);
                                                                                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                                                                            document.querySelector(".stories").appendChild(novoStory);
                                                                                                                                                                                                                                                                                                                                                                alert("Seu story foi criado!");
                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                                                  function verStory(nome) {
                                                                                                                                                                                                                                                                                                                                                                    alert("Você está vendo o story de " + nome + "!");
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                    function seguir(botao) {
                                                                                                                                                                                                                                                                                                                                                                      if (botao.textContent === "Seguir") {
                                                                                                                                                                                                                                                                                                                                                                          botao.textContent = "Seguindo";
                                                                                                                                                                                                                                                                                                                                                                              botao.style.background = "#7138c8";
                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                    botao.textContent = "Seguir";
                                                                                                                                                                                                                                                                                                                                                                                        botao.style.background = "#30303d";
                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                          