// --- ESTADO GLOBAL DA APLICAÇÃO ---
const listaProdutos = [];
let contadorId = 1;

// --- REGRAS DE GERAÇÃO E VALIDAÇÃO ---
function geradorAutomaticoCodigo() {
    return `PROD-${contadorId++}`;
}

function validarDescricao(descricao) {
    if (!descricao || typeof descricao !== 'string' || descricao.trim().length < 3) {
        return "A descrição deve conter pelo menos 3 caracteres.";
    }
    return null;
}

function validarQuantidade(quantidade) {
    if (typeof quantidade !== 'number' || Number.isNaN(quantidade) || quantidade < 0 || !Number.isInteger(quantidade)) {
        return "A quantidade deve ser um número inteiro maior ou igual a zero.";
    }
    return null;
}

function validarValor(valor) {
    if (typeof valor !== 'number' || Number.isNaN(valor) || valor <= 0) {
        return "O valor do produto deve ser maior que zero.";
    }
    return null;
}

function validarProduto(descricao, quantidade, valor) {
    const erros = [];
    const erroDesc = validarDescricao(descricao);
    const erroQtd = validarQuantidade(quantidade);
    const erroVal = validarValor(valor);

    if (erroDesc) erros.push(erroDesc);
    if (erroQtd) erros.push(erroQtd);
    if (erroVal) erros.push(erroVal);

    return { valido: erros.length === 0, erros };
}

// --- OPERAÇÕES DO SISTEMA ---
function criarObjetoProduto(descricao, quantidade, valor) {
    return {
        codigo: geradorAutomaticoCodigo(),
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };
}

function cadastrarProduto(descricao, quantidade, valor) {
    const validacao = validarProduto(descricao, quantidade, valor);

    if (!validacao.valido) {
        alert(`Erro de validação:\n${validacao.erros.join("\n")}`);
        return false;
    }

    const novoProduto = criarObjetoProduto(descricao, quantidade, valor);
    listaProdutos.push(novoProduto);
    return true;
}

function buscarProdutoPorCodigo(codigo) {
    return listaProdutos.find(prod => prod.codigo === codigo);
}

function atualizarValorProduto(codigo, novoValor) {
    const erroVal = validarValor(novoValor);
    if (erroVal) {
        alert(erroVal);
        return false;
    }
    const produto = buscarProdutoPorCodigo(codigo);
    if (produto) {
        produto.valor = novoValor;
        return true;
    }
    return false;
}

function atualizarQuantidadeProduto(codigo, quantidadeVariacao) {
    if (!Number.isInteger(quantidadeVariacao)) {
        alert("A variação de quantidade precisa ser um número inteiro.");
        return false;
    }
    const produto = buscarProdutoPorCodigo(codigo);
    if (produto) {
        const novaQuantidade = produto.quantidade + quantidadeVariacao;
        if (novaQuantidade < 0) {
            alert(`Saldo insuficiente em estoque para: ${produto.descricao}`);
            return false;
        }
        produto.quantidade = novaQuantidade;
        return true;
    }
    return false;
}

// --- MANIPULAÇÃO DINÂMICA DO DOM (INTERFACE) ---
function renderizarTabela() {
    const tbody = document.getElementById("lista-produtos-body");
    tbody.innerHTML = "";
    let valorTotalEstoque = 0;

    if (listaProdutos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b;">Nenhum produto cadastrado.</td></tr>`;
        document.getElementById("resumo-estoque").innerText = "Valor Total do Estoque: R\$ 0,00";
        return;
    }

    listaProdutos.forEach(prod => {
        const totalPorProduto = prod.quantidade * prod.valor;
        valorTotalEstoque += totalPorProduto;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${prod.codigo}</strong></td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td><strong>R$ ${totalPorProduto.toFixed(2)}</strong></td>
            <td>
                <div class="action-inputs">
                    <input type="number" id="qtd-${prod.codigo}" placeholder="Qtd" value="1">
                    <button class="btn-sm" data-action="somar" data-codigo="${prod.codigo}">+</button>
                    <button class="btn-sm btn-danger" data-action="subtrair" data-codigo="${prod.codigo}">-</button>
                    
                    <input type="number" id="val-${prod.codigo}" step="0.01" placeholder="Preço" style="width:75px; margin-left:10px;">
                    <button class="btn-sm btn-success" data-action="preco" data-codigo="${prod.codigo}">R$</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("resumo-estoque").innerText = `Valor Total do Estoque: R$ ${valorTotalEstoque.toFixed(2)}`;
}

// --- ESCUTA E MAPEAMENTO DE EVENTOS ---
document.getElementById("form-cadastro").addEventListener("submit", function(event) {
    event.preventDefault();
    const desc = document.getElementById("desc").value;
    const qtd = parseInt(document.getElementById("qtd").value);
    const val = parseFloat(document.getElementById("val").value);

    if (cadastrarProduto(desc, qtd, val)) {
        this.reset();
        renderizarTabela();
    }
});

// Delegação de eventos para escutar cliques nos botões dinâmicos da tabela
document.getElementById("lista-produtos-body").addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName !== "BUTTON") return;

    const acao = target.getAttribute("data-action");
    const codigo = target.getAttribute("data-codigo");
    const inputQtd = document.getElementById(`qtd-${codigo}`);
    const inputVal = document.getElementById(`val-${codigo}`);

    if (acao === "somar" || acao === "subtrair") {
        const multiplicador = acao === "somar" ? 1 : -1;
        const fator = parseInt(inputQtd.value) * multiplicador;
        if (atualizarQuantidadeProduto(codigo, fator)) {
            renderizarTabela();
        }
    } else if (acao === "preco") {
        const novoPreco = parseFloat(inputVal.value);
        if (isNaN(novoPreco)) {
            alert("Por favor, digite um preço válido.");
            return;
        }
        if (atualizarValorProduto(codigo, novoPreco)) {
            renderizarTabela();
        }
    }
});

// --- CARGA INICIAL DE TESTE ---
cadastrarProduto("Notebook Dell", 10, 4500.00);
cadastrarProduto("Mouse Sem Fio", 50, 89.90);
renderizarTabela();
