
let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Cadastrar produto
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isInteger(codigo) || codigo <= 0 ||
        descricao === "" ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        mostrarMensagem("Preencha os campos com dados válidos.", true);
        return;
    }

    const existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código.", true);
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formProduto.reset();
    listarProdutos();

    mostrarMensagem("Produto cadastrado com sucesso!");
});

// Listar produtos
document.getElementById("btnListar").addEventListener("click", function() {
    listarProdutos();
});

function listarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML =
            '<tr><td colspan="4">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(function(dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        listaProdutos.appendChild(linha);
    });
}

// Alterar valor
document.getElementById("btnAlterarValor")
    .addEventListener("click", function() {
        const codigo = Number(
            prompt("Digite o código do produto:")
        );

        if (!Number.isInteger(codigo) || codigo <= 0) {
            mostrarMensagem("Código inválido.", true);
            return;
        }

        const produto = produtos.find(function(p) {
            return p.codigo === codigo;
        });

        if (!produto) {
            mostrarMensagem("Produto não encontrado.", true);
            return;
        }

        const entrada = prompt("Digite o novo valor do produto:");

        if (entrada === null || entrada.trim() === "") {
            mostrarMensagem("Alteração cancelada.", true);
            return;
        }

        const novoValor = Number(entrada.replace(",", "."));

        if (!Number.isFinite(novoValor) || novoValor < 0) {
            mostrarMensagem("Valor inválido.", true);
            return;
        }

        produto.valor = novoValor;

        listarProdutos();
        mostrarMensagem("Valor alterado com sucesso!");
    });

// Alterar quantidade
document.getElementById("btnAlterarQuantidade")
    .addEventListener("click", function() {
        const codigo = Number(
            prompt("Digite o código do produto:")
        );

        if (!Number.isInteger(codigo) || codigo <= 0) {
            mostrarMensagem("Código inválido.", true);
            return;
        }

        const produto = produtos.find(function(p) {
            return p.codigo === codigo;
        });

        if (!produto) {
            mostrarMensagem("Produto não encontrado.", true);
            return;
        }

        const entrada = prompt("Digite a nova quantidade:");

        if (entrada === null || entrada.trim() === "") {
            mostrarMensagem("Alteração cancelada.", true);
            return;
        }

        const novaQuantidade = Number(entrada);

        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
            mostrarMensagem("Quantidade inválida.", true);
            return;
        }

        produto.quantidade = novaQuantidade;

        listarProdutos();
        mostrarMensagem("Quantidade alterada com sucesso!");
    });

// Exibir mensagens na página
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "#b91c1c" : "#166534";
}
