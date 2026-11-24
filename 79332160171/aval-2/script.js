
function curtir(botao) {
  botao.textContent =
      botao.textContent.includes("Curtido")
          ? "👍 Curtir"
              : "❤️ Curtido";
              }

              function comentar(botao) {
                let msg = prompt("Escreva seu comentário:");
                  if (msg && msg.trim()) {
                      botao.nextElementSibling.textContent += "💬 " + msg;
                        }
                        }

                        function postar() {
                          let campo = document.getElementById("texto");
                            let msg = campo.value.trim();

                              if (!msg) return;

                                let post = document.createElement("section");
                                  post.className = "post";

                                    let usuario = document.createElement("b");
                                      usuario.textContent = "XAVIER";

                                        let texto = document.createElement("p");
                                          texto.textContent = msg;

                                            post.append(usuario, texto);

                                              let curtirBtn = document.createElement("button");
                                                curtirBtn.textContent = "👍 Curtir";
                                                  curtirBtn.onclick = () => curtir(curtirBtn);

                                                    let comentarBtn = document.createElement("button");
                                                      comentarBtn.textContent = "💬 Comentar";
                                                        comentarBtn.onclick = () => comentar(comentarBtn);

                                                          let comentarios = document.createElement("p");

                                                            post.append(curtirBtn, comentarBtn, comentarios);
                                                              document.getElementById("feed").prepend(post);

                                                                campo.value = "";
                                                                }
                                                                