<script>
        // DADOS DO CARDÁPIO
        const produtos = [
            {
                id: 1,
                nome: "PF Completo",
                desc: "Arroz, feijão, bife acebolado, farofa, salada",
                preco: 18.00,
                categoria: "pf",
                img: "https://spcuriosos.com.br/wp-content/uploads/2012/10/pratofeito.jpg?w=200"
            },
            {
                id: 2,
                nome: "Galinha Caipira",
                desc: "Acompanha baião de dois e paçoca",
                preco: 22.00,
                categoria: "pf",
                img: "https://areademulher.r7.com/wp-content/uploads/2023/02/3-11.jpg?w=200"
            },
            {
                id: 3,
                nome: "Pizza",
                desc: "Tradicional, com arroz branco",
                preco: 25.00,
                categoria: "pf",
                img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"
            },
            {
                id: 4,
                nome: " Pepsi 1L",
                desc: "Gelada",
                preco: 8.00,
                categoria: "bebidas",
                img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200"
            },
            {
                id: 5,
                nome: "Suco de Caju 500ml",
                desc: "Natural da fruta",
                preco: 6.00,
                categoria: "bebidas",
                img: "https://espaconatelie.com.br/wp-content/uploads/2026/02/suco-de-caju-natural.webp?w=200"
            },
            {
                id: 6,
                nome: "Combo Almoço",
                desc: "PF + Suco + Doce | Sai R$ 25",
                preco: 25.00,
                categoria: "promocao",
                img: "https://assets.planne.com.br/apps/6IPXOTF1VEP/images/high/If1fWA1MU4CrofcKd1mFeebda8iun44Whyqd1oyi.jpg?w=200"
            }
        ];

        // CONFIGURAÇÕES
        const NUMERO_WHATSAPP = "5589999221649"; // Número atualizado conforme pedido
        const TAXA_ENTREGA = 3.00;
        let carrinho = [];
        let categoriaAtual = 'todos';

        // RENDERIZA PRODUTOS NA TELA
        function renderizarProdutos() {
            const lista = document.getElementById('lista-produtos');
            const busca = document.getElementById('busca-input').value.toLowerCase();
            
            let produtosFiltrados = produtos.filter(p => {
                const matchCategoria = categoriaAtual === 'todos' || p.categoria === categoriaAtual;
                const matchBusca = p.nome.toLowerCase().includes(busca) || p.desc.toLowerCase().includes(busca);
                return matchCategoria && matchBusca;
            });

            lista.innerHTML = '<h2 class="secao-titulo">Mais Pedidos</h2>';
            
            produtosFiltrados.forEach(produto => {
                lista.innerHTML += `
                    <div class="card">
                        <img src="${produto.img}" alt="${produto.nome}">
                        <div class="card-info">
                            <div>
                                <div class="card-titulo">${produto.nome}</div>
                                <div class="card-desc">${produto.desc}</div>
                            </div>
                            <div class="card-footer">
                                <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                                <button class="add-btn" onclick="adicionarCarrinho(${produto.id}, event)">Adicionar</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // ADICIONAR AO CARRINHO
        function adicionarCarrinho(id, event) {
            const produto = produtos.find(p => p.id === id);
            const itemExistente = carrinho.find(item => item.id === id);
            
            if (itemExistente) {
                itemExistente.qtd++;
            } else {
                carrinho.push({...produto, qtd: 1});
            }
            
            atualizarCarrinho();
            
            // Feedback visual seguro no botão clicado
            if (event && event.target) {
                const btn = event.target;
                btn.innerText = "Adicionado ✓";
                btn.style.background = "#2E7D32";
                setTimeout(() => {
                    btn.innerText = "Adicionar";
                    btn.style.background = "var(--cor-primaria)";
                }, 800);
            }
        }

        // REMOVER DO CARRINHO (Botão de segurança adicionado)
        function removerCarrinho(id) {
            const itemExistente = carrinho.find(item => item.id === id);
            if (itemExistente) {
                itemExistente.qtd--;
                if (itemExistente.qtd === 0) {
                    carrinho = carrinho.filter(item => item.id !== id);
                }
            }
            atualizarCarrinho();
        }

        // ATUALIZA OS VALORES DA INTERFACE
        function atualizarCarrinho() {
            const totalProdutos = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
            const totalComTaxa = totalProdutos + TAXA_ENTREGA;
            
            // Atualiza os preços na tela principal e modal
            document.getElementById('total-carrinho').innerText = totalProdutos.toFixed(2).replace('.', ',');
            document.getElementById('total-final').innerText = totalComTaxa.toFixed(2).replace('.', ',');
            document.getElementById('modal-subtotal').innerText = "R$ " + totalProdutos.toFixed(2).replace('.', ',');
            document.getElementById('modal-total').innerText = "R$ " + totalComTaxa.toFixed(2).replace('.', ',');
            
            // Mostra ou esconde a barra fixa inferior
            document.getElementById('carrinho-fixo').classList.toggle('ativo', carrinho.length > 0);
            
            // Lista os itens dentro do Modal
            const itensHtml = carrinho.map(item => `
                <div class="item-carrinho">
                    <span>${item.qtd}x ${item.nome}</span>
                    <div class="item-acoes">
                        <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</span>
                        <button class="remove-btn" onclick="removerCarrinho(${item.id})">❌</button>
                    </div>
                </div>
            `).join('');
            
            document.getElementById('itens-carrinho').innerHTML = itensHtml || '<p style="color:#666; text-align:center; padding: 20px 0;">Seu carrinho está vazio</p>';
        }

        // CONTROLE DE CATEGORIAS
        function filtrarCategoria(cat, event) {
            categoriaAtual = cat;
            document.querySelectorAll('.categoria').forEach(btn => btn.classList.remove('ativa'));
            if (event && event.target) {
                event.target.classList.add('ativa');
            }
            renderizarProdutos();
        }

        // FILTRAR POR DIGITAÇÃO
        function filtrarProdutos() {
            renderizarProdutos();
        }

        // MODAL CONTROLE
        function abrirCarrinho() {
            document.getElementById('modal-carrinho').style.display = 'block';
        }

        function fecharCarrinho() {
            document.getElementById('modal-carrinho').style.display = 'none';
        }

        // REDIRECIONAMENTO AUTOMÁTICO SEGURO PARA O WHATSAPP
        function finalizarPedido() {
            if (carrinho.length === 0) return;
            
            let msg = "Olá! Quero fazer um pedido:\n\n";
            carrinho.forEach(item => {
                const subtotalItem = (item.preco * item.qtd).toFixed(2).replace('.', ',');
                msg += `${item.qtd}x ${item.nome} - R$ ${subtotalItem}\n`;
            });
            
            const totalGeral = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0) + TAXA_ENTREGA;
            msg += `\nTaxa de entrega: R$ ${TAXA_ENTREGA.toFixed(2).replace('.', ',')}\n`;
            msg += `*Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}*\n\n`;
            msg += "Endereço para entrega: ";
            
            // encodeURIComponent converte o texto e as quebras de linha de forma nativa e limpa
            const textoFormatado = encodeURIComponent(msg);
            
            // Usamos o link direto da API para forçar a abertura do app sem bloqueios
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${textoFormatado}`;
            
            // Redireciona na mesma aba garantindo que o celular abra o app automaticamente
            window.location.href = urlWhatsApp;
        }

        // INICIALIZAÇÃO
        renderizarProdutos();
    </script>