
function comprar(produto, preco) {
  // Substitua pelo WhatsApp da sua loja.
  // Use código do país + DDD + número, sem espaços.
  const telefone = "5511999999999";

  const mensagem =
    `Olá! Tenho interesse no ${produto}, no valor de R$ ${preco}. ` +
    `Gostaria de saber os tamanhos disponíveis.`;

  const link = `https://wa.me/${telefone}?text=${
    encodeURIComponent(mensagem)
  }`;

  window.open(link, "_blank", "noopener,noreferrer");
}
