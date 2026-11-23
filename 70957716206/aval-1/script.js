let estoque = [];

function cadastrar(nome, quantidade, preco) {
    estoque.push({ nome, quantidade, preco });
    console.log("Produto cadastrado!");
}

function listar() {
    console.log("\n=== ESTOQUE ===");
    estoque.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nome} | Qtd: ${p.quantidade} | R$: ${p.preco}`);
    });
}

function entrada(nome, qtd) {
    let p = estoque.find(p => p.nome === nome);
    if (p) p.quantidade += qtd;
    else console.log("Produto não encontrado!");
}

function saida(nome, qtd) {
    let p = estoque.find(p => p.nome === nome);
    if (p && p.quantidade >= qtd) p.quantidade -= qtd;
    else console.log("Estoque insuficiente ou produto inexistente!");
}

function consultar(nome) {
    let p = estoque.find(p => p.nome === nome);
    console.log(p || "Produto não encontrado!");
}

// Exemplos de uso
cadastrar("Mouse", 10, 50);
cadastrar("Teclado", 5, 100);
entrada("Mouse", 5);
saida("Teclado", 2);
listar();
consultar("Mouse");