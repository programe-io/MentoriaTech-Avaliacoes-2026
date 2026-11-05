let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
        let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
                let valor = Number(document.getElementById("valor").value);

                    if (!codigo || !descricao || quantidade < 0 ||
                            valor < 0 || document.getElementById("quantidade").value === "" ||
                                    document.getElementById("valor").value === "") {
                                            alert("Preencha todos os campos corretamente!");
                                                    return;
                                                        }

                                                            if (produtos.some(p => p.codigo === codigo)) {
                                                                    alert("Código já cadastrado!");
                                                                            return;
                                                                                }

                                                                                    produtos.push({
                                                                                            codigo,
                                                                                                    descricao,
                                                                                                            quantidade,
                                                                                                                    valor
                                                                                                                        });

                                                                                                                            alert("Produto cadastrado com sucesso!");

                                                                                                                                listar();
                                                                                                                                }

                                                                                                                                function listar() {
                                                                                                                                    let lista = document.getElementById("lista");

                                                                                                                                        lista.innerHTML = "";

                                                                                                                                            produtos.forEach(p => {
                                                                                                                                                    lista.innerHTML += `
                                                                                                                                                                <p>
                                                                                                                                                                                Código: ${p.codigo} |
                                                                                                                                                                                                Produto: ${p.descricao} |
                                                                                                                                                                                                                Quantidade: ${p.quantidade} |
                                                                                                                                                                                                                                Valor: R$ ${p.valor.toFixed(2)}
                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                    `;
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        function alterarValor() {
                                                                                                                                                                                                                                                            let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                                                                                                                let valor = Number(document.getElementById("novoValor").value);

                                                                                                                                                                                                                                                                    let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                        if (!produto) {
                                                                                                                                                                                                                                                                                alert("Produto não encontrado!");
                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                if (document.getElementById("novoValor").value === "" || valor < 0) {
                                                                                                                                                                                                                                                                                                        alert("Informe um valor válido!");
                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                        produto.valor = valor;

                                                                                                                                                                                                                                                                                                                            alert("Valor alterado com sucesso!");

                                                                                                                                                                                                                                                                                                                                listar();
                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                function alterarQuantidade() {
                                                                                                                                                                                                                                                                                                                                    let codigo = document.getElementById("codigoAlterar").value;
                                                                                                                                                                                                                                                                                                                                        let quantidade = Number(document.getElementById("novaQuantidade").value);

                                                                                                                                                                                                                                                                                                                                            let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                if (!produto) {
                                                                                                                                                                                                                                                                                                                                                        alert("Produto não encontrado!");
                                                                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                        if (document.getElementById("novaQuantidade").value === "" || quantidade < 0) {
                                                                                                                                                                                                                                                                                                                                                                                alert("Informe uma quantidade válida!");
                                                                                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                produto.quantidade = quantidade;

                                                                                                                                                                                                                                                                                                                                                                                                    alert("Quantidade alterada com sucesso!");

                                                                                                                                                                                                                                                                                                                                                                                                        listar();
                                                                                                                                                                                                                                                                                                                                                                                                        }