// 1. Cria um elemento do tipo <style>
const styleSheet = document.createElement("style");

// 2. Define o conteúdo CSS dentro da tag
styleSheet.type = "text/css";
styleSheet.innerText = `
  .meu-botao-dinamico {
    background-color: #2563eb;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .meu-botao-dinamico:hover {
    background-color: #1d4ed8;
  }
`;

// 3. Adiciona a tag <style> dentro do <head> do documento HTML
document.head.appendChild(styleSheet);
