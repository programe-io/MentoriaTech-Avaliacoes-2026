let posts = JSON.parse(localStorage.getItem('posts')) || [
      {
          id: 1,
              titulo: "Bem-vindo ao Blog",
                  autor: "Admin",
                      categoria: "Geral",
                          conteudo: "Este é o primeiro post do blog. Você pode criar, visualizar, pesquisar e excluir posts.",
                              data: "14/11/2026"
                                },
                                  {
                                      id: 2,
                                          titulo: "Por que aprender programação?",
                                              autor: "Admin",
                                                  categoria: "Programação",
                                                      conteudo: "Programação desenvolve raciocínio lógico e abre muitas oportunidades.",
                                                          data: "14/11/2026"
                                                            },
                                                              {
                                                                  id: 3,
                                                                      titulo: "Dicas para estudar",
                                                                          autor: "Admin",
                                                                              categoria: "Estudos",
                                                                                  conteudo: "1. Pratique todo dia\n2. Faça projetos reais\n3. Revise o que aprendeu",
                                                                                      data: "14/11/2026"
                                                                                        }
                                                                                        ];

                                                                                        let filtroAtual = "";

                                                                                        function salvar() {
                                                                                          localStorage.setItem('posts', JSON.stringify(posts));
                                                                                          }

                                                                                          function voltar() {
                                                                                            document.getElementById('listaView').classList.remove('hidden');
                                                                                              document.getElementById('postView').classList.add('hidden');
                                                                                                document.getElementById('formView').classList.add('hidden');
                                                                                                  render();
                                                                                                  }

                                                                                                  function mostrarForm() {
                                                                                                    document.getElementById('listaView').classList.add('hidden');
                                                                                                      document.getElementById('postView').classList.add('hidden');
                                                                                                        document.getElementById('formView').classList.remove('hidden');
                                                                                                        }

                                                                                                        function filtrar(cat) {
                                                                                                          filtroAtual = cat;
                                                                                                            voltar();
                                                                                                            }

                                                                                                            function render() {
                                                                                                              let busca = document.getElementById('busca').value.toLowerCase();
                                                                                                                let lista = document.getElementById('lista');
                                                                                                                  lista.innerHTML = "";

                                                                                                                    let filtrados = posts.filter(p =>
                                                                                                                        (!filtroAtual || p.categoria === filtroAtual) &&
                                                                                                                            (!busca || p.titulo.toLowerCase().includes(busca) || p.conteudo.toLowerCase().includes(busca))
                                                                                                                              ).reverse();

                                                                                                                                if (!filtrados.length) {
                                                                                                                                    lista.innerHTML = "<div class='card'><p>Nenhum post encontrado.</p></div>";
                                                                                                                                        return;
                                                                                                                                          }

                                                                                                                                            filtrados.forEach(p => {
                                                                                                                                                lista.innerHTML += `
                                                                                                                                                      <div class="card">
                                                                                                                                                              <h2 onclick="abrir(${p.id})">${p.titulo}</h2>
                                                                                                                                                                      <p class="meta">Por ${p.autor} • ${p.data} • <span class="badge">${p.categoria}</span></p>
                                                                                                                                                                              <p>${p.conteudo.substring(0, 180)}...</p><br>
                                                                                                                                                                                      <button class="btn" onclick="abrir(${p.id})">Ler mais</button>
                                                                                                                                                                                            </div>
                                                                                                                                                                                                `;
                                                                                                                                                                                                  });
                                                                                                                                                                                                  }

                                                                                                                                                                                                  function abrir(id) {
                                                                                                                                                                                                    let p = posts.find(x => x.id === id);
                                                                                                                                                                                                      if (!p) return;

                                                                                                                                                                                                        document.getElementById('listaView').classList.add('hidden');
                                                                                                                                                                                                          document.getElementById('formView').classList.add('hidden');
                                                                                                                                                                                                            document.getElementById('postView').classList.remove('hidden');

                                                                                                                                                                                                              document.getElementById('postDetalhe').innerHTML = `
                                                                                                                                                                                                                  <h2>${p.titulo}</h2>
                                                                                                                                                                                                                      <p class="meta">Por ${p.autor} • ${p.data} • <span class="badge">${p.categoria}</span></p>
                                                                                                                                                                                                                          <div class="conteudo">${p.conteudo}</div><br>
                                                                                                                                                                                                                              <button class="btn btn-cinza" onclick="voltar()">← Voltar</button>
                                                                                                                                                                                                                                  <button class="btn btn-vermelho" onclick="excluir(${p.id})">Excluir</button>
                                                                                                                                                                                                                                    `;
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                    function criar() {
                                                                                                                                                                                                                                      let titulo = document.getElementById('titulo').value.trim();
                                                                                                                                                                                                                                        let autor = document.getElementById('autor').value.trim();
                                                                                                                                                                                                                                          let categoria = document.getElementById('categoria').value;
                                                                                                                                                                                                                                            let conteudo = document.getElementById('conteudo').value.trim();

                                                                                                                                                                                                                                              if (!titulo || !autor || !conteudo) {
                                                                                                                                                                                                                                                  alert("Preencha todos os campos!");
                                                                                                                                                                                                                                                      return;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                          let novoId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;

                                                                                                                                                                                                                                                            posts.push({
                                                                                                                                                                                                                                                                id: novoId,
                                                                                                                                                                                                                                                                    titulo,
                                                                                                                                                                                                                                                                        autor,
                                                                                                                                                                                                                                                                            categoria,
                                                                                                                                                                                                                                                                                conteudo,
                                                                                                                                                                                                                                                                                    data: new Date().toLocaleDateString('pt-BR')
                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                        salvar();

                                                                                                                                                                                                                                                                                          document.getElementById('titulo').value = "";
                                                                                                                                                                                                                                                                                            document.getElementById('autor').value = "";
                                                                                                                                                                                                                                                                                              document.getElementById('conteudo').value = "";

                                                                                                                                                                                                                                                                                                voltar();
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                function excluir(id) {
                                                                                                                                                                                                                                                                                                  if (confirm("Excluir este post?")) {
                                                                                                                                                                                                                                                                                                      posts = posts.filter(p => p.id !== id);
                                                                                                                                                                                                                                                                                                          salvar();
                                                                                                                                                                                                                                                                                                              voltar();
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                render();
]