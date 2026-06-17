// Função que realiza a conversão
function converterCelsiusParaFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}

// Testando a função com alguns valores
const temperaturaRio = 32;
const temperaturaNovaYork = 0;

const rioEmFahrenheit = converterCelsiusParaFahrenheit(temperaturaRio);
const nyEmFahrenheit = converterCelsiusParaFahrenheit(temperaturaNovaYork);

// Exibindo os resultados no console
console.log(`${temperaturaRio}°C equivalem a ${rioEmFahrenheit}°F.`);
console.log(`${temperaturaNovaYork}°C equivalem a ${nyEmFahrenheit}°F.`);