const form = document.getElementById('form-imc');
const tabelaBody = document.getElementById('lista-pessoas');

// Carrega os dados salvos no navegador ou inicia com o exemplo da aula
let pessoas = JSON.parse(localStorage.getItem('pessoas_imc')) || [
  {
      id: 1,
          nome: 'Francisco',
              idade: 30,
                  altura: 1.70,
                      peso: 65.0
                        }
                        ];

                        function calcularIMC(peso, altura) {
                          return peso / (altura * altura);
                          }

                          function obterClassificacao(imc) {
                            if (imc < 18.5) {
                                return { texto: 'Abaixo do peso', classe: 'badge-abaixo' };
                                  } else if (imc < 25) {
                                      return { texto: 'Peso normal', classe: 'badge-normal' };
                                        } else if (imc < 30) {
                                            return { texto: 'Sobrepeso', classe: 'badge-sobrepeso' };
                                              } else {
                                                  return { texto: 'Obesidade', classe: 'badge-obesidade' };
                                                    }
                                                    }

                                                    function salvarNoLocalStorage() {
                                                      localStorage.setItem('pessoas_imc', JSON.stringify(pessoas));
                                                      }

                                                      function renderizarTabela() {
                                                        tabelaBody.innerHTML = '';

                                                          pessoas.forEach((pessoa) => {
                                                              const imc = calcularIMC(pessoa.peso, pessoa.altura);
                                                                  const classificacao = obterClassificacao(imc);

                                                                      const tr = document.createElement('tr');
                                                                          tr.innerHTML = `
                                                                                <td>${pessoa.nome}</td>
                                                                                      <td>${pessoa.idade}</td>
                                                                                            <td>${pessoa.altura.toFixed(2).replace('.', ',')} m</td>
                                                                                                  <td>${pessoa.peso.toFixed(1).replace('.', ',')} kg</td>
                                                                                                        <td>${imc.toFixed(1).replace('.', ',')}</td>
                                                                                                              <td><span class="badge ${classificacao.classe}">${classificacao.texto}</span></td>
                                                                                                                    <td>
                                                                                                                            <button class="btn-excluir" onclick="removerPessoa(${pessoa.id})">Excluir</button>
                                                                                                                                  </td>
                                                                                                                                      `;

                                                                                                                                          tabelaBody.appendChild(tr);
                                                                                                                                            });
                                                                                                                                            }

                                                                                                                                            form.addEventListener('submit', (event) => {
                                                                                                                                              event.preventDefault();

                                                                                                                                                const nome = document.getElementById('nome').value.trim();
                                                                                                                                                  const idade = Number(document.getElementById('idade').value);
                                                                                                                                                    const altura = Number(document.getElementById('altura').value);
                                                                                                                                                      const peso = Number(document.getElementById('peso').value);

                                                                                                                                                        const novaPessoa = {
                                                                                                                                                            id: Date.now(),
                                                                                                                                                                nome,
                                                                                                                                                                    idade,
                                                                                                                                                                        altura,
                                                                                                                                                                            peso
                                                                                                                                                                              };

                                                                                                                                                                                pessoas.push(novaPessoa);
                                                                                                                                                                                  salvarNoLocalStorage();
                                                                                                                                                                                    renderizarTabela();
                                                                                                                                                                                      form.reset();
                                                                                                                                                                                      });

                                                                                                                                                                                      function removerPessoa(id) {
                                                                                                                                                                                        pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
                                                                                                                                                                                          salvarNoLocalStorage();
                                                                                                                                                                                            renderizarTabela();
                                                                                                                                                                                            }

                                                                                                                                                                                            // Renderiza a tabela ao abrir a página
                                                                                                                                                                                            renderizarTabela();
                                                                                                                                                                                            