let total=0;
function adicionar(nome,preco){
total=total+preco;
document.getElementById("total").textContent=total;
let li=document.createElement("li");
li.textContent=nome+" - R$ "+preco+",00";
document.getElementById("lista").appendChild(li);
}
document.getElementById("btnFinalizar").addEventListener("click",function(){
let nome=document.getElementById("nomeCliente").value;
let msg=document.getElementById("msgPedido");
if(total===0){msg.textContent="Adicione um item!";msg.style.color="red";}
else if(nome===""){msg.textContent="Digite seu nome!";msg.style.color="red";}
else{msg.textContent="Obrigado, "+nome+"! Pedido de R$ "+total+",00 confirmado!";msg.style.color="green";}
});