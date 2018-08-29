const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fs = require('fs')


const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('form')
})

app.get('/api', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('info.json')))
})

app.post('/info', (req, res) => {
    console.log(req.body.name)
   
    let api = []


    let info = {
        name: req.body.name,
         age: req.body.age,
         email: req.body.email
        }
    
    let data = JSON.parse(fs.readFileSync('info.json'))
    data.map(i=>{
          if(i.name !== info.name ){ return api.push(i)}
        }
    )
    api.push(info)
    
   
        
    fs.writeFileSync('info.json',JSON.stringify(api))
    res.redirect('/')
})




app.listen(3000)