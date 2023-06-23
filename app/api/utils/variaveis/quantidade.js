let quantidadeAtualPrioridade = 1;
let quantidadeAtualGeral = 1;
let quantidadeAtualExame = 1;

module.exports = {
  getQuantidadeAtual: (tipoSenha) => {
    switch (tipoSenha) {
      case 'SP':
        return quantidadeAtualPrioridade;
      case 'SG':
        return quantidadeAtualGeral;
      case 'SE':
        return quantidadeAtualExame;
      default:
        throw new Error(`Tipo de senha ${tipoSenha} não reconhecida. Utilize: SG para senha geral, SP para senha preferêncial, SE para senha de exame`);
    }
  },
  setQuantidadeAtual: (tipoSenha) => {
    switch (tipoSenha) {
      case 'SP':
        if (quantidadeAtualPrioridade === 99) quantidadeAtualPrioridade = 0;
        quantidadeAtualPrioridade += 1;

        break;
      case 'SG':
        if (quantidadeAtualGeral === 99) quantidadeAtualGeral = 0;
        quantidadeAtualGeral += 1;

        break;
      case 'SE':
        if (quantidadeAtualExame === 99) quantidadeAtualExame = 0;
        quantidadeAtualExame += 1;
        break;
      default:
        throw new Error(`Tipo de senha ${tipoSenha} não reconhecida. Utilize: SG para senha geral, SP para senha preferêncial, SE para senha de exame`);
    }
  },
};
