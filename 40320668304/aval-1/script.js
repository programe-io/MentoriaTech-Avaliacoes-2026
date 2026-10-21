<script>
        // Lista de produtos
        let produtos = [];

        function validarProduto(descricao, quantidade, valor) {
            if (descricao.trim().length < 5) {
                throw new Error(
                    "A descrição deve ter no mínimo cinco caracteres."
                );
            }

            if (!Number.isInteger(quantidade) || quantidade < 1) {
                throw new Error(
                    "A quantidade deve ser um número inteiro maior que zero."
                );
            }

            if (!Number.isFinite(valor) || valor < 0) {
                throw new Error(
                    "O valor deve ser maior ou igual a zero."
                );
            }
        }

        function cadastrarProduto(descricao, quantidade, valor) {
            validarProduto(descricao, quantidade, valor);

            let novoProduto = {
                codigo: produtos.length + 1,
                descricao: descricao.trim(),
                quantidade: quantidade,
                valor: valor
            };

            produtos.push(novoProduto);
            listarProdutos();
        }

        function listarProdutos() {
            const tabela = document.getElementById("listaProdutos");

            tabela.innerHTML = "";

            produtos.forEach(function(produto) {
                const linha = document.createElement("tr");

                const dados = [
                    produto.codigo,
                    produto.descricao,
                    produto.quantidade,
                    produto.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })
                ];

                dados.forEach(function(dado) {
                    const celula = document.createElement("td");
                    celula.textContent = dado;
                    linha.appendChild(celula);
                });

                tabela.appendChild(linha);
            });
        }

        function atualizarValor(codigoProduto, novoValor) {
            if (!Number.isFinite(novoValor) || novoValor < 0) {
                throw new Error(
                    "O valor deve ser maior ou igual a zero."
                );
            }

            const produto = produtos.find(
                prod => prod.codigo === codigoProduto
            );

            if (produto) {
                produto.valor = novoValor;
                listarProdutos();
            } else {
                throw new Error("Produto não encontrado.");
            }
        }

        function atualizarQuantidade(codigoProduto, novaQuantidade) {
            if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
                throw new Error(
                    "A quantidade deve ser um número inteiro maior que zero."
                );
            }

            const produto = produtos.find(
                prod => prod.codigo === codigoProduto
            );

            if (produto) {
                produto.quantidade += novaQuantidade;
                listarProdutos();
            } else {
                throw new Error("Produto não encontrado.");
            }
        }

        // Exibe mensagens na página
        function mostrarMensagem(texto, erro = false) {
            const mensagem = document.getElementById("mensagem");

            mensagem.textContent = texto;
            mensagem.style.color = erro ? "#c62828" : "#2e7d32";
        }

        // Cadastro pelo formulário
        document.getElementById("formProduto")
            .addEventListener("submit", function(event) {
                event.preventDefault();

                try {
                    const descricao =
                        document.getElementById("descricao").value;

                    const quantidade =
                        Number(document.getElementById("quantidade").value);

                    const valor =
                        Number(document.getElementById("valor").value);

                    cadastrarProduto(descricao, quantidade, valor);

                    this.reset();

                    mostrarMensagem("Produto cadastrado com sucesso!");
                } catch (erro) {
                    mostrarMensagem(erro.message, true);
                }
            });

        // Atualiza o preço de um produto
        function alterarPreco() {
            const codigo = Number(
                prompt("Digite o código do produto:")
            );

            if (!Number.isInteger(codigo) || codigo < 1) {
                mostrarMensagem("Código inválido.", true);
                return;
            }

            const novoValorTexto = prompt("Digite o novo valor (R$):");

            if (novoValorTexto === null || novoValorTexto.trim() === "") {
                return;
            }

            const novoValor = Number(novoValorTexto);

            try {
                atualizarValor(codigo, novoValor);
                mostrarMensagem("Preço atualizado com sucesso!");
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        }

        // Adiciona unidades ao estoque
        function alterarQuantidade() {
            const codigo = Number(
                prompt("Digite o código do produto:")
            );

            if (!Number.isInteger(codigo) || codigo < 1) {
                mostrarMensagem("Código inválido.", true);
                return;
            }

            const quantidadeTexto = prompt(
                "Quantas unidades deseja adicionar?"
            );

            if (
                quantidadeTexto === null ||
                quantidadeTexto.trim() === ""
            ) {
                return;
            }

            const quantidade = Number(quantidadeTexto);

            try {
                atualizarQuantidade(codigo, quantidade);
                mostrarMensagem("Estoque atualizado com sucesso!");
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        }

   
        cadastrarProduto("Cadeira Gamer", 12, 699.00);
        cadastrarProduto("Mouse Logi", 38, 99.00);
    </script>