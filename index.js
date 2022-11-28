const express = require('express')
const mysql = require('mysql')

const server = express()

const config = {
  host: 'fc3_database',
  user: 'root',
  password: 'root',
  database: 'nodeDatabase',
}

const connection = mysql.createConnection(config)

connection.query('CREATE TABLE IF NOT EXISTS users (id int not null auto_increment, name varchar(255), primary key (id))')

server.get('/', function (_, res) {
  const randomName = Math.random().toString(36).substring(7)

  connection.query(`INSERT INTO users(name) values("${randomName}")`)

  connection.query('SELECT * FROM users', function (err, result) {
    if (err) console.log(err)

    const html = result.map(user => `<li>${user.name}</li>`).join('')

    res.send('<h1>Full Cycle Rocks!</h1><ul>' + html + '</ul>')
  })
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
