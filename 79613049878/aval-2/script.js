<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Projeto Completo</title>

        <style>
            *{
                  margin:0;
                        padding:0;
                              box-sizing:border-box;
                                    font-family:Arial, Helvetica, sans-serif;
                                        }

                                            body{
                                                  background:#f4f4f4;
                                                        color:#333;
                                                            }

                                                                header{
                                                                      background:#222;
                                                                            color:white;
                                                                                  padding:20px;
                                                                                        text-align:center;
                                                                                            }

                                                                                                nav{
                                                                                                      background:#444;
                                                                                                            padding:15px;
                                                                                                                  text-align:center;
                                                                                                                      }

                                                                                                                          nav a{
                                                                                                                                color:white;
                                                                                                                                      text-decoration:none;
                                                                                                                                            margin:0 15px;
                                                                                                                                                  font-weight:bold;
                                                                                                                                                      }

                                                                                                                                                          nav a:hover{
                                                                                                                                                                color:yellow;
                                                                                                                                                                    }

                                                                                                                                                                        main{
                                                                                                                                                                              padding:40px;
                                                                                                                                                                                    display:grid;
                                                                                                                                                                                          grid-template-columns:repeat(auto-fit, minmax(250px,1fr));
                                                                                                                                                                                                gap:20px;
                                                                                                                                                                                                    }

                                                                                                                                                                                                        article{
                                                                                                                                                                                                              background:white;
                                                                                                                                                                                                                    padding:20px;
                                                                                                                                                                                                                          border-radius:10px;
                                                                                                                                                                                                                                box-shadow:0 0 10px rgba(0,0,0,0.1);
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                        article img{
                                                                                                                                                                                                                                              width:100%;
                                                                                                                                                                                                                                                    border-radius:10px;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            h2{
                                                                                                                                                                                                                                                                  margin:15px 0;
                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                          aside{
                                                                                                                                                                                                                                                                                background:#ddd;
                                                                                                                                                                                                                                                                                      padding:20px;
                                                                                                                                                                                                                                                                                            margin:20px;
                                                                                                                                                                                                                                                                                                  border-radius:10px;
                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                          button{
                                                                                                                                                                                                                                                                                                                padding:10px 20px;
                                                                                                                                                                                                                                                                                                                      border:none;
                                                                                                                                                                                                                                                                                                                            background:#222;
                                                                                                                                                                                                                                                                                                                                  color:white;
                                                                                                                                                                                                                                                                                                                                        cursor:pointer;
                                                                                                                                                                                                                                                                                                                                              border-radius:5px;
                                                                                                                                                                                                                                                                                                                                                    margin-top:10px;
                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                            button:hover{
                                                                                                                                                                                                                                                                                                                                                                  background:#555;
                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                          footer{
                                                                                                                                                                                                                                                                                                                                                                                background:#222;
                                                                                                                                                                                                                                                                                                                                                                                      color:white;
                                                                                                                                                                                                                                                                                                                                                                                            text-align:center;
                                                                                                                                                                                                                                                                                                                                                                                                  padding:20px;
                                                                                                                                                                                                                                                                                                                                                                                                        margin-top:20px;
                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                              </style>
                                                                                                                                                                                                                                                                                                                                                                                                              </head>

                                                                                                                                                                                                                                                                                                                                                                                                              <body>

                                                                                                                                                                                                                                                                                                                                                                                                                <header>
                                                                                                                                                                                                                                                                                                                                                                                                                    <