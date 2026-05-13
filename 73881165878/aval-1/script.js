function mudar() {
        const titulo = document.getElementById("titulo");
            titulo.innerText = "Você clicou no botão!";

                const cores = ["lightblue", "lightgreen", "lightcoral", "lightyellow"];
                    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

                        document.body.style.backgroundColor = corAleatoria;
                        }
}