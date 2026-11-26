if (altura <= 0 || peso <=0) return;

let imc = peso / (altura * altura);
let classificacao = "peso normal";

if (imc < 18.5) classificacao = abaixo do peso;
else if (imc >= 25 && imc <30) classificacao = "sobrepeso";
else if (imc >= 30) classificacao = "obesidade";

tabela.innerHTML +=`
    </tr>
         <td>${nome}</td>
         <td>${idade}</td>
         <td>${imc.toFixed(2)}</td>
         <td>${classificacao}</td>
    </tr>
`;

   form.reset();
});