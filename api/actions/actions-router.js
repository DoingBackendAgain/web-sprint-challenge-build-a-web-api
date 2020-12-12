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




module.exports = router