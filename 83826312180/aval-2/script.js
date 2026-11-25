// Mini Feed Social - Seduc Piauí

// Lista de posts
let posts = [
  {
      nome: "Maria",
          data: "25/11/2026",
              texto: "Hoje tive uma aula muito legal na escola! 📚✨",
                  curtidas: 12
                    },
                      {
                          nome: "João",
                              data: "24/11/2026",
                                  texto: "Partiu jogar bola com os amigos depois da aula ⚽",
                                      curtidas: 18
                                        }
                                        ]

                                        // Função para renderizar os posts na tela
                                        function renderizarFeed() {
                                          const feed = document.getElementById("feed")
                                            feed.innerHTML = ""

                                              posts.forEach((post, indice) => {
                                                  feed.innerHTML += `
                                                        <div class="post">
                                                                <div class="cabecalho-post">
                                                                          <div class="foto-perfil">${post.nome[0]}</div>
                                                                                    <div>
                                                                                                <div class="nome-usuario">${post.nome}</div>
                                                                                                            <div class="data-post">${post.data}</div>
                                                                                                                      </div>
                                                                                                                              </div>
                                                                                                                                      <p class="conteudo-post">${post.texto}</p>
                                                                                                                                              <div class="botoes">
                                                                                                                                                        <span onclick="curtir(${indice})">❤️ ${post.curtidas}</span>
                                                                                                                                                                  <span>💬 Comentar</span>
                                                                                                                                                                          </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                    `
                                                                                                                                                                                      })
                                                                                                                                                                                      }

                                                                                                                                                                                      // Função de curtir
                                                                                                                                                                                      function curtir(indice) {
                                                                                                                                                                                        posts[indice].curtidas++
                                                                                                                                                                                          renderizarFeed()
                                                                                                                                                                                          }

                                                                                                                                                                                          // Função para adicionar novo post
                                                                                                                                                                                          function adicionarPost() {
                                                                                                                                                                                            const campoTexto = document.getElementById("novoPost")
                                                                                                                                                                                              const texto = campoTexto.value.trim()

                                                                                                                                                                                                if(texto !== "") {
                                                                                                                                                                                                    const hoje = new Date()
                                                                                                                                                                                                        const data = `${hoje.getDate()}/${hoje.getMonth()+1}/${hoje.getFullYear()}`

                                                                                                                                                                                                            posts.unshift({
                                                                                                                                                                                                                  nome: "Eu",
                                                                                                                                                                                                                        data: data,
                                                                                                                                                                                                                              texto: texto,
                                                                                                                                                                                                                                    curtidas: 0
                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                            campoTexto.value = ""
                                                                                                                                                                                                                                                renderizarFeed()
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                  // Carregar o feed quando abrir a página
                                                                                                                                                                                                                                                  renderizarFeed()
                                                                                                                                                                                                                                                  