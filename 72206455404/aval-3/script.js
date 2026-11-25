function calcularIMC() {
 
    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
 
    if(nome === "" || isNaN(peso) || isNaN(altura)){
        alert("Preencha todos os campos!");
        return;
    \}
 
    let imc = peso / (altura * altura);
    let classificacao = "";
 
    if(imc < 18.5){
        classificacao = "Abaixo do peso";
    \}
    else if(imc < 25){
        classificacao = "Peso normal";
    \}
    else if(imc < 30){
        classificacao = "Sobrepeso";
    \}
    else if(imc < 35){
        classificacao = "Obesidade Grau I";
    \}
    else if(imc < 40){
        classificacao = "Obesidade Grau II";
    \}
    else{
        classificacao = "Obesidade Grau III";
    \}
 
    document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>
        <p>Nome: \${nome\}</p>
        <p>IMC: \${imc.toFixed(2)\}</p>
        <p>Classificação: \${classificacao\}</p>
    `;$0