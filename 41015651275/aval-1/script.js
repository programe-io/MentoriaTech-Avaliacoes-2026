c// Lista de filmes
const filmes = [
    { titulo: "Interestelar", nota: 9, genero: "Ficção" },
    { titulo: "Velozes e Furiosos", nota: 6, genero: "Ação" },
    { titulo: "A Origem", nota: 9, genero: "Ficção" },
    { titulo: "Crepúsculo", nota: 5, genero: "Romance" }
];

// Função para mostrar todos os filmes
function mostrarFilmes() {
    const lista = document.getElementById("listaFilmes");
    lista.innerHTML = "";

    filmes.forEach(filme => {
        lista.innerHTML += `
            <div class="filme">
                <strong>${filme.titulo}</strong><br>
                Nota: ${filme.nota} <br>
                Gênero: ${filme.genero}
            </div>
        `;
    });
}

// Algoritmo de recomendação (filtra por nota alta)
function recomendar() {
    const recomendados = filmes.filter(f => f.nota >= 8);
    const area = document.getElementById("recomendados");
    area.innerHTML = "";

    if (recomendados.length === 0) {
        area.innerHTML = "<p>Nenhum filme recomendado.</p>";
        return;
    }

    recomendados.forEach(f => {
        area.innerHTML += `
            <div class="filme">
                ⭐ ${f.titulo} (Nota: ${f.nota})
            </div>
        `;
    });
}

// Função extra: buscar por gênero
function buscarPorGenero(genero) {
    const resultado = filmes.filter(f => 
        f.genero.toLowerCase() === genero.toLowerCase()
    );

    const area = document.getElementById("recomendados");
    area.innerHTML = "";

    resultado.forEach(f => {
        area.innerHTML += `
            <div class="filme">
                🎬 ${f.titulo} - ${f.genero}
            </div>
        `;
    });
}

// Inicializa a lista ao carregar a página
mostrarFilmes();const filmes = ["Interestelar", "A Origem", "Batman", "Vingadores"];

function buscar() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    const filtrados = filmes.filter(f => f.toLowerCase().includes(termo));

    if (filtrados.length === 0) {
        resultado.innerHTML = "<p>Nenhum resultado encontrado</p>";
    }

    filtrados.forEach(f => {
        resultado.innerHTML += `<div class="filme">${f}</div>`;
    });

cfunction responder(tipo) {
    const resposta = document.getElementById("resposta");

    let filme = "";

    if (tipo === "acao") filme = "Vingadores";
    else if (tipo === "romance") filme = "Titanic";
    else if (tipo === "ficcao") filme = "Interestelar";

    resposta.innerHTML = `🎬 Recomendamos: <strong>${filme}</strong>`;
}