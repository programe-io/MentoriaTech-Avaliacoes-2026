
/* ==========================================================
   PROJETO FICHA DE ANAMNESE
      ========================================================== */

      // 1. Lista para armazenar os pacientes
      let pessoas = [];

      // 2. Geração automática de identificador
      let proximoId = 1;


      // 3. Referência à tabela de pessoas
      const tabela = document.querySelector("#tabelaPacientes tbody");


      // 4. Cadastro de paciente
      function cadastrarPaciente(event) {
          event.preventDefault();

              const nome = document.getElementById("nome").value.trim();
                  const idade = Number(document.getElementById("idade").value);
                      const sexo = document.getElementById("sexo").value;
                          const peso = Number(document.getElementById("peso").value);
                              const altura = Number(document.getElementById("altura").value);

                                  // Validação dos dados
                                      if (!nome || !idade || !sexo || peso <= 0 || altura <= 0) {
                                              alert("Preencha todos os campos corretamente!");
                                                      return;
                                                          }

                                                              // Criação do paciente
                                                                  const paciente = {
                                                                          id: proximoId++,
                                                                                  nome: nome,
                                                                                          idade: idade,
                                                                                                  sexo: sexo,
                                                                                                          peso: peso,
                                                                                                                  altura: altura,
                                                                                                                          imc: calcularIMC(peso, altura),
                                                                                                                                  classificacao: classificarIMC(calcularIMC(peso, altura))
                                                                                                                                      };

                                                                                                                                          // Armazenamento na lista
                                                                                                                                              pessoas.push(paciente);

                                                                                                                                                  // Atualização da tabela
                                                                                                                                                      render();

                                                                                                                                                          // Limpar formulário
                                                                                                                                                              document.getElementById("formAnamnese").reset();
                                                                                                                                                              }


                                                                                                                                                              // 5. Cálculo do IMC
                                                                                                                                                              function calcularIMC(peso, altura) {
                                                                                                                                                                  if (peso <= 0 || altura <= 0) {
                                                                                                                                                                          return 0;
                                                                                                                                                                              }

                                                                                                                                                                                  return peso / (altura * altura);
                                                                                                                                                                                  }


                                                                                                                                                                                  // 6. Classificação do IMC
                                                                                                                                                                                  function classificarIMC(imc) {
                                                                                                                                                                                      if (imc < 18.5) {
                                                                                                                                                                                              return "Abaixo do peso";
                                                                                                                                                                                                  } else if (imc < 25) {
                                                                                                                                                                                                          return "Peso normal";
                                                                                                                                                                                                              } else if (imc < 30) {
                                                                                                                                                                                                                      return "Sobrepeso";
                                                                                                                                                                                                                          } else if (imc < 35) {
                                                                                                                                                                                                                                  return "Obesidade grau I";
                                                                                                                                                                                                                                      } else if (imc < 40) {
                                                                                                                                                                                                                                              return "Obesidade grau II";
                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                          return "Obesidade grau III";
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              }


                                                                                                                                                                                                                                                              // 7. Formatação de valores numéricos
                                                                                                                                                                                                                                                              function formatarNumero(valor) {
                                                                                                                                                                                                                                                                  return valor.toFixed(2).replace(".", ",");
                                                                                                                                                                                                                                                                  }


                                                                                                                                                                                                                                                                  // 8. Criação de linhas e células da tabela
                                                                                                                                                                                                                                                                  function criarLinha(paciente) {
                                                                                                                                                                                                                                                                      const linha = document.createElement("tr");

                                                                                                                                                                                                                                                                          const dados = [
                                                                                                                                                                                                                                                                                  paciente.id,
                                                                                                                                                                                                                                                                                          paciente.nome,
                                                                                                                                                                                                                                                                                                  paciente.idade,
                                                                                                                                                                                                                                                                                                          paciente.sexo,
                                                                                                                                                                                                                                                                                                                  formatarNumero(paciente.peso) + " kg",
                                                                                                                                                                                                                                                                                                                          formatarNumero(paciente.altura) + " m",
                                                                                                                                                                                                                                                                                                                                  formatarNumero(paciente.imc),
                                                                                                                                                                                                                                                                                                                                          paciente.classificacao
                                                                                                                                                                                                                                                                                                                                              ];

                                                                                                                                                                                                                                                                                                                                                  dados.forEach(function (dado) {
                                                                                                                                                                                                                                                                                                                                                          const celula = document.createElement("td");
                                                                                                                                                                                                                                                                                                                                                                  celula.textContent = dado;
                                                                                                                                                                                                                                                                                                                                                                          linha.appendChild(celula);
                                                                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                                                                                  return linha;
                                                                                                                                                                                                                                                                                                                                                                                  }


                                                                                                                                                                                                                                                                                                                                                                                  // 9. Função de renderização
                                                                                                                                                                                                                                                                                                                                                                                  function render() {
                                                                                                                                                                                                                                                                                                                                                                                      if (!tabela) return;

                                                                                                                                                                                                                                                                                                                                                                                          tabela.innerHTML = "";

                                                                                                                                                                                                                                                                                                                                                                                              pessoas.forEach(function (paciente) {
                                                                                                                                                                                                                                                                                                                                                                                                      const linha = criarLinha(paciente);
                                                                                                                                                                                                                                                                                                                                                                                                              tabela.appendChild(linha);
                                                                                                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                                                                                                  }


                                                                                                                                                                                                                                                                                                                                                                                                                  // 10. Organização das funções de negócio
                                                                                                                                                                                                                                                                                                                                                                                                                  function iniciarAplicacao() {
                                                                                                                                                                                                                                                                                                                                                                                                                      const formulario = document.getElementById("formAnamnese");

                                                                                                                                                                                                                                                                                                                                                                                                                          if (formulario) {
                                                                                                                                                                                                                                                                                                                                                                                                                                  formulario.addEventListener("submit", cadastrarPaciente);
                                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                                          render();
                                                                                                                                                                                                                                                                                                                                                                                                                                          }


                                                                                                                                                                                                                                                                                                                                                                                                                                          // 11. Chamada da função render e inicialização
                                                                                                                                                                                                                                                                                                                                                                                                                                          document.addEventListener("DOMContentLoaded", iniciarAplicacao);
                                                                                                                                                                                                                                                                                                                                                                                                                                          