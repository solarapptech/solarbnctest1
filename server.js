var cors = require('cors')
const express = require ('express')
const moment = require('moment-timezone');
const app = express ()
let server = app.listen(8000);
server.keepAliveTimeout = 80000;
server.headersTimeout = 81000;
app.use(cors())

let tasabinance = 0;
let bncv = 0;


// Get the current time in Venezuela (VET timezone)
let venezuelaTime = moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss A');

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

childPython.stderr.on('data',(data)=>{
    console.error(`stderr: ${data}`);
})

childPython.on('close',(code)=>{
    console.log(`Se ha cerrado con el codigo ${code}`);
})
