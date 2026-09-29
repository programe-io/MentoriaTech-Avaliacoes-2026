// ==========================================
// FINANZY - DASHBOARD FINANCEIRO
// ==========================================

// Elementos principais
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const savingRateElement = document.getElementById("savingRate");

const themeButton = document.getElementById("themeButton");
const clearTransactionsButton =
    document.getElementById("clearTransactions");


// ==========================================
// Estado da aplicação
// ==========================================

let transactions = JSON.parse(
    localStorage.getItem("finanzy_transactions")
) || [
    {
        description: "Salário",
        amount: 8500,
        type: "income",
        category: "Receita",
        date: "Hoje"
    },
    {
        description: "Supermercado",
        amount: 385.40,
        type: "expense",
        category: "Alimentação",
        date: "Ontem"
    },
    {
        description: "Combustível",
        amount: 240,
        type: "expense",
        category: "Transporte",
        date: "28 Set"
    },
    {
        description: "Freelance",
        amount: 1200,
        type: "income",
        category: "Receita",
        date: "27 Set"
    }
];


// ==========================================
// Funções utilitárias
// ==========================================

function formatCurrency(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function saveTransactions() {
    localStorage.setItem(
        "finanzy_transactions",
        JSON.stringify(transactions)
    );
}


// ==========================================
// Atualiza os valores do dashboard
// ==========================================

function updateDashboard() {
    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;

    const savingRate =
        income > 0
            ? ((income - expenses) / income) * 100
            : 0;

    incomeElement.textContent = formatCurrency(income);
    expensesElement.textContent = formatCurrency(expenses);
    balanceElement.textContent = formatCurrency(balance);

    savingRateElement.textContent =
        `${savingRate.toFixed(1).replace(".", ",")}%`;
}


// ==========================================
// Renderiza as transações
// ==========================================

function renderTransactions() {
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = `
            <div class="empty-state">
                <p>Nenhuma transação cadastrada.</p>
            </div>
        `;

        updateDashboard();
        return;
    }

    transactions.forEach((transaction, index) => {
        const item = document.createElement("div");

        item.className = "transaction";

        const isIncome = transaction.type === "income";

        item.innerHTML = `
            <div class="transaction-icon ${isIncome ? "income" : "expense"}">
                ${isIncome ? "↗" : getCategoryIcon(transaction.category)}
            </div>

            <div class="transaction-info">
                <strong>${escapeHTML(transaction.description)}</strong>
                <span>
                    ${transaction.date} • ${escapeHTML(transaction.category)}
                </span>
            </div>

            <strong class="transaction-value ${
                isIncome ? "income-text" : ""
            }">
                ${isIncome ? "+" : "-"} ${formatCurrency(transaction.amount)}
            </strong>
        `;

        item.style.animation = `fadeIn 0.25s ease ${index * 0.04}s both`;

        transactionList.appendChild(item);
    });

    updateDashboard();
}


// ==========================================
// Ícones por categoria
// ==========================================

function getCategoryIcon(category) {
    const icons = {
        "Alimentação": "🛒",
        "Moradia": "🏠",
        "Transporte": "🚗",
        "Lazer": "🎮",
        "Saúde": "❤️",
        "Educação": "📚",
        "Outros": "💳"
    };

    return icons[category] || "💳";
}


// ==========================================
// Proteção simples contra HTML
// ==========================================

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================
// Modal
// ==========================================

function openModal() {
    modal.classList.add("show");

    document.getElementById("description").focus();
}

function closeModal() {
    modal.classList.remove("show");
    transactionForm.reset();
}

openModalButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});


// ==========================================
// Adicionar transação
// ==========================================

transactionForm.addEventListener("submit", event => {
    event.preventDefault();

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;

    if (!description || amount <= 0) {
        alert("Preencha os dados corretamente.");
        return;
    }

    const newTransaction = {
        description,
        amount,
        type,
        category,
        date: "Agora"
    };

    transactions.unshift(newTransaction);

    saveTransactions();
    renderTransactions();

    closeModal();
});


// ==========================================
// Limpar transações
// ==========================================

clearTransactionsButton.addEventListener("click", () => {
    if (transactions.length === 0) {
        return;
    }

    const confirmation = confirm(
        "Deseja realmente remover todas as transações?"
    );

    if (!confirmation) {
        return;
    }

    transactions = [];

    saveTransactions();
    renderTransactions();
});


// ==========================================
// Modo escuro
// ==========================================

const savedTheme =
    localStorage.getItem("finanzy_theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    updateThemeButton();
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "finanzy_theme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});

function updateThemeButton() {
    const isDark =
        document.body.classList.contains("dark");

    themeButton.innerHTML = `
        <span class="nav-icon">
            ${isDark ? "☀" : "☾"}
        </span>
        <span>
            ${isDark ? "Modo claro" : "Modo escuro"}
        </span>
    `;
}


// ==========================================
// Gráfico
// ==========================================

const chartPeriod =
    document.getElementById("chartPeriod");

const chartData = {
    6: [
        { month: "Mai", income: 80, expense: 35 },
        { month: "Jun", income: 67, expense: 40 },
        { month: "Jul", income: 88, expense: 45 },
        { month: "Ago", income: 72, expense: 32 },
        { month: "Set", income: 92, expense: 42 },
        { month: "Out", income: 84, expense: 38 }
    ],

    3: [
        { month: "Ago", income: 72, expense: 32 },
        { month: "Set", income: 92, expense: 42 },
        { month: "Out", income: 84, expense: 38 }
    ]
};

function renderChart(period = 6) {
    const chartBars =
        document.getElementById("chartBars");

    chartBars.innerHTML = "";

    chartData[period].forEach(item => {
        const group = document.createElement("div");

        group.className = "bar-group";

        group.innerHTML = `
            <div
                class="bar income-bar"
                style="height: ${item.income}%"
            ></div>

            <div
                class="bar expense-bar"
                style="height: ${item.expense}%"
            ></div>

            <span>${item.month}</span>
        `;

        chartBars.appendChild(group);
    });
}

chartPeriod.addEventListener("change", event => {
    renderChart(Number(event.target.value));
});


// ==========================================
// Inicialização
// ==========================================

renderTransactions();
renderChart();


// ==========================================
// Animação adicional
// ==========================================

const style = document.createElement("style");

style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(5px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .empty-state {
        padding: 35px 10px;
        text-align: center;
        color: var(--muted);
        font-size: 13px;
    }
`;

document.head.appendChild(style);