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

const getUserProfileInfo = (requestedId) => {
    return new Promise(function(resolve, reject) {
        const q = 'SELECT * FROM userinfo WHERE id = $1;';
        const params = [requestedId];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getManyProfileSummaries = (arrayOfIds) => {
    return new Promise(function(resolve, reject) {
        let counter = 0, profileSummaries = [];
        for (var i = 0; i < arrayOfIds.length; i++) {
            getUserProfileInfo(arrayOfIds[i]).then((infoResults) => {
                profileSummaries.push({
                    id: infoResults.rows[0].id,
                    userUrl: `/user/${infoResults.rows[0].id}`,
                    name: `${infoResults.rows[0].firstname} ${infoResults.rows[0].lastname}`,
                    imageUrl: infoResults.rows[0].ppurl
                });
                counter++;
                if (counter == arrayOfIds.length) {
                    resolve(profileSummaries);
                }
            }).catch((err) => {
                reject(err);
            });
        }
    });
};

const saveImageUrlToDb = (file, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE userinfo SET ppurl = $1 WHERE id = $2 RETURNING ppurl;';
        const params = [`/uploads/${file.filename}`, session.userId];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const updateUserAbout = (aboutText, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE userinfo SET about = $1 WHERE id = $2 RETURNING about;';
        const params = [aboutText, session.userId];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const updateUserLocation = (locationText, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE userinfo SET location = $1 WHERE id = $2 RETURNING location;';
        const params = [locationText, session.userId];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getAllUserNames = () => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT firstname, lastname, id FROM userinfo;';
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getUserInfo = getUserInfo;
module.exports.hashPass = hashPass;
module.exports.checkPass = checkPass;
module.exports.registerNewUser = registerNewUser;
module.exports.getUserProfileInfo = getUserProfileInfo;
module.exports.getManyProfileSummaries = getManyProfileSummaries;
module.exports.updateUserAbout = updateUserAbout;
module.exports.updateUserLocation = updateUserLocation;
module.exports.saveImageUrlToDb = saveImageUrlToDb;
module.exports.getAllUserNames = getAllUserNames;
