const btnInicio = document.getElementById("btnInicio");
const btnSobre = document.getElementById("btnSobre");
const btnContato = document.getElementById("btnContato");

const conteudo = document.getElementById("conteudo");

btnInicio.addEventListener("click", function() {
    conteudo.innerHTML = `
        <h2>Início</h2>
        <p>Bem-vindo ao meu site!</p>
    `;
});

btnSobre.addEventListener("click", function() {
    conteudo.innerHTML = `
        <h2>Sobre</h2>
        <p>Este site foi criado utilizando HTML, CSS e JavaScript.</p>
    `;
});

btnContato.addEventListener("click", function() {
    conteudo.innerHTML = `
        <h2>Contato</h2>
        <p>Email: contato@exemplo.com</p>
        <p>Telefone: (00) 00000-0000</p>
    `;
});
