
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Estoque</title>
</head>
<body>

    <h2>Sistema de Controle de Estoque</h2>
    <p>Abra o menu para utilizar o sistema.</p>

    <button onclick="menu()">Abrir Sistema</button>

    <script>
        let produtos = [];

        function cadastrar() {
            let codigo = prompt("Digite o código do produto:");

            if (codigo === null || codigo.trim() === "") return;

            if (produtos.some(p => p.codigo === codigo)) {
                alert("Código já cadastrado!");
                return;
            }

            let descricao = prompt("Digite a descrição:");

            if (descricao === null || descricao.trim() === "") return;

            let quantidade = Number(prompt("Digite a quantidade:"));

            if (!Number.isInteger(quantidade) || quantidade < 0) {
                alert("Quantidade inválida!");
                return;
            }

            let valor = Number(prompt("Digite o valor:"));

            if (!Number.isFinite(valor) || valor < 0) {
                alert("Valor inválido!");
                return;
            }

            produtos.push({
                codigo,
                descricao,
                quantidade,
                valor
            });

            alert("Produto cadastrado com sucesso!");
        }

        function listar() {
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado.");
                return;
            }

            let texto = "LISTA DE PRODUTOS\n\n";

            produtos.forEach(p => {
                texto +=
                    "Código: " + p.codigo +
                    "\nDescrição: " + p.descricao +
                    "\nQuantidade: " + p.quantidade +
                    "\nValor: R$ " + p.valor.toFixed(2) +
                    "\n----------------------\n";
            });

            alert(texto);
        }

        function alterarValor() {
            let codigo = prompt("Digite o código do produto:");

            if (codigo === null) return;

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                return;
            }

            let valor = prompt("Digite o novo valor:");

            if (valor === null || valor.trim() === "") return;

            let novoValor = Number(valor);

            if (!Number.isFinite(novoValor) || novoValor < 0) {
                alert("Valor inválido!");
                return;
            }

            produto.valor = novoValor;

            alert("Valor atualizado com sucesso!");
        }

        function alterarQuantidade() {
            let codigo = prompt("Digite o código do produto:");

            if (codigo === null) return;

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                return;
            }

            let quantidade = prompt("Digite a nova quantidade:");

            if (quantidade === null || quantidade.trim() === "") return;

            let novaQuantidade = Number(quantidade);

            if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
                alert("Quantidade inválida!");
                return;
            }

            produto.quantidade = novaQuantidade;

            alert("Quantidade atualizada com sucesso!");
        }

        function menu() {
            let opcao;

            do {
                opcao = prompt(
                    "===== SISTEMA DE ESTOQUE =====\n\n" +
                    "1 - Cadastrar produto\n" +
                    "2 - Listar produtos\n" +
                    "3 - Alterar valor\n" +
                    "4 - Alterar quantidade\n" +
                    "5 - Sair\n\n" +
                    "Digite uma opção:"
                );

                if (opcao === null) break;

                switch (opcao) {
                    case "1":
                        cadastrar();
                        break;

                    case "2":
                        listar();
                        break;

                    case "3":
                        alterarValor();
                        break;

                    case "4":
                        alterarQuantidade();
                        break;

                    case "5":
                        alert("Sistema encerrado!");
                        break;

                    default:
                        alert("Opção inválida!");
                }

            } while (opcao !== "5");
        }
    </script>

</body>
</html>
