const express = require('express');
const fs =require('fs');
const parser = require('body-parser');
const urlParser = parser.urlencoded({extended: false});
let datelog;
const app = express();
app.use(function (request, response, next) {
    let data = new Date();
     datelog = {
            hour: data.getHours(),
            minute: data.getMinutes(),
            day: data.getDay(),
            month: data.getMonth(),
            year: data.getFullYear(),
        };
    fs.appendFile(__dirname+'/server.log',JSON.stringify(datelog)+'\n\r',function () {
        console.log('add')
    });
    next();
});
app.use(function (request,response,next) {
    express.static(__dirname+'\\public\\about.html');
    next();
});
app.get('/', function (request, response) {
    console.log(request.url);
    response.send(JSON.stringify(datelog));
});
app.listen(3000 || process.env.PORT,()=>{console.log('server head been started...')});
app.get("/about", function (request, response) {
    console.log(request.url);
    console.log(__dirname +'/public/about.html');
    response.sendFile(__dirname + '/public/about.html');
});
app.get("/contact", function (request, response) {
    /*let id = request.query.id;
    let name = request.query.name;
    console.log(JSON.stringify({id:id,name:name}));*/
    /*let names =request.query.name;
    console.log(names);*/
    let user  = request.query.user;
    console.log(user);
    console.log(request.url);
    response.send("<h1>Контакты</h1>");
});
app.get('/public/sendFile',function (request,response) {
    console.log(request.url);
    let a ='/';
    console.log(__dirname+request.url.replace('/','\\').concat('.html'));
    response.sendFile(__dirname+request.url.replace('/','\\').concat('.html'));
});
app.get('/register',function (request, response) {
        console.log(request.url);
        response.sendFile(__dirname+request.url+'.html');
});
app.post('/register',urlParser,function (request,response) {

    // if(!request.body) return response.sendStatus(400);
    // console.log(request.body);
    // response.send(`${request.body.userName} - ${request.body.userAge}`);
});
app.get('/watch',function (request,response) {
    response.redirect('https://www.youtube.com/watch?v=ZxivoibWR6s');
});
app.get('/phone/:type_phone/:product',function (request,response) {
   let type_phone = request.params['type_phone'];
   let product = request.params['product'];
   /*console.log(JSON.stringify(type_phone.concat(":",product)));*/
   response.send(JSON.stringify({type:type_phone,product:product}));
});

