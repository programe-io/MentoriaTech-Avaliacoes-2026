function controlarIMC(nomePaciente, peso, altura) {
  const imc = peso / (altura * altura);
  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }

  console.log(`Paciente: ${nomePaciente}`);
  console.log(`IMC: ${imc.toFixed(2)}`);
  console.log(`Classificação: ${classificacao}`);
}

// Exemplo de uso
controlarIMC("Ana Silva", 65, 1.68);
