
    // BASE DE DADOS EM MEMÓRIA (Simulando uma API/Banco de dados)
    let customersData = [
        { id: 1, name: "Carlos Eduardo", email: "carlos@empresa.com.br", company: "Alpha Enterprise", status: "Ativo" },
        { id: 2, name: "Mariana Costa", email: "mariana.c@tech.io", company: "ByteCraft", status: "Ativo" },
        { id: 3, name: "Rodrigo Souza", email: "rodrigo@Logix.com", company: "Logix S.A.", status: "Inativo" },
        { id: 4, name: "Juliana Mendes", email: "juliana@designstudio.pt", company: "Creative Co.", status: "Ativo" }
    ];

    // --- LÓGICA 1: ROTEAMENTO/ABAS ---
    const menuItems = document.querySelectorAll('.menu-item');
    const pageViews = document.querySelectorAll('.page-view');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            pageViews.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetPage = item.getAttribute('data-page');
            document.getElementById(`page-${targetPage}`).classList.add('active');
        });
    });

    // --- LÓGICA 2: RECOLHER SIDEBAR ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // --- LÓGICA 3: ALTERNADOR DE TEMA (CLARO/ESCURO) ---
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', () => {
        const rootAttr = document.documentElement.getAttribute('data-theme');
        if (rootAttr === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    // --- LÓGICA 4: TABELA DINÂMICA (RENDER, BUSCA E FILTRO) ---
    const tableBody = document.getElementById('customerTableBody');
    const tableSearch = document.getElementById('tableSearch');
    const tableFilter = document.getElementById('tableFilter');

    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        if(dataToRender.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-secondary);">Nenhum registro encontrado.</td></tr>`;
            return;
        }

        dataToRender.forEach(customer => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${customer.name}</strong></td>
                <td>${customer.email}</td>
                <td>${customer.company}</td>
                <td><span class="status-tag ${customer.status.toLowerCase()}">${customer.status}</span></td>
                <td>
                    <button class="icon-button delete-btn" data-id="${customer.id}" style="color: var(--rose-base)">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Evento para deletar item dinamicamente
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(btn.getAttribute('data-id'));
                customersData = customersData.filter(c => c.id !== idToDelete);
                applyFilters();
            });
        });
    }

    function applyFilters() {
        const searchValue = tableSearch.value.toLowerCase();
        const filterValue = tableFilter.value;

        const filtered = customersData.filter(cust => {
            const matchesSearch = cust.name.toLowerCase().includes(searchValue) || cust.email.toLowerCase().includes(searchValue);
            const matchesStatus = filterValue === 'all' || cust.status === filterValue;
            return matchesSearch && matchesStatus;
        });

        renderTable(filtered);
    }

    tableSearch.addEventListener('input', applyFilters);
    tableFilter.addEventListener('change', applyFilters);

    // Inicializa a tabela
    renderTable(customersData);

    // --- LÓGICA 5: GERENCIAMENTO DE MODAL E CADASTRO ---
    const modal = document.getElementById('customerModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const newCustomerForm = document.getElementById('newCustomerForm');

    const toggleModal = () => modal.classList.toggle('active');

    openModalBtn.addEventListener('click', toggleModal);
    closeModalBtn.addEventListener('click', toggleModal);
    cancelModalBtn.addEventListener('click', toggleModal);

    newCustomerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newCustomer = {
            id: Date.now(),
            name: document.getElementById('custName').value,
            email: document.getElementById('custEmail').value,
            company: document.getElementById('custCompany').value,
            status: document.getElementById('custStatus').value
        };

        customersData.push(newCustomer);
        applyFilters(); 
        newCustomerForm.reset(); 
        toggleModal(); 
    });

    // --- LÓGICA 6: CHART.JS (CONSTRUÇÃO DOS GRÁFICOS) ---
    // Gráfico de Linha (Faturamento)
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Faturamento Mensal (R$)',
                data:,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });

    // Gráfico de Rosca (Leads)
    const ctxLeads = document.getElementById('leadsChart').getContext('2d');
    new Chart(ctxLeads, {
        type: 'doughnut',
        data: {
            labels: ['Orgânico', 'Anúncios', 'Indicação'],
            datasets: [{
                data:,
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
});