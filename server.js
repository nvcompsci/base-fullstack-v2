const express = require('express')
const app = new express()

//server contents of public folder on GET /(root)
app.use(express.static('public'))
//parse incoming data as JSON
app.use(express.json())

app.get("/items", (req,res) => {
    res.send([{name:"Penut Butter"}])
})

app.listen(3000,() => console.log('Server started'))