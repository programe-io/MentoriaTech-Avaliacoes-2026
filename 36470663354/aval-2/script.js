document.addEventListener('DOMContentLoaded', () => {
  // Estado do Sapato Feminino
  const sapatoFeminino = {
    nome: "Scarpin Clássico Salto Alto",
    preco: 219.90,
    cor: "Preto",
    tamanho: "36",
    quantidade: 0
  };

  // Mapeamento de imagens por cor (Substitua Pelas URLs Reais Se Desejar)
  const imagensPorCor = {
    "Preto": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500&auto=format&fit=crop",
    "Nude": "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=500&auto=format&fit=crop",
    "Vermelho": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=500&auto=format&fit=crop"
  };

  // 1. Troca de Cor e Imagem
  const botoesCor = document.querySelectorAll('.color-option');
  const imagemPrincipal = document.querySelector('#imagem-sapato');
  const textoCorSelecionada = document.querySelector('#cor-nome');

  botoesCor.forEach((botao) => {
    botao.addEventListener('click', (e) => {
      botoesCor.forEach((b) => b.classList.remove('active'));
      
      const btnAtual = e.currentTarget;
      btnAtual.classList.add('active');

      const corEscolhida = btnAtual.getAttribute('data-cor');
      sapatoFeminino.cor = corEscolhida;

      // Atualiza o texto da cor
      if (textoCorSelecionada) {
        textoCorSelecionada.innerText = corEscolhida;
      }

      // Atualiza a imagem com transição
      if (imagemPrincipal && imagensPorCor[corEscolhida]) {
        imagemPrincipal.style.opacity = '0.3';
        setTimeout(() => {
          imagemPrincipal.src = imagensPorCor[corEscolhida];
          imagemPrincipal.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 2. Seleção de Numeração / Tamanho
  const botoesTamanho = document.querySelectorAll('.size-option');

  botoesTamanho.forEach((botao) => {
    botao.addEventListener('click', (e) => {
      botoesTamanho.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');

      sapatoFeminino.tamanho = e.target.innerText;
    });
  });

  // 3. Botão de Comprar / Adicionar à Sacola
  const btnComprar = document.querySelector('#btn-comprar-sapato');
  const badgeCarrinho = document.querySelector('#carrinho-contador');

  if (btnComprar) {
    btnComprar.addEventListener('click', () => {
      sapatoFeminino.quantidade++;

      // Atualiza o badge do carrinho na tela (se existir)
      if (badgeCarrinho) {
        badgeCarrinho.innerText = sapatoFeminino.quantidade;
        badgeCarrinho.classList.add('bounce');
        setTimeout(() => badgeCarrinho.classList.remove('bounce'), 300);
      }

      // Alerta de confirmação
      alert(
        ` Item adicionado à sacola com sucesso!\n\n` +
        `Produto: ${sapatoFeminino.nome}\n` +
        `Cor: ${sapatoFeminino.cor}\n` +
        `Tamanho: ${sapatoFeminino.tamanho}\n` +
        `Valor: R$ ${sapatoFeminino.preco.toFixed(2).replace('.', ',')}`
      );
    });
  }
});