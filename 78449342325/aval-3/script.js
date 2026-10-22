
function abrirDica(categoria) {
    const dicas = {
            "estudo": "Estude em blocos de tempo, faça exercícios e revise o conteúdo sem olhar as respostas.",
                    "organização": "Anote as datas das provas, divida os trabalhos em etapas e planeje sua semana.",
                            "tecnologia": "Use mapas mentais digitais, vídeos educativos e questionários para revisar as matérias."
                                };

                                    alert("📚 Dica de " + categoria + ":\n\n" + dicas[categoria]);
                                    }

                                    const dicasExtras = [
                                        "Comece pela tarefa mais importante e divida atividades grandes em partes menores.",
                                            "Explique o conteúdo com suas próprias palavras para verificar o que realmente aprendeu.",
                                                "Faça pequenas pausas durante os estudos para descansar e manter a concentração.",
                                                    "Revise o conteúdo em dias diferentes para ajudar a fixar o aprendizado."
                                                    ];

                                                    let indice = 0;

                                                    function novaDica() {
                                                        alert("✨ DICA PARA ESTUDANTES\n\n" + dicasExtras[indice]);
                                                            indice = (indice + 1) % dicasExtras.length;
                                                            }
                                                            