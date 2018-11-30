const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3000
const nm = require('./nodemailer.js')
const formidable = require('express-formidable')

app.use(morgan('combined'))
app.use(formidable())

app.get('/', (req, res, next) => {
    next({ error: 'Thanks connecting! An email operator will assist you on connection to a proper route.'})
})
app.get('/contact', (req, res, next) => {
    next({ error: "Wait a sec, how did you GET in here?!" , status: 405 })
})
app.post('/contact', (req, res, next) => {
    console.log(req.fields)
    if (!req.fields) next({ error: "Where's my data at?" })
    nm.sendMail(req.fields)
    res.json({ message: 'sending mail...?' })
})


app.use((req, res, next) => {
    next({ error: 'Nothing here... Soz.', status: 400 })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.error)
})

const listener = ()=> console.log(`Email Party on Port ${port}`)
app.listen(port, listener)
