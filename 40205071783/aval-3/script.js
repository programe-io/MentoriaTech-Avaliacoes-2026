/* ===== Estado ===== */
const pessoas = [];
let proximoId = 1;

/* ===== Elementos ===== */
const form = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

/* ===== Funções de Interface ===== */

function criarCelula(texto) {
  const td = document.createElement("td");
    td.textContent = texto;
      return td;
      }

      function criarLinha(pessoa) {
        const imc = calcularImc(pessoa.peso, pessoa.altura);
          const classificacao = classificarImc(imc);

            const tr = document.createElement("tr");
              tr.dataset.id = pessoa.id;

                tr.appendChild(criarCelula(pessoa.nome));
                  tr.appendChild(criarCelula(pessoa.idade));
                    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
                      tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
                        tr.appendChild(criarCelula(formatar(imc, 1)));

                          const tdClassificacao = document.createElement("td");
                            const selo = document.createElement("span");
                              selo.classList.add("selo", classificacao.classe);
                                selo.textContent = classificacao.texto;
                                  tdClassificacao.appendChild(selo);
                                    tr.appendChild(tdClassificacao);

                                      const tdAcoes = document.createElement("td");
                                        const botaoExcluir = document.createElement("button");
                                          botaoExcluir.type = "button";
                                            botaoExcluir.classList.add("botao-excluir");
                                              botaoExcluir.textContent = "Excluir";
                                                botaoExcluir.addEventListener("click", () => removerPessoa(pessoa.id));
                                                  tdAcoes.appendChild(botaoExcluir);
                                                    tr.appendChild(tdAcoes);

                                                      return tr;
                                                      }

                                                      /* ===== Funções de Negócio ===== */

                                                      function calcularImc(peso, altura) {
                                                        return peso / (altura * altura);
                                                        }

                                                        function classificarImc(imc) {
                                                          if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
                                                            if (imc < 25) return { texto: "Peso normal", classe: "normal" };
                                                              if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
                                                                if (imc < 35) return { texto: "Obesidade grau I", classe: "obesidade1" };
                                                                  if (imc < 40) return { texto: "Obesidade grau II", classe: "obesidade2" };
                                                                    return { texto: "Obesidade grau III", classe: "obesidade3" };
                                                                    }

                                                                    function formatar(valor, casas) {
                                                                      return Number(valor).toLocaleString("pt-BR", {
                                                                          minimumFractionDigits: casas,
                                                                              maximumFractionDigits: casas,
                                                                                });
                                                                                }

                                                                                function adicionarPessoa(nome, idade, altura, peso) {
                                                                                  pessoas.push({ id: proximoId++, nome, idade, altura, peso });
                                                                                    render();
                                                                                    }

                                                                                    function removerPessoa(id) {
                                                                                      const indice = pessoas.findIndex((p) => p.id === id);
                                                                                        if (indice !== -1) {
                                                                                            pessoas.splice(indice, 1);
                                                                                                render();
                                                                                                  }
                                                                                                  }

                                                                                                  function validar(nome, idade, altura, peso) {
                                                                                                    if (!nome) return "Informe o nome.";
                                                                                                      if (!Number.isInteger(idade) || idade < 0 || idade > 130) return "Informe uma idade válida.";
                                                                                                        if (!(altura >= 0.5 && altura <= 2.5)) return "Informe a altura em metros, por exemplo 1.75.";
                                                                                                          if (!(peso > 0 && peso <= 500)) return "Informe um peso válido em kg.";
                                                                                                            return "";
                                                                                                            }

                                                                                                            /* ===== Fim das Funções de Negócio ===== */

                                                                                                            function render() {
                                                                                                              tabelaPessoas.innerHTML = "";

                                                                                                                if (pessoas.length === 0) {
                                                                                                                    const tr = document.createElement("tr");
                                                                                                                        const td = document.createElement("td");
                                                                                                                            td.colSpan = 7;
                                                                                                                                td.classList.add("vazio");
                                                                                                                                    td.textContent = "Nenhuma pessoa cadastrada ainda.";
                                                                                                                                        tr.appendChild(td);
                                                                                                                                            tabelaPessoas.appendChild(tr);
                                                                                                                                                return;
                                                                                                                                                  }

                                                                                                                                                    pessoas.forEach((pessoa) => {
                                                                                                                                                        tabelaPessoas.appendChild(criarLinha(pessoa));
                                                                                                                                                          });
                                                                                                                                                          }

                                                                                                                                                          /* ===== Eventos ===== */

                                                                                                                                                          form.addEventListener("submit", (evento) => {
                                                                                                                                                            evento.preventDefault();

                                                                                                                                                              const nome = inputNome.value.trim();
                                                                                                                                                                const idade = parseInt(inputIdade.value, 10);
                                                                                                                                                                  const altura = parseFloat(inputAltura.value.replace(",", "."));
                                                                                                                                                                    const peso = parseFloat(inputPeso.value.replace(",", "."));

                                                                                                                                                                      const erro = validar(nome, idade, altura, peso);
                                                                                                                                                                        mensagemErro.textContent = erro;
                                                                                                                                                                          mensagemErro.hidden = !erro;
                                                                                                                                                                            if (erro) return;

                                                                                                                                                                              adicionarPessoa(nome, idade, altura, peso);
                                                                                                                                                                                form.reset();
                                                                                                                                                                                  inputNome.focus();
                                                                                                                                                                                  });

                                                                                                                                                                                  render();
                                                                                                                                                                                  