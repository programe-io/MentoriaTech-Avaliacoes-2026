  <script>
        // Dados locais da preview
        const basicPosts = [
            {
                id: 1,
                categoria: "Pele",
                titulo: "Como preparar a pele para uma maquiagem natural",
                resumo: "Limpeza, hidratação e protetor solar com cor são os 3 passos básicos para um visual leve e saudável no dia a dia.",
                curtidas: 1
            },
            {
                id: 2,
                categoria: "Olhos",
                titulo: "Máscara de cílios sem empelotar",
                resumo: "Retire o excesso de produto do aplicador e faça movimentos em ziguezague da raiz até as pontas.",
                curtidas: 1
            },
            {
                id: 3,
                categoria: "Boca",
                titulo: "Batom hidratante vs. Batom Matte",
                resumo: "Descubra qual opção escolher dependendo da ocasião e do nível de hidratação dos seus lábios.",
                curtidas: 1
            }
        ];

        function renderPreviewPosts(list) {
            const container = document.getElementById('posts-container');
            container.innerHTML = list.map(post => `
                <article class="post-card">
                    <span class="post-category">${post.categoria}</span>
                    <h2 class="post-title">${post.titulo}</h2>
                    <p class="post-excerpt">${post.resumo}</p>
                    <div class="mt-3 flex items-center justify-between">
                        <button class="btn-like" onclick="likePost(${post.id})">
                            <i class="fa-solid fa-heart mr-1"></i> ${post.curtidas} Curtidas
                        </button>
                        <span class="text-[11px] text-zinc-400">Leitura de 2 min</span>
                    </div>
                </article>
            `).join('');
        }

        function likePost(id) {
            const p = basicPosts.find(item => item.id === id);
            if (p) {
                p.curtidas++;
                renderPreviewPosts(basicPosts);
            }
        }

        function filterPosts(cat) {
            if (cat === 'Todos') {
                renderPreviewPosts(basicPosts);
            } else {
                renderPreviewPosts(basicPosts.filter(p => p.categoria === cat));
            }
        }

        // Alternância de Abas
        function showTab(tabName) {
            ['preview', 'html', 'css', 'js'].forEach(t => {
                const view = document.getElementById(`view-${t}`);
                const tabBtn = document.getElementById(`tab-${t}`);
                
                if (t === tabName) {
                    view.classList.remove('hidden');
                    tabBtn.className = "px-3 py-1.5 rounded-md font-medium bg-rose-500 text-white transition flex items-center gap-1.5 shadow-sm";
                } else {
                    view.classList.add('hidden');
                    tabBtn.className = "px-3 py-1.5 rounded-md font-medium text-zinc-400 hover:text-white transition flex items-center gap-1.5";
                }
            });
        }

        // Inicializar
        window.onload = function() {
            renderPreviewPosts(basicPosts);
        }
    </script>