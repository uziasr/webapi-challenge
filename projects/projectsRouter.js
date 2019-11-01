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

router.put('/projects/:id', (req,res)=>{
    //working
    const id = req.params.id
    const updatedProject = req.body
    projectDB.update(id, updatedProject)
    .then(updated=>{
        updated? res.status(200).json(updatedProject):res.status(404).json({error:'id not found'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })
})

router.delete('/projects/:id', (req,res)=>{
    const id = req.params.id
    projectDB.remove(id)
    .then(count=>{
        count? res.status(200).json({success:`project with the id of ${id} has been removed!`}):res.status(404).json({error:'please double check that the id exist, no records were removed'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })

})


module.exports= router;