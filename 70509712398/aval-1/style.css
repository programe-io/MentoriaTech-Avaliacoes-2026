
let produtos = [];

function cadastrar() {
  const codigo = Number(document.getElementById("codigo").value);
    const nome = document.getElementById("nome").value.trim();
      const quantidade = Number(document.getElementById("quantidade").value);
        const preco = Number(document.getElementById("preco").value);

          if (
              !document.getElementById("codigo").value ||
                  !nome ||
                      document.getElementById("quantidade").value === "" ||
                          document.getElementById("preco").value === "" ||
                              !Number.isInteger(codigo) ||
                                  codigo <= 0 ||
                                      !Number.isInteger(quantidade) ||
                                          quantidade < 0 ||
                                              !Number.isFinite(preco) ||
                                                  preco < 0
                                                    ) {
                                                        alert("Preencha todos os campos corretamente!");
                                                            return;
                                                              }

                                                                if (produtos.some(p => p.codigo === codigo)) {
                                                                    alert("Esse código já existe!");
                                                                        return;
                                                                          }

                                                                            produtos.push({ codigo, nome, quantidade, preco });

                                                                              document.getElementById("codigo").value = "";
                                                                                document.getElementById("nome").value = "";
                                                                                  document.getElementById("quantidade").value = "";
                                                                                    document.getElementById("preco").value = "";

                                                                                      listar();
                                                                                        alert("Produto cadastrado com sucesso!");
                                                                                        }

                                                                                        function listar() {
                                                                                          const busca = document.getElementById("busca").value.toLowerCase();

                                                                                            const filtrados = produtos.filter(p =>
                                                                                                p.nome.toLowerCase().includes(busca) ||
                                                                                                    String(p.codigo).includes(busca)
                                                                                                      );

                                                                                                        document.getElementById("total").textContent = produtos.length;

                                                                                                          const valorTotal = produtos.reduce(
                                                                                                              (soma, p) => soma + p.quantidade * p.preco, 0
                                                                                                                );

                                                                                                                  document.getElementById("valor").textContent =
                                                                                                                      valorTotal.toLocaleString("pt-BR", {
                                                                                                                            style: "currency",
                                                                                                                                  currency: "BRL"
                                                                                                                                      });

                                                                                                                                        const lista = document.getElementById("lista");
                                                                                                                                          lista.innerHTML = "";

                                                                                                                                            if (filtrados.length === 0) {
                                                                                                                                                lista.textContent = "Nenhum produto encontrado.";
                                                                                                                                                    return;
                                                                                                                                                      }

                                                                                                                                                        filtrados.forEach(p => {
                                                                                                                                                            const item = document.createElement("div");
                                                                                                                                                                item.className = "produto";

                                                                                                                                                                    const nome = document.createElement("strong");
                                                                                                                                                                        nome.textContent = p.nome;

                                                                                                                                                                            const info = document.createElement("p");
                                                                                                                                                                                info.textContent =
                                                                                                                                                                                      "Código: " + p.codigo +
                                                                                                                                                                                            " | Quantidade: " + p.quantidade +
                                                                                                                                                                                                  " | Preço: " +
                                                                                                                                                                                                        p.preco.toLocaleString("pt-BR", {
                                                                                                                                                                                                                style: "currency",
                                                                                                                                                                                                                        currency: "BRL"
                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                  const excluir = document.createElement("button");
                                                                                                                                                                                                                                      excluir.className = "excluir";
                                                                                                                                                                                                                                          excluir.textContent = "Excluir produto";
                                                                                                                                                                                                                                              excluir.onclick = function() {
                                                                                                                                                                                                                                                    produtos = produtos.filter(x => x.codigo !== p.codigo);
                                                                                                                                                                                                                                                          listar();
                                                                                                                                                                                                                                                              };

                                                                                                                                                                                                                                                                  item.appendChild(nome);
                                                                                                                                                                                                                                                                      item.appendChild(info);
                                                                                                                                                                                                                                                                          item.appendChild(excluir);
                                                                                                                                                                                                                                                                              lista.appendChild(item);
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                listar();
                                                                                                                                                                                                                                                                                