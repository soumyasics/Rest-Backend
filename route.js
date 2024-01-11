const express=require("express")
const usercontrol=require("./usercontrol")
const router=express.Router()
router.post('/staffregistration',usercontrol.staffregistration)
router.post('/resetpassword',usercontrol.resetpassword)
router.post('/stafflogin',usercontrol.stafflogin)

module.exports=router