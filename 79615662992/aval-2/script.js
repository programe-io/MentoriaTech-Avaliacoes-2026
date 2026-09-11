let entradas = JSON.parse(localStorage.getItem("entradas")) || [];

function salvarEntrada() {
    const data = document.getElementById("data").value;
    const titulo = document.getElementById("titulo").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (data === "" || titulo === "" || texto === "") {
        alert("💕 Preencha todos os campos!");
        return;
    }

    const novaEntrada = {
        id: Date.now(),
        data: data,
        titulo: titulo,
        texto: texto
    };

    entradas.push(novaEntrada);

    localStorage.setItem("entradas", JSON.stringify(entradas));

    document.getElementById("data").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";

    mostrarEntradas();
    
    alert("🌸 Entrada salva com sucesso!");
}

function mostrarEntradas() {
    const lista = document.getElementById("listaEntradas");

    if (entradas.length === 0) {
        lista.innerHTML = `
            <div class="mensagem-vazia">
                🌷 Você ainda não possui nenhuma entrada.
            </div>
        `;
        return;
    }

    lista.innerHTML = "";

    entradas
        .slice()
        .reverse()
        .forEach(entrada => {

            const div = document.createElement("div");
            div.classList.add("entrada");

            div.innerHTML = `
                <h3>💗 ${entrada.titulo}</h3>
                <div class="data">📅 ${formatarData(entrada.data)}</div>
                <p>${entrada.texto}</p>

                <button 
                    class="btn-excluir"
                    onclick="excluirEntrada(${entrada.id})">
                    🗑️ Excluir
                </button>
            `;

            lista.appendChild(div);
        });
}

function excluirEntrada(id) {
    const confirmar = confirm("Tem certeza que deseja excluir esta entrada?");

    if (!confirmar) {
        return;
    }

    entradas = entradas.filter(entrada => entrada.id !== id);

    localStorage.setItem("entradas", JSON.stringify(entradas));

    mostrarEntradas();
}

function formatarData(data) {
    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

mostrarEntradas();