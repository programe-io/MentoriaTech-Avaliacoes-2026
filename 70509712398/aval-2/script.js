
function saudar() {
  let nome = document.getElementById("nome").value;

    if (nome.trim() === "") {
        document.getElementById("resultado").textContent =
              "Por favor, digite seu nome!";
                } else {
                    document.getElementById("resultado").textContent =
                          "Olá, " + nome + "! Vamos aprender JavaScript!";
                            }
                            }
                            