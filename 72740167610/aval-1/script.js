let estoque = [];
let contadorCodigo = 1;

// Função ASSÍNCRONA - gera o código automaticamente
async function gerarCodigo() {
  return new Promise((resolve) => {
      setTimeout(() => {
            let codigo = contadorCodigo;
                  contadorCodigo++;
                        resolve(codigo);
                            }, 500);
                              });
                              }

                              // 1. CADASTRAR
                              async function cadastrarProduto() {
                                let descricao = document.getElementById("descricao").value;
                                  let quantidade = Number(document.getElementById("quantidade").value);
                                    let valor = Number(document.getElementById("valor").value);

                                      if (!descricao || !quantidade || !valor) {
                                          document.getElementById("mensagem").innerText = "Preencha todos os campos!";
                                              return;
                                                }

                                                  let codigo = await gerarCodigo();

                                                    let produto = {
                                                        codigo: codigo,
                                                            descricao: descricao,
                                                                quantidade: quantidade,
                                                                    valor: valor
                                                                      };

                                                                        estoque.push(produto);
                                                                          document.getElementById("mensagem").innerText = "Produto cadastrado! Código: " + codigo;
                                                                            listarProdutos();
                                                                            }

                                                                            // 2. LISTAR
                                                                            function listarProdutos() {
                                                                              let div = document.getElementById("lista");
                                                                                if (estoque.length === 0) {
                                                                                    div.innerHTML = "Nenhum produto cadastrado.";
                                                                                        return;
                                                                                          }

                                                                                            let html = "";
                                                                                              for (let p of estoque) {
                                                                                                  html += `Código: ${p.codigo} | ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor}<br><hr>`;
                                                                                                    }
                                                                                                      div.innerHTML = html;
                                                                                                      }

                                                                                                      // 3. ALTERAR VALOR
                                                                                                      function alterarValor() {
                                                                                                        let codigo = Number(document.getElementById("codigoAlterar").value);
                                                                                                          let novoValor = Number(document.getElementById("novoValor").value);
                                                                                                            let produto = estoque.find(p => p.codigo === codigo);

                                                                                                              if (!produto) {
                                                                                                                  document.getElementById("mensagem").innerText = "Produto não encontrado!";
                                                                                                                      return;
                                                                                                                        }
                                                                                                                          produto.valor = novoValor;
                                                                                                                            document.getElementById("mensagem").innerText = "Valor alterado!";
                                                                                                                              listarProdutos();
                                                                                                                              }

                                                                                                                              // 4. ALTERAR QUANTIDADE
                                                                                                                              function alterarQuantidade() {
                                                                                                                                let codigo = Number(document.getElementById("codigoAlterar").value);
                                                                                                                                  let novaQtd = Number(document.getElementById("novaQuantidade").value);
                                                                                                                                    let produto = estoque.find(p => p.codigo === codigo);

                                                                                                                                      if (!produto) {
                                                                                                                                          document.getElementById("mensagem").innerText = "Produto não encontrado!";
                                                                                                                                              return;
                                                                                                                                                }
                                                                                                                                                  produto.quantidade = novaQtd;
                                                                                                                                                    document.getElementById("mensagem").innerText = "Quantidade alterada!";
                                                                                                                                                      listarProdutos();
                                                                                                                                                      }