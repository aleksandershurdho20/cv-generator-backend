const bcrypt = require('bcrypt')
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, success) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(success);
                }
            });
        });
    });
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};


module.exports = {
    hashPassword,
    comparePassword
}