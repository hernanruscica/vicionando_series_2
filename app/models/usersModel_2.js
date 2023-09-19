//const pool = require('../models/connection_db_2');
const mysql2 = require('mysql2/promise');

// Configurar el pool de conexiones
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // Esperar si todas las conexiones están en uso
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0 // Cola de conexiones ilimitada
});



module.exports = {
    
    getAll: async () => {
        //conn.query(`SELECT * FROM users`, myFunction);
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - getAll");
        try {
            const [rows, fields] = await connection.execute(`SELECT * FROM users`);            
            //console.log(rows)
            return rows;
        }catch (error){
            //console.error(error);
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
    },
    getByField: async (field, value) => {
        //conn.query(`SELECT * FROM users WHERE ${field} LIKE '%${value}%'`, myFunction);
        const connection = await pool.getConnection();        
        console.log("abierta la conexion con el pool de datos - getByField");
        try {
            const [rows, fields] = await connection.execute(`SELECT * FROM users WHERE ${field} LIKE '%${value}%'`);            
            return rows;
        }catch (error){
            //console.error(error);
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }

    },/**/
    getByFieldStrict: async (field, value) => {
        //conn.query(`SELECT * FROM users WHERE ${field} = '${value}'`, myFunction);
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - getByFieldStrict");
        try {
            const [rows, fields] = await connection.execute(`SELECT * FROM users WHERE ${field} = '${value}'`);            
            return rows;
        }catch (error){
            //console.error(error);
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
        
    },
    getById: async (id) => {
        //conn.query(`SELECT * FROM users WHERE id = '${id}'`, myFunction);
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - getById");
        try {
            const [rows, fields] = await connection.execute(`SELECT * FROM users WHERE id = '${id}'`);
            return rows;
        } catch (error){
            //console.error(error);
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
    },
    insert: async (data) => {        
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - insert");

        try {
            const [rows, fields] = await connection.execute(`INSERT INTO users (name, email, password, roles_id, photos_id, real_name, birthday, palettes_id)         
            VALUES ('${data.name}', '${data.email}', '${data.password}', ${data.roles_id}, ${data.photos_id}, '${data.real_name}', '${data.birthday}', ${data.palettes_id})`);
            console.log(`Rows affeted: ${rows.affectedRows}`);
            return rows;
        } catch (error){
            //console.error(error);            
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
    },
    update: async (data, id) => {        
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - insert");
        try {
            const [rows, fields] = await connection.execute(`UPDATE users SET 
                        name = '${data.name}', 
                        email = '${data.email}',
                        password = '${data.password}',
                        roles_id = ${data.roles_id},
                        photos_id = ${data.photos_id},
                        real_name= '${data.real_name}',  
                        birthday = '${data.birthday}', 
                        palettes_id = ${data.palettes_id}
            WHERE id = ${id};`);
            console.log(`Rows affeted: ${rows.affectedRows}`);
            return rows;
        } catch (error){
            //console.error(error);            
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
    },
    delete: async (id) => {
        //conn.query(`DELETE FROM users WHERE id = ${id};`, myFunction)
        const connection = await pool.getConnection();
        console.log("abierta la conexion con el pool de datos - insert");

        try {
            const [rows] = await connection.execute(`DELETE FROM users WHERE id = ${id};`);
            console.log(`Rows affeted: ${rows.affectedRows}`);
            return rows;
        } catch (error){
            //console.error(error);            
            throw error;
        } finally {
            connection.release(); // Liberar la conexión de vuelta al pool cuando hayas terminado
            console.log("cerrada la conexion con el pool de datos");
        }
    }
}