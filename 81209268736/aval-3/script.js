
// Curtir publicação
document.querySelectorAll(".post").forEach(post => {
    const curtida = post.querySelector(".post-actions span");

        curtida.addEventListener("click", () => {
                if (curtida.textContent === "❤️") {
                            curtida.textContent = "🤍";
                                    } else {
                                                curtida.textContent = "❤️";
                                                        }
                                                            });
                                                            });

                                                            // Criar uma nova publicação
                                                            function publicar() {
                                                                const texto = document.getElementById("novaPublicacao");
                                                                    const feed = document.querySelector(".feed");

                                                                        if (texto.value.trim() === "") {
                                                                                alert("Digite algo antes de publicar!");
                                                                                        return;
                                                                                            }

                                                                                                const post = document.createElement("article");
                                                                                                    post.className = "post";

                                                                                                        post.innerHTML = `
                                                                                                                <div class="post-header">
                                                                                                                            <img src="https://i.pravatar.cc/100?img=1">
                                                                                                                                        <strong>Maria Silva</strong>
                                                                                                                                                </div>

                                                                                                                                                        <div class="post-content">
                                                                                                                                                                    <p>${texto.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                                                                                                                                                                            </div>

                                                                                                                                                                                    <div class="post-actions">
                                                                                                                                                                                                <span>🤍</span>
                                                                                                                                                                                                            <span>💬</span>
                                                                                                                                                                                                                        <span>📤</span>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                        feed.prepend(post);
                                                                                                                                                                                                                                            texto.value = "";

                                                                                                                                                                                                                                                const curtida = post.querySelector(".post-actions span");

                                                                                                                                                                                                                                                    curtida.addEventListener("click", () => {
                                                                                                                                                                                                                                                            curtida.textContent =
                                                                                                                                                                                                                                                                        curtida.textContent === "❤️" ? "🤍" : "❤️";
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                            