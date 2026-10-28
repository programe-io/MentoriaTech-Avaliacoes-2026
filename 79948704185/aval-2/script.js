
const artigos = [
  {
      titulo: "Primeiros passos no HTML",
          categoria: "Programação",
              icone: "💻",
                  descricao: "Descubra como estruturar páginas web e criar seu primeiro site.",
                      data: "12/10/2026",
                          texto: "HTML é a linguagem usada para estruturar páginas da web. Com títulos, parágrafos, imagens e links, você já consegue criar seu primeiro site. Comece com uma estrutura simples e pratique adicionando novos elementos."
                            },
                              {
                                  titulo: "O poder do CSS",
                                      categoria: "Design",
                                          icone: "🎨",
                                              descricao: "Aprenda a transformar páginas simples em experiências visuais.",
                                                  data: "15/10/2026",
                                                      texto: "CSS permite personalizar cores, fontes, espaçamentos e layouts. Experimente flexbox, grid e media queries para criar páginas bonitas que funcionem em celulares e computadores."
                                                        },
                                                          {
                                                              titulo: "Inteligência artificial",
                                                                  categoria: "Tecnologia",
                                                                      icone: "🤖",
                                                                          descricao: "Entenda como a inteligência artificial está mudando o mundo.",
                                                                              data: "18/10/2026",
                                                                                  texto: "A inteligência artificial ajuda a analisar dados, reconhecer padrões e automatizar tarefas. Ela pode apoiar a educação e a criatividade, mas precisa ser utilizada com responsabilidade."
                                                                                    },
                                                                                      {
                                                                                          titulo: "JavaScript para iniciantes",
                                                                                              categoria: "Programação",
                                                                                                  icone: "⚡",
                                                                                                      descricao: "Dê vida ao seu site com botões, eventos e interatividade.",
                                                                                                          data: "20/10/2026",
                                                                                                              texto: "JavaScript permite responder às ações dos visitantes. Você pode criar menus interativos, validar formulários e atualizar o conteúdo da página sem precisar recarregá-la."
                                                                                                                },
                                                                                                                  {
                                                                                                                      titulo: "Design que funciona",
                                                                                                                          categoria: "Design",
                                                                                                                              icone: "✨",
                                                                                                                                  descricao: "Conheça princípios para criar interfaces claras e intuitivas.",
                                                                                                                                      data: "22/10/2026",
                                                                                                                                          texto: "Um bom design facilita a leitura e ajuda as pessoas a encontrar o que procuram. Use hierarquia visual, contraste, espaços adequados e consistência nos elementos."
                                                                                                                                            },
                                                                                                                                              {
                                                                                                                                                  titulo: "O futuro da internet",
                                                                                                                                                      categoria: "Tecnologia",
                                                                                                                                                          icone: "🌐",
                                                                                                                                                              descricao: "Explore tendências que estão transformando a experiência online.",
                                                                                                                                                                  data: "25/10/2026",
                                                                                                                                                                      texto: "A internet continua evoluindo com novas ferramentas, serviços conectados e experiências digitais. Aprender os fundamentos da web ajuda você a acompanhar essas mudanças."
                                                                                                                                                                        }
                                                                                                                                                                        ];

                                                                                                                                                                        const lista = document.getElementById("lista-artigos");
                                                                                                                                                                        const pesquisa = document.getElementById("pesquisa");
                                                                                                                                                                        const mensagem = document.getElementById("mensagem");
                                                                                                                                                                        const botoes = document.querySelectorAll(".filtro");

                                                                                                                                                                        let categoriaAtual = "Todos";

                                                                                                                                                                        function mostrarArtigos() {
                                                                                                                                                                          const termo = pesquisa.value.trim().toLowerCase();

                                                                                                                                                                            const filtrados = artigos.filter(artigo => {
                                                                                                                                                                                const combinaCategoria =
                                                                                                                                                                                      categoriaAtual === "Todos" ||
                                                                                                                                                                                            artigo.categoria === categoriaAtual;

                                                                                                                                                                                                const combinaTexto =
                                                                                                                                                                                                      (artigo.titulo + " " + artigo.descricao + " " +
                                                                                                                                                                                                            artigo.categoria).toLowerCase().includes(termo);

                                                                                                                                                                                                                return combinaCategoria && combinaTexto;
                                                                                                                                                                                                                  });

                                                                                                                                                                                                                    lista.innerHTML = "";
                                                                                                                                                                                                                      mensagem.textContent = "";

                                                                                                                                                                                                                        if (filtrados.length === 0) {
                                                                                                                                                                                                                            mensagem.textContent = "Nenhum artigo encontrado. Tente outra pesquisa.";
                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                    filtrados.forEach(artigo => {
                                                                                                                                                                                                                                        const card = document.createElement("article");
                                                                                                                                                                                                                                            card.className = "artigo";

                                                                                                                                                                                                                                                const capa = document.createElement("div");
                                                                                                                                                                                                                                                    capa.className = "capa";
                                                                                                                                                                                                                                                        capa.textContent = artigo.icone;

                                                                                                                                                                                                                                                            const conteudo = document.createElement("div");
                                                                                                                                                                                                                                                                conteudo.className = "conteudo";

                                                                                                                                                                                                                                                                    const categoria = document.createElement("span");
                                                                                                                                                                                                                                                                        categoria.className = "categoria";
                                                                                                                                                                                                                                                                            categoria.textContent = artigo.categoria.toUpperCase();

                                                                                                                                                                                                                                                                                const titulo = document.createElement("h3");
                                                                                                                                                                                                                                                                                    titulo.textContent = artigo.titulo;

                                                                                                                                                                                                                                                                                        const descricao = document.createElement("p");
                                                                                                                                                                                                                                                                                            descricao.textContent = artigo.descricao;

                                                                                                                                                                                                                                                                                                const data = document.createElement("small");
                                                                                                                                                                                                                                                                                                    data.textContent = "📅 " + artigo.data;

                                                                                                                                                                                                                                                                                                        const botao = document.createElement("button");
                                                                                                                                                                                                                                                                                                            botao.className = "ler";
                                                                                                                                                                                                                                                                                                                botao.textContent = "Ler artigo →";

                                                                                                                                                                                                                                                                                                                    botao.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                          alert(artigo.titulo + "\n\n" + artigo.texto);
                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                                  conteudo.append(categoria, titulo, descricao, data);
                                                                                                                                                                                                                                                                                                                                      conteudo.appendChild(document.createElement("br"));
                                                                                                                                                                                                                                                                                                                                          conteudo.appendChild(botao);
                                                                                                                                                                                                                                                                                                                                              card.append(capa, conteudo);
                                                                                                                                                                                                                                                                                                                                                  lista.appendChild(card);
                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                    pesquisa.addEventListener("input", mostrarArtigos);

                                                                                                                                                                                                                                                                                                                                                    botoes.forEach(botao => {
                                                                                                                                                                                                                                                                                                                                                      botao.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                                                          categoriaAtual = botao.dataset.categoria;

                                                                                                                                                                                                                                                                                                                                                              botoes.forEach(item =>
                                                                                                                                                                                                                                                                                                                                                                    item.classList.remove("selecionado")
                                                                                                                                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                                                                                                                                            botao.classList.add("selecionado");
                                                                                                                                                                                                                                                                                                                                                                                mostrarArtigos();
                                                                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                                  document.getElementById("tema").addEventListener("click", evento => {
                                                                                                                                                                                                                                                                                                                                                                                    document.body.classList.toggle("escuro");

                                                                                                                                                                                                                                                                                                                                                                                      evento.currentTarget.textContent =
                                                                                                                                                                                                                                                                                                                                                                                          document.body.classList.contains("escuro") ? "☀️" : "🌙";
                                                                                                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                                                                                                          mostrarArtigos();
                                                                                                                                                                                                                                                                                                                                                                                          