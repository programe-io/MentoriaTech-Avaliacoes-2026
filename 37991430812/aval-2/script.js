document.addEventListener('DOMContentLoaded', () => {
    // Atributos do jogador
    let energia = 100;
    let tatica = 50;
    let foco = 50;
    let etapaAtual = 0;

    // Elementos do DOM
    const valEnergia = document.getElementById('val-energia');
    const valTatica = document.getElementById('val-tatica');
    const valFoco = document.getElementById('val-foco');
    const tituloEtapa = document.getElementById('titulo-etapa');
    const descricaoEtapa = document.getElementById('descricao-etapa');
    const opcoesContainer = document.getElementById('opcoes-container');
    const mensagem = document.getElementById('mensagem-retorno');

    // Fases do Jogo
    const historia = [
        {
            titulo: "Manhã: Preparação Inicial",
            descricao: "O sol nasceu e faltam 10 horas para a grande final. Qual é a sua prioridade ao acordar?",
            opcoes: [
                { texto: "Fazer um café reforçado e treino leve de mobilidade", energia: -5, tatica: 0, foco: +15, msg: "Boa! Corpo preparado e mente focada." },
                { texto: "Dormir mais 1 hora e pular a refeição matinal", energia: +10, tatica: 0, foco: -20, msg: "Você descansou, mas acordou desatento e sem energia nutricional." },
                { texto: "Estudar os vídeos dos lances do adversário", energia: -10, tatica: +25, foco: +5, msg: "Excelente leitura tática! Você já sabe como eles jogam." }
            ]
        },
        {
            titulo: "Tarde: Treino Tático & Pré-Jogo",
            descricao: "No centro de treinamento, o técnico reúne o grupo para ajustar os últimos detalhes.",
            opcoes: [
                { texto: "Prestar atenção máxima na preleção do técnico", energia: 0, tatica: +20, foco: +10, msg: "Você compreendeu o esquema tático perfeitamente." },
                { texto: "Forçar ao máximo no treino físico para impressionar", energia: -30, tatica: +5, foco: 0, msg: "Você impressionou, mas gastou muita energia à toa!" },
                { texto: "Ficar nas redes sociais e responder mensagens de fãs", energia: 0, tatica: -10, foco: -25, msg: "Você se distraiu e perdeu orientações importantes." }
            ]
        },
        {
            titulo: "Noite: O Jogo Começou!",
            descricao: "Estádio lotado! A bola rola e o jogo está no segundo tempo, empatado em 0x0.",
            opcoes: [
                { texto: "Mantenha o posicionamento e espere o momento certo", energia: -10, tatica: +10, foco: +10, msg: "Você leu o jogo com paciência e achou um espaço livre!" },
                { texto: "Corra atrás de todas as bolas sem parar", energia: -40, tatica: -10, foco: 0, msg: "Você cansou rápido demais no final da partida." },
                { texto: "Tente jogadas individuais para resolver sozinho", energia: -20, tatica: -20, foco: -10, msg: "A zaga adversária bloqueou suas jogadas fáceis." }
            ]
        }
    ];

    function atualizarStatus() {
        // Limita os valores entre 0 e 100
        energia = Math.max(0, Math.min(100, energia));
        tatica = Math.max(0, Math.min(100, tatica));
        foco = Math.max(0, Math.min(100, foco));

        valEnergia.textContent = `${energia}%`;
        valTatica.textContent = `${tatica}%`;
        valFoco.textContent = `${foco}%`;
    }

    function carregarEtapa() {
        if (etapaAtual < historia.length) {
            const dados = historia[etapaAtual];
            tituloEtapa.textContent = dados.titulo;
            descricaoEtapa.textContent = dados.descricao;
            opcoesContainer.innerHTML = '';

            dados.opcoes.forEach((opcao, index) => {
                const btn = document.createElement('button');
                btn.className = 'btn-opcao';
                btn.textContent = opcao.texto;
                btn.addEventListener('click', () => processarEscolha(index));
                opcoesContainer.appendChild(btn);
            });
        } else {
            finalizarJogo();
        }
    }

    function processarEscolha(indexOpcao) {
        const escolha = historia[etapaAtual].opcoes[indexOpcao];
        
        // Aplica mudanças
        energia += escolha.energia;
        tatica += escolha.tatica;
        foco += escolha.foco;
        
        atualizarStatus();

        mensagem.textContent = escolha.msg;
        mensagem.style.color = '#1b4332';

        etapaAtual++;
        
        // Aguarda um momento antes de passar para a próxima etapa
        setTimeout(carregarEtapa, 2000);
    }

    function finalizarJogo() {
        tituloEtapa.textContent = "Fim de Jogo!";
        const pontuacaoFinal = energia + tatica + foco;

        let resultado = "";
        if (pontuacaoFinal >= 220) {
            resultado = "🏆 Desempenho Lendário! Você marcou o gol da vitória e foi o craque do jogo!";
            mensagem.style.color = '#2d6a4f';
        } else if (pontuacaoFinal >= 150) {
            resultado = "⚽ Bom Jogo! Você teve uma atuação sólida e ajudou o time a empatar.";
            mensagem.style.color = '#d97706';
        } else {
            resultado = "⚠️️ Substituído! Faltou energia ou foco e você acabou caindo de rendimento.";
            mensagem.style.color = '#dc2626';
        }

        descricaoEtapa.textContent = resultado;
        opcoesContainer.innerHTML = '';

        const btnReiniciar = document.createElement('button');
        btnReiniciar.className = 'btn-opcao';
        btnReiniciar.textContent = 'Jogar Novamente';
        btnReiniciar.addEventListener('click', reiniciarJogo);
        opcoesContainer.appendChild(btnReiniciar);
    }

    function reiniciarJogo() {
        energia = 100;
        tatica = 50;
        foco = 50;
        etapaAtual = 0;
        mensagem.textContent = '';
        atualizarStatus();
        carregarEtapa();
    }

    // Inicializa o jogo
    carregarEtapa();
});