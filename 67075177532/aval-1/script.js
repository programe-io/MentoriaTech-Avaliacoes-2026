document.getElementByld("calcular").addEventListener("cick", function(){
//variaveis e tipos de dados 
lentn1 =
Number(document.getElementByld("not a1").value);
lentn2 =
Number(document.getElementByld("not a2").value);
lentn3 =
Number(document.getElementByld("not a3").value);

//Operadores aritmeticos
let media (n1 + n2 + n3) / 3;

//Estrutura condicional IF/ELSE
let resultado = "";
if (media >=7) {
 resultado= "Parabens! voce foi aprovado com media" +
 media.toFixed(2);
} else if (media >=5){
  resultado= "voce esta de recuperaçao. media:"+ 
  media.toFixed(2);
} else {
  resultado = "infelizmente, voçe foi reprovado. media:"+ media.toFixed(2);
} 

// Estrutura de repetiçao FOR 
(exenplo simples)
for (let i=1;i <=3; i++){
    console.log("Nota" + i +"
    registrada.");
}
document.geElementByld("resultado").
textContent=resultado;
});