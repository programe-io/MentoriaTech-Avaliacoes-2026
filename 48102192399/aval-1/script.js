const titulo = document.querySelector("h1");
const botao = document.querySelector("button");
const paragrafos = document.querySelectorAll("p");
const links = document.querySelectorAll("nav a");

let modoEscuro = true;

botao.addEventListener("click", () => {
    modoEscuro = !modoEscuro;

        if (modoEscuro) {
                document.body.style.background = "#0f172a";
                        document.body.style.color = "#ffffff";
                                botao.textContent = "Modo Claro";
                                    } else {
                                            document.body.style.background = "#f5f5f5";
                                                    document.body.style.color = "#111111";
                                                            botao.textContent = "Modo Escuro";
                                                                }
                                                                });

                                                                titulo.addEventListener("mouseover", () => {
                                                                    titulo.style.transform = "scale(1.1)";
                                                                    });

                                                                    titulo.addEventListener("mouseout", () => {
                                                                        titulo.style.transform = "scale(1)";
                                                                        });

                                                                        paragrafos.forEach((p) => {
                                                                            p.addEventListener("click", () => {
                                                                                    p.style.color = "#38bdf8";
                                                                                            p.style.fontWeight = "bold";
                                                                                                });
                                                                                                });

                                                                                                links.forEach((link) => {
                                                                                                    link.addEventListener("click", (e) => {
                                                                                                            e.preventDefault();
                                                                                                                    alert("Você clicou em: " + link.textContent);
                                                                                                                        });
                                                                                                                        });

                                                                                                                        setInterval(() => {
                                                                                                                            const cores = ["#38bdf8", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];
                                                                                                                                titulo.style.color = cores[Math.floor(Math.random() * cores.length)];
                                                                                                                                }, 1000);

                                                                                                                                console.log("Página carregada com sucesso!");