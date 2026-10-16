let produtos = []; 
function cadastrarProduto() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if descricao.trim().lenght < 5 || quantidade < 0 || 
    !Number.isInteger(quantidade) || valor <= 0) {
    alert("Dados inválidos!");
    return;
 }
 produtos.push({
    codigo: produtos.length + 1, 
    descricao,
    quantidade,
    valor
 });
 alert("Produto cadastrado!");
}
function listarProduto() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "Estoque vazio!";
        return
    }
    produtos.forEach(p => {
        lista.innerHTML +=
        <p>Código: ${p.codigo} |
        Quantidade: ${p.quantidade} |
        Valor: R$ ${p.valor}</p>`
    });
}