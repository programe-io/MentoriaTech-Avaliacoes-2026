
let produtos = [];

function adicionarProduto() {
  const nome = document.getElementById("nome").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
      const preco = Number(document.getElementById("preco").value);

        if (!nome || !Number.isInteger(quantidade) || quantidade < 1 ||
              !Number.isFinite(preco) || preco < 0 ||
                    document.getElementById("preco").value === "") {
                        alert("Preencha os dados corretamente!");
                            return;
                              }

                                produtos.push({
                                    id: Date.now() + Math.random(),
                                        nome,
                                            quantidade,
                                                preco
                                                  });

                                                    document.getElementById("nome").value = "";
                                                      document.getElementById("quantidade").value = "";
                                                        document.getElementById("preco").value = "";

                                                          mostrarProdutos();
                                                          }

                                                          function mostrarProdutos() {
                                                            const lista = document.getElementById("lista");
                                                              const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

                                                                lista.innerHTML = "";

                                                                  const filtrados = produtos.filter(produto =>
                                                                      produto.nome.toLowerCase().includes(pesquisa)
                                                                        );

                                                                          filtrados.forEach(produto => {
                                                                              const item = document.createElement("div");
                                                                                  item.className = "produto";

                                                                                      const nome = document.createElement("strong");
                                                                                          nome.textContent = produto.nome;

                                                                                              const detalhes = document.createElement("p");
                                                                                                  detalhes.textContent =
                                                                                                        `Quantidade: ${produto.quantidade} | Preço: ${produto.preco.toLocaleString("pt-BR", {style:"currency",currency:"BRL"})}`;

                                                                                                            const subtotal = document.createElement("p");
                                                                                                                subtotal.textContent =
                                                                                                                      "Subtotal: " + (produto.quantidade * produto.preco).toLocaleString(
                                                                                                                              "pt-BR", {style:"currency",currency:"BRL"}
                                                                                                                                    );

                                                                                                                                        const excluir = document.createElement("button");
                                                                                                                                            excluir.textContent = "Excluir produto";
                                                                                                                                                excluir.onclick = () => {
                                                                                                                                                      produtos = produtos.filter(p => p.id !== produto.id);
                                                                                                                                                            mostrarProdutos();
                                                                                                                                                                };

                                                                                                                                                                    item.append(nome, detalhes, subtotal, excluir);
                                                                                                                                                                        lista.appendChild(item);
                                                                                                                                                                          });

                                                                                                                                                                            const total = produtos.reduce(
                                                                                                                                                                                (soma, produto) => soma + produto.quantidade * produto.preco, 0
                                                                                                                                                                                  );

                                                                                                                                                                                    document.getElementById("total").textContent =
                                                                                                                                                                                        "Valor total: " + total.toLocaleString(
                                                                                                                                                                                              "pt-BR", {style:"currency",currency:"BRL"}
                                                                                                                                                                                                  );
                                                                                                                                                                                                  }
                                                                                                                                                                                                  