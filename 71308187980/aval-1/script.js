import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    Keyboard.dismiss();

    const p = Number(peso.replace(',', '.'));
    const a = Number(altura.replace(',', '.'));
    const i = Number(idade);

    if (!peso || !altura || !idade || !sexo) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de calcular.'
      );
      return;
    }

    if (
      !Number.isFinite(p) ||
      !Number.isFinite(a) ||
      !Number.isInteger(i) ||
      p <= 0 ||
      a <= 0 ||
      i < 1 ||
      i > 120 ||
      p > 500 ||
      a > 2.8
    ) {
      Alert.alert(
        'Dados inválidos',
        'Informe peso, altura e idade válidos. A altura deve ser em metros.'
      );
      return;
    }

    const imc = p / (a * a);

    let classificacao = '';
    let mensagem = '';
    let cor = '';

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      mensagem = 'Seu IMC está abaixo da faixa de referência para adultos.';
      cor = '#3498DB';
    } else if (imc < 25) {
      classificacao = 'Peso normal';
      mensagem = 'Seu IMC está dentro da faixa de referência para adultos.';
      cor = '#27AE60';
    } else if (imc < 30) {
      classificacao = 'Sobrepeso';
      mensagem = 'Seu IMC está acima da faixa de referência para adultos.';
      cor = '#F39C12';
    } else if (imc < 35) {
      classificacao = 'Obesidade grau I';
      mensagem = 'Seu resultado merece atenção e avaliação profissional.';
      cor = '#E67E22';
    } else if (imc < 40) {
      classificacao = 'Obesidade grau II';
      mensagem = 'É recomendável procurar orientação de um profissional de saúde.';
      cor = '#E74C3C';
    } else {
      classificacao = 'Obesidade grau III';
      mensagem = 'Procure acompanhamento de um profissional de saúde.';
      cor = '#C0392B';
    }

    setResultado({
      imc: imc.toFixed(2),
      classificacao,
      mensagem,
      cor,
    });
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setIdade('');
    setSexo('');
    setResultado(null);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#101827"
        barStyle="light-content"
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>⚖️</Text>
          <Text style={styles.titulo}>Calculadora de IMC</Text>
          <Text style={styles.subtitulo}>
            Descubra seu Índice de Massa Corporal
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Seus dados</Text>

          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 70.5"
            placeholderTextColor="#929BAA"
            keyboardType="decimal-pad"
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={styles.label}>Altura (metros)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1.75"
            placeholderTextColor="#929BAA"
            keyboardType="decimal-pad"
            value={altura}
            onChangeText={setAltura}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 25"
            placeholderTextColor="#929BAA"
            keyboardType="number-pad"
            value={idade}
            onChangeText={setIdade}
          />

          <Text style={styles.label}>Sexo</Text>

          <View style={styles.sexoContainer}>
            <TouchableOpacity
              style={[
                styles.sexoBotao,
                sexo === 'Masculino' && styles.sexoSelecionado,
              ]}
              onPress={() => setSexo('Masculino')}
            >
              <Text style={styles.sexoTexto}>Masculino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sexoBotao,
                sexo === 'Feminino' && styles.sexoSelecionado,
              ]}
              onPress={() => setSexo('Feminino')}
            >
              <Text style={styles.sexoTexto}>Feminino</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.calcularBotao}
            onPress={calcularIMC}
          >
            <Text style={styles.calcularTexto}>
              CALCULAR MEU IMC
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.limparBotao}
            onPress={limpar}
          >
            <Text style={styles.limparTexto}>
              Limpar dados
            </Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.resultadoCard}>
            <Text style={styles.resultadoTitulo}>
              Seu resultado
            </Text>

            <Text style={styles.imcNumero}>
              {resultado.imc}
            </Text>

            <View
              style={[
                styles.classificacao,
                { backgroundColor: resultado.cor },
              ]}
            >
              <Text style={styles.classificacaoTexto}>
                {resultado.classificacao}
              </Text>
            </View>

            <Text style={styles.mensagem}>
              {resultado.mensagem}
            </Text>

            <View style={styles.divisor} />

            <Text style={styles.tabelaTitulo}>
              Classificação do IMC
            </Text>

            {[
              ['Abaixo do peso', 'Menor que 18,5'],
              ['Peso normal', '18,5 a 24,9'],
              ['Sobrepeso', '25 a 29,9'],
              ['Obesidade grau I', '30 a 34,9'],
              ['Obesidade grau II', '35 a 39,9'],
              ['Obesidade grau III', '40 ou mais'],
            ].map((item, index) => (
              <View key={index} style={styles.linhaTabela}>
                <Text style={styles.tabelaTexto}>
                  {item[0]}
                </Text>
                <Text style={styles.tabelaValor}>
                  {item[1]}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitulo}>
            💡 O que é o IMC?
          </Text>
          <Text style={styles.infoTexto}>
            O Índice de Massa Corporal é uma medida utilizada
            para relacionar o peso e a altura de uma pessoa.
            Ele é calculado dividindo o peso pela altura ao
            quadrado.
          </Text>

          <Text style={styles.formula}>
            IMC = Peso ÷ (Altura × Altura)
          </Text>
        </View>

        <Text style={styles.rodape}>
          Desenvolvido com ❤️
        </Text>

        <Text style={styles.aviso}>
          Esta calculadora utiliza faixas de referência para
          adultos. O IMC não é um diagnóstico médico e não
          substitui uma avaliação profissional. Para crianças,
          adolescentes e gestantes, a interpretação é diferente.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101827',
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 30,
  },

  logo: {
    fontSize: 55,
    marginBottom: 10,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#AAB4C5',
    fontSize: 14,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
  },

  cardTitulo: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#334155',
    color: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#475569',
  },

  sexoContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },

  sexoBotao: {
    flex: 1,
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },

  sexoSelecionado: {
    backgroundColor: '#2563EB',
    borderColor: '#60A5FA',
  },

  sexoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  calcularBotao: {
    backgroundColor: '#2563EB',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },

  calcularTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  limparBotao: {
    padding: 13,
    alignItems: 'center',
    marginTop: 5,
  },

  limparTexto: {
    color: '#94A3B8',
    fontSize: 14,
  },

  resultadoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
    marginTop: 22,
    alignItems: 'center',
  },

  resultadoTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  imcNumero: {
    color: '#FFFFFF',
    fontSize: 55,
    fontWeight: 'bold',
    marginVertical: 15,
  },

  classificacao: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 30,
  },

  classificacaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  mensagem: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },

  divisor: {
    height: 1,
    backgroundColor: '#475569',
    width: '100%',
    marginVertical: 22,
  },

  tabelaTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  linhaTabela: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  tabelaTexto: {
    color: '#CBD5E1',
    fontSize: 13,
  },

  tabelaValor: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginTop: 22,
  },

  infoTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  infoTexto: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 23,
  },

  formula: {
    color: '#60A5FA',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
  },

  rodape: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 13,
  },

  aviso: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
  },
});
