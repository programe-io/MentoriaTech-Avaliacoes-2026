const transactionList = document.getElementById('transaction-list');
const balanceValue = document.getElementById('balance-value');
const btnSubmit = document.getElementById('submit-btn');

let totalBalance = 0;
let itemSendoEditado = null;

function addTransaction() {
    const descInput = document.getElementById('desc');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');

    const desc = descInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (desc.trim() === '' || isNaN(amount)) {
        alert("Preencha a descrição e o valor corretamente!");
        return;
    }

    if (itemSendoEditado) {
        // Modo Edição: Subtrai o valor antigo do saldo total antes de atualizar
        totalBalance -= parseFloat(itemSendoEditado.dataset.amount);

        itemSendoEditado.dataset.amount = amount;
        itemSendoEditado.dataset.desc = desc;
        itemSendoEditado.dataset.category = category;

        atualizarItemUI(itemSendoEditado, desc, amount, category);

        itemSendoEditado = null;
        btnSubmit.innerText = "Adicionar";
        btnSubmit.style.background = "#2ecc71";
    } else {
        // Novo Item
        criarNovoItem(desc, amount, category);
    }

    totalBalance += amount;
    balanceValue.innerText = `R$ ${totalBalance.toFixed(2)}`;

    // Identifica e soma as etapas estrategicamente
    identificarEtapas();

    descInput.value = '';
    amountInput.value = '';
}

function criarNovoItem(desc, valor, categoria) {
    const li = document.createElement('li');
    li.dataset.amount = valor;
    li.dataset.desc = desc;
    li.dataset.category = categoria;

    atualizarItemUI(li, desc, valor, categoria);
    transactionList.appendChild(li);
}

function atualizarItemUI(li, desc, valor, categoria) {
    const classeCor = valor > 0 ? 'plus' : 'minus';
    li.style.borderLeft = valor > 0 ? "5px solid #2ecc71" : "5px solid #e74c3c";

    li.innerHTML = `
        <div>
            <small>${categoria.toUpperCase()}</small><br>
            <span>${desc}</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
            <span class="${classeCor}">R$ ${valor.toFixed(2)}</span>
            <button class="edit-btn" onclick="prepararEdicao(this.parentElement.parentElement)">Editar</button>
        </div>
    `;
}

function identificarEtapas() {
    let somaOrganizar = 0;
    let somaDividas = 0;
    let somaEmergencia = 0;
    let somaInvestimento = 0;

    const itens = document.querySelectorAll('#transaction-list li');

    itens.forEach(item => {
        const valor = parseFloat(item.dataset.amount);
        const categoria = item.dataset.category;

        if (categoria === "Organizar Conta") somaOrganizar += valor;
        else if (categoria === "Quitar Dívidas") somaDividas += valor;
        else if (categoria === "Emergência") somaEmergencia += valor;
        else if (categoria === "Investimento") somaInvestimento += valor;
    });

    document.getElementById('total-organizar').innerText = `R$ ${somaOrganizar.toFixed(2)}`;
    document.getElementById('total-dividas').innerText = `R$ ${somaDividas.toFixed(2)}`;
    document.getElementById('total-emergencia').innerText = `R$ ${somaEmergencia.toFixed(2)}`;
    document.getElementById('total-investimento').innerText = `R$ ${somaInvestimento.toFixed(2)}`;
}

function prepararEdicao(elementoLi) {
    document.getElementById('desc').value = elementoLi.dataset.desc;
    document.getElementById('amount').value = elementoLi.dataset.amount;
    document.getElementById('category').value = elementoLi.dataset.category;

    itemSendoEditado = elementoLi;
    btnSubmit.innerText = "Confirmar Alteração";
    btnSubmit.style.background = "#f39c12";
}