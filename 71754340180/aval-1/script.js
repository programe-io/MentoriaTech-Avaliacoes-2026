let produtos = [];
const painel = document.getElementById("painel-estoque");
function exibirNaTela(mensagem) {
 painel.textContent += mensagem + "\n";
 }
 function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
   throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }
     if (quantidade < 1) {
      throw new Error("Quantidade deve ser maior que zero");
       }
        if (valor < 0) {
         throw new Error("Valor deve ser maior ou igual a zero");
          }
          }
          function cadastrarProduto(descricao, quantidade, valor) {
           validarProduto(descricao, quantidade, valor);
            
             let novoProduto = {
              codigo: produtos.length + 1,
               descricao: descricao,
                quantidade: quantidade,
                 valor: valor
                  };
                  let produtos = [];
                  const painel = document.getElementById("painel-estoque");
                  function exibirNaTela(mensagem) {
                   painel.textContent += mensagem + "\n";
                   }
                   function validarProduto(descricao, quantidade, valor) {
                    if (descricao.length < 5) {
                     throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
                      }
                       if (quantidade < 1) {
                        throw new Error("Quantidade deve ser maior que zero");
                         }
                          if (valor < 0) {
                           throw new Error("Valor deve ser maior ou igual a zero");
                            }
                            }
                            function cadastrarProduto(descricao, quantidade, valor) {
                             validarProduto(descricao, quantidade, valor);
                              
                               let novoProduto = {
                                codigo: produtos.length + 1,
                                 descricao: descricao,
                                  quantidade: quantidade,
                                   valor: valor
                                    };
                                     
                                      produtos.push(novoProduto);
                                      }
                                      function listarProdutos() {
                                       exibirNaTela("--- LISTA DE PRODUTOS ---");
                                        exibirNaTela(JSON.stringify(produtos, null, 2));
                                        }
                                        function atualizarValor(codigoProduto, novoValor) {
                                         if (novoValor < 0) {
                                          throw new Error("Valor deve ser maior ou igual a zero");
                                           }
                                            
                                             const produto = produtos.find((prod) => prod.codigo === codigoProduto);
                                              
                                               if (produto) {
                                                produto.valor = novoValor;
                                                 } else {
                                                  throw new Error("Produto não encontrado");
                                                   }
                                                   }
                                                   function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                    if (novaQuantidade < 1) {
                                                     throw new Error("Quantidade deve ser maior que zero");
                                                      }
                                                       
                                                        const produto = produtos.find((prod) => prod.codigo === codigoProduto);
                                                         
                                                          if (produto) {
                                                           produto.quantidade = produto.quantidade + novaQuantidade;
                                                            } else {
                                                             throw new Error("Produto não encontrado");
                                                              }
                                                              }
                                                              // TESTES
                                                              try {
                                                               cadastrarProduto("Cadeira gamer", 12, 699);
                                                                cadastrarProduto("Mouse Logitech", 38, 99);
                                                                 
                                                                  atualizarValor(2, 97);
                                                                   atualizarQuantidade(1, 3);
                                                                    
                                                                     listarProdutos();
                                                                     } catch (erro) {
                                                                      exibirNaTela("Erro: " + erro.message);
                                                                      