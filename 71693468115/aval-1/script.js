// Array que armazenará os objetos de produtos
let estoque = [];
let opcao = "";

// Loop principal para manter o menu ativo até o usuário decidir sair
while (opcao !== "5") {
    opcao = prompt(
        "=== SISTEMA DE ESTOQUE ===\n" +
        "1 - Cadastrar novo produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Alterar valor de um produto\n" +
        "4 - Alterar quantidade de um produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {
        case "1":
            // 1. Cadastrar um novo produto
            let codigo = prompt("Digite o código do produto:");
            
            // Verifica se o código já existe para evitar duplicidade
            let existe = estoque.some(item => item.codigo === codigo);
            if (existe) {
                alert("Erro: Já existe um produto cadastrado com este código!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = parseInt(prompt("Digite a quantidade em estoque:"));
            let valor = parseFloat(prompt("Digite o valor unitário (R$):"));

            // Adiciona o produto como um objeto dentro do array
            estoque.push({
                codigo: codigo,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor
            });

            alert("Produto cadastrado com sucesso!");
            break;

        case "2":
            // 2. Listar os produtos cadastrados
            if (estoque.length === 0) {
                alert("O estoque está vazio.");
            } else {
                let lista = "=== PRODUTOS CADASTRADOS ===\n\n";
                estoque.forEach(produto => {
                    lista += `Código: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}\n`;
                });
                alert(lista);
            }
            break;

        case "3":
            // 3. Alterar o valor de um produto
            let codValor = prompt("Digite o código do produto que deseja alterar o valor:");
            let produtoValor = estoque.find(item => item.codigo === codValor);

            if (produtoValor) {
                let novoValor = parseFloat(prompt(`Produto: ${produtoValor.descricao}\nValor atual: R$ ${produtoValor.valor.toFixed(2)}\n\nDigite o novo valor:`));
                produtoValor.valor = novoValor;
                alert("Valor atualizado com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case "4":
            // 4. Alterar a quantidade de um produto
            let codQtd = prompt("Digite o código do produto que deseja alterar a quantidade:");
            let produtoQtd = estoque.find(item => item.codigo === codQtd);

            if (produtoQtd) {
                let novaQtd = parseInt(prompt(`Produto: ${produtoQtd.descricao}\nQuantidade atual: ${produtoQtd.quantidade}\n\nDigite a nova quantidade:`));
                produtoQtd.quantidade = novaQtd;
                alert("Quantidade atualizada com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case "5":
            alert("Encerrando o sistema de estoque...");
            break;

        default:
            alert("Opção inválida! Por favor, escolha um número de 1 a 5.");
            break;
    }
}
