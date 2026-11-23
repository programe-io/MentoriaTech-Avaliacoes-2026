
const formulario = document.getElementById("formAnamnese");
const lista = document.getElementById("listaPacientes");

let pacientes = JSON.parse(
    localStorage.getItem("pacientes") || "[]"
    );

    function salvarDados() {
        localStorage.setItem(
                "pacientes",
                        JSON.stringify(pacientes)
                            );
                            }

                            function mostrarPacientes() {
                                lista.replaceChildren();

                                    if (pacientes.length === 0) {
                                            const mensagem = document.createElement("p");
                                                    mensagem.textContent = "Nenhum paciente cadastrado.";
                                                            lista.appendChild(mensagem);
                                                                    return;
                                                                        }

                                                                            pacientes.forEach((paciente, indice) => {
                                                                                    const card = document.createElement("div");
                                                                                            card.className = "paciente";

                                                                                                    const nome = document.createElement("h3");
                                                                                                            nome.textContent = paciente.nome;

                                                                                                                    const detalhes = document.createElement("p");
                                                                                                                            detalhes.textContent =
                                                                                                                                        "Nascimento: " + paciente.nascimento +
                                                                                                                                                    " | Telefone: " + paciente.telefone;

                                                                                                                                                            const queixa = document.createElement("p");
                                                                                                                                                                    queixa.textContent =
                                                                                                                                                                                "Queixa: " + paciente.queixa;

                                                                                                                                                                                        const botao = document.createElement("button");
                                                                                                                                                                                                botao.textContent = "Excluir cadastro";

                                                                                                                                                                                                        botao.addEventListener("click", () => {
                                                                                                                                                                                                                    pacientes.splice(indice, 1);
                                                                                                                                                                                                                                salvarDados();
                                                                                                                                                                                                                                            mostrarPacientes();
                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                            card.append(nome, detalhes, queixa, botao);
                                                                                                                                                                                                                                                                    lista.appendChild(card);
                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        formulario.addEventListener("submit", function(event) {
                                                                                                                                                                                                                                                                            event.preventDefault();

                                                                                                                                                                                                                                                                                const paciente = {
                                                                                                                                                                                                                                                                                        nome: document.getElementById("nome").value,
                                                                                                                                                                                                                                                                                                nascimento: document.getElementById("nascimento").value,
                                                                                                                                                                                                                                                                                                        telefone: document.getElementById("telefone").value,
                                                                                                                                                                                                                                                                                                                sexo: document.getElementById("sexo").value,
                                                                                                                                                                                                                                                                                                                        queixa: document.getElementById("queixa").value,
                                                                                                                                                                                                                                                                                                                                alergia: document.getElementById("alergia").value,
                                                                                                                                                                                                                                                                                                                                        quaisAlergias: document.getElementById("quaisAlergias").value,
                                                                                                                                                                                                                                                                                                                                                medicamento: document.getElementById("medicamento").value,
                                                                                                                                                                                                                                                                                                                                                        quaisMedicamentos: document.getElementById("quaisMedicamentos").value,
                                                                                                                                                                                                                                                                                                                                                                doenca: document.getElementById("doenca").value,
                                                                                                                                                                                                                                                                                                                                                                        qualDoenca: document.getElementById("qualDoenca").value,
                                                                                                                                                                                                                                                                                                                                                                                observacoes: document.getElementById("observacoes").value
                                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                                        pacientes.push(paciente);

                                                                                                                                                                                                                                                                                                                                                                                            salvarDados();
                                                                                                                                                                                                                                                                                                                                                                                                mostrarPacientes();

                                                                                                                                                                                                                                                                                                                                                                                                    formulario.reset();

                                                                                                                                                                                                                                                                                                                                                                                                        alert("Cadastro realizado com sucesso!");
                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                        mostrarPacientes();
                                                                                                                                                                                                                                                                                                                                                                                                        