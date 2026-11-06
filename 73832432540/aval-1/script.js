let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
        let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
                let valor = Number(document.getElementById("valor").value);

                    if (!codigo || !descricao) {
                            alert("Preencha os campos!");
                                    return;
                                        }

                                            produtos.push({codigo, descricao, quantidade, valor});

                                                alert("Produto cadastrado!");
                                                    listar();
                                                    }

                                                    function listar() {
                                                        let lista = document.getElementById("lista");
                                                            lista.innerHTML = "";

                                                                produtos.forEach(p => {
                                                                        lista.innerHTML += `
                                                                                    <div class="produto">
                                                                                                    Código: ${p.codigo}<br>
                                                                                                                    Descrição: ${p.descricao}<br>
                                                                                                                                    Quantidade: ${p.quantidade}<br>
                                                                                                                                                    Valor: R$ ${p.valor.toFixed(2)}
                                                                                                                                                                </div>`;
                                                                                                                                                                    });
                                                                                                                                                                    }

                                                                                                                                                                    function alterarValor() {
                                                                                                                                                                        let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                            let produto = produtos.find(p => p.codigo == codigo);

                                                                                                                                                                                if (produto) {
                                                                                                                                                                                        produto.valor = Number(document.getElementById("novoValor").value);
                                                                                                                                                                                                listar();
                                                                                                                                                                                                        alert("Valor alterado!");
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                    alert("Produto não encontrado!");
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        function alterarQuantidade() {
                                                                                                                                                                                                                            let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                                                                                let produto = produtos.find(p => p.codigo == codigo);

                                                                                                                                                                                                                                    if (produto) {
                                                                                                                                                                                                                                            produto.quantidade = Number(document.getElementById("novaQuantidade").value);
                                                                                                                                                                                                                                                    listar();
                                                                                                                                                                                                                                                            alert("Quantidade alterada!");
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                        alert("Produto não encontrado!");
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                            }