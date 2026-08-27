
function cadastrarProduto(descricao, quantidade, valor) {
    // Descricao deve ter no mínimo 5 caracteres
    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no mínimo cinco caracteres");
    }
}