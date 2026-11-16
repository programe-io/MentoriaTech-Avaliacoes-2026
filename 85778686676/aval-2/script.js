// ===== Elementos =====
const form = document.getElementById("form-publicar");
const campoNome = document.getElementById("nome");
const campoMensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const feed = document.getElementById("feed");
const vazio = document.getElementById("vazio");

const LIMITE = 200;
const CORES = ["#1d9bf0", "#7856ff", "#f91880", "#00ba7c", "#ff7a00", "#ffd400"];

// ===== Dados (salvos no navegador) =====
let publicacoes = JSON.parse(localStorage.getItem("mini-feed")) || [
  {
      id: 1,
          nome: "Ana",
              mensagem: "Bem-vindos ao Mini Feed! Escreva algo aí em cima 👆",
                  hora: Date.now() - 1000 * 60 * 60,
                      curtidas: 3,
                          curtiu: false
                            }
                            ];

                            function salvar() {
                              localStorage.setItem("mini-feed", JSON.stringify(publicacoes));
                              }

                              // ===== Tempo relativo (há 5 min, há 2 h...) =====
                              function tempoAtras(momento) {
                                const segundos = Math.floor((Date.now() - momento) / 1000);
                                  if (segundos < 60) return "agora";
                                    const minutos = Math.floor(segundos / 60);
                                      if (minutos < 60) return `há ${minutos} min`;
                                        const horas = Math.floor(minutos / 60);
                                          if (horas < 24) return `há ${horas} h`;
                                            return `há ${Math.floor(horas / 24)} d`;
                                            }

                                            // Cor do avatar baseada no nome (o mesmo nome sempre tem a mesma cor)
                                            function corDoNome(nome) {
                                              let soma = 0;
                                                for (const letra of nome) soma += letra.charCodeAt(0);
                                                  return CORES[soma % CORES.length];
                                                  }

                                                  // ===== Criar o elemento de uma publicação =====
                                                  function criarPublicacao(pub) {
                                                    const item = document.createElement("article");
                                                      item.className = "publicacao";

                                                        const avatar = document.createElement("div");
                                                          avatar.className = "avatar";
                                                            avatar.textContent = pub.nome.charAt(0).toUpperCase();
                                                              avatar.style.background = corDoNome(pub.nome);

                                                                const conteudo = document.createElement("div");
                                                                  conteudo.className = "conteudo";

                                                                    const cabecalho = document.createElement("div");
                                                                      cabecalho.className = "cabecalho";
                                                                        const autor = document.createElement("span");
                                                                          autor.className = "autor";
                                                                            autor.textContent = pub.nome;
                                                                              const hora = document.createElement("span");
                                                                                hora.className = "hora";
                                                                                  hora.textContent = tempoAtras(pub.hora);
                                                                                    cabecalho.append(autor, hora);

                                                                                      const texto = document.createElement("p");
                                                                                        texto.className = "texto";
                                                                                          texto.textContent = pub.mensagem;

                                                                                            const acoes = document.createElement("div");
                                                                                              acoes.className = "acoes";

                                                                                                const btnCurtir = document.createElement("button");
                                                                                                  btnCurtir.className = "curtir" + (pub.curtiu ? " ativo" : "");
                                                                                                    btnCurtir.textContent = `${pub.curtiu ? "❤️" : "🤍"} ${pub.curtidas}`;
                                                                                                      btnCurtir.addEventListener("click", () => curtir(pub.id));

                                                                                                        const btnApagar = document.createElement("button");
                                                                                                          btnApagar.className = "apagar";
                                                                                                            btnApagar.textContent = "🗑 Apagar";
                                                                                                              btnApagar.addEventListener("click", () => apagar(pub.id));

                                                                                                                acoes.append(btnCurtir, btnApagar);
                                                                                                                  conteudo.append(cabecalho, texto, acoes);
                                                                                                                    item.append(avatar, conteudo);
                                                                                                                      return item;
                                                                                                                      }

                                                                                                                      // ===== Mostrar o feed =====
                                                                                                                      function mostrarFeed() {
                                                                                                                        feed.innerHTML = "";
                                                                                                                          publicacoes.forEach((pub) => feed.appendChild(criarPublicacao(pub)));
                                                                                                                            vazio.hidden = publicacoes.length > 0;
                                                                                                                            }

                                                                                                                            // ===== Ações =====
                                                                                                                            function curtir(id) {
                                                                                                                              const pub = publicacoes.find((p) => p.id === id);
                                                                                                                                pub.curtiu = !pub.curtiu;
                                                                                                                                  pub.curtidas += pub.curtiu ? 1 : -1;
                                                                                                                                    salvar();
                                                                                                                                      mostrarFeed();
                                                                                                                                      }

                                                                                                                                      function apagar(id) {
                                                                                                                                        publicacoes = publicacoes.filter((p) => p.id !== id);
                                                                                                                                          salvar();
                                                                                                                                            mostrarFeed();
                                                                                                                                            }

                                                                                                                                            // ===== Contador de caracteres =====
                                                                                                                                            campoMensagem.addEventListener("input", () => {
                                                                                                                                              const restantes = LIMITE - campoMensagem.value.length;
                                                                                                                                                contador.textContent = restantes;
                                                                                                                                                  contador.classList.toggle("perto", restantes <= 20);
                                                                                                                                                  });

                                                                                                                                                  // ===== Publicar =====
                                                                                                                                                  form.addEventListener("submit", (evento) => {
                                                                                                                                                    evento.preventDefault();

                                                                                                                                                      const nome = campoNome.value.trim();
                                                                                                                                                        const mensagem = campoMensagem.value.trim();
                                                                                                                                                          if (!nome || !mensagem) return;

                                                                                                                                                            publicacoes.unshift({
                                                                                                                                                                id: Date.now(),
                                                                                                                                                                    nome: nome,
                                                                                                                                                                        mensagem: mensagem,
                                                                                                                                                                            hora: Date.now(),
                                                                                                                                                                                curtidas: 0,
                                                                                                                                                                                    curtiu: false
                                                                                                                                                                                      });

                                                                                                                                                                                        salvar();
                                                                                                                                                                                          mostrarFeed();

                                                                                                                                                                                            campoMensagem.value = "";
                                                                                                                                                                                              contador.textContent = LIMITE;
                                                                                                                                                                                                contador.classList.remove("perto");
                                                                                                                                                                                                });

                                                                                                                                                                                                // ===== Início =====
                                                                                                                                                                                                mostrarFeed();
                                                                                                                                                                                                