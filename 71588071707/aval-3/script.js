let produtos = [];
let indiceSelecionado = -1;

const nomeP = document.getElementById("nomeP");
const qtdP = document.getElementById("qtdP");
const precoP = document.getElementById("precoP");
const listaProdutos = document.getElementById("listaProdutos");

const btAdd = document.getElementById("btAdd");
const btAtualizar = document.getElementById("btAtualizar");
const btExcluir = document.getElementById("btExcluir");

function limparCampos() {
    nomeP.value = "";
        qtdP.value = "";
            precoP.value = "";
                indiceSelecionado = -1;
                }

                function mostrarProdutos() {
                    listaProdutos.innerHTML = "";

                        produtos.forEach((produto, index) => {
                                const li = document.createElement("li");

                                        li.className = "item-produto";
                                                li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco.toFixed(2)}`;

                                                        li.onclick = function() {
                                                                    nomeP.value = produto.nome;
                                                                                qtdP.value = produto.quantidade;
                                                                                            precoP.value = produto.preco;
                                                                                                        indiceSelecionado = index;
                                                                                                                };

                                                                                                                        listaProdutos.appendChild(li);
                                                                                                                            });
                                                                                                                            }

                                                                                                                            btAdd.onclick = function() {
                                                                                                                                const nome = nomeP.value.trim();
                                                                                                                                    const quantidade = Number(qtdP.value);
                                                                                                                                        const preco = Number(precoP.value);

                                                                                                                                            if (nome === "" || qtdP.value === "" || precoP.value === "") {
                                                                                                                                                    alert("Preencha todos os campos!");
                                                                                                                                                            return;
                                                                                                                                                                }

                                                                                                                                                                    produtos.push({
                                                                                                                                                                            nome: nome,
                                                                                                                                                                                    quantidade: quantidade,
                                                                                                                                                                                            preco: preco
                                                                                                                                                                                                });

                                                                                                                                                                                                    mostrarProdutos();
                                                                                                                                                                                                        limparCampos();

                                                                                                                                                                                                            alert("Produto adicionado com sucesso!");
                                                                                                                                                                                                            };

                                                                                                                                                                                                            btAtualizar.onclick = function() {
                                                                                                                                                                                                                if (indiceSelecionado === -1) {
                                                                                                                                                                                                                        alert("Selecione um produto da lista!");
                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                        produtos[indiceSelecionado] = {
                                                                                                                                                                                                                                                nome: nomeP.value.trim(),
                                                                                                                                                                                                                                                        quantidade: Number(qtdP.value),
                                                                                                                                                                                                                                                                preco: Number(precoP.value)
                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                        mostrarProdutos();
                                                                                                                                                                                                                                                                            limparCampos();

                                                                                                                                                                                                                                                                                alert("Produto atualizado com sucesso!");
                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                btExcluir.onclick = function() {
                                                                                                                                                                                                                                                                                    if (indiceSelecionado === -1) {
                                                                                                                                                                                                                                                                                            alert("Selecione um produto da lista!");
                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                            produtos.splice(indiceSelecionado, 1);

                                                                                                                                                                                                                                                                                                                mostrarProdutos();
                                                                                                                                                                                                                                                                                                                    limparCampos();

                                                                                                                                                                                                                                                                                                                        alert("Produto excluído com sucesso!");
                                                                                                                                                                                                                                                                                                                        };