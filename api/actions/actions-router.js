// Write your "actions" router here!
const express = require("express")
const aModel = require("./actions-model")

const router = express.Router()

router.get("/", (req, res)=> {
    aModel.get(req.params.id)
        .then((actions)=> {
            if(!actions){
                return res.status(404).json({
                    message: "There's no actions here"
                })
            }else{
                res.status(200).json(actions)
            }
        })
        .catch((err)=> {
            console.log(err)
        })
})

router.get("/:id", (req, res)=> {
    aModel.get(req.params.id)
        .then((actions)=> {
            if(!actions){
                return res.status(404).json({
                    message: "There are no actions with this ID"
                })
            }
            else {
                res.status(200).json(actions)
            }
        })
        .catch((err)=> {
            console.log(err)
        })
})


router.post("/", (req, res)=> {
    if(!req.body.description || !req.body.notes){
        return res.status(404).json({
            message: "please add description and notes"
        })
    }      
    aModel.insert(req.body)
        .then((actions) => {
            res.status(201).json(actions)
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({
                message: "error adding your action"
            })
        })
})
//in insomnia, you must add project_id to json



router.put("/:id", (req, res)=> {
 aModel.update(req.params.id, req.body)
    .then((action)=> {
        if(action){
            res.status(200).json(action)
        }
        else {
            res.status(404).json({
                message: "This project doesn't exist"
            })
        }
    })
    .catch((err)=> {
        console.log(err)
    })
})




router.delete("/:id", (req, res)=> {
    aModel.remove(req.params.id)
        .then((action)=> {
            if(action){
                return res.status(200).json({
                    message: "You've forever destroyed an action"
                })
            }
            else {
                res.status(400).json({
                    message: "You can't get no action here"
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
})


module.exports = router