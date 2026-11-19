const CHAVE = "pessoas";
let pessoas = JSON.parse(localStorage.getItem(CHAVE)) || [];
let contadorCodigo = pessoas.reduce((maior, p) => Math.max(maior, p.codigo), 0);

const form = document.getElementById("form-pessoa");
const tbody = document.getElementById("tbody-pessoas");
const erroEl = document.getElementById("erro");

function formatar(valor, casas) {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }
  function calcularIMC(peso, altura) { return peso / (altura * altura); }

  function classificarIMC(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
      if (imc < 25) return { texto: "Normal", classe: "normal" };
        if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
          return { texto: "Obesidade", classe: "obesidade" };
          }

          function criarCelula(conteudo) {
            const td = document.createElement("td");
              td.textContent = conteudo;
                return td;
                }

                function criarLinha(pessoa) {
                  const tr = document.createElement("tr");
                    tr.appendChild(criarCelula(pessoa.codigo));
                      tr.appendChild(criarCelula(pessoa.nome));
                        tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
                          tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
                            tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));

                              const tdSelo = document.createElement("td");
                                const span = document.createElement("span");
                                  span.classList.add("selo", pessoa.classificacao.classe);
                                    span.textContent = pessoa.classificacao.texto;
                                      tdSelo.appendChild(span);
                                        tr.appendChild(tdSelo);
                                          return tr;
                                          }

                                          function render() {
                                            tbody.innerHTML = "";
                                              if (pessoas.length === 0) {
                                                  const tr = document.createElement("tr");
                                                      const td = document.createElement("td");
                                                          td.colSpan = 7;
                                                              td.textContent = "Nenhuma pessoa cadastrada.";
                                                                  tr.appendChild(td);
                                                                      tbody.appendChild(tr);
                                                                          return;
                                                                            }
                                                                              pessoas.forEach(p => tbody.appendChild(criarLinha(p)));
                                                                              }

                                                                              function validarDados(nome, peso, altura) {
                                                                                if (nome.trim().length < 2) return "Nome deve ter pelo menos 2 letras.";
                                                                                  if (!peso || peso <= 0) return "Peso inválido.";
                                                                                    if (!altura || altura <= 0) return "Altura inválida.";
                                                                                      return "";
                                                                                      }

                                                                                      function mostrarErro(msg) { erroEl.textContent = msg; erroEl.hidden = false; }
                                                                                      function limparErro() { erroEl.textContent = ""; erroEl.hidden = true; }

                                                                                      function lerFormulario() {
                                                                                        const nome = document.getElementById("nome").value;
                                                                                          const peso = Number(document.getElementById("peso").value);
                                                                                            const altura = Number(document.getElementById("altura").value);
                                                                                              const imc = calcularIMC(peso, altura);
                                                                                                return { codigo: ++contadorCodigo, nome: nome.trim(), peso, altura, imc, classificacao: classificarIMC(imc) };
                                                                                                }

                                                                                                form.addEventListener("submit", (e) => {
                                                                                                  e.preventDefault();
                                                                                                    limparErro();
                                                                                                      const nome = document.getElementById("nome").value;
                                                                                                        const peso = Number(document.getElementById("peso").value);
                                                                                                          const altura = Number(document.getElementById("altura").value);

                                                                                                            const erro = validarDados(nome, peso, altura);
                                                                                                              if (erro !== "") { mostrarErro(erro); return; }

                                                                                                                const pessoa = lerFormulario();
                                                                                                                  pessoas.push(pessoa);
                                                                                                                    localStorage.setItem(CHAVE, JSON.stringify(pessoas));
                                                                                                                      form.reset();
                                                                                                                        render();
                                                                                                                        });

                                                                                                                        render();