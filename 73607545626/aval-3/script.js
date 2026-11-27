
/* ==================================================
   PROJETO FICHA DE ANAMNESE
      ================================================== */

      // Lista de pacientes
      let pessoas = [];

      // Identificador automático
      let proximoId = 1;


      // Elementos HTML
      const formulario = document.getElementById("formAnamnese");
      const tabela = document.querySelector("#tabelaPacientes tbody");
      const mensagemVazia = document.getElementById("mensagemVazia");
      const totalPacientes = document.getElementById("totalPacientes");


      // Cadastro de pacientes
      formulario.addEventListener("submit", function(event) {

          event.preventDefault();

              // Capturar dados
                  const nome = document.getElementById("nome").value.trim();
                      const idade = Number(document.getElementById("idade").value);
                          const sexo = document.getElementById("sexo").value;
                              const peso = Number(document.getElementById("peso").value);
                                  const altura = Number(document.getElementById("altura").value);

                                      // Validar informações
                                          if (
                                                  nome === "" ||
                                                          idade < 1 ||
                                                                  idade > 120 ||
                                                                          sexo === "" ||
                                                                                  peso <= 0 ||
                                                                                          altura <= 0
                                                                                              ) {
                                                                                                      alert("Preencha todos os campos corretamente!");
                                                                                                              return;
                                                                                                                  }

                                                                                                                      // Calcular IMC
                                                                                                                          const imc = calcularIMC(peso, altura);

                                                                                                                              // Criar paciente
                                                                                                                                  const paciente = {
                                                                                                                                          id: proximoId++,
                                                                                                                                                  nome: nome,
                                                                                                                                                          idade: idade,
                                                                                                                                                                  sexo: sexo,
                                                                                                                                                                          peso: peso,
                                                                                                                                                                                  altura: altura,
                                                                                                                                                                                          imc: imc,
                                                                                                                                                                                                  classificacao: classificarIMC(imc)
                                                                                                                                                                                                      };

                                                                                                                                                                                                          // Adicionar à lista
                                                                                                                                                                                                              pessoas.push(paciente);

                                                                                                                                                                                                                  // Atualizar tabela
                                                                                                                                                                                                                      render();

                                                                                                                                                                                                                          // Limpar formulário
                                                                                                                                                                                                                              formulario.reset();

                                                                                                                                                                                                                                  alert("Paciente cadastrado com sucesso!");
                                                                                                                                                                                                                                  });


                                                                                                                                                                                                                                  // Cálculo do IMC
                                                                                                                                                                                                                                  function calcularIMC(peso, altura) {

                                                                                                                                                                                                                                      return peso / (altura * altura);

                                                                                                                                                                                                                                      }


                                                                                                                                                                                                                                      // Classificação do IMC
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


                                                                                                                                                                                                                                                                                                                  // Formatação de números
                                                                                                                                                                                                                                                                                                                  function formatarNumero(valor) {

                                                                                                                                                                                                                                                                                                                      return valor.toFixed(2).replace(".", ",");

                                                                                                                                                                                                                                                                                                                      }


                                                                                                                                                                                                                                                                                                                      // Criar linha da tabela
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

                                                                                                                                                                                                                                                                                                                                                                                                      dados.forEach(function(dado) {

                                                                                                                                                                                                                                                                                                                                                                                                              const celula = document.createElement("td");

                                                                                                                                                                                                                                                                                                                                                                                                                      celula.textContent = dado;

                                                                                                                                                                                                                                                                                                                                                                                                                              linha.appendChild(celula);

                                                                                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                                                                                      return linha;

                                                                                                                                                                                                                                                                                                                                                                                                                                      }


                                                                                                                                                                                                                                                                                                                                                                                                                                      // Renderizar tabela
                                                                                                                                                                                                                                                                                                                                                                                                                                      function render() {

                                                                                                                                                                                                                                                                                                                                                                                                                                          tabela.innerHTML = "";

                                                                                                                                                                                                                                                                                                                                                                                                                                              pessoas.forEach(function(paciente) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                      const linha = criarLinha(paciente);

                                                                                                                                                                                                                                                                                                                                                                                                                                                              tabela.appendChild(linha);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                      // Atualizar quantidade de pacientes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          totalPacientes.textContent = pessoas.length;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                              // Mostrar ou esconder mensagem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  mensagemVazia.style.display =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          pessoas.length === 0 ? "block" : "none";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          