document.getelementbyd("btadd").onclick=add;
document.getelementbyd("btatualizar").onclick=atualizar;
document.getelementbyd("btexcluir").onclick=excluir;
const descricao=document.getelementbyid("nomep")
const qtd=document.getelementbyid("qtdp")
const valor=document.getelementbyid("precop")
let produtos=[];
function add{
    validarprodutos(descricao.value,qtd.value,valor.value);
    let novoproduto={
        "codigo":produtos.length+1,
        "descricao":descricao.value,
        "quantidade":qtd.value,
        "valor":valor.value
    }
    produtos.push(novoproduto);
    limparcampos();
    exibirprodutos();

}
function limparcampos(){
    descricao.value="";
    qtd.value="";
    descricao.focus="";
}
function exibirprodutos(){
    const listaul=document.getelementbyid("listaprodutos");
    listaul.innerhtml=produtos.map(item=>`
    <li>
        <strong>codigo:</strong>${item.codigo}|
        <strong>produto:</strong>${item.descricao}|
        <strong>qtd:</strong>${item.quantidade}|
        <strong>valor:</strong>${item.valor}|
        </li>
       ` ).join('');
}
function atualizar(){
    alert("agora a funcao foi implementada!");
}
function excluir(){
    alert("agora a funcao foi implementada!");
}
function validarprodutos(descricao,qtd,valor){
    if(descricao.length<5){
    alert("a descricao deve ter +4 caratere");
 thronw new error("a descricao deve ter +4 caratere");
}
if(qtd<1){
    alert("quantidade deve ser maior que zero");
    thronw new error("quantidade deve ser maior que zero");
}
if(valor<=0){
    alert("valor deve ser maior que zero");
    throw new error ("quantidade deve ser maior que zero");
}
}