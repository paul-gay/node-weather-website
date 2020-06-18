// create absolute path to index.html to point express to file
const path = require('path')
const express = require('express')
// partials
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// path to public folder
const publicDirectoryPath = path.join(__dirname, '../public')

// create path to template files
const viewsPath = path.join(__dirname, '../templates/views')
// path to partials directory
const partialsPath = path.join(__dirname, '../templates/partials')


// tell express to use handlebars template language
app.set('view engine', 'hbs')

// tell express to use viewPath
app.set('views', viewsPath)

// configure partials
hbs.registerPartials(partialsPath)


// serve up the directory in express
app.use(express.static(publicDirectoryPath))




// set up route to handlebars template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Paul'
    })
})



// since used app.use above -- this will not render -- can delete get requests
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    // add a default value
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paul',
        errorMessage: 'Help Article not found.'
    })
})

// set up 404 pages
// use wild card character (*) -- which means everything that hasn't been matched yet
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paul',
        errorMessage: 'Page not found.'
    })
})




app.listen(port, ()=> {
    console.log('server is running on port ' + port)
})