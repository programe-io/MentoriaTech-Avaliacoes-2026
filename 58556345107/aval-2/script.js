document.addEventListener('DOMContentLoaded', () => {
    
    const formArtigo = document.getElementById('formArtigo');
    const resultadoArtigo = document.getElementById('resultadoArtigo');

    formArtigo.addEventListener('submit', function(evento) {
        evento.preventDefault(); 

        const nomeUsuario = document.getElementById('nome').value;
        const estadoFio = document.getElementById('estadoFio').value;
        const temQuimica = document.querySelector('input[name="quimica"]:checked').value;

        let prescricaoTexto = "";
        let cronogramaFase = "";

        switch(estadoFio) {
            case "opaco":
                prescricaoTexto = "Déficit hídrico identificado. Suas cutículas estão levemente abertas, necessitando de retenção de água.";
                cronogramaFase = "Foco em Hidratações à base de Pantenol e Aloe Vera.";
                break;
            case "poroso":
                prescricaoTexto = "Déficit lipídico identificado. O córtex está desprotegido devido à ausência de óleos essenciais.";
                cronogramaFase = "Foco em Nutrições com base em Óleo de Argan ou Manteiga de Karité.";
                break;
            case "quebradico":
                prescricaoTexto = "Déficit estrutural crítico. Ruptura de pontes de aminoácidos estruturais.";
                cronogramaFase = "Urgência em Reconstrução Aminoácida (Queratina líquida ou em creme).";
                break;
        }

        let complementoQuimico = "";
        if (temQuimica === "sim") {
            complementoQuimico = "<br><strong>Nota do Estudo:</strong> Fios modificados quimicamente exigem proteção térmica diária e queratina a cada 15 dias.";
        }

        // Exibe o painel e insere as respostas dinâmicas
        resultadoArtigo.className = "resultado-box";
        resultadoArtigo.innerHTML = `
            <h4>🔬 Laudo Técnico de ${nomeUsuario}:</h4>
            <p style='margin: 5px 0;'><strong>Análise de Córtex:</strong> ${prescricaoTexto}</p>
            <p style='margin: 5px 0;'><strong>Recomendação Científica:</strong> ${cronogramaFase}</p>
            ${complementoQuimico}
        `;

        formArtigo.reset(); 
    });
});