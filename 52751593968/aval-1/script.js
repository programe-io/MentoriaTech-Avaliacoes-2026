document.getElementByld("calcular").a
ddEventListener("click", function(){
    //Variaveis e tipos de dados
    let n1 =
    Number(document.getElementByld("not
    a1").value);
    let n2 =
    Number(document.getElementByld("not
    a2").value);
    let n3 =
    Number(document.getElementByld("not
    a3").value);


    //Operaderes arimetricos
    let media=(n1 + n2 + n3)/3;


    //Estrutrura condicional IF/ELSE
    let resultado = "";
    if(media>=7){
        resultado="Parabens!"Voce foi 
        aprovado com.Media:"+
        media.toFixed(23);
    }else if(media>=5){
    resultado="Voce esta de
recuperacao.Media:"+
media.toFixed(2);
    }else{
        resultado="Voce foi
        aprovado com media"+
        media.toFixed(2);
    }else{
        resultado="infelismente,voce foi
        reprovado.Media:"+ media.toFixed(2);
    }
    //Estrutura de repeticao FOR
    (exemplo simples)
    for(let i= 1; i<=3; i++){
        console.log("Nota"+"
        registrada.");
    }
    document.getElementByld("resultado").
    textContent=resultado;
});