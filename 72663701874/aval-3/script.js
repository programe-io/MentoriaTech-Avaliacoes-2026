const form = document.getElementById("imcForm");
const btnLimpar = document.getElementById("btnLimpar");
const resultadoBox = document.getElementById("resultadoBox");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);

  if (!peso || !altura || peso <= 0 || altura <= 0) return;

  // Se o usuário digitar em centímetros (ex: 175), converte para metros (1.75)
  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);
  const classificacao = obterClassificacao(imc);

  // Calcula faixa de peso saudável (IMC entre 18.5 e 24.9)
  const pesoMin = (18.5 * altura * altura).toFixed(1).replace(".", ",");
  const pesoMax = (24.9 * altura * altura).toFixed(1).replace(".", ",");

  // Atualiza elementos na tela
  document.getElementById("imcValor").textContent = imc.toFixed(1).replace(".", ",");

  const badge = document.getElementById("imcBadge");
  badge.textContent = classificacao.label;
  badge.style.backgroundColor = classificacao.bg;
  badge.style.color = classificacao.color;

  document.getElementById("pesoIdealTexto").innerHTML =
    `Faixa de peso saudável para sua altura: <strong>${pesoMin} kg a ${pesoMax} kg</strong>`;

  // Posiciona o marcador na barra (escala visual de 15 a 42)
  const percentual = Math.min(Math.max(((imc - 15) / (42 - 15)) * 100, 2), 98);
  document.getElementById("gaugeMarker").style.left = `${percentual}%`;

  // Destaca a linha correspondente na tabela
  document.querySelectorAll("#tabelaReferencia tr").forEach((tr) => {
    tr.classList.toggle("active-row", tr.dataset.faixa === classificacao.faixa);
  });

  resultadoBox.classList.remove("hidden");
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  resultadoBox.classList.add("hidden");
  document.querySelectorAll("#tabelaReferencia tr").forEach((tr) => {
    tr.classList.remove("active-row");
  });
});

function obterClassificacao(imc) {
  if (imc < 18.5) {
    return { faixa: "abaixo", label: "Abaixo do peso", bg: "#e0f2fe", color: "#0369a1" };
  }
  if (imc < 25) {
    return { faixa: "normal", label: "Peso normal", bg: "#dcfce7", color: "#15803d" };
  }
  if (imc < 30) {
    return { faixa: "sobrepeso", label: "Sobrepeso", bg: "#fef9c3", color: "#a16207" };
  }
  if (imc < 35) {
    return { faixa: "obesidade1", label: "Obesidade Grau I", bg: "#ffedd5", color: "#c2410c" };
  }
  if (imc < 40) {
    return { faixa: "obesidade2", label: "Obesidade Grau II", bg: "#fee2e2", color: "#b91c1c" };
  }
  return { faixa: "obesidade3", label: "Obesidade Grau III", bg: "#fecaca", color: "#991b1b" };
}