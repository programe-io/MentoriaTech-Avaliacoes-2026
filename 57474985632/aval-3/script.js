// Base de dados de afirmações positivas e acolhimento
const afirmacoesMentais = [
    "🌱 'Você não precisa controlar todos os seus pensamentos. Você só precisa parar de deixar que eles controlem você.' – Cuide do seu agora.",
    "✨ Lembrete: Sentir cansaço é humano. Respeite o ritmo do seu corpo e não se cobre por produzir o tempo todo.",
    "🌊 Suas emoções são como ondas: elas vêm, atingem o topo, mas sempre recuam. Aguente firme, a calmaria volta.",
    "🎯 Você já superou 100% dos seus dias difíceis até aqui. Você é muito mais forte e resiliente do que a sua ansiedade te diz.",
    "💤 Se a única coisa que você conseguiu fazer hoje foi respirar e seguir em frente, saiba que isso já foi o suficiente."
];

// Mapeamento de elementos do DOM
const botaoGerar = document.getElementById('btn-gerar');
const caixaResultado = document.getElementById('resultado-mensagem');
const formularioMental = document.getElementById('mental-form');

// Evento: Gerador de Mensagens Inspiracionais
botaoGerar.addEventListener('click', function() {
    // Sorteia um índice matemático com base no tamanho do vetor
    const indiceSorteado = Math.floor(Math.random() * afirmacoesMentais.length);
    
    // Altera o texto de exibição na tela
    caixaResultado.textContent = afirmacoesMentais[indiceSorteado];
});

// Evento: Processamento do Formulário de Humor
formularioMental.addEventListener('submit', function(evento) {
    // Impede o comportamento padrão de recarregar a página
    evento.preventDefault();

    // Resgatando valores inseridos pelo usuário
    const nome = document.getElementById('nome-usuario').value;
    const energia = document.getElementById('nivel-energia').value;
    const fezPausa = document.querySelector('input[name="fez-pausa"]:checked').value;

    let orientacaoPersonalizada = "";

    // Lógica condicional de acolhimento baseado nas respostas do formulário
    if (energia === "baixa") {
        orientacaoPersonalizada = "notamos que suas energias estão baixas. Por favor, desconecte-se um pouco após fechar essa aba e descanse.";
    } else if (fezPausa === "nao") {
        orientacaoPersonalizada = "sua energia está estável, mas você ainda não parou hoje. Tire 5 minutos para esticar os braços e beber água.";
    } else {
        orientacaoPersonalizada = "fico muito feliz que esteja conseguindo equilibrar seu dia e respeitar seus limites!";
    }

    // Exibe um alerta de feedback humano e empático
    alert(`Obrigado pelo check-in, ${nome}! Guardamos suas percepções de hoje. Lembre-se: ${orientacaoPersonalizada}`);
    
    // Reseta os campos do formulário
    formularioMental.reset();
});