
let produtos = [];
let proximoCodigo = 1;

// Função para simular assincronismo
function esperar() {
    return new Promise(resolve => setTimeout(resolve, 500));
    }

    // Cadastrar produto
    async function cadastrarProduto() {
        let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
                let valor = Number(document.getElementById("valor").value);

                    if (descricao === "" || quantidade < 0 || valor < 0 ||
                            document.getElementById("quantidade").value === "" ||
                                    document.getElementById("valor").value === "") {
                                            alert("Preencha todos os campos corretamente!");
                                                    return;
                                                        }

                                                            let produto = {
                                                                    codigo: proximoCodigo++,
                                                                            descricao: descricao,
                                                                                    quantidade: quantidade,
                                                                                            valor: valor
                                                                                                };

                                                                                                    await esperar();

                                                                                                        produtos.push(produto);

                                                                                                            alert("Produto cadastrado!");

                                                                                                                document.getElementById("descricao").value = "";
                                                                                                                    document.getElementById("quantidade").value = "";
                                                                                                                        document.getElementById("valor").value = "";

                                                                                                                            listarProdutos();
                                                                                                                            }

                                                                                                                            // Listar produtos
                                                                                                                            async function listarProdutos() {
                                                                                                                                await esperar();

                                                                                                                                    let lista = document.getElementById("listaProdutos");

                                                                                                                                        lista.innerHTML = "";

                                                                                                                                            produtos.forEach(produto => {
                                                                                                                                                    lista.innerHTML += `
                                                                                                                                                                <div class="produto">
                                                                                                                                                                                <p>Código: ${produto.codigo}</p>
                                                                                                                                                                                                <p>Descrição: ${produto.descricao}</p>
                                                                                                                                                                                                                <p>Quantidade: ${produto.quantidade}</p>
                                                                                                                                                                                                                                <p>Valor: R$ ${produto.valor.toFixed(2)}</p>

                                                                                                                                                                                                                                                <button onclick="alterarValor(${produto.codigo})">
                                                                                                                                                                                                                                                                    Alterar valor
                                                                                                                                                                                                                                                                                    </button>

                                                                                                                                                                                                                                                                                                    <button onclick="alterarQuantidade(${produto.codigo})">
                                                                                                                                                                                                                                                                                                                        Alterar quantidade
                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                            `;
                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                // Alterar valor
                                                                                                                                                                                                                                                                                                                                                                async function alterarValor(codigo) {
                                                                                                                                                                                                                                                                                                                                                                    let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                        let novoValor = prompt("Digite o novo valor:");

                                                                                                                                                                                                                                                                                                                                                                            if (novoValor === null || novoValor.trim() === "") return;

                                                                                                                                                                                                                                                                                                                                                                                novoValor = Number(novoValor);

                                                                                                                                                                                                                                                                                                                                                                                    if (isNaN(novoValor) || novoValor < 0) {
                                                                                                                                                                                                                                                                                                                                                                                            alert("Valor inválido!");
                                                                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                            await esperar();

                                                                                                                                                                                                                                                                                                                                                                                                                produto.valor = novoValor;

                                                                                                                                                                                                                                                                                                                                                                                                                    listarProdutos();

                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Valor atualizado!");
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                        // Alterar quantidade
                                                                                                                                                                                                                                                                                                                                                                                                                        async function alterarQuantidade(codigo) {
                                                                                                                                                                                                                                                                                                                                                                                                                            let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                                                                                let novaQuantidade = prompt("Digite a nova quantidade:");

                                                                                                                                                                                                                                                                                                                                                                                                                                    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

                                                                                                                                                                                                                                                                                                                                                                                                                                        novaQuantidade = Number(novaQuantidade);

                                                                                                                                                                                                                                                                                                                                                                                                                                            if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    alert("Quantidade inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    await esperar();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        produto.quantidade = novaQuantidade;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            listarProdutos();

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                alert("Quantidade atualizada!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                