// Banco de dados em memória temporária (Array)
const listaProdutos = [];
let proximoId = 1;

// --- FUNÇÕES DE VALIDAÇÃO ---
function validarProduto(descricao, quantidade, valor) {
    if (!descricao || descricao.trim().length < 3) {
        return { valido: false, erro: "A descrição deve ter ao menos 3 caracteres." };
    }
    if (quantidade === null || isNaN(quantidade) || quantidade < 0) {
        return { valido: false, erro: "A quantidade deve ser um número maior ou igual a zero." };
    }
    if (!valor || isNaN(valor) || valor <= 0) {
        return { valido: false, erro: "O valor unitário deve ser maior que zero." };
    }
    return { valido: true };
}

// --- FUNÇÃO PARA RENDERIZAR NA TELA (HTML) ---
function listarProdutos() {
    const tabelaBody = document.getElementById("tabela-produtos");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de reconstruir

    listaProdutos.forEach(prod => {
        const total = prod.quantidade * prod.valor;
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <strong><td>${prod.codigo}</td></strong>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td>R$ ${total.toFixed(2)}</td>
        `;
        tabelaBody.appendChild(linha);
    });
}

// --- FUNÇÕES DE MANIPULAÇÃO ---
function cadastrarProduto(descricao, quantidade, valor) {
    const validacao = validarProduto(descricao, quantidade, valor);
    if (!validacao.valido) {
        alert(`[ERRO]: ${validacao.erro}`);
        return;
    }

    const codigo = `PROD-${String(proximoId++).padStart(4, '0')}`;
    listaProdutos.push({
        codigo,
        descricao: descricao.trim(),
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    });

    listarProdutos();
}

function atualizarValorProduto(codigo, novoValor) {
    const produto = listaProdutos.find(p => p.codigo === codigo.toUpperCase().trim());
    if (!produto) {
        alert("[ERRO]: Código do produto não encontrado.");
        return;
    }
    if (isNaN(novoValor) || novoValor <= 0) {
        alert("[ERRO]: Insira um valor de preço válido.");
        return;
    }

    produto.valor = parseFloat(novoValor);
    listarProdutos();
}

function atualizarQuantidadeProduto(codigo, quantidadeASomar) {
    const produto = listaProdutos.find(p => p.codigo === codigo.toUpperCase().trim());
    if (!produto) {
        alert("[ERRO]: Código do produto não encontrado.");
        return;
    }
    if (isNaN(quantidadeASomar)) {
        alert("[ERRO]: Quantidade inválida.");
        return;
    }

    if (produto.quantidade + quantidadeASomar < 0) {
        alert(`[ERRO]: Estoque insuficiente! Saldo atual é de ${produto.quantidade} unidades.`);
        return;
    }

    produto.quantidade += quantidadeASomar;
    listarProdutos();
}

// --- CAPTURA DE EVENTOS DOS FORMULÁRIOS HTML ---
document.getElementById("form-cadastro").addEventListener("submit", function(e) {
    e.preventDefault();
    const desc = document.getElementById("descricao").value;
    const qtd = parseInt(document.getElementById("quantidade").value);
    const val = parseFloat(document.getElementById("valor").value);
    
    cadastrarProduto(desc, qtd, val);
    this.reset(); // Limpa os campos após enviar
});

document.getElementById("form-valor").addEventListener("submit", function(e) {
    e.preventDefault();
    const cod = document.getElementById("cod-valor").value;
    const val = parseFloat(document.getElementById("novo-valor").value);
    
    atualizarValorProduto(cod, val);
    this.reset();
});

document.getElementById("form-estoque").addEventListener("submit", function(e) {
    e.preventDefault();
    const cod = document.getElementById("cod-estoque").value;
    const qtd = parseInt(document.getElementById("qtd-movimento").value);
    
    atualizarQuantidadeProduto(cod, qtd);
    this.reset();
});

// Adicionando alguns itens iniciais de teste automaticamente
cadastrarProduto("Notebook Pro 15'", 5, 4500.00);
cadastrarProduto("Mouse Óptico Bluetooth", 20, 120.00);
