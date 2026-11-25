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
        classificacao = "Sobrepeso";$0