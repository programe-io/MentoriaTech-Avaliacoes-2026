// ========================================
// DADOS INICIAIS
// ========================================

const pessoas = [
  {
    nome: "João 1",
    peso: 72.0,
    altura: 1.65
  },
  {
    nome: "João 2",
    peso: 65.0,
    altura: 1.68
  }
];


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const tabelaCorpo = document.getElementById("tabelaCorpo");
const formulario = document.getElementById("imcForm");


// ========================================
// CÁLCULO DO IMC
// ========================================

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}


// ========================================
// IDENTIFICAR A SITUAÇÃO
// ========================================

function identificarSituacao(imc) {

  if (imc < 18.5) {
    return {
      nome: "Abaixo do peso",
      classe: "badge-abaixo"
    };

  } else if (imc < 25) {
    return {
      nome: "Normal",
      classe: "badge-normal"
    };

  } else if (imc < 30) {
    return {
      nome: "Sobrepeso",
      classe: "badge-sobrepeso"
    };

  } else {
    return {
      nome: "Obesidade",
      classe: "badge-obesidade"
    };
  }
}


// ========================================
// MOSTRAR OS DADOS NA TABELA
// ========================================

function mostrarPessoas() {

  tabelaCorpo.innerHTML = "";

  pessoas.forEach((pessoa, indice) => {

    const imc = calcularIMC(
      pessoa.peso,
      pessoa.altura
    );

    const resultado = identificarSituacao(imc);

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${pessoa.nome}</td>

      <td>${pessoa.peso.toFixed(1)} kg</td>

      <td>${pessoa.altura.toFixed(2)} m</td>

      <td>${imc.toFixed(1)}</td>

      <td>
        <span class="badge ${resultado.classe}">
          ${resultado.nome}
        </span>
      </td>

      <td>
        <button
          class="btn-delete"
          onclick="removerPessoa(${indice})">
          Excluir
        </button>
      </td>
    `;

    tabelaCorpo.appendChild(linha);
  });
}


// ========================================
// ADICIONAR UMA NOVA PESSOA
// ========================================

formulario.addEventListener("submit", function(evento) {

  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();

  const peso = Number(
    document.getElementById("peso").value
  );

  const altura = Number(
    document.getElementById("altura").value
  );


  // Verificação dos dados
  if (
    nome === "" ||
    !Number.isFinite(peso) ||
    peso <= 0 ||
    !Number.isFinite(altura) ||
    altura <= 0
  ) {

    alert("Preencha todos os campos corretamente.");

    return;
  }


  // Adiciona a nova pessoa
  pessoas.push({
    nome: nome,
    peso: peso,
    altura: altura
  });


  // Atualiza a tabela
  mostrarPessoas();


  // Limpa o formulário
  formulario.reset();

});


// ========================================
// EXCLUIR UMA PESSOA
// ========================================

function removerPessoa(indice) {

  pessoas.splice(indice, 1);

  mostrarPessoas();
}


// ========================================
// EXIBIÇÃO INICIAL
// ========================================

mostrarPessoas();
