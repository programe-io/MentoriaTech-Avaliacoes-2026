const simbolos = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];

let moedas = 100;
let vitorias = 0;
let ranking = 0;

function atualizarUI() {
    document.getElementById("coins").innerText = "💰 Moedas: " + moedas;
        document.getElementById("placar").innerText = "🏆 Vitórias: " + vitorias;
            document.getElementById("rank").innerText = "📈 Pontuação: " + ranking;
            }

            function flashTela() {
                const container = document.querySelector(".game-box");

                    container.classList.add("flash");

                        setTimeout(() => {
                                container.classList.remove("flash");
                                    }, 1000);
                                    }

                                    function girar() {

                                        const btn = document.getElementById("btn");

                                            if (moedas < 10) {
                                                    document.getElementById("msg").innerText = "❌ Sem moedas suficientes!";
                                                            return;
                                                                }

                                                                    moedas -= 10;
                                                                        atualizarUI();

                                                                            btn.disabled = true;

                                                                                const r1 = document.getElementById("r1");
                                                                                    const r2 = document.getElementById("r2");
                                                                                        const r3 = document.getElementById("r3");

                                                                                            let intervalo = setInterval(() => {
                                                                                                    r1.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
                                                                                                            r2.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
                                                                                                                    r3.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
                                                                                                                        }, 100);

                                                                                                                            document.getElementById("msg").innerText = "🎰 Girando...";

                                                                                                                                setTimeout(() => {

                                                                                                                                        clearInterval(intervalo);

                                                                                                                                                let s1 = simbolos[Math.floor(Math.random() * simbolos.length)];
                                                                                                                                                        let s2 = simbolos[Math.floor(Math.random() * simbolos.length)];
                                                                                                                                                                let s3 = simbolos[Math.floor(Math.random() * simbolos.length)];

                                                                                                                                                                        r1.innerText = s1;
                                                                                                                                                                                r2.innerText = s2;
                                                                                                                                                                                        r3.innerText = s3;

                                                                                                                                                                                                let jackpot = Math.random() < 0.05; // 5% chance

                                                                                                                                                                                                        if (jackpot) {
                                                                                                                                                                                                                    moedas += 200;
                                                                                                                                                                                                                                vitorias += 5;
                                                                                                                                                                                                                                            ranking += 10;

                                                                                                                                                                                                                                                        document.getElementById("msg").innerText = "💥 JACKPOT! +200 moedas!";
                                                                                                                                                                                                                                                                    flashTela();
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                    else if (s1 === s2 && s2 === s3) {
                                                                                                                                                                                                                                                                                                moedas += 50;
                                                                                                                                                                                                                                                                                                            vitorias += 1;
                                                                                                                                                                                                                                                                                                                        ranking += 2;

                                                                                                                                                                                                                                                                                                                                    document.getElementById("msg").innerText = "🎉 Vitória! +50 moedas!";
                                                                                                                                                                                                                                                                                                                                                flashTela();
                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                else {
                                                                                                                                                                                                                                                                                                                                                                            ranking += 1;
                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("msg").innerText = "Tente novamente...";
                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                        atualizarUI();
                                                                                                                                                                                                                                                                                                                                                                                                                btn.disabled = false;

                                                                                                                                                                                                                                                                                                                                                                                                                    }, 2000);
                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                    /* inicializa UI */
                                                                                                                                                                                                                                                                                                                                                                                                                    atualizarUI();