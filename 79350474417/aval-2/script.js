
let notaSelecionada = 0;
let reacaoSelecionada = "";

const estrelas = document.querySelectorAll(
    ".estrelas span"
    );

    const reacoes = document.querySelectorAll(
        ".reacoes button"
        );

        // Selecionar estrelas
        estrelas.forEach(estrela => {
            estrela.addEventListener("click", () => {
                    notaSelecionada = Number(
                                estrela.dataset.nota
                                        );

                                                atualizarEstrelas();
                                                    });
                                                    });

                                                    function atualizarEstrelas() {
                                                        estrelas.forEach(estrela => {
                                                                const nota = Number(estrela.dataset.nota);

                                                                        estrela.classList.toggle(
                                                                                    "ativa",
                                                                                                nota <= notaSelecionada
                                                                                                        );
                                                                                                            });
                                                                                                            }

                                                                                                            // Selecionar reação
                                                                                                            reacoes.forEach(botao => {
                                                                                                                botao.addEventListener("click", () => {
                                                                                                                        reacaoSelecionada = botao.dataset.reacao;

                                                                                                                                reacoes.forEach(item => {
                                                                                                                                            item.classList.remove("selecionada");
                                                                                                                                                    });

                                                                                                                                                            botao.classList.add("selecionada");
                                                                                                                                                                });
                                                                                                                                                                });

                                                                                                                                                                // Recuperar feedbacks
                                                                                                                                                                let feedbacks = JSON.parse(
                                                                                                                                                                    localStorage.getItem("feedbacksInstagram") || "[]"
                                                                                                                                                                    );

                                                                                                                                                                    // Enviar feedback
                                                                                                                                                                    function enviarFeedback() {

                                                                                                                                                                        const nome = document.getElementById("nome").value.trim();

                                                                                                                                                                            const comentario = document.getElementById("comentario").value.trim();

                                                                                                                                                                                const mensagem = document.getElementById("mensagem");

                                                                                                                                                                                    if (!nome || !comentario) {
                                                                                                                                                                                            mensagem.textContent = "Preencha seu nome e comentário!";
                                                                                                                                                                                                    return;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            if (notaSelecionada === 0) {
                                                                                                                                                                                                                    mensagem.textContent = "Selecione uma avaliação!";
                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                    if (!reacaoSelecionada) {
                                                                                                                                                                                                                                            mensagem.textContent = "Escolha uma reação!";
                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            const novoFeedback = {
                                                                                                                                                                                                                                                                    nome: nome,
                                                                                                                                                                                                                                                                            comentario: comentario,
                                                                                                                                                                                                                                                                                    nota: notaSelecionada,
                                                                                                                                                                                                                                                                                            reacao: reacaoSelecionada,
                                                                                                                                                                                                                                                                                                    data: new Date().toLocaleDateString("pt-BR")
                                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                            feedbacks.unshift(novoFeedback);

                                                                                                                                                                                                                                                                                                                localStorage.setItem(
                                                                                                                                                                                                                                                                                                                        "feedbacksInstagram",
                                                                                                                                                                                                                                                                                                                                JSON.stringify(feedbacks)
                                                                                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                                                                                        mensagem.textContent = "Feedback enviado com sucesso! ❤️";

                                                                                                                                                                                                                                                                                                                                            document.getElementById("nome").value = "";
                                                                                                                                                                                                                                                                                                                                                document.getElementById("comentario").value = "";

                                                                                                                                                                                                                                                                                                                                                    notaSelecionada = 0;
                                                                                                                                                                                                                                                                                                                                                        reacaoSelecionada = "";

                                                                                                                                                                                                                                                                                                                                                            atualizarEstrelas();

                                                                                                                                                                                                                                                                                                                                                                reacoes.forEach(item => {
                                                                                                                                                                                                                                                                                                                                                                        item.classList.remove("selecionada");
                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                mostrarFeedbacks();
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                // Mostrar feedbacks
                                                                                                                                                                                                                                                                                                                                                                                function mostrarFeedbacks() {

                                                                                                                                                                                                                                                                                                                                                                                    const lista = document.getElementById("lista-feedbacks");

                                                                                                                                                                                                                                                                                                                                                                                        lista.innerHTML = "";

                                                                                                                                                                                                                                                                                                                                                                                            feedbacks.forEach(item => {

                                                                                                                                                                                                                                                                                                                                                                                                    const card = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                                                                            card.className = "feedback";

                                                                                                                                                                                                                                                                                                                                                                                                                    const nome = document.createElement("h4");
                                                                                                                                                                                                                                                                                                                                                                                                                            nome.textContent = "👤 " + item.nome;

                                                                                                                                                                                                                                                                                                                                                                                                                                    const data = document.createElement("small");
                                                                                                                                                                                                                                                                                                                                                                                                                                            data.textContent = item.data;

                                                                                                                                                                                                                                                                                                                                                                                                                                                    const avaliacao = document.createElement("p");
                                                                                                                                                                                                                                                                                                                                                                                                                                                            avaliacao.textContent =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        "⭐".repeat(item.nota) +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    " | " + item.reacao;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            const comentario = document.createElement("p");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    comentario.textContent = item.comentario;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            card.append(nome, data, avaliacao, comentario);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    lista.appendChild(card);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Iniciar sistema
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        mostrarFeedbacks();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        