// Write your "projects" router here!
const express = require("express")
const pModel = require("./projects-model")


const router = express.Router()


router.get("/", (req, res)=> {
    pModel.get(req.params.id)
        .then((project)=>{
            if(!project){
                return res.status(404).json({
                    message: "There's no project"
                })
            }
            else {
                return res.status(200).json(project)
            }
        })
        .catch((err)=> {
            console.log(err)
        })
})

router.get("/:id", (req, res)=> {
    pModel.get(req.params.id)
        .then((project)=>{
            if(!project){
                return res.status(404).json({
                    message: "There's no project with that ID"
                })
            }
            else {
                return res.status(200).json(project)
            }
        })
        .catch((err)=> {
            console.log(err)
        })
})

router.post("/", (req, res)=>{
    if(!req.body.name || !req.body.description){
        return res.status(404).json({
            message: "Please provide name and description"
        })
    }
    pModel.insert(req.body)
        .then((project)=> {
            res.status(201).json(project)
        })
        .catch((err)=> {
            console.log(err)
            return res.status(500).json({
                message: "error adding project"
            })
        })
})









module.exports = router