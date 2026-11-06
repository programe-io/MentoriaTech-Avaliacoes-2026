
let produtos = [];

function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
        let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
                let valor = Number(document.getElementById("valor").value);

                    if (!codigo || !descricao.trim() ||
                            quantidade < 0 || valor < 0 ||
                                    document.getElementById("quantidade").value === "" ||
                                            document.getElementById("valor").value === "") {
                                                    mostrarMensagem("Preencha todos os campos corretamente!");
                                                            return;
                                                                }

                                                                    let existe = produtos.find(p => p.codigo === codigo);

                                                                        if (existe) {
                                                                                mostrarMensagem("Código já cadastrado!");
                                                                                        return;
                                                                                            }

                                                                                                let produto = {
                                                                                                        codigo: codigo,
                                                                                                                descricao: descricao,
                                                                                                                        quantidade: quantidade,
                                                                                                                                valor: valor
                                                                                                                                    };

                                                                                                                                        produtos.push(produto);

                                                                                                                                            mostrarMensagem("Produto cadastrado com sucesso!");

                                                                                                                                                listarProdutos();
                                                                                                                                                }

                                                                                                                                                function listarProdutos() {

                                                                                                                                                    let lista = document.getElementById("listaProdutos");

                                                                                                                                                        lista.innerHTML = "";

                                                                                                                                                            produtos.forEach(produto => {

                                                                                                                                                                    let div = document.createElement("div");
                                                                                                                                                                            div.className = "produto";

                                                                                                                                                                                    let nome = document.createElement("p");
                                                                                                                                                                                            nome.textContent = "Descrição: " + produto.descricao;

                                                                                                                                                                                                    let codigo = document.createElement("p");
                                                                                                                                                                                                            codigo.textContent = "Código: " + produto.codigo;

                                                                                                                                                                                                                    let quantidade = document.createElement("p");
                                                                                                                                                                                                                            quantidade.textContent = "Quantidade: " + produto.quantidade;

                                                                                                                                                                                                                                    let valor = document.createElement("p");
                                                                                                                                                                                                                                            valor.textContent = "Valor: R$ " + produto.valor.toFixed(2);

                                                                                                                                                                                                                                                    div.append(nome, codigo, quantidade, valor);
                                                                                                                                                                                                                                                            lista.appendChild(div);
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                function alterarValor() {

                                                                                                                                                                                                                                                                    let codigo = Number(document.getElementById("codigoAtualizar").value);
                                                                                                                                                                                                                                                                        let novoValor = document.getElementById("novoValor").value;

                                                                                                                                                                                                                                                                            let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                if (!produto) {
                                                                                                                                                                                                                                                                                        mostrarMensagem("Produto não encontrado!");
                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                        if (novoValor === "" || Number(novoValor) < 0) {
                                                                                                                                                                                                                                                                                                                mostrarMensagem("Informe um valor válido!");
                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                produto.valor = Number(novoValor);

                                                                                                                                                                                                                                                                                                                                    listarProdutos();

                                                                                                                                                                                                                                                                                                                                        mostrarMensagem("Valor atualizado com sucesso!");
                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                        function alterarQuantidade() {

                                                                                                                                                                                                                                                                                                                                            let codigo = Number(document.getElementById("codigoAtualizar").value);
                                                                                                                                                                                                                                                                                                                                                let quantidade = document.getElementById("novaQuantidade").value;

                                                                                                                                                                                                                                                                                                                                                    let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                        if (!produto) {
                                                                                                                                                                                                                                                                                                                                                                mostrarMensagem("Produto não encontrado!");
                                                                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                if (quantidade === "" || Number(quantidade) <= 0) {
                                                                                                                                                                                                                                                                                                                                                                                        mostrarMensagem("Informe uma quantidade válida!");
                                                                                                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                        produto.quantidade += Number(quantidade);

                                                                                                                                                                                                                                                                                                                                                                                                            listarProdutos();

                                                                                                                                                                                                                                                                                                                                                                                                                mostrarMensagem("Quantidade atualizada com sucesso!");
                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                function mostrarMensagem(texto) {
                                                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById("mensagem").textContent = texto;
                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                    