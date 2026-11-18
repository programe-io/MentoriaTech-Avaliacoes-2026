
const seguir = document.getElementById("seguir");

let seguindo = false;

seguir.addEventListener("click", () => {

    seguindo = !seguindo;

        if (seguindo) {
                seguir.textContent = "Seguindo ✓";
                        seguir.style.background = "#292940";
                            } else {
                                    seguir.textContent = "Seguir";
                                            seguir.style.background =
                                                        "linear-gradient(90deg, #008cff, #873cff, #d936ad)";
                                                            }

                                                            });

                                                            // Curtir fotos com dois cliques
                                                            document.querySelectorAll(".galeria img").forEach((foto) => {

                                                                foto.addEventListener("dblclick", () => {

                                                                        foto.style.filter = "brightness(0.5)";

                                                                                setTimeout(() => {
                                                                                            foto.style.filter = "brightness(1)";
                                                                                                    }, 500);

                                                                                                        });

                                                                                                        });

                                                                                                        // Seleção das abas
                                                                                                        document.querySelectorAll(".abas span").forEach((aba) => {

                                                                                                            aba.addEventListener("click", () => {

                                                                                                                    document.querySelector(".abas .ativo")
                                                                                                                                ?.classList.remove("ativo");

                                                                                                                                        aba.classList.add("ativo");

                                                                                                                                            });

                                                                                                                                            });
                                                                                                                                            