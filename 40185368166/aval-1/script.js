
class SistemaProdutos {
    constructor() {
        this.produtos = [];
    }

    validarProduto(descricao, quantidade, valor) {
        if (!descricao || descricao.trim().length < 5) {
            throw new Error("A descrição deve ter no mínimo 5 caracteres.");
        }
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            throw new Error("A quantidade deve ser um número maior que zero.");
        }
        if (typeof valor !== 'number' || valor < 0) {
            throw new Error("O valor deve ser maior ou igual a zero.");
        }
    }

    cadastrarProduto(descricao, quantidade, valor) {
        this.validarProduto(descricao, quantidade, valor);
        
        const novoProduto = {
            codigo: this.produtos.length + 1,
            descricao: descricao.trim(),
            quantidade: quantidade,
            valor: valor
        };
        
        this.produtos.push(novoProduto);
        return novoProduto;
    }

    listarProdutos() {
        console.table(this.produtos); 
    }

    buscarProduto(codigoProduto) {
        const produto = this.produtos.find(prod => prod.codigo === codigoProduto);
        if (!produto) {
            throw new Error("Produto não encontrado!");
        }
        return produto;
    }

    atualizarValor(codigoProduto, novoValor) {
        if (typeof novoValor !== 'number' || novoValor < 0) {
            throw new Error("O novo valor deve ser maior ou igual a zero.");
        }

        const produto = this.buscarProduto(codigoProduto);
        produto.valor = novoValor;
    }

    atualizarQuantidade(codigoProduto, novaQuantidade) {
        if (typeof novaQuantidade !== 'number' || novaQuantidade < 0) {
            throw new Error("A nova quantidade deve ser maior ou igual a zero.");
        }

        const produto = this.buscarProduto(codigoProduto);
        produto.quantidade = novaQuantidade;
    }
}


const sistema = new SistemaProdutos();

sistema.listarProdutos(); 

sistema.cadastrarProduto('Cadeira Gamer', 12, 450.00); 
sistema.cadastrarProduto('Mouse Logi', 50, 99.00);

sistema.listarProdutos(); 

sistema.atualizarValor(2, 47.00);
sistema.atualizarQuantidade(1, 3); 

sistema.listarProdutos();