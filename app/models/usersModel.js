module.exports = {
    getAll: (conn, myFunction) => {
        conn.query(`SELECT * FROM users`, myFunction);
    }
}