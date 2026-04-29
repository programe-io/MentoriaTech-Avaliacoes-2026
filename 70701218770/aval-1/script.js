document.addEventListener("DOMContentLoaded", function () {
    
    // Dados do aluno
    const aluno = {
        nome: "Tiago",
        curso: "Desenvolvimento de Sistemas",
        escola: "CETI Francisca Trindade",
        descricao: "Olá! Meu nome é Tiago, sou estudante do curso de Desenvolvimento de Sistemas na escola CETI Francisca Trindade. Estou aprendendo programação, criação de sites, banco de dados e outras tecnologias da área de TI. Meu objetivo é me tornar um desenvolvedor e crescer na área de tecnologia."
    };

    // Inserir dados na página (precisa ter esses IDs no HTML)
    document.getElementById("nome").textContent = aluno.nome;
    document.getElementById("curso").textContent = aluno.curso;
    document.getElementById("escola").textContent = aluno.escola;
    document.getElementById("descricao").textContent = aluno.descricao;

    // Mensagem de boas-vindas
    alert("Bem-vindo ao perfil de " + aluno.nome + "!");
});