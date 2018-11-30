const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3000
const nm = require('./nodemailer.js')

// app.use(require('body-parser').json());
// app.use(express.urlencoded())
app.use(morgan('combined'))

app.get('/', (req, res, next) => {
    next({ error: 'Thanks connecting! An email operator will assist you on connection to a proper route.'})
})

app.post('/contact', (req, res, next) => {
    console.log(req.body)
    // nm.sendMail()
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
