document.addEventListener('DOMContentLoaded', () => {
  // Lista de alunos com suas respectivas notas por trimestre
  const alunos = [
    { nome: "Lucas Andrade", turma: "9º A", notas: [8.5, 7.0, 9.0] },
    { nome: "Mariana Silva", turma: "9º A", notas: [6.0, 5.5, 6.5] },
    { nome: "Gabriel Souza", turma: "9º B", notas: [9.5, 8.5, 9.0] },
    { nome: "Beatriz Lima", turma: "9º B", notas: [4.0, 5.0, 4.5] },
    { nome: "Rafael Costa", turma: "9º A", notas: [7.0, 7.5, 8.0] }
  ];

  // Configuração da nota mínima de aprovação
  const MEDIA_APROVACAO = 7.0;
  const MEDIA_RECUPERACAO = 5.0;

  // Função para calcular a média
  function calcularMedia(notas) {
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return (soma / notas.length).toFixed(1);
  }

  // Função para determinar a situação escolar
  function obterSituacao(media) {
    if (media >= MEDIA_APROVACAO) {
      return { status: "Aprovado", classeCSS: "aprovado" };
    } else if (media >= MEDIA_RECUPERACAO) {
      return { status: "Recuperação", classeCSS: "recuperacao" };
    } else {
      return { status: "Reprovado", classeCSS: "reprovado" };
    }
  }

  // Função para renderizar a tabela na tela
  function exibirBoletim() {
    const tabelaBody = document.querySelector('#tabela-alunos tbody');
    if (!tabelaBody) return;

    tabelaBody.innerHTML = '';

    alunos.forEach((aluno) => {
      const media = calcularMedia(aluno.notas);
      const situacao = obterSituacao(media);

      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.turma}</td>
        <td>${media}</td>
        <td><span class="status ${situacao.classeCSS}">${situacao.status}</span></td>
      `;

      tabelaBody.appendChild(linha);
    });
  }

  // Função para filtrar apenas os aprovados no console
  function listarAprovadosConsole() {
    const aprovados = alunos.filter((aluno) => calcularMedia(aluno.notas) >= MEDIA_APROVACAO);
    
    console.log("--- LISTA DE ALUNOS APROVADOS ---");
    aprovados.forEach(aluno => {
      console.log(`Aluno: ${aluno.nome} | Média: ${calcularMedia(aluno.notas)}`);
    });
  }

  // Executa as funções ao carregar a página
  exibirBoletim();
  listarAprovadosConsole();
});