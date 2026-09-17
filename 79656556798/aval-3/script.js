<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>

          <title>Introdução ao Tailwind</title>
          </head>

          <body class="bg-gray-100 flex items-center justify-center min-h-screen">

            <div class="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 class="text-3xl font-bold text-blue-600 mb-4">
                      Introdução ao Tailwind CSS
                          </h1>

                              <button
                                    id="botao"
                                          class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700"
                                              >
                                                    Clique aqui
                                                        </button>

                                                            <p id="mensagem" class="mt-4 text-gray-700"></p>
                                                              </div>

                                                                <script>
                                                                    const botao = document.getElementById("botao");
                                                                        const mensagem = document.getElementById("mensagem");

                                                                            botao.addEventListener("click", () => {
                                                                                  mensagem.textContent = "Você clicou no botão!";
                                                                                      });
                                                                                        </script>

                                                                                        </body>
                                                                                        </html>