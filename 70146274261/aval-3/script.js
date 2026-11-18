// Projeto Prático: Controle de IMC
// - Receber Nome, PESO e ALTURA
// - Calcular IMC = peso / (altura * altura)
// - Exibir informações acerca do IMC

function calcularIMC() {
  let nome = document.getElementById('nome').value.trim();
    let peso = Number(document.getElementById('peso').value);
      let altura = Number(document.getElementById('altura').value);
        let div = document.getElementById('resultado');

          if (!nome || !peso || !altura) {
              alert("Preencha nome, peso e altura!");
                  return;
                    }

                      // Cálculo do IMC
                        let imc = peso / (altura * altura);
                          let classificacao = "";
                            let classe = "";

                              if (imc < 18.5) {
                                  classificacao = "Abaixo do peso";
                                      classe = "baixo";
                                        } else if (imc < 24.9) {
                                            classificacao = "Peso normal";
                                                classe = "normal";
                                                  } else if (imc < 29.9) {
                                                      classificacao = "Sobrepeso";
                                                          classe = "sobre";
                                                            } else {
                                                                classificacao = "Obesidade";
                                                                    classe = "obesidade";
                                                                      }

                                                                        div.classList.add("show");
                                                                          div.innerHTML = `
                                                                              <strong>Paciente:</strong> ${nome}<br>
                                                                                  <strong>Peso:</strong> ${peso} kg | <strong>Altura:</strong> ${altura} m<br>
                                                                                      <strong>IMC:</strong> ${imc.toFixed(2)}<br>
                                                                                          <span class="badge ${classe}">${classificacao}</span><br><br>
                                                                                              <small>
                                                                                                    < 18.5 = Abaixo do peso<br>
                                                                                                          18.5 a 24.9 = Normal<br>
                                                                                                                25 a 29.9 = Sobrepeso<br>
                                                                                                                      > 30 = Obesidade
                                                                                                                          </small>
                                                                                                                            `;
                                                                                                                            }