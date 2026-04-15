const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    const url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`;

    if (amount === "" || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        let rate;
        let symbol;

        // A API retorna os dados no formato MoedaBRL (ex: USDBRL)
        if (currency === 'USD') {
            rate = data.USDBRL.bid;
            symbol = '$';
        } else if (currency === 'EUR') {
            rate = data.EURBRL.bid;
            symbol = '€';
        } else if (currency === 'BTC') {
            rate = data.BTCBRL.bid;
            symbol = '₿';
        }

        const convertedValue = (amount / rate).toFixed(2);
        
        resultText.innerHTML = `O valor convertido é: <strong>${symbol} ${convertedValue}</strong>`;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        resultText.innerText = "Erro ao conectar com o servidor.";
    }
}

convertBtn.addEventListener('click', convertCurrency);