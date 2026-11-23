// ==========================================
// 1. CONSTANTES E REFERÊNCIAS DO DOM
// ==========================================
const CHAVE_PESSOAS = "pessoas";

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tbodyPessoas = document.getElementById("tabela-pessoas");

let proximoCodigo = 1;

// ==========================================
// 2. FUNÇÕES DE CÁLCULO, CLASSIFICAÇÃO E FORMATAÇÃO (Parte 1)
// ==========================================
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
  }

  function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo-peso" };
          } else if (imc < 25) {
              return { texto: "Peso normal", classe: "peso-normal" };
                } else if (imc < 30) {
                    return { texto: "Sobrepeso", classe: "sobrepeso" };
                      } else {
                          return { texto: "Obesidade", classe: "obesidade" };
                            }
                            }

                            function formatar(valor, casasDecimais) {
                              return valor.toFixed(casasDecimais).replace(".", ",");
                              }

                              // ==========================================
                              // 3. RENDERIZAÇÃO DA TABELA (Seções 2, 3, 4 e 5)
                              // ==========================================
                              function criarLinha(pessoa) {
                                const tr = document.createElement("tr");

                                  const imc = calcularIMC(pessoa.peso, pessoa.altura);
                                    const classificacao = classificarIMC(imc);

                                      const tdCodigo = document.createElement("td");
                                        tdCodigo.textContent = pessoa.id;

                                          const tdNome = document.createElement("td");
                                            tdNome.textContent = pessoa.nome;

                                              const tdIdade = document.createElement("td");
                                                tdIdade.textContent = `${pessoa.idade} anos`;

                                                  const tdAltura = document.createElement("td");
                                                    tdAltura.textContent = `${formatar(pessoa.altura, 2)} m`;

                                                      const tdPeso = document.createElement("td");
                                                        tdPeso.textContent = `${formatar(pessoa.peso, 1)} KG`;

                                                          const tdIMC = document.createElement("td");
                                                            tdIMC.textContent = formatar(imc, 1);

                                                              const tdClassificacao = document.createElement("td");
                                                                const selo = document.createElement("span");
                                                                  selo.classList.add("selo", classificacao.classe);
                                                                    selo.textContent = classificacao.texto;
                                                                      tdClassificacao.appendChild(selo);

                                                                        tr.appendChild(tdCodigo);
                                                                          tr.appendChild(tdNome);
                                                                            tr.appendChild(tdIdade);
                                                                              tr.appendChild(tdAltura);
                                                                                tr.appendChild(tdPeso);
                                                                                  tr.appendChild(tdIMC);
                                                                                    tr.appendChild(tdClassificacao);

                                                                                      return tr;
                                                                                      }

                                                                                      function render() {
                                                                                        tbodyPessoas.innerHTML = "";
                                                                                          pessoas.forEach((pessoa) => {
                                                                                              const linha = criarLinha(pessoa);
                                                                                                  tbodyPessoas.appendChild(linha);
                                                                                                    });
                                                                                                    }

                                                                                                    // ==========================================
                                                                                                    // 4. CAPTURA, VALIDAÇÃO E ERROS (Seções 6, 9 e 10)
                                                                                                    // ==========================================
                                                                                                    function lerFormulario() {
                                                                                                      return {
                                                                                                          nome: inputNome.value.trim(),
                                                                                                              idade: Number(inputIdade.value),
                                                                                                                  altura: Number(inputAltura.value),
                                                                                                                      peso: Number(inputPeso.value),
                                                                                                                        };
                                                                                                                        }

                                                                                                                        function validarDados(dados) {
                                                                                                                          if (dados.nome.length < 2) {
                                                                                                                              return "Informe o nome com no mínimo de duas letras.";
                                                                                                                                }

                                                                                                                                  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
                                                                                                                                      return "A idade deve ser um número inteiro entre 1 e 120.";
                                                                                                                                        }

                                                                                                                                          if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
                                                                                                                                              return "A altura deve ser um valor entre 0.5 e 2.5 metros.";
                                                                                                                                                }

                                                                                                                                                  if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
                                                                                                                                                      return "O peso deve ser um valor entre 2 e 500 KG.";
                                                                                                                                                        }

                                                                                                                                                          return "";
                                                                                                                                                          }

                                                                                                                                                          function mostrarErro(mensagem) {
                                                                                                                                                            mensagemDeErro.textContent = mensagem;
                                                                                                                                                              mensagemDeErro.hidden = false;
                                                                                                                                                              }

                                                                                                                                                              function limparErro() {
                                                                                                                                                                mensagemDeErro.textContent = "";
                                                                                                                                                                  mensagemDeErro.hidden = true;
                                                                                                                                                                  }

                                                                                                                                                                  // ==========================================
                                                                                                                                                                  // 5. PERSISTÊNCIA E GERENCIAMENTO DE LISTA (Seções 7, 12, 13 e 14)
                                                                                                                                                                  // ==========================================
                                                                                                                                                                  function salvar() {
                                                                                                                                                                    localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
                                                                                                                                                                    }

                                                                                                                                                                    function carregarPessoas() {
                                                                                                                                                                      const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);
                                                                                                                                                                        if (dadosSalvos === null) {
                                                                                                                                                                            return [];
                                                                                                                                                                              }

                                                                                                                                                                                try {
                                                                                                                                                                                    const lista = JSON.parse(dadosSalvos);
                                                                                                                                                                                        if (Array.isArray(lista)) {
                                                                                                                                                                                              return lista;
                                                                                                                                                                                                  }
                                                                                                                                                                                                      return [];
                                                                                                                                                                                                        } catch (e) {
                                                                                                                                                                                                            console.error("Erro ao carregar os dados do localStorage:", e);
                                                                                                                                                                                                                return [];
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                  function ajustarContadorCodigo() {
                                                                                                                                                                                                                    let maior = 0;
                                                                                                                                                                                                                      pessoas.forEach((pessoa) => {
                                                                                                                                                                                                                          if (pessoa.id > maior) {
                                                                                                                                                                                                                                maior = pessoa.id;
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                        proximoCodigo = maior + 1;
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        function adicionarPessoa(dados) {
                                                                                                                                                                                                                                          const novaPessoa = {
                                                                                                                                                                                                                                              id: proximoCodigo++,
                                                                                                                                                                                                                                                  nome: dados.nome,
                                                                                                                                                                                                                                                      idade: dados.idade,
                                                                                                                                                                                                                                                          altura: dados.altura,
                                                                                                                                                                                                                                                              peso: dados.peso,
                                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                                  pessoas.push(novaPessoa);
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                  // ==========================================
                                                                                                                                                                                                                                                                  // 6. EVENTOS E INICIALIZAÇÃO (Seções 8, 11 e 15)
                                                                                                                                                                                                                                                                  // ==========================================
                                                                                                                                                                                                                                                                  formPessoa.addEventListener("submit", (e) => {
                                                                                                                                                                                                                                                                    e.preventDefault();

                                                                                                                                                                                                                                                                      const dados = lerFormulario();
                                                                                                                                                                                                                                                                        const erro = validarDados(dados);

                                                                                                                                                                                                                                                                          if (erro !== "") {
                                                                                                                                                                                                                                                                              mostrarErro(erro);
                                                                                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                      limparErro();
                                                                                                                                                                                                                                                                                        adicionarPessoa(dados);
                                                                                                                                                                                                                                                                                          salvar();
                                                                                                                                                                                                                                                                                            formPessoa.reset();
                                                                                                                                                                                                                                                                                              inputNome.focus();
                                                                                                                                                                                                                                                                                                render();
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                // Inicialização da aplicação
                                                                                                                                                                                                                                                                                                let pessoas = carregarPessoas();
                                                                                                                                                                                                                                                                                                ajustarContadorCodigo();
                                                                                                                                                                                                                                                                                                render();