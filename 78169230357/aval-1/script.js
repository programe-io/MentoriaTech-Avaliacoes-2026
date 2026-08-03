function adicionarComentario(){
    let comentario = document.getElementById("comentario").value;

    if(comentario.trim() !== ""){
        let lista = document.getElementById("listaComentarios");

        let item = document.createElement("li");
        item.textContent = "💖 " + comentario;

        lista.appendChild(item);

        document.getElementById("comentario").value = "";
    }else{
        alert("Digite um comentário!");
    }
}