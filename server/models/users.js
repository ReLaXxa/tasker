module.exports = {
    getAllUsers(db) {
        const sql = "select * from users";
        const params = [];
        return db.all(sql, params);
    },
    getUserById(db, userId) {
        const sql = "select * from users where id = $1"
        let params = [userId]
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    },
    setNewUser(db, userId) {
        const sql = "select * from users where id = $1"
        let params = [userId]
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    }
}