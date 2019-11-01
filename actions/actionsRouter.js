const express = require('express');

const router = express.Router();
const actionDB = require('../data/helpers/actionModel.js')

router.get('/projects/actions', (req,res)=>{
    actionDB.get()
    .then(action=>res.status(200).json(action))
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went terribly wrong!'})
    })
})

// router.get('/actions/:id', (req,res)=>{
//     const id = req.params.id
//     actionDB.getProjectActions(id)
//     .then(action=>res.status(200).json(action))
//     .catch(err=>{
//         console.log(err)
//         res.status(500).json({error: 'something went terribly wrong!'})
//     })
// })

router.post('/projects/:id/actions', (req,res)=>{
    // required --> project_id, description, notes
    const newAction = req.body
    const projectId = req.params.id
    actionDB.insert({...newAction, project_id:projectId})
    .then(newOne=>{
        (newOne.length!==0)?res.status(200).json(newOne):res.status(404).json({error:'make sure that id is valid for me'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).status.json({error: 'something went wrong'})
    })

})

router.put('/projects/actions/:id', (req,res)=>{
    const actionID = req.params.id
    const updatedAction = req.body
    actionDB.update(actionID, updatedAction)
    .then(updated=>{
        updated?res.status(200).json(updatedAction):res.status(404).json({error:"check that id!"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"something went wrong!"})
    })
})

module.exports = router;
