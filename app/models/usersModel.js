module.exports = {
    getAll: (conn, myFunction) => {
        conn.query(`SELECT * FROM users`, myFunction);
    },
    getByField: (field, value, conn, myFunction) => {
        conn.query(`SELECT * FROM users WHERE ${field} = '${value}'`, myFunction);
    },
    getById: (id, conn, myFunction) => {
        conn.query(`SELECT * FROM users WHERE id = '${id}'`, myFunction);
    },
    insert: (data, conn, myFunction) => {
        conn.query(`INSERT INTO users (name, email, password, roles_id, photos_id, real_name, birthday, palettes_id) 
        VALUES ('${data.name}', '${data.email}', '${data.password}', '${data.roles_id}', '${data.photos_id}', '${data.real_name}', '${data.birthday}', '${data.palettes_id}')`, myFunction)
    }
}