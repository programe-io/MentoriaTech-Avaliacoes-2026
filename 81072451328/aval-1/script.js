let score = 0;

const scoreDisplay = document.getElementById("score");
const outfit = document.getElementById("outfit");
const shoes = document.getElementById("shoes");
const accessory = document.getElementById("accessory");

const outfitButtons = document.querySelectorAll(".outfit-item");
const shoeButtons = document.querySelectorAll(".shoe-item");
const accessoryButtons = document.querySelectorAll(".accessory-item");

function escolherItem(buttons, elemento) {

    buttons.forEach(button => {
            button.addEventListener("click", () => {

                        buttons.forEach(b => b.classList.remove("selected"));

                                    button.classList.add("selected");

                                                elemento.textContent = button.dataset.item;

                                                            score += Number(button.dataset.points);

                                                                        scoreDisplay.textContent = score;
                                                                                });
                                                                                    });
                                                                                    }

                                                                                    escolherItem(outfitButtons, outfit);
                                                                                    escolherItem(shoeButtons, shoes);
                                                                                    escolherItem(accessoryButtons, accessory);

                                                                                    document.getElementById("runway").addEventListener("click", () => {

                                                                                        const resultado = document.getElementById("result");
                                                                                            const mensagem = document.getElementById("message");
                                                                                                const finalScore = document.getElementById("finalScore");

                                                                                                    finalScore.textContent = score;

                                                                                                        if (score >= 25) {
                                                                                                                mensagem.textContent =
                                                                                                                            "👑 UAU! Seu look está incrível! Você é uma verdadeira estrela da moda!";
                                                                                                                                } else if (score >= 15) {
                                                                                                                                        mensagem.textContent =
                                                                                                                                                    "💖 Muito lindo! Seu look ficou super estiloso!";
                                                                                                                                                        } else {
                                                                                                                                                                mensagem.textContent =
                                                                                                                                                                            "✨ Bom começo! Escolha mais peças para deixar o look ainda mais fashion!";
                                                                                                                                                                                }

                                                                                                                                                                                    resultado.style.display = "flex";
                                                                                                                                                                                    });

                                                                                                                                                                                    document.getElementById("restart").addEventListener("click", () => {

                                                                                                                                                                                        score = 0;
                                                                                                                                                                                            scoreDisplay.textContent = "0";

                                                                                                                                                                                                outfit.textContent = "👗";
                                                                                                                                                                                                    shoes.textContent = "👠";
                                                                                                                                                                                                        accessory.textContent = "";

                                                                                                                                                                                                            document.querySelectorAll(".item").forEach(item => {
                                                                                                                                                                                                                    item.classList.remove("selected");
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                            document.getElementById("result").style.display = "none";
                                                                                                                                                                                                                            });