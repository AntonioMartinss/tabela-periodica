
const elementos = {
    1: 'Hidrogênio',
    2: 'Hélio',
    3: 'Lítio',
    4: 'Berílio',
    5: 'Boro',
    6: 'Carbono',
    7: 'Nitrogênio',
    8: 'Oxigênio',
    9: 'Flúor',
    10: 'Neônio',
    11: 'Sódio',
    12: 'Magnésio',
    13: 'Alumínio',
    14: 'Silício',
    15: 'Fósforo',
    16: 'Enxofre',
    17: 'Cloro',
    18: 'Argônio',
    19: 'Potássio',
    20: 'Cálcio',
    21: 'Escândio',
    22: 'Titânio',
    23: 'Vanádio',
    24: 'Cromo',
    25: 'Manganês',
    26: 'Ferro',
    27: 'Cobalto',
    28: 'Níquel',
    29: 'Cobre',
    30: 'Zinco',
    31: 'Gálio',
    32: 'Germanio',
    33: 'Arsênio',
    34: 'Selênio',
    35: 'Bromo',
    36: 'Kriptônio',
    37: 'Rubídio',
    38: 'Estrôncio',
    39: 'Ítrio',
    40: 'Zircônio',
    41: 'Nióbio',
    42: 'Molibdênio',
    43: 'Tecnécio',
    44: 'Rutênio',
    45: 'Ródio',
    46: 'Paládio',
    47: 'Prata',
    48: 'Cádmio',
    49: 'Índio',
    50: 'Estanho',
    51: 'Antimônio',
    52: 'Telúrio',
    53: 'Iodo',
    54: 'Xenônio',
    55: 'Césio',
    56: 'Bário',
    57: 'Lantânio',
    58: 'Cério',
    59: 'Praseodímio',
    60: 'Neodímio',
    61: 'Promécio',
    62: 'Samário',
    63: 'Európio',
    64: 'Gadolínio',
    65: 'Térbio',
    66: 'Disprósio',
    67: 'Hólmio',
    68: 'Erbio',
    69: 'Túlio',
    70: 'Ítrio',
    71: 'Lutécio',
    72: 'Háfnio',
    73: 'Tântalo',
    74: 'Tungstênio',
    75: 'Rênio',
    76: 'Ósmio',
    77: 'Irídio',
    78: 'Platina',
    79: 'Ouro',
    80: 'Mercúrio',
    81: 'Tálio',
    82: 'Chumbo',
    83: 'Bismuto',
    84: 'Polônio',
    85: 'Astato',
    86: 'Radônio',
    87: 'Frâncio',
    88: 'Rádio',
    89: 'Actínio',
    90: 'Tório',
    91: 'Protactínio',
    92: 'Urânio',
    93: 'Netúnio',
    94: 'Plutônio',
    95: 'Amerício',
    96: 'Cúrio',
    97: 'Berkélio',
    98: 'Califórnio',
    99: 'Einsteínio',
    100: 'Férmio',
    101: 'Mendelevio',
    102: 'Nobelio',
    103: 'Laurêncio',
    104: 'Rutherfórdio',
    105: 'Dúbnio',
    106: 'Seabórgio',
    107: 'Bóhrio',
    108: 'Hássio',
    109: 'Meitnério',
    110: 'Darmstádtio',
    111: 'Roentgênio',
    112: 'Copernício',
    113: 'Nihônio',
    114: 'Fleróvio',
    115: 'Moscóvio',
    116: 'Livermório',
    117: 'Tenessino',
    118: 'Oganessônio'
};

function calcularDistribuicao() {
    const numeroAtomico = parseInt(document.querySelector('#numeroAtomico').value);
    if (numeroAtomico < 1 || numeroAtomico > 118 || numeroAtomico === '') {
        document.querySelector('#resultado').innerHTML = ` Número Atômico inválido. Valores entre 1 e 118.`;
        return;
    }

    const subniveis = [
        { notacao: '1s', max: 2 },
        { notacao: '2s', max: 2 },
        { notacao: '2p', max: 6 },
        { notacao: '3s', max: 2 },
        { notacao: '3p', max: 6 },
        { notacao: '4s', max: 2 },
        { notacao: '3d', max: 10 },
        { notacao: '4p', max: 6 },
        { notacao: '5s', max: 2 },
        { notacao: '4d', max: 10 },
        { notacao: '5p', max: 6 },
        { notacao: '6s', max: 2 },
        { notacao: '4f', max: 14 },
        { notacao: '5d', max: 10 },
        { notacao: '6p', max: 6 },
        { notacao: '7s', max: 2 },
        { notacao: '5f', max: 14 },
        { notacao: '6d', max: 10 },
        { notacao: '7p', max: 6 }
    ];

    let distribuicao = [];
    let restante = numeroAtomico;

    for (let i = 0; i < subniveis.length && restante > 0; i++) {
        let numEl = Math.min(subniveis[i].max, restante);
        distribuicao.push({ subnivel: subniveis[i].notacao, numero: numEl });
        restante -= numEl;
    }

    const camadaValencia = calculaCamadaValencia(distribuicao);
    const subnivelEnergetico = calculaSubnivelMaisEnergetico(distribuicao);
    const nomeElemento = elementos[numeroAtomico] || 'Desconhecido';

    document.querySelector('#resultado').innerHTML = `
        <p>Elemento Químico: ${nomeElemento}</p>
        <p>Distribuição Eletrônica: ${distribuicao.map(d => `${d.subnivel}${d.numero}`).join(' ')}</p>
        <p>Camada de Valência: ${camadaValencia}</p>
        <p>Nº de Elétrons na Camada de Valência: ${calculaNumeroEletrons(camadaValencia, distribuicao)}</p>
        <p>Subnível Mais Energético: ${subnivelEnergetico.subnivel}</p>
        <p>Nº de Elétrons no Subnível Mais Energético: ${subnivelEnergetico.numero}</p>
    `;
}
function calculaCamadaValencia(distribuicao) {
    let camadaValencia = '';
    for (let i = distribuicao.length - 1; i >= 0; i--) {
        const subnivel = distribuicao[i].subnivel;
        const camada = subnivel.slice(0, subnivel.search(/\D/));
        if (camadaValencia === '' || camada > camadaValencia) {
            camadaValencia = camada;
        }
    }
    return camadaValencia;
}

function calculaNumeroEletrons(camadaValencia, distribuicao) {
    const eletronsCamadaValencia = distribuicao.filter(subnivel => subnivel.subnivel.startsWith(camadaValencia));
    if (eletronsCamadaValencia.length > 0) {
        return eletronsCamadaValencia.reduce((total, subnivel) => total + subnivel.numero, 0);
    }
    return 0;
}

function calculaSubnivelMaisEnergetico(distribuicao) {
    return distribuicao[distribuicao.length - 1];
}
