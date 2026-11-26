
let produtos = JSON.parse(
    localStorage.getItem("produtos") || "[]"
    );

    function salvar() {
        localStorage.setItem(
                "produtos",
                        JSON.stringify(produtos)
                            );
                            }

                            function adicionarProduto() {

                                let nome = document.getElementById("nome").value;
                                    let categoria = document.getElementById("categoria").value;
                                        let quantidade = document.getElementById("quantidade").value;
                                            let preco = document.getElementById("preco").value;

                                                if (nome === "" || categoria === "" ||
                                                        quantidade === "" || preco === "") {
                                                                alert("Preencha todos os campos!");
                                                                        return;
                                                                            }

                                                                                if (Number(quantidade) < 0 || Number(preco) < 0) {
                                                                                        alert("Digite valores válidos!");
                                                                                                return;
                                                                                                    }

                                                                                                        let produto = {
                                                                                                                nome: nome,
                                                                                                                        categoria: categoria,
                                                                                                                                quantidade: Number(quantidade),
                                                                                                                                        preco: Number(preco)
                                                                                                                                            };

                                                                                                                                                produtos.push(produto);

                                                                                                                                                    salvar();
                                                                                                                                                        mostrarProdutos();

                                                                                                                                                            document.getElementById("nome").value = "";
                                                                                                                                                                document.getElementById("categoria").value = "";
                                                                                                                                                                    document.getElementById("quantidade").value = "";
                                                                                                                                                                        document.getElementById("preco").value = "";
                                                                                                                                                                        }

                                                                                                                                                                        function mostrarProdutos() {

                                                                                                                                                                            let lista = document.getElementById("listaProdutos");

                                                                                                                                                                                lista.innerHTML = "";

                                                                                                                                                                                    produtos.forEach((produto, index) => {

                                                                                                                                                                                            let linha = document.createElement("tr");

                                                                                                                                                                                                    linha.innerHTML = `
                                                                                                                                                                                                                <td></td>
                                                                                                                                                                                                                            <td></td>
                                                                                                                                                                                                                                        <td></td>
                                                                                                                                                                                                                                                    <td></td>
                                                                                                                                                                                                                                                                <td>
                                                                                                                                                                                                                                                                                <button class="excluir"
                                                                                                                                                                                                                                                                                                    onclick="excluirProduto(${index})">
                                                                                                                                                                                                                                                                                                                        Excluir
                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                    </td>
                                                                                                                                                                                                                                                                                                                                                            `;

                                                                                                                                                                                                                                                                                                                                                                    linha.cells[0].textContent = produto.nome;
                                                                                                                                                                                                                                                                                                                                                                            linha.cells[1].textContent = produto.categoria;
                                                                                                                                                                                                                                                                                                                                                                                    linha.cells[2].textContent = produto.quantidade;
                                                                                                                                                                                                                                                                                                                                                                                            linha.cells[3].textContent =
                                                                                                                                                                                                                                                                                                                                                                                                        Number(produto.preco).toLocaleString("pt-BR", {
                                                                                                                                                                                                                                                                                                                                                                                                                        style: "currency",
                                                                                                                                                                                                                                                                                                                                                                                                                                        currency: "BRL"
                                                                                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                                                                                            lista.appendChild(linha);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                function excluirProduto(index) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    produtos.splice(index, 1);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        salvar();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            mostrarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            mostrarProdutos();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            