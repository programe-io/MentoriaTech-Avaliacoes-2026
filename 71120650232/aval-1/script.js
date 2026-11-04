class ControleEstoque {
    constructor() {
        this.produtos = [];
    }

    // 1. Cadastrar um novo produto
    cadastrar(codigo, descricao, quantidade, valor) {
        // Verifica se o código já existe
        const produtoExistente = this.produtos.find(p => p.codigo === codigo);
        if (produtoExistente) {
            console.log(`❌ Erro: Já existe um produto cadastrado com o código ${codigo}.`);
            return false;
        }

        const novoProduto = {
            codigo,
            descricao,
            quantidade: Number(quantidade),
            valor: Number(valor)
        };

        this.produtos.push(novoProduto);
        console.log(`✅ Sucesso: Produto "${descricao}" cadastrado com sucesso!`);
        return true;