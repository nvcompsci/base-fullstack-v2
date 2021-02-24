const express = require('express')
const app = new express()
const sqlite3 = require('sqlite3')
//connect to database
const db = new sqlite3.Database('store.db')

//server contents of public folder on GET /(root)
app.use(express.static('public'))
//parse incoming data as JSON
app.use(express.json())

app.get("/items", (req,res) => {
    //query database, rows is array of results from query
    db.all('SELECT * FROM items',(err,rows) => {
        //respond to client with results from database
        res.send(rows)
    })
})

app.post("/login", (req, res) => {
    //pull out user object from client request
    const {user} = req.body
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?"
    db.get(sql, [user.username, user.password],(err, row) => {
        const payload = {
            id: row.id,
            loginTimestamp: Date.now().toString()
        }
        res.send(payload)
    })
})

app.post("/users", (req, res) => {
    const {user} = req.body
    if (user.username && user.password) {
        const sql = "INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)"
        db.run(sql,[user.username, user.password, user.firstName, user.lastName],(err)=>{
            const payload = {
                id: this.lastID
            }
            res.send(payload)
        })
    }
})

app.listen(3000,() => console.log('Server started'))