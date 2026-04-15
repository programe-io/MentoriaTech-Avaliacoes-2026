// Alternar entre abas
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// Cálculo de Calorias (Fórmula Simplificada de TMB)
function calculateCalories() {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const age = parseInt(document.getElementById('cal-age').value);
    const resultDiv = document.getElementById('cal-result');

    if (!weight || !age) {
        alert("Preencha todos os campos!");
        return;
    }

    let tmb;
    if (gender === 'm') {
        tmb = (10 * weight) + 625 - (5 * age) + 5;
    } else {
        tmb = (10 * weight) + 625 - (5 * age) - 161;
    }

    // Considerando um nível de atividade leve (x1.3)
    const total = Math.round(tmb * 1.3);

    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <strong>Sua TMB:</strong> ${Math.round(tmb)} kcal/dia<br>
        <strong>Para manutenção (ativa):</strong> ~${total} kcal/dia
    `;
}

// Controle de Digestão
function addDigestionLog() {
    const meal = document.getElementById('meal-name').value;
    const status = document.getElementById('digestion-status').value;
    const list = document.getElementById('digestion-list');

    if (meal === "") {
        alert("Digite o nome da refeição!");
        return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-min', minute: '2-min' });
    const li = document.createElement('li');
    li.innerHTML = `<strong>${time} - ${meal}:</strong> ${status}`;
    
    // Adiciona no topo da lista
    list.insertBefore(li, list.firstChild);

    // Limpa campo
    document.getElementById('meal-name').value = "";
}