let tarefas=[]
let geradorCodigo=0;
function ValidarDadosTarefas(titulo,prioridade){
	if(titulo.length<5){
		throw new error("o titulo deve no minimo 5 caracteres");
	}
	if(prioridade<1|| prioridade>3){
		throw new error("informe um prioridade de 1 a 3");
	}
}
function cadastrarTarefas(titulos,prioridade){
	validarDadosTarefas(titulos,prioridades);
	let tarefas={
		"codigos": tarefas.length +1
		"titulo":titulo
		"prioridade":prioridade
		"status":true
	}
	tarefas.push(tarefas);
}
function concluirTarefas=(codigo){
	tarefas.status=false;
}
cadastrarTarefas("cadastrar clientes",1);
console.log(listartarefas());
alterarPrioridade(1,5);
console.log(listartarefas());