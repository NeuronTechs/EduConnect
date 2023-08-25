const db = require('../config/connectDB');
const login = async (username, password) => {
    try {
        const query = 'SELECT * FROM user WHERE username = ? and password = ?';
        return await db.connectionDB.query(query, [username, password], (error, results, fields) => {
            if (error) {
                console.log(error)
                return;
            } else {
                console.log(results)
                return results
            }
        })?.values  
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
    login
};