const express = require("express");
const https = require("https");
const app = express();
const bodyparser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile("/index.html",{root:__dirname})
})

app.post("/",function(req,res){
    const querry = req.body.city;
    const weather = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&appid=e88117824da6adf28b10d381e1425895&units=metric"
    https.get(weather,function(response){
        response.on("data",function(data){
            const weath = JSON.parse(data);
            const temp = weath.main.temp;
            const weatherdiscription = weath.weather[0].description;
            const icon = weath.weather[0].icon;
            const imageurl ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>weather is currently "+weatherdiscription+"</p>");
            res.write("<h1>Temprature in "+ querry+ " is " +temp+" degree celcius.</h1>");
            res.write("<img src ="+imageurl+">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("server running at port 3000");
});