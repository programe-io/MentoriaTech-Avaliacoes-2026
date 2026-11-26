
let fichas = JSON.parse(
    localStorage.getItem("fichas") || "[]"
    );

    const formulario = document.getElementById("formAnamnese");

    function salvarDados() {
        localStorage.setItem(
                "fichas",
                        JSON.stringify(fichas)
                            );
                            }

                            formulario.addEventListener("submit", function(event) {

                                event.preventDefault();

                                    let ficha = {
                                            nome: document.getElementById("nome").value,
                                                    nascimento: document.getElementById("nascimento").value,
                                                            telefone: document.getElementById("telefone").value,
                                                                    email: document.getElementById("email").value,
                                                                            endereco: document.getElementById("endereco").value,
                                                                                    alergia: document.getElementById("alergia").value,
                                                                                            doenca: document.getElementById("doenca").value,
                                                                                                    medicamento: document.getElementById("medicamento").value,
                                                                                                            cirurgia: document.getElementById("cirurgia").value,
                                                                                                                    observacoes: document.getElementById("observacoes").value,
                                                                                                                            motivo: document.getElementById("motivo").value,
                                                                                                                                    dataAtendimento: document.getElementById("dataAtendimento").value
                                                                                                                                        };

                                                                                                                                            fichas.push(ficha);

                                                                                                                                                salvarDados();
                                                                                                                                                    mostrarFichas();

                                                                                                                                                        formulario.reset();

                                                                                                                                                            alert("Ficha cadastrada com sucesso!");
                                                                                                                                                            });

                                                                                                                                                            function mostrarFichas() {

                                                                                                                                                                let lista = document.getElementById("listaFichas");

                                                                                                                                                                    lista.innerHTML = "";

                                                                                                                                                                        fichas.forEach((ficha, index) => {

                                                                                                                                                                                let div = document.createElement("div");

                                                                                                                                                                                        div.className = "ficha";

                                                                                                                                                                                                let titulo = document.createElement("h3");
                                                                                                                                                                                                        titulo.textContent = ficha.nome;

                                                                                                                                                                                                                let informacoes = document.createElement("p");

                                                                                                                                                                                                                        informacoes.textContent =
                                                                                                                                                                                                                                    "Telefone: " + ficha.telefone +
                                                                                                                                                                                                                                                " | Motivo: " + ficha.motivo;

                                                                                                                                                                                                                                                        let excluir = document.createElement("button");

                                                                                                                                                                                                                                                                excluir.textContent = "Excluir Ficha";
                                                                                                                                                                                                                                                                        excluir.className = "excluir";

                                                                                                                                                                                                                                                                                excluir.onclick = function() {
                                                                                                                                                                                                                                                                                            excluirFicha(index);
                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                            div.appendChild(titulo);
                                                                                                                                                                                                                                                                                                                    div.appendChild(informacoes);
                                                                                                                                                                                                                                                                                                                            div.appendChild(excluir);

                                                                                                                                                                                                                                                                                                                                    lista.appendChild(div);
                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                        function excluirFicha(index) {

                                                                                                                                                                                                                                                                                                                                            fichas.splice(index, 1);

                                                                                                                                                                                                                                                                                                                                                salvarDados();
                                                                                                                                                                                                                                                                                                                                                    mostrarFichas();
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                    mostrarFichas();
                                                                                                                                                                                                                                                                                                                                                    