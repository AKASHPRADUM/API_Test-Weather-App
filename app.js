const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded())

app.get('/', function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",(req,res)=>{
    console.log(req.body);
    const city = req.body.cityName;
    const yourID = "48c56779bfd87a0744a620d4a35a1c93";
    const unit = req.body.unit;


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+yourID+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            const weatheData = JSON.parse(data);
            const temp = weatheData.main.temp;
            const weatherDiscreption = weatheData.weather[0].description;
            const icon =weatheData.weather[0].icon;
            const weatherIcon = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>temprature is "+ temp+"<p>");
            res.write("<p>weather is "+ weatherDiscreption+"<p>");
            res.write("<img src="+ weatherIcon +">");
            // console.log(temp);
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("server is running at 3000 port");
});