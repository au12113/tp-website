const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.DB_URI,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
    database: process.env.DB_NAME,
    socketTimeout: 15000,
    connectTimeout: 30000
})

const query = async (qString) => {
    let conn, result
    try {
        conn = await pool.getConnection()
        result = await conn.query(qString)
    } catch (err) {
        console.log(err)
        result = err
    } finally {
        if (conn) conn.end()
        return result
    }
}

module.exports = { query }