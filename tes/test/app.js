const express = require('express');
const path = require('path')

const App = express();

const port = 3000

App.listen(port, () => {
    console.log(`server is listening on ${port}`)
})


App.use((req,res,next) => {
    console.dir(req.method)
    next()
})

// App.use('/',(req,res,next) => {
//     console.log('hai')
//     next()
// })

// Routing

App.get('/',(req,res) => {
    res.sendFile('index.html', {root: __dirname})
})

App.get('/no/:nomor', (req,res,next)=>{
    let par = req.params.nomor
    if(par == '1' | par == '123'){
        res.send(par)
    }
    next()
})

App.get('/contact/',(req,res) => {
    res.sendFile('contact.html', {root: __dirname})
})

App.get('/about/', (req,res) => {
    res.sendFile('about.html', {root: __dirname})
})

App.get('/form', (req,res) => {
    res.sendFile('form.html', {root: __dirname})
})

App.use('/', (req, res,next)=>{
    res.status(404).sendFile('404.html', {root: __dirname })
})
















// const http = require('http')
// const fs = require('fs')

// function renderHtml(path, res){
//     fs.readFile(path, (err,data) => {
//         if(err){
//             res.writeHead(404)
//                 res.write('NOT FOUND BLOK')
//         }else{
//             res.write(data)
//         }
//         res.end()
//     })
// }

// http
//     .createServer((req, res) => {
//         res.writeHead(200,{
//             'Content-Type' : 'text/html'
//         })

//         const url = req.url
        
//         if(url === '/about'){
//             res.write(`<h1>About nih cok</h1>`)
//             res.end()
//         }else {
//             renderHtml('./index.html', res)
//         }
        
//     })
//     .listen(3000, () => {
//         console.log('server is listening on 3000...')
//     })
