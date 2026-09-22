// ===== ESTADO =====
let produtos = JSON.parse(localStorage.getItem('estoque')) || [];

// ===== ELEMENTOS =====
const form = document.getElementById('form-produto');
const inputNome = document.getElementById('nome');
const inputQtd = document.getElementById('quantidade');
const inputPreco = document.getElementById('preco');
const inputBusca = document.getElementById('busca');
const corpoTabela = document.getElementById('corpo-tabela');
const mensagemVazia = document.getElementById('mensagem-vazia');

const totalProdutos = document.getElementById('total-produtos');
const totalItens = document.getElementById('total-itens');
const valorTotal = document.getElementById('valor-total');

// ===== FUNÇÕES AUXILIARES =====
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
      style: 'currency',
          currency: 'BRL'
            });
            }

            function salvar() {
              localStorage.setItem('estoque', JSON.stringify(produtos));
              }

              // ===== RENDERIZAÇÃO =====
              function renderizar() {
                const filtro = inputBusca.value.toLowerCase().trim();

                  const filtrados = produtos.filter(p =>
                      p.nome.toLowerCase().includes(filtro)
                        );

                          corpoTabela.innerHTML = '';

                            if (filtrados.length === 0) {
                                mensagemVazia.style.display = 'block';
                                    mensagemVazia.textContent = filtro
                                          ? 'Nenhum produto encontrado.'
                                                : 'Nenhum produto cadastrado ainda.';
                                                  } else {
                                                      mensagemVazia.style.display = 'none';

                                                          filtrados.forEach(produto => {
                                                                const indexReal = produtos.indexOf(produto);
                                                                      const subtotal = produto.quantidade * produto.preco;

                                                                            const tr = document.createElement('tr');

                                                                                  // Nome
                                                                                        const tdNome = document.createElement('td');
                                                                                              tdNome.textContent = produto.nome;

                                                                                                    // Quantidade
                                                                                                          const tdQtd = document.createElement('td');
                                                                                                                tdQtd.textContent = produto.quantidade;
                                                                                                                      if (produto.quantidade <= 5) tdQtd.classList.add('estoque-baixo');

                                                                                                                            // Preço
                                                                                                                                  const tdPreco = document.createElement('td');
                                                                                                                                        tdPreco.textContent = formatarMoeda(produto.preco);

                                                                                                                                              // Subtotal
                                                                                                                                                    const tdSubtotal = document.createElement('td');
                                                                                                                                                          tdSubtotal.textContent = formatarMoeda(subtotal);

                                                                                                                                                                // Ações
                                                                                                                                                                      const tdAcoes = document.createElement('td');
                                                                                                                                                                            tdAcoes.classList.add('acoes');

                                                                                                                                                                                  const btnMais = document.createElement('button');
                                                                                                                                                                                        btnMais.textContent = '➕';
                                                                                                                                                                                              btnMais.title = 'Adicionar 1';
                                                                                                                                                                                                    btnMais.addEventListener('click', () => alterarQtd(indexReal, 1));

                                                                                                                                                                                                          const btnMenos = document.createElement('button');
                                                                                                                                                                                                                btnMenos.textContent = '➖';
                                                                                                                                                                                                                      btnMenos.title = 'Remover 1';
                                                                                                                                                                                                                            btnMenos.addEventListener('click', () => alterarQtd(indexReal, -1));

                                                                                                                                                                                                                                  const btnRemover = document.createElement('button');
                                                                                                                                                                                                                                        btnRemover.textContent = '🗑️';
                                                                                                                                                                                                                                              btnRemover.title = 'Excluir produto';
                                                                                                                                                                                                                                                    btnRemover.addEventListener('click', () => removerProduto(indexReal));

                                                                                                                                                                                                                                                          tdAcoes.append(btnMais, btnMenos, btnRemover);

                                                                                                                                                                                                                                                                tr.append(tdNome, tdQtd, tdPreco, tdSubtotal, tdAcoes);
                                                                                                                                                                                                                                                                      corpoTabela.appendChild(tr);
                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                              atualizarResumo();
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                              // ===== RESUMO =====
                                                                                                                                                                                                                                                                              function atualizarResumo() {
                                                                                                                                                                                                                                                                                const qtdProdutos = produtos.length;
                                                                                                                                                                                                                                                                                  const qtdItens = produtos.reduce((soma, p) => soma + p.quantidade, 0);
                                                                                                                                                                                                                                                                                    const valor = produtos.reduce(
                                                                                                                                                                                                                                                                                        (soma, p) => soma + p.quantidade * p.preco,
                                                                                                                                                                                                                                                                                            0
                                                                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                                                                totalProdutos.textContent = qtdProdutos;
                                                                                                                                                                                                                                                                                                  totalItens.textContent = qtdItens;
                                                                                                                                                                                                                                                                                                    valorTotal.textContent = formatarMoeda(valor);
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                    // ===== AÇÕES =====
                                                                                                                                                                                                                                                                                                    function adicionarProduto(nome, quantidade, preco) {
                                                                                                                                                                                                                                                                                                      produtos.push({ nome, quantidade, preco });
                                                                                                                                                                                                                                                                                                        salvar();
                                                                                                                                                                                                                                                                                                          renderizar();
                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                          function alterarQtd(index, delta) {
                                                                                                                                                                                                                                                                                                            const novaQtd = produtos[index].quantidade + delta;
                                                                                                                                                                                                                                                                                                              if (novaQtd < 0) return;
                                                                                                                                                                                                                                                                                                                produtos[index].quantidade = novaQtd;
                                                                                                                                                                                                                                                                                                                  salvar();
                                                                                                                                                                                                                                                                                                                    renderizar();
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    function removerProduto(index) {
                                                                                                                                                                                                                                                                                                                      if (confirm(`Excluir "${produtos[index].nome}"?`)) {
                                                                                                                                                                                                                                                                                                                          produtos.splice(index, 1);
                                                                                                                                                                                                                                                                                                                              salvar();
                                                                                                                                                                                                                                                                                                                                  renderizar();
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                    // ===== EVENTOS =====
                                                                                                                                                                                                                                                                                                                                    form.addEventListener('submit', (e) => {
                                                                                                                                                                                                                                                                                                                                      e.preventDefault();

                                                                                                                                                                                                                                                                                                                                        const nome = inputNome.value.trim();
                                                                                                                                                                                                                                                                                                                                          const quantidade = parseInt(inputQtd.value);
                                                                                                                                                                                                                                                                                                                                            const preco = parseFloat(inputPreco.value);

                                                                                                                                                                                                                                                                                                                                              if (!nome || isNaN(quantidade) || isNaN(preco)) return;

                                                                                                                                                                                                                                                                                                                                                adicionarProduto(nome, quantidade, preco);
                                                                                                                                                                                                                                                                                                                                                  form.reset();
                                                                                                                                                                                                                                                                                                                                                    inputNome.focus();
                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                    inputBusca.addEventListener('input', renderizar);

                                                                                                                                                                                                                                                                                                                                                    // ===== INICIALIZAÇÃO =====
                                                                                                                                                                                                                                                                                                                                                    renderizar();