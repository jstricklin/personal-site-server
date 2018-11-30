const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3000
const nm = require('./nodemailer.js')
const cors = require('cors')

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.get('/', (req, res, next) => {
    next({ error: 'Thanks connecting! An email operator will assist you on connection to a proper route.'})
})

app.get('/contact', (req, res, next) => {
    next({ error: "Wait a sec, how did you GET in here?!" , status: 405 })
})

app.post('/contact', (req, res, next) => {
    console.log(req.body)
    if (!req.body) next({ error: "Where's my data at?" })
    else {
        nm.sendMail(req.body)
        res.json({ message: 'sending mail...?' })
    }
})

app.use((req, res, next) => {
    next({ error: 'Nothing here... Soz.', status: 400 })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.error)
})

const listener = ()=> console.log(`Email Party on Port ${port}`)
app.listen(port, listener)
