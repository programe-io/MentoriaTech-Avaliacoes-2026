let produtos = [
    { codigo: 1, descricao: "Arroz", quantidade: 20, valor: 25.90 },
    { codigo: 2, descricao: "Feijão", quantidade: 15, valor: 8.50 },
    { codigo: 3, descricao: "Macarrão", quantidade: 30, valor: 5.99 }
];

let opcao = 0;

while (opcao !== 5) {
    let entrada = prompt(
        "SISTEMA DE ESTOQUE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "5 - Sair\n\n" +
        "Digite uma opção:"
    );

    // Se o usuário clicar em "Cancelar", fechar o sistema com segurança
    if (entrada === null) {
        break; 
    }

    opcao = Number(entrada);

    if (opcao == 1) {
        let codigo = Number(prompt("Digite o código do produto:"));
        let descricao = prompt("Digite a descrição do produto:");
        let quantidade = Number(prompt("Digite a quantidade do produto:"));
        let valor = Number(prompt("Digite o valor do produto:"));

        // Cria o objeto e adiciona no array
        let novo = { codigo: codigo, descricao: descricao, quantidade: quantidade, valor: valor };
        produtos.push(novo);
        alert("Produto cadastrado com sucesso!");
    } 
    else if (opcao == 2) {
        // Exemplo simples de listagem para visualização no prompt
        let lista = "PRODUTOS EM ESTOQUE:\n\n";
        produtos.forEach(p => {
            lista += `Cód: ${p.codigo} | ${p.descricao} | Qtd: ${p.quantidade} | R$ ${p.valor.toFixed(2)}\n`;
        });
        alert(lista);
    }
    else if (opcao == 3) {
        // Aqui entraria a lógica de alterar valor
    }
    else if (opcao == 4) {
        // Aqui entraria a lógica de alterar quantidade
    }
    else if (opcao == 5) {
        alert("Saindo do sistema...");
    }
    else {
        alert("Opção inválida! Tente novamente.");
    }