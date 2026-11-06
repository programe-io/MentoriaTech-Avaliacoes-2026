function cadastrar() {

    let nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite seu nome!");
    } else {
        document.getElementById("resultado").innerHTML =
            "Aluno cadastrado: " + nome;
    }

}
Explicação do JavaScript:

function cadastrar(): cria uma função chamada cadastrar.

let nome: cria uma variável.

document.getElementById(): procura um elemento pelo ID.

.value: captura o que foi digitado.

if: verifica uma condição.

else: executa outra ação se a condição não for verdadeira.

alert(): mostra uma mensagem de alerta.

innerHTML: altera o conteúdo de um elemento.