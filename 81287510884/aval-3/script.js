
const categories = [
    {name:"Aritmética",emoji:"🔢",description:"Operações e propriedades"},
    {name:"Álgebra",emoji:"📐",description:"Expressões e equações"},
    {name:"Geometria plana",emoji:"🔺",description:"Áreas e perímetros"},
    {name:"Geometria espacial",emoji:"🧊",description:"Volumes e áreas"},
    {name:"Trigonometria",emoji:"📏",description:"Seno, cosseno e tangente"},
    {name:"Funções",emoji:"📈",description:"Funções matemáticas"},
    {name:"Matemática financeira",emoji:"💰",description:"Juros e porcentagem"},
    {name:"Estatística",emoji:"📊",description:"Médias e medidas"},
    {name:"Probabilidade",emoji:"🎲",description:"Chances e eventos"},
    {name:"Progressões",emoji:"🔁",description:"PA e PG"},
    {name:"Logaritmos",emoji:"🧮",description:"Propriedades e operações"},
    {name:"Geometria analítica",emoji:"📍",description:"Plano cartesiano"}
];

const formulas = [
    // ARITMÉTICA
    {name:"Porcentagem",category:"Aritmética",formula:"P = (p × V) / 100",description:"Calcula uma porcentagem de determinado valor.",example:"20% de 200 = (20 × 200) / 100 = 40.",level:"Fundamental"},
    {name:"Regra de três simples",category:"Aritmética",formula:"x = (b × c) / a",description:"Relaciona duas grandezas proporcionais.",example:"Se 2 cadernos custam R$ 10, 4 custam R$ 20.",level:"Fundamental"},
    {name:"Média aritmética",category:"Aritmética",formula:"M = (x₁ + x₂ + ... + xₙ) / n",description:"Soma os valores e divide pela quantidade.",example:"Notas 6, 8 e 10: média = 8.",level:"Fundamental"},
    {name:"Razão",category:"Aritmética",formula:"a / b",description:"Compara duas quantidades por meio de uma divisão.",example:"A razão entre 10 e 5 é 2.",level:"Fundamental"},
    {name:"Proporção",category:"Aritmética",formula:"a / b = c / d",description:"Igualdade entre duas razões.",example:"2/4 = 3/6.",level:"Fundamental"},
    {name:"Potenciação",category:"Aritmética",formula:"aⁿ = a × a × ... × a",description:"Representa uma multiplicação de fatores iguais.",example:"2³ = 2 × 2 × 2 = 8.",level:"Fundamental"},
    {name:"Potência de mesma base",category:"Aritmética",formula:"aᵐ × aⁿ = aᵐ⁺ⁿ",description:"Na multiplicação de potências de mesma base, somam-se os expoentes.",example:"2² × 2³ = 2⁵ = 32.",level:"Fundamental"},
    {name:"Divisão de potências",category:"Aritmética",formula:"aᵐ / aⁿ = aᵐ⁻ⁿ",description:"Na divisão de potências de mesma base, subtraem-se os expoentes (a diferente de zero).",example:"2⁵ / 2² = 2³ = 8.",level:"Médio"},
    {name:"Radiciação",category:"Aritmética",formula:"ⁿ√a = b",description:"Raiz de um número é o valor que elevado ao índice resulta no radicando.",example:"√25 = 5.",level:"Fundamental"},

    // ÁLGEBRA
    {name:"Equação do 1º grau",category:"Álgebra",formula:"ax + b = 0 → x = -b/a",description:"Encontra o valor desconhecido de uma equação de primeiro grau, com a diferente de zero.",example:"2x + 6 = 0 → x = -3.",level:"Fundamental"},
    {name:"Equação do 2º grau",category:"Álgebra",formula:"ax² + bx + c = 0",description:"Equação polinomial de segundo grau.",example:"x² - 5x + 6 = 0.",level:"Médio"},
    {name:"Fórmula de Bhaskara",category:"Álgebra",formula:"x = (-b ± √Δ) / 2a",description:"Calcula as raízes da equação do segundo grau.",example:"Primeiro calcule Δ = b² - 4ac.",level:"Médio"},
    {name:"Delta",category:"Álgebra",formula:"Δ = b² - 4ac",description:"Discriminante utilizado na equação do segundo grau.",example:"Se Δ for positivo, existem duas raízes reais distintas.",level:"Médio"},
    {name:"Soma das raízes",category:"Álgebra",formula:"S = -b/a",description:"Soma das raízes de uma equação do segundo grau.",example:"Na equação x² - 5x + 6 = 0, S = 5.",level:"Médio"},
    {name:"Produto das raízes",category:"Álgebra",formula:"P = c/a",description:"Produto das raízes de uma equação do segundo grau.",example:"Na equação x² - 5x + 6 = 0, P = 6.",level:"Médio"},
    {name:"Quadrado da soma",category:"Álgebra",formula:"(a + b)² = a² + 2ab + b²",description:"Produto notável do quadrado da soma.",example:"(x + 2)² = x² + 4x + 4.",level:"Médio"},
    {name:"Quadrado da diferença",category:"Álgebra",formula:"(a - b)² = a² - 2ab + b²",description:"Produto notável do quadrado da diferença.",example:"(x - 3)² = x² - 6x + 9.",level:"Médio"},
    {name:"Diferença de quadrados",category:"Álgebra",formula:"a² - b² = (a-b)(a+b)",description:"Fatoração da diferença de dois quadrados.",example:"x² - 9 = (x-3)(x+3).",level:"Médio"},

    // GEOMETRIA PLANA
    {name:"Área do quadrado",category:"Geometria plana",formula:"A = l²",description:"Multiplica o lado por ele mesmo.",example:"Lado 4 cm: A = 16 cm².",level:"Fundamental"},
    {name:"Perímetro do quadrado",category:"Geometria plana",formula:"P = 4l",description:"Soma dos quatro lados iguais.",example:"Lado 5 cm: P = 20 cm.",level:"Fundamental"},
    {name:"Área do retângulo",category:"Geometria plana",formula:"A = b × h",description:"Multiplica a base pela altura.",example:"Base 8 e altura 3: A = 24.",level:"Fundamental"},
    {name:"Perímetro do retângulo",category:"Geometria plana",formula:"P = 2(b + h)",description:"Soma de todos os lados do retângulo.",example:"Base 8 e altura 3: P = 22.",level:"Fundamental"},
    {name:"Área do triângulo",category:"Geometria plana",formula:"A = (b × h) / 2",description:"Multiplica base e altura e divide por dois.",example:"Base 10 e altura 6: A = 30.",level:"Fundamental"},
    {name:"Área do triângulo equilátero",category:"Geometria plana",formula:"A = (l²√3) / 4",description:"Área de um triângulo com três lados iguais.",example:"Lado 4: A = 4√3.",level:"Médio"},
    {name:"Área do círculo",category:"Geometria plana",formula:"A = πr²",description:"Multiplica π pelo quadrado do raio.",example:"Raio 3: A = 9π.",level:"Fundamental"},
    {name:"Comprimento da circunferência",category:"Geometria plana",formula:"C = 2πr",description:"Calcula o comprimento da circunferência.",example:"Raio 5: C = 10π.",level:"Fundamental"},
    {name:"Área do trapézio",category:"Geometria plana",formula:"A = ((B + b) × h) / 2",description:"Soma as bases, multiplica pela altura e divide por dois.",example:"Bases 8 e 4, altura 3: A = 18.",level:"Médio"},
    {name:"Área do losango",category:"Geometria plana",formula:"A = (D × d) / 2",description:"Multiplica as diagonais e divide por dois.",example:"Diagonais 8 e 6: A = 24.",level:"Médio"},
    {name:"Teorema de Pitágoras",category:"Geometria plana",formula:"a² = b² + c²",description:"O quadrado da hipotenusa equivale à soma dos quadrados dos catetos.",example:"Catetos 3 e 4: hipotenusa = 5.",level:"Fundamental"},
    {name:"Soma dos ângulos internos",category:"Geometria plana",formula:"S = (n - 2) × 180°",description:"Calcula a soma dos ângulos internos de um polígono.",example:"Quadrilátero: S = 360°.",level:"Médio"},
    {name:"Ângulo interno de polígono regular",category:"Geometria plana",formula:"ai = ((n - 2) × 180°) / n",description:"Calcula cada ângulo interno de um polígono regular.",example:"Hexágono: 120°.",level:"Médio"},

    // GEOMETRIA ESPACIAL
    {name:"Volume do cubo",category:"Geometria espacial",formula:"V = a³",description:"Eleva a aresta do cubo ao cubo.",example:"Aresta 3: V = 27.",level:"Médio"},
    {name:"Área total do cubo",category:"Geometria espacial",formula:"At = 6a²",description:"Calcula a área das seis faces do cubo.",example:"Aresta 2: At = 24.",level:"Médio"},
    {name:"Volume do paralelepípedo",category:"Geometria espacial",formula:"V = c × l × h",description:"Multiplica comprimento, largura e altura.",example:"2 × 3 × 4 = 24.",level:"Médio"},
    {name:"Volume do cilindro",category:"Geometria espacial",formula:"V = πr²h",description:"Área da base circular multiplicada pela altura.",example:"Raio 2 e altura 5: V = 20π.",level:"Médio"},
    {name:"Volume do cone",category:"Geometria espacial",formula:"V = (πr²h) / 3",description:"Um terço do volume do cilindro de mesma base e altura.",example:"Raio 3 e altura 4: V = 12π.",level:"Médio"},
    {name:"Volume da esfera",category:"Geometria espacial",formula:"V = (4πr³) / 3",description:"Calcula o espaço ocupado pela esfera.",example:"Raio 3: V = 36π.",level:"Médio"},
    {name:"Área da esfera",category:"Geometria espacial",formula:"A = 4πr²",description:"Calcula a área da superfície esférica.",example:"Raio 2: A = 16π.",level:"Médio"},
    {name:"Volume da pirâmide",category:"Geometria espacial",formula:"V = (Ab × h) / 3",description:"Um terço do produto da área da base pela altura.",example:"Base 9 e altura 6: V = 18.",level:"Médio"},
    {name:"Volume do prisma",category:"Geometria espacial",formula:"V = Ab × h",description:"Área da base multiplicada pela altura.",example:"Base 10 e altura 5: V = 50.",level:"Médio"},

    // TRIGONOMETRIA
    {name:"Seno",category:"Trigonometria",formula:"sen θ = CO / H",description:"Razão entre cateto oposto e hipotenusa.",example:"CO = 3 e H = 5: sen θ = 0,6.",level:"Médio"},
    {name:"Cosseno",category:"Trigonometria",formula:"cos θ = CA / H",description:"Razão entre cateto adjacente e hipotenusa.",example:"CA = 4 e H = 5: cos θ = 0,8.",level:"Médio"},
    {name:"Tangente",category:"Trigonometria",formula:"tg θ = CO / CA",description:"Razão entre cateto oposto e adjacente.",example:"CO = 3 e CA = 4: tg θ = 0,75.",level:"Médio"},
    {name:"Relação fundamental",category:"Trigonometria",formula:"sen² θ + cos² θ = 1",description:"Identidade fundamental da trigonometria.",example:"Se sen θ = 0,6, cos θ pode ser 0,8.",level:"Médio"},
    {name:"Lei dos senos",category:"Trigonometria",formula:"a/sen A = b/sen B = c/sen C",description:"Relaciona lados e ângulos de um triângulo.",example:"Utilizada em triângulos não necessariamente retângulos.",level:"ENEM"},
    {name:"Lei dos cossenos",category:"Trigonometria",formula:"a² = b² + c² - 2bc cos A",description:"Calcula um lado de um triângulo a partir dos outros dois e do ângulo entre eles.",example:"Generaliza o teorema de Pitágoras.",level:"ENEM"},

    // FUNÇÕES
    {name:"Função afim",category:"Funções",formula:"f(x) = ax + b",description:"Função polinomial do primeiro grau.",example:"f(x) = 2x + 3.",level:"Médio"},
    {name:"Raiz da função afim",category:"Funções",formula:"x = -b/a",description:"Valor de x para o qual a função afim é igual a zero.",example:"2x + 4 = 0: x = -2.",level:"Médio"},
    {name:"Função quadrática",category:"Funções",formula:"f(x) = ax² + bx + c",description:"Função polinomial do segundo grau.",example:"f(x) = x² - 4x + 3.",level:"Médio"},
    {name:"Vértice da parábola (x)",category:"Funções",formula:"xᵥ = -b / 2a",description:"Abscissa do vértice da parábola.",example:"a = 1 e b = -4: xv = 2.",level:"Médio"},
    {name:"Vértice da parábola (y)",category:"Funções",formula:"yᵥ = -Δ / 4a",description:"Ordenada do vértice da parábola.",example:"Δ = 4 e a = 1: yv = -1.",level:"Médio"},
    {name:"Função exponencial",category:"Funções",formula:"f(x) = aˣ",description:"Função em que a variável aparece no expoente (a > 0 e a diferente de 1).",example:"f(x) = 2ˣ.",level:"Médio"},

    // FINANCEIRA
    {name:"Juros simples",category:"Matemática financeira",formula:"J = C × i × t",description:"Calcula os juros em um regime de capitalização simples.",example:"C = 1000, i = 2% ao mês, t = 3: J = 60.",level:"ENEM"},
    {name:"Montante simples",category:"Matemática financeira",formula:"M = C + J",description:"Soma o capital inicial aos juros simples.",example:"Capital 1000 e juros 60: M = 1060.",level:"ENEM"},
    {name:"Juros compostos",category:"Matemática financeira",formula:"M = C(1 + i)ᵗ",description:"Calcula o montante com juros sobre juros.",example:"C = 1000, i = 10% e t = 2: M = 1210.",level:"ENEM"},
    {name:"Juros compostos (juros)",category:"Matemática financeira",formula:"J = M - C",description:"Diferença entre o montante e o capital inicial.",example:"Montante 1210 e capital 1000: J = 210.",level:"ENEM"},

    // ESTATÍSTICA
    {name:"Média aritmética",category:"Estatística",formula:"M = Σx / n",description:"Soma todos os valores e divide pela quantidade.",example:"2, 4 e 6: média = 4.",level:"ENEM"},
    {name:"Média ponderada",category:"Estatística",formula:"MP = Σ(x × p) / Σp",description:"Considera pesos diferentes para cada valor.",example:"Nota 8 peso 2 e nota 6 peso 1: MP = 7,33.",level:"ENEM"},
    {name:"Amplitude",category:"Estatística",formula:"A = maior - menor",description:"Diferença entre o maior e o menor valor.",example:"Dados 2, 5, 9: amplitude = 7.",level:"ENEM"},

    // PROBABILIDADE
    {name:"Probabilidade",category:"Probabilidade",formula:"P(A) = casos favoráveis / casos possíveis",description:"Calcula a chance de um evento em situações equiprováveis.",example:"Número par em um dado: 3/6 = 50%.",level:"ENEM"},
    {name:"Evento complementar",category:"Probabilidade",formula:"P(Aᶜ) = 1 - P(A)",description:"Probabilidade de um evento não acontecer.",example:"Se P(A) = 0,3, o complementar é 0,7.",level:"ENEM"},

    // PROGRESSÕES
    {name:"Termo geral da PA",category:"Progressões",formula:"aₙ = a₁ + (n - 1)r",description:"Encontra qualquer termo de uma progressão aritmética.",example:"PA: 2, 4, 6. O quinto termo é 10.",level:"Médio"},
    {name:"Soma da PA",category:"Progressões",formula:"Sₙ = (a₁ + aₙ)n / 2",description:"Calcula a soma dos termos de uma PA finita.",example:"2 + 4 + 6 + 8 = 20.",level:"Médio"},
    {name:"Termo geral da PG",category:"Progressões",formula:"aₙ = a₁ × qⁿ⁻¹",description:"Encontra um termo de uma progressão geométrica.",example:"PG: 2, 4, 8. O quarto termo é 16.",level:"Médio"},
    {name:"Soma da PG finita",category:"Progressões",formula:"Sₙ = a₁(qⁿ - 1)/(q - 1)",description:"Calcula a soma dos termos de uma PG finita, com q diferente de 1.",example:"2 + 4 + 8 = 14.",level:"Médio"},
    {name:"Soma da PG infinita",category:"Progressões",formula:"S = a₁ / (1 - q)",description:"Soma de uma PG infinita convergente, quando |q| < 1.",example:"4 + 2 + 1 + ... = 8.",level:"Médio"},

    // LOGARITMOS
    {name:"Definição de logaritmo",category:"Logaritmos",formula:"logₐ b = x ⇔ aˣ = b",description:"Logaritmo é o expoente ao qual a base deve ser elevada para obter o número.",example:"log₂ 8 = 3, pois 2³ = 8.",level:"Médio"},
    {name:"Logaritmo do produto",category:"Logaritmos",formula:"logₐ(xy) = logₐx + logₐy",description:"Transforma o logaritmo do produto em uma soma.",example:"log₂(4 × 8) = 2 + 3 = 5.",level:"Médio"},
    {name:"Logaritmo do quociente",category:"Logaritmos",formula:"logₐ(x/y) = logₐx - logₐy",description:"Transforma o logaritmo da divisão em uma subtração.",example:"log₂(8/2) = 3 - 1 = 2.",level:"Médio"},
    {name:"Logaritmo da potência",category:"Logaritmos",formula:"logₐ(xⁿ) = n logₐx",description:"O expoente passa a multiplicar o logaritmo.",example:"log₂(4²) = 2 × 2 = 4.",level:"Médio"},

    // GEOMETRIA ANALÍTICA
    {name:"Distância entre dois pontos",category:"Geometria analítica",formula:"d = √[(x₂-x₁)² + (y₂-y₁)²]",description:"Calcula a distância entre dois pontos no plano cartesiano.",example:"Entre (0,0) e (3,4): distância = 5.",level:"ENEM"},
    {name:"Ponto médio",category:"Geometria analítica",formula:"M = ((x₁+x₂)/2, (y₁+y₂)/2)",description:"Encontra o ponto médio de um segmento.",example:"Entre (0,0) e (4,6): M = (2,3).",level:"ENEM"},
    {name:"Coeficiente angular",category:"Geometria analítica",formula:"m = (y₂-y₁)/(x₂-x₁)",description:"Calcula a inclinação de uma reta não vertical.",example:"Entre (1,2) e (3,6): m = 2.",level:"ENEM"},
    {name:"Equação da circunferência",category:"Geometria analítica",formula:"(x-a)² + (y-b)² = r²",description:"Equação da circunferência com centro (a,b) e raio r.",example:"Centro (0,0), raio 3: x² + y² = 9.",level:"ENEM"}
];

const categoryGrid = document.getElementById("categoryGrid");
const formulaGrid = document.getElementById("formulaGrid");

let currentCategory = "Todas";
let currentLevel = "Todos";
let currentSearch = "";

function renderCategories() {
    categoryGrid.innerHTML = categories.map(cat => `
        <button class="category-card" onclick="selectCategory('${cat.name}')">
            <span class="emoji">${cat.emoji}</span>
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
        </button>
    `).join("");
}

function renderFormulas() {
    let filtered = formulas.filter(f => {
        const matchesCategory = currentCategory === "Todas" || f.category === currentCategory;
        const matchesLevel = currentLevel === "Todos" || f.level === currentLevel;
        const text = (f.name + " " + f.category + " " + f.formula + " " + f.description).toLowerCase();
        const matchesSearch = text.includes(currentSearch.toLowerCase());

        return matchesCategory && matchesLevel && matchesSearch;
    });

    document.getElementById("formulaTitle").textContent =
        currentCategory === "Todas" ? "Todas as fórmulas" : currentCategory;

    document.getElementById("formulaSubtitle").textContent =
        `${filtered.length} fórmula(s) encontrada(s).`;

    document.getElementById("emptyMessage").hidden = filtered.length !== 0;

    formulaGrid.innerHTML = filtered.map((f, index) => `
        <article class="formula-card">
            <span class="formula-category">${f.category}</span>
            <h3>${f.name}</h3>
            <div class="formula">${f.formula}</div>
            <p>${f.description}</p>
            <div class="example"><strong>Exemplo:</strong> ${f.example}</div>
            <div class="card-bottom">
                <span class="level">${f.level}</span>
                <button class="copy-button" onclick="copyFormula(${formulas.indexOf(f)})">Copiar fórmula</button>
            </div>
        </article>
    `).join("");
}

function selectCategory(category) {
    currentCategory = category;
    currentSearch = "";
    document.getElementById("searchInput").value = "";
    renderFormulas();
    document.getElementById("formulas").scrollIntoView({behavior:"smooth"});
}

function showAll() {
    currentCategory = "Todas";
    currentLevel = "Todos";
    currentSearch = "";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    document.querySelector(".filter").classList.add("active");
    renderFormulas();
}

function filterLevel(level, button) {
    currentLevel = level;
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderFormulas();
}

function searchFormulas() {
    currentSearch = document.getElementById("searchInput").value.trim();
    currentCategory = "Todas";
    renderFormulas();
    document.getElementById("formulas").scrollIntoView({behavior:"smooth"});
}

document.getElementById("searchInput").addEventListener("input", function() {
    currentSearch = this.value.trim();
    currentCategory = "Todas";
    renderFormulas();
});

function copyFormula(index) {
    const formula = formulas[index];

    navigator.clipboard.writeText(`${formula.name}: ${formula.formula}`)
        .then(() => alert("Fórmula copiada com sucesso!"))
        .catch(() => alert("Não foi possível copiar. Tente novamente."));
}

// CALCULADORA DA ÁREA DO TRIÂNGULO
function calculateTriangle() {
    const b = Number(document.getElementById("base").value);
    const h = Number(document.getElementById("altura").value);

    if (!validInputs(["base","altura"]) || b <= 0 || h <= 0) {
        return showResult("triangleResult","Digite valores positivos válidos.");
    }

    showResult("triangleResult",`Área = ${formatNumber((b*h)/2)} unidades²`);
}

// CALCULADORA DE PORCENTAGEM
function calculatePercentage() {
    const total = Number(document.getElementById("total").value);
    const p = Number(document.getElementById("percentage").value);

    if (!validInputs(["total","percentage"]) || total < 0 || p < 0) {
        return showResult("percentageResult","Digite valores válidos e não negativos.");
    }

    showResult("percentageResult",`${p}% de ${total} = ${formatNumber(total*p/100)}`);
}

// TEOREMA DE PITÁGORAS
function calculatePythagoras() {
    const a = Number(document.getElementById("catetoA").value);
    const b = Number(document.getElementById("catetoB").value);

    if (!validInputs(["catetoA","catetoB"]) || a <= 0 || b <= 0) {
        return showResult("pythagorasResult","Digite valores positivos válidos.");
    }

    const h = Math.sqrt(a*a + b*b);
    showResult("pythagorasResult",`Hipotenusa = ${formatNumber(h)}`);
}

// EQUAÇÃO DO SEGUNDO GRAU
function calculateBhaskara() {
    const a = Number(document.getElementById("coefA").value);
    const b = Number(document.getElementById("coefB").value);
    const c = Number(document.getElementById("coefC").value);

    if (!validInputs(["coefA","coefB","coefC"]) || a === 0) {
        return showResult("bhaskaraResult","Informe valores válidos. O coeficiente A não pode ser zero.");
    }

    const delta = b*b - 4*a*c;

    if (delta < 0) {
        return showResult("bhaskaraResult",`Δ = ${formatNumber(delta)}. Não existem raízes reais.`);
    }

    if (delta === 0) {
        const x = -b/(2*a);
        return showResult("bhaskaraResult",`Δ = 0. Raiz única: x = ${formatNumber(x)}`);
    }

    const x1 = (-b + Math.sqrt(delta))/(2*a);
    const x2 = (-b - Math.sqrt(delta))/(2*a);

    showResult("bhaskaraResult",`Δ = ${formatNumber(delta)}<br>x₁ = ${formatNumber(x1)}<br>x₂ = ${formatNumber(x2)}`);
}

function validInputs(ids) {
    return ids.every(id => {
        const input = document.getElementById(id);
        return input.value.trim() !== "" && Number.isFinite(input.valueAsNumber);
    });
}

function formatNumber(number) {
    return number.toLocaleString("pt-BR",{
        maximumFractionDigits:4
    });
}

function showResult(id, message) {
    document.getElementById(id).innerHTML = message;
}

// BOTÃO PARA VOLTAR AO TOPO
window.addEventListener("scroll", () => {
    document.getElementById("topButton").style.display =
        window.scrollY > 400 ? "block" : "none";
});

renderCategories();
renderFormulas();
document.getElementById("topButton").style.display = "none";
