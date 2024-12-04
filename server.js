var cors = require('cors')
const express = require ('express')
const app = express ()
let server = app.listen(8000);
server.keepAliveTimeout = 80000;
server.headersTimeout = 81000;
app.use(cors())

const { spawn } = require('child_process');

const childPython = spawn('python',['apibnc.py']);

childPython.stdout.on('data',(data)=>{
    // const tasabinance = data;
    const tasabinance = `${data}`;

    app.get ('/info5', (req, res) =>{
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')
    
        // const sendData5 = `data: ${JSON.stringify(tasabinance) +' Bs.'}\n\n`;
        // const sendData5 = `data: ${tasabinance + 'Bs.'}\n\n`;
        const sendData5 = tasabinance.trim();
        res.write(sendData5);
        console.log(sendData5);
    })
    
})


// app.get ('/info5', (req, res) =>{
//     res.setHeader('Content-Type', 'text/event-stream')
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     const sendData5 = `data: ${JSON.stringify(tasabinance) +' Bs.'}\n\n`;
//     res.write(sendData5);
//     console.log(sendData5);
// })

childPython.stderr.on('data',(data)=>{
    console.error(`stderr: ${data}`);
})

childPython.on('close',(code)=>{
    console.log(`Se ha cerrado con el codigo ${code}`);
})
