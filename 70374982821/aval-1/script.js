
let produtos = [];
let codigo = 1;
let selecionado = null;

const nome = document.getElementById("nomeP");
const quantidade = document.getElementById("qtdP");
const preco = document.getElementById("precoP");
const lista = document.getElementById("listaProdutos");

const btAdd = document.getElementById("btAdd");
const btAtualizar = document.getElementById("btAtualizar");
const btExcluir = document.getElementById("btExcluir");

btAdd.onclick = adicionar;
btAtualizar.onclick = atualizar;
btExcluir.onclick = excluir;

function adicionar() {
    let n = nome.value.trim();
        let q = Number(quantidade.value);
            let p = Number(preco.value);

                if (n === "" || quantidade.value === "" || preco.value === "") {
                        alert("Preencha todos os campos!");
                                return;
                                    }

                                        if (!Number.isInteger(q) || q < 0 || !Number.isFinite(p) || p < 0) {
                                                alert("Digite valores válidos!");
                                                        return;
                                                            }

                                                                produtos.push({
                                                                        codigo: codigo++,
                                                                                nome: n,
                                                                                        quantidade: q,
                                                                                                preco: p
                                                                                                    });

                                                                                                        selecionado = null;
                                                                                                            mostrarProdutos();
                                                                                                                limparCampos();

                                                                                                                    alert("Produto adicionado!");
                                                                                                                    }

                                                                                                                    function mostrarProdutos() {
                                                                                                                        lista.innerHTML = "";

                                                                                                                            produtos.forEach(function(produto) {
                                                                                                                                    let item = document.createElement("li");

                                                                                                                                            item.className = "item-produto";

                                                                                                                                                    item.textContent =
                                                                                                                                                                "Código: " + produto.codigo +
                                                                                                                                                                            " | Produto: " + produto.nome +
                                                                                                                                                                                        " | Quantidade: " + produto.quantidade +
                                                                                                                                                                                                    " | Preço: R$ " + produto.preco.toFixed(2);

                                                                                                                                                                                                            item.onclick = function() {
                                                                                                                                                                                                                        selecionado = produto;
                                                                                                                                                                                                                                    nome.value = produto.nome;
                                                                                                                                                                                                                                                quantidade.value = produto.quantidade;
                                                                                                                                                                                                                                                            preco.value = produto.preco;
                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                            lista.appendChild(item);
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                function atualizar() {
                                                                                                                                                                                                                                                                                    if (selecionado === null) {
                                                                                                                                                                                                                                                                                            alert("Clique primeiro no produto que deseja atualizar!");
                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                            let n = nome.value.trim();
                                                                                                                                                                                                                                                                                                                let q = Number(quantidade.value);
                                                                                                                                                                                                                                                                                                                    let p = Number(preco.value);

                                                                                                                                                                                                                                                                                                                        if (n === "" || quantidade.value === "" || preco.value === "") {
                                                                                                                                                                                                                                                                                                                                alert("Preencha todos os campos!");
                                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                if (!Number.isInteger(q) || q < 0 || !Number.isFinite(p) || p < 0) {
                                                                                                                                                                                                                                                                                                                                                        alert("Digite valores válidos!");
                                                                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                        selecionado.nome = n;
                                                                                                                                                                                                                                                                                                                                                                            selecionado.quantidade = q;
                                                                                                                                                                                                                                                                                                                                                                                selecionado.preco = p;

                                                                                                                                                                                                                                                                                                                                                                                    selecionado = null;
                                                                                                                                                                                                                                                                                                                                                                                        mostrarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                            limparCampos();

                                                                                                                                                                                                                                                                                                                                                                                                alert("Produto atualizado!");
                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                function excluir() {
                                                                                                                                                                                                                                                                                                                                                                                                    if (selecionado === null) {
                                                                                                                                                                                                                                                                                                                                                                                                            alert("Clique primeiro no produto que deseja excluir!");
                                                                                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                            produtos = produtos.filter(function(produto) {
                                                                                                                                                                                                                                                                                                                                                                                                                                    return produto.codigo !== selecionado.codigo;
                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                            selecionado = null;
                                                                                                                                                                                                                                                                                                                                                                                                                                                mostrarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                                                                                    limparCampos();

                                                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Produto excluído!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                        function limparCampos() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                            nome.value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                quantidade.value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    preco.value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    