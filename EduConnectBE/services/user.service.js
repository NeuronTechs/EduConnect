const db = require('../config/connectDB')

const login = async (username, password) => {
    try {
        const query = 'SELECT * FROM user WHERE username = ? and password = ?';
        return new Promise((resolve, reject) => {
            db.connectionDB.query(query, [username, password], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ results });
            });
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    login
};