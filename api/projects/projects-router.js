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

router.put("/:id", (req, res)=> {
    pModel.update(req.params.id, req.body)
        .then((project)=> {
            if(project) {
                res.status(200).json(project)
            }
            else{
                res.status(404).json({
                    message: "This project doesn't exist"
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.delete("/:id", (req, res)=> {
    pModel.remove(req.params.id)
        .then((project)=> {
            if(project){
                res.status(200).json({
                    message: "You've deleted something"
                })
            }
            else{
                res.status(400).json({
                    message: "This project doesn't exist"
                })
            }
        })
        .catch((err)=> {
            console.log(err)
        })
    
})









module.exports = router