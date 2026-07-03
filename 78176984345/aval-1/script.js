function converter(){

    const valor = Number(document.getElementById("temperatura").value);
    const tipo = document.getElementById("tipo").value;
    const resultado = document.getElementById("resultado");

    if(isNaN(valor)){
        resultado.innerHTML = "Digite um número.";
        return;
    }

    if(tipo==="c"){
        let f = (valor*9/5)+32;
        resultado.innerHTML = `${valor}°C = ${f.toFixed(1)}°F`;
    }else{
        let c = (valor-32)*5/9;
        resultado.innerHTML = `${valor}°F = ${c.toFixed(1)}°C`;
    }