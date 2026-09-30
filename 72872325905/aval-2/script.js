document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("converter-form");
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const btnSwap = document.getElementById("btn-swap");
    const inputSymbol = document.getElementById("input-symbol");
    
    const resultContainer = document.getElementById("result-container");
    const resultBase = document.getElementById("result-base");
    const resultTarget = document.getElementById("result-target");
    const resultTime = document.getElementById("result-time");

    // Dicionário simples para atualizar o símbolo monetário ao trocar a moeda de origem
    const currencySymbols = {
        BRL: "R\$",
        USD: "\$",
        EUR: "€",
        GBP: "£",
        BTC: "₿"
    };

    // 1. Atualiza o símbolo ao mudar a moeda de origem
    fromCurrency.addEventListener("change", () => {
        inputSymbol.textContent = currencySymbols[fromCurrency.value] || "\$";
    });

    // 2. Inverter as moedas selecionadas (Swap)
    btnSwap.addEventListener("click", () => {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;

        // Dispara o evento de mudança para atualizar os símbolos visuais
        fromCurrency.dispatchEvent(new Event("change"));
    });

    // 3. Processamento e Requisição à API ao submeter o formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        // Tratamento caso o usuário selecione a mesma moeda de origem e destino
        if (from === to) {
            resultBase.textContent = `${amount.toFixed(2)} ${from} =`;
            resultTarget.textContent = `${amount.toFixed(2)} ${to}`;
            resultTime.textContent = `Conversão direta de mesma moeda`;
            resultContainer.classList.remove("hide");
            return;
        }

        try {
            // URL da AwesomeAPI com o par de moedas requisitado
            const url = `https://awesomeapi.com.br{from}-${to}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao buscar cotação.");
            
            const data = await response.json();
            
            // O objeto retornado segue o padrão: exemplo 'BRLUSD'
            const pairKey = `${from}${to}`;
            const quotation = data[pairKey];

            if (!quotation) throw new Error("Moeda não suportada ou par inválido.");

            // Calcula a conversão multiplicando o valor pelo preço de compra (bid)
            const exchangeRate = parseFloat(quotation.bid);
            const conversionResult = amount * exchangeRate;

            // Formatação de data e hora locais da cotação
            const dateUpdate = new Date(quotation.create_date);
            const formattedDate = dateUpdate.toLocaleString("pt-BR");

            // Exibição dos resultados formatados na tela
            resultBase.textContent = `${amount.toLocaleString('pt-BR', { style: 'currency', currency: from })} =`;
            resultTarget.textContent = conversionResult.toLocaleString('pt-BR', { style: 'currency', currency: to });
            resultTime.textContent = `Cotação comercial atualizada em: ${formattedDate}`;

            // Remove a classe de ocultação para mostrar o resultado com efeito de transição
            resultContainer.classList.remove("hide");

        } catch (error) {
            alert("Não foi possível realizar a conversão no momento. Tente novamente mais tarde.");
            console.error("Erro na API:", error);
        }
    });
});
