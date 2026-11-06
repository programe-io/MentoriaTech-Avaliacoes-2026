let tarefas =[];
let geradorCodigo = 0;
function validarDadosTarefa(titulo, priodade{
    if(titulo.length <5){
        throw new Error('O titulo deve ter no minimo 5 caracteres');
}
if(priodade < 1|| priodade >3){
    throw new Error('informe uma prioridade entre 1 e 3');
}
}
function buscarTarefa(codigoTarefa){
    const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
    if (!tarefaBuscada){
        throw new Error('Codigo de tarefa não encontrado');
    }
    return tarefaBuscada;
}
function cadastrarTarefa(titulo, prioridade){
    validarDadosTarefa(titulo, prioridade);
    let tarefa = {
        'codigo':++geradorCodigo,
        'titulo': titulo,
        'prioridade': prioridade,
        'status': true
    }
    tarefas.push(tarefa);
}
function listarTarefas(){
    return tarefas;
}
}
function atualizarQuantidade(codigoProduto, novaQuantidade){
    if(novaQuantidade <1){
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produto.find(prod => prod.codigo === codigoProduto);
    if(produto){
        produto.quantidade += novaQuantidade;
    }
    else{
        throw new Error("Produto não encontrado");
    }
}
//-----------------
listarProdutos();
cadastrarProduto("cadeira Gamer", 12, 699,00);
cadastrarProduto("Mouse logi",38,99.00);
listarProdutos();
atualizarValor(2,97.00);

atualizarQuantidade(1,3);
listarProdutos();