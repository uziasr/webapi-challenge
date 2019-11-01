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

router.post('/projects/:id/actions', validateAction, (req,res)=>{
    // required --> project_id, description, notes
    const newAction = req.body
    const projectId = req.params.id
    actionDB.insert({...newAction, project_id:projectId})
    .then(newOne=>{
        // console.log(newOne);
        (newOne.length!==0)? res.status(200).json(newOne) : res.status(404).json({error: 'something went terribly wrong!'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went wrong, make sure project id is valid'})
    })

})

router.put('/projects/actions/:id', validateAction, (req,res)=>{
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

router.delete('/projects/actions/:id', (req,res)=>{
    const actionID = req.params.id
    console.log(actionID)
    actionDB.remove(actionID)
    .then(count=>{
        count? res.status(200).json({success:`action deleted with the id of ${actionID}`}):
        res.status(404).json({error:"no actions were deleted, check the id"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"something went wrong!"})
    })
})

function validateAction(req, res, next){
    // console.log(req.body)
    const objLength = (Object.keys(req.body).length)
   return (!objLength)?res.status(404).json({error:"please send something"}):('notes' in req.body & 'description' in req.body)? next(): res.status(404).json({error: "please make sure description and notes are being sent "})
}


module.exports = router;
