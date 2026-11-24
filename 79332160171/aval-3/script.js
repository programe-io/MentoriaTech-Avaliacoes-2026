
function curtir(botao) {
  let post = botao.closest(".post");
    let likes = post.querySelector(".likes");
      let numero = Number(likes.textContent.split(" ")[0]);

        if (botao.dataset.like === "sim") {
            numero--;
                botao.textContent = "♡";
                    botao.dataset.like = "nao";
                      } else {
                          numero++;
                              botao.textContent = "♥";
                                  botao.style.color = "#e1306c";
                                      botao.dataset.like = "sim";
                                        }

                                          likes.textContent = numero + " curtidas";
                                          }

                                          function comentar(botao) {
                                            let msg = prompt("Escreva seu comentário:");
                                              if (msg && msg.trim()) {
                                                  let area = botao.closest(".post").querySelector(".comentarios");
                                                      area.textContent = "💬 " + msg;
                                                        }
                                                        }

                                                        function publicar() {
                                                          let campo = document.getElementById("texto");
                                                            let msg = campo.value.trim();

                                                              if (!msg) return;

                                                                let post = document.createElement("article");
                                                                  post.className = "post";

                                                                    let topo = document.createElement("div");
                                                                      topo.className = "topo";

                                                                        let nome = document.createElement("b");
                                                                          nome.textContent = "@XAVIER";

                                                                            let texto = document.createElement("p");
                                                                              texto.textContent = msg;

                                                                                let botao = document.createElement("button");
                                                                                  botao.textContent = "♡";
                                                                                    botao.onclick = () => curtir(botao);

                                                                                      let likes = document.createElement("b");
                                                                                        likes.className = "likes";
                                                                                          likes.textContent = "0 curtidas";

                                                                                            topo.append(nome);
                                                                                              post.append(topo, texto, botao, likes);

                                                                                                document.getElementById("feed").prepend(post);
                                                                                                  campo.value = "";
                                                                                                  }
                                                                                                  