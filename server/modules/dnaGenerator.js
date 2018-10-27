const DNA_LATTERS = ['A', 'T', 'C', 'G'];
const dnaGen = {};

dnaGen.generateRandomDNA = (size) => {
    let dnaLength = parseInt(size, 10);
    if(dnaLength == NaN || dnaLength == undefined || dnaLength == null){
        return '';
    }

    if(dnaLength <= 0){
        return '';
    }

    let dna = '';
    for(let i=0; i<dnaLength; i++){
        dna += DNA_LATTERS[Math.floor(Math.random() * 10) % 4];
    }
    return dna;
};

module.exports = dnaGen;    