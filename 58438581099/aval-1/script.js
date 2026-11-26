
let produtos = JSON.parse(localStorage.getItem('stockpro_produtos')) || [];
let somenteBaixo = false;

// Salvar produtos no navegador
function salvarStorage() {
    localStorage.setItem('stockpro_produtos', JSON.stringify(produtos));
}

// Formatar valores em reais
function dinheiro(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Evitar que textos cadastrados sejam interpretados como HTML
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function(caractere) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[caractere];
    });
}

// Atualizar dashboard
function atualizarDashboard() {
    let quantidade = 0;
    let baixo = 0;
    let valor = 0;

    produtos.forEach(function(produto) {
        quantidade += Number(produto.quantidade);
        valor += Number(produto.quantidade) * Number(produto.valor);

        if (Number(produto.quantidade) <= 5) {
            baixo++;
        }
    });

    document.getElementById('totalProdutos').textContent = produtos.length;
    document.getElementById('totalQuantidade').textContent = quantidade;
    document.getElementById('totalBaixo').textContent = baixo;
    document.getElementById('valorEstoque').textContent = dinheiro(valor);
}

// Mostrar produtos na tabela
function mostrarProdutos(lista) {
    let tabela = document.getElementById('listaProdutos');

    if (lista.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
        return;
    }

    tabela.innerHTML = '';

    lista.forEach(function(produto) {

        let total = Number(produto.quantidade) * Number(produto.valor);
        let baixo = Number(produto.quantidade) <= 5;

        let linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${escaparHTML(produto.codigo)}</td>

            <td>${escaparHTML(produto.descricao)}</td>

            <td>${produto.quantidade}</td>

            <td>${dinheiro(produto.valor)}</td>

            <td>${dinheiro(total)}</td>

            <td>
                <span class="status ${baixo ? 'baixo' : 'normal'}">
                    ${baixo ? 'Estoque baixo' : 'Normal'}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button class="editar"
                        onclick="editarProduto(${Number(produto.id)})"
                        title="Editar">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="qr"
                        onclick="gerarQR(${Number(produto.id)})"
                        title="QR Code">
                        <i class="fa-solid fa-qrcode"></i>
                    </button>

                    <button class="excluir"
                        onclick="excluirProduto(${Number(produto.id)})"
                        title="Excluir">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Listar e filtrar produtos
function listar() {
    let busca = document.getElementById('pesquisa').value.toLowerCase();

    let lista = produtos.filter(function(produto) {

        let texto =
            produto.codigo.toLowerCase() +
            ' ' +
            produto.descricao.toLowerCase();

        let encontrado = texto.includes(busca);

        if (somenteBaixo) {
            return encontrado && Number(produto.quantidade) <= 5;
        }

        return encontrado;
    });

    mostrarProdutos(lista);
    atualizarDashboard();
}

// Pesquisa
function filtrar() {
    somenteBaixo = false;
    listar();
}

// Mostrar todos os produtos
function mostrarTodos() {
    somenteBaixo = false;
    document.getElementById('pesquisa').value = '';
    listar();
}

// Mostrar somente estoque baixo
function mostrarBaixo() {
    somenteBaixo = true;
    document.getElementById('pesquisa').value = '';
    listar();
}

// Abrir cadastro
function abrirCadastro() {
    document.getElementById('modalCadastro').classList.add('ativo');

    document.getElementById('tituloModal').textContent = 'Novo Produto';

    document.getElementById('produtoId').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';
}

// Fechar cadastro
function fecharCadastro() {
    document.getElementById('modalCadastro').classList.remove('ativo');
}

// Salvar produto
function salvarProduto() {
    let id = document.getElementById('produtoId').value;
    let codigo = document.getElementById('codigo').value.trim();
    let descricao = document.getElementById('descricao').value.trim();

    let quantidadeTexto = document.getElementById('quantidade').value;
    let valorTexto = document.getElementById('valor').value;

    let quantidade = Number(quantidadeTexto);
    let valor = Number(valorTexto);

    if (!codigo || !descricao) {
        alert('Preencha o código e a descrição.');
        return;
    }

    if (
        quantidadeTexto === '' ||
        valorTexto === '' ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 ||
        valor < 0 ||
        !Number.isInteger(quantidade)
    ) {
        alert('Informe uma quantidade inteira e valores válidos.');
        return;
    }

    // Verificar código duplicado
    let codigoDuplicado = produtos.some(function(p) {
        return p.codigo.toLowerCase() === codigo.toLowerCase()
            && String(p.id) !== String(id);
    });

    if (codigoDuplicado) {
        alert('Já existe um produto cadastrado com esse código.');
        return;
    }

    if (id) {

        let produto = produtos.find(function(p) {
            return p.id == id;
        });

        if (produto) {
            produto.codigo = codigo;
            produto.descricao = descricao;
            produto.quantidade = quantidade;
            produto.valor = valor;
        }

    } else {

        produtos.push({
            id: Date.now(),
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        });
    }

    salvarStorage();
    fecharCadastro();
    listar();
}

// Editar produto
function editarProduto(id) {

    let produto = produtos.find(function(p) {
        return p.id == id;
    });

    if (!produto) {
        return;
    }

    document.getElementById('modalCadastro').classList.add('ativo');

    document.getElementById('tituloModal').textContent = 'Editar Produto';

    document.getElementById('produtoId').value = produto.id;
    document.getElementById('codigo').value = produto.codigo;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('valor').value = produto.valor;
}

// Excluir produto
function excluirProduto(id) {

    let produto = produtos.find(function(p) {
        return p.id == id;
    });

    if (!produto) {
        return;
    }

    if (confirm('Deseja excluir o produto ' + produto.descricao + '?')) {

        produtos = produtos.filter(function(p) {
            return p.id != id;
        });

        salvarStorage();
        listar();
    }
}

// Atualizar estoque
function atualizar() {
    listar();
    alert('Estoque atualizado.');
}

// Gerar QR Code
function gerarQR(id) {

    let produto = produtos.find(function(p) {
        return p.id == id;
    });

    if (!produto) {
        return;
    }

    if (typeof QRCode === 'undefined') {
        alert('Não foi possível carregar a biblioteca de QR Code. Verifique sua conexão com a internet.');
        return;
    }

    document.getElementById('modalQR').classList.add('ativo');

    document.getElementById('nomeQR').textContent = produto.descricao;

    let qr = document.getElementById('qrcode');

    qr.innerHTML = '';

    new QRCode(qr, {
        text: 'Código: ' + produto.codigo + ' | Produto: ' + produto.descricao,
        width: 180,
        height: 180
    });
}

// Fechar QR Code
function fecharQR() {
    document.getElementById('modalQR').classList.remove('ativo');
}

// Imprimir QR Code
function imprimirQR() {

    let qr = document.getElementById('qrcode');

    let imagem = qr.querySelector('img');
    let canvas = qr.querySelector('canvas');

    let imagemQR = imagem ? imagem.src : '';

    if (!imagemQR && canvas) {
        imagemQR = canvas.toDataURL('image/png');
    }

    if (!imagemQR) {
        alert('Gere o QR Code antes de imprimir.');
        return;
    }

    let nome = document.getElementById('nomeQR').textContent;

    let janela = window.open('', '', 'width=500,height=600');

    if (!janela) {
        alert('Permita a abertura de janelas pop-up para imprimir.');
        return;
    }

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>QR Code</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 40px;
                }

                img {
                    width: 180px;
                    height: 180px;
                }
            </style>
        </head>

        <body>
            <h2>${escaparHTML(nome)}</h2>

            <img src="${imagemQR}" alt="QR Code do produto">

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    janela.document.close();
}

// Exportar produtos para CSV
function exportar() {

    if (produtos.length === 0) {
        alert('Não existem produtos para exportar.');
        return;
    }

    let csv = 'Código;Descrição;Quantidade;Valor;Valor Total\n';

    produtos.forEach(function(produto) {

        let total = Number(produto.quantidade) * Number(produto.valor);

        // Proteger os campos de texto no CSV
        let codigo = '"' + String(produto.codigo).replace(/"/g, '""') + '"';
        let descricao = '"' + String(produto.descricao).replace(/"/g, '""') + '"';

        csv +=
            codigo + ';' +
            descricao + ';' +
            produto.quantidade + ';' +
            produto.valor + ';' +
            total + '\n';
    });

    let arquivo = new Blob(
        ['\ufeff' + csv],
        { type: 'text/csv;charset=utf-8;' }
    );

    let url = URL.createObjectURL(arquivo);

    let link = document.createElement('a');

    link.href = url;
    link.download = 'estoque-stockpro.csv';

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

// Fechar modal clicando fora
document.getElementById('modalCadastro').addEventListener('click', function(evento) {
    if (evento.target === this) {
        fecharCadastro();
    }
});

document.getElementById('modalQR').addEventListener('click', function(evento) {
    if (evento.target === this) {
        fecharQR();
    }
});

// Fechar modais com ESC
document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Escape') {
        fecharCadastro();
        fecharQR();
    }
});

// Inicializar sistema
listar();
