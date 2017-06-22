const spicedPg = require('spiced-pg');
var db = spicedPg('postgres:postgres:postgres@localhost:5432/cochef');
var bcrypt = require('bcryptjs');

const getUserInfo = (userInfo) => {
    return new Promise(function(resolve, reject) {
        const q = 'SELECT * FROM userinfo WHERE email = $1;';
        const params = [userInfo.email];
        db.query(q, params).then(function(results) {
            console.log('results from getUserInfo', results.rows);
            resolve(results.rows);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const hashPass = (password) => {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
};

const checkPass = (enteredPass, hashedPass) => {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(enteredPass, hashedPass, function(err, pwMatches) {
            if (err) {
                reject(err);
            } else {
                resolve(pwMatches);
            }
        });
    });
};

const registerNewUser = (newUserInfo) => {
    return new Promise(function(resolve, reject) {
        const q = 'INSERT INTO userinfo (firstname, lastname, email, hashedpass) VALUES ($1, $2, $3, $4) RETURNING *;';
        const params = [newUserInfo.firstname, newUserInfo.lastname, newUserInfo.email, newUserInfo.hashedpass];
        db.query(q, params).then(function(results) {
            resolve(results);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getUserProfileInfo = () => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT firstname, lastname, email FROM userinfo;';
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

// const getRecipe;
// const searchRecipe;

const getTypeofGood = () => {
    return new Promise((resolve, reject) => {
        // const q = 'SELECT * FROM typeofgood;';
        const q = 'SELECT * FROM typeofgood JOIN goods ON goods.typeofgood_id = typeofgood.typeofgood_id;';
        db.query(q, []).then((result) => {
            resolve(result.rows);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getNameofGood = () => {
    return new Promise((resolve, reject) => {
        const q = `SELECT good_id, good_name, typeofgood_name
        FROM goods
        JOIN typeofgood
        ON goods.typeofgood_id = typeofgood.typeofgood_id;`;
        db.query(q, []).then((result) => {
            resolve(result.rows);
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveImageUrlToDb = (file, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE recipe SET imgurl = $1 WHERE id = $2 RETURNING ppurl;';
        const params = [`/uploads/${file.filename}`, session.userId];
        db.query(q, params).then(function(result) {
            // MATT SAID THIS PROBABLY NEEDS TO BE result.rows
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

module.exports.getUserInfo = getUserInfo;
module.exports.hashPass = hashPass;
module.exports.checkPass = checkPass;
module.exports.registerNewUser = registerNewUser;
module.exports.getUserProfileInfo = getUserProfileInfo;
module.exports.getTypeofGood = getTypeofGood;
module.exports.getNameofGood = getNameofGood;
module.exports.saveImageUrlToDb = saveImageUrlToDb;
