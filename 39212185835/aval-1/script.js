function mostrarMensagem(){

alert("🌍 Prepare as malas! Sua próxima aventura começa aqui.");

}

function enviar(){

let nome=document.getElementById("nome").value;

let email=document.getElementById("email").value;

if(nome==="" || email===""){

alert("Preencha todos os campos.");

return;

}

alert("Obrigado, "+nome+"!\nRecebemos seu pedido de orçamento.\nEntraremos em contato pelo e-mail:\n"+email);

document.getElementById("nome").value="";

document.getElementById("email").value="";

}