const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { apikey } = require('./config')
const { response } = require('express')

const app = express()
    // Set view engine to pug and establish view folder
app.set('view engine', 'pug')
app.set('views', './views')
    // Middleware that processes incoming request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/styles', express.static('styles'))
app.use('/images', express.static('public'))


// Get Route
app.get('/', (req, res) => {
        res.render('index')
    })
    // Post Route
app.post("/location", (req, res) => {
    let location = req.body.search
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no`)
        .then(response => response.json())
        .then((data) => {
            const weather = {
                "name": data.location.name,
                "region": data.location.region,
                "temp_f": data.current.temp_f,
                "condition": data.current.condition.text,
                "icon": data.current.condition.icon,
                "humidity": data.current.humidity,
            }
            res.render('postPage', weather)
        })

})
app.listen(3000, () => console.log("Server serving"))