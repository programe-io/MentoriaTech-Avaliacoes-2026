
const formulario = document.getElementById("feedbackForm");
const listaFeedbacks = document.getElementById("listaFeedbacks");

// Recupera os feedbacks salvos no navegador
let feedbacks = JSON.parse(
    localStorage.getItem("feedbacks")
    ) || [];

    function mostrarFeedbacks() {
        listaFeedbacks.innerHTML = "";

            feedbacks.forEach(function(feedback) {
                    const card = document.createElement("div");
                            card.className = "feedback";

                                    const nome = document.createElement("h3");
                                            nome.textContent = feedback.nome;

                                                    const mensagem = document.createElement("p");
                                                            mensagem.textContent = feedback.mensagem;

                                                                    const nota = document.createElement("p");
                                                                            nota.textContent = "Avaliação: " +
                                                                                        "⭐".repeat(feedback.nota);

                                                                                                card.appendChild(nome);
                                                                                                        card.appendChild(mensagem);
                                                                                                                card.appendChild(nota);

                                                                                                                        listaFeedbacks.appendChild(card);
                                                                                                                            });
                                                                                                                            }

                                                                                                                            formulario.addEventListener("submit", function(event) {
                                                                                                                                event.preventDefault();

                                                                                                                                    const nome = document.getElementById("nome").value.trim();
                                                                                                                                        const mensagem = document.getElementById("mensagem").value.trim();
                                                                                                                                            const nota = Number(document.getElementById("nota").value);

                                                                                                                                                if (!nome || !mensagem) {
                                                                                                                                                        alert("Preencha todos os campos!");
                                                                                                                                                                return;
                                                                                                                                                                    }

                                                                                                                                                                        const novoFeedback = {
                                                                                                                                                                                nome: nome,
                                                                                                                                                                                        mensagem: mensagem,
                                                                                                                                                                                                nota: nota
                                                                                                                                                                                                    };

                                                                                                                                                                                                        feedbacks.push(novoFeedback);

                                                                                                                                                                                                            localStorage.setItem(
                                                                                                                                                                                                                    "feedbacks",
                                                                                                                                                                                                                            JSON.stringify(feedbacks)
                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                    formulario.reset();
                                                                                                                                                                                                                                        mostrarFeedbacks();

                                                                                                                                                                                                                                            alert("Feedback enviado com sucesso!");
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                            mostrarFeedbacks();
                                                                                                                                                                                                                                            