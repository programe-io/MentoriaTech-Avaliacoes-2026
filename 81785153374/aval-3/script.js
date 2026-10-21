
const titulo = document.querySelector("#meu-titulo");

// Estilização direta com style
titulo.style.backgroundColor = "#121222";
titulo.style.padding = "18px";
titulo.style.borderRadius = "12px";
titulo.style.border = "1px solid #9333ea";

// Selecionando o texto de exemplo
const textoExemplo = document.querySelector("#texto-exemplo");

// classList.add()
document.querySelector("#btnAdicionar").addEventListener("click", function() {
  textoExemplo.classList.add("formatação");
});

// classList.remove()
document.querySelector("#btnRemover").addEventListener("click", function() {
  textoExemplo.classList.remove("formatação");
});

// classList.toggle()
document.querySelector("#btnAlternar").addEventListener("click", function() {
  textoExemplo.classList.toggle("formatação");
});

// Selecionando e colorindo todas as situações
function colorirSituacoes() {
  const situacoes = document.getElementsByClassName("situacao");

  for (const situacao of situacoes) {
    const texto = situacao.textContent.trim().toLowerCase();

    situacao.classList.remove("normal", "sobrepeso");

    if (texto === "normal") {
      situacao.classList.add("normal");
    } else if (texto === "sobrepeso") {
      situacao.classList.add("sobrepeso");
    }
  }
}

// Executa ao carregar a página
colorirSituacoes();

// Botão para aplicar as cores novamente
document.querySelector("#btnAtualizar").addEventListener("click", function() {
  colorirSituacoes();
});


