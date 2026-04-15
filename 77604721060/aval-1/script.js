const convertBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const resultArea = document.getElementById('resultArea');
const resultText = document.getElementById('resultText');
const updateTime = document.getElementById('updateTime');

convertBtn.addEventListener('click', () => {
    const amount = amountInput.value;
    const currency = fromCurrency.value;

    if (amount === "" || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // URL da API para buscar a cotação em relação ao Real (BRL)
    const url = `https://economia.awesomeapi.com.br/last/${currency}-BRL`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const key = `${currency}BRL`; // A API retorna um objeto como "USDBRL"
            const rate = data[key].bid;
            const total = amount * rate;
            const date = new Date(data[key].create_date);

            // Formatação de moeda em Português-Brasil
            const formattedTotal = total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            resultText.innerText = `${amount} ${currency} = ${formattedTotal}`;
            updateTime.innerText = `Cotação atualizada em: ${date.toLocaleString('pt-BR')}`;
            
            resultArea.classList.remove('hidden');
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao conectar com o serviço de cotação.");
        });
});