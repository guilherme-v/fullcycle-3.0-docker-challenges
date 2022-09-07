const express = require('express')
const app = express()
const port = 8080
const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'pass',
    database: 'nodedb'
};

const mysql = require('mysql2')

const createDbConnection = () =>  mysql.createConnection(dbConfig)

const seedDb = () => {
    const conn = createDbConnection()
    conn.query("CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));")
    conn.query("INSERT INTO people (name) values ('Guilherme'), ('Milena'), ('Docker'), ('Full Cycle 3.0');")
    conn.end()
}

app.get('/', (_req, res) => {
    const conn = createDbConnection()
    conn.query("SELECT * FROM people", function (err, result, _fields) {
        if (err) throw err;
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <ul>
              ${result.map(p => `<li>${p.name}</li>`).join('')}
            </ul>
        `)
        conn.end()
    });
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
    seedDb()
})
