const bcrypt = require('bcrypt');
const myPassword = 'somepassword';
const saltRounds = 10;

async function saveEncryptedPassword() {
    try {
        const encryptedPassword = await bcrypt.hash(myPassword, saltRounds);
        console.log('Password saved as: ', encryptedPassword)
    }
    catch (err) {
        console.log(err);
    };
}

async function LogDecryptedPassword(password) {
    const encryptedPassword = await bcrypt.hash(myPassword, saltRounds);
    try {
        const match = await bcrypt.compare(password, encryptedPassword);
        if(match){
            console.log('You typed in the right password!')
        }
        else if(!match){
            console.log('False Password. Try again!')
        }
    }
    catch (err) {
        console.log(err);
    }
}


LogDecryptedPassword('SOMEPASSWORD'.toLowerCase())