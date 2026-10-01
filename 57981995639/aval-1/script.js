// ============================================
// ELEMENTOS
// ============================================

const modal = document.getElementById("modal");

const openModalButton =
    document.getElementById("openModal");

const closeModalButton =
    document.getElementById("closeModal");

const transactionForm =
    document.getElementById("transactionForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const categoryInput =
    document.getElementById("category");

const transactionList =
    document.getElementById("transactionList");

const emptyTransactions =
    document.getElementById("emptyTransactions");

const balanceValue =
    document.getElementById("balanceValue");

const incomeValue =
    document.getElementById("incomeValue");

const expenseValue =
    document.getElementById("expenseValue");

const chartIncome =
    document.getElementById("chartIncome");

const chartExpense =
    document.getElementById("chartExpense");


// ============================================
// DADOS
// ============================================

let transactions =
    JSON.parse(
        localStorage.getItem("financeTransactions")
    ) || [];


// ============================================
// FORMATAÇÃO DE MOEDA
// ============================================

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value);

}


// ============================================
// SALVAR
// ============================================

function saveTransactions() {

    localStorage.setItem(
        "financeTransactions",
        JSON.stringify(transactions)
    );

}


// ============================================
// ABRIR MODAL
// ============================================

openModalButton.addEventListener(
    "click",
    function() {

        modal.classList.add("show");

        descriptionInput.focus();

    }
);


// ============================================
// FECHAR MODAL
// ============================================

closeModalButton.addEventListener(
    "click",
    function() {

        closeModal();

    }
);


// Fechar clicando fora
modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


function closeModal() {

    modal.classList.remove("show");

    transactionForm.reset();

}


// ============================================
// ADICIONAR TRANSAÇÃO
// ============================================

transactionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const description =
            descriptionInput.value.trim();

        const amount =
            Number(amountInput.value);

        const type =
            typeInput.value;

        const category =
            categoryInput.value;


        if (
            description === "" ||
            amount <= 0
        ) {
            return;
        }


        const transaction = {

            id: Date.now(),

            description: description,

            amount: amount,

            type: type,

            category: category,

            date: new Date().toLocaleDateString(
                "pt-BR"
            )

        };


        transactions.unshift(transaction);

        saveTransactions();

        renderDashboard();

        closeModal();

    }
);


// ============================================
// RENDERIZAR DASHBOARD
// ============================================

function renderDashboard() {

    renderTransactions();

    calculateTotals();

}


// ============================================
// RENDERIZAR TRANSAÇÕES
// ============================================

function renderTransactions() {

    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        emptyTransactions.style.display =
            "block";

        return;

    }


    emptyTransactions.style.display =
        "none";


    transactions
        .slice(0, 10)
        .forEach(transaction => {

            const item =
                document.createElement("div");

            item.className =
                `transaction ${transaction.type}`;


            const icon =
                document.createElement("div");

            icon.className =
                "transaction-icon";

            icon.textContent =
                transaction.type === "income"
                    ? "↑"
                    : "↓";


            const info =
                document.createElement("div");

            info.className =
                "transaction-info";


            const title =
                document.createElement("strong");

            title.textContent =
                transaction.description;


            const details =
                document.createElement("small");

            details.textContent =
                `${transaction.category} • ${transaction.date}`;


            info.appendChild(title);

            info.appendChild(details);


            const value =
                document.createElement("span");

            value.className =
                "transaction-value";


            const signal =
                transaction.type === "income"
                    ? "+"
                    : "-";


            value.textContent =
                `${signal} ${formatCurrency(
                    transaction.amount
                )}`;


            item.appendChild(icon);

            item.appendChild(info);

            item.appendChild(value);

            transactionList.appendChild(item);

        });

}


// ============================================
// CALCULAR TOTAIS
// ============================================

function calculateTotals() {

    let income = 0;

    let expense = 0;


    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });


    const balance =
        income - expense;


    balanceValue.textContent =
        formatCurrency(balance);

    incomeValue.textContent =
        formatCurrency(income);

    expenseValue.textContent =
        formatCurrency(expense);


    updateChart(
        income,
        expense
    );

}


// ============================================
// ATUALIZAR GRÁFICO
// ============================================

function updateChart(income, expense) {

    const maxValue =
        Math.max(income, expense, 1);


    const incomeHeight =
        (income / maxValue) * 180;


    const expenseHeight =
        (expense / maxValue) * 180;


    chartIncome.style.height =
        `${Math.max(incomeHeight, 5)}px`;


    chartExpense.style.height =
        `${Math.max(expenseHeight, 5)}px`;

}


// ============================================
// INICIALIZAÇÃO
// ============================================

renderDashboard();
