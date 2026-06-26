document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO INICIAL DOS DADOS ---
    const appState = {
        availableBalance: 5520.00,
        totalSalesCount: 0,
        conversionRate: 3.2,
        salesValuesPool: [120.00, 250.00, 53.99, 99.90, 21.60, 60.00],
        clientNames: ["Rodrigo S.", "Amanda M.", "Carlos E.", "Beatriz F.", "Guilherme R.", "Letícia O."],
        productNames: ["Formação High Ticket", "Ebook Prompts Secretos", "Script Automatizador v4", "Membro Nexus Pro"],
        tasks: [
            { id: 1, text: "Bater R$ 10.000,00 de faturamento na semana", done: false },
            { id: 2, text: "Escalar tráfego direto para página de checkout", done: true }
        ]
    };

    // --- ELEMENTOS DO DOM ---
    const liveBalanceEl = document.getElementById('live-balance');
    const liveSalesCountEl = document.getElementById('live-sales-count');
    const liveConversionEl = document.getElementById('live-conversion');
    const liveSalesTrendEl = document.getElementById('live-sales-trend');
    const transactionTableBody = document.querySelector('#live-transactions-table tbody');
    const toastContainer = document.getElementById('live-sales-toast-container');
    
    const metaForm = document.getElementById('meta-task-form');
    const metaInput = document.getElementById('meta-task-input');
    const metaList = document.getElementById('meta-task-list');
    const withLiveBalanceEl = document.querySelector('.with-live-balance');

    // --- SISTEMA DE ABAS (MECÂNICA REAL DE NAVEGAÇÃO) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabs = document.querySelectorAll('.dashboard-tab');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- MECÂNICA DE TEMAS ---
    const themeBtn = document.getElementById('theme-switch-btn');
    themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute('data-theme');
        root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    });

    // --- FORMULÁRIO DE SAQUE (MECÂNICA REAL EXTRA) ---
    const withdrawalForm = document.getElementById('withdrawal-action-form');
    if (withdrawalForm) {
        withdrawalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Saque solicitado com sucesso! O valor será processado via PIX instantâneo.');
            withdrawalForm.reset();
        });
    }

    // --- RENDERIZADOR DE METAS ---
    function renderMetas() {
        metaList.innerHTML = '';
        appState.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item-row';
            li.innerHTML = `
                <span>${task.text}</span>
                <button style="background:none; border:none; color:rgba(239,68,68,0.7); cursor:pointer;" onclick="this.parentElement.remove()">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            metaList.appendChild(li);
        });
    }
    
    if (metaForm) {
        metaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(!metaInput.value.trim()) return;
            appState.tasks.push({ id: Date.now(), text: metaInput.value.trim(), done: false });
            metaInput.value = '';
            renderMetas();
        });
    }

    // --- LOOP DINÂMICO DE VENDAS E MUTAÇÃO DE MÉTRICAS (A CADA 3 SEGUNDOS) ---
    function executeLiveSalePipeline() {
        // 1. Escolhe valores aleatórios do pool fornecido
        const selectedValue = appState.salesValuesPool[Math.floor(Math.random() * appState.salesValuesPool.length)];
        const selectedClient = appState.clientNames[Math.floor(Math.random() * appState.clientNames.length)];
        const selectedProduct = appState.productNames[Math.floor(Math.random() * appState.productNames.length)];

        // 2. Atualiza o estado da aplicação (Soma o valor diretamente ao saldo inicial)
        appState.availableBalance += selectedValue;
        appState.totalSalesCount += 1;
        
        // Flutuação realista da taxa de conversão
        const conversionDelta = (Math.random() * 0.4 - 0.2); 
        appState.conversionRate = Math.max(1.5, Math.min(12.0, appState.conversionRate + conversionDelta));

        // 3. Atualiza os componentes da UI em tempo real
        liveBalanceEl.innerText = `R$ ${appState.availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        if (withLiveBalanceEl) {
            withLiveBalanceEl.innerText = `R$ ${appState.availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        
        liveSalesCountEl.innerText = appState.totalSalesCount;
        liveConversionEl.innerText = `${appState.conversionRate.toFixed(2)}%`;
        liveSalesTrendEl.innerHTML = `<i class="fa-solid fa-bolt"></i> +${appState.totalSalesCount} hoje`;

        // 4. Criação do Toast/Notificação Física na tela
        const toast = document.createElement('div');
        toast.className = 'premium-sales-toast';
        toast.innerHTML = `
            <div class="toast-sales-icon"><i class="fa-solid fa-bag-shopping"></i></div>
            <div class="toast-sales-info">
                <p>${selectedClient} comprou ${selectedProduct}</p>
                <h5>Valor: <span>R$ ${selectedValue.toFixed(2)}</span></h5>
            </div>
        `;
        toastContainer.appendChild(toast);
        
        setTimeout(() => { toast.remove(); }, 3000);

        // 5. Adiciona na tabela de histórico em tempo real
        const now = new Date();
        const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#NX-${Math.floor(Math.random() * 900000 + 100000)}</td>
            <td>${selectedClient}</td>
            <td><span style="background: rgba(16,185,129,0.15); color: #10b981; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">Aprovado</span></td>
            <td>PIX Gateway</td>
            <td style="font-weight: 700; color: #10b981;">+ R$ ${selectedValue.toFixed(2)}</td>
            <td>${timeStr}</td>
        `;
        transactionTableBody.prepend(tr);

        if (transactionTableBody.rows.length > 6) {
            transactionTableBody.deleteRow(6);
        }
    }

    // Inicializa o Intervalo de 3 segundos
    setInterval(executeLiveSalePipeline, 3000);

    // --- CANVAS LIVE GRAPHICS ENGINE ---
    const canvas = document.getElementById('realtimeCanvasGraph');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        function drawVectorChart() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(10, 180);
            ctx.lineTo(80, 140);
            ctx.lineTo(160, 160);
            ctx.lineTo(240, 90);
            ctx.lineTo(320, 110);
            ctx.lineTo(400, 40);
            ctx.stroke();
        }
        drawVectorChart();
    }

    renderMetas();
    executeLiveSalePipeline(); 
});