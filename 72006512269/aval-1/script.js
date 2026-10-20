// Array para armazenar os produtos cadastrados
let estoque = [
    { codigo: "101", descricao: "Mouse Óptico", quantidade: 15, valor: 25.00 },
    { codigo: "102", descricao: "Teclado ABNT2", quantidade: 8, valor: 65.50 }
];

// Pegando os elementos do HTML
const form = document.getElementById("formProduto");
const tabela = document.getElementById("tabelaProdutos");
const totalGeralSpan = document.getElementById("totalGeral");

// Função para atualizar a tabela na tela
function atualizarTabela() {
    tabela.innerHTML = "";
    let totalGeral = 0;

    estoque.forEach((prod, index) => {
        let subtotal = prod.quantidade * prod.valor;
        totalGeral += subtotal;

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${prod.codigo}</td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-alterar" onclick="alterarProduto(${index})">Editar</button>
            </td>
        `;

        tabela.appendChild(linha);
    });

    totalGeralSpan.innerText = totalGeral.toFixed(2);
}

// Evento ao enviar o formulário
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let codigoInput = document.getElementById("codigo").value;
    let descricaoInput = document.getElementById("descricao").value;
    let quantidadeInput = parseInt(document.getElementById("quantidade").value);
    let valorInput = parseFloat(document.getElementById("valor").value);

    // Verifica se o código já existe
    let jaExiste = estoque.some(p => p.codigo === codigoInput);
    if (jaExiste) {
        alert("Já existe um produto com este código!");
        return;
    }

    // Criando o objeto do novo produto
    let novoProduto = {
        codigo: codigoInput,
        descricao: descricaoInput,
        quantidade: quantidadeInput,
        valor: valorInput
    };

    estoque.push(novoProduto);
    atualizarTabela();

    // Limpa o formulário
    form.reset();
});

// Função para alterar a quantidade e/ou o valor do produto
function alterarProduto(index) {
    let prod = estoque[index];

    let novaQtd = prompt(`Nova quantidade para "${prod.descricao}":`, prod.quantidade);
    if (novaQtd === null) return; // Se cancelar, não faz nada

    let novoValor = prompt(`Novo valor unitário para "${prod.descricao}":`, prod.valor);
    if (novoValor === null) return; // Se cancelar, não faz nada

    novaQtd = parseInt(novaQtd);
    novoValor = parseFloat(novoValor);

    // Validações simples
    if (isNaN(novaQtd) || novaQtd < 0 || isNaN(novoValor) || novoValor < 0) {
        alert("Por favor, insira valores válidos!");
        return;
    }

    // Atualiza os dados no array
    estoque[index].quantidade = novaQtd;
    estoque[index].valor = novoValor;

    atualizarTabela();
}

// Inicializa a tabela ao carregar a página
atualizarTabela();