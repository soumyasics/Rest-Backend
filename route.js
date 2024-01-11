const express=require("express")
const usercontrol=require("./usercontrol")
const staffcontrol=require("./staffcontrol")
const router=express.Router()
router.post('/userregistration',usercontrol.userregistration)
router.post('/resetpassword',usercontrol.resetpassword)
router.post('/userlogin',usercontrol.userlogin)
router.post('/staffregistration',staffcontrol.staffregistration)
router.post('/stafflogin',staffcontrol.stafflogin)
router.post('/staffresetpassword',staffcontrol.staffresetpassword)

module.exports=router