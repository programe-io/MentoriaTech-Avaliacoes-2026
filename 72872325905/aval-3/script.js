document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Rolagens de Tela Suaves (Scroll)
    const btnExplore = document.getElementById("btn-explore");
    const btnSimScroll = document.getElementById("btn-sim-scroll");
    
    const ecosystemsSection = document.getElementById("ecosystems-section");
    const simulatorSection = document.getElementById("simulator-section");

    btnExplore.addEventListener("click", () => {
        ecosystemsSection.scrollIntoView({ behavior: "smooth" });
    });

    btnSimScroll.addEventListener("click", () => {
        simulatorSection.scrollIntoView({ behavior: "smooth" });
    });

    // 2. Filtro dos Cards de Ecossistemas
    const navLinks = document.querySelectorAll(".nav-link");
    const ecoCards = document.querySelectorAll(".eco-card");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const target = link.getAttribute("data-target");

            ecoCards.forEach(card => {
                const ecoType = card.getAttribute("data-eco");

                if (target === "all" || target === ecoType) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });

            ecosystemsSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // 3. Lógica do Simulador de Decomposição de Resíduos
    const wasteSelect = document.getElementById("waste-item");
    const simResultPanel = document.getElementById("sim-result");
    const timeValueDisplay = document.getElementById("time-value");
    const alertTextDisplay = document.getElementById("alert-text");

    // Banco de dados interno contendo os dados de impacto ecológico real
    const databaseWaste = {
        sacola: {
            time: "20 Anos",
            alert: "Mesmo fragmentado em microplásticos pelas correntes e luz solar, o material continua sendo ingerido por tartarugas e peixes, intoxicando a cadeia alimentar."
        },
        canudo: {
            time: "200 Anos",
            alert: "Um dos maiores vilões da fauna costeira. Devido ao tamanho pequeno e rigidez, causa ferimentos físicos graves nas vias aéreas e estômagos de animais marinhos."
        },
        garrafa: {
            time: "450 Anos",
            alert: "Uma única garrafa PET leva séculos para desaparecer. Ela flutua por milhares de quilômetros, acumulando algas tóxicas e criando massas flutuantes de lixo nos giros oceânicos."
        },
        linha: {
            time: "600 Anos",
            alert: "O nylon possui resistência extrema. Linhas perdidas provocam a chamada 'pesca fantasma', aprisionando e sufocando mamíferos, arraias e corais por gerações."
        }
    };

    // Ouve a mudança de valor no elemento <select>
    wasteSelect.addEventListener("change", () => {
        const selectedItem = wasteSelect.value;
        const info = databaseWaste[selectedItem];

        if (info) {
            // Atualiza os nós de texto com as informações correspondentes
            timeValueDisplay.textContent = info.time;
            alertTextDisplay.textContent = info.alert;

            // Apresenta o bloco removendo a classe utilitária de ocultação
            simResultPanel.classList.remove("hide");
        }
    });
});
