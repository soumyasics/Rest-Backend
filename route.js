const express=require("express")
const usercontrol=require("./usercontrol")
const router=express.Router()
router.post('/userregistration',usercontrol.userregistration)


module.exports=router