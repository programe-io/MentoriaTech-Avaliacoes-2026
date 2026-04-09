<script>
const form = document.getElementById("formAluno");
const total = document.getElementById("total");

/* pega os alunos salvos */
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

/* atualiza contador */
function atualizarTotal() {
    total.textContent = alunos.length;
}

/* já mostra ao abrir */
atualizarTotal();

/* cadastrar aluno */
form.addEventListener("submit", function(e) {
    e.preventDefault(); // impede recarregar

    const nomeInput = document.getElementById("nome");
    const idadeInput = document.getElementById("idade");

    const nome = nomeInput.value.trim();
    const idade = idadeInput.value.trim();

    /* validação */
    if (nome === "" || idade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const aluno = {
        nome: nome,
        idade: idade
    };

    alunos.push(aluno);

    /* salva no navegador */
    localStorage.setItem("alunos", JSON.stringify(alunos));

    atualizarTotal();

    alert("Aluno cadastrado com sucesso!");

    form.reset();
});
</script>