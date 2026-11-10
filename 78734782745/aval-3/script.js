document.addEventListener("DOMContentLoaded", function () {
    // Captura o formulário quando a página carrega
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function (evento) {
        // Impede a página de recarregar ao clicar no botão Enviar
        evento.preventDefault();

        // 1. Captura os dados de identificação do aluno
        const nomeAluno = document.getElementById("nome").value;
        const turmaAluno = document.getElementById("turma").value;

        // 2. Variáveis para controle da pontuação
        let notaFinal = 0;
        const totalQuestoesObjetivas = 2; // Q1 e Q2 (A Q3 é discursiva)

        // ==========================================================================
        // CORREÇÃO DA QUESTÃO 1 (Múltipla Escolha - Gabarito: C)
        // ==========================================================================
        const respostaQ1 = document.querySelector('input[name="q1"]:checked');
        let statusQ1 = "";

        if (respostaQ1 && respostaQ1.value === "c") {
            notaFinal += 1;
            statusQ1 = "✅ Correta (Brasília)";
        \} else {
            statusQ1 = "❌ Incorreta (A resposta certa era Brasília)";
        \}

        // ==========================================================================
        // CORREÇÃO DA QUESTÃO 2 (Checkbox - Gabarito: Argentina e Colômbia selecionados)
        // ==========================================================================
        const checkArgentina = document.querySelector('input[value="argentina"]').checked;
        const checkFranca = document.querySelector('input[value="franca"]').checked;
        const checkColombia = document.querySelector('input[value="colombia"]').checked;
        const checkJapao = document.querySelector('input[value="japao"]').checked;

        let statusQ2 = "";

        // O aluno ganha o ponto se marcar as duas certas E nenhuma errada
        if (checkArgentina && checkColombia && !checkFranca && !checkJapao) {
            notaFinal += 1;
            statusQ2 = "✅ Correta (Argentina e Colômbia)";
        \} else {
            statusQ2 = "❌ Incorreta (As respostas certas eram Argentina e Colômbia)";
        \}

        // ==========================================================================
        // CAPTURA DA QUESTÃO 3 (Discursiva - Precisa de correção do professor)
        // ==========================================================================
        const respostaQ3 = document.querySelector('textarea[name="q3"]').value;

        // ==========================================================================
        // EXIBIÇÃO DO RESULTADO NA TELA
        // ==========================================================================
        
        // Remove um feedback antigo se ele já existir na tela
        const resultadoAntigo = document.getElementById("resultado-prova");
        if (resultadoAntigo) {
            resultadoAntigo.remove();
        \}

        // Cria uma nova caixa (div) para mostrar as notas
        const caixaResultado = document.createElement("div");
        caixaResultado.id = "resultado-prova";
        
        // Estiliza a caixa do resultado diretamente pelo JS
        caixaResultado.style.backgroundColor = "#e8f4fd";
        caixaResultado.style.border = "2px solid #3498db";
        caixaResultado.style.padding = "25px";
        caixaResultado.style.borderRadius = "8px";
        caixaResultado.style.marginTop = "30px";
        caixaResultado.style.color = "#2c3e50";

        // Monta o texto que o aluno/professor vai ver
        caixaResultado.innerHTML = `
            <h3 style="color: #2980b9; margin-bottom: 15px; text-transform: uppercase;">Resumo do Envio</h3>
            <p><strong>Estudante:</strong> \${nomeAluno\}</p>
            <p><strong>Turma:</strong> \${turmaAluno\}</p>
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #bdc3c7;">
            
            <h4 style="margin-bottom: 10px;">Desempenho nas Questões Objetivas:</h4>
            <p><strong>Questão 1:</strong> \${statusQ1\}</p>
            <p><strong>Questão 2:</strong> \${statusQ2\}</p>
            <p style="font-size: 1.2rem; margin-top: 15px;"><strong>Nota das Objetivas:</strong> <span style="color: #27ae60; font-weight: bold;">\${notaFinal\} de \${totalQuestoesObjetivas\} pontos</span></p>
            
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid #bdc3c7;">
            <h4 style="margin-bottom: 5px;">Resposta Enviada na Questão 3 (Discursiva):</h4>
            <p style="font-style: italic; background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #e9ecef;">"\${respostaQ3\}"</p>
            <p style="font-size: 0.9rem; color: #7f8c8d; margin-top: 5px;">⚠️ Esta questão precisa ser corrigida manualmente pelo professor.</p>
        `;

        // Insere a caixa de resultado no final do formulário, logo acima do botão
        formulario.appendChild(caixaResultado);

        // Rola a tela suavemente até o resultado
        caixaResultado.scrollIntoView({ behavior: 'smooth' \});
    \});
\})$0