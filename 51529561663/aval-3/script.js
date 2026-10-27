
const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");

const botaoTexto = document.getElementById("botaoTexto");
const botaoClasse = document.getElementById("botaoClasse");
const botaoTitulo = document.getElementById("botaoTitulo");

const campoNovoTitulo = document.getElementById("novoTitulo");

const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoMensagem = document.getElementById("mensagemUsuario");
const resultado = document.getElementById("resultado");

const contador = document.getElementById("contador");
const botaoContador = document.getElementById("botaoContador");
const botaoCor = document.getElementById("botaoCor");

// 1. Alterar conteúdo usando textContent
botaoTexto.addEventListener("click", function() {
    if (texto.textContent.includes("alterado")) {
            texto.textContent = "O JavaScript modificou este conteúdo!";
                } else {
                        texto.textContent =
                                    "Este texto pode ser alterado pelo JavaScript.";
                                        }
                                        });

                                        // 2. Selecionar elementos por classe
                                        botaoClasse.addEventListener("click", function() {
                                            const descricoes =
                                                    document.getElementsByClassName("descricao");

                                                        for (let i = 0; i < descricoes.length; i++) {
                                                                descricoes[i].textContent =
                                                                            "Esta descrição foi modificada pelo JavaScript.";
                                                                                }
                                                                                });

                                                                                // 3. Alterar o título usando querySelector
                                                                                botaoTitulo.addEventListener("click", function() {
                                                                                    const novoTexto = campoNovoTitulo.value.trim();

                                                                                        if (novoTexto.length < 3) {
                                                                                                alert("Digite um título com pelo menos 3 caracteres.");
                                                                                                        return;
                                                                                                            }

                                                                                                                const elementoTitulo = document.querySelector("#titulo");

                                                                                                                    elementoTitulo.textContent = novoTexto;

                                                                                                                        campoNovoTitulo.value = "";
                                                                                                                        });

                                                                                                                        // 4. Capturar e validar dados do formulário
                                                                                                                        formulario.addEventListener("submit", function(evento) {
                                                                                                                            evento.preventDefault();

                                                                                                                                const nome = campoNome.value.trim();
                                                                                                                                    const mensagem = campoMensagem.value.trim();

                                                                                                                                        if (nome.length < 2) {
                                                                                                                                                resultado.textContent =
                                                                                                                                                            "O nome deve possuir pelo menos 2 caracteres.";

                                                                                                                                                                    resultado.className = "erro";
                                                                                                                                                                            return;
                                                                                                                                                                                }

                                                                                                                                                                                    if (mensagem.length < 3) {
                                                                                                                                                                                            resultado.textContent =
                                                                                                                                                                                                        "A mensagem deve possuir pelo menos 3 caracteres.";

                                                                                                                                                                                                                resultado.className = "erro";
                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                resultado.textContent =
                                                                                                                                                                                                                                        "Olá, " + nome + "! Sua mensagem foi recebida: " + mensagem;

                                                                                                                                                                                                                                            resultado.className = "sucesso";

                                                                                                                                                                                                                                                formulario.reset();
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                // 5. Contar cliques usando eventos
                                                                                                                                                                                                                                                let quantidadeCliques = 0;

                                                                                                                                                                                                                                                botaoContador.addEventListener("click", function() {
                                                                                                                                                                                                                                                    quantidadeCliques++;

                                                                                                                                                                                                                                                        contador.textContent =
                                                                                                                                                                                                                                                                "Você clicou " + quantidadeCliques +
                                                                                                                                                                                                                                                                        (quantidadeCliques === 1 ? " vez." : " vezes.");
                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                        // 6. Alterar a aparência de um elemento
                                                                                                                                                                                                                                                                        botaoCor.addEventListener("click", function() {
                                                                                                                                                                                                                                                                            const cartao = document.querySelector(".card");

                                                                                                                                                                                                                                                                                cartao.classList.toggle("destaque");
                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                // 7. Selecionar elementos com querySelectorAll
                                                                                                                                                                                                                                                                                const todosOsCartoes = document.querySelectorAll(".card");

                                                                                                                                                                                                                                                                                todosOsCartoes.forEach(function(cartao) {
                                                                                                                                                                                                                                                                                    cartao.addEventListener("mouseenter", function() {
                                                                                                                                                                                                                                                                                            cartao.style.transition = "box-shadow 0.2s";
                                                                                                                                                                                                                                                                                                    cartao.style.boxShadow =
                                                                                                                                                                                                                                                                                                                "0 5px 15px rgba(89, 70, 165, 0.18)";
                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                        cartao.addEventListener("mouseleave", function() {
                                                                                                                                                                                                                                                                                                                                cartao.style.boxShadow =
                                                                                                                                                                                                                                                                                                                                            "0 3px 10px rgba(0, 0, 0, 0.08)";
                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                