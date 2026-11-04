// Lista onde vai guardar os produtos
let carrinho = [];
let total = 0;

// Função chamada quando clica em Comprar
function adicionar(nome, preco) {
  carrinho.push(nome);
    total = total + preco;

      // Atualiza o contador lá em cima
        document.getElementById("contador").innerText = carrinho.length;
          document.getElementById("total").innerText = total.toFixed(2);

            // Atualiza a lista
              let lista = document.getElementById("lista");
                let item = document.createElement("li");
                  item.innerText = nome + " - R$ " + preco.toFixed(2);
                    lista.appendChild(item);

                      alert(nome + " adicionado ao carrinho! 🛒");
                      }

                      // Abre o carrinho
                      document.getElementById("btn-carrinho").addEventListener("click", function() {
                        document.getElementById("carrinho").classList.remove("carrinho-escondido");
                          document.getElementById("carrinho").classList.add("carrinho-aberto");
                          });

                          // Fecha o carrinho
                          function fecharCarrinho() {
                            document.getElementById("carrinho").classList.add("carrinho-escondido");
                              document.getElementById("carrinho").classList.remove("carrinho-aberto");
                              }

                              // Finalizar compra
                              function finalizar() {
                                if (carrinho.length === 0) {
                                    alert("Seu carrinho está vazio!");
                                      } else {
                                          alert("Compra finalizada! Total: R$ " + total.toFixed(2) + " Obrigada por comprar na ELLA! 💖");
                                              carrinho = [];
                                                  total = 0;
                                                      document.getElementById("contador").innerText = 0;
                                                          document.getElementById("total").innerText = "0.00";
                                                              document.getElementById("lista").innerHTML = "";
                                                                  fecharCarrinho();
                                                                    }
                                                                    }