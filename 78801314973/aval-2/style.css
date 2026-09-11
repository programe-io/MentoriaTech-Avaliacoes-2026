/* ==========================================================================
   1. VARIÁVEIS DE CORES E CONFIGURAÇÕES GERAIS
      ========================================================================== */
      :root {
        --primary-color: #6b3e2e;      /* Castanho/Chocolate */
          --secondary-color: #d97736;    /* Laranja/Caramelo */
            --bg-color: #fcf8f2;           /* Fundo suave/Creme */
              --card-bg: #ffffff;            /* Fundo dos cartões */
                --text-color: #333333;          /* Cor do texto principal */
                  --border-color: #eee;          /* Cor das linhas sutis */
                  }

                  * {
                    box-sizing: border-box;
                      margin: 0;
                        padding: 0;
                          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                          }

                          body {
                            background-color: var(--bg-color);
                              color: var(--text-color);
                                line-height: 1.6;
                                  padding: 20px;
                                  }

                                  /* ==========================================================================
                                     2. ESTRUTURA PRINCIPAL (CARTÃO DA RECEITA)
                                        ========================================================================== */
                                        .recipe-card {
                                          max-width: 800px;
                                            margin: 0 auto;
                                              background: var(--card-bg);
                                                border-radius: 12px;
                                                  overflow: hidden;
                                                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                                                    }

                                                    .recipe-header {
                                                      background-color: var(--primary-color);
                                                        color: #ffffff;
                                                          padding: 30px 20px;
                                                            text-align: center;
                                                            }

                                                            .recipe-header h1 {
                                                              font-size: 2rem;
                                                                margin-bottom: 10px;
                                                                }

                                                                .recipe-meta {
                                                                  display: flex;
                                                                    justify-content: center;
                                                                      gap: 20px;
                                                                        margin-top: 15px;
                                                                          font-size: 0.9rem;
                                                                            flex-wrap: wrap; /* Para quebrar linha no celular */
                                                                            }

                                                                            .recipe-body {
                                                                              padding: 30px;
                                                                              }

                                                                              h2 {
                                                                                color: var(--primary-color);
                                                                                  border-bottom: 2px solid var(--secondary-color);
                                                                                    padding-bottom: 5px;
                                                                                      margin-top: 25px;
                                                                                        margin-bottom: 15px;
                                                                                        }

                                                                                        /* ==========================================================================
                                                                                           3. CONTROLE DE PORÇÕES (BOTÕES DE + E -)
                                                                                              ========================================================================== */
                                                                                              .servings-control {
                                                                                                background: #f0f0f0;
                                                                                                  padding: 10px 15px;
                                                                                                    border-radius: 8px;
                                                                                                      display: inline-flex;
                                                                                                        align-items: center;
                                                                                                          gap: 10px;
                                                                                                            margin-bottom: 10px;
                                                                                                            }

                                                                                                            .servings-control button {
                                                                                                              background: var(--secondary-color);
                                                                                                                color: white;
                                                                                                                  border: none;
                                                                                                                    width: 28px;
                                                                                                                      height: 28px;
                                                                                                                        border-radius: 50%;
                                                                                                                          cursor: pointer;
                                                                                                                            font-size: 1.2rem;
                                                                                                                              font-weight: bold;
                                                                                                                                transition: background-color 0.2s, transform 0.1s;
                                                                                                                                }

                                                                                                                                .servings-control button:hover {
                                                                                                                                  background-color: #c46425;
                                                                                                                                  }

                                                                                                                                  .servings-control button:active {
                                                                                                                                    transform: scale(0.95);
                                                                                                                                    }

                                                                                                                                    /* ==========================================================================
                                                                                                                                       4. LISTA DE INGREDIENTES E CHECKBOXES
                                                                                                                                          ========================================================================== */
                                                                                                                                          .ingredients-list {
                                                                                                                                            list-style: none;
                                                                                                                                            }

                                                                                                                                            .ingredients-list li {
                                                                                                                                              padding: 10px 0;
                                                                                                                                                border-bottom: 1px dashed var(--border-color);
                                                                                                                                                  display: flex;
                                                                                                                                                    align-items: center;
                                                                                                                                                      cursor: pointer;
                                                                                                                                                        transition: color 0.2s;
                                                                                                                                                        }

                                                                                                                                                        .ingredients-list li.done {
                                                                                                                                                          text-decoration: line-through;
                                                                                                                                                            color: #888;
                                                                                                                                                            }

                                                                                                                                                            .ingredients-list input[type="checkbox"] {
                                                                                                                                                              margin-right: 12px;
                                                                                                                                                                width: 18px;
                                                                                                                                                                  height: 18px;
                                                                                                                                                                    cursor: pointer;
                                                                                                                                                                      accent-color: var(--secondary-color); /* Personaliza a cor do check */
                                                                                                                                                                      }

                                                                                                                                                                      /* ==========================================================================
                                                                                                                                                                         5. BARRA DE PROGRESSO
                                                                                                                                                                            ========================================================================== */
                                                                                                                                                                            .progress-container {
                                                                                                                                                                              margin-top: 8px;
                                                                                                                                                                                background-color: #e0e0e0;
                                                                                                                                                                                  border-radius: 10px;
                                                                                                                                                                                    height: 12px;
                                                                                                                                                                                      width: 100%;
                                                                                                                                                                                        overflow: hidden;
                                                                                                                                                                                        }

                                                                                                                                                                                        .progress-bar {
                                                                                                                                                                                          height: 100%;
                                                                                                                                                                                            width: 0%;
                                                                                                                                                                                              background-color: var(--secondary-color);
                                                                                                                                                                                                transition: width 0.3s ease;
                                                                                                                                                                                                }

                                                                                                                                                                                                .progress-text {
                                                                                                                                                                                                  text-align: right;
                                                                                                                                                                                                    font-size: 0.85rem;
                                                                                                                                                                                                      color: #666;
                                                                                                                                                                                                        margin-top: 5px;
                                                                                                                                                                                                        }

                                                                                                                                                                                                        /* ==========================================================================
                                                                                                                                                                                                           6. MODO DE PREPARO (PASSO A PASSO COM NÚMEROS)
                                                                                                                                                                                                              ========================================================================== */
                                                                                                                                                                                                              .steps-list {
                                                                                                                                                                                                                list-style: none;
                                                                                                                                                                                                                  counter-reset: step-counter; /* Cria um contador automático */
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                  .step-item {
                                                                                                                                                                                                                    position: relative;
                                                                                                                                                                                                                      padding-left: 50px;
                                                                                                                                                                                                                        margin-bottom: 20px;
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        .step-item::before {
                                                                                                                                                                                                                          counter-increment: step-counter;
                                                                                                                                                                                                                            content: counter(step-counter);
                                                                                                                                                                                                                              position: absolute;
                                                                                                                                                                                                                                left: 0;
                                                                                                                                                                                                                                  top: 0;
                                                                                                                                                                                                                                    width: 35px;
                                                                                                                                                                                                                                      height: 35px;
                                                                                                                                                                                                                                        background-color: var(--secondary-color);
                                                                                                                                                                                                                                          color: white;
                                                                                                                                                                                                                                            border-radius: 50%;
                                                                                                                                                                                                                                              display: flex;
                                                                                                                                                                                                                                                align-items: center;
                                                                                                                                                                                                                                                  justify-content: center;
                                                                                                                                                                                                                                                    font-weight: bold;
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    /* ==========================================================================
                                                                                                                                                                                                                                                       7. RESPONSIVIDADE (PARA TELAS PEQUENAS/CELULARES)
                                                                                                                                                                                                                                                          ========================================================================== */
                                                                                                                                                                                                                                                          @media (max-width: 600px) {
                                                                                                                                                                                                                                                            body {
                                                                                                                                                                                                                                                                padding: 10px;
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                    .recipe-body {
                                                                                                                                                                                                                                                                        padding: 15px;
                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                            .recipe-header h1 {
                                                                                                                                                                                                                                                                                font-size: 1.5rem;
                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                    .recipe-meta {
                                                                                                                                                                                                                                                                                        flex-direction: column;
                                                                                                                                                                                                                                                                                            gap: 8px;
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                              