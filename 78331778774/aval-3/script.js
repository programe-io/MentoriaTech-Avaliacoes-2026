let carrinho = [];
let total = 0;

let lista = document.getElementById('lista-carrinho');
let textoTotal = document.getElementById('total');
let qtd = document.getElementById('qtd-carrinho');
let caixa = document.getElementById('carrinho-box');

function atualizarCarrinho() {
  lista.innerHTML = '';
    carrinho.forEach(function(item) {
        let li = document.createElement('li');
            li.textContent = item.nome + ' - R$ ' + item.preco.toFixed(2).replace('.', ',');
                lista.appendChild(li);
                  });
                    if (carrinho.length === 0) {
                        lista.innerHTML = '<li>Seu carrinho está vazio 😢</li>';
                          }
                            textoTotal.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
                              qtd.textContent = carrinho.length;
                              }

                              document.querySelectorAll('.add').forEach(function(btn) {
                                btn.addEventListener('click', function() {
                                    let nome = btn.getAttribute('data-nome');
                                        let preco = parseFloat(btn.getAttribute('data-preco'));
                                            carrinho.push({ nome: nome, preco: preco });
                                                total += preco;
                                                    atualizarCarrinho();
                                                        alert(nome + ' adicionado! 🛒');
                                                          });
                                                          });

                                                          document.getElementById('btn-carrinho').addEventListener('click', function() {
                                                            caixa.classList.toggle('mostrar');
                                                            });

                                                            document.getElementById('btn-limpar').addEventListener('click', function() {
                                                              carrinho = [];
                                                                total = 0;
                                                                  atualizarCarrinho();
                                                                  });

                                                                  document.getElementById('btn-finalizar').addEventListener('click', function() {
                                                                    if (carrinho.length === 0) {
                                                                        alert('Adicione algo primeiro!');
                                                                            return;
                                                                              }
                                                                                alert('Pedido confirmado! Total: R$ ' + total.toFixed(2).replace('.', ',') + ' 🎉\nChega em 30 min!');
                                                                                  carrinho = [];
                                                                                    total = 0;
                                                                                      atualizarCarrinho();
                                                                                      });

                                                                                      document.getElementById('btn-promocao').addEventListener('click', function() {
                                                                                        alert('Promoção: X-Tudo por R$ 19,90! É só adicionar ele no carrinho 🔥');
                                                                                        });

                                                                                        document.querySelectorAll('.filtro').forEach(function(botao) {
                                                                                          botao.addEventListener('click', function() {
                                                                                              document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
                                                                                                  botao.classList.add('ativo');
                                                                                                      let tipo = botao.getAttribute('data-filtro');
                                                                                                          document.querySelectorAll('.card').forEach(function(card) {
                                                                                                                if (tipo === 'todos' || card.getAttribute('data-categoria') === tipo) {
                                                                                                                        card.style.display = 'block';
                                                                                                                              } else {
                                                                                                                                      card.style.display = 'none';
                                                                                                                                            }
                                                                                                                                                });
                                                                                                                                                  });
                                                                                                                                                  });

                                                                                                                                                  document.getElementById('busca').addEventListener('input', function() {
                                                                                                                                                    let texto = this.value.toLowerCase();
                                                                                                                                                      document.querySelectorAll('.card').forEach(function(card) {
                                                                                                                                                          let nome = card.querySelector('h3').textContent.toLowerCase();
                                                                                                                                                              card.style.display = nome.includes(texto) ? 'block' : 'none';
                                                                                                                                                                });
                                                                                                                                                                });

                                                                                                                                                                atualizarCarrinho();
                                                                                                                                                                