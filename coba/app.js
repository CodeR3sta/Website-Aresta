const express = require('express')

const app = express()

app.use(express.static('publc'))


app.get('/', (req, res) => ,mv{
    res.sendFile('index')
})


app.listen(3000, () => {
    console.log('listening in port 3000..')
})