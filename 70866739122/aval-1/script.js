// 🌐 GERADOR DE IDENTIDADE DIGITAL ALEATÓRIA

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function gerarIdentidade() {
  const nomes = ["Luna", "Kai", "Neo", "Aria", "Zion", "Mira", "Orion", "Nina"];
  const sobrenomes = ["Silva", "Costa", "Reis", "Almeida", "Souza", "Lima", "Ferreira"];
  const domínios = ["techwave.com", "neonmail.io", "cyberlink.net", "quantum.ai"];
  const cidades = ["São Paulo", "Teresina", "Rio de Janeiro", "Recife", "Salvador"];

  const base = Date.now().toString() + Math.random().toString();
  const seed = hashCode(base);

  const nome = pick(nomes, seed);
  const sobrenome = pick(sobrenomes, seed * 2);
  const idade = 18 + (seed % 30);
  const cidade = pick(cidades, seed * 3);
  const email = `${nome.toLowerCase()}.${sobrenome.toLowerCase()}@${pick(domínios, seed)}`;

  return {
    id: seed,
    nomeCompleto: `${nome} ${sobrenome}`,
    idade,
    cidade,
    email,
    assinaturaDigital: btoa(nome + sobrenome + seed)
  };
}

// 👇 EXECUÇÃO
const perfil = gerarIdentidade();
console.log("🆔 PERFIL GERADO:");
console.table(perfil);