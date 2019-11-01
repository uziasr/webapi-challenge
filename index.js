const express = require('express');
const server = express();
// const projectRouter = require('./projects/projectRouter.js')

server.use(express.json)

server.get('', (req, res) => {
    console.log('hello')
    res.send(`<h2>Let's write some middleware!</h2>`)
  });
// server.use('/',projectRouter)


const port = 9000
server.listen(port, ()=>{
    console.log('You are now listening on port: ', port)
});
