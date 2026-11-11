
const planetas = [
    "Mercúrio é o menor planeta do Sistema Solar!",
        "Vênus é o planeta mais quente!",
            "A Terra possui apenas uma Lua natural!",
                "Marte é conhecido como planeta vermelho!",
                    "Júpiter é o maior planeta do Sistema Solar!",
                        "Saturno possui belos anéis!",
                            "Urano gira praticamente deitado!",
                                "Netuno é muito distante do Sol!"
                                ];

                                function mostrarCuriosidade() {
                                    const numero = Math.floor(Math.random() * planetas.length);

                                        alert(planetas[numero]);
                                        }

                                        console.log("Bem-vindo ao Sistema Solar!");
                                        