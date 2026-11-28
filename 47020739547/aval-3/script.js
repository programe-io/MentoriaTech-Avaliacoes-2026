
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao site Introdução à Web e à Internet!");
    });

    // Criar botão de tema
    const botao = document.createElement("button");

    botao.textContent = "🌙 Mudar tema";
    botao.style.padding = "10px 20px";
    botao.style.margin = "15px";
    botao.style.cursor = "pointer";
    botao.style.border = "none";
    botao.style.borderRadius = "8px";
    botao.style.backgroundColor = "#1769aa";
    botao.style.color = "white";

    // Adicionar botão ao cabeçalho
    document.querySelector("header").appendChild(botao);

    // Alternar tema
    botao.addEventListener("click", function() {
        document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                    document.body.style.backgroundColor = "#222";
                            document.body.style.color = "white";
                                    botao.textContent = "☀️ Mudar tema";
                                        } else {
                                                document.body.style.backgroundColor = "#f0f4f8";
                                                        document.body.style.color = "#333";
                                                                botao.textContent = "🌙 Mudar tema";
                                                                    }
                                                                    });

                                                                    // Mensagem ao clicar nos links
                                                                    document.querySelectorAll("nav a").forEach(link => {
                                                                        link.addEventListener("click", function() {
                                                                                console.log("Você acessou: " + link.textContent);
                                                                                    });
                                                                                    });
                                                                                    