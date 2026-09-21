// Aguarda o carregamento do documento
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. VARIÁVEIS E ESTADO DO CARRINHO
    // ==========================================
    let totalItens = 0;
    let valorTotal = 0;

    const botaoCarrinho = document.querySelector('.busca-carrinho button');
    const campoBusca = document.querySelector('.busca-carrinho input');
    const botoesComprar = document.querySelectorAll('.cartao-produto button');
    const cartoesProdutos = document.querySelectorAll('.cartao-produto');
    const linksNavegacao = document.querySelectorAll('nav a');


    // ==========================================
    // 2. FUNÇÃO: ADICIONAR AO CARRINHO
    // ==========================================
    botoesComprar.forEach((botao) => {
        botao.addEventListener('click', (event) => {
            const cartao = event.target.closest('.cartao-produto');
            const nomePerfume = cartao.querySelector('h3').textContent;
            const textoPreco = cartao.querySelector('.preco-atual').textContent;

            // Converter o preço "R$ 580,00" para número (580.00)
            const preco = parseFloat(
                textoPreco.replace('R$', '').replace('.', '').replace(',', '.').trim()
            );

            // Atualizar valores acumulados
            totalItens += 1;
            valorTotal += preco;

            // Atualizar o botão do topo
            botaoCarrinho.textContent = `🛒 Carrinho (${totalItens})`;

            // Feedback visual no botão clicado
            const textoOriginal = botao.textContent;
            botao.textContent = '✓ Adicionado!';
            botao.style.background = '#d4af37';
            botao.style.color = '#000';

            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.style.background = '';
                botao.style.color = '';
            }, 1500);
        });
    });


    // ==========================================
    // 3. FUNÇÃO: BUSCA EM TEMPO REAL
    // ==========================================
    if (campoBusca) {
        campoBusca.addEventListener('input', (e) => {
            const termoBusca = e.target.value.toLowerCase().trim();

            cartoesProdutos.forEach((cartao) => {
                const titulo = cartao.querySelector('h3').textContent.toLowerCase();
                const categoria = cartao.querySelector('.categoria').textContent.toLowerCase();
                const descricao = cartao.querySelector('.descricao').textContent.toLowerCase();

                // Verifica se o termo está no título, categoria ou descrição
                if (titulo.includes(termoBusca) || categoria.includes(termoBusca) || descricao.includes(termoBusca)) {
                    cartao.style.display = 'flex';
                } else {
                    cartao.style.display = 'none';
                }
            });
        });
    }


    // ==========================================
    // 4. FUNÇÃO: FILTRO POR CATEGORIA NO MENU
    // ==========================================
    linksNavegacao.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Se for um link de categoria (#feminino, #masculino, #unissex)
            if (href === '#feminino' || href === '#masculino' || href === '#unissex') {
                e.preventDefault();
                const categoriaDesejada = href.replace('#', '').toLowerCase();

                cartoesProdutos.forEach((cartao) => {
                    const categoriaProduto = cartao.querySelector('.categoria').textContent.toLowerCase();

                    if (categoriaProduto.includes(categoriaDesejada)) {
                        cartao.style.display = 'flex';
                    } else {
                        cartao.style.display = 'none';
                    }
                });

                // Rolar a tela suavemente até a seção de produtos
                document.querySelector('#produtos').scrollIntoView({ behavior: 'smooth' });

            } else if (href === '#inicio') {
                // Se clicar em início, exibe todos os produtos novamente
                cartoesProdutos.forEach(cartao => cartao.style.display = 'flex');
            }
        });
    });


    // ==========================================
    // 5. FUNÇÃO: EXIBIR RESUMO DO CARRINHO
    // ==========================================
    botaoCarrinho.addEventListener('click', () => {
        if (totalItens === 0) {
            alert('🛒 Seu carrinho está vazio no momento.');
        } else {
            const totalFormatado = valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            alert(
                `🛍️ SEU CARRINHO DE COMPRAS:\n\n` +
                `• Quantidade de itens: ${totalItens}\n` +
                `• Valor Total: ${totalFormatado}\n\n` +
                `Obrigado por escolher a Élégance Parfums!`
            );
        }
    });

});