// Array principal para armazenar os produtos do estoque
let produtos = [];

// Função de validação dos dados do produto com throw new Error
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }
    if (quantidade < 1) {
        throw new Error("A quantidade em estoque deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Função para atualizar a tela exibindo os produtos cadastrados
function renderizarTabela() {
    const divLista = document.getElementById("listaProdutos");
    
    if (produtos.length === 0) {
        divLista.innerHTML = "Nenhum produto cadastrado no momento.";
        divLista.className = "lista-vazia";
        return;
    }

    divLista.className = "";
    let htmlConteudo = "";

    produtos.forEach((prod) => {
        htmlConteudo += `
            <div class="produto-item">
                <strong>Código:</strong> #${prod.codigo} | 
                <strong>Produto:</strong> ${prod.descricao} | 
                <strong>Qtd:</strong> ${prod.quantidade} un. | 
                <strong>Valor:</strong> R$ ${prod.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
        `;
    });

    divLista.innerHTML = htmlConteudo;
}

// Manipulador do formulário de cadastro
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página

    const descricaoInput = document.getElementById("descricao").value;
    const quantidadeInput = Number(document.getElementById("quantidade").value);
    const valorInput = Number(document.getElementById("valor").value);
    const divErro = document.getElementById("mensagemErro");

    divErro.innerHTML = ""; // Limpa erros anteriores

    try {
        // Valida os dados antes de inserir
        validarProduto(descricaoInput, quantidadeInput, valorInput);

        // Cria o objeto do novo produto com código automático baseado no tamanho do array
        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricaoInput,
            quantidade: quantidadeInput,
            valor: valorInput
        };

        // Adiciona ao array principal
        produtos.push(novoProduto);

        // Atualiza a interface e limpa o formulário
        renderizarTabela();
        document.getElementById("formCadastro").reset();

    } catch (erro) {
        // Exibe a mensagem de erro na tela caso a validação falhe
        divErro.innerHTML = erro.message;
    }
});

// Cadastrando um exemplo inicial padrão no array
produtos.push({
    codigo: 1,
    descricao: "Notebook Ultrafino Core i5",
    quantidade: 4,
    valor: 3499.90
});

// Renderiza a lista inicial ao carregar a página
renderizarTabela();