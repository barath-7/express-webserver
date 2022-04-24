const path = require('path')
const express= require('express')
const app = express()
const hbs = require('hbs')
const { dirname } = require('path')

const publicIndexPath = path.join(__dirname,'../public/css')
const jsPath = path.join(__dirname,'../public')
const assetsIndexPath = path.join(__dirname,'../public/assets')
const viewsPath = path.join(__dirname,'../templates/views')
// const templatePath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



const getGeocode = require("../utils/geoCode");
const getWeather = require("../utils/weaterStack");

app.use(express.static(publicIndexPath))
app.use(express.static(viewsPath))
app.use(express.static(assetsIndexPath))
app.use(express.static(jsPath))

app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:'This is an express web server'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'about footer'
        
    })
})

app.get('/help',(req,res)=>{
    
    res.render('help',{
        title:'Help page',
        name:'help footer'

    })
})

app.get('/weather',(req,res)=>{
    let queryParam = req.query
    if(!queryParam.address){
        
        return res.send({
            error:'Address is a required parameter'
        })
    }


    getGeocode(queryParam.address, (error, data) => {
        if (error) {
          return res.send({
              errorMessage:'Enter a valid address',
              error:error
          })
        }
    
        getWeather(data.latitude, data.longitude, (error, weatherData) => {
          if (error) {
            return res.send({
                errorMessage:'Error fetching the weather data',
                error:error
            })
          }
          

          return res.send({   //changing send to json
            forecast:weatherData,
            location:data.location,
            address:queryParam.address
        })
        });
      });




    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'No help page found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'404 page'
    })
})


app.listen(3000,()=>{
    console.log('server is up and running')
})