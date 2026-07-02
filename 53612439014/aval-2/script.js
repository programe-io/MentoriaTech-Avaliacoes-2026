// ================================
// DEVHUB ACADEMY
// ================================

// Modo escuro/claro
const botaoTema = document.getElementById("tema");

let escuro = true;

botaoTema.addEventListener("click", () => {

    if (escuro) {

            document.body.style.background = "#f5f5f5";
                    document.body.style.color = "#111";

                            document.querySelector("header").style.background = "#ffffff";
                                    document.querySelector("footer").style.background = "#ffffff";

                                            document.querySelectorAll(".card").forEach(card => {
                                                        card.style.background = "#ffffff";
                                                                    card.style.color = "#111";
                                                                            });

                                                                                    botaoTema.textContent = "☀";

                                                                                        } else {

                                                                                                document.body.style.background = "#0f172a";
                                                                                                        document.body.style.color = "#fff";

                                                                                                                document.querySelector("header").style.background = "#111827";
                                                                                                                        document.querySelector("footer").style.background = "#111827";

                                                                                                                                document.querySelectorAll(".card").forEach(card => {
                                                                                                                                            card.style.background = "#1e293b";
                                                                                                                                                        card.style.color = "#fff";
                                                                                                                                                                });

                                                                                                                                                                        botaoTema.textContent = "🌙";
                                                                                                                                                                            }

                                                                                                                                                                                escuro = !escuro;

                                                                                                                                                                                });


                                                                                                                                                                                // ================================
                                                                                                                                                                                // Animação dos Cards
                                                                                                                                                                                // ================================

                                                                                                                                                                                const cards = document.querySelectorAll(".card");

                                                                                                                                                                                cards.forEach(card => {

                                                                                                                                                                                    card.addEventListener("mouseenter", () => {
                                                                                                                                                                                            card.style.transform = "scale(1.05)";
                                                                                                                                                                                                });

                                                                                                                                                                                                    card.addEventListener("mouseleave", () => {
                                                                                                                                                                                                            card.style.transform = "scale(1)";
                                                                                                                                                                                                                });

                                                                                                                                                                                                                });


                                                                                                                                                                                                                // ================================
                                                                                                                                                                                                                // Botão "Começar Agora"
                                                                                                                                                                                                                // ================================

                                                                                                                                                                                                                const botao = document.querySelector(".banner button");

                                                                                                                                                                                                                botao.addEventListener("click", () => {

                                                                                                                                                                                                                    document.getElementById("cursos").scrollIntoView({
                                                                                                                                                                                                                            behavior: "smooth"
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                // ================================
                                                                                                                                                                                                                                // Mensagem dos Cursos
                                                                                                                                                                                                                                // ================================

                                                                                                                                                                                                                                const botoes = document.querySelectorAll(".card button");

                                                                                                                                                                                                                                botoes.forEach(botao => {

                                                                                                                                                                                                                                    botao.addEventListener("click", () => {

                                                                                                                                                                                                                                            const curso = botao.parentElement.querySelector("h3").textContent;

                                                                                                                                                                                                                                                    alert("Você abriu o curso de " + curso + ".");

                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                        // ================================
                                                                                                                                                                                                                                                        // Validação do formulário
                                                                                                                                                                                                                                                        // ================================

                                                                                                                                                                                                                                                        const formulario = document.querySelector("form");

                                                                                                                                                                                                                                                        formulario.addEventListener("submit", function(e){

                                                                                                                                                                                                                                                            e.preventDefault();

                                                                                                                                                                                                                                                                const nome = document.querySelector('input[type="text"]').value;
                                                                                                                                                                                                                                                                    const email = document.querySelector('input[type="email"]').value;
                                                                                                                                                                                                                                                                        const mensagem = document.querySelector("textarea").value;

                                                                                                                                                                                                                                                                            if(nome === "" || email === "" || mensagem === ""){

                                                                                                                                                                                                                                                                                    alert("Preencha todos os campos!");

                                                                                                                                                                                                                                                                                            return;

                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                    alert("Mensagem enviada com sucesso!");

                                                                                                                                                                                                                                                                                                        formulario.reset();

                                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                                        // ================================
                                                                                                                                                                                                                                                                                                        // Saudação conforme horário
                                                                                                                                                                                                                                                                                                        // ================================

                                                                                                                                                                                                                                                                                                        const hora = new Date().getHours();

                                                                                                                                                                                                                                                                                                        let saudacao = "";

                                                                                                                                                                                                                                                                                                        if(hora < 12){

                                                                                                                                                                                                                                                                                                            saudacao = "☀ Bom dia!";

                                                                                                                                                                                                                                                                                                            }else if(hora < 18){

                                                                                                                                                                                                                                                                                                                saudacao = "🌤 Boa tarde!";

                                                                                                                                                                                                                                                                                                                }else{

                                                                                                                                                                                                                                                                                                                    saudacao = "🌙 Boa noite!";

                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    console.log(saudacao);