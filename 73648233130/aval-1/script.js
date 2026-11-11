

let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "SISTEMA DE ESTOQUE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "0 - Sair"
    ));

    switch (opcao) {

        case 1: {
            let codigo = Number(prompt("Código:"));

            if (produtos.some(p => p.codigo === codigo)) {
                alert("Código já cadastrado!");
                break;
            }

            let descricao = prompt("Descrição:");
            let quantidade = Number(prompt("Quantidade:"));
            let valor = Number(prompt("Valor:"));

            produtos.push({
                codigo,
                descricao,
                quantidade,
                valor
            });

            alert("Produto cadastrado!");
            break;
        }

        case 2:
            if (produtos.length === 0) {
                alert("Estoque vazio!");
            } else {
                let lista = produtos.map(p =>
                    `Código: ${p.codigo}\n` +
                    `Descrição: ${p.descricao}\n` +
                    `Quantidade: ${p.quantidade}\n` +
                    `Valor: R$ ${p.valor.toFixed(2)}`
                ).join("\n\n");

                alert(lista);
            }
            break;

        case 3: {
            let codigo = Number(prompt("Código do produto:"));
            let p = produtos.find(x => x.codigo === codigo);

            if (p) {
                p.valor = Number(prompt("Novo valor:"));
                alert("Valor alterado!");
            } else {
                alert("Produto não encontrado!");
            }
            break;
        }

        case 4: {
            let codigo = Number(prompt("Código do produto:"));
            let p = produtos.find(x => x.codigo === codigo);

            if (p) {
                p.quantidade = Number(prompt("Nova quantidade:"));
                alert("Quantidade alterada!");
            } else {
                alert("Produto não encontrado!");
            }
            break;
        }

        case 0:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 0);
