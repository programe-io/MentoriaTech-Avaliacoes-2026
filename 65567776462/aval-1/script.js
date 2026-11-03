class Estoque {
    constructor() {
        this.produtos = [];
        this.proximoCodigo = 1; // Código gerado automaticamente
    }

    cadastrarProduto(descricao, quantidade, valor) {
        const novoProduto = {
            codigo: this.proximoCodigo++,
            descricao: descricao,
            quantidade: parseInt(quantidade),
            valor: parseFloat(valor)
        };
        this.produtos.push(novoProduto);
    }

    alterarValor(codigo, novoValor) {
        const produto = this.produtos.find(p => p.codigo === codigo);
        if (produto) {
            produto.valor = parseFloat(novoValor);
        }
    }

    alterarQuantidade(codigo, novaQuantidade) {
        const produto = this.produtos.find(p => p.codigo === codigo);
        if (produto) {
            produto.quantidade = parseInt(novaQuantidade);
        }
    }
}

// Instanciando o sistema
const meuEstoque = new Estoque();

// Elementos do DOM
const form = document.getElementById('form-produto');
const inputCodigoEdicao = document.getElementById('codigo-edicao');
const inputDescricao = document.getElementById('descricao');
const inputQuantidade = document.getElementById('quantidade');
const inputValor = document.getElementById('valor');
const tabelaCorpo = document.getElementById('tabela-corpo');
const tituloForm = document.getElementById('titulo-form');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');

// Evento de envio do formulário (Cadastro ou Atualização)
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const descricao = inputDescricao.value;
    const quantidade = inputQuantidade.value;
    const valor = inputValor.value;
    const codigoEdicao = inputCodigoEdicao.value;

    if (codigoEdicao === "") {
        // Operação de Criação
        meuEstoque.cadastrarProduto(descricao, quantidade, valor);
    } else {
        // Operação de Atualização (Valor e Quantidade solicitados na aula)
        const codigo = parseInt(codigoEdicao);
        meuEstoque.alterarQuantidade(codigo, quantidade);
        meuEstoque.alterarValor(codigo, valor);
        
        // Reseta o formulário para modo cadastro
        limparFormulario();
    }

    form.reset();
    atualizarTabela();
});

// Função para atualizar a tabela na tela
function atualizarTabela() {
    tabelaCorpo.innerHTML = "";

    if (meuEstoque.produtos.length === 0) {
        tabelaCorpo.innerHTML = `<tr><td colspan="5" class="vazio">Nenhum produto cadastrado no estoque.</td></tr>`;
        return;
    }

    meuEstoque.produtos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.descricao}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td>
                <button class="btn btn-azul" onclick="prepararEdicao(${p.codigo})">Editar</button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

// Função para preparar o formulário para alterar dados do produto
window.prepararEdicao = function(codigo) {
    const produto = meuEstoque.produtos.find(p => p.codigo === codigo);
    if (produto) {
        inputCodigoEdicao.value = produto.codigo;
        inputDescricao.value = produto.descricao;
        inputDescricao.disabled =므로-edicao => true; // Mantém a descrição fixa na edição (conforme regras)
        inputQuantidade.value = produto.quantidade;
        inputValor.value = produto.valor;

        tituloForm.textContent = `Editando Produto [Código: ${produto.codigo}]`;
        btnSalvar.textContent = "Salvar Alterações";
        btnCancelar.style.display = "inline-block";
        inputQuantidade.focus();
    }
}

// Botão cancelar edição
btnCancelar.addEventListener('click', function() {
    limparFormulario();
    form.reset();
});

function limparFormulario() {
    inputCodigoEdicao.value = "";
    inputDescricao.disabled = false;
    tituloForm.textContent = "Cadastrar Novo Produto";
    btnSalvar.textContent = "Cadastrar Produto";
    btnCancelar.style.display = "none";
}