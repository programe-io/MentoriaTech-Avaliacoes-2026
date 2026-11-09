
let seguindo = false;
let quantidadeSeguidores = 1250;
let timer;

function seguir() {
    const botao = document.getElementById("seguir");
        const numero = document.getElementById("seguidores");

            seguindo = !seguindo;

                if (seguindo) {
                        quantidadeSeguidores++;
                                botao.innerText = "Seguindo ✓";
                                        botao.style.background = "#172c29";
                                                botao.style.color = "#00e69a";
                                                        botao.style.border = "1px solid #00e69a";

                                                                notificar("Você começou a seguir Luis Gustavo! 💚");
                                                                    } else {
                                                                            quantidadeSeguidores--;
                                                                                    botao.innerText = "Seguir +";
                                                                                            botao.style.background = "";
                                                                                                    botao.style.color = "white";
                                                                                                            botao.style.border = "";

                                                                                                                    notificar("Você deixou de seguir.");
                                                                                                                        }

                                                                                                                            numero.innerText = quantidadeSeguidores.toLocaleString("pt-BR");
                                                                                                                            }

                                                                                                                            function curtir(post) {
                                                                                                                                post.classList.toggle("curtido");

                                                                                                                                    const coracao = post.querySelector(".coracao");

                                                                                                                                        if (post.classList.contains("curtido")) {
                                                                                                                                                coracao.innerText = "♥";
                                                                                                                                                    } else {
                                                                                                                                                            coracao.innerText = "♡";
                                                                                                                                                                }
                                                                                                                                                                }

                                                                                                                                                                function mudarAba(aba, botao) {
                                                                                                                                                                    document.getElementById("posts").style.display =
                                                                                                                                                                            aba === "posts" ? "grid" : "none";

                                                                                                                                                                                document.getElementById("marcados").style.display =
                                                                                                                                                                                        aba === "marcados" ? "block" : "none";

                                                                                                                                                                                            document.querySelectorAll(".aba").forEach(item => {
                                                                                                                                                                                                    item.classList.remove("ativa");
                                                                                                                                                                                                        });

                                                                                                                                                                                                            botao.classList.add("ativa");
                                                                                                                                                                                                            }

                                                                                                                                                                                                            function compartilhar() {
                                                                                                                                                                                                                if (navigator.share) {
                                                                                                                                                                                                                        navigator.share({
                                                                                                                                                                                                                                    title: "Luis Gustavo",
                                                                                                                                                                                                                                                text: "Confira este perfil!",
                                                                                                                                                                                                                                                            url: window.location.href
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                notificar("Copie o endereço desta página para compartilhar!");
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                    function notificar(texto) {
                                                                                                                                                                                                                                                                                        const caixa = document.getElementById("notificacao");

                                                                                                                                                                                                                                                                                            caixa.innerText = texto;
                                                                                                                                                                                                                                                                                                caixa.classList.add("visivel");

                                                                                                                                                                                                                                                                                                    clearTimeout(timer);

                                                                                                                                                                                                                                                                                                        timer = setTimeout(() => {
                                                                                                                                                                                                                                                                                                                caixa.classList.remove("visivel");
                                                                                                                                                                                                                                                                                                                    }, 2500);
                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                    