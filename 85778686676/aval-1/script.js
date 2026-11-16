// ===== Posts iniciais =====
const postsIniciais = [
  {
      titulo: "Meus primeiros passos no HTML",
          categoria: "Estudos",
              texto: "Aprender HTML foi o primeiro passo para criar páginas web. Tags como h1, p e a são a base de tudo.",
                  data: "2026-11-02"
                    },
                      {
                          titulo: "Como o CSS muda a cara de um site",
                              categoria: "Tecnologia",
                                  texto: "Com CSS dá para mudar cores, fontes e layout. Flexbox e Grid deixam tudo mais organizado.",
                                      data: "2026-11-05"
                                        },
                                          {
                                              titulo: "Fiz um projeto pequeno com Python",
                                                  categoria: "Projetos",
                                                      texto: "Comecei com um programa simples que lê números e mostra a média. Pouco a pouco fui adicionando mais recursos.",
                                                          data: "2026-11-09"
                                                            },
                                                              {
                                                                  titulo: "O que é um banco de dados?",
                                                                      categoria: "Estudos",
                                                                          texto: "Um banco de dados guarda informações em tabelas. Com SQL, é possível consultar e organizar esses dados.",
                                                                              data: "2026-11-12"
                                                                                }
                                                                                ];

                                                                                // ===== Elementos da página =====
                                                                                const listaPosts = document.getElementById("lista-posts");
                                                                                const semResultado = document.getElementById("sem-resultado");
                                                                                const campoBusca = document.getElementById("busca");
                                                                                const filtros = document.querySelectorAll(".filtro");
                                                                                const formPost = document.getElementById("form-post");
                                                                                const btnTema = document.getElementById("btn-tema");

                                                                                // ===== Estado =====
                                                                                let categoriaAtual = "todos";
                                                                                let posts = carregarPosts();

                                                                                // ===== Salvar e carregar (localStorage) =====
                                                                                function carregarPosts() {
                                                                                  const salvos = localStorage.getItem("posts-blog");
                                                                                    return salvos ? JSON.parse(salvos) : [...postsIniciais];
                                                                                    }

                                                                                    function salvarPosts() {
                                                                                      localStorage.setItem("posts-blog", JSON.stringify(posts));
                                                                                      }

                                                                                      // ===== Formatar data (2026-11-02 -> 02/11/2026) =====
                                                                                      function formatarData(dataISO) {
                                                                                        const [ano, mes, dia] = dataISO.split("-");
                                                                                          return `${dia}/${mes}/${ano}`;
                                                                                          }

                                                                                          // ===== Criar o cartão de um post =====
                                                                                          function criarCartao(post) {
                                                                                            const cartao = document.createElement("article");
                                                                                              cartao.className = "post";

                                                                                                const tag = document.createElement("span");
                                                                                                  tag.className = "tag";
                                                                                                    tag.textContent = post.categoria;

                                                                                                      const titulo = document.createElement("h3");
                                                                                                        titulo.textContent = post.titulo;

                                                                                                          const texto = document.createElement("p");
                                                                                                            texto.textContent = post.texto;

                                                                                                              const data = document.createElement("span");
                                                                                                                data.className = "data";
                                                                                                                  data.textContent = formatarData(post.data);

                                                                                                                    cartao.append(tag, titulo, texto, data);
                                                                                                                      return cartao;
                                                                                                                      }

                                                                                                                      // ===== Mostrar os posts na tela (aplicando busca e filtro) =====
                                                                                                                      function mostrarPosts() {
                                                                                                                        const termo = campoBusca.value.trim().toLowerCase();

                                                                                                                          const filtrados = posts.filter((post) => {
                                                                                                                              const categoriaOk = categoriaAtual === "todos" || post.categoria === categoriaAtual;
                                                                                                                                  const buscaOk =
                                                                                                                                        post.titulo.toLowerCase().includes(termo) ||
                                                                                                                                              post.texto.toLowerCase().includes(termo);
                                                                                                                                                  return categoriaOk && buscaOk;
                                                                                                                                                    });

                                                                                                                                                      listaPosts.innerHTML = "";
                                                                                                                                                        filtrados.forEach((post) => listaPosts.appendChild(criarCartao(post)));

                                                                                                                                                          semResultado.hidden = filtrados.length > 0;
                                                                                                                                                          }

                                                                                                                                                          // ===== Eventos =====
                                                                                                                                                          campoBusca.addEventListener("input", mostrarPosts);

                                                                                                                                                          filtros.forEach((botao) => {
                                                                                                                                                            botao.addEventListener("click", () => {
                                                                                                                                                                filtros.forEach((b) => b.classList.remove("ativo"));
                                                                                                                                                                    botao.classList.add("ativo");
                                                                                                                                                                        categoriaAtual = botao.dataset.categoria;
                                                                                                                                                                            mostrarPosts();
                                                                                                                                                                              });
                                                                                                                                                                              });

                                                                                                                                                                              formPost.addEventListener("submit", (evento) => {
                                                                                                                                                                                evento.preventDefault(); // não recarrega a página

                                                                                                                                                                                  const novoPost = {
                                                                                                                                                                                      titulo: document.getElementById("titulo").value.trim(),
                                                                                                                                                                                          categoria: document.getElementById("categoria").value,
                                                                                                                                                                                              texto: document.getElementById("texto").value.trim(),
                                                                                                                                                                                                  data: new Date().toISOString().slice(0, 10)
                                                                                                                                                                                                    };

                                                                                                                                                                                                      posts.unshift(novoPost); // adiciona no início da lista
                                                                                                                                                                                                        salvarPosts();
                                                                                                                                                                                                          formPost.reset();

                                                                                                                                                                                                            // volta para "Todos" para o novo post aparecer
                                                                                                                                                                                                              categoriaAtual = "todos";
                                                                                                                                                                                                                campoBusca.value = "";
                                                                                                                                                                                                                  filtros.forEach((b) => b.classList.toggle("ativo", b.dataset.categoria === "todos"));
                                                                                                                                                                                                                    mostrarPosts();

                                                                                                                                                                                                                      document.getElementById("posts").scrollIntoView();
                                                                                                                                                                                                                      });

                                                                                                                                                                                                                      // ===== Tema claro/escuro =====
                                                                                                                                                                                                                      function aplicarTema(escuro) {
                                                                                                                                                                                                                        document.body.classList.toggle("escuro", escuro);
                                                                                                                                                                                                                          btnTema.textContent = escuro ? "☀️" : "🌙";
                                                                                                                                                                                                                          }

                                                                                                                                                                                                                          btnTema.addEventListener("click", () => {
                                                                                                                                                                                                                            const escuro = !document.body.classList.contains("escuro");
                                                                                                                                                                                                                              aplicarTema(escuro);
                                                                                                                                                                                                                                localStorage.setItem("tema-escuro", escuro);
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                aplicarTema(localStorage.getItem("tema-escuro") === "true");

                                                                                                                                                                                                                                // ===== Ano no rodapé =====
                                                                                                                                                                                                                                document.getElementById("ano").textContent = new Date().getFullYear();

                                                                                                                                                                                                                                // ===== Início =====
                                                                                                                                                                                                                                mostrarPosts();
                                                                                                                                                                                                                                