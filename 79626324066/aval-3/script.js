
const formulario = document.querySelector("form");
const usuario = document.querySelector(
    'input[type="text"]'
);
const senha = document.querySelector(
    'input[type="password"]'
);

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nomeUsuario = usuario.value.trim();
    const senhaUsuario = senha.value;

    if (nomeUsuario === "" || senhaUsuario === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (senhaUsuario.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    alert("Demonstração concluída! Login não realizado.");

    formulario.reset();
});
