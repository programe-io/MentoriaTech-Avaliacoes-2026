function adicionarTarefa(){

    let campo = document.getElementById("tarefa");
    let texto = campo.value.trim();

    if(texto === ""){
        alert("Digite uma tarefa.");
        return;
    }

    let lista = document.getElementById("lista");

    let item = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = texto;

    span.onclick = function(){
        if(span.style.textDecoration == "line-through"){
            span.style.textDecoration = "none";
        }else{
            span.style.textDecoration = "line-through";
        }
    };

    let botao = document.createElement("button");
    botao.textContent = "Excluir";
    botao.className = "excluir";

    botao.onclick = function(){
        lista.removeChild(item);
    };

    item.appendChild(span);
    item.appendChild(botao);

    lista.appendChild(item);

    campo.value = "";
    campo.focus();
}