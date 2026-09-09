const tasks = document.querySelectorAll(".task");
const progress = document.getElementById("progress");
const progressNumber = document.getElementById("progressNumber");

tasks.forEach(task => {
    task.addEventListener("change", updateProgress);
    });

    function updateProgress() {

        const completed = document.querySelectorAll(".task:checked").length;
            const total = tasks.length;

                const percentage = Math.round((completed / total) * 100);

                    progress.style.width = percentage + "%";
                        progressNumber.textContent = percentage + "%";

                            if (percentage === 100) {
                                    progressNumber.textContent = "100% 🎉";
                                        }
                                        }


                                        function scrollToRoutine() {
                                            document.getElementById("routine").scrollIntoView({
                                                    behavior: "smooth"
                                                        });
                                                        }


                                                        const quotes = [
                                                            "Você merece o mesmo carinho que oferece aos outros. 💗",
                                                                "Cuidar de você também é uma forma de amor. 🌷",
                                                                    "Não precisa ser perfeita. Só precisa cuidar de si. ✨",
                                                                        "Seu bem-estar também deve estar na sua lista de prioridades. 🦋",
                                                                            "Pequenos cuidados podem transformar o seu dia. 🌸",
                                                                                "Você está fazendo o melhor que pode. E isso já é muito. 💕"
                                                                                ];

                                                                                function newQuote() {

                                                                                    const random = Math.floor(Math.random() * quotes.length);

                                                                                        document.getElementById("quoteText").textContent = quotes[random];
                                                                                        }


                                                                                        const themeButton = document.getElementById("themeButton");

                                                                                        themeButton.addEventListener("click", () => {

                                                                                            document.body.classList.toggle("dark");

                                                                                                if (document.body.classList.contains("dark")) {
                                                                                                        themeButton.textContent = "☀️";
                                                                                                            } else {
                                                                                                                    themeButton.textContent = "🌙";
                                                                                                                        }

                                                                                                                        });