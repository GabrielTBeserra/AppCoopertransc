import IVez from '../types/IVez';

const Classify = (data: Array<IVez>) => {
  let counterTs = 0;
  let counterCs = 0;
  let counterCvb = 0;

  const teste = data.map(x => {
    let tipo = '';
    if (x.tipo_veiculo === 'CVB') {
      tipo = 'CVB';
    } else if (x.tipo_veiculo === 'CS' || x.tipo_veiculo === 'CV') {
      tipo = 'CS';
    } else if (x.tipo_veiculo === 'TS' || x.tipo_veiculo === 'TB') {
      tipo = 'TS';
    }

    if (tipo === 'TS') {
      counterTs += 1;
      x.posicao = counterTs;
    } else if (tipo === 'CS') {
      counterCs += 1;
      x.posicao = counterCs;
    } else if (tipo === 'CVB') {
      counterCvb += 1;
      x.posicao = counterCvb;
    }

    return x;
  });

  return teste;
};

export default Classify;
