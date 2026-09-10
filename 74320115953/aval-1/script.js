// Banco de dados em memória
let estoque = [];

// 1. Função de Cadastro
function cadastrarProduto(descricao, quantidade, valor) {
    // Escreva sua lógica aqui
}

// 2. Função de Listagem
function listarProdutos() {
    // Escreva sua lógica aqui
}

// 3. Função de Alterar Valor
function alterarValor(codigo, novoValor) {
    // Escreva sua lógica aqui
}

// 4. Função de Alterar Quantidade
function alterarQuantidade(codigo, quantidadeAdicional) {
    // Escreva sua lógica aqui
}

// ==========================================
// ÁREA DE TESTES (Não altere, apenas execute)
// ==========================================
console.log("--- INICIANDO TESTES ---");
cadastrarProduto("Notebook Dell", 10, 3500.00);
cadastrarProduto("Mouse Óptico", 50, 45.90);
listarProdutos(); 
// Deve listar os dois produtos com códigos 1 e 2

alterarValor(1, 3200.00); // Notebook entrou em promoção
alterarQuantidade(2, 20); // Chegaram mais 20 mouses
listarProdutos(); 
// Notebook deve custar 3200 e Mouse deve ter qtd 70