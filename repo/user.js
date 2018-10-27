
let user = {
    userId: '',
    password: '',  
    type: '',
    email: '',
    address: '',
    pubkey: '',
};

user.setData = (userId, password, type, email, address, pubkey) => {
    user.userId = userId;
    user.password = password;
    user.type = type;
    user.email = email;
    user.address = address;
    user.pubkey = pubkey;
};

user.getUser = () => { return user; };

module.exports = user;