// 4. Criação da lista de produtos (Array Global)
const estoque = [];

// 12. Geração automática do código do produto (Contador incremental)
let proximoId = 1;

// Elementos da interface (DOM)
const form = document.getElementById('produtoForm');
const tabela = document.getElementById('tabelaProdutos');

// 6. Função para validar produto (Funções de validação específicas: itens 7, 8 e 9)
function validarDescricao(desc) {
    // 7. Validação da descrição (mínimo 3 caracteres)
    return desc.trim().length >= 3;
}

function validarQuantidade(qtd) {
    // 8. Validação da quantidade (não vazia e maior ou igual a zero)
    return qtd !== '' && Number(qtd) >= 0;
}

function validarValor(val) {
    // 9. Validação do valor (não vazio e maior que zero)
    return val !== '' && Number(val) > 0;
}

// 14. Função para listar produtos na tabela
function renderizarTabela() {
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    estoque.forEach(produto => {
        const linha = document.createElement('tr');
        
        // Calcula o valor total em estoque daquele produto específico
        const totalProduto = produto.quantidade * produto.valor;

        linha.innerHTML = `
            <td><strong>#${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>R$ ${totalProduto.toFixed(2)}</td>
        `;
        
        tabela.appendChild(linha);
    });
}

// 10. Função para cadastrar produto (Ouvinte do formulário)
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede que a página recarregue ao enviar o formulário

    // Captura dos valores digitados nos inputs HTML
    const descValue = document.getElementById('descricao').value;
    const qtdValue = document.getElementById('quantidade').value;
    const valValue = document.getElementById('valor').value;

    // Esconde as mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    // Variável de controle de fluxo de validação
    let formularioValido = true;

    // Executa os testes lógicos de validação
    if (!validarDescricao(descValue)) {
        document.getElementById('erroDescricao').style.display = 'block';
        formularioValido = false;
    }
    if (!validarQuantidade(qtdValue)) {
        document.getElementById('erroQuantidade').style.display = 'block';
        formularioValido = false;
    }
    if (!validarValor(valValue)) {
        document.getElementById('erroValor').style.display = 'block';
        formularioValido = false;
    }

    // Se o formulário passar em todas as validações com sucesso
    if (formularioValido) {
        
        // 3 e 11. Criação do objeto produto com sua respectiva estrutura de dados
        const novoProduto = {
            codigo: proximoId++, // Atribui o ID atual e soma +1 para o próximo produto
            descricao: descValue.trim(),
            quantidade: parseInt(qtdValue),
            valor: parseFloat(valValue)
        };

        // 13. Adição de produtos ao array global de estoque
        estoque.push(novoProduto);

        // 15. Testando o cadastro e a listagem (Atualiza a interface com os novos dados)
        renderizarTabela();
        
        // Limpa e reseta o formulário para uma nova entrada
        form.reset();
        document.getElementById('descricao').focus();
    }
});
