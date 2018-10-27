
let reqDna = {
    generalUserId: '',
    agencyUserId: '',
    dogDna: '',
    isDone: '',
    tx: '',
    email: '',
    regNo: '',
    link: ''
};

reqDna.setData = (generalUserId, agencyUserId, dogDna, isDone, tx, email, regNo, link) => {
    reqDna.generalUserId = generalUserId;
    reqDna.agencyUserId = agencyUserId;
    reqDna.dogDna = dogDna;
    reqDna.isDone = isDone;
    reqDna.tx = tx;
    reqDna.email = email;
    reqDna.regNo = regNo;
    reqDna.link = link;
};

module.exports = reqDna;