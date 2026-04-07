const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("finance:data")) || [];
    },
    set(transactions) {
        localStorage.setItem("finance:data", JSON.stringify(transactions));
    }
};

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        const index = document.querySelector('#editIndex').value;
        
        if (index === "") {
            // Adiciona novo
            Transaction.all.push(transaction);
        } else {
            // Edita existente
            Transaction.all[index] = transaction;
        }
        
        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },

    edit(index) {
        const t = Transaction.all[index];
        document.querySelector('#description').value = t.description;
        document.querySelector('#amount').value = t.amount;
        document.querySelector('#category').value = t.category || "Geral";
        document.querySelector('#editIndex').value = index;
        
        document.querySelector('#btn-save').innerText = "Salvar Alteração";
        document.querySelector('#btn-cancel').style.display = "inline-block";
    }
};

const DOM = {
    container: document.querySelector('#tableBody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        const amount = Number(transaction.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        tr.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.category || "Geral"}</td>
            <td class="${CSSclass}">${amount}</td>
            <td>
                <button class="btn-edit" onclick="Transaction.edit(${index})">Editar</button>
                <button class="btn-remove" onclick="Transaction.remove(${index})">X</button>
            </td>
        `;
        DOM.container.appendChild(tr);
    },

    updateBalance() {
        let income = 0, expense = 0;
        Transaction.all.forEach(t => {
            if (t.amount > 0) income += Number(t.amount);
            else expense += Number(t.amount);
        });

        document.getElementById('incomeDisplay').innerHTML = income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('expenseDisplay').innerHTML = Math.abs(expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('totalDisplay').innerHTML = (income + expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
};

const Form = {
    clear() {
        document.querySelector('#form').reset();
        document.querySelector('#editIndex').value = "";
        document.querySelector('#btn-save').innerText = "Adicionar";
        document.querySelector('#btn-cancel').style.display = "none";
    },

    submit(event) {
        event.preventDefault();
        const description = document.querySelector('#description').value;
        const amount = document.querySelector('#amount').value;
        const category = document.querySelector('#category').value;

        Transaction.add({ description, amount, category });
        Form.clear();
    }
};

const App = {
    init() {
        DOM.container.innerHTML = "";
        Transaction.all.forEach((t, i) => DOM.addTransaction(t, i));
        DOM.updateBalance();
        Storage.set(Transaction.all);
    },
    reload() { App.init(); }
};

document.querySelector('#form').addEventListener('submit', Form.submit);
App.init();