
function like(button) {
  if (button.innerText === "♡ Curtir") {
      button.innerText = "❤️ Curtido";
        } else {
            button.innerText = "♡ Curtir";
              }
              }

              function publish() {
                const file = document.getElementById("photo").files[0];

                  if (!file) {
                      alert("Escolha uma foto primeiro! 💗");
                          return;
                            }

                              const reader = new FileReader();

                                reader.onload = function(event) {
                                    const post = document.createElement("div");

                                        post.className = "post";

                                            post.innerHTML = `
                                                  <div class="post-info">
                                                          <strong>Meu perfil 💗</strong>
                                                                </div>

                                                                      <img src="${event.target.result}">

                                                                            <div class="post-info">
                                                                                    <button onclick="like(this)">♡ Curtir</button>
                                                                                            <p>Um novo momento! ✨</p>
                                                                                                  </div>
                                                                                                      `;

                                                                                                          document.getElementById("feed").prepend(post);
                                                                                                            };

                                                                                                              reader.readAsDataURL(file);
                                                                                                              }
                                                                                                              