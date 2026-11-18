// DESAFIO GERAL - Sistema de estoque de produtos
// Campos: código, descrição, quantidade e valor

let estoque = [];

// 1. Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
  // Validação: código não pode repetir
    let existe = estoque.find(produto => produto.codigo === codigo);
      if (existe) {
          console.log(`❌ Erro: Código ${codigo} já existe!`);
              return false;
                }

                  // Cria o objeto produto
                    let novoProduto = {
                        codigo: codigo,
                            descricao: descricao,
                                quantidade: quantidade,
                                    valor: valor
                                      };

                                        estoque.push(novoProduto);
                                          console.log(`✅ Produto "${descricao}" cadastrado com sucesso!`);
                                            return true;
                                            }

                                            // 2. Listar os produtos cadastrados
                                            function listarProdutos() {
                                              if (estoque.length === 0) {
                                                  console.log("📭 Estoque vazio!");
                                                      return;
                                                        }

                                                          console.log("\n========== LISTA DE PRODUTOS ==========");
                                                            for (let i = 0; i < estoque.length; i++) {
                                                                let p = estoque[i];
                                                                    console.log(
                                                                          `Código: ${p.codigo} | Descrição: ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}`
                                                                              );
                                                                                }
                                                                                  console.log("======================================\n");
                                                                                  }

                                                                                  // 3. Alterar o valor de um produto
                                                                                  function alterarValor(codigo, novoValor) {
                                                                                    let produto = estoque.find(p => p.codigo === codigo);
                                                                                      
                                                                                        if (produto) {
                                                                                            let valorAntigo = produto.valor;
                                                                                                produto.valor = novoValor;
                                                                                                    console.log(`💰 Valor do produto ${codigo} alterado de R$ ${valorAntigo} para R$ ${novoValor}`);
                                                                                                        return true;
                                                                                                          } else {
                                                                                                              console.log(`❌ Produto com código ${codigo} não encontrado!`);
                                                                                                                  return false;
                                                                                                                    }
                                                                                                                    }

                                                                                                                    // 4. Alterar a quantidade de um produto
                                                                                                                    function alterarQuantidade(codigo, novaQuantidade) {
                                                                                                                      let produto = estoque.find(p => p.codigo === codigo);

                                                                                                                        if (produto) {
                                                                                                                            let qtdAntiga = produto.quantidade;
                                                                                                                                produto.quantidade = novaQuantidade;
                                                                                                                                    console.log(`📦 Quantidade do produto ${codigo} alterada de ${qtdAntiga} para ${novaQuantidade}`);
                                                                                                                                        return true;
                                                                                                                                          } else {
                                                                                                                                              console.log(`❌ Produto com código ${codigo} não encontrado!`);
                                                                                                                                                  return false;
                                                                                                                                                    }
                                                                                                                                                    }

                                                                                                                                                    // ================== TESTE PRÁTICO ==================
                                                                                                                                                    cadastrarProduto(101, "Notebook Dell", 5, 3500.00);
                                                                                                                                                    cadastrarProduto(102, "Mouse Gamer", 20, 89.90);
                                                                                                                                                    cadastrarProduto(103, "Teclado Mecânico", 15, 250.00);

                                                                                                                                                    listarProdutos();

                                                                                                                                                    alterarValor(102, 79.90);
                                                                                                                                                    alterarQuantidade(101, 3);

                                                                                                                                                    listarProdutos();

                                                                                                                                                    // Funções extras para usar com HTML
                                                                                                                                                    function cadastrar() {
                                                                                                                                                      let codigo = Number(document.getElementById('codigo').value);
                                                                                                                                                        let descricao = document.getElementById('descricao').value;
                                                                                                                                                          let quantidade = Number(document.getElementById('quantidade').value);
                                                                                                                                                            let valor = Number(document.getElementById('valor').value);
                                                                                                                                                              cadastrarProduto(codigo, descricao, quantidade, valor);
                                                                                                                                                                listar();
                                                                                                                                                                }

                                                                                                                                                                function listar() {
                                                                                                                                                                  let tbody = document.querySelector('#tabela tbody');
                                                                                                                                                                    if (!tbody) return listarProdutos(); // se não tiver HTML, lista no console
                                                                                                                                                                      tbody.innerHTML = '';
                                                                                                                                                                        estoque.forEach(p => {
                                                                                                                                                                            tbody.innerHTML += `<tr><td>${p.codigo}</td><td>${p.descricao}</td><td>${p.quantidade}</td><td>R$ ${p.valor.toFixed(2)}</td></tr>`;
                                                                                                                                                                              });
                                                                                                                                                                              }