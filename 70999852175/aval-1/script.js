const dicas = [
  "Substitua sacolas plásticas por sacolas de pano (ecobags).",
  "Reduza o tempo do banho em apenas 2 minutos e economize até 24 litros de água.",
  "Prefira pilhas e baterias recarregáveis.",
  "Desligue os aparelhos da tomada quando não estiver usando (evite o consumo em stand-by).",
  "Priorize a compra de alimentos orgânicos e de produtores locais."
];

const btnDica = document.getElementById('btn-dica');
const caixaDica = document.getElementById('caixa-dica');

btnDica.addEventListener('click', () => {
  const indiceSorteado = Math.floor(Math.random() * dicas.length);
  caixaDica.textContent = dicas[indiceSorteado];
  caixaDica.classList.remove('oculto');
});

const btnCalcular = document.getElementById('btn-calcular');
const inputMinutos = document.getElementById('minutos');
const resultado = document.getElementById('resultado-calculo');

btnCalcular.addEventListener('click', () => {
  const minutos = parseFloat(inputMinutos.value);
  if (isNaN(minutos) || minutos <= 0) {
    resultado.textContent = "Por favor, insira um tempo válido.";
    return;
  }
  
  // Uma torneira aberta gasta cerca de 12 litros por minuto
  const economiaLitrDiarios = minutos * 12;
  const economiaLitrosAnuais = economiaLitrDiarios * 365;

  resultado.textContent = `Ao fechar a torneira, você economiza cerca de ${economiaLitrDiarios} litros de água por dia (${economiaLitrosAnuais.toLocaleString('pt-BR')} litros por ano)!`;
});