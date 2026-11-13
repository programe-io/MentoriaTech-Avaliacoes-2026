
// MEU BLOG - V11

const publicacoes = [
    {
            titulo: "Bem-vindo ao meu blog!",
                    conteudo: "Este é meu espaço para compartilhar ideias, histórias e novidades.",
                            data: new Date().toLocaleDateString("pt-BR")
                                },
                                    {
                                            titulo: "Tecnologia no futuro",
                                                    conteudo: "A tecnologia está transformando o mundo e criando novas oportunidades.",
                                                            data: new Date().toLocaleDateString("pt-BR")
                                                                },
                                                                    {
                                                                            titulo: "Meus objetivos",
                                                                                    conteudo: "Aqui compartilho meus sonhos, projetos e conquistas.",
                                                                                            data: new Date().toLocaleDateString("pt-BR")
                                                                                                }
                                                                                                ];

                                                                                                // Mostrar publicações
                                                                                                function mostrarPublicacoes() {
                                                                                                    const area = document.getElementById("publicacoes");

                                                                                                        if (!area) return;

                                                                                                            area.innerHTML = "";

                                                                                                                publicacoes.forEach((post, index) => {
                                                                                                                        area.innerHTML += `
                                                                                                                                    <div class="post">
                                                                                                                                                    <h2>${post.titulo}</h2>
                                                                                                                                                                    <p>${post.conteudo}</p>
                                                                                                                                                                                    <small>${post.data}</small>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                        `;
                                                                                                                                                                                                            });
                                                                                                                                                                                                            }

                                                                                                                                                                                                            // Adicionar publicação
                                                                                                                                                                                                            function adicionarPost() {
                                                                                                                                                                                                                const titulo = document.getElementById("titulo").value;
                                                                                                                                                                                                                    const conteudo = document.getElementById("conteudo").value;

                                                                                                                                                                                                                        if (!titulo.trim() || !conteudo.trim()) {
                                                                                                                                                                                                                                alert("Preencha todos os campos!");
                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                publicacoes.unshift({
                                                                                                                                                                                                                                                        titulo: titulo,
                                                                                                                                                                                                                                                                conteudo: conteudo,
                                                                                                                                                                                                                                                                        data: new Date().toLocaleDateString("pt-BR")
                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                document.getElementById("titulo").value = "";
                                                                                                                                                                                                                                                                                    document.getElementById("conteudo").value = "";

                                                                                                                                                                                                                                                                                        mostrarPublicacoes();
                                                                                                                                                                                                                                                                                            alert("Publicação adicionada!");
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                            // Iniciar blog
                                                                                                                                                                                                                                                                                            document.addEventListener("DOMContentLoaded", mostrarPublicacoes);
                                                                                                                                                                                                                                                                                            