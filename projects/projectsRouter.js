const express = require('express');

const router = express.Router();

const projectDB = require('../data/helpers/projectModel.js')

router.get('/projects', (req,res)=>{
    projectDB.get()
    .then(projects=>res.status(200).json(projects))
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went terribly wrong!'})
    })
})

router.post('/projects', (req,res)=>{
    const newProject = req.body 
    projectDB.insert(newProject)
    .then(newOne=>{
        res.status(200).json(newOne)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    })
})


module.exports= router;