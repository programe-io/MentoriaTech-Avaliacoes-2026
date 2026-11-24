
const steps = [
    {
        title: "Preparação das peças",
        description: "Organize todas as peças em uma superfície limpa e confira a compatibilidade dos componentes.",
        materials: [
            "Quadro da bicicleta",
            "Garfo dianteiro",
            "Guidão",
            "Selim e canote",
            "Rodas",
            "Pedais",
            "Kit de ferramentas"
        ]
    },
    {
        title: "Instalação do garfo",
        description: "Instale o conjunto de direção e o garfo conforme as especificações do fabricante.",
        materials: [
            "Garfo dianteiro",
            "Caixa de direção",
            "Espaçadores",
            "Ferramentas apropriadas"
        ]
    },
    {
        title: "Montagem do guidão",
        description: "Posicione o guidão na mesa, centralize e aperte os parafusos conforme o torque indicado.",
        materials: [
            "Guidão",
            "Mesa",
            "Manoplas",
            "Chaves apropriadas"
        ]
    },
    {
        title: "Instalação das rodas",
        description: "Instale as rodas dianteira e traseira e confira o alinhamento e a fixação.",
        materials: [
            "Roda dianteira",
            "Roda traseira",
            "Eixos ou blocagens",
            "Freios"
        ]
    },
    {
        title: "Sistema de transmissão",
        description: "Instale os componentes da transmissão conforme o padrão e as instruções do fabricante.",
        materials: [
            "Pedivela",
            "Movimento central",
            "Corrente",
            "Câmbios",
            "Pedais",
            "Ferramentas específicas"
        ]
    },
    {
        title: "Instalação do selim",
        description: "Instale o canote respeitando a marcação mínima de inserção e ajuste a altura do selim.",
        materials: [
            "Selim",
            "Canote",
            "Abraçadeira",
            "Chave apropriada"
        ]
    },
    {
        title: "Ajuste dos freios e marchas",
        description: "Regule os freios e câmbios conforme os manuais dos fabricantes.",
        materials: [
            "Cabos e conduítes",
            "Manetes de freio",
            "Freios",
            "Passadores de marcha",
            "Chaves de regulagem"
        ]
    },
    {
        title: "Inspeção final",
        description: "Faça uma inspeção completa de segurança antes de liberar a bicicleta para utilização.",
        materials: [
            "Verificação dos parafusos",
            "Calibragem dos pneus",
            "Teste dos freios",
            "Verificação das rodas",
            "Teste da transmissão",
            "Inspeção geral"
        ]
    }
];

let currentStep = 0;
let completed = {};

function renderStep() {
    const step = steps[currentStep];

    document.getElementById("stepNumber").innerText =
        "ETAPA " + (currentStep + 1);

    document.getElementById("stepTitle").innerText =
        step.title;

    document.getElementById("stepDescription").innerText =
        step.description;

    document.getElementById("stepCounter").innerText =
        `Etapa ${currentStep + 1} de ${steps.length}`;

    const materials = document.getElementById("materials");
    materials.innerHTML = "";

    step.materials.forEach((material, index) => {
        const key = `${currentStep}-${index}`;

        const li = document.createElement("li");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = !!completed[key];

        checkbox.onchange = function() {
            completed[key] = checkbox.checked;
            updateProgress();
        };

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(material));

        materials.appendChild(li);
    });

    document.getElementById("back").disabled =
        currentStep === 0;

    document.getElementById("next").innerText =
        currentStep === steps.length - 1
        ? "Finalizar montagem ✓"
        : "Próxima etapa →";

    updateProgress();
}

function updateProgress() {
    let total = 0;
    let done = 0;

    steps.forEach((step, stepIndex) => {
        step.materials.forEach((material, index) => {
            total++;

            if (completed[`${stepIndex}-${index}`]) {
                done++;
            }
        });
    });

    const percent = Math.round((done / total) * 100);

    document.getElementById("progress").style.width =
        percent + "%";

    document.getElementById("progressText").innerText =
        percent + "% concluído";

    const currentItems = steps[currentStep].materials.length;

    const currentDone = steps[currentStep].materials.filter(
        (_, index) => completed[`${currentStep}-${index}`]
    ).length;

    document.getElementById("status").innerText =
        `${currentDone} de ${currentItems} itens marcados nesta etapa.`;
}

function nextStep() {
    const currentMaterials = steps[currentStep].materials;

    const allChecked = currentMaterials.every(
        (_, index) => completed[`${currentStep}-${index}`]
    );

    if (!allChecked) {
        alert("Marque todos os itens desta etapa antes de continuar.");
        return;
    }

    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        finishSystem();
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

function finishSystem() {
    document.getElementById("content").innerHTML = `
        <div class="finish">
            <h1>🚲</h1>
            <h2>Montagem concluída!</h2>
            <p>Você concluiu todas as etapas do checklist.</p>
            <p>Solicite uma inspeção final por um mecânico qualificado
            antes de utilizar a bicicleta.</p>
            <br>
            <button class="btn-next" onclick="resetSystem()">
                Nova montagem
            </button>
        </div>
    `;
}

function resetSystem() {
    currentStep = 0;
    completed = {};

    document.getElementById("content").innerHTML = `
        <div class="step-number" id="stepNumber"></div>
        <h2 id="stepTitle"></h2>
        <p class="step-description" id="stepDescription"></p>
        <h3>Peças e ferramentas necessárias:</h3>
        <ul id="materials"></ul>
        <div class="status" id="status"></div>
        <div class="buttons">
            <button class="btn-back" id="back" onclick="previousStep()">← Voltar</button>
            <button class="btn-next" id="next" onclick="nextStep()">Próxima etapa →</button>
        </div>
    `;

    renderStep();
}

renderStep();
