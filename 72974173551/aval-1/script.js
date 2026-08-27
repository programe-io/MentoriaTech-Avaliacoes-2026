// Array para armazenar os produtos
let estoque = [];


// 1. Cadastrar produto
function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
        let descricao = document.getElementById("descricao").value;
            let quantidade = document.getElementById("quantidade").value;
                let valor = document.getElementById("valor").value;

                    // Verifica se o código já existe
                        let existe = estoque.find(p => p.codigo === codigo);

                            if (existe) {
                                    alert("Erro: Já existe um produto com esse código.");
                                            return;
                                                }

                                                    // Cria o produto
                                                        let novoProduto = {
                                                                codigo: codigo,
                                                                        descricao: descricao,
                                                                                quantidade: parseInt(quantidade),
                                                                                        valor: parseFloat(valor)
                                                                                            };

                                                                                                // Adiciona ao estoque
                                                                                                    estoque.push(novoProduto);

                                                                                                        alert("Produto cadastrado com sucesso!");

                                                                                                            // Limpa os campos
                                                                                                                document.getElementById("codigo").value = "";
                                                                                                                    document.getElementById("descricao").value = "";
                                                                                                                        document.getElementById("quantidade").value = "";
                                                                                                                            document.getElementById("valor").value = "";

                                                                                                                                listarProdutos();
                                                                                                                                }


                                                                                                                                // 2. Listar produtos
                                                                                                                                function listarProdutos() {

                                                                                                                                    let divProdutos = document.getElementById("produtos");

                                                                                                                                        divProdutos.innerHTML = "";

                                                                                                                                            if (estoque.length === 0) {
                                                                                                                                                    divProdutos.innerHTML = "<p>O estoque está vazio.</p>";
                                                                                                                                                            return;
                                                                                                                                                                }

                                                                                                                                                                    estoque.forEach(produto => {

                                                                                                                                                                            let div = document.createElement("div");

                                                                                                                                                                                    div.className = "produto";

                                                                                                                                                                                            div.innerHTML = `
                                                                                                                                                                                                        <strong>Código:</strong> ${produto.codigo}<br>
                                                                                                                                                                                                                    <strong>Descrição:</strong> ${produto.descricao}<br>
                                                                                                                                                                                                                                <strong>Quantidade:</strong> ${produto.quantidade}<br>
                                                                                                                                                                                                                                            <strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}
                                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                                            divProdutos.appendChild(div);
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                }


                                                                                                                                                                                                                                                                // 3. Alterar valor
                                                                                                                                                                                                                                                                function alterarValor() {

                                                                                                                                                                                                                                                                    let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                                                                                                                        let novoValor = document.getElementById("novoValor").value;

                                                                                                                                                                                                                                                                            let produto = estoque.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                if (produto) {

                                                                                                                                                                                                                                                                                        produto.valor = parseFloat(novoValor);

                                                                                                                                                                                                                                                                                                alert(
                                                                                                                                                                                                                                                                                                            "Valor alterado para R$ " +
                                                                                                                                                                                                                                                                                                                        produto.valor.toFixed(2)
                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                        listarProdutos();

                                                                                                                                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                                                                                                                                    alert("Produto não encontrado.");
                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                        }


                                                                                                                                                                                                                                                                                                                                                        // 4. Alterar quantidade
                                                                                                                                                                                                                                                                                                                                                        function alterarQuantidade() {

                                                                                                                                                                                                                                                                                                                                                            let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                                                                                                                                                                                                                let novaQuantidade = document.getElementById("novaQuantidade").value;

                                                                                                                                                                                                                                                                                                                                                                    let produto = estoque.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                        if (produto) {

                                                                                                                                                                                                                                                                                                                                                                                produto.quantidade = parseInt(novaQuantidade);

                                                                                                                                                                                                                                                                                                                                                                                        alert(
                                                                                                                                                                                                                                                                                                                                                                                                    "Quantidade alterada para " +
                                                                                                                                                                                                                                                                                                                                                                                                                produto.quantidade +
                                                                                                                                                                                                                                                                                                                                                                                                                            " unidades."
                                                                                                                                                                                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                                                                                                                                                                                            listarProdutos();

                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {

                                                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Produto não encontrado.");
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }