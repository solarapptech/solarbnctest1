var cors = require('cors')
const express = require ('express')
const app = express ()
let server = app.listen(8000);
server.keepAliveTimeout = 80000;
server.headersTimeout = 81000;
app.use(cors())

let tasabinance = 0;
let bncv = 0;

let tasabcv = 0;
let bcvt = 0;

let tasaparalelo = 0;
let paral = 0;


const moment = require('moment-timezone'); 
require('moment/locale/es'); 

moment.locale('es');  
let venezuelaTime = moment().tz('America/Caracas').format('dddd, d MMM YYYY, hh:mm A');

app.get ('/info3', (req, res) =>{
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Access-Control-Allow-Origin', '*')
       
        const sendData3 = `data: ${JSON.stringify(venezuelaTime)}\n\n`
        res.write(sendData3);
       
})


const { spawn } = require('child_process');

const childPython = spawn('python',['apibnc.py']);

childPython.stdout.on('data',(data)=>{
    tasabinance = `${data}`;
    bncv = tasabinance.trim();
    launchinfo();
})

function launchinfo(){
app.get ('/info5', (req, res) =>{
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')
    
        const sendData5 = `data: ${bncv +' Bs.'}\n\n`;
        res.write(sendData5);
})
}

const childPython2 = spawn('python',['bcvapi.py']);

childPython2.stdout.on('data',(data)=>{
    tasabcv = `${data}`;
    bcvt = tasabcv.trim();
    launchinfo2();
})

function launchinfo2(){
    app.get ('/info1', (req, res) =>{
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')
    
        const sendData1 = `data: ${bcvt +' Bs.'}\n\n`;
        res.write(sendData1);
})
}


const childPython3 = spawn('python',['apiparalelo.py']);

childPython3.stdout.on('data',(data)=>{
    tasaparalelo = `${data}`;
    paral = tasaparalelo.trim();
    launchinfo3();
})

function launchinfo3(){
    app.get ('/info2', (req, res) =>{
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')
    
        const sendData2 = `data: ${paral +' Bs.'}\n\n`;
        res.write(sendData2);
})
}

