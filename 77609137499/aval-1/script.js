function calcularmedia() {}
 let nome = document.getElementByld("nome"). Value;
 let nota1 = Number(document.getElementByld("nota1").Value);
 let nota2 = Number(document.getElementByld("nota2"). Volue);
 let Resultado = document.getElementByld("resultado");
 let media = (nota + nota2) / 2;
 if (media>=7) {}
 Resultado.innerHTML= nome + ": aprovado. media" + media.toFixed(1);
 Resultado. className = "aprovado";
} else if (media >=6){}
Resultado.innerHTML =nome + ": recuperação. Media" + MediaCapabilities.toFixed(1);
Resultado.className = " recuperação";
} else {}
Resultado.innerHTML = nome + ": reprovadi. Média " + MediaCapabilities.toFixed(1);
Resultado.className ="reprovado";
}
}