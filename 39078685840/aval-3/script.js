
* {
    margin: 0;
        padding: 0;
            box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
                    background: #f1f5f9;
                        color: #1e293b;
                        }

                        header {
                            background: #2563eb;
                                color: white;
                                    text-align: center;
                                        padding: 35px 15px;
                                        }

                                        header h1 {
                                            margin-bottom: 10px;
                                                font-size: 30px;
                                                }

                                                header p {
                                                    font-size: 15px;
                                                    }

                                                    .container {
                                                        max-width: 850px;
                                                            margin: 35px auto;
                                                                padding: 20px;
                                                                }

                                                                .formulario,
                                                                .tarefas {
                                                                    background: white;
                                                                        padding: 25px;
                                                                            border-radius: 12px;
                                                                                margin-bottom: 25px;
                                                                                    box-shadow: 0 3px 12px rgba(0,0,0,0.08);
                                                                                    }

                                                                                    h2 {
                                                                                        margin-bottom: 20px;
                                                                                            color: #1d4ed8;
                                                                                            }

                                                                                            form {
                                                                                                display: flex;
                                                                                                    flex-direction: column;
                                                                                                        gap: 12px;
                                                                                                        }

                                                                                                        label {
                                                                                                            font-weight: bold;
                                                                                                            }

                                                                                                            input,
                                                                                                            select {
                                                                                                                padding: 13px;
                                                                                                                    border: 1px solid #cbd5e1;
                                                                                                                        border-radius: 7px;
                                                                                                                            font-size: 15px;
                                                                                                                            }

                                                                                                                            button {
                                                                                                                                border: none;
                                                                                                                                    padding: 13px;
                                                                                                                                        border-radius: 7px;
                                                                                                                                            cursor: pointer;
                                                                                                                                                font-weight: bold;
                                                                                                                                                }

                                                                                                                                                form button {
                                                                                                                                                    background: #2563eb;
                                                                                                                                                        color: white;
                                                                                                                                                            margin-top: 10px;
                                                                                                                                                            }

                                                                                                                                                            form button:hover {
                                                                                                                                                                background: #1d4ed8;
                                                                                                                                                                }

                                                                                                                                                                .card {
                                                                                                                                                                    display: flex;
                                                                                                                                                                        justify-content: space-between;
                                                                                                                                                                            align-items: center;
                                                                                                                                                                                gap: 15px;
                                                                                                                                                                                    padding: 18px;
                                                                                                                                                                                        border: 1px solid #e2e8f0;
                                                                                                                                                                                            border-radius: 9px;
                                                                                                                                                                                                margin-bottom: 15px;
                                                                                                                                                                                                }

                                                                                                                                                                                                .card h3 {
                                                                                                                                                                                                    margin-bottom: 8px;
                                                                                                                                                                                                    }

                                                                                                                                                                                                    .card p {
                                                                                                                                                                                                        margin: 7px 0;
                                                                                                                                                                                                            color: #64748b;
                                                                                                                                                                                                            }

                                                                                                                                                                                                            .alta,
                                                                                                                                                                                                            .media,
                                                                                                                                                                                                            .baixa {
                                                                                                                                                                                                                display: inline-block;
                                                                                                                                                                                                                    padding: 5px 10px;
                                                                                                                                                                                                                        border-radius: 5px;
                                                                                                                                                                                                                            font-size: 13px;
                                                                                                                                                                                                                                font-weight: bold;
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                .alta {
                                                                                                                                                                                                                                    background: #fee2e2;
                                                                                                                                                                                                                                        color: #dc2626;
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        .media {
                                                                                                                                                                                                                                            background: #fef3c7;
                                                                                                                                                                                                                                                color: #b45309;
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                .baixa {
                                                                                                                                                                                                                                                    background: #dcfce7;
                                                                                                                                                                                                                                                        color: #15803d;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        .concluir {
                                                                                                                                                                                                                                                            background: #16a34a;
                                                                                                                                                                                                                                                                color: white;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                .concluida {
                                                                                                                                                                                                                                                                    background: #94a3b8;
                                                                                                                                                                                                                                                                        color: white;
                                                                                                                                                                                                                                                                            cursor: not-allowed;
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                            footer {
                                                                                                                                                                                                                                                                                background: #0f172a;
                                                                                                                                                                                                                                                                                    color: white;
                                                                                                                                                                                                                                                                                        text-align: center;
                                                                                                                                                                                                                                                                                            padding: 22px;
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                            @media (max-width: 600px) {
                                                                                                                                                                                                                                                                                                .card {
                                                                                                                                                                                                                                                                                                        flex-direction: column;
                                                                                                                                                                                                                                                                                                                align-items: flex-start;
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                        .card button {
                                                                                                                                                                                                                                                                                                                                width: 100%;
                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                        header h1 {
                                                                                                                                                                                                                                                                                                                                                font-size: 24px;
                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                    