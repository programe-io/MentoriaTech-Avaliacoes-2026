const fatos = [
        "Messi marcou 91 gols em um único ano civil (2012), um recorde mundial.",
            "Seu primeiro contrato com o Barcelona foi assinado em um guardanapo de papel.",
                "Aos 13 anos, ele se mudou para a Espanha para tratar uma deficiência do hormônio do crescimento.",
                    "É o maior artilheiro da história da Seleção Argentina e da Liga Espanhola (La Liga)."
                    ];

                    const btnFato = document.getElementById('btn-fato');
                    const fatoTexto = document.getElementById('fato-texto');

                    btnFato.addEventListener('click', () => {
                        const indiceAleatorio = Math.floor(Math.random() * fatos.length);
                            fatoTexto.textContent = fatos[indiceAleatorio];
                            });
]