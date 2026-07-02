alert("🌸 Bem-vindo ao App de Plantas! 🌸");
alert("Descubra como cuidar da sua planta de forma simples.");

let planta = prompt("Qual é a sua planta? (Rosa, Cacto, Orquídea ou Girassol)");
planta = planta.toLowerCase();

let cuidados = "";

if (planta === "rosa") {
    cuidados = "🌹 Rosa\n\nCronograma:\n• Regar 3 vezes por semana.\n• Deixar em local com bastante sol.\n• Adubar 1 vez por mês.";
    }
    else if (planta === "cacto") {
        cuidados = "🌵 Cacto\n\nCronograma:\n• Regar a cada 15 dias.\n• Manter em sol direto.\n• Evitar excesso de água.";
        }
        else if (planta === "orquídea") {
            cuidados = "🌺 Orquídea\n\nCronograma:\n• Regar 2 vezes por semana.\n• Luz indireta.\n• Adubar a cada 30 dias.";
            }
            else if (planta === "girassol") {
                cuidados = "🌻 Girassol\n\nCronograma:\n• Regar quando o solo estiver seco.\n• Muito sol.\n• Adubar 1 vez por mês.";
                }
                else {
                    cuidados = "🌼 Ainda não temos informações sobre essa planta.\nTente: Rosa, Cacto, Orquídea ou Girassol.";
                    }

                    alert(cuidados);

                    let resposta = prompt("Gostou das dicas? (sim ou não)");

                    if (resposta.toLowerCase() === "sim") {
                        alert("💚 Ficamos felizes! Cuide bem da sua plantinha.");
                        } else {
                            alert("🌸 Obrigado por usar o App de Plantas! Volte sempre.");
                            }