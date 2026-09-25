// ===== CARRINHO DE PEDIDOS =====
let carrinho = [];

// ===== 1. ADICIONAR ITEM AO PEDIDO =====
function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(produto => produto.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
    mostrarNotificacao(`${nome} adicionado! ✅`);
}

// ===== 2. REMOVER OU ALTERAR QUANTIDADE =====
function alterarQuantidade(nome, delta) {
    const item = carrinho.find(produto => produto.nome === nome);
    if (!item) return;
    
    item.quantidade += delta;
    
    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.nome !== nome);
    }
    
    atualizarCarrinho();
}

// ===== 3. ATUALIZAR EXIBIÇÃO DO CARRINHO =====
function atualizarCarrinho() {
    const lista = document.getElementById('lista-pedido');
    const total = document.getElementById('valor-total');
    const contador = document.getElementById('contador-itens');
    
    // Limpa a lista
    lista.innerHTML = '';
    
    let valorTotal = 0;
    let totalItens = 0;
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        valorTotal += item.preco * item.quantidade;
        totalItens += item.quantidade;
        
        li.innerHTML = `
            <span class="item-nome">${item.nome}</span>
            <span class="qtd">
                <button onclick="alterarQuantidade('${item.nome}', -1)">−</button>
                ${item.quantidade}
                <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>
            </span>
            <span class="subtotal">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        `;
        lista.appendChild(li);
    });
    
    // Atualiza valores
    total.textContent = `R$ ${valorTotal.toFixed(2)}`;
    contador.textContent = totalItens;
    
    // Salva no navegador
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// ===== 4. FILTRAR POR CATEGORIA =====
function filtrarPorCategoria(categoria) {
    const secoes = document.querySelectorAll('.secao');
    const botoes = document.querySelectorAll('.botao-filtro');
    
    // Atualiza estilo dos botões
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
        if (botao.dataset.categoria === categoria) {
            botao.classList.add('ativo');
        }
    });
    
    // Mostra/esconde seções
    secoes.forEach(secao => {
        if (categoria === 'todas' || secao.classList.contains(categoria)) {
            secao.style.display = 'block';
        } else {
            secao.style.display = 'none';
        }
    });
}

// ===== 5. CONFIRMAR PEDIDO =====
function confirmarPedido() {
    if (carrinho.length === 0) {
        alert('🛒 Seu carrinho está vazio! Adicione itens primeiro.');
        return;
    }
    
    const valorTotal = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
    const resumo = carrinho.map(item => `${item.nome} ×${item.quantidade} — R$ ${(item.preco * item.quantidade).toFixed(2)}`).join('\n');
    
    const mensagem = `📋 RESUMO DO PEDIDO:\n\n${resumo}\n\n💰 TOTAL: R$ ${valorTotal.toFixed(2)}\n\nConfirma o pedido?`;
    
    if (confirm(mensagem)) {
        alert('🎉 Pedido confirmado! Em instantes chega até você! Obrigado! 😋');
        carrinho = [];
        atualizarCarrinho();
    }
}

// ===== 6. LIMPAR CARRINHO =====
function limparCarrinho() {
    if (carrinho.length === 0 || confirm('Tem certeza que quer limpar tudo?')) {
        carrinho = [];
        atualizarCarrinho();
    }
}

// ===== 7. NOTIFICAÇÃO VISUAL =====
function mostrarNotificacao(texto) {
    const aviso = document.createElement('div');
    aviso.className = 'notificacao';
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    
    setTimeout(() => aviso.classList.add('mostrar'), 10);
    setTimeout(() => {
        aviso.classList.remove('mostrar');
        setTimeout(() => aviso.remove(), 300);
    }, 2000);
}

// ===== CARREGAR DADOS AO ABRIR =====
window.addEventListener('load', () => {
    const salvo = localStorage.getItem('carrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        atualizarCarrinho();
    }
    console.log('🍽️ Sistema de pedidos carregado!');
});